import React, { lazy, Suspense, useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";

// Prevent browser from restoring previous scroll positions on SPA navigation
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;

    // Handle any delayed layout rendering from lazy-loaded routes
    const frameId = requestAnimationFrame(() => {
      if (window.location.hash) {
        const el = document.querySelector(window.location.hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    });

    return () => cancelAnimationFrame(frameId);
  }, [location]);

  return null;
}
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/auth-context";
import { CourseProvider } from "@/context/course-context";
import { VideoProvider } from "@/context/video-context";
import { AdminRoute, UserRoute } from "@/components/protected-route";
import { PageLoader } from "@/components/page-loader";
import { ErrorBoundary } from "@/components/error-boundary";
import { ChatWidget } from "@/components/chat/ChatWidget";
import NotFound from "@/pages/not-found";

// Lazy-loaded Student Pages
const Home = lazy(() => import("@/pages/home"));
const Roadmaps = lazy(() => import("@/pages/roadmaps"));
const RoadmapDetail = lazy(() => import("@/pages/roadmap-detail"));
const Quiz = lazy(() => import("@/pages/quiz"));
const Pricing = lazy(() => import("@/pages/pricing"));
const About = lazy(() => import("@/pages/about"));
const Contact = lazy(() => import("@/pages/contact"));
const Login = lazy(() => import("@/pages/login"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Videos = lazy(() => import("@/pages/videos"));

// Lazy-loaded Admin Pages (Code-split to save ~400kB on initial student load)
const AdminDashboard = lazy(() => import("@/pages/admin/admin-dashboard"));
const CourseEditor = lazy(() => import("@/pages/admin/course-editor"));
const VideoManager = lazy(() => import("@/pages/admin/video-manager"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {/* Public Pages: Guests can only explore Roadmaps, Home, About, Contact, and Login */}
        <Route path="/" component={Home} />
        <Route path="/roadmaps" component={Roadmaps} />
        <Route path="/roadmaps/:career" component={RoadmapDetail} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/contact-us" component={Contact} />
        <Route path="/login" component={Login} />

        {/* Career Assessment Quiz (Accessible to guests and members; attaches userId if signed in) */}
        <Route path="/career-quiz" component={Quiz} />
        <Route path="/quiz" component={Quiz} />

        <Route path="/videos">
          {(params) => (
            <UserRoute
              component={Videos}
              title="Sign in for Mentor Videos"
              description="Mentor masterclasses, industry insights, and career guidance sessions are reserved for registered members. Guests can explore all roadmaps for free."
              {...params}
            />
          )}
        </Route>
        {/* Pricing page: Protected; only accessible to logged-in members */}
        <Route path="/pricing">
          {(params) => (
            <UserRoute
              component={Pricing}
              title="Sign in to View Pricing & Plans"
              description="Detailed career roadmaps, preparation strategies, and curated mentor resources are reserved for registered students. Please sign in or create an account to view pricing and plans."
              {...params}
            />
          )}
        </Route>
        <Route path="/dashboard">
          {(params) => (
            <UserRoute
              component={Dashboard}
              title="Sign in to Access Dashboard"
              description="Track your saved career roadmaps, bookmarked mentor videos, and personalized progression from your student dashboard."
              {...params}
            />
          )}
        </Route>

        {/* Protected Admin Pages */}
        <Route path="/admin">
          {(params) => <AdminRoute component={AdminDashboard} {...params} />}
        </Route>
        <Route path="/admin/courses/new">
          {(params) => <AdminRoute component={CourseEditor} {...params} />}
        </Route>
        <Route path="/admin/courses/:id/edit">
          {(params) => <AdminRoute component={CourseEditor} {...params} />}
        </Route>
        <Route path="/admin/videos">
          {(params) => <AdminRoute component={VideoManager} {...params} />}
        </Route>

        {/* 404 Fallback */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CourseProvider>
            <VideoProvider>
              <TooltipProvider>
                <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                  <ScrollToTop />
                  <Router />
                  <ChatWidget />
                </WouterRouter>
                <Toaster />
              </TooltipProvider>
            </VideoProvider>
          </CourseProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
