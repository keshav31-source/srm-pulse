import React from 'react';
import { EventCard } from './EventCard';
import { Search } from 'lucide-react';

export const EventGrid = ({ 
  events, 
  onRegisterClick, 
  onShareClick,
  emptyMessage = "No opportunities found matching your criteria."
}) => {
  if (!events || events.length === 0) {
    return (
      <div style={{
        padding: '4rem 1.5rem',
        textAlign: 'center',
        backgroundColor: 'var(--bg-surface-elevated)',
        borderRadius: 'var(--radius-xl)',
        border: '1px dashed var(--border-medium)',
        margin: '1.5rem 0'
      }}>
        <Search size={40} style={{ margin: '0 auto 1rem', opacity: 0.4, color: 'var(--color-primary)' }} />
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
          No Events Found
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid-responsive">
      {events.map(event => (
        <EventCard 
          key={event.id} 
          event={event} 
          onRegisterClick={onRegisterClick}
          onShareClick={onShareClick}
        />
      ))}
    </div>
  );
};
