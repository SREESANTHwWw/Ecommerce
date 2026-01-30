import React, { useState, useEffect } from "react";

const COLORS = {
  success: { background: "#4caf50", color: "#fff" },   // green
  error: { background: "#f44336", color: "#fff" },     // red
  warning: { background: "#ff9800", color: "#000" },   // orange with black text for contrast
  info: { background: "#2196f3", color: "#fff" },      // blue
};

interface CustomAlertProps {
  variant?: keyof typeof COLORS;
  message: string;
  duration?: number;
  onClose?: () => void;
}

function NotificationMessage({
  variant = "info",
  message,
  duration = 3000,
  onClose,
}: CustomAlertProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true); // Trigger animation on mount

    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => onClose && onClose(), 300); // Wait for fade-out animation
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const style: React.CSSProperties = {
    position: "fixed",
    top: "40px", // distance from the top
    left: "50%",
    padding: "12px 20px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    fontWeight: "600",
    fontSize: "16px",
    opacity: visible ? 1 : 0,
    transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
    transformOrigin: "top center",
    transform: visible
      ? "translateX(-50%) scale(1)"
      : "translateX(-50%) scale(0.9)",
    ...COLORS[variant],
    zIndex: 9999,
  };

  return <div style={style}>{message}</div>;
}

export default NotificationMessage;
