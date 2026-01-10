import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  CheckIcon,
  EyeIcon,
  EyeSlashIcon,
  ExclamationCircleIcon,
  RocketLaunchIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  // Calculate password strength
  const calculatePasswordStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setPasswordStrength(calculatePasswordStrength(pwd));
  };

  // Handles registration form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error("Registration failed. Please try again.");
      }

      setSuccess("Account created successfully! Redirecting to login...");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength <= 2) return "bg-yellow-500";
    if (passwordStrength <= 3) return "bg-blue-500";
    if (passwordStrength <= 4) return "bg-cyan-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "Very Weak";
    if (passwordStrength <= 1) return "Weak";
    if (passwordStrength <= 2) return "Fair";
    if (passwordStrength <= 3) return "Good";
    if (passwordStrength <= 4) return "Strong";
    return "Very Strong";
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 overflow-hidden relative py-12">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-40 left-10 w-80 h-80 bg-green-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-emerald-600 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="relative w-full max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Features */}
          <div className="hidden lg:flex flex-col justify-center">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                  <SparklesIcon className="h-8 w-8 text-white" />
                </div>
                <span 
                  onClick={()=>navigate("/")}
                  className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  TaskFlow
                </span>
              </div>

              <h1 className="text-5xl font-bold mb-4 leading-tight">
                Join Our{" "}
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  Community
                </span>
              </h1>

              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Create your account and start managing tasks like a pro. Join thousands of productive users.
              </p>

              <div className="space-y-4">
                {[
                  { icon: "✓", text: "Free forever for basic features" },
                  { icon: "✓", text: "No credit card required" },
                  { icon: "✓", text: "Instant access after signup" },
                  { icon: "✓", text: "Advanced security & privacy" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-300">
                    <span className="text-green-500 font-bold text-lg">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="w-full">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-2xl blur-2xl opacity-50"></div>

              <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-8 md:p-10 backdrop-blur-xl">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-center lg:hidden mb-6">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                      <SparklesIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>
                  <p className="text-center text-gray-400">
                    Get started with TaskFlow in just a few seconds
                  </p>
                </div>

                {/* Success Message */}
                {success && (
                  <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-start gap-3 animate-pulse">
                    <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-green-400 text-sm">{success}</p>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3 animate-shake">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                {/* Name Input */}
                <div className="mb-6">
                  <label className="block text-gray-300 text-sm font-semibold mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-white placeholder-gray-500"
                      required
                    />
                  </div>
                </div>

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
                      className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-white placeholder-gray-500"
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
                      onChange={handlePasswordChange}
                      className="w-full pl-12 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-white placeholder-gray-500"
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

                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400">Password Strength</span>
                        <span className={`text-xs font-semibold ${
                          passwordStrength <= 1 ? "text-red-400" :
                          passwordStrength <= 2 ? "text-yellow-400" :
                          passwordStrength <= 3 ? "text-blue-400" :
                          passwordStrength <= 4 ? "text-green-400" :
                          "text-emerald-400"
                        }`}>
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div className="mb-6">
                  <label className="block text-gray-300 text-sm font-semibold mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-white placeholder-gray-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {/* Password Match Indicator */}
                  {confirmPassword && (
                    <div className="mt-2 flex items-center gap-2">
                      {password === confirmPassword ? (
                        <>
                          <CheckIcon className="h-4 w-4 text-green-500" />
                          <span className="text-xs text-green-400">Passwords match</span>
                        </>
                      ) : (
                        <>
                          <ExclamationCircleIcon className="h-4 w-4 text-red-500" />
                          <span className="text-xs text-red-400">Passwords don't match</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Terms & Conditions */}
                <label className="flex items-start gap-3 mb-8 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-gray-800 border border-gray-700 rounded accent-green-500 cursor-pointer mt-1"
                    required
                  />
                  <span className="text-sm text-gray-400">
                    I agree to the{" "}
                    <button type="button" className="text-green-500 hover:text-green-400 transition-colors font-medium">
                      Terms of Service
                    </button>
                    {" "}and{" "}
                    <button type="button" className="text-green-500 hover:text-green-400 transition-colors font-medium">
                      Privacy Policy
                    </button>
                  </span>
                </label>

                {/* Register Button */}
                <button
                  onClick={handleRegister}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
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
                    <span className="px-2 bg-gray-900 text-gray-500">Already have an account?</span>
                  </div>
                </div>

                {/* Login Link */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="text-green-500 hover:text-green-400 font-bold transition-colors inline-flex items-center gap-2"
                  >
                    Sign In
                    <ArrowRightIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { icon: "🔒", text: "SSL Secure" },
                { icon: "✓", text: "Verified" },
                { icon: "⚡", text: "Instant Setup" },
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

export default Register;