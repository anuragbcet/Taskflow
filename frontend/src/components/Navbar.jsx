import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme ? "dark" : "light");
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      backgroundColor: "var(--bg-primary)",
      borderBottom: "1px solid var(--border)",
      transition: "all 0.2s ease"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 1.5rem",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <Link to="/" style={{
          fontSize: "1.25rem",
          fontWeight: 600,
          letterSpacing: "-0.025em",
          color: "var(--text-primary)"
        }}>
          TaskFlow
        </Link>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          <div className="hidden md:flex" style={{
            display: "none",
            alignItems: "center",
            gap: "2rem",
            marginRight: "2rem"
          }}>
            {[
              { path: "/", label: "Home" },
              { path: "/login", label: "Login" },
              { path: "/register", label: "Register" }
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                style={{
                  fontSize: "0.9375rem",
                  fontWeight: isActive(path) ? 500 : 400,
                  color: isActive(path) ? "var(--text-primary)" : "var(--text-secondary)",
                  transition: "color 0.15s ease"
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            style={{
              padding: "0.5rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "transparent",
              color: "var(--text-secondary)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s ease"
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "var(--bg-tertiary)"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
          >
            {isDark ? (
              <SunIcon style={{ width: "20px", height: "20px" }} />
            ) : (
              <MoonIcon style={{ width: "20px", height: "20px" }} />
            )}
          </button>

          <Link to="/login">
            <button className="btn-primary" style={{
              padding: "0.5rem 1rem",
              fontSize: "0.875rem"
            }}>
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
