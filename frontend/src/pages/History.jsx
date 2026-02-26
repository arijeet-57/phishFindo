import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Globe, Mail, MessageSquare, FileText, ChevronRight, Shield, Clock } from "lucide-react";
import { api } from "../utils/api";

const TYPE_ICONS = {
  url: Globe,
  email: Mail,
  message: MessageSquare,
  file: FileText,
};

const VERDICT_CONFIG = {
  safe:       { dot: "var(--accent-green)",  label: "Safe",       bg: "rgba(46,213,115,0.12)"  },
  suspicious: { dot: "var(--accent-orange)", label: "Suspicious", bg: "rgba(255,165,2,0.12)"   },
  malicious:  { dot: "var(--accent-red)",    label: "Malicious",  bg: "rgba(255,71,87,0.12)"   },
};

export default function History() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadHistory(); }, []);

  const loadHistory = async () => {
    try {
      const data = await api.getHistory();
      setScans(data);
    } catch (error) {
      console.error("Failed to load history:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: "820px",
      margin: "0 auto",
      padding: "2rem 1rem",
      background: "var(--bg)",
      minHeight: "100vh",
    }}>

      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <span className="section-label">Dashboard</span>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: "6px" }}>
          <h1 style={{ fontSize: "1.75rem", color: "var(--text-primary)" }}>Scan Logs</h1>
          <div className="neo-badge" style={{ color: "var(--text-secondary)" }}>
            {scans.length} {scans.length !== 1 ? "records" : "record"}
          </div>
        </div>
      </div>

      {loading && (
        <div className="neo-card" style={{ padding: "4rem", textAlign: "center" }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "3px solid var(--bg-elevated)",
            borderTop: "3px solid var(--accent-cyan)",
            margin: "0 auto 1rem",
            animation: "spinSlow 1s linear infinite",
          }} />
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", fontFamily: "'JetBrains Mono', monospace" }}>
            Loading records...
          </p>
        </div>
      )}

      {!loading && scans.length === 0 && (
        <div className="neo-card" style={{ padding: "4rem", textAlign: "center" }}>
          <div style={{
            width: "72px",
            height: "72px",
            borderRadius: "20px",
            background: "var(--bg)",
            boxShadow: "var(--neo-md)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
          }}>
            <Shield size={32} style={{ color: "var(--accent-red)" }} />
          </div>
          <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>No scan records yet</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
            Run your first scan to see results here
          </p>
          <Link to="/" className="neo-btn-primary" style={{ display: "inline-block", textDecoration: "none" }}>
            Start Scanning →
          </Link>
        </div>
      )}

      {!loading && scans.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {scans.map((scan, idx) => {
            const Icon = TYPE_ICONS[scan.input_type] || Globe;
            const v = VERDICT_CONFIG[scan.verdict] || VERDICT_CONFIG.suspicious;

            return (
              <Link
                key={scan._id}
                to={`/results/${scan._id}`}
                style={{
                  display: "block",
                  textDecoration: "none",
                  background: "var(--bg-surface)",
                  borderRadius: "16px",
                  padding: "1.25rem 1.5rem",
                  boxShadow: "var(--neo-sm)",
                  border: "1px solid var(--border)",
                  transition: "all 0.25s ease",
                  animationDelay: `${idx * 0.05}s`,
                  animation: "fadeSlideIn 0.4s ease forwards",
                  opacity: 0,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = "var(--neo-md)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = "var(--neo-sm)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>

                  {/* Verdict dot + icon */}
                  <div style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: v.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Icon size={18} style={{ color: v.dot }} />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span style={{
                        fontSize: "0.7rem",
                        fontWeight: "700",
                        fontFamily: "'JetBrains Mono', monospace",
                        color: v.dot,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}>
                        {v.label}
                      </span>
                      <span style={{
                        fontSize: "0.7rem",
                        color: "var(--text-muted)",
                        fontFamily: "'JetBrains Mono', monospace",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}>
                        {scan.input_type}
                      </span>
                    </div>
                    <p style={{
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      margin: 0,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>
                      {scan.input_content?.substring(0, 70) || "—"}
                    </p>
                  </div>

                  {/* Score */}
                  <div style={{
                    flexShrink: 0,
                    textAlign: "right",
                  }}>
                    <div style={{
                      fontSize: "1.1rem",
                      fontWeight: "700",
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: v.dot,
                    }}>
                      {scan.risk_score ?? "—"}
                    </div>
                    <div style={{
                      fontSize: "0.65rem",
                      color: "var(--text-muted)",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>
                      / 100
                    </div>
                  </div>

                  {/* Date */}
                  <div style={{
                    flexShrink: 0,
                    fontSize: "0.7rem",
                    color: "var(--text-muted)",
                    fontFamily: "'JetBrains Mono', monospace",
                    width: "52px",
                    textAlign: "right",
                  }}>
                    {format(new Date(scan.created_at), "M/d/yy")}
                  </div>

                  <ChevronRight size={16} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}