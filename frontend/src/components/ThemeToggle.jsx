import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { dark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      style={{
        background: 'var(--bg-surface)',
        borderRadius: '50px',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        boxShadow: 'var(--neo-sm)',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        minWidth: '80px',
        justifyContent: 'space-between',
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--neo-md)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--neo-sm)'}
    >
      {/* Track */}
      <div style={{
        width: '36px',
        height: '20px',
        borderRadius: '50px',
        background: dark ? 'var(--accent-cyan)' : 'var(--accent-orange)',
        boxShadow: dark
          ? 'inset 0 0 8px rgba(0,210,255,0.5)'
          : 'inset 0 0 8px rgba(255,165,2,0.4)',
        position: 'relative',
        transition: 'background 0.3s ease',
        flexShrink: 0,
      }}>
        <div style={{
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          background: '#ffffff',
          position: 'absolute',
          top: '3px',
          left: dark ? '19px' : '3px',
          transition: 'left 0.3s ease',
          boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
        }} />
      </div>
      {dark
        ? <Moon size={14} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
        : <Sun  size={14} style={{ color: 'var(--accent-orange)', flexShrink: 0 }} />
      }
    </button>
  );
}