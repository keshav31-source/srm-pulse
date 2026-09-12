import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, AlertTriangle, ShieldAlert, Check } from 'lucide-react';

export const ReportModal = ({ event, onClose }) => {
  const { reportEvent, currentUser } = useApp();

  const [reason, setReason] = useState('Fake or Non-Existent Event');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!event) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    reportEvent({
      eventId: event.id,
      title: event.title,
      reason,
      details
    });
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 10002 }}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '500px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldAlert size={20} color="var(--color-danger)" />
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Report Inappropriate Content
            </h3>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-icon-only">
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="modal-body" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-success-light)',
              color: 'var(--color-success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <Check size={24} />
            </div>
            <h4 style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Report Submitted for Review
            </h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Thank you for keeping the SRM campus platform safe. Our Directorate of Student Affairs administrators will review this report promptly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                Reporting <strong>"{event.title}"</strong>. Help us maintain a verified, high-trust ecosystem for all students.
              </p>

              <div className="form-group">
                <label className="form-label">Reason for reporting</label>
                <select 
                  value={reason} 
                  onChange={(e) => setReason(e.target.value)}
                  className="form-select"
                >
                  <option value="Fake or Non-Existent Event">Fake or Non-Existent Event</option>
                  <option value="Scam / Suspicious External Registration">Scam / Suspicious External Registration</option>
                  <option value="Inappropriate Content or Hate Speech">Inappropriate Content or Hate Speech</option>
                  <option value="Spam or Duplicate Post">Spam or Duplicate Post</option>
                  <option value="Incorrect Date, Venue or Eligibility">Incorrect Date, Venue or Eligibility</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Additional Details / Evidence</label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Explain why this listing violates campus guidelines (e.g. invalid contact person, unauthorized paid links)..."
                  className="form-textarea"
                  rows={3}
                  required
                />
              </div>

              <div style={{
                marginTop: '1rem',
                fontSize: '0.75rem',
                color: 'var(--text-muted)'
              }}>
                Report submitted as: {currentUser.name} ({currentUser.email})
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-danger btn-sm"
              >
                Submit Report to Admin
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
