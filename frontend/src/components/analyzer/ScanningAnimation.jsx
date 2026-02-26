import React, { useState, useEffect } from "react";
import { Shield } from "lucide-react";

const MESSAGES = [
  "Initializing threat scanner…",
  "Analyzing content patterns…",
  "Checking domain reputation…",
  "Querying threat databases…",
  "Running AI detection…",
  "Evaluating risk indicators…",
  "Generating security report…",
];

export default function ScanningAnimation() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIndex(p => (p + 1) % MESSAGES.length);
    }, 2200);

    const progressTimer = setInterval(() => {
      setProgress(p => {
        if (p >= 95) return 95;
        return p + Math.random() * 8;
      });
    }, 400);

    return () => {
      clearInterval(msgTimer);
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "calc(100vh - 120px)",
      padding: "2rem 1rem",
    }}>
      <div className="neo-card" style={{
        padding: "2.5rem 2rem",
        width: "100%",
        maxWidth: "360px",
        textAlign: "center",
      }}>

        {/* Animated shield */}
        <div style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.75rem",
        }}>
          {/* Outer ring */}
          <div style={{
            position: "absolute",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            border: "2px solid transparent",
            borderTop: "2px solid var(--accent-cyan)",
            borderRight: "2px solid var(--accent-cyan)",
            animation: "spinSlow 1.5s linear infinite",
          }} />
          {/* Inner ring */}
          <div style={{
            position: "absolute",
            width: "78px",
            height: "78px",
            borderRadius: "50%",
            border: "2px solid transparent",
            borderBottom: "2px solid var(--accent-red)",
            borderLeft: "2px solid var(--accent-red)",
            animation: "spinSlow 2s linear infinite reverse",
          }} />
          {/* Icon container */}
          <div style={{
            width: "60px",
            height: "60px",
            borderRadius: "18px",
            background: "var(--bg)",
            boxShadow: "var(--neo-sm)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Shield size={28} style={{
              color: "var(--accent-red)",
              animation: "glowPulse 2s ease-in-out infinite",
            }} />
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: "1rem",
          fontWeight: "700",
          color: "var(--text-primary)",
          marginBottom: "0.5rem",
          fontFamily: "'Space Grotesk', sans-serif",
        }}>
          Analyzing Threat
        </h3>

        {/* Rotating message */}
        <p style={{
          fontSize: "0.75rem",
          color: "var(--text-muted)",
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "0.04em",
          minHeight: "1.2rem",
          marginBottom: "1.75rem",
          transition: "opacity 0.3s ease",
        }}>
          {MESSAGES[msgIndex]}
        </p>

        {/* Progress bar */}
        <div style={{
          width: "100%",
          height: "8px",
          borderRadius: "50px",
          background: "var(--bg)",
          boxShadow: "var(--neo-inset)",
          overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            borderRadius: "50px",
            background: `linear-gradient(90deg, var(--accent-cyan), var(--accent-red))`,
            width: `${progress}%`,
            transition: "width 0.4s ease",
            boxShadow: "0 0 10px rgba(0,210,255,0.4)",
          }} />
        </div>

        <p style={{
          marginTop: "0.75rem",
          fontSize: "0.7rem",
          color: "var(--text-muted)",
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}