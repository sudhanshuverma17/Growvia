import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { apiUrl } from "@/lib/api-config";

const VideoContext = createContext(null);
const STORAGE_KEY = "growvia_videos_v3";

export function VideoProvider({ children }) {
  const [videos, setVideos] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("growvia_videos_v1");
        localStorage.removeItem("growvia_videos_v2");
      }
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      // Use fallback
    }
    // Only real admin-uploaded videos; starts empty
    return [];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("growvia_token");
    const headers = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  };

  // Fetch live videos from Express + MongoDB backend
  const fetchVideos = useCallback(async (params = {}) => {
    try {
      setIsLoading(true);
      const query = new URLSearchParams(params).toString();
      const res = await fetch(apiUrl(`/api/videos${query ? `?${query}` : ""}`));
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setVideos(data);
          setIsBackendConnected(true);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          return data;
        }
      }
    } catch (err) {
      setIsBackendConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  // Add a new video (Admin)
  const addVideo = async (videoData) => {
    const newVideo = {
      ...videoData,
      _id: `v-${Date.now()}`,
      isPaid: Boolean(videoData.isPaid),
      price: videoData.isPaid ? (videoData.price || "₹299") : "Free",
      createdAt: new Date().toISOString(),
    };

    // Optimistic update
    setVideos((prev) => [newVideo, ...prev]);

    try {
      const res = await fetch(apiUrl("/api/videos"), {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(videoData),
      });

      if (res.ok) {
        const saved = await res.json();
        setVideos((prev) => {
          const next = prev.map((v) => (v._id === newVideo._id ? saved : v));
          try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
          return next;
        });
        return saved;
      }
    } catch (err) {
      // Preserved locally
    }

    return newVideo;
  };

  // Update existing video (Admin)
  const updateVideo = async (id, updatedFields) => {
    setVideos((prev) => {
      const next = prev.map((v) => (v._id === id || v.id === id ? { ...v, ...updatedFields } : v));
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
      return next;
    });

    try {
      const res = await fetch(apiUrl(`/api/videos/${id}`), {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedFields),
      });

      if (res.ok) {
        const updated = await res.json();
        setVideos((prev) => {
          const next = prev.map((v) => (v._id === id || v.id === id ? updated : v));
          try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
          return next;
        });
        return updated;
      }
    } catch (err) {
      // Ignore
    }
  };

  // Delete video (Admin)
  const deleteVideo = async (id) => {
    setVideos((prev) => {
      const next = prev.filter((v) => v._id !== id && v.id !== id);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
      return next;
    });

    try {
      await fetch(apiUrl(`/api/videos/${id}`), {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
    } catch (err) {
      // Ignore
    }
  };

  return (
    <VideoContext.Provider
      value={{
        videos,
        isLoading,
        isBackendConnected,
        fetchVideos,
        addVideo,
        updateVideo,
        deleteVideo,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export function useVideos() {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideos must be used within a VideoProvider");
  }
  return context;
}
