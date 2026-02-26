import React from "react";
import { ShieldCheck, ShieldAlert, ShieldOff } from "lucide-react";

const CONFIGS = {
  safe: {
    icon: ShieldCheck,
    label: "Safe",
    color: "var(--accent-green)",
    bg: "rgba(46,213,115,0.12)",
    border: "rgba(46,213,115,0.25)",
    glow: "rgba(46,213,115,0.3)",
  },
  suspicious: {
    icon: ShieldAlert,
    label: "Suspicious",
    color: "var(--accent-orange)",
    bg: "rgba(255,165,2,0.12)",
    border: "rgba(255,165,2,0.25)",
    glow: "rgba(255,165,2,0.3)",
  },
  malicious: {
    icon: ShieldOff,
    label: "Malicious",
    color: "var(--accent-red)",
    bg: "rgba(255,71,87,0.12)",
    border: "rgba(255,71,87,0.25)",
    glow: "rgba(255,71,87,0.3)",
  },
};

export default function VerdictBadge({ verdict }) {
  const cfg = CONFIGS[verdict] || CONFIGS.suspicious;
  const Icon = cfg.icon;

  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      padding: "10px 20px",
      borderRadius: "12px",
      background: cfg.bg,
      border: `1px solid ${cfg.border}`,
      boxShadow: `0 4px 16px ${cfg.glow}`,
    }}>
      <Icon size={20} style={{ color: cfg.color }} />
      <span style={{
        fontSize: "0.95rem",
        fontWeight: "700",
        fontFamily: "'Space Grotesk', sans-serif",
        color: cfg.color,
        letterSpacing: "0.04em",
      }}>
        {cfg.label}
      </span>
    </div>
  );
}