import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const HomePage = () => {
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

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

  const features = [
    {
      title: "Simple & Intuitive",
      description: "No learning curve. Start managing tasks in seconds with our clean interface."
    },
    {
      title: "Lightning Fast",
      description: "Built for speed. Every action feels instant, keeping you in your flow."
    },
    {
      title: "Works Everywhere",
      description: "Access your tasks from any device. Everything syncs automatically."
    },
    {
      title: "Privacy First",
      description: "Your data stays yours. End-to-end encryption keeps everything secure."
    },
    {
      title: "Smart Organization",
      description: "Tags, filters, and search help you find anything instantly."
    },
    {
      title: "Team Ready",
      description: "Collaborate seamlessly with shared projects and real-time updates."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Designer",
      text: "Finally, a task manager that doesn't get in my way. It's exactly what I needed."
    },
    {
      name: "Marcus Johnson",
      role: "Software Engineer",
      text: "The simplicity is refreshing. I actually enjoy checking my tasks now."
    },
    {
      name: "Emily Rodriguez",
      role: "Startup Founder",
      text: "Our whole team switched to TaskFlow. The productivity boost was immediate."
    }
  ];

  return (
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh" }}>
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "var(--bg-primary)",
        borderBottom: "1px solid var(--border)"
      }}>
        <div style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <span style={{
            fontSize: "1.25rem",
            fontWeight: 600,
            letterSpacing: "-0.02em"
          }}>
            TaskFlow
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <a href="#features" style={{
              fontSize: "0.9375rem",
              color: "var(--text-secondary)",
              display: "none"
            }}>Features</a>

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
                alignItems: "center"
              }}
            >
              {isDark ? <SunIcon style={{ width: 20, height: 20 }} /> : <MoonIcon style={{ width: 20, height: 20 }} />}
            </button>

            <button
              onClick={() => navigate("/login")}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                backgroundColor: "var(--accent)",
                color: "var(--bg-primary)",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <section style={{
        paddingTop: "160px",
        paddingBottom: "120px",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h1 style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: "1.5rem"
          }}>
            Task management,<br />simplified.
          </h1>

          <p style={{
            fontSize: "1.125rem",
            color: "var(--text-secondary)",
            maxWidth: "500px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7
          }}>
            Stop juggling tools. TaskFlow gives you one clean space to organize everything that matters.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => navigate("/register")}
              style={{
                padding: "0.875rem 2rem",
                fontSize: "1rem",
                fontWeight: 500,
                backgroundColor: "var(--accent)",
                color: "var(--bg-primary)",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "transform 0.15s ease"
              }}
              onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
            >
              Start for free
            </button>

            <button
              onClick={() => navigate("/login")}
              style={{
                padding: "0.875rem 2rem",
                fontSize: "1rem",
                fontWeight: 500,
                backgroundColor: "transparent",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                cursor: "pointer"
              }}
            >
              Sign in
            </button>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "3rem",
            marginTop: "4rem",
            paddingTop: "3rem",
            borderTop: "1px solid var(--border)"
          }}>
            {[
              { value: "50K+", label: "Users" },
              { value: "2M+", label: "Tasks completed" },
              { value: "99.9%", label: "Uptime" }
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.75rem", fontWeight: 700 }}>{stat.value}</div>
                <div style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" style={{
        padding: "80px 1.5rem",
        backgroundColor: "var(--bg-secondary)"
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{
              fontSize: "2rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: "1rem"
            }}>
              Everything you need
            </h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: "400px", margin: "0 auto" }}>
              Powerful features without the complexity.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem"
          }}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  padding: "1.75rem",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  transition: "border-color 0.15s ease"
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--border-hover)"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
              >
                <h3 style={{
                  fontSize: "1.0625rem",
                  fontWeight: 600,
                  marginBottom: "0.5rem"
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: "0.9375rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 1.5rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{
              fontSize: "2rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: "1rem"
            }}>
              Loved by teams everywhere
            </h2>
            <p style={{ color: "var(--text-secondary)" }}>
              Here's what people are saying.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem"
          }}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                style={{
                  padding: "1.75rem",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px"
                }}
              >
                <p style={{
                  fontSize: "0.9375rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  marginBottom: "1.25rem"
                }}>
                  "{testimonial.text}"
                </p>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9375rem" }}>{testimonial.name}</div>
                  <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{
        padding: "80px 1.5rem",
        backgroundColor: "var(--bg-secondary)"
      }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontSize: "2rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: "1rem"
          }}>
            Ready to get started?
          </h2>
          <p style={{
            color: "var(--text-secondary)",
            marginBottom: "2rem"
          }}>
            Join thousands of productive people using TaskFlow.
          </p>
          <button
            onClick={() => navigate("/register")}
            style={{
              padding: "0.875rem 2.5rem",
              fontSize: "1rem",
              fontWeight: 500,
              backgroundColor: "var(--accent)",
              color: "var(--bg-primary)",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer"
            }}
          >
            Create free account
          </button>
        </div>
      </section>

      <footer style={{
        padding: "3rem 1.5rem",
        borderTop: "1px solid var(--border)"
      }}>
        <div style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem"
        }}>
          <span style={{ fontWeight: 600 }}>TaskFlow</span>
          <div style={{ display: "flex", gap: "2rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
            <span>Features</span>
            <span>Pricing</span>
            <span>About</span>
            <span>Contact</span>
          </div>
          <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
            © 2024 TaskFlow. Built by Anurag Kumar.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
