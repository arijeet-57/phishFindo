import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';
import Analyzer from './pages/Analyzer';
import Results from './pages/Results';
import ThemeToggle from './components/ThemeToggle';

function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navLinkStyle = (path) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '9px 18px',
    borderRadius: '12px',
    fontSize: '0.825rem',
    fontWeight: '600',
    fontFamily: "'Space Grotesk', sans-serif",
    color: isActive(path) ? 'var(--accent-cyan)' : 'var(--text-secondary)',
    background: isActive(path) ? 'var(--bg-elevated)' : 'transparent',
    boxShadow: isActive(path) ? 'var(--neo-sm)' : 'none',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    letterSpacing: '0.02em',
  });

  return (
    <nav style={{
      background: 'var(--bg-surface)',
      boxShadow: 'var(--neo-sm)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '68px',
      }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'var(--bg)',
            boxShadow: 'var(--neo-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'box-shadow 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--neo-md)'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--neo-sm)'}
          >
            <Shield size={20} style={{ color: 'var(--accent-red)' }} />
          </div>
          <span style={{
            fontSize: '1.1rem',
            fontWeight: '700',
            fontFamily: "'Space Grotesk', sans-serif",
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
          }}>
            Phish<span style={{ color: 'var(--accent-red)' }}>Findo</span>
          </span>
        </Link>

        {/* Nav links + toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Divider */}
          <div style={{
            width: '1px',
            height: '24px',
            background: 'var(--border)',
            margin: '0 0.5rem',
          }} />

              <ThemeToggle />
            </div>
                  </div>
                </nav>
              );
            }

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Analyzer />} />
            <Route path="/results/:id" element={<Results />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}