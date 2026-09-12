import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { EventCard } from '../components/events/EventCard';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  Flame, 
  Clock, 
  Radio, 
  ShieldCheck, 
  Users, 
  Calendar, 
  CheckCircle, 
  ChevronRight,
  MapPin
} from 'lucide-react';

export const LandingView = ({ onRegisterClick, onShareClick }) => {
  const { 
    events, 
    clubs, 
    categories, 
    navigateTo, 
    searchQuery, 
    setSearchQuery,
    setQuickSearchOpen 
  } = useApp();

  const [localSearch, setLocalSearch] = useState('');

  // Live countdown timer calculation for closing soon
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (localSearch.trim()) {
      navigateTo('explore', { search: localSearch.trim() });
    } else {
      navigateTo('explore');
    }
  };

  // Sections Data
  const happeningNowEvents = events.filter(e => e.status === 'happening_now');
  const happeningTodayEvents = events.filter(e => e.date === '2026-09-12' && e.status !== 'rejected');
  const trendingEvents = [...events].sort((a, b) => (b.viewsCount + b.savesCount * 2) - (a.viewsCount + a.savesCount * 2)).slice(0, 3);
  const closingSoonEvents = events.filter(e => e.status === 'closing_soon' || e.registeredCount >= e.capacity - 10).slice(0, 3);
  const upcomingEvents = events.filter(e => e.status === 'published' && e.date > '2026-09-12').slice(0, 6);
  const featuredClubs = clubs.slice(0, 4);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', paddingBottom: '4rem' }}>
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section style={{
        position: 'relative',
        padding: '5rem 0 3.5rem',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37, 99, 235, 0.22), transparent)'
      }}>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          {/* SRM Pill badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <span className="badge badge-primary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8125rem' }}>
              <Sparkles size={14} /> Official Campus Platform
            </span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              SRM University • Kattankulathur
            </span>
          </div>

          {/* Main Title */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.035em',
            marginBottom: '1.25rem',
            color: 'var(--text-primary)'
          }}>
            Never Miss an Opportunity <br className="desktop-inline-block" />
            at <span className="text-gradient-blue">SRM University.</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--text-secondary)',
            maxWidth: '740px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6
          }}>
            Discover hackathons, workshops, competitions, club events, seminars and everything happening across campus — all in one centralized student hub.
          </p>

          {/* Search & Actions Bar */}
          <div style={{
            maxWidth: '620px',
            margin: '0 auto 2.5rem',
            backgroundColor: 'var(--bg-card-subtle)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-xl)',
            padding: '0.5rem',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <form onSubmit={handleHeroSearch} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ paddingLeft: '1rem', display: 'flex', alignItems: 'center', color: 'var(--text-muted)' }}>
                <Search size={20} color="var(--color-primary)" />
              </div>
              <input
                type="text"
                placeholder="Search by topic, club, or venue (e.g. AI, HackMatrix, Tech Park)..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.9375rem',
                  color: 'var(--text-primary)'
                }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
                <span>Search</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>

          {/* Primary & Secondary CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <button 
              onClick={() => navigateTo('explore')} 
              className="btn btn-primary btn-lg"
              style={{ gap: '0.5rem' }}
            >
              <span>Explore All Opportunities</span>
              <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => navigateTo('organizer-dashboard')} 
              className="btn btn-secondary btn-lg"
              style={{ gap: '0.5rem' }}
            >
              <span>List an Event (For Clubs)</span>
            </button>
          </div>

          {/* Live Campus Pulse Metric Counters */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1.5rem',
            maxWidth: '850px',
            margin: '3.5rem auto 0',
            padding: '1.5rem',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>40+</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Active Opportunities</div>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary)' }}>18</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Verified Clubs</div>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-success)' }}>12,400+</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Student Registrations</div>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-purple)' }}>₹8.5L+</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Hackathon Prizes</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: 🔴 HAPPENING RIGHT NOW & HAPPENING TODAY
          ========================================================================= */}
      {happeningNowEvents.length > 0 && (
        <section className="container">
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.05)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.75rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              marginBottom: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className="badge badge-live" style={{ fontSize: '0.75rem' }}>
                  <span className="pulse-dot" /> LIVE ON CAMPUS
                </span>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Happening Right Now
                </h2>
              </div>
              <button
                onClick={() => navigateTo('happening-now')}
                className="btn btn-ghost btn-sm"
                style={{ color: '#EF4444', gap: '0.35rem' }}
              >
                <span>View Live Feed</span>
                <ChevronRight size={16} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {happeningNowEvents.map(evt => (
                <div
                  key={evt.id}
                  onClick={() => navigateTo('event-detail', { eventId: evt.id })}
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.25rem',
                    border: '1px solid var(--border-medium)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span className="badge badge-primary" style={{ fontSize: '0.6875rem' }}>{evt.clubName}</span>
                      <span style={{ fontSize: '0.75rem', color: '#EF4444', fontWeight: 700 }}>
                        {evt.startTime} - {evt.endTime}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                      {evt.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      <MapPin size={14} color="var(--color-primary)" />
                      <span>{evt.venueName} • {evt.room}</span>
                    </div>
                  </div>

                  {evt.currentScheduleStep && (
                    <div style={{
                      padding: '0.625rem 0.875rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(239, 68, 68, 0.08)',
                      borderLeft: '3px solid #EF4444',
                      fontSize: '0.75rem',
                      color: 'var(--text-primary)'
                    }}>
                      <span style={{ fontWeight: 700, color: '#EF4444' }}>Current Session: </span>
                      {evt.currentScheduleStep}
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {evt.registeredCount} Students Checked in
                    </span>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      Walk-in & Directions <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 2: TRENDING ON CAMPUS & CLOSING SOON (SIDE BY SIDE / CARDS)
          ========================================================================= */}
      <section className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
          gap: '2rem'
        }} className="landing-split-grid">
          {/* Left: Trending on Campus */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Flame size={20} color="#F59E0B" />
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Trending on Campus
                </h2>
              </div>
              <button 
                onClick={() => navigateTo('explore')} 
                className="btn btn-ghost btn-sm"
                style={{ color: 'var(--color-primary)' }}
              >
                View all
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {trendingEvents.map((evt, idx) => (
                <div
                  key={evt.id}
                  onClick={() => navigateTo('event-detail', { eventId: evt.id })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.875rem 1rem',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    cursor: 'pointer',
                    transition: 'all var(--duration-fast)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-medium)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: idx === 0 ? '#F59E0B' : 'var(--text-muted)',
                    width: '24px',
                    textAlign: 'center'
                  }}>
                    #{idx + 1}
                  </div>
                  <img
                    src={evt.banner}
                    alt={evt.title}
                    style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '2px' }}>
                      <span className="badge badge-primary" style={{ fontSize: '0.625rem', padding: '1px 5px' }}>{evt.category}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{evt.clubName}</span>
                    </div>
                    <div style={{
                      fontWeight: 700,
                      fontSize: '0.9375rem',
                      color: 'var(--text-primary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {evt.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      📅 {evt.date} • 📍 {evt.venueName}
                    </div>
                  </div>
                  <ChevronRight size={16} color="var(--text-muted)" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Closing Soon with Live Countdown */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={20} color="#EF4444" />
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Closing Soon
                </h2>
              </div>
              <span className="badge badge-warning" style={{ fontFamily: 'var(--font-mono)' }}>
                {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {closingSoonEvents.map(evt => (
                <div
                  key={evt.id}
                  onClick={() => navigateTo('event-detail', { eventId: evt.id })}
                  style={{
                    padding: '1rem',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-lg)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <span className="badge badge-warning" style={{ fontSize: '0.625rem' }}>
                      DEADLINE APPROACHING
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-danger)', fontWeight: 700 }}>
                      Closes Tonight
                    </span>
                  </div>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    {evt.title}
                  </h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>By {evt.clubName}</span>
                    <span>{evt.capacity - evt.registeredCount} spots remaining</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 860px) {
            .landing-split-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* =========================================================================
          SECTION 3: EXPLORE BY CATEGORY
          ========================================================================= */}
      <section className="container">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>Diverse Opportunities</span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Explore by Category
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
            From elite coding hackathons to high-energy cultural battles, find your passion.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '1rem'
        }}>
          {categories.map(cat => {
            const count = events.filter(e => e.category === cat.id).length;
            return (
              <div
                key={cat.id}
                onClick={() => navigateTo('explore', { search: cat.name })}
                style={{
                  padding: '1.25rem 1rem',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all var(--duration-fast)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-active)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '2rem', lineHeight: 1 }}>
                  {cat.icon}
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                  {cat.name}
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {count} {count === 1 ? 'event' : 'events'}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: UPCOMING EVENTS GRID
          ========================================================================= */}
      <section className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              Upcoming on Campus
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Mark your calendar and reserve your passes early.
            </p>
          </div>
          <button 
            onClick={() => navigateTo('explore')} 
            className="btn btn-secondary btn-sm"
            style={{ gap: '0.4rem' }}
          >
            <span>Browse All 40+ Events</span>
            <ArrowRight size={15} />
          </button>
        </div>

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
      </section>

      {/* =========================================================================
          SECTION 5: FEATURED VERIFIED CLUBS
          ========================================================================= */}
      <section className="container">
        <div style={{
          backgroundColor: 'var(--bg-surface-elevated)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '4px' }}>
                <ShieldCheck size={18} color="var(--color-primary)" />
                <span className="badge badge-primary">Official Student Bodies</span>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Featured Verified Clubs
              </h2>
            </div>
            <button 
              onClick={() => navigateTo('clubs')} 
              className="btn btn-primary btn-sm"
              style={{ gap: '0.4rem' }}
            >
              <span>Explore All Clubs</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {featuredClubs.map(club => (
              <div
                key={club.id}
                onClick={() => navigateTo('club-detail', { clubId: club.id })}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-medium)',
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'all var(--duration-fast)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-active)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-medium)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <img
                  src={club.logo}
                  alt={club.name}
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem', border: '2px solid var(--border-subtle)' }}
                />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {club.name} {club.verified && <span style={{ color: 'var(--color-primary)' }}>✓</span>}
                </h3>
                <span className="badge badge-primary" style={{ fontSize: '0.65rem', marginBottom: '0.75rem' }}>
                  {club.category}
                </span>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '1rem' }}>
                  {club.tagline}
                </p>
                <div style={{ marginTop: 'auto', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <strong>{club.followerCount.toLocaleString()}</strong> Student Followers
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
