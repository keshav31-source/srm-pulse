import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  QrCode, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Scan, 
  Users, 
  Search, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const QRCheckInScanner = ({ event, onClose }) => {
  const { markAttendance, registrations } = useApp();

  const [ticketInput, setTicketInput] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [scannerActive, setScannerActive] = useState(true);

  if (!event) return null;

  // Filter registrations for this specific event
  const eventRegistrations = registrations.filter(r => r.eventId === event.id);
  const attendedCount = eventRegistrations.filter(r => r.status === 'ATTENDED').length;
  const totalRegistered = eventRegistrations.length || event.registeredCount;
  const attendanceRate = totalRegistered > 0 ? ((attendedCount / totalRegistered) * 100).toFixed(1) : 0;

  const handleManualCheckIn = (codeToUse) => {
    const code = (codeToUse || ticketInput).trim();
    if (!code) return;

    const res = markAttendance(code);
    setScanResult(res);

    if (res.success) {
      setTicketInput('');
    }
  };

  // Quick test sample ticket from existing registrations
  const sampleTicket = eventRegistrations.find(r => r.status === 'CONFIRMED')?.ticketCode || 'SRM-GENAI-9842';

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 10002 }}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '580px', padding: 0, overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header" style={{ backgroundColor: 'var(--bg-surface-elevated)' }}>
          <div>
            <span className="badge badge-primary" style={{ fontSize: '0.6875rem', marginBottom: '2px' }}>
              Official Organizer Portal
            </span>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Live QR Attendance & Check-in Desk
            </h3>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-icon-only">
            <X size={20} />
          </button>
        </div>

        {/* Live Attendance Metric Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          padding: '1.25rem 1.75rem',
          backgroundColor: 'var(--bg-card-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>
              Registered
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              {totalRegistered}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>
              Attended
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-success)', marginTop: '2px' }}>
              {attendedCount}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>
              Attendance Rate
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '2px' }}>
              {attendanceRate}%
            </div>
          </div>
        </div>

        {/* Scanner Simulation Window */}
        <div className="modal-body" style={{ textAlign: 'center', padding: '1.5rem 1.75rem' }}>
          {/* Virtual Camera Viewfinder */}
          <div style={{
            position: 'relative',
            width: '240px',
            height: '240px',
            margin: '0 auto 1.5rem',
            backgroundColor: '#020617',
            borderRadius: 'var(--radius-xl)',
            border: '2px solid var(--border-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxShadow: '0 0 30px rgba(37, 99, 235, 0.2)'
          }}>
            {/* Viewfinder Reticle */}
            <div style={{
              width: '170px',
              height: '170px',
              border: '2px dashed var(--color-primary)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              {/* Animated Scan Line */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                backgroundColor: '#EF4444',
                boxShadow: '0 0 10px #EF4444',
                animation: 'scanMotion 2s infinite ease-in-out'
              }} />
              <Scan size={44} color="var(--color-primary)" style={{ opacity: 0.6 }} />
            </div>

            <span style={{
              position: 'absolute',
              bottom: '12px',
              fontSize: '0.6875rem',
              color: '#94A3B8',
              fontWeight: 600
            }}>
              Point Camera at Student Pass QR
            </span>
          </div>

          <style>{`
            @keyframes scanMotion {
              0%, 100% { top: 10%; }
              50% { top: 85%; }
            }
          `}</style>

          {/* Feedback Result Notice */}
          {scanResult && (
            <div style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: scanResult.success ? 'var(--color-success-light)' : 'var(--color-danger-light)',
              color: scanResult.success ? 'var(--color-success)' : 'var(--color-danger)',
              fontSize: '0.875rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '1.25rem'
            }}>
              {scanResult.success ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              <span>{scanResult.success ? `Verified: ${scanResult.registration.ticketCode}` : scanResult.message}</span>
            </div>
          )}

          {/* Manual Ticket Input Bar */}
          <div style={{ maxWidth: '380px', margin: '0 auto' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem', textAlign: 'left' }}>
              Manual Ticket Lookup / Barcode Scanner:
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Enter Ticket ID (e.g. SRM-GENAI-9842)"
                value={ticketInput}
                onChange={(e) => setTicketInput(e.target.value)}
                className="form-input font-mono"
                style={{ fontSize: '0.875rem', textTransform: 'uppercase' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleManualCheckIn();
                }}
              />
              <button
                onClick={() => handleManualCheckIn()}
                className="btn btn-primary btn-sm"
                style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
              >
                Check In
              </button>
            </div>

            {/* Quick test sample button for reviewers */}
            <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>Reviewer quick-test:</span>
              <button
                onClick={() => handleManualCheckIn(sampleTicket)}
                className="btn btn-ghost btn-sm"
                style={{ fontSize: '0.75rem', padding: '2px 6px', color: 'var(--color-primary)', textDecoration: 'underline' }}
              >
                Auto-scan "{sampleTicket}"
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Attendance records automatically generate certified digital credentials.
          </span>
          <button onClick={onClose} className="btn btn-secondary btn-sm">
            Done / Close Scanner
          </button>
        </div>
      </div>
    </div>
  );
};
