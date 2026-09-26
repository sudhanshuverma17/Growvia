import React from "react";
import { Redirect, useLocation } from "wouter";
import { useAuth } from "@/context/auth-context";
import { Layout } from "@/components/layout";
import { Loader2 } from "lucide-react";

/**
 * PurchasedRoadmapGuard
 *
 * Conditional UI element wrapper:
 * Renders `children` ONLY if the current user has purchased at least one roadmap (or is admin).
 * For everyone else (guests, unauthenticated users, registered users with 0 purchased roadmaps),
 * it returns `fallback` (default: null).
 *
 * This ensures the entry point (e.g. "Get Counseling" nav link or button) does NOT exist
 * in the UI for non-purchasers.
 */
export function PurchasedRoadmapGuard({ children, fallback = null, careerId = null }) {
  const { user, isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return null;
  if (!isAuthenticated || !user) return fallback;

  const purchasedRoadmaps = Array.isArray(user.purchasedRoadmaps) ? user.purchasedRoadmaps : [];
  const hasAccess = isAdmin || (careerId ? purchasedRoadmaps.includes(careerId) : purchasedRoadmaps.length > 0);

  if (!hasAccess) return fallback;

  return <>{children}</>;
}

/**
 * PurchasedRoadmapRoute
 *
 * Route guard component for wouter:
 * Protects premium pages like /get-counseling.
 *
 * If the user is a non-purchaser (or guest), direct navigation immediately
 * redirects them to the upgrade/paywall page (/pricing?upgrade=counseling).
 * Only eligible purchasers (and administrators) are allowed through.
 */
export function PurchasedRoadmapRoute({
  component: Component,
  redirectTo = "/pricing?upgrade=counseling",
  careerId = null,
  ...rest
}) {
  const { user, loading, isAuthenticated, isAdmin } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 text-amber-400 animate-spin mb-4" />
          <p className="text-muted-foreground text-sm font-medium">Verifying roadmap entitlement...</p>
        </div>
      </Layout>
    );
  }

  const purchasedRoadmaps = Array.isArray(user?.purchasedRoadmaps) ? user.purchasedRoadmaps : [];
  const hasAccess = isAuthenticated && (isAdmin || (careerId ? purchasedRoadmaps.includes(careerId) : purchasedRoadmaps.length > 0));

  if (!hasAccess) {
    return <Redirect to={redirectTo} replace />;
  }

  return <Component {...rest} />;
}

/**
 * Custom hook to check roadmap purchase entitlement anywhere in the component tree
 */
export function usePurchasedRoadmapCheck(careerId = null) {
  const { user, isAuthenticated, isAdmin, loading } = useAuth();

  const purchasedRoadmaps = Array.isArray(user?.purchasedRoadmaps) ? user.purchasedRoadmaps : [];
  const hasAccess = isAuthenticated && (isAdmin || (careerId ? purchasedRoadmaps.includes(careerId) : purchasedRoadmaps.length > 0));

  return {
    hasAccess,
    isEligible: hasAccess,
    loading,
    purchasedRoadmaps,
    purchasedCount: purchasedRoadmaps.length,
    isAdmin,
    user,
  };
}

export default PurchasedRoadmapGuard;
