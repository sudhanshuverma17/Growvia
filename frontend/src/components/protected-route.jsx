import { Link } from "wouter";
import { useAuth } from "@/context/auth-context";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Lock, ArrowRight, Loader2 } from "lucide-react";

export function AdminRoute({ component: Component, ...rest }) {
  const { user, loading, isAuthenticated, isAdmin } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground text-sm">Verifying permissions...</p>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Authentication Required</h2>
          <p className="text-muted-foreground text-sm max-w-md mb-6">
            You must be logged in as an administrator to access the Growvia Admin Studio.
          </p>
          <div className="flex gap-4">
            <Button asChild className="bg-primary text-primary-foreground">
              <Link href="/login">Log In to Continue</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/10">
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-6">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied: Admin Only</h2>
          <p className="text-muted-foreground text-sm max-w-md mb-4">
            You are currently signed in as <span className="text-white font-medium">{user?.name}</span> ({user?.role}).
            Your account does not have administrative privileges.
          </p>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-muted-foreground mb-6 max-w-md">
            Tip: Log out and sign in with the designated administrator account to manage courses, videos, and roadmaps.
          </div>
          <div className="flex gap-4">
            <Button asChild className="bg-primary text-primary-foreground">
              <Link href="/login">Switch Account</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/10">
              <Link href="/dashboard">Go to Student Dashboard</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return <Component {...rest} />;
}

export function UserRoute({ component: Component, ...rest }) {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground text-sm">Loading user session...</p>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Sign in to Access Dashboard</h2>
          <p className="text-muted-foreground text-sm max-w-md mb-6">
            Please log in or create an account to view your saved roadmaps and personalized guidance.
          </p>
          <div className="flex gap-4">
            <Button asChild className="bg-primary text-primary-foreground">
              <Link href="/login">Log In / Sign Up <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
            <Button asChild variant="outline" className="border-white/10">
              <Link href="/roadmaps">Explore Roadmaps</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return <Component {...rest} />;
}
