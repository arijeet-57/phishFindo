import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Clock, Globe, Mail, MessageSquare, FileText, ChevronRight, Shield } from "lucide-react";
import { api } from "../utils/api";

const TYPE_ICONS = {
  url: Globe,
  email: Mail,
  message: MessageSquare,
  file: FileText,
};

const VERDICT_STYLES = {
  safe: { emoji: "✅", label: "SAFE" },
  suspicious: { emoji: "⚠️", label: "SUSPICIOUS" },
  malicious: { emoji: "🔴", label: "MALICIOUS" },
};

export default function History() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await api.getHistory();
      setScans(data);
    } catch (error) {
      console.error('Failed to load history:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12" style={{ background: '#0f0f0f', color: '#ffffff' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '2rem',
        padding: '1.5rem',
        borderRadius: '4px',
        background: '#1a1a1a',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
        border: '1px solid #404040',
      }}>
        <h1 style={{
          fontSize: '0.875rem',
          fontWeight: '700',
          color: '#00ffff',
          fontFamily: "'Courier New', monospace",
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          margin: 0,
        }}>SCAN LOGS</h1>
        <span style={{
          marginLeft: 'auto',
          fontSize: '0.875rem',
          fontWeight: '700',
          color: '#b0b0b0',
          fontFamily: "'Segoe UI', monospace",
        }}>
          {scans.length} {scans.length !== 1 ? "RECORDS" : "RECORD"}
        </span>
      </div>

      {loading && (
        <div style={{
          textAlign: 'center',
          paddingTop: '5rem',
          paddingBottom: '5rem',
          borderRadius: '4px',
          background: '#1a1a1a',
          padding: '1.5rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
          border: '1px solid #404040',
        }}>
          <p style={{
            color: '#b0b0b0',
            fontFamily: "'Segoe UI', monospace",
            fontWeight: '500',
            fontSize: '0.875rem',
          }}>LOADING SCAN HISTORY...</p>
        </div>
      )}

      {!loading && scans.length === 0 && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '5rem',
          paddingBottom: '5rem',
          textAlign: 'center',
          borderRadius: '4px',
          background: '#1a1a1a',
          padding: '1.5rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
          border: '1px solid #404040',
        }}>
          <Shield style={{ width: '3rem', height: '3rem', color: '#ff3333', marginBottom: '1rem' }} />
          <p style={{
            color: '#ffffff',
            fontFamily: "'Courier New', monospace",
            fontWeight: '700',
            fontSize: '0.875rem',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
          }}>NO SCAN RECORDS FOUND</p>
          <Link
            to="/"
            style={{
              fontSize: '0.75rem',
              fontWeight: '700',
              color: '#0f0f0f',
              background: '#ff3333',
              padding: '10px 20px',
              borderRadius: '4px',
              border: 'none',
              textDecoration: 'none',
              display: 'inline-block',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(255, 51, 51, 0.3)',
              transition: 'all 0.2s ease',
              fontFamily: "'Courier New', monospace",
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 51, 51, 0.5)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 51, 51, 0.3)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            RUN YOUR FIRST SCAN →
          </Link>
        </div>
      )}

      {!loading && scans.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {scans.map((scan) => {
            const Icon = TYPE_ICONS[scan.input_type] || Globe;
            const verdictStyle = VERDICT_STYLES[scan.verdict] || VERDICT_STYLES.suspicious;

            return (
              <Link
                key={scan._id}
                to={`/results/${scan._id}`}
                style={{
                  display: 'block',
                  padding: '1rem',
                  borderRadius: '4px',
                  background: '#1a1a1a',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                  border: '1px solid #404040',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#ff3333';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.7)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#404040';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5)';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}>
                  {/* Status emoji */}
                  <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>{verdictStyle.emoji}</div>

                  {/* Type icon */}
                  <Icon style={{
                    width: '1rem',
                    height: '1rem',
                    color: '#00ffff',
                    flexShrink: 0,
                  }} />

                  {/* Content preview */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#b0b0b0',
                      fontFamily: "'Segoe UI', monospace",
                      fontWeight: '500',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      margin: 0,
                    }}>
                      {scan.input_content?.substring(0, 80) || "—"}
                    </p>
                  </div>

                  {/* Score */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    flexShrink: 0,
                  }}>
                    <span style={{
                      fontSize: '0.875rem',
                      fontFamily: "'Courier New', monospace",
                      fontWeight: '700',
                      color: '#ffffff',
                    }}>
                      {scan.risk_score ?? "—"}/100
                    </span>
                  </div>

                  {/* Date */}
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#b0b0b0',
                    fontFamily: "'Segoe UI', monospace",
                    width: '5rem',
                    textAlign: 'right',
                  }}>
                    {format(new Date(scan.created_at), "M/d/yy")}
                  </div>

                  {/* Chevron */}
                  <ChevronRight style={{
                    width: '1rem',
                    height: '1rem',
                    color: '#ff3333',
                    flexShrink: 0,
                  }} />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
