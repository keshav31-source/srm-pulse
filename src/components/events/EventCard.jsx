import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Bookmark, 
  Share2, 
  Check, 
  Users, 
  Radio, 
  AlertTriangle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const EventCard = ({ 
  event, 
  onRegisterClick, 
  onShareClick 
}) => {
  const { 
    navigateTo, 
    savedEventIds, 
    toggleBookmark, 
    registrations,
    currentUser 
  } = useApp();

  const isSaved = savedEventIds.includes(event.id);
  const userRegistration = registrations.find(
    r => r.eventId === event.id && (r.status === 'CONFIRMED' || r.status === 'WAITLISTED')
  );

  const isRegistered = userRegistration?.status === 'CONFIRMED';
  const isWaitlisted = userRegistration?.status === 'WAITLISTED';
  const isFull = event.registeredCount >= event.capacity;
  const isHappeningNow = event.status === 'happening_now';
  const isClosingSoon = event.status === 'closing_soon';

  // Capacity fill percentage
  const fillPercent = Math.min(100, Math.round((event.registeredCount / event.capacity) * 100));

  const formatEventDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' });
    } catch {
      return dateStr;
    }
  };

  const handleCardClick = () => {
    navigateTo('event-detail', { eventId: event.id });
  };

  return (
    <div 
      className="card card-interactive"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: 'pointer',
        border: isHappeningNow ? '1.5px solid rgba(239, 68, 68, 0.4)' : undefined
      }}
      onClick={handleCardClick}
    >
      {/* Banner & Floating Badges */}
      <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden' }}>
        <img 
          src={event.banner} 
          alt={event.title}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80';
          }}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transition: 'transform 300ms ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)'
        }} />

        {/* Top Left: Category & Live status */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '0.4rem', zIndex: 2 }}>
          <span className="badge badge-primary" style={{ backdropFilter: 'blur(8px)' }}>
            {event.category}
          </span>
          {isHappeningNow && (
            <span className="badge badge-live" style={{ backdropFilter: 'blur(8px)' }}>
              <span className="pulse-dot" />
              LIVE NOW
            </span>
          )}
          {isClosingSoon && !isHappeningNow && (
            <span className="badge badge-warning" style={{ backdropFilter: 'blur(8px)' }}>
              ⏰ CLOSING SOON
            </span>
          )}
        </div>

        {/* Top Right: Bookmark & Share buttons */}
        <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '0.35rem', zIndex: 2 }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(event.id);
            }}
            className="btn btn-secondary btn-icon-only"
            style={{
              padding: '6px',
              borderRadius: '50%',
              backgroundColor: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(8px)'
            }}
            title={isSaved ? "Saved" : "Save event"}
          >
            <Bookmark 
              size={15} 
              color={isSaved ? "#F59E0B" : "#FFFFFF"} 
              fill={isSaved ? "#F59E0B" : "none"} 
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onShareClick) onShareClick(event);
            }}
            className="btn btn-secondary btn-icon-only"
            style={{
              padding: '6px',
              borderRadius: '50%',
              backgroundColor: 'rgba(15, 23, 42, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(8px)'
            }}
            title="Share"
          >
            <Share2 size={15} color="#FFFFFF" />
          </button>
        </div>

        {/* Bottom Left over Banner: Cost Pill & Format */}
        <div style={{ position: 'absolute', bottom: '10px', left: '12px', display: 'flex', gap: '0.4rem', zIndex: 2 }}>
          <span style={{
            fontSize: '0.6875rem',
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: '4px',
            backgroundColor: event.cost === 'Free' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(99, 102, 241, 0.9)',
            color: '#FFFFFF'
          }}>
            {event.cost}
          </span>
          <span style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            padding: '2px 8px',
            borderRadius: '4px',
            backgroundColor: 'rgba(0,0,0,0.6)',
            color: '#FFFFFF'
          }}>
            {event.format}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Organizer / Club with verified mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.35rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-primary)' }}>
            {event.clubName}
          </span>
          {event.verified && (
            <span style={{ color: 'var(--color-primary)', fontSize: '0.75rem' }} title="Verified Club">✓</span>
          )}
        </div>

        {/* Event Title */}
        <h3 style={{ 
          fontSize: '1.0625rem', 
          fontWeight: 700, 
          lineHeight: 1.35, 
          marginBottom: '0.5rem',
          color: 'var(--text-primary)'
        }}>
          {event.title}
        </h3>

        {/* Short summary */}
        <p style={{
          fontSize: '0.8125rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
          marginBottom: '1rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {event.shortDescription || event.description}
        </p>

        {/* Metadata: Date, Time & Venue */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
          padding: '0.75rem',
          backgroundColor: 'var(--bg-surface-elevated)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1rem',
          fontSize: '0.8125rem',
          color: 'var(--text-secondary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={14} color="var(--color-primary)" />
            <span>{formatEventDate(event.date)}</span>
            <span style={{ color: 'var(--text-muted)' }}>•</span>
            <Clock size={14} color="var(--color-primary)" />
            <span>{event.startTime} - {event.endTime}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={14} color="var(--color-primary)" />
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {event.venueName} {event.room ? `(${event.room})` : ''}
            </span>
          </div>
        </div>

        {/* Capacity Meter */}
        <div style={{ marginTop: 'auto', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <span>
              {isFull ? (
                <strong style={{ color: 'var(--color-warning)' }}>Full ({event.capacity} seats)</strong>
              ) : (
                <span>{event.capacity - event.registeredCount} spots left</span>
              )}
            </span>
            <span>{event.registeredCount} / {event.capacity}</span>
          </div>
          <div style={{
            width: '100%',
            height: '6px',
            backgroundColor: 'var(--bg-surface-hover)',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${fillPercent}%`,
              height: '100%',
              backgroundColor: isFull ? 'var(--color-warning)' : fillPercent > 80 ? 'var(--color-primary)' : 'var(--color-success)',
              borderRadius: 'var(--radius-full)',
              transition: 'width 400ms ease'
            }} />
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {isRegistered ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateTo('event-detail', { eventId: event.id });
              }}
              className="btn btn-success btn-sm"
              style={{ flex: 1, gap: '0.35rem' }}
            >
              <Check size={15} />
              <span>Registered ✓</span>
            </button>
          ) : isWaitlisted ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateTo('event-detail', { eventId: event.id });
              }}
              className="btn btn-warning btn-sm"
              style={{ flex: 1, gap: '0.35rem' }}
            >
              <span>On Waitlist</span>
            </button>
          ) : isFull ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onRegisterClick) onRegisterClick(event);
              }}
              className="btn btn-secondary btn-sm"
              style={{ flex: 1, gap: '0.35rem', borderColor: 'var(--color-warning)' }}
            >
              <span>Join Waitlist</span>
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onRegisterClick) onRegisterClick(event);
              }}
              className="btn btn-primary btn-sm"
              style={{ flex: 1, gap: '0.35rem' }}
            >
              <span>Register Now</span>
              <ArrowRight size={14} />
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.4rem 0.65rem' }}
            title="View Details"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};
