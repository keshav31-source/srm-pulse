import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, ShieldCheck, Users, ExternalLink, ArrowRight, Check, PlusCircle, Building2 } from 'lucide-react';

export const ClubsView = () => {
  const { clubs, navigateTo, toggleFollowClub, currentUser, openRegisterClubModal } = useApp();

  const [term, setTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredClubs = clubs.filter(club => {
    if (selectedCategory !== 'all' && club.category !== selectedCategory) return false;
    if (term.trim()) {
      const q = term.toLowerCase();
      return (
        club.name.toLowerCase().includes(q) ||
        club.description.toLowerCase().includes(q) ||
        club.tagline.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const categories = ['all', 'Technical', 'Techno-Management', 'Cultural', 'Formula Student', 'Research & Innovation'];

  return (
    <div className="container" style={{ paddingBottom: '4rem' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '1.25rem',
        marginBottom: '2.5rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-primary">Student Organizations</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Verified Communities</span>
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Campus Clubs & Societies
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '680px' }}>
            Follow your favorite clubs to receive prioritized notifications for upcoming hackathons, recruitment announcements, and workshops.
          </p>
        </div>

        <button
          onClick={openRegisterClubModal}
          className="btn btn-primary"
          style={{ gap: '0.5rem', alignSelf: 'flex-start' }}
        >
          <Building2 size={17} />
          <span>+ Register / List Your Club</span>
        </button>
      </div>

      {/* Search & Filter bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-lg)',
          padding: '0.5rem 1rem',
          width: '340px'
        }}>
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search clubs & student teams..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '0.875rem',
              color: 'var(--text-primary)',
              width: '100%'
            }}
          />
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="btn btn-sm"
              style={{
                backgroundColor: selectedCategory === cat ? 'var(--color-primary)' : 'var(--bg-surface-elevated)',
                color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-secondary)',
                border: '1px solid',
                borderColor: selectedCategory === cat ? 'var(--color-primary)' : 'var(--border-subtle)',
                borderRadius: 'var(--radius-full)'
              }}
            >
              {cat === 'all' ? 'All Domains' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Clubs Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredClubs.map(club => {
          const isFollowing = currentUser.followedClubIds.includes(club.id);

          return (
            <div
              key={club.id}
              className="card card-interactive"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                cursor: 'pointer'
              }}
              onClick={() => navigateTo('club-detail', { clubId: club.id })}
            >
              {/* Cover Banner */}
              <div style={{ position: 'relative', height: '120px', overflow: 'hidden' }}>
                <img
                  src={club.cover}
                  alt={club.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
              </div>

              {/* Club Info with Overlapping Logo */}
              <div style={{ padding: '1.25rem', position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  position: 'absolute',
                  top: '-32px',
                  left: '1.25rem',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  border: '3px solid var(--bg-card)',
                  backgroundColor: 'var(--bg-surface)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-md)'
                }}>
                  <img src={club.logo} alt={club.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFollowClub(club.id);
                    }}
                    className={isFollowing ? "btn btn-secondary btn-sm" : "btn btn-outline btn-sm"}
                    style={{ borderRadius: 'var(--radius-full)', padding: '0.3rem 0.75rem', gap: '0.3rem' }}
                  >
                    {isFollowing ? (
                      <>
                        <Check size={13} color="var(--color-success)" />
                        <span>Following</span>
                      </>
                    ) : (
                      <span>+ Follow</span>
                    )}
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {club.name}
                  </h3>
                  {club.verified && (
                    <span style={{ color: 'var(--color-primary)', fontWeight: 800 }} title="Verified Club">✓</span>
                  )}
                </div>

                <span className="badge badge-primary" style={{ alignSelf: 'flex-start', fontSize: '0.65rem', marginBottom: '0.75rem' }}>
                  {club.category}
                </span>

                <p style={{
                  fontSize: '0.8125rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                  marginBottom: '1rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {club.description}
                </p>

                <div style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-subtle)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)'
                }}>
                  <span>{club.followerCount.toLocaleString()} Followers</span>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                    View Profile <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
