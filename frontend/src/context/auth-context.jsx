import { createContext, useContext, useState, useEffect } from "react";
import { apiUrl } from "@/lib/api-config";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("growvia_token") || null);
  const [loading, setLoading] = useState(true);

  // Restore session on mount if token is in localStorage
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem("growvia_token");
      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(apiUrl("/api/auth/me"), {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setToken(savedToken);
        } else {
          // Token expired or invalid
          localStorage.removeItem("growvia_token");
          setUser(null);
          setToken(null);
        }
      } catch (err) {
        // Fallback: keep existing token without clearing if server is temporarily unreachable
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login action
  const login = async (email, password) => {
    try {
      const res = await fetch(apiUrl("/api/auth/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMsg = data.details
          ? `${data.message} (${data.details})`
          : data.message || "Invalid credentials";
        return {
          success: false,
          error: errorMsg,
        };
      }

      localStorage.setItem("growvia_token", data.token);
      setToken(data.token);
      setUser(data.user);

      return {
        success: true,
        user: data.user,
      };
    } catch (err) {
      console.error("[Auth Login Error]:", err);
      return {
        success: false,
        error: "Unable to reach the server. Please ensure the backend is running.",
      };
    }
  };

  // Register action
  const register = async (name, email, password) => {
    try {
      const res = await fetch(apiUrl("/api/auth/register"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMsg = data.details
          ? `${data.message} (${data.details})`
          : data.message || "Registration failed";
        return {
          success: false,
          error: errorMsg,
        };
      }

      localStorage.setItem("growvia_token", data.token);
      setToken(data.token);
      setUser(data.user);

      return {
        success: true,
        user: data.user,
      };
    } catch (err) {
      console.error("[Auth Register Error]:", err);
      return {
        success: false,
        error: "Unable to reach the server. Please ensure the backend is running.",
      };
    }
  };

  // Logout action
  const logout = () => {
    localStorage.removeItem("growvia_token");
    setToken(null);
    setUser(null);
  };

  // Toggle Save Roadmap for user
  const toggleSaveRoadmap = async (courseId) => {
    if (!token || !user) return false;

    try {
      const res = await fetch(apiUrl("/api/auth/save-roadmap"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId }),
      });

      if (res.ok) {
        const data = await res.json();
        setUser((prev) =>
          prev ? { ...prev, savedRoadmaps: data.savedRoadmaps } : prev
        );
        return data.isSaved;
      }
    } catch (err) {
      console.error("[Toggle Save Error]:", err);
    }
    return false;
  };

  // Refresh user profile from backend
  const refreshUser = async () => {
    const savedToken = token || localStorage.getItem("growvia_token");
    if (!savedToken) return null;
    try {
      const res = await fetch(apiUrl("/api/auth/me"), {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        return data.user;
      }
    } catch (err) {
      console.error("[Refresh User Error]:", err);
    }
    return null;
  };

  // Add purchased roadmap locally and sync state (ensuring it is removed from saved roadmaps)
  const addPurchasedRoadmap = (careerId) => {
    setUser((prev) => {
      if (!prev) return prev;
      const currentPurchased = Array.isArray(prev.purchasedRoadmaps) ? prev.purchasedRoadmaps : [];
      const currentSaved = Array.isArray(prev.savedRoadmaps) ? prev.savedRoadmaps : [];
      const updatedPurchased = currentPurchased.includes(careerId)
        ? currentPurchased
        : [...currentPurchased, careerId];
      const updatedSaved = currentSaved.filter((id) => id !== careerId);
      return {
        ...prev,
        purchasedRoadmaps: updatedPurchased,
        savedRoadmaps: updatedSaved,
      };
    });
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
        toggleSaveRoadmap,
        refreshUser,
        addPurchasedRoadmap,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
