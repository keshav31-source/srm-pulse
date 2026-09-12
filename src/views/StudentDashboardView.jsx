import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EventCard } from '../components/events/EventCard';
import { GoogleLogo } from '../components/common/GoogleLogo';
import { 
  Sparkles, 
  Ticket, 
  Bookmark, 
  Clock, 
  Users, 
  Award, 
  CheckCircle, 
  SlidersHorizontal, 
  Download, 
  ArrowRight,
  ShieldCheck,
  Calendar,
  Eye,
  Trash2,
  ExternalLink
} from 'lucide-react';

export const StudentDashboardView = ({ onRegisterClick, onShareClick, onViewPassClick }) => {
  const { 
    currentUser, 
    events, 
    clubs, 
    registrations, 
    savedEventIds, 
    certificates, 
    interestTags, 
    updateUserInterests,
    cancelRegistration,
    navigateTo 
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'tickets' | 'saved' | 'achievements'
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState(currentUser.interests);
  const [selectedCert, setSelectedCert] = useState(null);

  // Registered events
  const userConfirmedRegs = registrations.filter(r => r.status === 'CONFIRMED' || r.status === 'ATTENDED');
  const userWaitlistRegs = registrations.filter(r => r.status === 'WAITLISTED');

  const registeredEvents = events.filter(e => 
    userConfirmedRegs.some(r => r.eventId === e.id)
  );

  const savedEvents = events.filter(e => savedEventIds.includes(e.id));

  // Personalized Recommended Events (matching student interests)
  const recommendedEvents = events.filter(e => {
    if (registeredEvents.some(re => re.id === e.id)) return false;
    if (e.status === 'completed' || e.status === 'rejected') return false;
    return e.tags && e.tags.some(tag => currentUser.interests.includes(tag));
  }).slice(0, 3);

  // Followed clubs
  const followedClubs = clubs.filter(c => currentUser.followedClubIds.includes(c.id));

  // Handle saving interests
  const handleSaveInterests = () => {
    updateUserInterests(selectedInterests);
    setShowInterestModal(false);
  };

  const toggleInterestTag = (tag) => {
    if (selectedInterests.includes(tag)) {
      setSelectedInterests(prev => prev.filter(t => t !== tag));
    } else {
      setSelectedInterests(prev => [...prev, tag]);
    }
  };

  return (
    <div className="container" style={{ paddingBottom: '4rem' }}>
      {/* Student Welcome Header Card */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {/* Sleek initials avatar badge (NO user photo) */}
            <div style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
              border: '3px solid rgba(59,130,246,0.5)',
              boxShadow: '0 8px 24px rgba(37, 99, 235, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '1.75rem',
              letterSpacing: '1px',
              flexShrink: 0
            }}>
              {currentUser.name ? currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'SR'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
                <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Good Day, {currentUser.name.split(' ')[0]} 👋
                </h1>
                <span className="badge badge-primary" style={{ fontSize: '0.6875rem' }}>
                  Student
                </span>
                {(currentUser.authProvider === 'GOOGLE' || currentUser.isGoogleVerified) && (
                  <span className="badge" style={{
                    fontSize: '0.6875rem',
                    backgroundColor: 'rgba(66, 133, 244, 0.12)',
                    color: '#4285F4',
                    border: '1px solid rgba(66, 133, 244, 0.3)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontWeight: 700
                  }}>
                    <GoogleLogo size={12} />
                    Google Verified
                  </span>
                )}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {currentUser.regNumber} • {currentUser.year} • {currentUser.department}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                SRM Institute of Science and Technology, Kattankulathur
              </div>
            </div>
          </div>

          {/* Quick Portfolio Stats */}
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{
              padding: '0.75rem 1.25rem',
              backgroundColor: 'var(--bg-surface-elevated)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                {userConfirmedRegs.length}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Registered Passes</div>
            </div>
            <div style={{
              padding: '0.75rem 1.25rem',
              backgroundColor: 'var(--bg-surface-elevated)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-success)' }}>
                {certificates.length}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Certificates Earned</div>
            </div>
            <div style={{
              padding: '0.75rem 1.25rem',
              backgroundColor: 'var(--bg-surface-elevated)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-purple)' }}>
                {savedEventIds.length}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Saved Events</div>
            </div>
          </div>
        </div>

        {/* Interests Bar & Personalization Trigger */}
        <div style={{
          marginTop: '1.5rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', marginRight: '4px' }}>
              Your Interests:
            </span>
            {currentUser.interests.map(t => (
              <span
                key={t}
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '3px 9px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  border: '1px solid rgba(59, 130, 246, 0.3)'
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <button
            onClick={() => setShowInterestModal(true)}
            className="btn btn-secondary btn-sm"
            style={{ gap: '0.35rem' }}
          >
            <SlidersHorizontal size={14} />
            <span>Customize Feed Interests</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '0.5rem',
        marginBottom: '2rem',
        overflowX: 'auto'
      }}>
        <button
          onClick={() => setActiveTab('overview')}
          className="btn btn-sm"
          style={{
            backgroundColor: activeTab === 'overview' ? 'var(--color-primary-light)' : 'transparent',
            color: activeTab === 'overview' ? 'var(--color-primary)' : 'var(--text-secondary)',
            fontWeight: activeTab === 'overview' ? 700 : 500
          }}
        >
          Personalized Feed
        </button>
        <button
          onClick={() => setActiveTab('tickets')}
          className="btn btn-sm"
          style={{
            backgroundColor: activeTab === 'tickets' ? 'var(--color-primary-light)' : 'transparent',
            color: activeTab === 'tickets' ? 'var(--color-primary)' : 'var(--text-secondary)',
            fontWeight: activeTab === 'tickets' ? 700 : 500
          }}
        >
          My Passes & Registrations ({userConfirmedRegs.length})
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className="btn btn-sm"
          style={{
            backgroundColor: activeTab === 'saved' ? 'var(--color-primary-light)' : 'transparent',
            color: activeTab === 'saved' ? 'var(--color-primary)' : 'var(--text-secondary)',
            fontWeight: activeTab === 'saved' ? 700 : 500
          }}
        >
          Bookmarked ({savedEvents.length})
        </button>
        <button
          onClick={() => setActiveTab('achievements')}
          className="btn btn-sm"
          style={{
            backgroundColor: activeTab === 'achievements' ? 'var(--color-primary-light)' : 'transparent',
            color: activeTab === 'achievements' ? 'var(--color-primary)' : 'var(--text-secondary)',
            fontWeight: activeTab === 'achievements' ? 700 : 500
          }}
        >
          Campus Portfolio & Certificates ({certificates.length})
        </button>
      </div>

      {/* TAB 1: OVERVIEW / PERSONALIZED FEED */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {/* Section: Recommended for You */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={20} color="var(--color-primary)" />
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Recommended Based on Your Interests
                </h2>
              </div>
              <button onClick={() => navigateTo('explore')} className="btn btn-ghost btn-sm" style={{ color: 'var(--color-primary)' }}>
                Explore more
              </button>
            </div>

            <div className="grid-responsive">
              {recommendedEvents.map(evt => (
                <EventCard
                  key={evt.id}
                  event={evt}
                  onRegisterClick={onRegisterClick}
                  onShareClick={onShareClick}
                />
              ))}
            </div>
          </div>

          {/* Section: Followed Clubs Updates */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Clubs You Follow ({followedClubs.length})
              </h2>
              <button onClick={() => navigateTo('clubs')} className="btn btn-ghost btn-sm" style={{ color: 'var(--color-primary)' }}>
                Browse all clubs
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              {followedClubs.map(club => (
                <div
                  key={club.id}
                  onClick={() => navigateTo('club-detail', { clubId: club.id })}
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.875rem'
                  }}
                >
                  <img src={club.logo} alt={club.name} style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {club.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {club.followerCount.toLocaleString()} Followers
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MY PASSES & ACTIVE TICKETS */}
      {activeTab === 'tickets' && (
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
            Confirmed Event Passes
          </h2>

          {userConfirmedRegs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-xl)' }}>
              <Ticket size={36} color="var(--text-muted)" style={{ margin: '0 auto 0.75rem' }} />
              <p style={{ fontWeight: 600 }}>You haven't registered for any opportunities yet.</p>
              <button onClick={() => navigateTo('explore')} className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }}>
                Discover Events
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px' }}>
              {userConfirmedRegs.map(reg => {
                const evt = events.find(e => e.id === reg.eventId);
                if (!evt) return null;

                return (
                  <div
                    key={reg.id}
                    style={{
                      padding: '1.25rem 1.5rem',
                      borderRadius: 'var(--radius-xl)',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-medium)',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1.25rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img
                        src={evt.banner}
                        alt={evt.title}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&auto=format&fit=crop&q=80';
                        }}
                        style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '2px' }}>
                          <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
                            {reg.status === 'ATTENDED' ? 'Attended ✓' : 'Confirmed Pass'}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Pass: <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}>{reg.ticketCode}</strong>
                          </span>
                        </div>
                        <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '3px' }}>
                          {evt.title}
                        </h3>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          📅 {evt.date} ({evt.startTime}) • 📍 {evt.venueName} ({evt.room})
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        onClick={() => onViewPassClick && onViewPassClick(reg, evt)}
                        className="btn btn-primary btn-sm"
                        style={{ gap: '0.35rem' }}
                      >
                        <Ticket size={14} />
                        <span>View Pass & QR</span>
                      </button>
                      <button
                        onClick={() => cancelRegistration(evt.id)}
                        className="btn btn-ghost btn-sm"
                        style={{ color: 'var(--color-danger)' }}
                        title="Cancel registration"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: BOOKMARKED / SAVED */}
      {activeTab === 'saved' && (
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
            Bookmarked Opportunities ({savedEvents.length})
          </h2>
          {savedEvents.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-xl)' }}>
              <Bookmark size={36} color="var(--text-muted)" style={{ margin: '0 auto 0.75rem' }} />
              <p style={{ fontWeight: 600 }}>No saved opportunities yet.</p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Click the bookmark icon on any card to save it for later.</p>
            </div>
          ) : (
            <div className="grid-responsive">
              {savedEvents.map(evt => (
                <EventCard
                  key={evt.id}
                  event={evt}
                  onRegisterClick={onRegisterClick}
                  onShareClick={onShareClick}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: ACHIEVEMENTS PORTFOLIO & CERTIFICATES */}
      {activeTab === 'achievements' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '2px' }}>
                Verified Campus Achievements
              </h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                Official credentials awarded for attended hackathons, bootcamps, and competitions.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {certificates.map(cert => (
              <div
                key={cert.id}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1.5px solid var(--border-medium)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
                      <ShieldCheck size={13} /> VERIFIED CREDENTIAL
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cert.issueDate}</span>
                  </div>

                  <h3 style={{ fontSize: '1.0625rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {cert.eventName}
                  </h3>

                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '0.75rem' }}>
                    Issued by {cert.issuedBy}
                  </div>

                  <div style={{
                    padding: '0.625rem 0.75rem',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderRadius: 'var(--radius-md)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '1rem'
                  }}>
                    ID: {cert.credentialId}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1, gap: '0.35rem' }}
                  >
                    <Award size={14} />
                    <span>View & Print Certificate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interest Customization Modal */}
      {showInterestModal && (
        <div className="modal-overlay" onClick={() => setShowInterestModal(false)}>
          <div className="modal-content" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Personalize Your Campus Feed</h3>
              <button onClick={() => setShowInterestModal(false)} className="btn btn-ghost btn-icon-only">✕</button>
            </div>

            <div className="modal-body">
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Select topics you want to prioritize in your discovery feed and alert recommendations:
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {interestTags.map(tag => {
                  const isSelected = selectedInterests.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleInterestTag(tag)}
                      className="btn btn-sm"
                      style={{
                        backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--bg-surface-elevated)',
                        color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                        border: '1px solid',
                        borderColor: isSelected ? 'var(--color-primary)' : 'var(--border-subtle)',
                        borderRadius: 'var(--radius-full)'
                      }}
                    >
                      {isSelected && <Check size={12} />}
                      <span>{tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setShowInterestModal(false)} className="btn btn-secondary btn-sm">
                Cancel
              </button>
              <button onClick={handleSaveInterests} className="btn btn-primary btn-sm">
                Save & Update Feed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Viewer Modal */}
      {selectedCert && (
        <div className="modal-overlay" onClick={() => setSelectedCert(null)}>
          <div className="modal-content" style={{ maxWidth: '600px', padding: 0, overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
            <div style={{
              backgroundColor: '#FFFFFF',
              color: '#0F172A',
              padding: '2.5rem',
              textAlign: 'center',
              border: '6px double #2563EB',
              position: 'relative'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>
                SRM UNIVERSITY • CAMPUS CREDENTIAL
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.25rem' }}>
                Certificate of Completion
              </h2>
              <div style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '1.5rem' }}>
                This is officially certified and awarded to
              </div>

              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1E40AF', textDecoration: 'underline', marginBottom: '0.5rem' }}>
                {selectedCert.studentName}
              </div>
              <div style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: '#475569', marginBottom: '1.5rem' }}>
                Registration No: {selectedCert.regNumber}
              </div>

              <div style={{ fontSize: '0.9375rem', color: '#334155', lineHeight: 1.5, marginBottom: '2rem', maxWidth: '440px', margin: '0 auto 2rem' }}>
                For successful participation and attendance in <br />
                <strong>"{selectedCert.eventName}"</strong> organized by <strong>{selectedCert.issuedBy}</strong>.
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '1rem', fontSize: '0.75rem', color: '#64748B' }}>
                <div>Credential ID: {selectedCert.credentialId}</div>
                <div>Issued: {selectedCert.issueDate}</div>
              </div>
            </div>

            <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
              <button onClick={() => setSelectedCert(null)} className="btn btn-secondary btn-sm">
                Close
              </button>
              <button onClick={() => window.print()} className="btn btn-primary btn-sm" style={{ gap: '0.4rem' }}>
                <Download size={15} />
                <span>Print / Save as PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
