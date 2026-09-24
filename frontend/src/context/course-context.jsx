import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { apiUrl } from "@/lib/api-config";
import { careers as defaultCareers } from "@/lib/mock-data";
import { ICON_MAP } from "@/components/career-icon";

const CourseContext = createContext(null);
const STORAGE_KEY = "growvia_courses_v4";

// Helper to sanitize courses for JSON storage (turn function icons into string keys)
function serializeCourses(coursesList) {
  return coursesList.map((course) => {
    let iconName = "Briefcase";
    if (typeof course.icon === "string") {
      iconName = course.icon;
    } else if (course.icon) {
      const found = Object.entries(ICON_MAP).find(
        ([_, comp]) => comp === course.icon
      );
      if (found) {
        iconName = found[0];
      } else if (course.icon.displayName || course.icon.name) {
        iconName = course.icon.displayName || course.icon.name;
      }
    }
    return {
      ...course,
      icon: iconName,
    };
  });
}

// Helper to restore courses from JSON/API response
function deserializeCourses(rawList) {
  return rawList.map((course) => {
    const iconKey = typeof course.icon === "string" ? course.icon : "Briefcase";
    const fallback = defaultCareers.find((c) => c.id === course.id) || {};
    return {
      ...fallback,
      ...course,
      image: course.image || course.thumbnail || fallback.image || "",
      thumbnail: course.thumbnail || course.image || fallback.thumbnail || "",
      icon: ICON_MAP[iconKey] || fallback.icon || iconKey,
      courses: Array.isArray(course.courses) && course.courses.length > 0 ? course.courses : (fallback.courses || []),
      incomeBreakdown: course.incomeBreakdown?.tier1 ? course.incomeBreakdown : (fallback.incomeBreakdown || course.incomeBreakdown),
      skillsData: Array.isArray(course.skillsData) && course.skillsData.length > 0 ? course.skillsData : (fallback.skillsData || []),
      examsData: Array.isArray(course.examsData) && course.examsData.length > 0 ? course.examsData : (fallback.examsData || []),
      collegesData: course.collegesData?.topColleges?.length ? course.collegesData : (fallback.collegesData || course.collegesData),
      paths: Array.isArray(course.paths) && course.paths.length > 0 && course.paths[0]?.detailedPath?.length ? course.paths : (fallback.paths || course.paths),
      timelineToProfitability: course.timelineToProfitability || fallback.timelineToProfitability || "",
      clientsNeededForTarget: course.clientsNeededForTarget || fallback.clientsNeededForTarget || "",
    };
  });
}

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return deserializeCourses(parsed);
        }
      }
    } catch (e) {
      // Fall back to default
    }
    return defaultCareers;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  const getAuthHeaders = useCallback(() => {
    const token = localStorage.getItem("growvia_token");
    const headers = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }, []);

  // 1. Fetch live courses from Express + MongoDB backend on mount
  const fetchCoursesFromBackend = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(apiUrl("/api/courses"), {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const deserialized = deserializeCourses(data);
          setCourses(deserialized);
          setIsBackendConnected(true);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(serializeCourses(deserialized)));
          return;
        }
      }
    } catch (err) {
      // Backend not running or offline, fallback to localStorage/default
      setIsBackendConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, [getAuthHeaders]);

  useEffect(() => {
    fetchCoursesFromBackend();
  }, [fetchCoursesFromBackend]);

  // Re-fetch individual course with auth token (to unlock paid stage guide data)
  const refreshCourse = useCallback(async (id) => {
    if (!id) return;
    try {
      const res = await fetch(apiUrl(`/api/courses/${encodeURIComponent(id)}`), {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        const [deserialized] = deserializeCourses([data]);
        setCourses((prev) =>
          prev.map((c) =>
            String(c.id).toLowerCase() === String(data.id).toLowerCase()
              ? { ...c, ...deserialized }
              : c
          )
        );
        return deserialized;
      }
    } catch (e) {
      // Fail silently
    }
  }, [getAuthHeaders]);

  // Sync to localStorage on state change
  useEffect(() => {
    try {
      const serialized = serializeCourses(courses);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
    } catch (e) {
      console.error("Failed to save courses to localStorage", e);
    }
  }, [courses]);

  const getCourseById = (id) => {
    if (!id) return undefined;
    const cleanId = String(id).toLowerCase().trim();
    if (cleanId === "personal-trainer") {
      const match = courses.find((c) => String(c.id).toLowerCase() === "fitness-trainer");
      if (match) return match;
    }
    return courses.find(
      (c) => String(c.id).toLowerCase() === cleanId
    );
  };

  const addCourse = async (courseData) => {
    let slug = courseData.id
      ? courseData.id.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-")
      : courseData.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");

    let counter = 1;
    let uniqueId = slug;
    while (courses.some((c) => c.id === uniqueId)) {
      uniqueId = `${slug}-${counter}`;
      counter++;
    }

    const payload = {
      ...courseData,
      id: uniqueId,
      title: courseData.title || "Untitled Course",
      category: courseData.category || "Technology",
      description: courseData.description || "",
      image: courseData.image || courseData.thumbnail || "",
      thumbnail: courseData.thumbnail || courseData.image || "",
      icon: typeof courseData.icon === "string" ? courseData.icon : "Briefcase",
      stats: {
        salary: courseData.stats?.salary || "₹5L - ₹20L+",
        demand: courseData.stats?.demand || "High",
        difficulty: courseData.stats?.difficulty || "Medium",
      },
      whyChoose: Array.isArray(courseData.whyChoose) ? courseData.whyChoose : [],
      skills: Array.isArray(courseData.skills) ? courseData.skills : [],
      paths: Array.isArray(courseData.paths) ? courseData.paths : [],
      timeline: Array.isArray(courseData.timeline) ? courseData.timeline : [],
      courses: Array.isArray(courseData.courses) ? courseData.courses : [],
      exams: Array.isArray(courseData.exams) ? courseData.exams : [],
      colleges: Array.isArray(courseData.colleges) ? courseData.colleges : [],
      budgetColleges: Array.isArray(courseData.budgetColleges) ? courseData.budgetColleges : [],
      abroad: Array.isArray(courseData.abroad) ? courseData.abroad : [],
      investment: courseData.investment || "₹2 Lakhs - ₹10 Lakhs",
      salaryExpectations: Array.isArray(courseData.salaryExpectations)
        ? courseData.salaryExpectations
        : [
            { level: "Entry Level", amount: "₹4L - ₹8L / year" },
            { level: "Mid Level", amount: "₹10L - ₹20L / year" },
            { level: "Senior Level", amount: "₹25L+ / year" },
          ],
      dailyWork: Array.isArray(courseData.dailyWork) ? courseData.dailyWork : [],
      firstOpportunity: courseData.firstOpportunity || "Internships and entry-level positions.",
      whoShould: Array.isArray(courseData.whoShould) ? courseData.whoShould : [],
      whoShouldAvoid: Array.isArray(courseData.whoShouldAvoid) ? courseData.whoShouldAvoid : [],
      harshReality: courseData.harshReality || "Competition is strong, continuous learning is necessary.",
      industryInsights: courseData.industryInsights || "Growing domain with evolving tools and methods.",
      isCustom: true,
    };

    // 1. Optimistically update local state
    const newCourseObj = {
      ...payload,
      icon: ICON_MAP[payload.icon] || payload.icon,
    };
    setCourses((prev) => [newCourseObj, ...prev]);

    // 2. Persist to MongoDB backend with auth header
    try {
      const res = await fetch(apiUrl("/api/courses"), {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const saved = await res.json();
        setIsBackendConnected(true);
        // Replace with saved document from MongoDB
        setCourses((prev) =>
          prev.map((c) => (c.id === uniqueId ? { ...saved, icon: ICON_MAP[saved.icon] || saved.icon } : c))
        );
        return saved;
      }
    } catch (e) {
      // Preserved locally
    }

    return newCourseObj;
  };

  const updateCourse = async (id, updatedFields) => {
    // 1. Optimistically update local state
    setCourses((prev) =>
      prev.map((course) => {
        if (course.id === id) {
          return {
            ...course,
            ...updatedFields,
            stats: {
              ...course.stats,
              ...(updatedFields.stats || {}),
            },
            updatedAt: new Date().toISOString(),
          };
        }
        return course;
      })
    );

    // 2. Persist to MongoDB backend with auth header
    try {
      const serializedFields = {
        ...updatedFields,
        icon: typeof updatedFields.icon === "string" ? updatedFields.icon : undefined,
      };
      const res = await fetch(apiUrl(`/api/courses/${id}`), {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(serializedFields),
      });
      if (res.ok) {
        setIsBackendConnected(true);
      }
    } catch (e) {
      // Preserved locally
    }
  };

  const deleteCourse = async (id) => {
    // 1. Optimistically remove from state
    setCourses((prev) => prev.filter((course) => course.id !== id));

    // 2. Send DELETE to MongoDB backend with auth header
    try {
      const res = await fetch(apiUrl(`/api/courses/${id}`), {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        setIsBackendConnected(true);
      }
    } catch (e) {
      // Removed locally
    }
  };

  const updateRoadmapStages = (courseId, newTimeline) => {
    updateCourse(courseId, { timeline: newTimeline });
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        getCourseById,
        addCourse,
        updateCourse,
        deleteCourse,
        updateRoadmapStages,
        isLoading,
        isBackendConnected,
        refreshCourses: fetchCoursesFromBackend,
        refreshCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourses must be used within a CourseProvider");
  }
  return context;
}
