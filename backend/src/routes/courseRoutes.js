import express from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  resetCourses,
} from "../controllers/courseController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes for viewing roadmaps
router.route("/")
  .get(getAllCourses)
  .post(protect, authorize("admin"), createCourse);

router.post("/reset", protect, authorize("admin"), resetCourses);

router.route("/:id")
  .get(getCourseById)
  .put(protect, authorize("admin"), updateCourse)
  .delete(protect, authorize("admin"), deleteCourse);

export default router;

