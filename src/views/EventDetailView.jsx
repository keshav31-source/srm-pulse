import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QASection } from '../components/events/QASection';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Bookmark, 
  Share2, 
  ShieldCheck, 
  Users, 
  ArrowLeft, 
  Check, 
  Award, 
  ExternalLink, 
  Radio, 
  Download, 
  AlertTriangle,
  Flag,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const EventDetailView = ({ 
  eventId, 
  onRegisterClick, 
  onShareClick, 
  onViewPassClick,
  onReportClick 
}) => {
  const { 
    events, 
    clubs, 
    navigateTo, 
    savedEventIds, 
    toggleBookmark, 
    registrations, 
    cancelRegistration,
    currentUser 
  } = useApp();

  const event = events.find(e => e.id === eventId) || events[0];
  const club = clubs.find(c => c.id === event?.clubId);

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'schedule' | 'speakers' | 'prizes' | 'faqs'

  if (!event) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2>Event not found</h2>
        <button onClick={() => navigateTo('explore')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Explore
        </button>
      </div>
    );
  }

  const isSaved = savedEventIds.includes(event.id);
  const userRegistration = registrations.find(
    r => r.eventId === event.id && (r.status === 'CONFIRMED' || r.status === 'WAITLISTED')
  );

  const isRegistered = userRegistration?.status === 'CONFIRMED';
  const isWaitlisted = userRegistration?.status === 'WAITLISTED';
  const isFull = event.registeredCount >= event.capacity;
  const isHappeningNow = event.status === 'happening_now';
  const isClosingSoon = event.status === 'closing_soon';

  const fillPercent = Math.min(100, Math.round((event.registeredCount / event.capacity) * 100));

  const handleDownloadICS = () => {
    const icsData = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//SRM University//SRM Pulse//EN\nBEGIN:VEVENT\nSUMMARY:${event.title}\nDESCRIPTION:${event.shortDescription || event.title}\nLOCATION:${event.venueName}, ${event.room}, SRM University KTR\nDTSTART:${event.date.replace(/-/g, '')}T${(event.startTime || '10:00').replace(':', '')}00\nDTEND:${event.date.replace(/-/g, '')}T${(event.endTime || '12:00').replace(':', '')}00\nSTATUS:CONFIRMED\nEND:VEVENT\nEND:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.title.slice(0, 18)}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container" style={{ paddingBottom: '4rem' }}>
      {/* Back Navigation & Meta */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.25rem',
        paddingTop: '1rem'
      }}>
        <button
          onClick={() => navigateTo('explore')}
          className="btn btn-ghost btn-sm"
          style={{ gap: '0.4rem', paddingLeft: 0 }}
        >
          <ArrowLeft size={16} />
          <span>Back to Opportunities</span>
        </button>

        <button
          onClick={() => onReportClick && onReportClick(event)}
          className="btn btn-ghost btn-sm"
          style={{ color: 'var(--text-muted)', gap: '0.35rem', fontSize: '0.75rem' }}
          title="Report inaccurate or inappropriate content"
        >
          <Flag size={13} />
          <span>Report Event</span>
        </button>
      </div>

      {/* Main Hero Banner Card */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '2rem'
      }}>
        {/* Banner Graphic */}
        <div style={{ position: 'relative', width: '100%', height: '320px' }}>
          <img
            src={event.banner}
            alt={event.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80';
            }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.92) 100%)'
          }} />

          {/* Top Overlays */}
          <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '0.5rem', zIndex: 2 }}>
            <span className="badge badge-primary" style={{ backdropFilter: 'blur(8px)' }}>
              {event.category}
            </span>
            {isHappeningNow && (
              <span className="badge badge-live" style={{ backdropFilter: 'blur(8px)' }}>
                <span className="pulse-dot" /> HAPPENING NOW
              </span>
            )}
            {isClosingSoon && !isHappeningNow && (
              <span className="badge badge-warning" style={{ backdropFilter: 'blur(8px)' }}>
                ⏰ CLOSING SOON
              </span>
            )}
          </div>

          {/* Bottom Overlays */}
          <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px', zIndex: 2 }}>
            <div 
              onClick={() => club && navigateTo('club-detail', { clubId: club.id })}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                marginBottom: '0.5rem',
                backgroundColor: 'rgba(15,23,42,0.7)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)'
              }}
            >
              {club?.logo && (
                <img src={club.logo} alt={club.name} style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
              )}
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#FFFFFF' }}>
                {event.clubName}
              </span>
              {event.verified && <span style={{ color: 'var(--color-primary)' }}>✓</span>}
            </div>

            <h1 style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.2,
              marginBottom: '0.5rem'
            }}>
              {event.title}
            </h1>
          </div>
        </div>

        {/* Action & Metadata Bar */}
        <div style={{
          padding: '1.5rem 2rem',
          backgroundColor: 'var(--bg-surface-elevated)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem'
        }}>
          {/* Key Metrics: Date, Time & Venue */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Calendar size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Date</div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{event.date}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Clock size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Time</div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{event.startTime} - {event.endTime}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MapPin size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Location</div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                  {event.venueName} ({event.room})
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => toggleBookmark(event.id)}
              className="btn btn-secondary"
              style={{ gap: '0.4rem' }}
            >
              <Bookmark size={16} fill={isSaved ? '#F59E0B' : 'none'} color={isSaved ? '#F59E0B' : 'currentColor'} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={() => onShareClick && onShareClick(event)}
              className="btn btn-secondary"
              style={{ gap: '0.4rem' }}
            >
              <Share2 size={16} />
              <span>Share</span>
            </button>

            {/* Main Dynamic Registration Button */}
            {isRegistered ? (
              <button
                onClick={() => onViewPassClick && onViewPassClick(userRegistration, event)}
                className="btn btn-success"
                style={{ gap: '0.4rem' }}
              >
                <Check size={16} />
                <span>Registered ✓ (View Pass)</span>
              </button>
            ) : isWaitlisted ? (
              <button
                onClick={() => onViewPassClick && onViewPassClick(userRegistration, event)}
                className="btn btn-warning"
                style={{ gap: '0.4rem' }}
              >
                <span>On Waitlist (#1)</span>
              </button>
            ) : isFull ? (
              <button
                onClick={() => onRegisterClick && onRegisterClick(event)}
                className="btn btn-secondary"
                style={{ borderColor: 'var(--color-warning)', color: 'var(--color-warning)' }}
              >
                <span>Join Waitlist</span>
              </button>
            ) : (
              <button
                onClick={() => onRegisterClick && onRegisterClick(event)}
                className="btn btn-primary"
                style={{ gap: '0.5rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
              >
                <span>Register Now (Free)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.8fr) minmax(320px, 1fr)',
        gap: '2rem',
        alignItems: 'start'
      }} className="event-detail-grid">
        {/* Left Column: Deep Content, Tabs, Speakers & Q&A */}
        <div>
          {/* Navigation Tabs */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '0.5rem',
            marginBottom: '1.5rem',
            overflowX: 'auto'
          }}>
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'schedule', label: 'Schedule Timeline' },
              { id: 'speakers', label: 'Speakers & Mentors' },
              { id: 'prizes', label: 'Prizes & Perks' },
              { id: 'faqs', label: 'FAQs' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="btn btn-sm"
                style={{
                  backgroundColor: activeTab === tab.id ? 'var(--color-primary-light)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--text-secondary)',
                  fontWeight: activeTab === tab.id ? 700 : 500
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Detailed Description */}
              <div style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-xl)',
                padding: '1.75rem'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                  About This Opportunity
                </h3>
                <div style={{
                  fontSize: '0.9375rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  whiteSpace: 'pre-line'
                }}>
                  {event.description}
                </div>
              </div>

              {/* What You'll Learn / Why Attend */}
              {event.whyAttend && event.whyAttend.length > 0 && (
                <div style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '1.75rem'
                }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Sparkles size={18} color="var(--color-primary)" />
                    <span>Why You Should Attend</span>
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {event.whyAttend.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <div style={{
                          marginTop: '3px',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--color-success-light)',
                          color: 'var(--color-success)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <Check size={12} />
                        </div>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SCHEDULE */}
          {activeTab === 'schedule' && (
            <div style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.75rem'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
                Event Timeline & Schedule
              </h3>
              {event.schedule && event.schedule.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {event.schedule.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--bg-surface-elevated)',
                        border: '1px solid var(--border-medium)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        color: 'var(--color-primary)',
                        minWidth: '100px',
                        textAlign: 'center'
                      }}>
                        {item.time}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)', paddingTop: '3px' }}>
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Detailed agenda will be announced prior to the session start.
                </p>
              )}
            </div>
          )}

          {/* TAB 3: SPEAKERS */}
          {activeTab === 'speakers' && (
            <div style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.75rem'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
                Featured Speakers, Mentors & Judges
              </h3>
              {event.speakers && event.speakers.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                  {event.speakers.map((spk, idx) => (
                    <div key={idx} style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.875rem'
                    }}>
                      {/* Initials badge instead of photos */}
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, rgba(37,99,235,0.18), rgba(124,58,237,0.22))',
                        border: '1.5px solid rgba(59,130,246,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-primary)',
                        fontWeight: 800,
                        fontSize: '1rem',
                        flexShrink: 0
                      }}>
                        {spk.name ? spk.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'SR'}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{spk.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)' }}>{spk.role}</div>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{spk.company}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Guest speakers and judges will be updated soon.
                </p>
              )}
            </div>
          )}

          {/* TAB 4: PRIZES */}
          {activeTab === 'prizes' && (
            <div style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.75rem'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={20} color="#F59E0B" />
                <span>Prizes & Participant Rewards</span>
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {event.prizes || "Certificates and special recognition for all active participants."}
              </p>
              {event.hasCertificate && (
                <div style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-primary-light)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <ShieldCheck size={24} color="var(--color-primary)" />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-primary)' }}>
                      Official Certified Opportunity
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      Attending this event grants a verified digital credential in your student portfolio.
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: FAQS */}
          {activeTab === 'faqs' && (
            <div style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.75rem'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
                Frequently Asked Questions
              </h3>
              {event.faqs && event.faqs.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {event.faqs.map((faq, idx) => (
                    <div key={idx} style={{ padding: '0.875rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface-elevated)' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                        Q: {faq.q}
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                        {faq.a}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  No specific FAQs yet. Feel free to ask below in the Community Q&A!
                </p>
              )}
            </div>
          )}

          {/* Q&A Discussions Section */}
          <QASection eventId={event.id} />
        </div>

        {/* Right Column: Venue Card, Map CTA, Eligibility & Capacity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Capacity & Registration Status Card */}
          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem'
          }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Registration Availability
            </h4>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Capacity Status:</span>
                <span style={{ fontWeight: 700, color: isFull ? 'var(--color-warning)' : 'var(--color-success)' }}>
                  {isFull ? 'Full — Waitlist Open' : `${event.capacity - event.registeredCount} spots remaining`}
                </span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: 'var(--bg-surface-elevated)',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${fillPercent}%`,
                  height: '100%',
                  backgroundColor: isFull ? 'var(--color-warning)' : 'var(--color-primary)',
                  borderRadius: 'var(--radius-full)'
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                <span>{event.registeredCount} Registered</span>
                <span>{event.capacity} Max</span>
              </div>
            </div>

            {/* Registration Deadline Alert */}
            <div style={{
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-surface-elevated)',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)',
              marginBottom: '1rem'
            }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px' }}>
                ⏰ Registration Closes:
              </div>
              <div>{new Date(event.registrationDeadline).toLocaleString()}</div>
            </div>

            {/* Eligibility */}
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              <strong>Eligibility:</strong> {event.eligibility}
            </div>

            {/* Calendar button */}
            <button
              onClick={handleDownloadICS}
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', gap: '0.4rem', justifyContent: 'center' }}
            >
              <Download size={14} />
              <span>Add to Apple / Google Calendar</span>
            </button>

            {/* Cancel Registration Option if user is registered */}
            {isRegistered && (
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                <button
                  onClick={() => cancelRegistration(event.id)}
                  className="btn btn-ghost btn-sm"
                  style={{ color: 'var(--color-danger)', fontSize: '0.75rem' }}
                >
                  Cancel my registration
                </button>
              </div>
            )}
          </div>

          {/* Campus Venue & Interactive Map Button */}
          <div style={{
            backgroundColor: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <MapPin size={18} color="var(--color-primary)" />
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Venue Location
              </h4>
            </div>

            <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>
              {event.venueName}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Room / Hall: <strong>{event.room}</strong>
            </div>

            {/* Campus Access Information (Map removed per request) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 0.85rem',
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)'
            }}>
              <Check size={15} color="var(--color-success)" />
              <span>SRM Kattankulathur Campus • In-Person Access</span>
            </div>
          </div>

          {/* Club Info Card */}
          {club && (
            <div style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <img src={club.logo} alt={club.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {club.name}
                  </h4>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {club.followerCount.toLocaleString()} Followers
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '1rem' }}>
                {club.tagline}
              </p>

              <button
                onClick={() => navigateTo('club-detail', { clubId: club.id })}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                View Club Profile & All Events
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .event-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
