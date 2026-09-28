import { apiUrl } from "./api-config";

export const DAYSCHEDULE_SCRIPT_URL =
  "https://cdn.jsdelivr.net/npm/dayschedule-widget@latest/dist/dayschedule-widget.min.js";
export const DAYSCHEDULE_SCRIPT_ID = "dayschedule-widget-script";
export const COUNSELING_BOOKING_URL =
  "https://uttkarsh.dayschedule.com/meeting-with-uttkarsh";

/**
 * Injects DaySchedule widget script into document if not already loaded.
 */
export function ensureDayScheduleScript(onLoadCallback) {
  if (typeof window === "undefined") return;

  let script = document.getElementById(DAYSCHEDULE_SCRIPT_ID);
  if (!script) {
    script = document.createElement("script");
    script.id = DAYSCHEDULE_SCRIPT_ID;
    script.src = DAYSCHEDULE_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    if (onLoadCallback) script.onload = onLoadCallback;
    document.body.appendChild(script);
  } else if (onLoadCallback) {
    if (window.daySchedule) {
      onLoadCallback();
    } else {
      script.addEventListener("load", onLoadCallback);
    }
  }
}

/**
 * Builds DaySchedule booking URL pre-filled with the user's name and email.
 */
export function buildDayScheduleUrl(user) {
  let url = COUNSELING_BOOKING_URL;
  if (user?.email) {
    try {
      const urlObj = new URL(COUNSELING_BOOKING_URL);
      urlObj.searchParams.set("email", user.email);
      if (user.name) urlObj.searchParams.set("name", user.name);
      url = urlObj.toString();
    } catch (e) {
      // Fallback to base URL
    }
  }
  return url;
}

/**
 * Opens DaySchedule interactive popup widget with Growvia theme colors.
 */
export function openDayScheduleBooking(user) {
  try {
    sessionStorage.setItem("growvia_booking_active", "true");
  } catch (e) {}

  const bookingUrl = buildDayScheduleUrl(user);

  if (
    typeof window !== "undefined" &&
    window.daySchedule &&
    typeof window.daySchedule.initPopupWidget === "function"
  ) {
    window.daySchedule.initPopupWidget({
      url: bookingUrl,
      color: { primary: "#E5A855", mode: "dark" },
    });
  } else {
    // Polling fallback while script is loading
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (
        typeof window !== "undefined" &&
        window.daySchedule &&
        typeof window.daySchedule.initPopupWidget === "function"
      ) {
        clearInterval(interval);
        window.daySchedule.initPopupWidget({
          url: bookingUrl,
          color: { primary: "#E5A855", mode: "dark" },
        });
      } else if (attempts >= 10) {
        clearInterval(interval);
        window.open(bookingUrl, "_blank", "noopener,noreferrer");
      }
    }, 120);
  }
}

/**
 * Sets up multi-layer automatic detection for DaySchedule booking completion:
 * 1. Intercepts DaySchedule client fetch requests (/public/bookings) to extract join_url & start_at.
 * 2. Hooks into window.gtag("event", "booking_confirmed") fired by DaySchedule on booking success.
 * 3. Listens to window message events with strict payload validation.
 * 4. Automatically persists new bookings to Growvia MongoDB backend (/api/counseling/bookings).
 */
export function setupDayScheduleBookingListener({
  token,
  user,
  purchasedCareers = [],
  onBookingConfirmed,
}) {
  if (typeof window === "undefined") return () => {};

  const processedReferences = new Set();

  const handleConfirmedBooking = async (bookingData) => {
    try {
      if (!bookingData) return null;

      const rawDate =
        bookingData.start_at ||
        bookingData.startTime ||
        bookingData.start ||
        bookingData.date;

      // Ignore handshake or non-booking events that have no date
      if (!rawDate) return null;

      const scheduledDate = new Date(rawDate);
      if (isNaN(scheduledDate.getTime())) return null;

      const bookingReference = String(
        bookingData.booking_id || bookingData._id || bookingData.id || ""
      ).trim();

      if (bookingReference && processedReferences.has(bookingReference)) {
        return null;
      }
      if (bookingReference) processedReferences.add(bookingReference);

      const meetLink =
        bookingData.location?.join_url ||
        bookingData.join_url ||
        (typeof bookingData.location === "string" && bookingData.location.startsWith("http")
          ? bookingData.location
          : null) ||
        bookingData.meeting_url ||
        bookingData.meetLink ||
        "https://meet.google.com/qmv-sgyt-zkw";

      const defaultRoadmapTitle =
        purchasedCareers[0]?.title ||
        (Array.isArray(user?.purchasedRoadmaps) && user.purchasedRoadmaps[0]) ||
        "Career Roadmap Strategy";

      const payload = {
        scheduledDate: scheduledDate.toISOString(),
        meetLink,
        sessionTitle: bookingData.event?.name || "1:1 Career Strategy & Mentorship with Uttkarsh",
        roadmapTitle: defaultRoadmapTitle,
        durationMinutes: Number(bookingData.duration) || 30,
        mentorName: bookingData.host?.name || "Uttkarsh",
        notes: "Booked via DaySchedule",
        bookingReference,
      };

      let savedBooking = null;

      const authToken =
        token || (typeof window !== "undefined" && localStorage.getItem("growvia_token")) || null;

      if (authToken) {
        try {
          const res = await fetch(apiUrl("/api/counseling/bookings"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(payload),
          });
          if (res.ok) {
            const data = await res.json();
            savedBooking = data.booking;
          }
        } catch (err) {
          console.error("[DaySchedule Listener]: Backend sync error:", err);
        }
      }

      if (!savedBooking) {
        savedBooking = {
          _id: bookingReference || "local_" + Date.now(),
          ...payload,
          status: "scheduled",
          createdAt: new Date().toISOString(),
        };
      }

      // Immediately persist to localStorage so it never disappears on refresh or focus
      try {
        const storageKey = `growvia_counseling_bookings_${user?._id || "user"}`;
        const existingRaw = localStorage.getItem(storageKey);
        let existingList = [];
        if (existingRaw) {
          try {
            existingList = JSON.parse(existingRaw) || [];
          } catch (e) {}
        }
        const updatedList = [
          ...existingList.filter((b) => b._id !== savedBooking._id),
          savedBooking,
        ].sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate));
        localStorage.setItem(storageKey, JSON.stringify(updatedList));
      } catch (e) {}

      try {
        sessionStorage.removeItem("growvia_booking_active");
      } catch (e) {}

      if (typeof onBookingConfirmed === "function") {
        onBookingConfirmed(savedBooking);
      }

      return savedBooking;
    } catch (e) {
      console.error("[DaySchedule Listener Error]:", e);
      return null;
    }
  };

  // ── Layer 1: Global fetch interceptor for DaySchedule API calls ──
  const originalFetch = window.fetch;
  window.fetch = async function (...args) {
    const response = await originalFetch.apply(this, args);
    try {
      const url = typeof args[0] === "string" ? args[0] : args[0]?.url || "";
      if (url.includes("dayschedule.com") && url.includes("/bookings")) {
        const method = (args[1]?.method || "GET").toUpperCase();
        if (response.ok && (method === "POST" || method === "PUT")) {
          const clone = response.clone();
          clone.json().then((data) => {
            const b = data?.booking || data;
            if (b && (b.start_at || b.booking_id || b.start)) {
              handleConfirmedBooking(b);
            }
          }).catch(() => {});
        }
      }
    } catch (err) {}
    return response;
  };

  // ── Layer 2: Intercept window.gtag events fired by DaySchedule ──
  const originalGtag = window.gtag;
  window.gtag = function (...args) {
    try {
      if (args[0] === "event" && args[1] === "booking_confirmed") {
        const details = args[2] || {};
        if (details.booking_id && !processedReferences.has(String(details.booking_id))) {
          if (typeof onBookingConfirmed === "function") {
            onBookingConfirmed({ bookingReference: details.booking_id });
          }
        }
      }
    } catch (err) {}
    if (typeof originalGtag === "function") {
      originalGtag.apply(this, args);
    }
  };

  // ── Layer 3: PostMessage listener with strict filtering ──
  const handleWindowMessage = async (e) => {
    if (!e.data) return;
    const isBookingEvent =
      e.data.event === "booking_confirmed" ||
      e.data.type === "booking_confirmed" ||
      e.data.type === "dayschedule.booking_confirmed" ||
      e.data.type === "dayschedule:booked" ||
      e.data.event === "dayschedule:booked";

    if (isBookingEvent) {
      const b =
        e.data.payload?.booking ||
        e.data.booking ||
        e.data.payload ||
        e.data.data;
      if (b && (b.start_at || b.start || b.startTime || b.booking_id)) {
        await handleConfirmedBooking(b);
      }
    }
  };

  window.addEventListener("message", handleWindowMessage);

  return () => {
    window.fetch = originalFetch;
    window.gtag = originalGtag;
    window.removeEventListener("message", handleWindowMessage);
  };
}
