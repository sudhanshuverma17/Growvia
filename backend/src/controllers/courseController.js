import { Course } from "../models/Course.js";
import { seedCareers } from "../data/seedData.js";

// Helper to create a URL-friendly slug
const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// @desc    Get all courses / roadmaps with optional filters
// @route   GET /api/courses
export const getAllCourses = async (req, res) => {
  try {
    const { category, search } = req.query;
    const query = {};

    if (category && category !== "All") {
      query.category = category;
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { skills: searchRegex },
        { category: searchRegex },
      ];
    }

    const courses = await Course.find(query).sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    console.error("Error in getAllCourses:", error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

// @desc    Get single course / roadmap by ID or slug
// @route   GET /api/courses/:id
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    let course = await Course.findOne({ id: id.toLowerCase() });

    // Fallback: check if id is a valid Mongo ObjectId
    if (!course && id.match(/^[0-9a-fA-F]{24}$/)) {
      course = await Course.findById(id);
    }

    if (!course) {
      return res.status(404).json({ error: `Course not found with id: ${id}` });
    }

    res.json(course);
  } catch (error) {
    console.error("Error in getCourseById:", error);
    res.status(500).json({ error: "Failed to fetch course details" });
  }
};

// @desc    Create a new course & roadmap
// @route   POST /api/courses
export const createCourse = async (req, res) => {
  try {
    const data = req.body;

    if (!data.title || !data.title.trim()) {
      return res.status(400).json({ error: "Course title is required" });
    }

    // Generate unique slug
    let baseSlug = data.id ? slugify(data.id) : slugify(data.title);
    if (!baseSlug) baseSlug = "course";

    let uniqueId = baseSlug;
    let counter = 1;
    while (await Course.findOne({ id: uniqueId })) {
      uniqueId = `${baseSlug}-${counter}`;
      counter++;
    }

    const newCourse = new Course({
      ...data,
      id: uniqueId,
      title: data.title.trim(),
      category: data.category || "Technology",
      isCustom: true,
    });

    const saved = await newCourse.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error in createCourse:", error);
    res.status(400).json({ error: error.message || "Failed to create course" });
  }
};

// @desc    Update course & roadmap
// @route   PUT /api/courses/:id
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Do not allow changing the unique id slug via update to prevent breaking existing links
    delete updates.id;
    delete updates._id;

    let updated = await Course.findOneAndUpdate(
      { id: id.toLowerCase() },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updated && id.match(/^[0-9a-fA-F]{24}$/)) {
      updated = await Course.findByIdAndUpdate(
        id,
        { $set: updates },
        { new: true, runValidators: true }
      );
    }

    if (!updated) {
      return res.status(404).json({ error: `Course not found with id: ${id}` });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error in updateCourse:", error);
    res.status(400).json({ error: error.message || "Failed to update course" });
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    let deleted = await Course.findOneAndDelete({ id: id.toLowerCase() });

    if (!deleted && id.match(/^[0-9a-fA-F]{24}$/)) {
      deleted = await Course.findByIdAndDelete(id);
    }

    if (!deleted) {
      return res.status(404).json({ error: `Course not found with id: ${id}` });
    }

    res.json({ message: "Course deleted successfully", id });
  } catch (error) {
    console.error("Error in deleteCourse:", error);
    res.status(500).json({ error: "Failed to delete course" });
  }
};

// @desc    Reset all courses to initial 48+ careers seed data
// @route   POST /api/courses/reset
export const resetCourses = async (req, res) => {
  try {
    await Course.deleteMany({});
    const inserted = await Course.insertMany(seedCareers);
    res.json({
      message: "Database reset to original seed data successfully",
      count: inserted.length,
    });
  } catch (error) {
    console.error("Error in resetCourses:", error);
    res.status(500).json({ error: "Failed to reset courses" });
  }
};
