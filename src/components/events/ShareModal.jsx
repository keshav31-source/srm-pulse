import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  Printer, 
  ExternalLink,
  QrCode,
  Calendar,
  MapPin
} from 'lucide-react';

export const ShareModal = ({ event, onClose }) => {
  const { addToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [showPosterMode, setShowPosterMode] = useState(false);

  if (!event) return null;

  const shareUrl = `${window.location.origin}/#event/${event.id}`;
  const shareText = `🚀 Check out "${event.title}" by ${event.clubName} on SRM Pulse!\n📅 Date: ${event.date} (${event.startTime})\n📍 Venue: ${event.venueName}, ${event.room}\n\nRegister on SRM Pulse: ${shareUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    addToast('Link Copied to Clipboard 📋', 'Share it with your teammates or WhatsApp groups!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleTwitter = () => {
    const text = `Excited for ${event.title} at SRM University! Organized by ${event.clubName}. Discover on SRM Pulse:`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const handleLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 10002 }}>
      <div 
        className="modal-content" 
        style={{ maxWidth: showPosterMode ? '480px' : '520px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Share2 size={20} color="var(--color-primary)" />
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {showPosterMode ? 'Campus QR Flyer' : 'Share Opportunity'}
            </h3>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-icon-only">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {showPosterMode ? (
            /* Printable QR Poster Flyer View */
            <div style={{
              backgroundColor: '#FFFFFF',
              color: '#0F172A',
              padding: '1.75rem',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'center',
              border: '2px solid var(--border-medium)',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                color: '#2563EB',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '4px'
              }}>
                SRM UNIVERSITY • CAMPUS EVENT
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem', lineHeight: 1.25 }}>
                {event.title}
              </h2>
              <div style={{ fontSize: '0.875rem', color: '#475569', fontWeight: 600, marginBottom: '1.25rem' }}>
                Presented by {event.clubName}
              </div>

              {/* Flyer QR Code */}
              <div style={{
                width: '180px',
                height: '180px',
                margin: '0 auto 1.25rem',
                padding: '12px',
                border: '2px solid #E2E8F0',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#FFFFFF'
              }}>
                <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                  <rect x="0" y="0" width="30" height="30" fill="#0F172A" />
                  <rect x="5" y="5" width="20" height="20" fill="#FFFFFF" />
                  <rect x="9" y="9" width="12" height="12" fill="#0F172A" />
                  <rect x="70" y="0" width="30" height="30" fill="#0F172A" />
                  <rect x="75" y="5" width="20" height="20" fill="#FFFFFF" />
                  <rect x="79" y="9" width="12" height="12" fill="#0F172A" />
                  <rect x="0" y="70" width="30" height="30" fill="#0F172A" />
                  <rect x="5" y="75" width="20" height="20" fill="#FFFFFF" />
                  <rect x="9" y="79" width="12" height="12" fill="#0F172A" />
                  <rect x="38" y="38" width="24" height="24" fill="#2563EB" rx="3" />
                  <circle cx="50" cy="50" r="6" fill="#FFFFFF" />
                  <rect x="42" y="12" width="6" height="8" fill="#0F172A" />
                  <rect x="72" y="42" width="14" height="6" fill="#0F172A" />
                  <rect x="14" y="45" width="8" height="12" fill="#0F172A" />
                  <rect x="45" y="72" width="12" height="8" fill="#0F172A" />
                  <rect x="72" y="72" width="14" height="14" fill="#0F172A" />
                </svg>
              </div>

              <div style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#2563EB',
                marginBottom: '1rem',
                textTransform: 'uppercase'
              }}>
                Scan to Register on SRM Pulse
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1.25rem',
                fontSize: '0.8125rem',
                color: '#475569',
                borderTop: '1px solid #E2E8F0',
                paddingTop: '0.875rem'
              }}>
                <span>📅 {event.date}</span>
                <span>⏰ {event.startTime}</span>
                <span>📍 {event.venueName}</span>
              </div>
            </div>
          ) : (
            /* Standard Social Sharing View */
            <div>
              {/* Event Preview Card */}
              <div style={{
                display: 'flex',
                gap: '0.875rem',
                padding: '0.875rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                marginBottom: '1.5rem'
              }}>
                <img 
                  src={event.banner} 
                  alt={event.title} 
                  style={{ width: '70px', height: '70px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <span className="badge badge-primary" style={{ fontSize: '0.6875rem', marginBottom: '4px' }}>
                    {event.category}
                  </span>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {event.title}
                  </h4>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {event.date} • {event.venueName}
                  </div>
                </div>
              </div>

              {/* Social Buttons Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <button
                  onClick={handleWhatsApp}
                  className="btn btn-secondary"
                  style={{ flexDirection: 'column', padding: '0.875rem 0.5rem', gap: '0.35rem' }}
                >
                  <span style={{ fontSize: '1.5rem' }}>💬</span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>WhatsApp</span>
                </button>
                <button
                  onClick={handleTwitter}
                  className="btn btn-secondary"
                  style={{ flexDirection: 'column', padding: '0.875rem 0.5rem', gap: '0.35rem' }}
                >
                  <span style={{ fontSize: '1.5rem' }}>𝕏</span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Twitter / X</span>
                </button>
                <button
                  onClick={handleLinkedIn}
                  className="btn btn-secondary"
                  style={{ flexDirection: 'column', padding: '0.875rem 0.5rem', gap: '0.35rem' }}
                >
                  <span style={{ fontSize: '1.5rem' }}>💼</span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>LinkedIn</span>
                </button>
              </div>

              {/* Copy Link Bar */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Shareable Campus URL</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="form-input font-mono"
                    style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}
                  />
                  <button
                    onClick={handleCopyLink}
                    className="btn btn-primary btn-sm"
                    style={{ gap: '0.4rem', paddingLeft: '1rem', paddingRight: '1rem' }}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <button
            onClick={() => setShowPosterMode(!showPosterMode)}
            className="btn btn-ghost btn-sm"
            style={{ gap: '0.4rem', color: 'var(--color-primary)' }}
          >
            <QrCode size={15} />
            <span>{showPosterMode ? 'Back to Social Share' : 'Generate QR Poster Flyer'}</span>
          </button>

          {showPosterMode && (
            <button
              onClick={() => window.print()}
              className="btn btn-primary btn-sm"
              style={{ gap: '0.4rem' }}
            >
              <Printer size={15} />
              <span>Print Flyer</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
