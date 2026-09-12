import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Building2, 
  Mail, 
  User, 
  Globe, 
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';

export const RegisterClubModal = ({ isOpen, onClose }) => {
  const { registerClub, currentUser, addToast } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Technical',
    tagline: '',
    description: '',
    department: 'School of Computing',
    facultyAdvisor: '',
    advisorEmail: '',
    leadName: currentUser?.name || '',
    leadEmail: currentUser?.email || '',
    recruitmentStatus: 'Open for Core Team',
    instagram: '',
    github: '',
    discord: '',
    website: ''
  });

  const [error, setError] = useState('');

  if (!isOpen) return null;

  const categories = [
    'Technical',
    'Techno-Management',
    'Cultural',
    'Formula Student',
    'Research & Innovation',
    'Sports & Esports',
    'Social Impact & Outreach'
  ];

  const departments = [
    'School of Computing (CSE, CINTEL, DSBS, IT)',
    'School of EEE (ECE, EEE, EIE)',
    'School of Mechanical Engineering',
    'School of Bioengineering',
    'Directorate of Student Affairs (DSA)',
    'Central Student Council / Multi-Disciplinary'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Please enter your club or society name.');
      return;
    }

    if (!formData.description.trim() || formData.description.length < 20) {
      setError('Please provide a descriptive overview of the club (at least 20 characters).');
      return;
    }

    if (!formData.facultyAdvisor.trim()) {
      setError('Please provide the name of the SRM Faculty Advisor.');
      return;
    }

    registerClub(formData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 10002 }}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '640px', padding: 0, overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '1.5rem 2rem',
          backgroundColor: 'var(--bg-surface-elevated)',
          borderBottom: '1px solid var(--border-subtle)',
          position: 'relative'
        }}>
          <button 
            onClick={onClose} 
            className="btn btn-ghost btn-icon-only"
            style={{ position: 'absolute', top: '16px', right: '16px' }}
          >
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-primary">
              <Sparkles size={12} /> SRM Student Organizations
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Directorate of Student Affairs Portal
            </span>
          </div>

          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            List Your Club or Student Society 🏛️
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Register your student organization on SRM Pulse to publish hackathons, workshops, recruit members, and issue verified attendance certificates.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '1.75rem 2rem', maxHeight: '72vh', overflowY: 'auto' }}>
          {error && (
            <div style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid var(--color-danger)',
              color: 'var(--color-danger)',
              fontSize: '0.8125rem',
              marginBottom: '1.25rem'
            }}>
              {error}
            </div>
          )}

          {/* Section 1: Basic Information */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              1. Organization Identity
            </div>

            <div className="form-group">
              <label className="form-label">Club / Society Name *</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. SRM Robotics & Autonomous Systems"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-select"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Recruitment Status</label>
                <select
                  name="recruitmentStatus"
                  value={formData.recruitmentStatus}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Open for Core Team">Open for Core Team</option>
                  <option value="Recruiting Members">Recruiting Members</option>
                  <option value="Auditions Active">Auditions Active</option>
                  <option value="Closed">Recruitment Closed</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Short Tagline *</label>
              <input
                type="text"
                name="tagline"
                placeholder="e.g. Building next-generation humanoid robotics and competitive rovers."
                value={formData.tagline}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Club Description & Mission *</label>
              <textarea
                name="description"
                placeholder="Describe your organization's mission, regular workshops, hackathons, and activities at SRM..."
                value={formData.description}
                onChange={handleChange}
                className="form-textarea"
                style={{ minHeight: '90px' }}
                required
              />
            </div>
          </div>

          {/* Section 2: Affiliation & Faculty Mentor */}
          <div style={{ marginBottom: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              2. Academic Affiliation & Faculty Mentor
            </div>

            <div className="form-group">
              <label className="form-label">Department / School Affiliation *</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="form-select"
              >
                {departments.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Faculty Advisor Name *</label>
                <input
                  type="text"
                  name="facultyAdvisor"
                  placeholder="e.g. Dr. K. Meenakshi"
                  value={formData.facultyAdvisor}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Advisor SRM Email</label>
                <input
                  type="email"
                  name="advisorEmail"
                  placeholder="advisor@srmist.edu.in"
                  value={formData.advisorEmail}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Lead Contact & Socials */}
          <div style={{ marginBottom: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              3. Student Lead & Community Links
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Lead / President Name</label>
                <input
                  type="text"
                  name="leadName"
                  placeholder="Your Full Name"
                  value={formData.leadName}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Lead SRM NetID</label>
                <input
                  type="email"
                  name="leadEmail"
                  placeholder="lead@srmist.edu.in"
                  value={formData.leadEmail}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Instagram Handle</label>
                <input
                  type="text"
                  name="instagram"
                  placeholder="@srm_robotics"
                  value={formData.instagram}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Discord / WhatsApp Community</label>
                <input
                  type="text"
                  name="discord"
                  placeholder="https://discord.gg/..."
                  value={formData.discord}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">GitHub / Tech Portfolio</label>
                <input
                  type="text"
                  name="github"
                  placeholder="https://github.com/srm-robotics"
                  value={formData.github}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Website (Optional)</label>
                <input
                  type="text"
                  name="website"
                  placeholder="https://srmrobotics.club"
                  value={formData.website}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* DSA Review Notice */}
          <div style={{
            padding: '0.85rem 1rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.65rem',
            marginBottom: '1.5rem',
            fontSize: '0.8125rem',
            color: 'var(--text-secondary)'
          }}>
            <Info size={16} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Instant Organizer Access:</strong> Upon registering your club, your session will automatically unlock the <strong>Organizer Command Center</strong>, allowing you to immediately create and publish campus events for your organization.
            </div>
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ gap: '0.4rem', padding: '0.6rem 1.5rem' }}
            >
              <span>List Club & Start Publishing Events</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
