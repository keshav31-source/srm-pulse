import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { EventCard } from '../components/events/EventCard';
import { 
  Search, 
  Filter, 
  X, 
  SlidersHorizontal, 
  Calendar, 
  MapPin, 
  RotateCcw,
  Sparkles,
  Check
} from 'lucide-react';

export const ExploreView = ({ onRegisterClick, onShareClick }) => {
  const { 
    events, 
    categories, 
    clubs, 
    buildings, 
    searchQuery, 
    setSearchQuery,
    currentUser 
  } = useApp();

  // Local filter states
  const [term, setTerm] = useState(searchQuery || '');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDateFilter, setSelectedDateFilter] = useState('all'); // 'all' | 'today' | 'tomorrow' | 'week' | 'month'
  const [selectedFormat, setSelectedFormat] = useState('all'); // 'all' | 'In-person' | 'Hybrid' | 'Online'
  const [selectedCost, setSelectedCost] = useState('all'); // 'all' | 'Free' | 'Paid'
  const [selectedBuilding, setSelectedBuilding] = useState('all');
  const [selectedClub, setSelectedClub] = useState('all');
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [sortBy, setSortBy] = useState('recommended'); // 'recommended' | 'popular' | 'newest' | 'closing_soon'

  // Reset filters
  const handleResetFilters = () => {
    setTerm('');
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedDateFilter('all');
    setSelectedFormat('all');
    setSelectedCost('all');
    setSelectedBuilding('all');
    setSelectedClub('all');
    setShowPastEvents(false);
    setSortBy('recommended');
  };

  // Filter & Sort Logic
  const filteredAndSortedEvents = useMemo(() => {
    return events.filter(e => {
      // Past events check
      if (!showPastEvents && e.status === 'completed') return false;
      if (e.status === 'rejected' || e.status === 'pending_approval') return false;

      // Keyword search
      if (term.trim()) {
        const q = term.toLowerCase();
        const matchesTitle = e.title.toLowerCase().includes(q);
        const matchesClub = e.clubName.toLowerCase().includes(q);
        const matchesCategory = e.category.toLowerCase().includes(q);
        const matchesVenue = e.venueName.toLowerCase().includes(q);
        const matchesDesc = (e.description || '').toLowerCase().includes(q);
        const matchesTags = e.tags && e.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesClub && !matchesCategory && !matchesVenue && !matchesDesc && !matchesTags) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all' && e.category !== selectedCategory) {
        return false;
      }

      // Date range filter (Current demo reference: 2026-09-12)
      if (selectedDateFilter === 'today' && e.date !== '2026-09-12') return false;
      if (selectedDateFilter === 'tomorrow' && e.date !== '2026-09-13') return false;
      if (selectedDateFilter === 'week' && (e.date < '2026-09-12' || e.date > '2026-09-19')) return false;
      if (selectedDateFilter === 'month' && !e.date.startsWith('2026-09')) return false;

      // Format filter
      if (selectedFormat !== 'all' && e.format !== selectedFormat) return false;

      // Cost filter
      if (selectedCost === 'Free' && e.cost !== 'Free') return false;
      if (selectedCost === 'Paid' && e.cost === 'Free') return false;

      // Building filter
      if (selectedBuilding !== 'all' && e.buildingId !== selectedBuilding) return false;

      // Club filter
      if (selectedClub !== 'all' && e.clubId !== selectedClub) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') {
        return (b.viewsCount + b.savesCount * 3) - (a.viewsCount + a.savesCount * 3);
      }
      if (sortBy === 'newest') {
        return new Date(b.date) - new Date(a.date);
      }
      if (sortBy === 'closing_soon') {
        if (a.status === 'closing_soon') return -1;
        if (b.status === 'closing_soon') return 1;
        return (a.capacity - a.registeredCount) - (b.capacity - b.registeredCount);
      }
      // 'recommended' sort: prioritizes matches to student's interests
      const aInterests = a.tags ? a.tags.filter(t => currentUser.interests.includes(t)).length : 0;
      const bInterests = b.tags ? b.tags.filter(t => currentUser.interests.includes(t)).length : 0;
      return bInterests - aInterests;
    });
  }, [
    events, 
    term, 
    selectedCategory, 
    selectedDateFilter, 
    selectedFormat, 
    selectedCost, 
    selectedBuilding, 
    selectedClub, 
    showPastEvents, 
    sortBy, 
    currentUser.interests
  ]);

  const hasActiveFilters = 
    term || 
    selectedCategory !== 'all' || 
    selectedDateFilter !== 'all' || 
    selectedFormat !== 'all' || 
    selectedCost !== 'all' || 
    selectedBuilding !== 'all' || 
    selectedClub !== 'all' || 
    showPastEvents;

  return (
    <div className="container" style={{ paddingBottom: '4rem' }}>
      {/* Top Title & Search bar */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
          <span className="badge badge-primary">Central Discovery</span>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Real-time Opportunity Engine</span>
        </div>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
          Discover Campus Opportunities
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '680px', marginBottom: '1.75rem' }}>
          Filter through hackathons, workshops, recruitment drives, guest lectures, and cultural fests across every department at SRM.
        </p>

        {/* Global Search input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-xl)',
          padding: '0.625rem 1.25rem',
          boxShadow: 'var(--shadow-sm)',
          maxWidth: '800px'
        }}>
          <Search size={20} color="var(--color-primary)" />
          <input
            type="text"
            placeholder="Search by event title, organizer, topic, or room number (e.g. AI, GDSC, TP 204)..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '1rem',
              color: 'var(--text-primary)'
            }}
          />
          {term && (
            <button onClick={() => setTerm('')} style={{ color: 'var(--text-muted)' }}>
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        overflowX: 'auto',
        paddingBottom: '0.75rem',
        marginBottom: '1.5rem',
        scrollbarWidth: 'none'
      }}>
        <button
          onClick={() => setSelectedCategory('all')}
          className="btn btn-sm"
          style={{
            backgroundColor: selectedCategory === 'all' ? 'var(--color-primary)' : 'var(--bg-surface-elevated)',
            color: selectedCategory === 'all' ? '#FFFFFF' : 'var(--text-secondary)',
            border: '1px solid',
            borderColor: selectedCategory === 'all' ? 'var(--color-primary)' : 'var(--border-subtle)',
            borderRadius: 'var(--radius-full)'
          }}
        >
          All Categories
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className="btn btn-sm"
            style={{
              backgroundColor: selectedCategory === cat.id ? 'var(--color-primary)' : 'var(--bg-surface-elevated)',
              color: selectedCategory === cat.id ? '#FFFFFF' : 'var(--text-secondary)',
              border: '1px solid',
              borderColor: selectedCategory === cat.id ? 'var(--color-primary)' : 'var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              gap: '0.35rem'
            }}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Advanced Filter Controls Bar */}
      <div style={{
        backgroundColor: 'var(--bg-surface-elevated)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.25rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1rem',
          alignItems: 'center'
        }}>
          {/* Date Filter */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Date Range
            </label>
            <select
              value={selectedDateFilter}
              onChange={(e) => setSelectedDateFilter(e.target.value)}
              className="form-select"
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.8125rem' }}
            >
              <option value="all">Any Date</option>
              <option value="today">Today (Sep 12)</option>
              <option value="tomorrow">Tomorrow (Sep 13)</option>
              <option value="week">This Week</option>
              <option value="month">This Month (September)</option>
            </select>
          </div>

          {/* Format Filter */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Event Format
            </label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="form-select"
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.8125rem' }}
            >
              <option value="all">All Formats</option>
              <option value="In-person">In-person (Physical)</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Online">Online / Virtual</option>
            </select>
          </div>

          {/* Building / Venue Filter */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Campus Building
            </label>
            <select
              value={selectedBuilding}
              onChange={(e) => setSelectedBuilding(e.target.value)}
              className="form-select"
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.8125rem' }}
            >
              <option value="all">All Campus Buildings</option>
              {buildings.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* Club Filter */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Organizing Club
            </label>
            <select
              value={selectedClub}
              onChange={(e) => setSelectedClub(e.target.value)}
              className="form-select"
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.8125rem' }}
            >
              <option value="all">All Clubs</option>
              {clubs.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Cost Filter */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Cost
            </label>
            <select
              value={selectedCost}
              onChange={(e) => setSelectedCost(e.target.value)}
              className="form-select"
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.8125rem' }}
            >
              <option value="all">Free & Paid</option>
              <option value="Free">Free Only</option>
              <option value="Paid">Paid / Ticketed</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select"
              style={{ padding: '0.5rem 0.75rem', fontSize: '0.8125rem', fontWeight: 600 }}
            >
              <option value="recommended">⭐ Recommended for You</option>
              <option value="popular">🔥 Most Popular</option>
              <option value="newest">📅 Newest Date</option>
              <option value="closing_soon">⏰ Deadline Closing Soon</option>
            </select>
          </div>
        </div>

        {/* Filter Toolbar Options (Reset + Past Events toggle) */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginTop: '1rem',
          paddingTop: '0.75rem',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showPastEvents}
              onChange={(e) => setShowPastEvents(e.target.checked)}
              style={{ accentColor: 'var(--color-primary)' }}
            />
            <span>Include Past / Completed Events</span>
          </label>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="btn btn-ghost btn-sm"
              style={{ gap: '0.35rem', color: 'var(--color-danger)' }}
            >
              <RotateCcw size={14} />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          Showing {filteredAndSortedEvents.length} {filteredAndSortedEvents.length === 1 ? 'Opportunity' : 'Opportunities'}
        </div>
        {sortBy === 'recommended' && (
          <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Sparkles size={14} />
            <span>Personalized for {currentUser.name.split(' ')[0]}'s interests</span>
          </div>
        )}
      </div>

      {/* Event Grid */}
      {filteredAndSortedEvents.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 1.5rem',
          backgroundColor: 'var(--bg-surface-elevated)',
          borderRadius: 'var(--radius-xl)',
          border: '1px dashed var(--border-medium)'
        }}>
          <Search size={40} style={{ margin: '0 auto 1rem', opacity: 0.4, color: 'var(--color-primary)' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            No opportunities match your current filter criteria
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
            Try expanding your search term, clearing building restrictions, or selecting "All Categories".
          </p>
          <button onClick={handleResetFilters} className="btn btn-primary btn-sm">
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid-responsive">
          {filteredAndSortedEvents.map(evt => (
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
  );
};
