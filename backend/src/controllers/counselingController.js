/**
 * Counseling Controller
 * Verifies access status and provides counseling session configuration.
 * Gated strictly to users who have purchased at least one roadmap (or admin).
 */

export const getCounselingStatus = async (req, res) => {
  try {
    const isAdmin = req.user.role === "admin";
    const purchasedRoadmaps = Array.isArray(req.user.purchasedRoadmaps)
      ? req.user.purchasedRoadmaps
      : [];

    const hasAccess = isAdmin || purchasedRoadmaps.length > 0;

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        hasAccess: false,
        message: "Forbidden: 1:1 Counseling is an exclusive premium feature reserved for students who have purchased a roadmap.",
        code: "ROADMAP_PURCHASE_REQUIRED",
      });
    }

    return res.status(200).json({
      success: true,
      hasAccess: true,
      message: "Eligible for 1:1 Counseling session",
      bookingUrl: "https://sudhanshu-verma.dayschedule.com/meeting-with-sudhanshu",
      purchasedRoadmaps,
    });
  } catch (error) {
    console.error("[Counseling Controller Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Server error checking counseling status",
      error: error.message,
    });
  }
};
