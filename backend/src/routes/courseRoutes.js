import express from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import { protect, authorize, optionalProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes for viewing roadmaps (optional auth to unlock paid tier)
router.route("/")
  .get(optionalProtect, getAllCourses)
  .post(protect, authorize("admin"), createCourse);

router.route("/:id")
  .get(optionalProtect, getCourseById)
  .put(protect, authorize("admin"), updateCourse)
  .delete(protect, authorize("admin"), deleteCourse);

export default router;

