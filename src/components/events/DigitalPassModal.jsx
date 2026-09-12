import React from 'react';
import { 
  X, 
  Download, 
  Calendar as CalendarIcon, 
  MapPin, 
  CheckCircle2, 
  Share2, 
  Sparkles,
  QrCode
} from 'lucide-react';

export const DigitalPassModal = ({ registration, event, onClose }) => {
  if (!registration || !event) return null;

  // Generate an .ics calendar file download
  const handleDownloadICS = () => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SRM University//SRM Pulse//EN
BEGIN:VEVENT
UID:${registration.ticketCode}@srmpulse.srmist.edu.in
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${event.date.replace(/-/g, '')}T${(event.startTime || '10:00').replace(':', '')}00
DTEND:${event.date.replace(/-/g, '')}T${(event.endTime || '12:00').replace(':', '')}00
SUMMARY:${event.title}
DESCRIPTION:${event.shortDescription || event.title} Organized by ${event.clubName}. Ticket: ${registration.ticketCode}
LOCATION:${event.venueName}, ${event.room || ''}, SRM University KTR
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.title.slice(0, 20)}-ticket.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGoogleCalendar = () => {
    const start = `${event.date.replace(/-/g, '')}T${(event.startTime || '10:00').replace(':', '')}00`;
    const end = `${event.date.replace(/-/g, '')}T${(event.endTime || '12:00').replace(':', '')}00`;
    const details = encodeURIComponent(`${event.shortDescription || event.title}\nTicket Pass: ${registration.ticketCode}\nOrganized by ${event.clubName}`);
    const location = encodeURIComponent(`${event.venueName}, ${event.room || ''}, SRM University Kattankulathur`);
    const title = encodeURIComponent(event.title);

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
    window.open(url, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 10002 }}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '440px', padding: 0, overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button 
          onClick={onClose} 
          className="btn btn-ghost btn-icon-only"
          style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10, color: '#FFFFFF', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '50%' }}
        >
          <X size={18} />
        </button>

        {/* Ticket Header & Event Visual */}
        <div style={{
          position: 'relative',
          height: '140px',
          backgroundImage: `url(${event.banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(15,23,42,0.4) 0%, rgba(15,23,42,0.95) 100%)'
          }} />
          <div style={{ position: 'absolute', bottom: '16px', left: '20px', right: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '4px' }}>
              <span className="badge badge-success" style={{ fontSize: '0.6875rem' }}>
                <CheckCircle2 size={12} /> CONFIRMED PASS
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {event.clubName}
              </span>
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.25 }}>
              {event.title}
            </h3>
          </div>
        </div>

        {/* Ticket Body with Details */}
        <div style={{ padding: '1.25rem 1.5rem', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            paddingBottom: '1.25rem',
            borderBottom: '1px dashed var(--border-medium)',
            fontSize: '0.8125rem'
          }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.6875rem', textTransform: 'uppercase', fontWeight: 600 }}>
                Attendee
              </div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                {registration.answers?.fullName || "Keshav Arora"}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                {registration.answers?.regNumber || "RA2211003010142"}
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.6875rem', textTransform: 'uppercase', fontWeight: 600 }}>
                Date & Time
              </div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                {event.date}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                {event.startTime} - {event.endTime}
              </div>
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.6875rem', textTransform: 'uppercase', fontWeight: 600 }}>
                Campus Venue
              </div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={13} color="var(--color-primary)" />
                <span>{event.venueName} • {event.room}</span>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div style={{
            padding: '1.5rem 0',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {/* SVG Simulated QR Code */}
            <div style={{
              width: '150px',
              height: '150px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              marginBottom: '0.75rem'
            }}>
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                {/* QR Pattern */}
                <rect x="0" y="0" width="30" height="30" fill="#0F172A" />
                <rect x="5" y="5" width="20" height="20" fill="#FFFFFF" />
                <rect x="9" y="9" width="12" height="12" fill="#0F172A" />

                <rect x="70" y="0" width="30" height="30" fill="#0F172A" />
                <rect x="75" y="5" width="20" height="20" fill="#FFFFFF" />
                <rect x="79" y="9" width="12" height="12" fill="#0F172A" />

                <rect x="0" y="70" width="30" height="30" fill="#0F172A" />
                <rect x="5" y="75" width="20" height="20" fill="#FFFFFF" />
                <rect x="9" y="79" width="12" height="12" fill="#0F172A" />

                <rect x="40" y="10" width="8" height="8" fill="#0F172A" />
                <rect x="52" y="15" width="8" height="12" fill="#0F172A" />
                <rect x="35" y="35" width="30" height="30" fill="#2563EB" rx="4" />
                <circle cx="50" cy="50" r="8" fill="#FFFFFF" />

                <rect x="15" y="45" width="10" height="8" fill="#0F172A" />
                <rect x="75" y="40" width="12" height="12" fill="#0F172A" />
                <rect x="40" y="75" width="16" height="8" fill="#0F172A" />
                <rect x="65" y="70" width="10" height="18" fill="#0F172A" />
                <rect x="80" y="80" width="12" height="10" fill="#0F172A" />
              </svg>
            </div>

            <div style={{
              fontSize: '1rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-primary)',
              marginBottom: '2px'
            }}>
              {registration.ticketCode}
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
              Scan at entrance for automated campus attendance
            </div>
          </div>

          {/* Calendar Actions */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.5rem',
            paddingTop: '0.5rem'
          }}>
            <button
              onClick={handleGoogleCalendar}
              className="btn btn-secondary btn-sm"
              style={{ gap: '0.35rem', justifyContent: 'center' }}
            >
              <CalendarIcon size={14} />
              <span>Google Calendar</span>
            </button>
            <button
              onClick={handleDownloadICS}
              className="btn btn-secondary btn-sm"
              style={{ gap: '0.35rem', justifyContent: 'center' }}
            >
              <Download size={14} />
              <span>Download (.ics)</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: 'var(--bg-surface-elevated)',
          borderTop: '1px solid var(--border-subtle)',
          textAlign: 'center',
          fontSize: '0.6875rem',
          color: 'var(--text-muted)'
        }}>
          Show this digital ticket or screenshot at the venue check-in desk.
        </div>
      </div>
    </div>
  );
};
