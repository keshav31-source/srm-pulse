import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, MapPin, Mail, RefreshCw, ExternalLink, Heart } from 'lucide-react';

export const Footer = () => {
  const { navigateTo, resetToDefaultData } = useApp();

  return (
    <footer style={{
      backgroundColor: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: '3.5rem',
      paddingBottom: '2.5rem',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          {/* Col 1: Brand & Identity */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.875rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                <Sparkles size={18} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                SRM <span style={{ color: 'var(--color-primary)' }}>PULSE</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
              The unified campus opportunity platform for SRM Institute of Science and Technology, Kattankulathur. Connecting 45,000+ students with hackathons, workshops, fests, and clubs.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              <MapPin size={15} color="var(--color-primary)" />
              <span>Kattankulathur, Chennai — 603203</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Campus Discovery
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <li>
                <a href="#explore" onClick={(e) => { e.preventDefault(); navigateTo('explore'); }} style={{ transition: 'color 150ms' }}>
                  All Campus Events
                </a>
              </li>
              <li>
                <a href="#happening-now" onClick={(e) => { e.preventDefault(); navigateTo('happening-now'); }} style={{ transition: 'color 150ms' }}>
                  🔴 Happening Right Now
                </a>
              </li>
              <li>
                <a href="#calendar" onClick={(e) => { e.preventDefault(); navigateTo('calendar'); }} style={{ transition: 'color 150ms' }}>
                  Campus Opportunity Calendar
                </a>
              </li>
              <li>
                <a href="#clubs" onClick={(e) => { e.preventDefault(); navigateTo('clubs'); }} style={{ transition: 'color 150ms' }}>
                  Verified Clubs & Societies
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: For Organizers & Clubs */}
          <div>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              For Organizers
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <li>
                <a href="#portal" onClick={(e) => { e.preventDefault(); navigateTo('organizer-dashboard'); }}>
                  Organizer Dashboard
                </a>
              </li>
              <li>
                <a href="#approval" onClick={(e) => { e.preventDefault(); navigateTo('admin-dashboard'); }}>
                  DSA Verification Guidelines
                </a>
              </li>
              <li>
                <span style={{ color: 'var(--text-muted)' }}>QR Attendance System</span>
              </li>
              <li>
                <span style={{ color: 'var(--text-muted)' }}>Event Analytics & Outreach</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Utilities */}
          <div>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Demo Controls
            </h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.875rem' }}>
              Testing interactive registrations, waitlists, and moderation? Reset the campus store anytime:
            </p>
            <button
              onClick={resetToDefaultData}
              className="btn btn-secondary btn-sm"
              style={{ gap: '0.4rem', width: '100%', justifyContent: 'center' }}
            >
              <RefreshCw size={14} />
              <span>Reset to Seed Data</span>
            </button>
            <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Built for SRM University Directorate of Student Affairs & Student Bodies.
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.8125rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} SRM Pulse • SRM Institute of Science and Technology. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>Made with</span>
            <Heart size={14} color="#EF4444" fill="#EF4444" />
            <span>for the SRM Builder Community</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
