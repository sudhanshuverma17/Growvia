import express from "express";
import {
  getAllVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
} from "../controllers/videoController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(getAllVideos)
  .post(protect, authorize("admin"), createVideo);

router.route("/:id")
  .get(getVideoById)
  .put(protect, authorize("admin"), updateVideo)
  .delete(protect, authorize("admin"), deleteVideo);

export default router;
