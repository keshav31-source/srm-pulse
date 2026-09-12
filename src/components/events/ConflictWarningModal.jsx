import React from 'react';
import { AlertTriangle, Clock, MapPin, X, Calendar } from 'lucide-react';

export const ConflictWarningModal = ({ 
  conflictingEvent, 
  targetEvent, 
  onCancel, 
  onProceedAnyway 
}) => {
  if (!conflictingEvent || !targetEvent) return null;

  return (
    <div className="modal-overlay" style={{ zIndex: 10001 }}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '520px', border: '1.5px solid var(--color-warning)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header" style={{ backgroundColor: 'var(--color-warning-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-warning)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <AlertTriangle size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Time Conflict Detected
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                You already have an event scheduled during this slot!
              </span>
            </div>
          </div>
          <button onClick={onCancel} className="btn btn-ghost btn-icon-only">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
            Registering for <strong>"{targetEvent.title}"</strong> overlaps with an existing confirmed event on your campus schedule:
          </p>

          {/* Conflicting Event Box */}
          <div style={{
            padding: '1rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-medium)',
            marginBottom: '1.25rem'
          }}>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-warning)', fontWeight: 700, marginBottom: '4px' }}>
              ⚠️ Existing Scheduled Event
            </div>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              {conflictingEvent.title}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={13} color="var(--color-primary)" />
                <span>{conflictingEvent.date}</span>
                <span>•</span>
                <Clock size={13} color="var(--color-primary)" />
                <span>{conflictingEvent.startTime} - {conflictingEvent.endTime}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={13} color="var(--color-primary)" />
                <span>{conflictingEvent.venueName} ({conflictingEvent.room})</span>
              </div>
            </div>
          </div>

          <div style={{
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--bg-card-subtle)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)'
          }}>
            ℹ️ You may still proceed if you plan to attend part of the session or manage team participation.
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button 
            onClick={onCancel}
            className="btn btn-secondary btn-sm"
          >
            Cancel & Keep Existing
          </button>
          <button 
            onClick={onProceedAnyway}
            className="btn btn-primary btn-sm"
            style={{ backgroundColor: 'var(--color-warning)', borderColor: 'var(--color-warning)', color: '#FFFFFF' }}
          >
            Register Anyway (Bypass Conflict)
          </button>
        </div>
      </div>
    </div>
  );
};
