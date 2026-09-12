import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Users, 
  Calendar, 
  BarChart3, 
  Flag, 
  Trash2, 
  ExternalLink,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';

export const AdminDashboardView = () => {
  const { 
    events, 
    clubs, 
    reports, 
    registrations, 
    categories, 
    approveEvent, 
    rejectEvent, 
    verifyClub, 
    dismissReport, 
    resolveReport, 
    navigateTo 
  } = useApp();

  const [activeTab, setActiveTab] = useState('approvals'); // 'approvals' | 'clubs' | 'reports' | 'analytics'
  const [rejectReasonModal, setRejectReasonModal] = useState(null);
  const [reasonInput, setReasonInput] = useState('');

  // Pending events
  const pendingEvents = events.filter(e => e.status === 'pending_approval');
  const pendingReports = reports.filter(r => r.status === 'pending');

  const handleConfirmReject = () => {
    if (!rejectReasonModal) return;
    rejectEvent(rejectReasonModal.id, reasonInput || 'Did not meet university guidelines.');
    setRejectReasonModal(null);
    setReasonInput('');
  };

  return (
    <div className="container" style={{ paddingBottom: '4rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span className="badge badge-danger">Directorate of Student Affairs (DSA)</span>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Office of the Dean • Prof. S. Ramachandran
          </span>
        </div>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Dean of Student Affairs Command Center ⚖️
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '680px' }}>
          Official university administration console: review and approve new student club registrations, oversee campus event publishing pipelines, grant verified credentials, and arbitrate student reports.
        </p>
      </div>

      {/* KPI Stats Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2.5rem'
      }}>
        <div style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.25rem',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Pending Approvals
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: pendingEvents.length > 0 ? 'var(--color-warning)' : 'var(--color-success)', marginTop: '4px' }}>
            {pendingEvents.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Requires admin action
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.25rem',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Active Campus Events
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '4px' }}>
            {events.filter(e => e.status !== 'rejected').length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Live on platform
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.25rem',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Registered Clubs
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-purple)', marginTop: '4px' }}>
            {clubs.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            {clubs.filter(c => c.verified).length} verified
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.25rem',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Flagged Reports
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: pendingReports.length > 0 ? 'var(--color-danger)' : 'var(--text-muted)', marginTop: '4px' }}>
            {pendingReports.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Content flags
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '0.5rem',
        marginBottom: '2rem',
        overflowX: 'auto'
      }}>
        <button
          onClick={() => setActiveTab('approvals')}
          className="btn btn-sm"
          style={{
            backgroundColor: activeTab === 'approvals' ? 'var(--color-primary-light)' : 'transparent',
            color: activeTab === 'approvals' ? 'var(--color-primary)' : 'var(--text-secondary)',
            fontWeight: activeTab === 'approvals' ? 700 : 500
          }}
        >
          Event Approvals ({pendingEvents.length})
        </button>
        <button
          onClick={() => setActiveTab('clubs')}
          className="btn btn-sm"
          style={{
            backgroundColor: activeTab === 'clubs' ? 'var(--color-primary-light)' : 'transparent',
            color: activeTab === 'clubs' ? 'var(--color-primary)' : 'var(--text-secondary)',
            fontWeight: activeTab === 'clubs' ? 700 : 500
          }}
        >
          Club Verification ({clubs.length})
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className="btn btn-sm"
          style={{
            backgroundColor: activeTab === 'reports' ? 'var(--color-primary-light)' : 'transparent',
            color: activeTab === 'reports' ? 'var(--color-primary)' : 'var(--text-secondary)',
            fontWeight: activeTab === 'reports' ? 700 : 500
          }}
        >
          Spam & Reports Queue ({pendingReports.length})
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className="btn btn-sm"
          style={{
            backgroundColor: activeTab === 'analytics' ? 'var(--color-primary-light)' : 'transparent',
            color: activeTab === 'analytics' ? 'var(--color-primary)' : 'var(--text-secondary)',
            fontWeight: activeTab === 'analytics' ? 700 : 500
          }}
        >
          Platform Analytics
        </button>
      </div>

      {/* TAB 1: EVENT APPROVALS QUEUE */}
      {activeTab === 'approvals' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Events Pending DSA Approval
            </h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Ensures authentic dates, venues, and student safety
            </span>
          </div>

          {pendingEvents.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-xl)' }}>
              <CheckCircle size={36} color="var(--color-success)" style={{ margin: '0 auto 0.75rem' }} />
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.25rem' }}>All Caught Up!</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>No unreviewed event submissions waiting in the approval queue.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {pendingEvents.map(evt => (
                <div
                  key={evt.id}
                  style={{
                    padding: '1.5rem',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-xl)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1.25rem',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', maxWidth: '650px' }}>
                    <img src={evt.banner} alt={evt.title} style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '4px' }}>
                        <span className="badge badge-primary">{evt.category}</span>
                        <span style={{ fontSize: '0.8125rem', color: 'var(--color-primary)', fontWeight: 600 }}>{evt.clubName}</span>
                      </div>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                        {evt.title}
                      </h3>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                        {evt.shortDescription || evt.description}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <span>📅 {evt.date} ({evt.startTime})</span>
                        <span>📍 {evt.venueName} • {evt.room}</span>
                        <span>Capacity: {evt.capacity} students</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.625rem' }}>
                    <button
                      onClick={() => setRejectReasonModal(evt)}
                      className="btn btn-secondary btn-sm"
                      style={{ color: 'var(--color-danger)', borderColor: 'var(--color-danger)', gap: '0.35rem' }}
                    >
                      <XCircle size={15} />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => approveEvent(evt.id)}
                      className="btn btn-primary btn-sm"
                      style={{ backgroundColor: 'var(--color-success)', borderColor: 'var(--color-success)', gap: '0.35rem' }}
                    >
                      <CheckCircle size={15} />
                      <span>Approve & Publish</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CLUB VERIFICATION MANAGEMENT */}
      {activeTab === 'clubs' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Campus Club Verification & Status
            </h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Verified clubs receive trusted badges & direct publishing rights
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {clubs.map(club => (
              <div
                key={club.id}
                style={{
                  padding: '1rem 1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src={club.logo} alt={club.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{club.name}</h3>
                      {club.verified && (
                        <span className="badge badge-primary" style={{ fontSize: '0.625rem' }}>Verified ✓</span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {club.category} • {club.department || 'SRMIST'} • Advisor: <strong>{club.facultyAdvisor || 'Faculty Mentor'}</strong> • {club.followerCount.toLocaleString()} student followers
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => verifyClub(club.id)}
                  className={club.verified ? "btn btn-secondary btn-sm" : "btn btn-primary btn-sm"}
                  style={{ gap: '0.35rem' }}
                >
                  <ShieldCheck size={14} />
                  <span>{club.verified ? 'Revoke Badge' : 'Grant Verified Badge ✓'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SPAM & REPORTS MODERATION */}
      {activeTab === 'reports' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Reported Content & Community Flags
            </h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Protecting students against fake posters & fraudulent links
            </span>
          </div>

          {pendingReports.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-xl)' }}>
              <ShieldCheck size={36} color="var(--color-success)" style={{ margin: '0 auto 0.75rem' }} />
              <p style={{ fontWeight: 600 }}>No unresolved community reports.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pendingReports.map(rep => (
                <div
                  key={rep.id}
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-xl)',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-medium)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span className="badge badge-danger">
                      <AlertTriangle size={12} /> {rep.reason}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{rep.timestamp}</span>
                  </div>

                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    Reported: "{rep.reportedTitle}"
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                    <strong>Student Note:</strong> {rep.details}
                  </p>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    Reported by: {rep.reportedBy}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button
                      onClick={() => dismissReport(rep.id)}
                      className="btn btn-secondary btn-sm"
                    >
                      Dismiss (Safe)
                    </button>
                    <button
                      onClick={() => resolveReport(rep.id, 'remove_event')}
                      className="btn btn-danger btn-sm"
                      style={{ gap: '0.35rem' }}
                    >
                      <Trash2 size={13} />
                      <span>Take Down Event</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: PLATFORM ANALYTICS */}
      {activeTab === 'analytics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.75rem',
            border: '1px solid var(--border-subtle)'
          }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart3 size={18} color="var(--color-primary)" />
              <span>Event Distribution by Category</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {categories.map(cat => {
                const count = events.filter(e => e.category === cat.id).length;
                const percentage = events.length > 0 ? ((count / events.length) * 100).toFixed(0) : 0;
                return (
                  <div key={cat.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '4px' }}>
                      <span>{cat.icon} {cat.name}</span>
                      <span style={{ fontWeight: 700 }}>{count} ({percentage}%)</span>
                    </div>
                    <div style={{ height: '6px', backgroundColor: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                      <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: cat.color || 'var(--color-primary)' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal with Reason Input */}
      {rejectReasonModal && (
        <div className="modal-overlay" onClick={() => setRejectReasonModal(null)}>
          <div className="modal-content" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--color-danger)' }}>
                Reject Event Submission
              </h3>
              <button onClick={() => setRejectReasonModal(null)} className="btn btn-ghost btn-icon-only">✕</button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Please provide feedback for <strong>{rejectReasonModal.clubName}</strong> so they can revise:
              </p>
              <textarea
                value={reasonInput}
                onChange={(e) => setReasonInput(e.target.value)}
                placeholder="e.g. Venue permission required from Dean office, or adjust time overlap..."
                className="form-textarea"
                rows={3}
                required
              />
            </div>
            <div className="modal-footer">
              <button onClick={() => setRejectReasonModal(null)} className="btn btn-secondary btn-sm">
                Cancel
              </button>
              <button onClick={handleConfirmReject} className="btn btn-danger btn-sm">
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
