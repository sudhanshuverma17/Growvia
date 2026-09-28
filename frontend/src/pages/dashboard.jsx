import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { useCourses } from "@/context/course-context";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { apiUrl } from "@/lib/api-config";
import {
  Bookmark,
  Award,
  User,
  Settings,
  LogOut,
  ArrowRight,
  ShieldCheck,
  Compass,
  CheckCircle2,
  Zap,
  BarChart3,
  Coins,
  GraduationCap,
  FileText,
  Sliders,
  Sparkles,
  Calendar,
  Video,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Plus,
  Trash2,
  Edit3,
  CalendarCheck,
  Bell,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCareerConciseDesc } from "@/lib/career-media";
import {
  ensureDayScheduleScript,
  openDayScheduleBooking,
  setupDayScheduleBookingListener,
} from "@/lib/dayschedule-listener";

// Isometric 3D Cube / Package Icon matching the design in the screenshot
function IsometricCubeIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

// Glowing Candlestick Financial Chart SVG watermark for Roadmap Cards
function CandlestickWatermark() {
  return (
    <svg
      className="absolute right-0 top-1/2 -translate-y-1/2 w-48 sm:w-60 h-36 opacity-20 pointer-events-none select-none"
      viewBox="0 0 320 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="chartLineGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E5A855" stopOpacity="0.1" />
          <stop offset="45%" stopColor="#F5B544" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      {/* Candlesticks: vertical wicks & candle bodies */}
      <line x1="45" y1="95" x2="45" y2="155" stroke="#E5A855" strokeWidth="1.5" strokeOpacity="0.45" />
      <rect x="39" y="115" width="12" height="26" rx="2" fill="#E5A855" fillOpacity="0.35" />

      <line x1="80" y1="85" x2="80" y2="145" stroke="#E5A855" strokeWidth="1.5" strokeOpacity="0.45" />
      <rect x="74" y="100" width="12" height="30" rx="2" fill="#E5A855" fillOpacity="0.38" />

      <line x1="115" y1="75" x2="115" y2="135" stroke="#E5A855" strokeWidth="1.5" strokeOpacity="0.5" />
      <rect x="109" y="88" width="12" height="34" rx="2" fill="#E5A855" fillOpacity="0.45" />

      <line x1="150" y1="65" x2="150" y2="125" stroke="#E5A855" strokeWidth="1.5" strokeOpacity="0.55" />
      <rect x="144" y="75" width="12" height="38" rx="2" fill="#E5A855" fillOpacity="0.5" />

      <line x1="185" y1="50" x2="185" y2="115" stroke="#E5A855" strokeWidth="1.5" strokeOpacity="0.6" />
      <rect x="179" y="60" width="12" height="42" rx="2" fill="#E5A855" fillOpacity="0.58" />

      <line x1="220" y1="40" x2="220" y2="105" stroke="#E5A855" strokeWidth="1.5" strokeOpacity="0.65" />
      <rect x="214" y="50" width="12" height="42" rx="2" fill="#E5A855" fillOpacity="0.65" />

      <line x1="255" y1="25" x2="255" y2="95" stroke="#E5A855" strokeWidth="1.5" strokeOpacity="0.75" />
      <rect x="249" y="34" width="12" height="46" rx="2" fill="#E5A855" fillOpacity="0.75" />

      <line x1="290" y1="12" x2="290" y2="85" stroke="#E5A855" strokeWidth="1.5" strokeOpacity="0.85" />
      <rect x="284" y="20" width="12" height="50" rx="2" fill="#E5A855" fillOpacity="0.85" />

      {/* Upward trending line */}
      <path
        d="M20 150 Q 100 120, 160 88 T 315 16"
        stroke="url(#chartLineGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// Classical University Architecture Watermark for College Guidance card
function CollegeBuildingWatermark() {
  return (
    <svg
      className="absolute right-0 bottom-0 w-44 sm:w-56 h-36 opacity-30 pointer-events-none select-none"
      viewBox="0 0 220 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="collegeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5A855" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#92400E" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Central Spire & Cross */}
      <path d="M110 14 L110 4 M107 7 L113 7" stroke="#E5A855" strokeWidth="1.5" />
      <path d="M96 44 C96 24 124 24 124 44 Z" fill="url(#collegeGrad)" />
      <rect x="94" y="44" width="32" height="14" fill="#E5A855" fillOpacity="0.4" />

      {/* Triangular Pediment */}
      <polygon points="76,58 110,40 144,58" fill="#E5A855" fillOpacity="0.5" />

      {/* Columns */}
      <rect x="82" y="58" width="5" height="56" fill="#E5A855" fillOpacity="0.35" />
      <rect x="94" y="58" width="5" height="56" fill="#E5A855" fillOpacity="0.35" />
      <rect x="107" y="58" width="5" height="56" fill="#E5A855" fillOpacity="0.35" />
      <rect x="120" y="58" width="5" height="56" fill="#E5A855" fillOpacity="0.35" />
      <rect x="133" y="58" width="5" height="56" fill="#E5A855" fillOpacity="0.35" />

      {/* Arched Central Portal */}
      <path d="M102 114 V88 C102 82 118 82 118 88 V114 Z" fill="#0D0D0F" />

      {/* Side wings */}
      <rect x="36" y="66" width="42" height="48" fill="#E5A855" fillOpacity="0.25" />
      <rect x="142" y="66" width="42" height="48" fill="#E5A855" fillOpacity="0.25" />

      {/* Wing Windows */}
      <rect x="46" y="74" width="8" height="13" rx="4" fill="#0D0D0F" fillOpacity="0.85" />
      <rect x="62" y="74" width="8" height="13" rx="4" fill="#0D0D0F" fillOpacity="0.85" />
      <rect x="150" y="74" width="8" height="13" rx="4" fill="#0D0D0F" fillOpacity="0.85" />
      <rect x="166" y="74" width="8" height="13" rx="4" fill="#0D0D0F" fillOpacity="0.85" />

      {/* Plinth Steps */}
      <rect x="25" y="114" width="170" height="6" fill="#E5A855" fillOpacity="0.4" />
      <rect x="15" y="120" width="190" height="7" fill="#E5A855" fillOpacity="0.3" />
    </svg>
  );
}

// Resume Document Watermark for Portfolio Builder card
function ResumeDocumentWatermark() {
  return (
    <svg
      className="absolute right-0 bottom-0 w-44 sm:w-56 h-40 opacity-30 pointer-events-none select-none"
      viewBox="0 0 180 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="resumeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#71717A" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#27272A" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <g transform="rotate(-6 90 80)">
        {/* Document sheet */}
        <rect x="45" y="15" width="105" height="135" rx="6" fill="url(#resumeGrad)" stroke="#52525B" strokeWidth="1.5" />
        {/* Profile Avatar silhouette */}
        <circle cx="70" cy="40" r="13" fill="#E5A855" fillOpacity="0.55" />
        <path d="M61 49 C61 43 79 43 79 49" fill="#E5A855" fillOpacity="0.6" />
        <circle cx="70" cy="37" r="5" fill="#E5A855" fillOpacity="0.75" />

        {/* Text lines */}
        <rect x="92" y="32" width="45" height="5" rx="2" fill="#E5A855" fillOpacity="0.45" />
        <rect x="92" y="42" width="30" height="3" rx="1.5" fill="#A1A1AA" fillOpacity="0.4" />

        <rect x="58" y="62" width="80" height="3" rx="1.5" fill="#E5A855" fillOpacity="0.35" />
        <rect x="58" y="70" width="75" height="2.5" rx="1" fill="#71717A" fillOpacity="0.35" />
        <rect x="58" y="76" width="68" height="2.5" rx="1" fill="#71717A" fillOpacity="0.35" />

        <rect x="58" y="88" width="80" height="3" rx="1.5" fill="#E5A855" fillOpacity="0.35" />
        <rect x="58" y="96" width="70" height="2.5" rx="1" fill="#71717A" fillOpacity="0.35" />
        <rect x="58" y="102" width="76" height="2.5" rx="1" fill="#71717A" fillOpacity="0.35" />

        <rect x="58" y="118" width="22" height="7" rx="3.5" fill="#E5A855" fillOpacity="0.25" />
        <rect x="85" y="118" width="26" height="7" rx="3.5" fill="#E5A855" fillOpacity="0.25" />
        <rect x="116" y="118" width="20" height="7" rx="3.5" fill="#E5A855" fillOpacity="0.25" />
      </g>
    </svg>
  );
}

// Organic Botanical Leaves Watermark for Bottom-Left Corner
function BotanicalLeaves() {
  return (
    <svg
      className="fixed bottom-0 left-0 w-80 sm:w-96 h-80 sm:h-96 pointer-events-none opacity-25 select-none z-0"
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="leafGrad1" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#78350F" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#92400E" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#D97706" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="leafGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#451A03" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#B45309" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <path
        d="M-20 340 C10 260, 80 190, 170 170 C150 200, 100 240, -20 340 Z"
        fill="url(#leafGrad1)"
      />
      <path
        d="M-10 330 C30 220, 130 150, 230 130 C200 170, 130 230, -10 330 Z"
        fill="url(#leafGrad2)"
      />
      <path
        d="M0 320 C-10 200, 45 120, 130 80 C120 130, 80 200, 0 320 Z"
        fill="url(#leafGrad1)"
      />
      <path
        d="M-30 350 C40 280, 150 240, 270 230 C220 260, 140 290, -30 350 Z"
        fill="url(#leafGrad2)"
      />
      <path
        d="M-40 300 C-10 210, 35 160, 100 130 C80 170, 40 220, -40 300 Z"
        fill="url(#leafGrad1)"
      />
    </svg>
  );
}

// DaySchedule Script constants
const DAYSCHEDULE_SCRIPT_URL =
  "https://cdn.jsdelivr.net/npm/dayschedule-widget@latest/dist/dayschedule-widget.min.js";
const DAYSCHEDULE_SCRIPT_ID = "dayschedule-widget-script";
const COUNSELING_BOOKING_URL =
  "https://uttkarsh.dayschedule.com/meeting-with-uttkarsh";

// Formatting helpers for counseling reminders
function formatSessionDate(dateString) {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch (e) {
    return dateString;
  }
}

function getCountdownBadge(dateString) {
  try {
    const target = new Date(dateString);
    const now = new Date();
    const diffMs = target.getTime() - now.getTime();
    if (diffMs < -3600000 * 2) {
      return { label: "Completed", color: "bg-zinc-800 text-zinc-400 border-zinc-700" };
    }
    if (diffMs <= 0) {
      return { label: "Happening Now!", color: "bg-amber-500/20 text-[#E5A855] border-amber-500/40 animate-pulse font-bold" };
    }
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 24) {
      const isSameDay = target.getDate() === now.getDate() && target.getMonth() === now.getMonth();
      if (isSameDay) {
        return { label: "Today", color: "bg-amber-500/20 text-[#E5A855] border-amber-500/40 font-bold" };
      }
      return { label: "Tomorrow", color: "bg-amber-500/20 text-[#E5A855] border-amber-500/40 font-bold" };
    }
    const diffDays = Math.ceil(diffHours / 24);
    if (diffDays === 1) {
      return { label: "Tomorrow", color: "bg-amber-500/20 text-[#E5A855] border-amber-500/40 font-bold" };
    }
    return { label: `In ${diffDays} days`, color: "bg-sky-500/15 text-sky-400 border-sky-500/30" };
  } catch (e) {
    return { label: "Scheduled", color: "bg-amber-500/20 text-[#E5A855] border-amber-500/40" };
  }
}

function getGoogleCalendarUrl(booking) {
  try {
    const start = new Date(booking.scheduledDate);
    const duration = booking.durationMinutes || 45;
    const end = new Date(start.getTime() + duration * 60000);

    const pad = (n) => String(n).padStart(2, "0");
    const formatGDate = (d) =>
      `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

    const title = encodeURIComponent(booking.sessionTitle || "Growvia 1:1 Counseling with Uttkarsh");
    const details = encodeURIComponent(
      `1:1 Career Strategy & Roadmap Mentorship Session\n\nGoogle Meet Link: ${booking.meetLink}\nTopic: ${booking.roadmapTitle || "Career Roadmap"}\nMentor: ${booking.mentorName || "Uttkarsh"}\n\nJoin call: ${booking.meetLink}`
    );
    const location = encodeURIComponent(booking.meetLink);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatGDate(start)}/${formatGDate(end)}&details=${details}&location=${location}`;
  } catch (e) {
    return "https://calendar.google.com";
  }
}

function toDatetimeLocal(isoOrDate) {
  const d = isoOrDate ? new Date(isoOrDate) : new Date();
  if (!isoOrDate) {
    d.setDate(d.getDate() + 1);
    d.setHours(16, 30, 0, 0);
  }
  if (isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function Dashboard() {
  const { courses } = useCourses();
  const { user, token, logout, isAdmin, toggleSaveRoadmap } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const [latestAssessment, setLatestAssessment] = useState(null);
  const [loadingAssessment, setLoadingAssessment] = useState(true);

  // 1:1 Counseling Bookings & Reminders State
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [copiedBookingId, setCopiedBookingId] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    scheduledDate: "",
    meetLink: "",
    sessionTitle: "1:1 Career Strategy & Roadmap Review",
    roadmapTitle: "",
    durationMinutes: 45,
    notes: "",
  });

  const [activeTab, setActiveTab] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam === "saved" || params.get("save")) {
        return "saved";
      }
      if (tabParam === "counseling" || tabParam === "reminders") {
        return "counseling";
      }
    } catch (e) {}
    return "purchased";
  });

  // Fetch latest career assessment for the user
  useEffect(() => {
    const fetchLatestAssessment = async () => {
      if (!token) {
        setLoadingAssessment(false);
        return;
      }
      try {
        const res = await fetch(apiUrl("/api/career-quiz/latest"), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data) {
            setLatestAssessment(data.data);
          }
        }
      } catch (err) {
        // No assessment found or network unavailable
      } finally {
        setLoadingAssessment(false);
      }
    };

    fetchLatestAssessment();
  }, [token]);

  // Automatically save roadmap if redirected from roadmap save action (?save=careerId)
  useEffect(() => {
    if (!token || !user || !toggleSaveRoadmap) return;
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const saveCareerId = searchParams.get("save");
      if (saveCareerId) {
        setActiveTab("saved");
        const isPurchased = Array.isArray(user?.purchasedRoadmaps) && user.purchasedRoadmaps.includes(saveCareerId);
        if (isPurchased) return;
        const isAlreadySaved = Array.isArray(user?.savedRoadmaps) && user.savedRoadmaps.includes(saveCareerId);
        if (!isAlreadySaved) {
          toggleSaveRoadmap(saveCareerId).then((saved) => {
            if (saved) {
              const targetCareer = courses.find((c) => c.id === saveCareerId);
              toast({
                title: "Roadmap Saved! 🎉",
                description: `Added "${targetCareer?.title || "chosen roadmap"}" to your dashboard.`,
              });
            }
          });
        }
      }
    } catch (err) {
      // Ignore
    }
  }, [token, user, courses, toggleSaveRoadmap, toast]);

  // Load roadmaps purchased/unlocked by the user
  const userPurchasedIds = Array.isArray(user?.purchasedRoadmaps) ? user.purchasedRoadmaps : [];
  const purchasedCareers = courses.filter((c) => userPurchasedIds.includes(c.id));
  const hasAccessToCounseling = isAdmin || purchasedCareers.length > 0;

  const getLocalStorageKey = () => `growvia_counseling_bookings_${user?._id || "user"}`;

  const saveToLocalStorage = (list) => {
    try {
      localStorage.setItem(getLocalStorageKey(), JSON.stringify(list));
    } catch (e) {}
  };

  const fetchBookings = async () => {
    setLoadingBookings(true);
    const authToken = token || (typeof window !== "undefined" && localStorage.getItem("growvia_token")) || null;
    let remoteBookings = [];

    if (authToken) {
      try {
        const res = await fetch(apiUrl("/api/counseling/bookings"), {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.bookings)) {
            remoteBookings = data.bookings;
          }
        }
      } catch (err) {
        // Fallback to local cache if network down
      }
    }

    let combined = [...remoteBookings];

    // Merge with any local bookings stored in localStorage so recent/offline bookings never disappear on refresh or click
    try {
      const localData = localStorage.getItem(getLocalStorageKey());
      if (localData) {
        const parsed = JSON.parse(localData);
        if (Array.isArray(parsed)) {
          const remoteIds = new Set(remoteBookings.map((b) => String(b._id)));
          const remoteTimes = remoteBookings.map((b) => new Date(b.scheduledDate).getTime());

          for (const item of parsed) {
            if (!item || !item.scheduledDate) continue;
            const itemTime = new Date(item.scheduledDate).getTime();
            const isDuplicate =
              remoteIds.has(String(item._id)) ||
              (item.bookingReference && remoteBookings.some((r) => r.bookingReference === item.bookingReference)) ||
              remoteTimes.some((t) => Math.abs(t - itemTime) < 15 * 60 * 1000);

            if (!isDuplicate) {
              combined.push(item);
              // Back-sync this local booking to MongoDB in the background
              if (authToken && typeof item._id === "string" && item._id.startsWith("local_")) {
                fetch(apiUrl("/api/counseling/bookings"), {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                  },
                  body: JSON.stringify({
                    scheduledDate: item.scheduledDate,
                    meetLink: item.meetLink,
                    sessionTitle: item.sessionTitle,
                    roadmapTitle: item.roadmapTitle,
                    durationMinutes: item.durationMinutes,
                    mentorName: item.mentorName,
                    notes: item.notes,
                    bookingReference: item.bookingReference,
                  }),
                }).catch(() => {});
              }
            }
          }
        }
      }
    } catch (e) {}

    combined.sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate));
    setBookings(combined);
    saveToLocalStorage(combined);
    setLoadingBookings(false);
  };

  useEffect(() => {
    fetchBookings();
  }, [token, user?._id]);

  // Load DaySchedule widget script & set up automatic multi-layer booking capture
  useEffect(() => {
    ensureDayScheduleScript();

    const cleanupListener = setupDayScheduleBookingListener({
      token,
      user,
      purchasedCareers,
      onBookingConfirmed: (saved) => {
        if (saved && saved._id) {
          setBookings((prev) => {
            const filtered = prev.filter((b) => {
              if (b._id === saved._id) return false;
              const diff = Math.abs(new Date(b.scheduledDate) - new Date(saved.scheduledDate));
              if (diff < 15 * 60 * 1000) return false;
              return true;
            });
            const next = [...filtered, saved].sort(
              (a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate)
            );
            saveToLocalStorage(next);
            return next;
          });

          toast({
            title: "1:1 Session Confirmed! 🎉",
            description: `Scheduled with ${saved.mentorName || "Uttkarsh"} for ${formatSessionDate(saved.scheduledDate)}. Your Google Meet link is ready!`,
          });
        } else {
          fetchBookings();
        }
      },
    });

    // Auto-sync when user returns from DaySchedule window/tab
    const handleWindowFocus = () => {
      fetchBookings();
    };

    window.addEventListener("focus", handleWindowFocus);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        fetchBookings();
      }
    });

    // Active polling interval while booking modal is open
    const pollInterval = setInterval(() => {
      try {
        if (sessionStorage.getItem("growvia_booking_active") === "true") {
          fetchBookings();
        }
      } catch (e) {}
    }, 4000);

    return () => {
      cleanupListener();
      window.removeEventListener("focus", handleWindowFocus);
      clearInterval(pollInterval);
    };
  }, [token, user?._id, purchasedCareers]);

  // Handle URL redirect query params from DaySchedule (e.g. ?counseling_booked=1)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (
        params.get("counseling_booked") === "1" ||
        params.get("counseling_booked") === "true" ||
        params.get("booked") === "1" ||
        params.get("booked") === "true"
      ) {
        const meetLink =
          params.get("meetLink") ||
          params.get("meet") ||
          params.get("join_url") ||
          "https://meet.google.com/qmv-sgyt-zkw";
        const dateStr = params.get("date") || params.get("scheduledDate");
        if (dateStr) {
          const scheduledDate = new Date(dateStr).toISOString();
          const payload = {
            scheduledDate,
            meetLink,
            sessionTitle: "1:1 Career Strategy & Roadmap Review",
            roadmapTitle: purchasedCareers[0]?.title || "Career Roadmap Strategy",
            durationMinutes: 30,
            mentorName: "Uttkarsh",
            notes: "Booked via DaySchedule",
          };
          if (token) {
            fetch(apiUrl("/api/counseling/bookings"), {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(payload),
            }).then(() => fetchBookings());
          }
        }

        // Clean query parameters from URL
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, "", cleanUrl);
      }
    } catch (e) {}
  }, [token, purchasedCareers]);

  const handleOpenDaySchedule = () => {
    openDayScheduleBooking(user);
  };

  const handleOpenAddModal = (existing = null) => {
    if (existing) {
      setEditingBookingId(existing._id);
      setBookingForm({
        scheduledDate: toDatetimeLocal(existing.scheduledDate),
        meetLink: existing.meetLink || "",
        sessionTitle: existing.sessionTitle || "1:1 Career Strategy & Roadmap Review",
        roadmapTitle: existing.roadmapTitle || (purchasedCareers[0]?.title || "General Career Strategy"),
        durationMinutes: existing.durationMinutes || 45,
        notes: existing.notes || "",
      });
    } else {
      setEditingBookingId(null);
      setBookingForm({
        scheduledDate: toDatetimeLocal(),
        meetLink: "https://meet.google.com/",
        sessionTitle: "1:1 Career Strategy & Roadmap Review",
        roadmapTitle: purchasedCareers[0]?.title || "General Career Strategy",
        durationMinutes: 45,
        notes: "",
      });
    }
    setIsBookingModalOpen(true);
  };

  const handleSaveBooking = async (e) => {
    e.preventDefault();
    if (!bookingForm.scheduledDate) {
      toast({
        title: "Date Required",
        description: "Please select a date and time for your 1:1 session.",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      scheduledDate: new Date(bookingForm.scheduledDate).toISOString(),
      meetLink: (bookingForm.meetLink || "").trim() || "https://meet.google.com/new",
      sessionTitle: bookingForm.sessionTitle || "1:1 Career Strategy & Roadmap Review",
      roadmapTitle: bookingForm.roadmapTitle || (purchasedCareers[0]?.title || "Career Roadmap"),
      durationMinutes: Number(bookingForm.durationMinutes) || 45,
      notes: bookingForm.notes || "",
    };

    try {
      if (editingBookingId) {
        if (token && !editingBookingId.startsWith("local_")) {
          await fetch(apiUrl(`/api/counseling/bookings/${editingBookingId}`), {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          });
        }
        const updated = bookings.map((b) =>
          b._id === editingBookingId ? { ...b, ...payload } : b
        );
        setBookings(updated);
        saveToLocalStorage(updated);
        toast({
          title: "Session Updated! 📅",
          description: "Your 1:1 counseling reminder has been updated.",
        });
      } else {
        let newBooking = null;
        if (token) {
          try {
            const res = await fetch(apiUrl("/api/counseling/bookings"), {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(payload),
            });
            if (res.ok) {
              const data = await res.json();
              newBooking = data.booking;
            }
          } catch (err) {}
        }

        if (!newBooking) {
          newBooking = {
            _id: "local_" + Date.now(),
            ...payload,
            status: "scheduled",
            mentorName: "Uttkarsh",
            createdAt: new Date().toISOString(),
          };
        }

        const updated = [...bookings, newBooking].sort(
          (a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate)
        );
        setBookings(updated);
        saveToLocalStorage(updated);
        toast({
          title: "Session Reminder Saved! 🚀",
          description: `Scheduled for ${formatSessionDate(payload.scheduledDate)}. Google Meet link ready!`,
        });
      }
    } catch (err) {
      toast({
        title: "Saved locally",
        description: "Reminder stored in your browser.",
      });
    } finally {
      setIsBookingModalOpen(false);
      setEditingBookingId(null);
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to remove this counseling reminder?")) return;
    try {
      if (token && !id.startsWith("local_")) {
        await fetch(apiUrl(`/api/counseling/bookings/${id}`), {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (e) {}

    const updated = bookings.filter((b) => b._id !== id);
    setBookings(updated);
    saveToLocalStorage(updated);
    toast({
      title: "Reminder Removed",
      description: "Counseling session has been removed.",
    });
  };

  const handleCopyMeetLink = (bookingId, meetLink) => {
    if (!meetLink) return;
    navigator.clipboard.writeText(meetLink);
    setCopiedBookingId(bookingId);
    toast({
      title: "Meet Link Copied! 📋",
      description: "Google Meet link copied to clipboard.",
    });
    setTimeout(() => {
      setCopiedBookingId((prev) => (prev === bookingId ? null : prev));
    }, 2500);
  };

  const now = new Date();
  const upcomingBookings = bookings.filter((b) => {
    if (b.status === "cancelled") return false;
    const sessionTime = new Date(b.scheduledDate);
    return sessionTime.getTime() > now.getTime() - 2 * 3600 * 1000;
  });
  const pastBookings = bookings.filter((b) => {
    if (b.status === "cancelled") return false;
    const sessionTime = new Date(b.scheduledDate);
    return sessionTime.getTime() <= now.getTime() - 2 * 3600 * 1000;
  });

  // Load only roadmaps explicitly saved by the user that are NOT already purchased
  const userSavedIds = Array.isArray(user?.savedRoadmaps) ? user.savedRoadmaps : [];
  const savedCareers = courses.filter(
    (c) => userSavedIds.includes(c.id) && !userPurchasedIds.includes(c.id)
  );

  const handleRemoveBookmark = async (e, careerId, careerTitle) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleSaveRoadmap(careerId);
    toast({
      title: "Roadmap Removed",
      description: `Removed "${careerTitle}" from your saved list.`,
    });
  };

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const getDisplaySalary = (career) => {
    if (career.id === "actuary") return "₹6L - ₹80L+";
    if (career.id === "biotechnologist") return "₹3L - ₹20L+";
    if (career.id === "engineer") return "₹5L - ₹40L+";
    if (career.id === "game-developer") return "₹4L - ₹30L+";
    return career.stats?.salary || "₹6L - ₹35L+";
  };

  const getConciseDesc = (career) => {
    if (career.id === "actuary") {
      return "Use mathematics and statistics to assess financial risk for insurance companies.";
    }
    return getCareerConciseDesc(career);
  };

  const userNameFirst = user?.name ? user.name.split(" ")[0].toLowerCase() : "sudhanshu";
  const userFullName = user?.name || "sudhanshu verma";
  const userEmail = user?.email || "vermaji372005@gmail.com";
  const avatarLetter = (user?.name || "Sudhanshu").charAt(0).toUpperCase();

  return (
    <Layout>
      <div className="w-full min-h-[calc(100vh-5rem)] bg-[#0B0B0D] text-foreground -mt-20 pt-28 pb-20 -mb-20 relative overflow-hidden">
        {/* Subtle Warm Atmospheric Glows */}
        <div className="fixed top-0 right-0 w-[550px] h-[550px] bg-gradient-to-b from-[#E5A855]/10 via-[#E5A855]/3 to-transparent rounded-full blur-[130px] pointer-events-none z-0" />
        <BotanicalLeaves />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* ── SIDEBAR CONTAINER ─────────────────────────────────── */}
            <aside className="w-full lg:w-[290px] xl:w-[300px] flex-shrink-0">
              <div className="bg-[#121214] p-6 rounded-3xl border border-white/[0.08] shadow-2xl backdrop-blur-sm sticky top-24">
                {/* User Profile Section */}
                <div className="flex items-center gap-4 mb-7 pb-6 border-b border-white/[0.08]">
                  {/* Golden Initial Circle */}
                  <div className="w-14 h-14 rounded-full bg-[#261C14] border border-[#E5A855]/30 flex items-center justify-center text-[#E5A855] text-2xl font-serif font-bold shadow-md shadow-amber-950/20 flex-shrink-0">
                    {avatarLetter}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-bold text-white text-base leading-tight truncate">
                      {userFullName}
                    </h3>
                    <div className="mt-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#261C12] border border-[#E5A855]/30 text-[#E5A855]">
                        {isAdmin ? "Admin Console" : "Student Member"}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-1 truncate" title={userEmail}>
                      {userEmail}
                    </p>
                  </div>
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-1.5">
                  {/* Purchased Tab */}
                  <button
                    type="button"
                    onClick={() => setActiveTab("purchased")}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm transition-all duration-200 ${
                      activeTab === "purchased"
                        ? "bg-[#1C1710] border border-[#E5A855]/50 shadow-[0_0_20px_rgba(229,168,85,0.08)] text-white font-medium"
                        : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IsometricCubeIcon className={`w-4 h-4 ${activeTab === "purchased" ? "text-[#E5A855]" : "text-zinc-400"}`} />
                      <span>Purchased</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#0A261D] text-[#34D399] border border-[#059669]/40 font-mono font-bold">
                      {purchasedCareers.length}
                    </span>
                  </button>

                  {/* Saved Roadmaps Tab */}
                  <button
                    type="button"
                    onClick={() => setActiveTab("saved")}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm transition-all duration-200 ${
                      activeTab === "saved"
                        ? "bg-[#1C1710] border border-[#E5A855]/50 shadow-[0_0_20px_rgba(229,168,85,0.08)] text-white font-medium"
                        : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Bookmark className={`w-4 h-4 ${activeTab === "saved" ? "text-[#E5A855]" : "text-zinc-400"}`} />
                      <span>Saved Roadmaps</span>
                    </div>
                    {savedCareers.length > 0 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 font-mono">
                        {savedCareers.length}
                      </span>
                    )}
                  </button>

                  {/* 1:1 Counseling & Reminders Tab */}
                  <button
                    type="button"
                    onClick={() => setActiveTab("counseling")}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm transition-all duration-200 ${
                      activeTab === "counseling"
                        ? "bg-[#1C1710] border border-[#E5A855]/50 shadow-[0_0_20px_rgba(229,168,85,0.08)] text-white font-medium"
                        : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Video className={`w-4 h-4 ${activeTab === "counseling" ? "text-[#E5A855]" : "text-zinc-400"}`} />
                      <span>1:1 Counseling</span>
                    </div>
                    {upcomingBookings.length > 0 ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-[#E5A855] border border-amber-500/40 font-mono font-bold animate-pulse">
                        {upcomingBookings.length}
                      </span>
                    ) : (
                      hasAccessToCounseling && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-[#E5A855] border border-amber-500/20 font-medium">
                          Active
                        </span>
                      )
                    )}
                  </button>

                  {/* Quiz Results Tab */}
                  <button
                    type="button"
                    onClick={() => setActiveTab("quiz")}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm transition-all duration-200 ${
                      activeTab === "quiz"
                        ? "bg-[#1C1710] border border-[#E5A855]/50 text-white font-medium"
                        : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <Sliders className="w-4 h-4 text-[#E5A855]" />
                    <span>Quiz Results</span>
                  </button>

                  {/* Certificates Tab */}
                  <button
                    type="button"
                    onClick={() => setActiveTab("certificates")}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm transition-all duration-200 ${
                      activeTab === "certificates"
                        ? "bg-[#1C1710] border border-[#E5A855]/50 text-white font-medium"
                        : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <Award className="w-4 h-4 text-zinc-400" />
                    <span>Certificates</span>
                  </button>

                  {/* Profile Tab */}
                  <button
                    type="button"
                    onClick={() => setActiveTab("profile")}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm transition-all duration-200 ${
                      activeTab === "profile"
                        ? "bg-[#1C1710] border border-[#E5A855]/50 text-white font-medium"
                        : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <User className="w-4 h-4 text-zinc-400" />
                    <span>Profile</span>
                  </button>

                  {/* Settings Tab */}
                  <button
                    type="button"
                    onClick={() => setActiveTab("settings")}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm transition-all duration-200 ${
                      activeTab === "settings"
                        ? "bg-[#1C1710] border border-[#E5A855]/50 text-white font-medium"
                        : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <Settings className="w-4 h-4 text-zinc-400" />
                    <span>Settings</span>
                  </button>
                </nav>

                {/* Admin Studio Link (if admin) */}
                {isAdmin && (
                  <div className="mt-5 pt-4 border-t border-white/[0.08]">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/10 rounded-xl text-xs h-9"
                    >
                      <Link href="/admin">
                        <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                        Admin Console
                      </Link>
                    </Button>
                  </div>
                )}

                {/* Log Out Item */}
                <div className="mt-6 pt-4 border-t border-white/[0.08]">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium text-[#EF4444] hover:text-red-300 hover:bg-red-500/10 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4 text-[#EF4444]" />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            </aside>

            {/* ── MAIN CONTENT AREA ─────────────────────────────────── */}
            <main className="flex-1 min-w-0">
              {/* Header Greeting Section */}
              <div className="mb-8">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E5A855] block mb-2">
                  STUDENT PORTAL
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-2">
                  <span className="text-white font-['Playfair_Display',serif]">Welcome, </span>
                  <span className="text-[#E5A855] font-['Playfair_Display',serif] font-bold">
                    {userNameFirst}
                  </span>
                </h1>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-2xl">
                  Track your unlocked career roadmaps, bookmarked paths, and guided progression.
                </p>
              </div>

              {/* ── 1:1 COUNSELING REMINDER SECTION ──────────────────── */}
              {(hasAccessToCounseling || upcomingBookings.length > 0) && activeTab !== "counseling" && (
                <div className="mb-8">
                  {upcomingBookings.length > 0 ? (
                    <div className="relative overflow-hidden rounded-3xl border border-[#E5A855]/40 bg-gradient-to-br from-[#1A1612] via-[#131316] to-[#0D0D10] p-6 sm:p-7 shadow-[0_0_35px_rgba(229,168,85,0.08)]">
                      {/* Glow Effects */}
                      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
                      <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

                      <div className="relative z-10 space-y-5">
                        {/* Header Row */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
                          <div className="flex items-center gap-2.5">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E5A855]" />
                            </span>
                            <span className="text-xs font-bold uppercase tracking-wider text-[#E5A855]">
                              1:1 Counseling Reminder
                            </span>
                            <span className="text-zinc-500 text-xs">•</span>
                            <span className="text-xs text-zinc-400">
                              {upcomingBookings.length} {upcomingBookings.length === 1 ? "Session Scheduled" : "Sessions Scheduled"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleOpenDaySchedule}
                              className="border-white/15 hover:border-amber-500/40 text-zinc-200 hover:text-white text-xs h-8 px-3 rounded-xl flex items-center gap-1.5 cursor-pointer hover:bg-white/5"
                            >
                              <Calendar className="w-3.5 h-3.5 text-[#E5A855]" />
                              <span>Book Another Session</span>
                            </Button>

                            <button
                              type="button"
                              onClick={() => setActiveTab("counseling")}
                              className="text-xs text-[#E5A855] hover:text-amber-300 font-medium transition-colors flex items-center gap-1 cursor-pointer ml-1"
                            >
                              <span>View All</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Cards for Upcoming Bookings */}
                        <div className="grid grid-cols-1 gap-4">
                          {upcomingBookings.slice(0, 2).map((booking) => {
                            const countdown = getCountdownBadge(booking.scheduledDate);
                            return (
                              <div
                                key={booking._id}
                                className="bg-[#0B0B0D]/80 border border-white/[0.08] rounded-2xl p-5 hover:border-white/15 transition-all shadow-md"
                              >
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                  {/* Left: Details */}
                                  <div className="space-y-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${countdown.color}`}>
                                        {countdown.label}
                                      </span>
                                      <span className="text-xs text-zinc-400">
                                        {booking.roadmapTitle || "Career Roadmap Mentorship"}
                                      </span>
                                    </div>

                                    <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                                      {booking.sessionTitle || "1:1 Career Strategy & Roadmap Review"}
                                    </h4>

                                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-300">
                                      <div className="flex items-center gap-1.5 text-[#E5A855] font-semibold">
                                        <Calendar className="w-4 h-4 text-[#E5A855]" />
                                        <span>{formatSessionDate(booking.scheduledDate)}</span>
                                      </div>
                                      <div className="flex items-center gap-1.5 text-zinc-400">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>{booking.durationMinutes || 45} mins</span>
                                      </div>
                                      <div className="flex items-center gap-1.5 text-zinc-400">
                                        <User className="w-3.5 h-3.5 text-[#E5A855]" />
                                        <span>Mentor: {booking.mentorName || "Uttkarsh"}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Right: Google Meet & Action Buttons */}
                                  <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0">
                                    <Button
                                      asChild
                                      className="bg-[#E5A855] hover:bg-[#d99640] text-black font-bold text-xs sm:text-sm h-10 px-4 rounded-xl shadow-lg shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer flex-shrink-0"
                                    >
                                      <a href={booking.meetLink} target="_blank" rel="noopener noreferrer">
                                        <Video className="w-4 h-4 text-black" />
                                        <span>Join Google Meet</span>
                                        <ExternalLink className="w-3 h-3 text-black/70 ml-0.5" />
                                      </a>
                                    </Button>

                                    <Button
                                      type="button"
                                      variant="outline"
                                      onClick={() => handleCopyMeetLink(booking._id, booking.meetLink)}
                                      className="border-white/15 text-zinc-300 hover:text-white hover:bg-white/10 text-xs h-10 px-3.5 rounded-xl flex items-center gap-1.5"
                                    >
                                      {copiedBookingId === booking._id ? (
                                        <>
                                          <Check className="w-3.5 h-3.5 text-[#E5A855]" />
                                          <span className="text-[#E5A855] font-semibold">Copied!</span>
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="w-3.5 h-3.5 text-zinc-400" />
                                          <span>Copy Link</span>
                                        </>
                                      )}
                                    </Button>

                                    <Button
                                      asChild
                                      variant="outline"
                                      className="border-white/15 text-zinc-300 hover:text-white hover:bg-white/10 text-xs h-10 px-3 rounded-xl hidden sm:flex items-center gap-1.5"
                                    >
                                      <a href={getGoogleCalendarUrl(booking)} target="_blank" rel="noopener noreferrer" title="Add to Google Calendar">
                                        <Calendar className="w-3.5 h-3.5 text-[#E5A855]" />
                                        <span>Calendar</span>
                                      </a>
                                    </Button>

                                    <Button
                                      type="button"
                                      variant="ghost"
                                      onClick={() => handleDeleteBooking(booking._id)}
                                      className="text-zinc-500 hover:text-red-400 hover:bg-red-500/10 text-xs h-10 px-2.5 rounded-xl"
                                      title="Remove Reminder"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                  </div>
                                </div>

                                {/* Google Meet Link Display */}
                                <div className="mt-3 pt-3 border-t border-white/[0.05] flex items-center justify-between text-xs">
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span className="text-zinc-500 text-[11px] font-mono">MEET LINK:</span>
                                    <a
                                      href={booking.meetLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-[#E5A855] hover:text-[#f5be6b] hover:underline font-mono truncate text-xs font-semibold"
                                    >
                                      {booking.meetLink}
                                    </a>
                                  </div>
                                  {booking.notes && (
                                    <span className="text-zinc-400 text-[11px] italic truncate max-w-[200px] hidden md:inline">
                                      Note: {booking.notes}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-[#131316] to-[#131316] p-5 sm:p-6 shadow-xl">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                        <div className="flex items-start gap-3.5">
                          <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[#E5A855] flex-shrink-0 mt-0.5 shadow-md shadow-amber-950/30">
                            <Calendar className="w-5 h-5 text-[#E5A855]" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5A855] bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                                1:1 Mentorship Included
                              </span>
                              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Unlocked
                              </span>
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-white">
                              Book Your 1:1 Career Strategy Session
                            </h3>
                            <p className="text-xs text-zinc-400 mt-1 max-w-xl leading-relaxed">
                              Connect directly with Uttkarsh in a private video strategy session. Review your personalized roadmap, break down transition hurdles, and optimize your preparation.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 w-full md:w-auto">
                          <Button
                            onClick={handleOpenDaySchedule}
                            className="bg-[#E5A855] hover:bg-[#d99640] text-black font-bold text-xs sm:text-sm h-10 px-6 rounded-xl shadow-lg shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer w-full md:w-auto"
                          >
                            <Calendar className="w-4 h-4 text-black" />
                            <span>Book 1:1 Session</span>
                            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── TAB CONTENT: PURCHASED ROADMAPS ──────────────────── */}
              {activeTab === "purchased" && (
                <div>
                  {/* Section Title Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2.5">
                      <IsometricCubeIcon className="w-5 h-5 text-[#2DD4BF]" />
                      <h2 className="text-xl font-bold text-white tracking-tight">
                        Purchased Roadmaps
                      </h2>
                      <span className="bg-[#0A261D] text-[#34D399] border border-[#059669]/40 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                        {purchasedCareers.length} Unlocked
                      </span>
                    </div>

                    <Button
                      asChild
                      className="bg-transparent border border-[#E5A855]/60 hover:bg-[#E5A855]/10 text-[#E5A855] text-xs font-semibold rounded-xl px-4 py-2 h-auto shadow-sm self-start sm:self-auto"
                    >
                      <Link href="/pricing">
                        <Zap className="w-3.5 h-3.5 mr-1.5 text-[#E5A855] fill-[#E5A855]" />
                        Unlock More Careers
                      </Link>
                    </Button>
                  </div>

                  <p className="text-zinc-400 text-xs sm:text-sm mb-6 leading-relaxed">
                    Your unlocked career roadmaps with stage breakdowns, college benchmarks, and mentor guides.
                  </p>

                  {/* Purchased Roadmaps Cards */}
                  {purchasedCareers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {purchasedCareers.map((career) => {
                        const displaySalary = getDisplaySalary(career);
                        const conciseDesc = getConciseDesc(career);

                        return (
                          <div
                            key={career.id}
                            className="group relative bg-[#131316] border border-white/[0.08] hover:border-white/20 rounded-2xl p-5 sm:p-6 overflow-hidden transition-all duration-300 shadow-xl shadow-black/50 flex flex-col justify-between"
                          >
                            {/* Glowing Candlestick Chart Watermark */}
                            <CandlestickWatermark />

                            {/* Card Header: Icon & Unlocked Badge */}
                            <div className="flex justify-between items-start relative z-10 mb-3">
                              <div className="w-10 h-10 rounded-xl bg-[#0B251E] border border-[#14B8A6]/30 flex items-center justify-center text-[#2DD4BF] shadow-sm">
                                <BarChart3 className="w-5 h-5" />
                              </div>

                              <div className="inline-flex items-center gap-1.5 bg-[#0B251E] text-[#2DD4BF] border border-[#14B8A6]/40 text-xs px-2.5 py-0.5 rounded-full font-semibold shadow-sm">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Unlocked</span>
                              </div>
                            </div>

                            {/* Career Info */}
                            <div className="relative z-10 flex-1 flex flex-col justify-between">
                              <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1.5 group-hover:text-amber-200 transition-colors line-clamp-1">
                                  {career.title}
                                </h3>
                                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed line-clamp-2 min-h-[36px] mb-5">
                                  {conciseDesc}
                                </p>
                              </div>

                              {/* Card Footer: Salary and Action Button */}
                              <div className="flex items-end justify-between pt-3.5 border-t border-white/[0.08] mt-auto gap-2">
                                <div className="flex items-center gap-2">
                                  <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-[#E5A855] flex-shrink-0" />
                                  <div>
                                    <div className="text-xs sm:text-sm font-bold text-white tracking-tight leading-tight">
                                      {displaySalary}
                                    </div>
                                    <span className="text-[10px] sm:text-[11px] text-zinc-500 font-medium">Avg. Salary</span>
                                  </div>
                                </div>

                                <Button
                                  asChild
                                  className="bg-gradient-to-r from-[#F5B544] to-[#E59835] hover:brightness-110 text-black font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 h-auto rounded-full shadow-lg shadow-amber-500/20 flex items-center gap-1.5 flex-shrink-0 transition-transform hover:scale-[1.02]"
                                >
                                  <Link href={`/roadmaps/${career.id}`}>
                                    Open Roadmap <ArrowRight className="w-4 h-4 ml-0.5" />
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* When 1 roadmap is unlocked, show companion card to complete the 2-column row on desktop */}
                      {purchasedCareers.length === 1 && (
                        <Link href="/pricing" className="block h-full">
                          <div className="h-full min-h-[220px] bg-[#131316]/60 border-2 border-dashed border-white/10 hover:border-[#E5A855]/40 rounded-2xl p-6 flex flex-col justify-between items-center text-center group cursor-pointer transition-all duration-300 hover:bg-[#131316]">
                            <div className="my-auto flex flex-col items-center">
                              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#E5A855] mb-3 group-hover:scale-110 transition-transform">
                                <Zap className="w-6 h-6 fill-[#E5A855]" />
                              </div>
                              <h4 className="text-base font-bold text-white mb-1 group-hover:text-amber-200 transition-colors">
                                Unlock Another Career
                              </h4>
                              <p className="text-xs text-zinc-400 max-w-[240px] leading-relaxed">
                                Explore 48+ honest career roadmaps with lifetime access for just ₹199.
                              </p>
                            </div>

                            <span className="text-xs font-semibold text-[#E5A855] group-hover:text-amber-300 flex items-center gap-1 mt-3">
                              Browse All Roadmaps <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </div>
                        </Link>
                      )}
                    </div>
                  ) : (
                    /* Clean Empty State when user hasn't unlocked any yet */
                    <div className="bg-[#131316] border border-white/[0.08] rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden shadow-xl">
                      <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-4">
                        <IsometricCubeIcon className="w-7 h-7 text-[#E5A855]" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">No Purchased Roadmaps Yet</h3>
                      <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mb-6 leading-relaxed">
                        Unlock lifetime access to any career roadmap for just ₹199. Gain uncompromised stage breakdowns, tier-1 vs budget colleges, and curated mentors.
                      </p>
                      <Button
                        asChild
                        className="bg-gradient-to-r from-[#F5B544] to-[#E59835] text-black font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-lg shadow-amber-500/20"
                      >
                        <Link href="/pricing">
                          Explore Pricing & Unlock — ₹199 <ArrowRight className="w-4 h-4 ml-1.5" />
                        </Link>
                      </Button>
                    </div>
                  )}

                  {/* ── BOTTOM PROMO CARDS (MATCHING THE SCREENSHOT) ───── */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                    {/* Card 1: College Guidance (with Golden Highlight Border) */}
                    <div className="bg-[#131316] rounded-2xl border border-[#E5A855]/60 p-6 sm:p-7 relative overflow-hidden shadow-[0_0_30px_rgba(229,168,85,0.06)] group">
                      <CollegeBuildingWatermark />

                      <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                          <div className="w-10 h-10 rounded-xl bg-[#261C14] border border-[#E5A855]/30 flex items-center justify-center text-[#E5A855] mb-4">
                            <GraduationCap className="w-5 h-5 text-[#E5A855]" />
                          </div>

                          <h4 className="font-bold text-white text-base mb-1.5">
                            Need College Guidance?
                          </h4>
                          <p className="text-xs text-zinc-400 leading-relaxed max-w-[280px]">
                            Explore top tier and budget-friendly colleges for your chosen roadmap.
                          </p>
                        </div>

                        <Link
                          href="/roadmaps"
                          className="text-[#E5A855] hover:text-[#F5B855] text-xs font-semibold flex items-center gap-1.5 transition-colors mt-5 inline-flex"
                        >
                          <span>View College Benchmarks</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    {/* Card 2: Resume & Portfolio Builder */}
                    <div className="bg-[#131316] rounded-2xl border border-white/[0.08] hover:border-white/15 p-6 sm:p-7 relative overflow-hidden shadow-md">
                      <ResumeDocumentWatermark />

                      <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                          <div className="w-10 h-10 rounded-xl bg-[#221B14] border border-amber-600/30 flex items-center justify-center text-amber-500 mb-4">
                            <FileText className="w-5 h-5 text-amber-400" />
                          </div>

                          <h4 className="font-bold text-white text-base mb-1.5">
                            Resume & Portfolio Builder
                          </h4>
                          <p className="text-xs text-zinc-400 leading-relaxed max-w-[280px]">
                            Build a professional industry-ready resume tailored to your target roadmaps.
                          </p>
                        </div>

                        <div className="mt-5">
                          <span className="inline-block px-3.5 py-1 bg-[#1C1C20] border border-zinc-700/60 text-zinc-400 text-xs rounded-full font-medium">
                            Coming Soon
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── TAB CONTENT: SAVED ROADMAPS ──────────────────────── */}
              {activeTab === "saved" && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2.5">
                      <Bookmark className="w-5 h-5 text-[#E5A855]" />
                      <h2 className="text-xl font-bold text-white tracking-tight">Saved Roadmaps</h2>
                      <span className="bg-[#1C1710] text-[#E5A855] border border-[#E5A855]/40 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                        {savedCareers.length} Saved
                      </span>
                    </div>

                    <Button
                      asChild
                      className="bg-transparent border border-white/15 hover:bg-white/5 text-white text-xs font-semibold rounded-xl px-4 py-2 h-auto self-start sm:self-auto"
                    >
                      <Link href="/roadmaps">
                        Browse All Roadmaps <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </Link>
                    </Button>
                  </div>

                  <p className="text-zinc-400 text-xs sm:text-sm mb-6 leading-relaxed">
                    Career roadmaps bookmarked for later exploration and quick review.
                  </p>

                  {savedCareers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {savedCareers.map((career) => {
                        const displaySalary = getDisplaySalary(career);
                        const conciseDesc = getConciseDesc(career);

                        return (
                          <div
                            key={career.id}
                            className="group relative bg-[#131316] border border-white/[0.08] hover:border-white/20 rounded-2xl p-5 sm:p-6 overflow-hidden transition-all duration-300 shadow-xl shadow-black/50 flex flex-col justify-between"
                          >
                            <CandlestickWatermark />

                            <div className="flex justify-between items-start relative z-10 mb-3">
                              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/90">
                                <BarChart3 className="w-5 h-5" />
                              </div>

                              <button
                                type="button"
                                onClick={(e) => handleRemoveBookmark(e, career.id, career.title)}
                                title="Remove from saved"
                                className="p-1.5 rounded-lg hover:bg-white/10 text-[#E5A855] transition-colors"
                              >
                                <Bookmark className="w-5 h-5 fill-[#E5A855]" />
                              </button>
                            </div>

                            <div className="relative z-10 flex-1 flex flex-col justify-between">
                              <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1.5 group-hover:text-amber-200 transition-colors line-clamp-1">
                                  {career.title}
                                </h3>
                                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed line-clamp-2 min-h-[36px] mb-5">
                                  {conciseDesc}
                                </p>
                              </div>

                              <div className="flex items-end justify-between pt-3.5 border-t border-white/[0.08] mt-auto gap-2">
                                <div className="flex items-center gap-2">
                                  <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-[#E5A855] flex-shrink-0" />
                                  <div>
                                    <div className="text-xs sm:text-sm font-bold text-white tracking-tight leading-tight">
                                      {displaySalary}
                                    </div>
                                    <span className="text-[10px] sm:text-[11px] text-zinc-500 font-medium">Avg. Salary</span>
                                  </div>
                                </div>

                                <Button
                                  asChild
                                  className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2 h-auto rounded-full border border-white/15 flex items-center gap-1.5 flex-shrink-0"
                                >
                                  <Link href={`/roadmaps/${career.id}`}>
                                    View Roadmap <ArrowRight className="w-4 h-4 ml-0.5" />
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* Explore more card */}
                      <Link href="/roadmaps" className="block h-full">
                        <div className="h-full min-h-[220px] bg-[#131316]/60 border-2 border-dashed border-white/10 hover:border-white/25 rounded-2xl p-6 flex flex-col justify-between items-center text-center group cursor-pointer transition-all duration-300 hover:bg-[#131316]">
                          <div className="my-auto flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform text-zinc-400 group-hover:text-white">
                              <Compass className="w-6 h-6" />
                            </div>
                            <h4 className="text-base font-bold text-white mb-1">Explore More Careers</h4>
                            <p className="text-xs text-zinc-400 max-w-[240px] leading-relaxed">
                              Discover 48+ verified roadmaps with salary insights & milestones.
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-[#E5A855] group-hover:text-amber-300 flex items-center gap-1 mt-3">
                            Browse All Roadmaps <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </Link>
                    </div>
                  ) : (
                    <div className="bg-[#131316] border border-white/[0.08] rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden shadow-xl">
                      <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-4">
                        <Bookmark className="w-7 h-7 text-[#E5A855]" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">No Saved Roadmaps Yet</h3>
                      <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mb-6 leading-relaxed">
                        Bookmark any career path while browsing roadmaps to track them here.
                      </p>
                      <Button
                        asChild
                        className="bg-gradient-to-r from-[#F5B544] to-[#E59835] text-black font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-lg shadow-amber-500/20"
                      >
                        <Link href="/roadmaps">
                          Explore Career Roadmaps <ArrowRight className="w-4 h-4 ml-1.5" />
                        </Link>
                      </Button>
                    </div>
                  )}

                  {/* Promo Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                    <div className="bg-[#131316] rounded-2xl border border-[#E5A855]/60 p-6 sm:p-7 relative overflow-hidden shadow-[0_0_30px_rgba(229,168,85,0.06)] group">
                      <CollegeBuildingWatermark />
                      <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                          <div className="w-10 h-10 rounded-xl bg-[#261C14] border border-[#E5A855]/30 flex items-center justify-center text-[#E5A855] mb-4">
                            <GraduationCap className="w-5 h-5 text-[#E5A855]" />
                          </div>
                          <h4 className="font-bold text-white text-base mb-1.5">Need College Guidance?</h4>
                          <p className="text-xs text-zinc-400 leading-relaxed max-w-[280px]">
                            Explore top tier and budget-friendly colleges for your chosen roadmap.
                          </p>
                        </div>
                        <Link
                          href="/roadmaps"
                          className="text-[#E5A855] hover:text-[#F5B855] text-xs font-semibold flex items-center gap-1.5 transition-colors mt-5 inline-flex"
                        >
                          <span>View College Benchmarks</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    <div className="bg-[#131316] rounded-2xl border border-white/[0.08] hover:border-white/15 p-6 sm:p-7 relative overflow-hidden shadow-md">
                      <ResumeDocumentWatermark />
                      <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                          <div className="w-10 h-10 rounded-xl bg-[#221B14] border border-amber-600/30 flex items-center justify-center text-amber-500 mb-4">
                            <FileText className="w-5 h-5 text-amber-400" />
                          </div>
                          <h4 className="font-bold text-white text-base mb-1.5">Resume & Portfolio Builder</h4>
                          <p className="text-xs text-zinc-400 leading-relaxed max-w-[280px]">
                            Build a professional industry-ready resume tailored to your target roadmaps.
                          </p>
                        </div>
                        <div className="mt-5">
                          <span className="inline-block px-3.5 py-1 bg-[#1C1C20] border border-zinc-700/60 text-zinc-400 text-xs rounded-full font-medium">
                            Coming Soon
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── TAB CONTENT: QUIZ RESULTS ────────────────────────── */}
              {activeTab === "quiz" && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2.5">
                      <Sliders className="w-5 h-5 text-[#E5A855]" />
                      <h2 className="text-xl font-bold text-white tracking-tight">Career Quiz Results</h2>
                    </div>

                    <Button
                      asChild
                      className="bg-transparent border border-[#E5A855]/60 hover:bg-[#E5A855]/10 text-[#E5A855] text-xs font-semibold rounded-xl px-4 py-2 h-auto"
                    >
                      <Link href="/career-quiz">
                        Retake Assessment <Compass className="w-3.5 h-3.5 ml-1.5" />
                      </Link>
                    </Button>
                  </div>

                  <p className="text-zinc-400 text-xs sm:text-sm mb-6 leading-relaxed">
                    Personalized match breakdown generated by our career assessment engine.
                  </p>

                  {latestAssessment ? (
                    <div className="bg-[#131316] border border-white/[0.08] rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl mb-6">
                      <CandlestickWatermark />
                      <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#E5A855] text-xs font-semibold mb-4">
                          <Sparkles className="w-3.5 h-3.5" /> Latest Assessment Match
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {latestAssessment.topRecommendations?.[0]?.title || "Recommended Career Path"}
                        </h3>
                        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-xl mb-6">
                          {latestAssessment.aiAnalysis?.summary ||
                            latestAssessment.topRecommendations?.[0]?.description ||
                            "Based on your assessment answers, this path best matches your natural strengths and interests."}
                        </p>

                        <div className="flex items-center gap-4">
                          <Button
                            asChild
                            className="bg-gradient-to-r from-[#F5B544] to-[#E59835] text-black font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-lg shadow-amber-500/20"
                          >
                            <Link href={`/roadmaps/${latestAssessment.topRecommendations?.[0]?.careerId || "actuary"}`}>
                              Open Career Roadmap <ArrowRight className="w-4 h-4 ml-1.5" />
                            </Link>
                          </Button>
                          <Button asChild variant="outline" className="border-white/15 text-white rounded-full text-xs">
                            <Link href="/career-quiz">View Full Assessment</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#131316] border border-white/[0.08] rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden shadow-xl mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-4">
                        <Compass className="w-7 h-7 text-[#E5A855]" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">No Quiz Results Recorded Yet</h3>
                      <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mb-6 leading-relaxed">
                        Take our 10-question scientifically backed career assessment to discover your top aligned professions.
                      </p>
                      <Button
                        asChild
                        className="bg-gradient-to-r from-[#F5B544] to-[#E59835] text-black font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-lg shadow-amber-500/20"
                      >
                        <Link href="/career-quiz">
                          Take Free Career Quiz <ArrowRight className="w-4 h-4 ml-1.5" />
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* ── TAB CONTENT: CERTIFICATES ────────────────────────── */}
              {activeTab === "certificates" && (
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <Award className="w-5 h-5 text-[#E5A855]" />
                    <h2 className="text-xl font-bold text-white tracking-tight">Certificates</h2>
                  </div>
                  <p className="text-zinc-400 text-xs sm:text-sm mb-6 leading-relaxed">
                    Verified milestone progression certificates awarded upon completed career stages.
                  </p>

                  <div className="bg-[#131316] border border-white/[0.08] rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden shadow-xl">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-4">
                      <Award className="w-7 h-7 text-[#E5A855]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Milestone Certificates</h3>
                    <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mb-6 leading-relaxed">
                      Complete stages in your purchased roadmaps to earn verified Growvia accomplishment credentials.
                    </p>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#1C1C20] border border-zinc-700/60 text-zinc-400 text-xs font-medium">
                      Unlocked upon Stage Completion
                    </span>
                  </div>
                </div>
              )}

              {/* ── TAB CONTENT: PROFILE ─────────────────────────────── */}
              {activeTab === "profile" && (
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <User className="w-5 h-5 text-[#E5A855]" />
                    <h2 className="text-xl font-bold text-white tracking-tight">Student Profile</h2>
                  </div>
                  <p className="text-zinc-400 text-xs sm:text-sm mb-6 leading-relaxed">
                    Your personal membership information and account credentials.
                  </p>

                  <div className="bg-[#131316] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <span className="text-[11px] text-zinc-500 block mb-1">Full Name</span>
                        <span className="text-sm font-semibold text-white">{userFullName}</span>
                      </div>
                      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <span className="text-[11px] text-zinc-500 block mb-1">Email Address</span>
                        <span className="text-sm font-semibold text-white">{userEmail}</span>
                      </div>
                      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <span className="text-[11px] text-zinc-500 block mb-1">Membership Tier</span>
                        <span className="text-sm font-semibold text-[#E5A855]">
                          {isAdmin ? "Administrator" : "Student Member (Lifetime Access)"}
                        </span>
                      </div>
                      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <span className="text-[11px] text-zinc-500 block mb-1">Unlocked Roadmaps</span>
                        <span className="text-sm font-semibold text-[#34D399]">
                          {purchasedCareers.length} Careers Active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── TAB CONTENT: SETTINGS ────────────────────────────── */}
              {activeTab === "settings" && (
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <Settings className="w-5 h-5 text-[#E5A855]" />
                    <h2 className="text-xl font-bold text-white tracking-tight">Account Settings</h2>
                  </div>
                  <p className="text-zinc-400 text-xs sm:text-sm mb-6 leading-relaxed">
                    Manage your preferences, security credentials, and notifications.
                  </p>

                  <div className="bg-[#131316] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-5">
                    <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                      <div>
                        <h4 className="text-sm font-semibold text-white">Email Notifications</h4>
                        <p className="text-xs text-zinc-400">Receive roadmap updates and exam schedule reminders</p>
                      </div>
                      <span className="text-xs text-[#34D399] font-medium bg-[#0A261D] border border-[#059669]/40 px-3 py-1 rounded-full">
                        Enabled
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <h4 className="text-sm font-semibold text-white">Session Security</h4>
                        <p className="text-xs text-zinc-400">Active token session authenticated via JWT</p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={handleLogout}
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs rounded-xl"
                      >
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* ── TAB CONTENT: 1:1 COUNSELING & REMINDERS ──────────── */}
              {activeTab === "counseling" && (
                <div className="space-y-8">
                  {/* Title Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-[#E5A855]">
                        <Video className="w-5 h-5 text-[#E5A855]" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                          1:1 Counseling & Mentorship
                        </h2>
                        <span className="text-xs text-zinc-400">
                          Scheduled video appointments, Google Meet links, and reminders
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Button
                        onClick={handleOpenDaySchedule}
                        className="bg-[#E5A855] hover:bg-[#d99640] text-black font-bold text-xs sm:text-sm px-4 py-2 h-auto rounded-xl shadow-md shadow-amber-500/20 flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
                      >
                        <Calendar className="w-4 h-4 text-black" />
                        <span>Schedule 1:1 Session</span>
                      </Button>
                    </div>
                  </div>

                  {/* Scheduled Reminders List */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                        <CalendarCheck className="w-4 h-4 text-[#E5A855]" />
                        Upcoming Scheduled Sessions ({upcomingBookings.length})
                      </h3>
                      {upcomingBookings.length > 0 && (
                        <span className="text-xs text-[#E5A855] font-semibold bg-amber-500/10 border border-amber-500/25 px-2.5 py-0.5 rounded-full">
                          Live Google Meet Active
                        </span>
                      )}
                    </div>

                    {upcomingBookings.length > 0 ? (
                      <div className="grid grid-cols-1 gap-4">
                        {upcomingBookings.map((booking) => {
                          const countdown = getCountdownBadge(booking.scheduledDate);
                          return (
                            <div
                              key={booking._id}
                              className="bg-[#131316] border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden"
                            >
                              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                                <div className="space-y-2.5">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${countdown.color}`}>
                                      {countdown.label}
                                    </span>
                                    <span className="text-xs text-[#E5A855] font-semibold bg-[#261C12] border border-[#E5A855]/30 px-2.5 py-0.5 rounded-full">
                                      {booking.roadmapTitle || "Career Roadmap Strategy"}
                                    </span>
                                  </div>

                                  <h4 className="text-xl font-bold text-white tracking-tight">
                                    {booking.sessionTitle || "1:1 Career Strategy & Roadmap Review"}
                                  </h4>

                                  <div className="flex flex-wrap items-center gap-5 text-xs text-zinc-300">
                                    <div className="flex items-center gap-1.5 text-[#E5A855] font-bold text-sm">
                                      <Calendar className="w-4 h-4 text-[#E5A855]" />
                                      <span>{formatSessionDate(booking.scheduledDate)}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-zinc-400">
                                      <Clock className="w-3.5 h-3.5" />
                                      <span>{booking.durationMinutes || 45} Minutes Call</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-zinc-400">
                                      <User className="w-3.5 h-3.5 text-[#E5A855]" />
                                      <span>Mentor: {booking.mentorName || "Uttkarsh"}</span>
                                    </div>
                                  </div>

                                  {booking.notes && (
                                    <p className="text-xs text-zinc-400 bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.05] max-w-xl">
                                      <strong className="text-zinc-300">Discussion notes:</strong> {booking.notes}
                                    </p>
                                  )}
                                </div>

                                <div className="flex flex-wrap items-center gap-2.5">
                                  <Button
                                    asChild
                                    size="lg"
                                    className="bg-[#E5A855] hover:bg-[#d99640] text-black font-bold text-xs sm:text-sm h-11 px-5 rounded-xl shadow-lg shadow-amber-500/25 flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
                                  >
                                    <a href={booking.meetLink} target="_blank" rel="noopener noreferrer">
                                      <Video className="w-4 h-4 text-black" />
                                      <span>Join Google Meet</span>
                                      <ExternalLink className="w-3.5 h-3.5 text-black/70 ml-0.5" />
                                    </a>
                                  </Button>

                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => handleCopyMeetLink(booking._id, booking.meetLink)}
                                    className="border-white/15 text-zinc-300 hover:text-white hover:bg-white/10 text-xs h-11 px-4 rounded-xl flex items-center gap-1.5"
                                  >
                                    {copiedBookingId === booking._id ? (
                                      <>
                                        <Check className="w-3.5 h-3.5 text-[#E5A855]" />
                                        <span className="text-[#E5A855] font-semibold">Copied!</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-3.5 h-3.5 text-zinc-400" />
                                        <span>Copy Link</span>
                                      </>
                                    )}
                                  </Button>

                                  <Button
                                    asChild
                                    variant="outline"
                                    className="border-white/15 text-zinc-300 hover:text-white hover:bg-white/10 text-xs h-11 px-3.5 rounded-xl flex items-center gap-1.5"
                                  >
                                    <a href={getGoogleCalendarUrl(booking)} target="_blank" rel="noopener noreferrer" title="Add to Google Calendar">
                                      <Calendar className="w-3.5 h-3.5 text-[#E5A855]" />
                                      <span>Add to Calendar</span>
                                    </a>
                                  </Button>

                                  <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => handleDeleteBooking(booking._id)}
                                    className="text-zinc-500 hover:text-red-400 hover:bg-red-500/10 text-xs h-11 px-3 rounded-xl"
                                    title="Cancel Reminder"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>

                              {/* Google Meet Link Display Bar */}
                              <div className="mt-4 pt-3.5 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                                <div className="flex items-center gap-2">
                                  <span className="text-zinc-500 font-mono text-[11px]">MEET LINK:</span>
                                  <a
                                    href={booking.meetLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#E5A855] hover:text-[#f5be6b] hover:underline font-mono text-xs truncate max-w-sm font-semibold"
                                  >
                                    {booking.meetLink}
                                  </a>
                                </div>
                                <span className="text-[11px] text-zinc-500">
                                  Check your inbox for Google Calendar invite & reminders
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="bg-[#131316] border border-white/[0.08] rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden shadow-xl">
                        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-4">
                          <Video className="w-7 h-7 text-[#E5A855]" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No Upcoming Sessions Booked</h3>
                        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mb-6 leading-relaxed">
                          {hasAccessToCounseling
                            ? "You have 1:1 Counseling unlocked! Pick an open time slot on DaySchedule to meet with Uttkarsh."
                            : "Unlock any career roadmap to get access to 1:1 strategy sessions with experienced mentors."}
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-3">
                          {hasAccessToCounseling ? (
                            <>
                              <Button
                                onClick={handleOpenDaySchedule}
                                className="bg-[#E5A855] hover:bg-[#d99640] text-black font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-lg shadow-amber-500/20"
                              >
                                <Calendar className="w-4 h-4 mr-2" />
                                Book 1:1 Session on DaySchedule
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => handleOpenAddModal()}
                                className="border-white/15 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full"
                              >
                                <Plus className="w-4 h-4 mr-1.5 text-[#E5A855]" />
                                Add Booked Session Details
                              </Button>
                            </>
                          ) : (
                            <Button
                              asChild
                              className="bg-gradient-to-r from-[#F5B544] to-[#E59835] text-black font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-lg shadow-amber-500/20"
                            >
                              <Link href="/pricing">
                                Unlock Roadmap — ₹199 <ArrowRight className="w-4 h-4 ml-1.5" />
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Past Sessions (if any) */}
                  {pastBookings.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-white/[0.08]">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500">
                        Past Completed Sessions ({pastBookings.length})
                      </h3>
                      <div className="grid grid-cols-1 gap-3">
                        {pastBookings.map((b) => (
                          <div
                            key={b._id}
                            className="bg-[#131316]/50 border border-white/[0.05] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs opacity-75"
                          >
                            <div className="space-y-1">
                              <span className="font-semibold text-white">{b.sessionTitle}</span>
                              <div className="flex items-center gap-3 text-zinc-400 text-[11px]">
                                <span>{formatSessionDate(b.scheduledDate)}</span>
                                <span>•</span>
                                <span>{b.roadmapTitle}</span>
                              </div>
                            </div>
                            <span className="text-[11px] text-zinc-400 bg-white/5 px-2.5 py-1 rounded-full self-start sm:self-auto">
                              Completed
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* How 1:1 Counseling Works */}
                  <div className="bg-[#131316] border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-6">
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#E5A855]" />
                      How 1:1 Counseling Sessions Work
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="p-4 rounded-2xl bg-[#0D0D10] border border-white/[0.06] space-y-2">
                        <div className="w-8 h-8 rounded-full bg-amber-500/15 text-[#E5A855] font-bold text-xs flex items-center justify-center">
                          1
                        </div>
                        <h4 className="text-sm font-bold text-white">Pick a Time Slot</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          Choose an open appointment slot that fits your schedule on the DaySchedule booking calendar.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#0D0D10] border border-white/[0.06] space-y-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-400 font-bold text-xs flex items-center justify-center">
                          2
                        </div>
                        <h4 className="text-sm font-bold text-white">Google Meet Link</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          An automatic Google Meet link is generated and saved directly to your dashboard reminders and email.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#0D0D10] border border-white/[0.06] space-y-2">
                        <div className="w-8 h-8 rounded-full bg-sky-500/15 text-sky-400 font-bold text-xs flex items-center justify-center">
                          3
                        </div>
                        <h4 className="text-sm font-bold text-white">Join Live Mentorship</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          Connect on video call with Uttkarsh to review your roadmap milestones, resume, and college roadmap.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* ── SCHEDULE / ADD 1:1 SESSION MODAL ──────────────────────── */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in-0 duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#131316] border border-amber-500/30 p-6 sm:p-7 shadow-2xl text-left max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              type="button"
              onClick={() => {
                setIsBookingModalOpen(false);
                setEditingBookingId(null);
              }}
              className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[#E5A855]">
                <Video className="w-5 h-5 text-[#E5A855]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {editingBookingId ? "Edit 1:1 Counseling Reminder" : "Add 1:1 Counseling Reminder"}
                </h3>
                <p className="text-xs text-zinc-400">
                  Keep track of your meeting date, time, and Google Meet link.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveBooking} className="space-y-4">
              {/* Scheduled Date & Time */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Meeting Date & Time <span className="text-amber-400">*</span>
                </label>
                <input
                  type="datetime-local"
                  required
                  value={bookingForm.scheduledDate}
                  onChange={(e) => setBookingForm({ ...bookingForm, scheduledDate: e.target.value })}
                  className="w-full bg-[#0D0D10] border border-white/15 focus:border-[#E5A855] focus:outline-none rounded-xl px-3.5 py-2.5 text-sm text-white transition-colors"
                />
              </div>

              {/* Google Meet Link */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Google Meet Link <span className="text-amber-400">*</span>
                </label>
                  <div className="relative">
                    <input
                      type="url"
                      required
                      placeholder="https://meet.google.com/xxx-yyyy-zzz"
                      value={bookingForm.meetLink}
                      onChange={(e) => setBookingForm({ ...bookingForm, meetLink: e.target.value })}
                      className="w-full bg-[#0D0D10] border border-white/15 focus:border-[#E5A855] focus:outline-none rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-[#E5A855] font-mono transition-colors"
                    />
                    <Video className="w-4 h-4 text-[#E5A855] absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  DaySchedule meeting link or personal Google Meet link.
                </p>
              </div>

              {/* Career Roadmap / Topic */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Target Career Roadmap / Topic
                </label>
                <select
                  value={bookingForm.roadmapTitle}
                  onChange={(e) => setBookingForm({ ...bookingForm, roadmapTitle: e.target.value })}
                  className="w-full bg-[#0D0D10] border border-white/15 focus:border-[#E5A855] focus:outline-none rounded-xl px-3.5 py-2.5 text-sm text-white transition-colors"
                >
                  <option value="General Career Strategy">General Career Strategy & Review</option>
                  {purchasedCareers.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title} Roadmap
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Duration
                </label>
                <select
                  value={bookingForm.durationMinutes}
                  onChange={(e) => setBookingForm({ ...bookingForm, durationMinutes: Number(e.target.value) })}
                  className="w-full bg-[#0D0D10] border border-white/15 focus:border-[#E5A855] focus:outline-none rounded-xl px-3.5 py-2.5 text-sm text-white transition-colors"
                >
                  <option value={30}>30 Minutes</option>
                  <option value={45}>45 Minutes (Recommended)</option>
                  <option value={60}>60 Minutes</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Topics / Questions for Mentor (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g., Reviewing my resume, college cutoff questions, transition strategy..."
                  value={bookingForm.notes}
                  onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                  className="w-full bg-[#0D0D10] border border-white/15 focus:border-[#E5A855] focus:outline-none rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white transition-colors resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.08]">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setIsBookingModalOpen(false);
                    setEditingBookingId(null);
                  }}
                  className="text-zinc-400 hover:text-white text-xs h-9 px-4 rounded-xl"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="bg-[#E5A855] hover:bg-[#d99640] text-black font-bold text-xs sm:text-sm h-9 px-5 rounded-xl shadow-lg shadow-amber-500/25"
                >
                  {editingBookingId ? "Update Reminder" : "Save Session Reminder"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
