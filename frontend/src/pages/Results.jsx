import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, Shield } from "lucide-react";
import SecurityReport from "../components/report/SecurityReport";
import { api } from "../utils/api";

export default function Results() {
  const { id } = useParams();
  const [scan, setScan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadScan(); }, [id]);

  const loadScan = async () => {
    try {
      const data = await api.getScan(id);
      setScan(data);
    } catch (error) {
      console.error("Failed to load scan:", error);
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

      {/* Back nav */}
      <div style={{ marginBottom: "2rem" }}>
        <Link
          to="/history"
          className="neo-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
            color: "var(--text-primary)",
            fontSize: "0.8rem",
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = "var(--neo-md)"}
          onMouseLeave={e => e.currentTarget.style.boxShadow = "var(--neo-sm)"}
        >
          <ArrowLeft size={15} />
          Back to Logs
        </Link>
      </div>

      {loading && (
        <div className="neo-card" style={{ padding: "4rem", textAlign: "center" }}>
          <Loader2 size={36} style={{
            color: "var(--accent-cyan)",
            animation: "spinSlow 1s linear infinite",
            margin: "0 auto 1rem",
            display: "block",
          }} />
          <p style={{ color: "var(--text-secondary)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.875rem" }}>
            Loading scan...
          </p>
        </div>
      )}

      {!loading && !scan && (
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
          <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Record not found</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
            This scan record may have been deleted
          </p>
          <Link to="/" className="neo-btn-primary" style={{ display: "inline-block", textDecoration: "none" }}>
            Run a New Scan →
          </Link>
        </div>
      )}

      {scan && (
        <div style={{ animation: "fadeSlideIn 0.5s ease forwards" }}>
          <SecurityReport scan={scan} />
        </div>
      )}
    </div>
  );
}