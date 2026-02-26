import React, { useState } from "react";
import { Shield, Zap, Eye } from "lucide-react";
import ScannerInput from "../components/analyzer/ScannerInput";
import ScanningAnimation from "../components/analyzer/ScanningAnimation";
import SecurityReport from "../components/report/SecurityReport";
import { api } from "../utils/api";

export default function Analyzer() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = async (inputText, file) => {
    setScanning(true);
    setResult(null);
    try {
      const scanResult = await api.analyze(inputText, file);
      setResult(scanResult);
    } catch (error) {
      console.error("Scan failed:", error);
      alert("Scan failed. Please try again.");
    } finally {
      setScanning(false);
    }
  };

  const handleNewScan = () => {
    setResult(null);
    setScanning(false);
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", padding: "2rem 1rem" }}>

      {!scanning && !result && (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 120px)",
          gap: "2.5rem",
        }}>

          {/* Hero icon */}
          <div style={{ animation: "floatUp 3s ease-in-out infinite" }}>
            <div style={{
              width: "96px",
              height: "96px",
              borderRadius: "28px",
              background: "var(--bg-surface)",
              boxShadow: "var(--neo-lg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}>
              <Shield size={48} style={{ color: "var(--accent-red)" }} />
              <div style={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "var(--accent-green)",
                boxShadow: "0 0 12px rgba(46,213,115,0.6)",
                animation: "glowPulse 2s ease-in-out infinite",
              }} />
            </div>
          </div>

          {/* Title */}
          <div style={{ textAlign: "center" }}>
            <h1 style={{
              fontSize: "2.8rem",
              fontWeight: "800",
              color: "var(--text-primary)",
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: "0.75rem",
            }}>
              Threat<br />
              <span style={{ color: "var(--accent-red)" }}>Analyzer</span>
            </h1>
            <p style={{
              color: "var(--text-secondary)",
              fontSize: "0.875rem",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}>
              AI-Powered Phishing Detection Engine
            </p>
          </div>

          {/* Feature pills */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { icon: Zap, label: "Real-time Scan", color: "var(--accent-cyan)" },
              { icon: Shield, label: "AI Analysis", color: "var(--accent-red)" },
              { icon: Eye, label: "Threat Intel", color: "var(--accent-orange)" },
            ].map(({ icon: Icon, label, color }, i) => (
              <div key={i} className="neo-badge" style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--text-secondary)",
              }}>
                <Icon size={13} style={{ color }} />
                <span style={{ fontSize: "0.72rem", letterSpacing: "0.06em", fontFamily: "'Space Grotesk', sans-serif" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          <ScannerInput onScanStart={handleScan} isSubmitting={scanning} />
        </div>
      )}

      {scanning && <ScanningAnimation />}

      {result && (
        <div style={{ paddingTop: "1rem", animation: "fadeSlideIn 0.5s ease forwards" }}>
          <div style={{
            maxWidth: "780px",
            margin: "0 auto 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}>
            <div>
              <span className="section-label">Security Report</span>
              <h2 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginTop: "4px" }}>
                Scan Complete
              </h2>
            </div>
            <button
              className="neo-btn-primary"
              onClick={handleNewScan}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <Zap size={14} />
              New Scan
            </button>
          </div>
          <SecurityReport scan={result} />
        </div>
      )}
    </div>
  );
}