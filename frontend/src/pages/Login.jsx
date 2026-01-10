import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ExclamationCircleIcon,
  RocketLaunchIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Handles login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password. Please try again.");
      }

      const { token } = await response.json();
      localStorage.setItem("token", token);

      if (rememberMe) {
        localStorage.setItem("rememberEmail", email);
      }

      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-600 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="relative w-full max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Branding */}
          <div className="hidden lg:flex flex-col justify-center">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                  <RocketLaunchIcon className="h-8 w-8 text-white" />
                </div>
                <span
                  onClick={()=>navigate("/")}
                  className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  TaskFlow
                </span>
              </div>

              <h1 className="text-5xl font-bold mb-4 leading-tight">
                Welcome Back to{" "}
                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  Productivity
                </span>
              </h1>

              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Access your tasks, collaborate with your team, and stay focused on what matters most.
              </p>

              <div className="space-y-4">
                {[
                  { icon: "✓", text: "Secure authentication with encryption" },
                  { icon: "✓", text: "Instant access to all your tasks" },
                  { icon: "✓", text: "Real-time synchronization across devices" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-300">
                    <span className="text-cyan-500 font-bold text-lg">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl blur-2xl opacity-50"></div>

              <div
                onSubmit={handleLogin}
                className="relative bg-gray-900 border border-gray-800 rounded-2xl p-8 md:p-10 backdrop-blur-xl"
              >
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-center lg:hidden mb-6">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                      <RocketLaunchIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-center mb-2">Sign In</h2>
                  <p className="text-center text-gray-400">
                    Enter your credentials to access your dashboard
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3 animate-shake">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                {/* Email Input */}
                <div className="mb-6">
                  <label className="block text-gray-300 text-sm font-semibold mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-white placeholder-gray-500"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="mb-6">
                  <label className="block text-gray-300 text-sm font-semibold mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-white placeholder-gray-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400 transition-colors"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between mb-8">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 bg-gray-800 border border-gray-700 rounded accent-cyan-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
                      Remember me
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => window.location.href = "/forgot-password"}
                    className="text-sm text-cyan-500 hover:text-cyan-400 transition-colors font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button */}
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRightIcon className="h-5 w-5" />
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-900 text-gray-500">or</span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { name: "Google", icon: "G" },
                    { name: "GitHub", icon: "⚡" },
                  ].map((social) => (
                    <button
                      key={social.name}
                      type="button"
                      onClick={() => console.log(`Login with ${social.name}`)}
                      className="py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-gray-600 transition-all duration-300 font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-700/50"
                    >
                      <span>{social.icon}</span>
                      {social.name}
                    </button>
                  ))}
                </div>

                {/* Register Link */}
                <div className="text-center">
                  <p className="text-gray-400 mb-1">Don't have an account?</p>
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="text-cyan-500 hover:text-cyan-400 font-bold transition-colors inline-flex items-center gap-2"
                  >
                    Create Account
                    <ArrowRightIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-3 gap-4 lg:grid-cols-3">
              {[
                { icon: "🔒", text: "SSL Secure" },
                { icon: "✓", text: "Verified" },
                { icon: "⚡", text: "Instant Access" },
              ].map((badge, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl mb-2">{badge.icon}</p>
                  <p className="text-xs text-gray-500">{badge.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Login;