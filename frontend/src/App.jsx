import React, { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/auth-context";
import { CourseProvider } from "@/context/course-context";
import { VideoProvider } from "@/context/video-context";
import { AdminRoute, UserRoute } from "@/components/protected-route";
import { PageLoader } from "@/components/page-loader";
import { ErrorBoundary } from "@/components/error-boundary";
import NotFound from "@/pages/not-found";

// Lazy-loaded Student Pages
const Home = lazy(() => import("@/pages/home"));
const Roadmaps = lazy(() => import("@/pages/roadmaps"));
const RoadmapDetail = lazy(() => import("@/pages/roadmap-detail"));
const Quiz = lazy(() => import("@/pages/quiz"));
const Pricing = lazy(() => import("@/pages/pricing"));
const About = lazy(() => import("@/pages/about"));
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
        {/* Public Pages */}
        <Route path="/" component={Home} />
        <Route path="/roadmaps" component={Roadmaps} />
        <Route path="/roadmaps/:career" component={RoadmapDetail} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/videos" component={Videos} />

        {/* Protected Student Dashboard */}
        <Route path="/dashboard">
          {(params) => <UserRoute component={Dashboard} {...params} />}
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
                  <Router />
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
