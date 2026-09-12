import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EventCard } from '../components/events/EventCard';
import { 
  ArrowLeft, 
  Check, 
  ExternalLink, 
  Users, 
  Calendar, 
  Bell, 
  Mail, 
  Globe, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const ClubDetailView = ({ clubId, onRegisterClick, onShareClick }) => {
  const { clubs, events, navigateTo, toggleFollowClub, currentUser } = useApp();

  const club = clubs.find(c => c.id === clubId) || clubs[0];
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'past' | 'announcements' | 'leads'

  if (!club) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2>Club profile not found</h2>
        <button onClick={() => navigateTo('clubs')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Clubs
        </button>
      </div>
    );
  }

  const isFollowing = currentUser.followedClubIds.includes(club.id);

  const upcomingEvents = events.filter(e => e.clubId === club.id && e.status !== 'completed' && e.status !== 'rejected');
  const pastEvents = events.filter(e => e.clubId === club.id && e.status === 'completed');

  return (
    <div className="container" style={{ paddingBottom: '4rem' }}>
      {/* Back button */}
      <button
        onClick={() => navigateTo('clubs')}
        className="btn btn-ghost btn-sm"
        style={{ gap: '0.4rem', marginBottom: '1.25rem', paddingLeft: 0 }}
      >
        <ArrowLeft size={16} />
        <span>Back to Campus Clubs</span>
      </button>

      {/* Profile Header Banner */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '2rem'
      }}>
        {/* Cover Image */}
        <div style={{ height: '220px', width: '100%', position: 'relative' }}>
          <img
            src={club.cover}
            alt={club.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(15,23,42,0.85) 100%)' }} />
        </div>

        {/* Club Profile Bar */}
        <div style={{ padding: '1.5rem 2rem', position: 'relative' }}>
          {/* Logo overlapping banner */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            left: '2rem',
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            border: '4px solid var(--bg-card)',
            backgroundColor: 'var(--bg-surface)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <img src={club.logo} alt={club.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '0.75rem', marginBottom: '1rem' }}>
            <button
              onClick={() => toggleFollowClub(club.id)}
              className={isFollowing ? "btn btn-secondary" : "btn btn-primary"}
              style={{ gap: '0.4rem', borderRadius: 'var(--radius-full)' }}
            >
              {isFollowing ? (
                <>
                  <Check size={16} color="var(--color-success)" />
                  <span>Following</span>
                </>
              ) : (
                <span>+ Follow Club</span>
              )}
            </button>

            {club.website && (
              <a
                href={club.website}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ gap: '0.4rem', borderRadius: 'var(--radius-full)' }}
              >
                <Globe size={15} />
                <span>Website</span>
                <ExternalLink size={13} />
              </a>
            )}
          </div>

          {/* Title & Tagline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {club.name}
            </h1>
            {club.verified && (
              <span className="badge badge-primary" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
                <ShieldCheck size={13} /> Verified
              </span>
            )}
          </div>

          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1rem', maxWidth: '800px', lineHeight: 1.5 }}>
            {club.tagline}
          </p>

          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '850px', lineHeight: 1.6 }}>
            {club.description}
          </p>

          {/* Socials & Meta */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            <span><strong>{club.followerCount.toLocaleString()}</strong> Student Followers</span>
            <span>Domain: <strong>{club.category}</strong></span>
            <span>Contact: <strong>{club.email}</strong></span>
            <span>Instagram: <strong>{club.instagram}</strong></span>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '0.5rem',
        marginBottom: '2rem'
      }}>
        <button
          onClick={() => setActiveTab('upcoming')}
          className="btn btn-sm"
          style={{
            backgroundColor: activeTab === 'upcoming' ? 'var(--color-primary-light)' : 'transparent',
            color: activeTab === 'upcoming' ? 'var(--color-primary)' : 'var(--text-secondary)',
            fontWeight: activeTab === 'upcoming' ? 700 : 500
          }}
        >
          Upcoming Opportunities ({upcomingEvents.length})
        </button>
        <button
          onClick={() => setActiveTab('announcements')}
          className="btn btn-sm"
          style={{
            backgroundColor: activeTab === 'announcements' ? 'var(--color-primary-light)' : 'transparent',
            color: activeTab === 'announcements' ? 'var(--color-primary)' : 'var(--text-secondary)',
            fontWeight: activeTab === 'announcements' ? 700 : 500
          }}
        >
          Announcements ({club.announcements?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className="btn btn-sm"
          style={{
            backgroundColor: activeTab === 'past' ? 'var(--color-primary-light)' : 'transparent',
            color: activeTab === 'past' ? 'var(--color-primary)' : 'var(--text-secondary)',
            fontWeight: activeTab === 'past' ? 700 : 500
          }}
        >
          Past Events ({pastEvents.length})
        </button>
        <button
          onClick={() => setActiveTab('leads')}
          className="btn btn-sm"
          style={{
            backgroundColor: activeTab === 'leads' ? 'var(--color-primary-light)' : 'transparent',
            color: activeTab === 'leads' ? 'var(--color-primary)' : 'var(--text-secondary)',
            fontWeight: activeTab === 'leads' ? 700 : 500
          }}
        >
          Core Team ({club.leads?.length || 0})
        </button>
      </div>

      {/* TAB 1: UPCOMING EVENTS */}
      {activeTab === 'upcoming' && (
        <div>
          {upcomingEvents.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-xl)' }}>
              <Calendar size={36} color="var(--text-muted)" style={{ margin: '0 auto 0.75rem' }} />
              <p style={{ fontWeight: 600 }}>No upcoming events scheduled currently.</p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Follow this club to be notified when they publish a new opportunity.</p>
            </div>
          ) : (
            <div className="grid-responsive">
              {upcomingEvents.map(evt => (
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

      {/* TAB 2: ANNOUNCEMENTS */}
      {activeTab === 'announcements' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '750px' }}>
          {!club.announcements || club.announcements.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No broadcast announcements posted yet.</p>
          ) : (
            club.announcements.map(ann => (
              <div
                key={ann.id}
                style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {ann.title}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ann.date}</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {ann.content}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: PAST EVENTS */}
      {activeTab === 'past' && (
        <div>
          {pastEvents.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No archived past events recorded.</p>
          ) : (
            <div className="grid-responsive">
              {pastEvents.map(evt => (
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

      {/* TAB 4: CORE TEAM LEADS */}
      {activeTab === 'leads' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          {club.leads?.map((lead, idx) => (
            <div
              key={idx}
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              {/* Lead Initials Avatar (No photo per guidelines) */}
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(37,99,235,0.16), rgba(124,58,237,0.2))',
                border: '1.5px solid rgba(59,130,246,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
                fontWeight: 800,
                fontSize: '1rem',
                flexShrink: 0
              }}>
                {lead.name ? lead.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'CL'}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{lead.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)', marginTop: '2px' }}>{lead.role}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
