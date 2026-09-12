import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  Building, 
  Navigation, 
  Calendar, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  Radio,
  Clock,
  Compass
} from 'lucide-react';

export const CampusMap = () => {
  const { buildings, events, selectedBuildingId, setSelectedBuildingId, navigateTo } = useApp();

  // Active building selection
  const [activeBuildingId, setActiveBuildingId] = useState(selectedBuildingId || 'tp');

  const activeBuilding = buildings.find(b => b.id === activeBuildingId) || buildings[0];

  // Events scheduled at this building
  const buildingEvents = events.filter(e => e.buildingId === activeBuilding.id && e.status !== 'rejected');

  const handleSelectBuilding = (id) => {
    setActiveBuildingId(id);
    setSelectedBuildingId(id);
  };

  return (
    <div className="container" style={{ paddingBottom: '4rem' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span className="badge badge-primary">SRM KTR Campus</span>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Interactive Venue Navigator</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Interactive Campus Map
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '680px' }}>
          Discover where hackathons, workshops, fests, and club sessions take place across SRM Kattankulathur. Select any building to inspect venues and active scheduled opportunities.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.4fr) minmax(320px, 1fr)',
        gap: '2rem',
        alignItems: 'start'
      }} className="campus-map-grid">
        {/* Left Column: Interactive Map Graphic */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-md)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Map Controls & Legend */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Navigation size={18} color="var(--color-primary)" />
              <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                Campus Master Layout
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Click any pin to inspect
            </span>
          </div>

          {/* Interactive SVG Campus Layout */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '420px',
            backgroundColor: 'var(--bg-app)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            overflow: 'hidden'
          }}>
            {/* Campus Background Map Graphic */}
            <svg viewBox="0 0 1000 600" style={{ width: '100%', height: '100%' }}>
              <defs>
                <pattern id="campusGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border-subtle)" strokeWidth="0.5" />
                </pattern>
                {/* Glow filter */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Grid Background */}
              <rect width="1000" height="600" fill="url(#campusGrid)" />

              {/* Campus Roads / Pathways */}
              {/* Grand Southern Trunk (GST) Road representation */}
              <path d="M 0 540 Q 500 520 1000 550" stroke="var(--border-medium)" strokeWidth="18" fill="none" opacity="0.4" />
              <path d="M 0 540 Q 500 520 1000 550" stroke="#F59E0B" strokeWidth="2" strokeDasharray="12 8" fill="none" opacity="0.6" />

              {/* Main Avenue through Campus */}
              <path d="M 500 530 L 500 120" stroke="var(--border-medium)" strokeWidth="14" fill="none" opacity="0.3" />
              <path d="M 200 300 L 800 300" stroke="var(--border-medium)" strokeWidth="12" fill="none" opacity="0.25" />
              <path d="M 280 380 Q 400 370 750 220" stroke="var(--border-medium)" strokeWidth="8" fill="none" opacity="0.2" />

              {/* Green zones / Java Gardens */}
              <circle cx="420" cy="380" r="65" fill="#10B981" opacity="0.12" />
              <circle cx="250" cy="180" r="80" fill="#10B981" opacity="0.1" />

              {/* Lake / Potheri side curve */}
              <path d="M 850 50 Q 920 180 980 400" stroke="#06B6D4" strokeWidth="24" fill="none" opacity="0.15" />

              {/* Building Blocks */}
              {buildings.map(b => {
                const isCurrent = b.id === activeBuilding.id;
                const bx = (b.x / 100) * 1000;
                const by = (b.y / 100) * 600;

                return (
                  <g 
                    key={b.id} 
                    onClick={() => handleSelectBuilding(b.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Footprint polygon */}
                    <rect
                      x={bx - 45}
                      y={by - 30}
                      width="90"
                      height="60"
                      rx="8"
                      fill={isCurrent ? b.color : 'var(--bg-surface-elevated)'}
                      stroke={isCurrent ? '#FFFFFF' : b.color}
                      strokeWidth={isCurrent ? '3' : '1.5'}
                      opacity={isCurrent ? '0.95' : '0.75'}
                      filter={isCurrent ? 'url(#glow)' : undefined}
                    />

                    {/* Building code label */}
                    <text
                      x={bx}
                      y={by + 4}
                      textAnchor="middle"
                      fill={isCurrent ? '#FFFFFF' : 'var(--text-primary)'}
                      fontSize="14"
                      fontWeight="800"
                      fontFamily="sans-serif"
                    >
                      {b.code}
                    </text>

                    {/* Active pulse marker */}
                    {isCurrent && (
                      <circle
                        cx={bx}
                        cy={by - 32}
                        r="6"
                        fill="#EF4444"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Overlay Campus Compass */}
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.6875rem',
              fontWeight: 700,
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Compass size={14} color="var(--color-primary)" />
              <span>N ↑ GST Road: South</span>
            </div>
          </div>

          {/* Buildings Quick Selector Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginTop: '1.25rem'
          }}>
            {buildings.map(b => {
              const isCurrent = b.id === activeBuilding.id;
              const hasEvents = events.some(e => e.buildingId === b.id);
              return (
                <button
                  key={b.id}
                  onClick={() => handleSelectBuilding(b.id)}
                  className="btn btn-sm"
                  style={{
                    backgroundColor: isCurrent ? 'var(--color-primary)' : 'var(--bg-surface-elevated)',
                    color: isCurrent ? '#FFFFFF' : 'var(--text-primary)',
                    border: '1px solid',
                    borderColor: isCurrent ? 'var(--color-primary)' : 'var(--border-subtle)',
                    gap: '0.4rem'
                  }}
                >
                  <span style={{ fontWeight: 700 }}>{b.code}</span>
                  <span style={{ fontSize: '0.75rem', opacity: 0.9 }}>{b.name.split(' ')[0]}</span>
                  {hasEvents && (
                    <span style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: isCurrent ? '#FFFFFF' : 'var(--color-success)'
                    }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Building Details & Scheduled Events */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Building Overview Card */}
          <div style={{
            backgroundColor: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: activeBuilding.color,
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.125rem'
              }}>
                {activeBuilding.code}
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {activeBuilding.name}
                </h3>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  {activeBuilding.subtitle}
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
              {activeBuilding.description}
            </p>

            {/* Quick Meta Info */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
              padding: '0.875rem',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8125rem',
              marginBottom: '1.25rem'
            }}>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.6875rem', textTransform: 'uppercase', fontWeight: 600 }}>Category</span>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{activeBuilding.category}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.6875rem', textTransform: 'uppercase', fontWeight: 600 }}>Total Floors</span>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{activeBuilding.floors} Levels</div>
              </div>
            </div>

            {/* Popular Rooms in Building */}
            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.5rem' }}>
                Key Seminar Halls & Venues
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {activeBuilding.popularRooms.map(room => (
                  <span
                    key={room}
                    style={{
                      fontSize: '0.75rem',
                      padding: '4px 8px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    📍 {room}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Scheduled Opportunities at this Location */}
          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Scheduled Events ({buildingEvents.length})
              </h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                In {activeBuilding.code}
              </span>
            </div>

            {buildingEvents.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
                <Calendar size={28} style={{ margin: '0 auto 0.5rem', opacity: 0.5 }} />
                <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>No upcoming public events scheduled here.</p>
                <p style={{ fontSize: '0.75rem' }}>Check back later or view other campus buildings.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {buildingEvents.map(evt => (
                  <div
                    key={evt.id}
                    onClick={() => navigateTo('event-detail', { eventId: evt.id })}
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-lg)',
                      backgroundColor: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-subtle)',
                      cursor: 'pointer',
                      transition: 'all var(--duration-fast)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-active)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '4px' }}>
                      <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{evt.category}</span>
                      {evt.status === 'happening_now' && (
                        <span className="badge badge-live" style={{ fontSize: '0.65rem' }}>
                          <span className="pulse-dot" style={{ width: '5px', height: '5px' }} /> LIVE
                        </span>
                      )}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                      {evt.title}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <span>📅 {evt.date}</span>
                      <span>⏰ {evt.startTime} - {evt.endTime}</span>
                      <span>📍 {evt.room}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .campus-map-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
