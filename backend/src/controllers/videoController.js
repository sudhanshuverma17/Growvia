import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Video from "../models/Video.js";
import { seedVideos } from "../data/seedVideos.js";

// @desc    Get all videos with optional career, access (free/paid), and search filter
// @route   GET /api/videos
// @access  Public
export const getAllVideos = async (req, res) => {
  try {
    const { careerId, isPaid, tag, search } = req.query;
    const query = {};

    if (careerId && careerId !== "all") {
      query.careerId = careerId.toLowerCase().trim();
    }

    if (isPaid !== undefined && isPaid !== "all") {
      query.isPaid = isPaid === "true" || isPaid === true;
    }

    if (tag && tag !== "all") {
      query.tag = tag;
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [
        { title: searchRegex },
        { mentor: searchRegex },
        { careerTitle: searchRegex },
        { description: searchRegex },
      ];
    }

    let videos = [];
    try {
      if (mongoose.connection.readyState !== 1) {
        await connectDB();
      }
      if (mongoose.connection.readyState === 1) {
        videos = await Video.find(query).sort({ createdAt: -1 });
      }
    } catch (dbErr) {
      // Fall back silently
    }

    if (!videos || videos.length === 0) {
      let filtered = [...seedVideos];
      if (careerId && careerId !== "all") {
        filtered = filtered.filter((v) => v.careerId === careerId.toLowerCase().trim());
      }
      if (isPaid !== undefined && isPaid !== "all") {
        const isPaidBool = isPaid === "true" || isPaid === true;
        filtered = filtered.filter((v) => v.isPaid === isPaidBool);
      }
      if (tag && tag !== "all") {
        filtered = filtered.filter((v) => v.tag === tag);
      }
      if (search && search.trim()) {
        const s = search.trim().toLowerCase();
        filtered = filtered.filter(
          (v) =>
            v.title?.toLowerCase().includes(s) ||
            v.mentor?.toLowerCase().includes(s) ||
            v.careerTitle?.toLowerCase().includes(s) ||
            v.description?.toLowerCase().includes(s)
        );
      }
      return res.status(200).json(filtered);
    }

    return res.status(200).json(videos);
  } catch (error) {
    return res.status(200).json(seedVideos);
  }
};

// @desc    Get single video by ID
// @route   GET /api/videos/:id
// @access  Public
export const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    let video = null;

    try {
      if (mongoose.connection.readyState !== 1) {
        await connectDB();
      }
      if (mongoose.connection.readyState === 1) {
        video = await Video.findById(id);
      }
    } catch (dbErr) {
      // Fall back silently
    }

    if (!video) {
      video = seedVideos.find((v) => v.id === id || v._id === id);
    }

    if (!video) {
      return res.status(404).json({ error: `Video not found with id: ${id}` });
    }

    return res.status(200).json(video);
  } catch (error) {
    const fallback = seedVideos.find((v) => v.id === req.params.id);
    if (fallback) return res.status(200).json(fallback);
    return res.status(500).json({ error: "Failed to fetch video details" });
  }
};

// @desc    Create a new video
// @route   POST /api/videos
// @access  Private (Admin Only)
export const createVideo = async (req, res) => {
  try {
    const {
      title,
      mentor,
      mentorRole,
      careerId,
      careerTitle,
      videoUrl,
      thumbnail,
      duration,
      views,
      tag,
      isPaid,
      price,
      description,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Video title is required" });
    }

    if (!mentor || !mentor.trim()) {
      return res.status(400).json({ error: "Mentor / speaker name is required" });
    }

    if (!videoUrl || !videoUrl.trim()) {
      return res.status(400).json({ error: "Video URL is required" });
    }

    if (!careerId || !careerId.trim()) {
      return res.status(400).json({ error: "Associated career is required" });
    }

    const isPaidBool = Boolean(isPaid);
    const videoPrice = isPaidBool ? (price?.trim() || "₹299") : "Free";

    const newVideo = await Video.create({
      title: title.trim(),
      mentor: mentor.trim(),
      mentorRole: mentorRole?.trim() || "Industry Professional",
      careerId: careerId.toLowerCase().trim(),
      careerTitle: careerTitle?.trim() || "",
      videoUrl: videoUrl.trim(),
      thumbnail: thumbnail?.trim() || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=640&q=80",
      duration: duration?.trim() || "20:00",
      views: views?.trim() || "1.2K",
      tag: tag || "Reality Check",
      isPaid: isPaidBool,
      price: videoPrice,
      description: description?.trim() || "",
    });

    return res.status(201).json(newVideo);
  } catch (error) {
    console.error("[createVideo Error]:", error);
    return res.status(400).json({ error: "Failed to create video", message: error.message });
  }
};

// @desc    Update video
// @route   PUT /api/videos/:id
// @access  Private (Admin Only)
export const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.isPaid !== undefined) {
      updates.isPaid = Boolean(updates.isPaid);
      if (!updates.isPaid) {
        updates.price = "Free";
      } else if (!updates.price || updates.price === "Free") {
        updates.price = "₹299";
      }
    }

    const updated = await Video.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ error: `Video not found with id: ${id}` });
    }

    return res.status(200).json(updated);
  } catch (error) {
    console.error("[updateVideo Error]:", error);
    return res.status(400).json({ error: "Failed to update video", message: error.message });
  }
};

// @desc    Delete video
// @route   DELETE /api/videos/:id
// @access  Private (Admin Only)
export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Video.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: `Video not found with id: ${id}` });
    }

    return res.status(200).json({ success: true, message: "Video deleted successfully" });
  } catch (error) {
    console.error("[deleteVideo Error]:", error);
    return res.status(500).json({ error: "Failed to delete video", message: error.message });
  }
};
