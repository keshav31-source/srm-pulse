import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Award,
  Globe,
  Upload
} from 'lucide-react';

export const CreateEventModal = ({ onClose }) => {
  const { categories, buildings, clubs, createEvent, currentUser, organizerActiveClubId } = useApp();

  const defaultClub = clubs.find(c => c.id === organizerActiveClubId) || clubs[0];

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    title: '',
    clubId: defaultClub?.id || 'srm-coding-club',
    clubName: defaultClub?.name || 'SRM Coding Club',
    category: 'hackathon',
    banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80',
    shortDescription: '',
    description: '',
    date: '2026-09-25',
    startTime: '10:00',
    endTime: '17:00',
    registrationDeadline: '2026-09-24T23:59:00',
    buildingId: 'tp',
    venueName: 'Tech Park (TP)',
    room: 'TP 204 Seminar Hall',
    format: 'In-person',
    eligibility: 'Open to All SRM Students',
    cost: 'Free',
    capacity: 100,
    registrationType: 'internal',
    externalUrl: '',
    prizes: '₹50,000 Total Prize Pool + Certificates',
    hasCertificate: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleClubChange = (e) => {
    const selectedClub = clubs.find(c => c.id === e.target.value);
    setFormData(prev => ({
      ...prev,
      clubId: e.target.value,
      clubName: selectedClub ? selectedClub.name : prev.clubName
    }));
  };

  const handleBuildingChange = (e) => {
    const selectedB = buildings.find(b => b.id === e.target.value);
    setFormData(prev => ({
      ...prev,
      buildingId: e.target.value,
      venueName: selectedB ? selectedB.name : prev.venueName
    }));
  };

  const handleNext = () => setStep(prev => Math.min(3, prev + 1));
  const handlePrev = () => setStep(prev => Math.max(1, prev - 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    createEvent(formData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 10001 }}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '640px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <span className="badge badge-primary" style={{ fontSize: '0.6875rem', marginBottom: '2px' }}>
              Step {step} of 3
            </span>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {step === 1 && 'Basic Event Details'}
              {step === 2 && 'Date, Schedule & Venue'}
              {step === 3 && 'Eligibility & Registration Setup'}
            </h3>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-icon-only">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            {/* STEP 1: Basic Information */}
            {step === 1 && (
              <div>
                <div className="form-group">
                  <label className="form-label">Event Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g. SRM Autonomous Robotics Hackathon 2026"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Host Club / Organization</label>
                    <select
                      name="clubId"
                      value={formData.clubId}
                      onChange={handleClubChange}
                      className="form-select"
                    >
                      {clubs.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="form-select"
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Banner Image URL</label>
                  <input
                    type="url"
                    name="banner"
                    value={formData.banner}
                    onChange={handleChange}
                    className="form-input font-mono"
                    style={{ fontSize: '0.8125rem' }}
                    required
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Paste an image URL or use our curated preset banner.
                  </span>
                </div>

                <div className="form-group">
                  <label className="form-label">Short Tagline / Teaser</label>
                  <input
                    type="text"
                    name="shortDescription"
                    placeholder="Brief 1-sentence teaser for campus feeds..."
                    value={formData.shortDescription}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Full Description & Agenda</label>
                  <textarea
                    name="description"
                    placeholder="Describe what students will learn, problem statements, and requirements..."
                    value={formData.description}
                    onChange={handleChange}
                    className="form-textarea"
                    rows={4}
                    required
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Date, Schedule & Venue */}
            {step === 2 && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Event Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Event Format</label>
                    <select
                      name="format"
                      value={formData.format}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="In-person">In-person (Physical)</option>
                      <option value="Hybrid">Hybrid (Campus + Stream)</option>
                      <option value="Online">Online / Virtual</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Start Time</label>
                    <input
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">End Time</label>
                    <input
                      type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Campus Building / Block</label>
                    <select
                      name="buildingId"
                      value={formData.buildingId}
                      onChange={handleBuildingChange}
                      className="form-select"
                    >
                      {buildings.map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Room / Hall Specifics</label>
                    <input
                      type="text"
                      name="room"
                      placeholder="e.g. TP 204 Seminar Hall or UB 402"
                      value={formData.room}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Registration Deadline</label>
                  <input
                    type="datetime-local"
                    name="registrationDeadline"
                    value={formData.registrationDeadline.slice(0, 16)}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Eligibility & Registration */}
            {step === 3 && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Maximum Seat Capacity</label>
                    <input
                      type="number"
                      name="capacity"
                      min="10"
                      max="5000"
                      value={formData.capacity}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Cost / Pricing</label>
                    <select
                      name="cost"
                      value={formData.cost}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="Free">Free (Standard)</option>
                      <option value="₹100 Entry">₹100 Entry Fee</option>
                      <option value="₹250 Entry">₹250 Entry Fee</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Student Eligibility Criteria</label>
                  <input
                    type="text"
                    name="eligibility"
                    placeholder="e.g. Open to All SRM Students (1st-4th Year)"
                    value={formData.eligibility}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Registration Platform Type</label>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                      <input
                        type="radio"
                        name="registrationType"
                        value="internal"
                        checked={formData.registrationType === 'internal'}
                        onChange={handleChange}
                        style={{ accentColor: 'var(--color-primary)' }}
                      />
                      <span>Internal Smart Registration (Recommended)</span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                      <input
                        type="radio"
                        name="registrationType"
                        value="external"
                        checked={formData.registrationType === 'external'}
                        onChange={handleChange}
                        style={{ accentColor: 'var(--color-primary)' }}
                      />
                      <span>External URL (Devfolio / Unstop / Google Form)</span>
                    </label>
                  </div>
                </div>

                {formData.registrationType === 'external' && (
                  <div className="form-group">
                    <label className="form-label">External Registration URL</label>
                    <input
                      type="url"
                      name="externalUrl"
                      placeholder="https://unstop.com/competitions/..."
                      value={formData.externalUrl}
                      onChange={handleChange}
                      className="form-input font-mono"
                    />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Prizes & Incentives</label>
                  <input
                    type="text"
                    name="prizes"
                    placeholder="e.g. ₹50,000 Cash Prize + Fast-track Interviews"
                    value={formData.prizes}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                  <input
                    type="checkbox"
                    name="hasCertificate"
                    checked={formData.hasCertificate}
                    onChange={handleChange}
                    style={{ accentColor: 'var(--color-primary)' }}
                  />
                  <span>Issue Verified Digital Certificate on SRM Pulse Upon Attendance</span>
                </label>
              </div>
            )}
          </div>

          {/* Footer Navigation */}
          <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
            {step > 1 ? (
              <button type="button" onClick={handlePrev} className="btn btn-secondary btn-sm" style={{ gap: '0.35rem' }}>
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>
            ) : (
              <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">
                Cancel
              </button>
            )}

            {step < 3 ? (
              <button type="button" onClick={handleNext} className="btn btn-primary btn-sm" style={{ gap: '0.35rem' }}>
                <span>Continue</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <button type="submit" className="btn btn-primary btn-sm" style={{ gap: '0.35rem' }}>
                <Check size={14} />
                <span>{currentUser.role === 'PLATFORM_ADMIN' ? 'Publish Event Directly' : 'Submit for Admin Approval'}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
