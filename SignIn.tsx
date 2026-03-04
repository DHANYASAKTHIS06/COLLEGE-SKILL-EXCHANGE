import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Mail, Lock, ArrowRight, Moon, Sun } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserRole, theme, toggleTheme } = useApp();
  const navigate = useNavigate();
  const [showGoogleOptions, setShowGoogleOptions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate role-based login
    if (email.includes("student")) {
      setUserRole("student");
      navigate("/student");
    } else if (email.includes("tutor")) {
      setUserRole("tutor");
      navigate("/tutor");
    } else if (email.includes("admin")) {
      setUserRole("admin");
      navigate("/admin");
    } else {
      // Default to student
      setUserRole("student");
      navigate("/student");
    }
  };

  const handleGoogleSelect = (role: "student" | "tutor" | "admin") => {
    setUserRole(role);
    if (role === "student") {
      navigate("/student");
    } else if (role === "tutor") {
      navigate("/tutor");
    } else {
      navigate("/admin");
    }
  };

  const userImage = "figma:asset/4a61db49c15cd921b9cb38a2013b8299f1b2f60c.png";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-semibold text-blue-500 text-lg">
              College Skill Exchange
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            <img
              src={userImage}
              alt="User"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen pt-16">
        <div className="w-full max-w-md p-8">
          {/* Tabs */}
          <div className="flex mb-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button className="flex-1 py-2 text-sm font-medium bg-white dark:bg-gray-700 text-blue-500 rounded-md shadow-sm">
              Sign In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="flex-1 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 rounded-md hover:text-gray-900 dark:hover:text-gray-200"
            >
              Sign Up
            </button>
          </div>

          {/* Sign In Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Log in to access your skills dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="password">Password</Label>
                  <button
                    type="button"
                    className="text-sm text-blue-500 hover:text-blue-600"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white dark:bg-gray-900 px-4 text-gray-500 dark:text-gray-400">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setShowGoogleOptions(true)}
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </Button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
              By clicking continue, you agree to our{" "}
              <button className="text-blue-500 hover:underline">Terms of Service</button>{" "}
              and{" "}
              <button className="text-blue-500 hover:underline">Privacy Policy</button>.
            </p>
          </div>

          {/* Footer Links */}
          <div className="mt-8 flex justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <button 
              onClick={() => navigate("/")}
              className="hover:text-gray-900 dark:hover:text-gray-200 flex items-center gap-1"
            >
              <span>← Back to Home</span>
            </button>
            <button className="hover:text-gray-900 dark:hover:text-gray-200">Support</button>
            <button className="hover:text-gray-900 dark:hover:text-gray-200">Language</button>
          </div>
        </div>
      </div>

      {/* Google Sign In Options Modal */}
      {showGoogleOptions && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowGoogleOptions(false)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 z-50 w-full max-w-sm mx-4">
            <h3 className="text-xl font-semibold mb-4">Choose Account</h3>
            <div className="space-y-3">
              <button
                onClick={() => handleGoogleSelect("student")}
                className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
              >
                <div className="font-medium">student@gmail.com</div>
                <div className="text-sm text-gray-500">Student Account</div>
              </button>
              <button
                onClick={() => handleGoogleSelect("tutor")}
                className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
              >
                <div className="font-medium">tutor@gmail.com</div>
                <div className="text-sm text-gray-500">Tutor Account</div>
              </button>
              <button
                onClick={() => handleGoogleSelect("admin")}
                className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
              >
                <div className="font-medium">admin@gmail.com</div>
                <div className="text-sm text-gray-500">Admin Account</div>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-4">
        <div className="flex justify-between items-center px-6 text-sm text-gray-600 dark:text-gray-400">
          <p>© 2024 College Skill Exchange. All rights reserved.</p>
          <div className="flex gap-6">
            <button className="hover:text-gray-900 dark:hover:text-gray-200">
              Privacy Policy
            </button>
            <button className="hover:text-gray-900 dark:hover:text-gray-200">
              Terms of Service
            </button>
            <button className="hover:text-gray-900 dark:hover:text-gray-200">
              Support
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}