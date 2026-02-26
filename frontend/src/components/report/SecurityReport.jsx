import React from "react";
import { format } from "date-fns";
import { Clock, Globe, FileText, Mail, MessageSquare } from "lucide-react";
import RiskGauge from "./RiskGauge";
import VerdictBadge from "./VerdictBadge";
import ThreatFlags from "./ThreatFlags";
import ExplanationBox from "./ExplanationBox";
import RecommendedActions from "./RecommendedActions";

const TYPE_ICONS = {
  url: Globe,
  email: Mail,
  message: MessageSquare,
  file: FileText,
};

export default function SecurityReport({ scan }) {
  const Icon = TYPE_ICONS[scan.input_type] || Globe;

  return (
    <div style={{ maxWidth: "780px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1rem" }}>

      {/* Header card */}
      <div className="neo-card" style={{ padding: "1.75rem" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}>
          {/* Top row: gauge + verdict */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "1.75rem",
          }}>
            <RiskGauge score={scan.risk_score || 0} />

            <div style={{ flex: 1, minWidth: "200px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <VerdictBadge verdict={scan.verdict || "suspicious"} />

              {/* Meta row */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  background: "var(--bg)",
                  boxShadow: "var(--neo-sm)",
                  fontSize: "0.72rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "var(--accent-cyan)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}>
                  <Icon size={12} />
                  {scan.input_type} scan
                </div>

                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  background: "var(--bg)",
                  boxShadow: "var(--neo-sm)",
                  fontSize: "0.72rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "var(--text-muted)",
                }}>
                  <Clock size={12} />
                  {scan.created_at
                    ? format(new Date(scan.created_at), "yyyy-MM-dd HH:mm")
                    : "—"}
                </div>
              </div>
            </div>
          </div>

          {/* Input preview */}
          <div className="neo-inset" style={{ padding: "0.875rem 1rem" }}>
            <p style={{
              color: "var(--text-muted)",
              fontSize: "0.78rem",
              fontFamily: "'JetBrains Mono', monospace",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              margin: 0,
            }}>
              {scan.input_content?.substring(0, 200) || "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Flags */}
      <ThreatFlags flags={scan.flags} />

      {/* Explanation */}
      <ExplanationBox explanation={scan.explanation} />

      {/* Actions */}
      <RecommendedActions actions={scan.recommended_actions} />
    </div>
  );
}