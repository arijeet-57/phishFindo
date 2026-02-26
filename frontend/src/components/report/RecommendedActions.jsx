import React from "react";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

export default function RecommendedActions({ actions }) {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="neo-card" style={{ padding: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.25rem" }}>
        <div style={{
          width: "32px",
          height: "32px",
          borderRadius: "10px",
          background: "rgba(46,213,115,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <ShieldCheck size={16} style={{ color: "var(--accent-green)" }} />
        </div>
        <span className="section-label">Recommended Actions</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {actions.map((action, i) => (
          <div
            key={i}
            className="neo-inset"
            style={{
              padding: "0.875rem 1rem",
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              borderLeft: "3px solid var(--accent-green)",
              borderRadius: "0 12px 12px 0",
              animationDelay: `${i * 0.08}s`,
              animation: "fadeSlideIn 0.4s ease forwards",
              opacity: 0,
            }}
          >
            <CheckCircle2
              size={16}
              style={{ color: "var(--accent-green)", flexShrink: 0, marginTop: "1px" }}
            />
            <span style={{
              fontSize: "0.875rem",
              color: "var(--text-secondary)",
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: "1.5",
            }}>
              {action}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}