import React from 'react';
import { useApp } from '../context/AppContext';
import { Radio, MapPin, Clock, ArrowRight, Sparkles, Navigation, Users, CheckCircle } from 'lucide-react';

export const HappeningNowView = ({ onRegisterClick, onShareClick }) => {
  const { events, navigateTo } = useApp();

  const liveEvents = events.filter(e => e.status === 'happening_now');
  const todayEvents = events.filter(e => e.date === '2026-09-12' && e.status !== 'happening_now' && e.status !== 'rejected');

  return (
    <div className="container" style={{ paddingBottom: '4rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span className="badge badge-live">
            <span className="pulse-dot" /> REAL-TIME PULSE
          </span>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Saturday, September 12, 2026
          </span>
        </div>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          🔴 Happening Right Now at SRM
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '680px' }}>
          Live sessions, workshops, hackathons, and gatherings underway right now across campus. Open the doors, walk in, or join live activities.
        </p>
      </div>

      {/* Live Now Primary Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3.5rem' }}>
        {liveEvents.length === 0 ? (
          <div style={{
            padding: '3rem',
            textAlign: 'center',
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-subtle)'
          }}>
            <Radio size={36} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              No sessions active at this exact moment
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Check out events taking place later today below.
            </p>
          </div>
        ) : (
          liveEvents.map(evt => (
            <div
              key={evt.id}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1.5px solid rgba(239, 68, 68, 0.4)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(239, 68, 68, 0.12)'
              }}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(280px, 1fr) 2fr',
                gap: 0
              }} className="live-event-grid">
                {/* Banner side */}
                <div style={{ position: 'relative', minHeight: '220px' }}>
                  <img
                    src={evt.banner}
                    alt={evt.title}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80';
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)'
                  }} />
                  <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                    <span className="badge badge-live" style={{ backdropFilter: 'blur(8px)' }}>
                      <span className="pulse-dot" /> LIVE IN PROGRESS
                    </span>
                  </div>
                </div>

                {/* Content side */}
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <span className="badge badge-primary">{evt.category}</span>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--color-primary)', fontWeight: 600 }}>{evt.clubName}</span>
                    </div>

                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                      {evt.title}
                    </h2>

                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                      {evt.shortDescription || evt.description}
                    </p>

                    {/* Current Live Step */}
                    {evt.currentScheduleStep && (
                      <div style={{
                        padding: '0.875rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'rgba(239, 68, 68, 0.08)',
                        borderLeft: '4px solid #EF4444',
                        marginBottom: '1.25rem'
                      }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#EF4444', textTransform: 'uppercase', marginBottom: '2px' }}>
                          Current Session on Stage:
                        </div>
                        <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {evt.currentScheduleStep}
                        </div>
                      </div>
                    )}

                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '1.5rem',
                      fontSize: '0.8125rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Clock size={15} color="var(--color-primary)" />
                        <span><strong>{evt.startTime} - {evt.endTime}</strong></span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <MapPin size={15} color="var(--color-primary)" />
                        <span><strong>{evt.venueName} • {evt.room}</strong></span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Users size={15} color="var(--color-primary)" />
                        <span>{evt.registeredCount} checked in</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <button
                      onClick={() => navigateTo('event-detail', { eventId: evt.id })}
                      className="btn btn-primary"
                      style={{ gap: '0.4rem' }}
                    >
                      <span>View Session Details</span>
                      <ArrowRight size={15} />
                    </button>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.5rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--bg-surface-elevated)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '0.8125rem',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      <MapPin size={14} color="var(--color-primary)" />
                      <span>{evt.room} (Walk-ins Welcome)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Scheduled Later Today */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
          Also Scheduled Today (Sep 12)
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {todayEvents.map(evt => (
            <div
              key={evt.id}
              onClick={() => navigateTo('event-detail', { eventId: evt.id })}
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                cursor: 'pointer',
                transition: 'all var(--duration-fast)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{evt.category}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-warning)', fontWeight: 700 }}>
                  ⏰ {evt.startTime}
                </span>
              </div>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                {evt.title}
              </h3>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                📍 {evt.venueName} • {evt.clubName}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>View Details & Register</span>
                <ArrowRight size={13} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .live-event-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
