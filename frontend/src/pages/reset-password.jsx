import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { apiUrl } from "@/lib/api-config";
import {
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

export default function ResetPassword() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Extract token from query parameters: /reset-password?token=<token>
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const urlToken = searchParams.get("token");
      if (urlToken) {
        setToken(urlToken.trim());
      } else {
        setError(
          "No password reset token was provided. Please use the link sent to your email."
        );
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Missing reset token. Please request a new password reset link.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(apiUrl("/api/reset-password"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Failed to reset password.");
      }

      setSuccess(true);

      // Auto redirect to login after 3 seconds
      setTimeout(() => {
        setLocation("/login");
      }, 3000);
    } catch (err) {
      console.error("[Reset Password Error]:", err);
      setError(
        err.message ||
          "This password reset link is invalid or has expired. Please request a new one."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 mx-auto flex items-center justify-center text-primary-foreground font-display font-bold text-2xl mb-6 shadow-lg shadow-primary/20">
            <ShieldCheck className="w-6 h-6 text-primary-foreground" />
          </div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-white">
            Set new password
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Enter your new password below to secure your account.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="glass-card py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-white/10">
            {success ? (
              <div className="space-y-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Password Reset Complete!
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    Your password has been successfully updated. You can now log in using your new credentials.
                  </p>
                  <p className="text-xs text-primary mt-3 flex items-center justify-center gap-1.5 font-medium">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Redirecting to login in a moment...
                  </p>
                </div>
                <div className="pt-2">
                  <Button
                    asChild
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-xl h-11"
                  >
                    <Link href="/login">
                      Continue to Login <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                {error && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span>{error}</span>
                      {error.includes("expired") || error.includes("invalid") || error.includes("token") ? (
                        <div className="pt-1">
                          <Link
                            href="/forgot-password"
                            className="text-xs text-primary hover:underline font-medium"
                          >
                            Request a fresh reset link →
                          </Link>
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="appearance-none block w-full pl-10 pr-10 py-3 border border-white/10 rounded-xl bg-background/50 placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-white"
                      placeholder="At least 8 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-white transition-colors focus:outline-none cursor-pointer"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Must be at least 8 characters long.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      minLength={8}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="appearance-none block w-full pl-10 pr-10 py-3 border border-white/10 rounded-xl bg-background/50 placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-white"
                      placeholder="Re-enter your new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-white transition-colors focus:outline-none cursor-pointer"
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !token}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-xl h-11 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Resetting password...
                      </span>
                    ) : (
                      <span>Update Password</span>
                    )}
                  </Button>
                </div>

                <div className="pt-2 text-center">
                  <Link
                    href="/login"
                    className="text-xs font-medium text-muted-foreground hover:text-white transition-colors"
                  >
                    Remember your password? Log in
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
