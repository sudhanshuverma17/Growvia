import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { Mail, Lock, User, ArrowRight, AlertCircle, Loader2 } from "lucide-react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, register } = useAuth();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (isLogin) {
        const result = await login(email, password);
        if (result.success) {
          if (result.user.role === "admin") {
            setLocation("/admin");
          } else {
            setLocation("/dashboard");
          }
        } else {
          setError(result.error || "Invalid email or password");
        }
      } else {
        if (!name.trim()) {
          setError("Please enter your name");
          setIsSubmitting(false);
          return;
        }
        const result = await register(name, email, password);
        if (result.success) {
          setLocation("/dashboard");
        } else {
          setError(result.error || "Failed to create account");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 mx-auto flex items-center justify-center text-primary-foreground font-display font-bold text-2xl mb-6 shadow-lg shadow-primary/20">
            G
          </div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-white">
            {isLogin ? "Welcome back" : "Create your account"}
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="font-medium text-primary hover:underline"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="glass-card py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-white/10">
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              {!isLogin && (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="appearance-none block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl bg-background/50 placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-white"
                      placeholder="Rahul Sharma"
                    />
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl bg-background/50 placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-white"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl bg-background/50 placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-white"
                    placeholder="••••••••"
                  />
                </div>
                {!isLogin && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Password must be at least 6 characters.
                  </p>
                )}
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-xl h-11"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {isLogin ? "Signing in..." : "Creating account..."}
                    </span>
                  ) : (
                    <span>{isLogin ? "Sign in" : "Sign up"}</span>
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#0D0D0D] text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Button
                  variant="ghost"
                  asChild
                  className="w-full border border-white/10 hover:bg-white/5 rounded-xl h-11"
                >
                  <Link href="/roadmaps">
                    Continue as Guest <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
