import React from "react";

function getConfig(score) {
  if (score <= 30) return {
    color: "var(--accent-green)",
    label: "Low Risk",
    glow: "rgba(46,213,115,0.4)",
    gradient: "linear-gradient(135deg, #2ed573, #1abc9c)",
  };
  if (score <= 60) return {
    color: "var(--accent-orange)",
    label: "Medium Risk",
    glow: "rgba(255,165,2,0.4)",
    gradient: "linear-gradient(135deg, #ffa502, #e67e22)",
  };
  return {
    color: "var(--accent-red)",
    label: "High Risk",
    glow: "rgba(255,71,87,0.4)",
    gradient: "linear-gradient(135deg, #ff4757, #c0392b)",
  };
}

export default function RiskGauge({ score }) {
  const cfg = getConfig(score);
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "12px",
    }}>
      {/* Circle gauge */}
      <div style={{
        position: "relative",
        width: "120px",
        height: "120px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <svg
          width="120"
          height="120"
          style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}
        >
          {/* Track */}
          <circle
            cx="60" cy="60" r="42"
            fill="none"
            stroke="var(--bg)"
            strokeWidth="10"
            filter="url(#inset-shadow)"
          />
          {/* Progress */}
          <circle
            cx="60" cy="60" r="42"
            fill="none"
            stroke={cfg.color}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 1s ease",
              filter: `drop-shadow(0 0 6px ${cfg.glow})`,
            }}
          />
        </svg>

        {/* Center display */}
        <div style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          background: "var(--bg-surface)",
          borderRadius: "50%",
          width: "70px",
          height: "70px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "var(--neo-sm)",
        }}>
          <span style={{
            fontSize: "1.6rem",
            fontWeight: "800",
            fontFamily: "'Space Grotesk', sans-serif",
            color: cfg.color,
            lineHeight: 1,
          }}>
            {score}
          </span>
          <span style={{
            fontSize: "0.6rem",
            color: "var(--text-muted)",
            fontFamily: "'JetBrains Mono', monospace",
            marginTop: "2px",
          }}>
            /100
          </span>
        </div>
      </div>

      {/* Label */}
      <div style={{
        padding: "5px 14px",
        borderRadius: "50px",
        background: "var(--bg-surface)",
        boxShadow: "var(--neo-sm)",
        fontSize: "0.72rem",
        fontWeight: "700",
        fontFamily: "'Space Grotesk', sans-serif",
        color: cfg.color,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
      }}>
        {cfg.label}
      </div>
    </div>
  );
}