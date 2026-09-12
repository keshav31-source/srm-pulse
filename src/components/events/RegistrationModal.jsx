import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ConflictWarningModal } from './ConflictWarningModal';
import { 
  X, 
  ExternalLink, 
  Check, 
  AlertCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  Users,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const RegistrationModal = ({ event, onClose, onSuccess }) => {
  const { currentUser, registerForEvent } = useApp();

  const isExternal = event.registrationType === 'external';
  const isFull = event.registeredCount >= event.capacity;

  // Form fields
  const [formData, setFormData] = useState({
    fullName: currentUser.name,
    srmEmail: currentUser.email,
    regNumber: currentUser.regNumber,
    department: currentUser.department,
    year: currentUser.year,
    phone: currentUser.phone,
    teamName: '',
    teamSize: '1',
    teamMembers: '',
    githubUrl: '',
    portfolioUrl: '',
    trackChoice: 'Autonomous AI & Frontier Models',
    experienceLevel: 'Intermediate'
  });

  const [conflictData, setConflictData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [externalClicked, setExternalClicked] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleFireConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // safe fallback
    }
  };

  const handleSubmit = (e, bypassConflict = false) => {
    if (e) e.preventDefault();

    // Validate SRM email
    if (!formData.srmEmail.includes('@srmist.edu.in') && !formData.srmEmail.includes('@srm')) {
      setErrorMsg('Please enter a valid SRM University institutional email (@srmist.edu.in).');
      return;
    }

    if (!formData.regNumber.trim().toUpperCase().startsWith('RA')) {
      setErrorMsg('Please enter a valid SRM Registration Number starting with RA (e.g. RA2211003010142).');
      return;
    }

    const result = registerForEvent(event.id, formData, bypassConflict);

    if (result.conflict) {
      setConflictData(result.conflictingEvent);
      return;
    }

    if (!result.success) {
      setErrorMsg(result.message || 'Registration failed');
      return;
    }

    handleFireConfetti();
    if (onSuccess) {
      onSuccess(result.registration);
    }
    onClose();
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div 
          className="modal-content" 
          style={{ maxWidth: '580px' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="modal-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '2px' }}>
                <span className="badge badge-primary">{event.category}</span>
                {isFull && <span className="badge badge-warning">Capacity Full — Waitlist</span>}
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {isFull ? 'Join Event Waitlist' : 'Event Registration'}
              </h3>
            </div>
            <button onClick={onClose} className="btn btn-ghost btn-icon-only">
              <X size={20} />
            </button>
          </div>

          {/* Event Quick Info Banner */}
          <div style={{
            padding: '1rem 1.75rem',
            backgroundColor: 'var(--bg-surface-elevated)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <img 
              src={event.banner} 
              alt={event.title} 
              style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
            />
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                {event.title}
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Calendar size={12} color="var(--color-primary)" /> {event.date}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Clock size={12} color="var(--color-primary)" /> {event.startTime} - {event.endTime}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <MapPin size={12} color="var(--color-primary)" /> {event.venueName}
                </span>
              </div>
            </div>
          </div>

          {/* Error notice */}
          {errorMsg && (
            <div style={{
              margin: '1rem 1.75rem 0',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-danger-light)',
              color: 'var(--color-danger)',
              fontSize: '0.8125rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* External Platform Handler */}
          {isExternal ? (
            <div className="modal-body" style={{ textAlign: 'center', padding: '2rem 1.75rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem'
              }}>
                <ExternalLink size={26} />
              </div>

              <h4 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                External Registration Portal
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
                The organizer (<strong>{event.clubName}</strong>) is hosting official registration on an external platform (Unstop / Devfolio).
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', maxWidth: '360px', margin: '0 auto' }}>
                <a
                  href={event.externalUrl || "https://unstop.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setExternalClicked(true)}
                  className="btn btn-primary"
                  style={{ gap: '0.5rem' }}
                >
                  <span>Open Registration on External Portal</span>
                  <ExternalLink size={16} />
                </a>

                {externalClicked && (
                  <button
                    onClick={() => handleSubmit(null, false)}
                    className="btn btn-secondary"
                    style={{ borderColor: 'var(--color-success)', color: 'var(--color-success)' }}
                  >
                    <Check size={16} />
                    <span>I have submitted my application (Add to SRM Pulse)</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Internal Registration Form */
            <form onSubmit={(e) => handleSubmit(e, false)}>
              <div className="modal-body" style={{ maxHeight: '55vh', overflowY: 'auto' }}>
                <div style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: 'var(--color-primary-light)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.25rem',
                  fontSize: '0.8125rem',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Sparkles size={16} />
                  <span>SRM SSO auto-fill applied for <strong>{currentUser.name}</strong></span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      name="fullName" 
                      value={formData.fullName} 
                      onChange={handleChange} 
                      className="form-input" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Registration Number</label>
                    <input 
                      type="text" 
                      name="regNumber" 
                      value={formData.regNumber} 
                      onChange={handleChange} 
                      className="form-input font-mono" 
                      required 
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">SRM Email</label>
                    <input 
                      type="email" 
                      name="srmEmail" 
                      value={formData.srmEmail} 
                      onChange={handleChange} 
                      className="form-input" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      className="form-input" 
                      required 
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Department</label>
                    <select 
                      name="department" 
                      value={formData.department} 
                      onChange={handleChange} 
                      className="form-select"
                    >
                      <option value="Computer Science & Engineering">CSE (Core)</option>
                      <option value="Computing Technologies (CINTEL)">CINTEL / AI & DS</option>
                      <option value="Data Science & Business Systems">DSBS</option>
                      <option value="Information Technology">IT</option>
                      <option value="Electronics & Communication (ECE)">ECE</option>
                      <option value="Mechanical Engineering">Mechanical</option>
                      <option value="Biotechnology">Biotechnology</option>
                      <option value="School of Management">Management / MBA</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Year of Study</label>
                    <select 
                      name="year" 
                      value={formData.year} 
                      onChange={handleChange} 
                      className="form-select"
                    >
                      <option value="1st Year">1st Year (Freshman)</option>
                      <option value="2nd Year">2nd Year (Sophomore)</option>
                      <option value="3rd Year">3rd Year (Junior)</option>
                      <option value="4th Year">4th Year (Senior)</option>
                    </select>
                  </div>
                </div>

                {/* Team Fields for Hackathons */}
                {event.category === 'hackathon' && (
                  <div style={{
                    marginTop: '0.5rem',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Users size={15} />
                      <span>Hackathon Team Details</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label">Team Name</label>
                        <input 
                          type="text" 
                          name="teamName" 
                          placeholder="e.g. CyberKnights" 
                          value={formData.teamName} 
                          onChange={handleChange} 
                          className="form-input" 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Team Size</label>
                        <select 
                          name="teamSize" 
                          value={formData.teamSize} 
                          onChange={handleChange} 
                          className="form-select"
                        >
                          <option value="2">2 Members</option>
                          <option value="3">3 Members</option>
                          <option value="4">4 Members</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Teammates (Name & Reg No)</label>
                      <input 
                        type="text" 
                        name="teamMembers" 
                        placeholder="e.g. Rahul Sen (RA2211003010111), Sneha (RA2211003010115)" 
                        value={formData.teamMembers} 
                        onChange={handleChange} 
                        className="form-input" 
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={isFull ? "btn btn-secondary btn-sm" : "btn btn-primary btn-sm"}
                  style={isFull ? { borderColor: 'var(--color-warning)', color: 'var(--color-warning)' } : {}}
                >
                  {isFull ? 'Confirm Join Waitlist' : 'Confirm Free Registration ✓'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Overlapping Conflict Alert */}
      {conflictData && (
        <ConflictWarningModal
          conflictingEvent={conflictData}
          targetEvent={event}
          onCancel={() => setConflictData(null)}
          onProceedAnyway={() => {
            setConflictData(null);
            handleSubmit(null, true); // Force bypass conflict
          }}
        />
      )}
    </>
  );
};
