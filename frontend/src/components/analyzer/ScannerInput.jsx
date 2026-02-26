import React, { useState, useRef } from "react";
import { Send, Paperclip, X, FileText, Loader2 } from "lucide-react";

export default function ScannerInput({ onScanStart, isSubmitting }) {
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);

  const handleSubmit = async () => {
    if (!input.trim() && !file) return;
    await onScanStart(input.trim(), file);
    setInput("");
    setFile(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const canSubmit = !isSubmitting && (input.trim() || file);

  return (
    <div style={{ width: "100%", maxWidth: "600px" }}>

      {/* File chip */}
      {file && (
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "12px",
          padding: "8px 14px",
          borderRadius: "50px",
          background: "var(--bg-surface)",
          boxShadow: "var(--neo-sm)",
          fontSize: "0.8rem",
          color: "var(--text-secondary)",
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          <FileText size={13} style={{ color: "var(--accent-cyan)" }} />
          <span style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {file.name}
          </span>
          <button
            onClick={() => setFile(null)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2px",
              display: "flex",
              color: "var(--text-muted)",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--accent-red)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* Main input card */}
      <div style={{
        background: "var(--bg-surface)",
        borderRadius: "20px",
        padding: "0.75rem",
        boxShadow: "var(--neo-md)",
        border: "1px solid var(--border)",
      }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>

          {/* Attach button */}
          <button
            onClick={() => fileRef.current?.click()}
            disabled={isSubmitting}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "var(--bg)",
              boxShadow: "var(--neo-sm)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              opacity: isSubmitting ? 0.5 : 1,
              color: "var(--text-secondary)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => {
              if (!isSubmitting) {
                e.currentTarget.style.boxShadow = "var(--neo-md)";
                e.currentTarget.style.color = "var(--accent-cyan)";
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = "var(--neo-sm)";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            <Paperclip size={17} />
          </button>
          <input
            ref={fileRef}
            type="file"
            style={{ display: "none" }}
            onChange={e => setFile(e.target.files?.[0] || null)}
          />

          {/* Textarea */}
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSubmitting}
            placeholder="Paste suspicious URL, email, or message…"
            rows={1}
            style={{
              flex: 1,
              background: "var(--bg)",
              color: "var(--text-primary)",
              fontSize: "0.875rem",
              resize: "none",
              padding: "12px 14px",
              border: "none",
              borderRadius: "12px",
              boxShadow: "var(--neo-inset)",
              fontFamily: "'DM Sans', sans-serif",
              minHeight: "44px",
              maxHeight: "140px",
              opacity: isSubmitting ? 0.5 : 1,
              transition: "box-shadow 0.2s ease",
              outline: "none",
            }}
            onFocus={e => {
              e.currentTarget.style.boxShadow = "var(--neo-inset), 0 0 0 2px var(--accent-cyan)";
            }}
            onBlur={e => {
              e.currentTarget.style.boxShadow = "var(--neo-inset)";
            }}
          />

          {/* Send button */}
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: canSubmit ? "var(--accent-red)" : "var(--bg)",
              boxShadow: canSubmit
                ? "6px 6px 12px rgba(255,71,87,0.3), -2px -2px 6px rgba(255,255,255,0.1)"
                : "var(--neo-sm)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              opacity: canSubmit ? 1 : 0.4,
              transition: "all 0.2s ease",
              color: canSubmit ? "#ffffff" : "var(--text-muted)",
            }}
            onMouseEnter={e => {
              if (canSubmit) {
                e.currentTarget.style.boxShadow = "8px 8px 20px rgba(255,71,87,0.5)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = canSubmit
                ? "6px 6px 12px rgba(255,71,87,0.3), -2px -2px 6px rgba(255,255,255,0.1)"
                : "var(--neo-sm)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {isSubmitting
              ? <Loader2 size={17} style={{ animation: "spinSlow 1s linear infinite" }} />
              : <Send size={17} />
            }
          </button>
        </div>
      </div>

      {/* Hint text */}
      <p style={{
        textAlign: "center",
        color: "var(--text-muted)",
        fontSize: "0.72rem",
        marginTop: "1rem",
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: "0.04em",
      }}>
        URL · EMAIL · SMS · FILE — Press Enter to scan
      </p>
    </div>
  );
}