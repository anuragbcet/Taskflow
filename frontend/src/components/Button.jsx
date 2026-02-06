import React from "react";

const Button = ({ label, onClick, type = "button", variant = "primary", className = "", disabled = false }) => {
  const baseStyles = {
    padding: "0.625rem 1.25rem",
    fontSize: "0.875rem",
    fontWeight: 500,
    borderRadius: "8px",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.15s ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.375rem",
    opacity: disabled ? 0.6 : 1,
  };

  const variants = {
    primary: {
      backgroundColor: "var(--accent)",
      color: "var(--bg-primary)",
      border: "none",
    },
    secondary: {
      backgroundColor: "transparent",
      color: "var(--text-primary)",
      border: "1px solid var(--border)",
    },
    ghost: {
      backgroundColor: "transparent",
      color: "var(--text-secondary)",
      border: "none",
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{ ...baseStyles, ...variants[variant] }}
    >
      {label}
    </button>
  );
};

export default Button;
