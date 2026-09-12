import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, Calendar, MapPin, Users, ArrowRight, Sparkles, Tag } from 'lucide-react';

export const QuickSearchModal = () => {
  const { 
    quickSearchOpen, 
    setQuickSearchOpen, 
    events, 
    clubs, 
    navigateTo 
  } = useApp();

  const [term, setTerm] = useState('');
  const inputRef = useRef(null);

  // Keyboard shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setQuickSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape' && quickSearchOpen) {
        setQuickSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickSearchOpen, setQuickSearchOpen]);

  useEffect(() => {
    if (quickSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setTerm('');
    }
  }, [quickSearchOpen]);

  if (!quickSearchOpen) return null;

  const q = term.trim().toLowerCase();

  // Filter events
  const matchedEvents = events.filter(e => {
    if (!q) return e.status === 'published' || e.status === 'happening_now';
    return (
      e.title.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q) ||
      e.clubName.toLowerCase().includes(q) ||
      e.venueName.toLowerCase().includes(q) ||
      (e.tags && e.tags.some(t => t.toLowerCase().includes(q)))
    );
  }).slice(0, 5);

  // Filter clubs
  const matchedClubs = clubs.filter(c => {
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  }).slice(0, 3);

  const handleSelectEvent = (id) => {
    setQuickSearchOpen(false);
    navigateTo('event-detail', { eventId: id });
  };

  const handleSelectClub = (id) => {
    setQuickSearchOpen(false);
    navigateTo('club-detail', { clubId: id });
  };

  return (
    <div className="modal-overlay" onClick={() => setQuickSearchOpen(false)}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '640px', padding: 0, overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-surface)'
        }}>
          <Search size={22} color="var(--color-primary)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search events, clubs, hackathons, venues (e.g., 'AI', 'Tech Park', 'GDSC')..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '1.125rem',
              color: 'var(--text-primary)',
              fontFamily: 'inherit'
            }}
          />
          {term && (
            <button onClick={() => setTerm('')} style={{ color: 'var(--text-muted)' }}>
              <X size={18} />
            </button>
          )}
          <span style={{
            fontSize: '0.75rem',
            padding: '2px 6px',
            backgroundColor: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '4px',
            color: 'var(--text-muted)'
          }}>
            ESC
          </span>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '1rem 1.25rem' }}>
          {/* Events Section */}
          {matchedEvents.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ 
                fontSize: '0.6875rem', 
                textTransform: 'uppercase', 
                color: 'var(--text-muted)', 
                fontWeight: 700, 
                letterSpacing: '0.05em',
                marginBottom: '0.5rem'
              }}>
                Opportunities & Events
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {matchedEvents.map(evt => (
                  <div
                    key={evt.id}
                    onClick={() => handleSelectEvent(evt.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.625rem 0.875rem',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      transition: 'background var(--duration-fast)',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-surface-elevated)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                      <img 
                        src={evt.banner} 
                        alt={evt.title} 
                        style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                          {evt.title}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          <span>{evt.clubName}</span>
                          <span>•</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <Calendar size={12} /> {evt.date}
                          </span>
                          <span>•</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <MapPin size={12} /> {evt.venueName}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight size={16} color="var(--text-muted)" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Clubs Section */}
          {matchedClubs.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ 
                fontSize: '0.6875rem', 
                textTransform: 'uppercase', 
                color: 'var(--text-muted)', 
                fontWeight: 700, 
                letterSpacing: '0.05em',
                marginBottom: '0.5rem'
              }}>
                Campus Clubs & Student Bodies
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {matchedClubs.map(club => (
                  <div
                    key={club.id}
                    onClick={() => handleSelectClub(club.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.625rem 0.875rem',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      transition: 'background var(--duration-fast)',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-surface-elevated)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                      <img 
                        src={club.logo} 
                        alt={club.name} 
                        style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                          {club.name} {club.verified && <span style={{ color: 'var(--color-primary)' }}>✓</span>}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {club.tagline}
                        </div>
                      </div>
                    </div>
                    <span className="badge badge-primary" style={{ fontSize: '0.6875rem' }}>
                      {club.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {matchedEvents.length === 0 && matchedClubs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>No opportunities found for "{term}"</p>
              <p style={{ fontSize: '0.8125rem' }}>Try searching by keyword like 'AI', 'HackMatrix', 'Tech Park', or 'Workshop'.</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div style={{
          padding: '0.75rem 1.25rem',
          backgroundColor: 'var(--bg-surface-elevated)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}>
          <span>Press <strong>Enter</strong> to open, <strong>Esc</strong> to dismiss</span>
          <span>Tip: Filter anytime on the Explore page</span>
        </div>
      </div>
    </div>
  );
};
