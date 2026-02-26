import React from "react";
import { Terminal } from "lucide-react";

export default function ExplanationBox({ explanation }) {
  if (!explanation) return null;

  return (
    <div className="neo-card" style={{ padding: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.25rem" }}>
        <div style={{
          width: "32px",
          height: "32px",
          borderRadius: "10px",
          background: "rgba(0,210,255,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Terminal size={16} style={{ color: "var(--accent-cyan)" }} />
        </div>
        <span className="section-label">Analysis Report</span>
      </div>

      <div className="neo-inset" style={{ padding: "1.25rem" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <span style={{
            color: "var(--accent-cyan)",
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: "700",
            fontSize: "0.85rem",
            flexShrink: 0,
            marginTop: "1px",
          }}>
            &gt;
          </span>
          <p style={{
            color: "var(--text-secondary)",
            fontSize: "0.875rem",
            lineHeight: "1.7",
            fontFamily: "'DM Sans', sans-serif",
            margin: 0,
          }}>
            {explanation}
          </p>
        </div>
      </div>
    </div>
  );
}