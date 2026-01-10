import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircleIcon,
  UserCircleIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ClipboardIcon,
  FolderIcon,
  StarIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  ArrowRightIcon,
  SparklesIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  // RocketIcon,
} from "@heroicons/react/24/outline";

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <RocketLaunchIcon className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              TaskFlow
            </span>
          </div>
          <div className="hidden md:flex gap-8">
            {["Features", "Reviews", "Contact"].map((item) => {
              const sectionId = item.toLowerCase();

              return (
                <a
                  key={item}
                  href={`#${sectionId}`}
                  className="text-gray-400 hover:text-white transition-colors duration-300 font-medium"
                >
                  {item}
                </a>
              );
            })}
          </div>
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-40 left-10 w-72 h-72 bg-blue-600 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-600 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div
              className={`transform transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-12"
              }`}
            >
              <div className="inline-block mb-4 px-4 py-2 bg-blue-900/30 border border-blue-500/50 rounded-full">
                <span className="text-blue-400 text-sm font-semibold flex items-center gap-2">
                  <SparklesIcon className="h-4 w-4" />
                  Introducing TaskFlow Pro
                </span>
              </div>

              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                Manage Your{" "}
                <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
                  Tasks Like Never Before
                </span>
              </h1>

              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Experience the future of task management with AI-powered
                insights, seamless collaboration, and beautiful design. Boost
                your productivity by up to 40% with our intelligent task
                organization system.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/login")}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Start Free Trial
                  <ArrowRightIcon className="h-5 w-5" />
                </button>
                <button className="border-2 border-gray-600 px-8 py-4 rounded-lg font-bold text-lg hover:border-gray-400 hover:bg-gray-900/50 transition-all duration-300">
                  Watch Demo
                </button>
              </div>

              <div className="flex gap-8 mt-12 pt-8 border-t border-gray-800">
                {[
                  { label: "Active Users", value: "50K+" },
                  { label: "Tasks Completed", value: "2M+" },
                  { label: "Uptime", value: "99.9%" },
                ].map((stat, i) => (
                  <div key={i}>
                    <p className="text-3xl font-bold text-cyan-400">
                      {stat.value}
                    </p>
                    <p className="text-gray-500 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual */}
            <div
              className={`transform transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl blur-2xl opacity-30"></div>
                <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-8 backdrop-blur-xl">
                  <div className="space-y-4">
                    {[
                      "Complete project report",
                      "Review team feedback",
                      "Deploy to production",
                    ].map((task, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-all duration-300"
                        style={{
                          animation: `slideIn 0.6s ease-out ${i * 0.1}s both`,
                        }}
                      >
                        <CheckCircleIcon className="h-5 w-5 text-cyan-500 flex-shrink-0" />
                        <span className="text-gray-300">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Powerful Features for{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Modern Teams
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to organize, collaborate, and succeed with
              comprehensive task management tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Lightning Fast Login",
                description:
                  "Secure authentication with OAuth2. Get started in seconds with one-click login.",
                icon: <UserCircleIcon className="h-8 w-8" />,
                color: "from-blue-500 to-blue-600",
              },
              {
                title: "Bank-Level Security",
                description:
                  "End-to-end encryption ensures your tasks are always protected and private.",
                icon: <ShieldCheckIcon className="h-8 w-8" />,
                color: "from-green-500 to-emerald-600",
              },
              {
                title: "Access Everywhere",
                description:
                  "Sync across all devices. Access your tasks from desktop, tablet, or mobile anytime, anywhere.",
                icon: <GlobeAltIcon className="h-8 w-8" />,
                color: "from-indigo-500 to-indigo-600",
              },
              {
                title: "Smart Organization",
                description:
                  "AI-powered tagging and categorization automatically organize your tasks for you.",
                icon: <ClipboardIcon className="h-8 w-8" />,
                color: "from-yellow-500 to-amber-600",
              },
              {
                title: "Progress Analytics",
                description:
                  "Beautiful charts and insights show your productivity trends and achievements.",
                icon: <CheckCircleIcon className="h-8 w-8" />,
                color: "from-teal-500 to-teal-600",
              },
              {
                title: "Nested Subtasks",
                description:
                  "Break down complex projects into manageable subtasks with unlimited nesting.",
                icon: <FolderIcon className="h-8 w-8" />,
                color: "from-red-500 to-pink-600",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-gray-700 transition-all duration-300 hover:shadow-xl hover:shadow-gray-900/50"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}
                ></div>
                <div className="relative">
                  <div
                    className={`bg-gradient-to-br ${feature.color} p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-white">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quotes Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <LightBulbIcon className="h-12 w-12 mx-auto mb-4 text-yellow-500 inline-block" />
              <br />
              Wisdom in Motion
            </h2>
            <p className="text-xl text-gray-400">
              Insights from industry leaders on productivity and time
              management.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Time is what we want most but what we use worst.",
                author: "William Penn",
                icon: "⏰",
              },
              {
                quote: "The key is in not spending time, but in investing it.",
                author: "Stephen R. Covey",
                icon: "💡",
              },
              {
                quote: "Lost time is never found again.",
                author: "Benjamin Franklin",
                icon: "⭐",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <p className="text-lg text-gray-300 italic mb-4 leading-relaxed">
                  "{item.quote}"
                </p>
                <p className="text-cyan-400 font-semibold">— {item.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Loved by{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                50,000+ Users
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              See how TaskFlow is transforming the way teams work together.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alice Chen",
                feedback:
                  "This app completely transformed how I organize my life. The UI is so intuitive!",
                role: "Product Manager",
                rating: 5,
              },
              {
                name: "Bob Martinez",
                feedback:
                  "Managing 100+ tasks across projects has never been this smooth. Game changer!",
                role: "Software Engineer",
                rating: 5,
              },
              {
                name: "Charlie Wilson",
                feedback:
                  "Secure, blazingly fast, and incredibly reliable. Highly recommended for teams.",
                role: "CEO & Founder",
                rating: 5,
              },
            ].map((review, index) => (
              <div
                key={index}
                className="relative bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-300 group"
              >
                <div className="absolute top-4 right-4 flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="h-5 w-5 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                  "{review.feedback}"
                </p>
                <div className="border-t border-gray-800 pt-4">
                  <p className="font-bold text-white">{review.name}</p>
                  <p className="text-cyan-400 text-sm">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-600 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of productive teams already using TaskFlow to manage
            their success.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-cyan-600 px-10 py-5 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105">
            Start Your Free Trial Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <RocketLaunchIcon className="h-6 w-6 text-blue-500" />
                <span className="font-bold text-lg">TaskFlow</span>
              </div>
              <p className="text-gray-500 text-sm">
                The modern way to manage tasks and boost productivity.
              </p>
            </div>
            {[
              { title: "Product", items: ["Features", "Pricing", "Security"] },
              { title: "Company", items: ["About", "Blog", "Careers"] },
              { title: "Support", items: ["Help", "Contact", "Status"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-bold mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.items.map((item, j) => (
                    <li key={j}>
                      <button className="text-gray-500 hover:text-gray-300 transition-colors text-sm">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm flex items-center gap-2">
              Built with{" "}
              <HeartIcon className="h-4 w-4 text-red-500 fill-red-500" /> by
              Anurag Kumar
            </p>
            <p className="text-gray-500 text-sm">
              © 2024 TaskFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
