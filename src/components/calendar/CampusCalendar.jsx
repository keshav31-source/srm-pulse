import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  MapPin, 
  Clock, 
  Check, 
  Bookmark, 
  Sparkles,
  Filter
} from 'lucide-react';

export const CampusCalendar = () => {
  const { events, registrations, savedEventIds, navigateTo } = useApp();

  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'registered' | 'saved'
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date(2026, 8, 1)); // September 2026
  const [selectedDayEvents, setSelectedDayEvents] = useState(null);

  // Month navigation
  const nextMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1));
  };
  const prevMonth = () => {
    setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 1, 1));
  };

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  const monthName = currentMonthDate.toLocaleString('default', { month: 'long' });

  // Filter events according to activeFilter
  const filteredEvents = events.filter(e => {
    if (activeFilter === 'registered') {
      return registrations.some(r => r.eventId === e.id && (r.status === 'CONFIRMED' || r.status === 'ATTENDED'));
    }
    if (activeFilter === 'saved') {
      return savedEventIds.includes(e.id);
    }
    return e.status !== 'rejected';
  });

  // Calendar Grid calculation
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];
  // Empty padding cells
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push({ type: 'empty', id: `empty-${i}` });
  }
  // Days of current month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayEvts = filteredEvents.filter(e => e.date === dateStr);
    calendarDays.push({
      type: 'day',
      dayNumber: day,
      dateStr,
      events: dayEvts,
      isToday: dateStr === '2026-09-12' // Current demo date!
    });
  }

  // Export .ics for all events
  const handleExportAll = () => {
    let icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//SRM University//SRM Pulse//EN\n`;
    filteredEvents.forEach(e => {
      icsContent += `BEGIN:VEVENT\nUID:${e.id}@srmpulse.srmist.edu.in\nDTSTART:${e.date.replace(/-/g, '')}T${(e.startTime || '10:00').replace(':', '')}00\nDTEND:${e.date.replace(/-/g, '')}T${(e.endTime || '12:00').replace(':', '')}00\nSUMMARY:${e.title}\nLOCATION:${e.venueName}, SRM KTR\nSTATUS:CONFIRMED\nEND:VEVENT\n`;
    });
    icsContent += `END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `SRM-Campus-Calendar-${monthName}-${year}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container" style={{ paddingBottom: '4rem' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span className="badge badge-primary">Campus Schedule</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Synchronized Timetable</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Opportunity Calendar
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
            Track hackathon timelines, workshop slots, guest lectures, and cultural dates across campus.
          </p>
        </div>

        {/* Action: Download ICS */}
        <button
          onClick={handleExportAll}
          className="btn btn-secondary"
          style={{ gap: '0.45rem' }}
        >
          <Download size={16} />
          <span>Export to Calendar (.ics)</span>
        </button>
      </div>

      {/* Calendar Toolbar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        backgroundColor: 'var(--bg-surface-elevated)',
        padding: '1rem 1.5rem',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-subtle)',
        marginBottom: '1.5rem'
      }}>
        {/* Month Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {monthName} {year}
          </h2>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <button 
              onClick={prevMonth} 
              className="btn btn-secondary btn-icon-only"
              style={{ padding: '6px' }}
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={nextMonth} 
              className="btn btn-secondary btn-icon-only"
              style={{ padding: '6px' }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveFilter('all')}
            className="btn btn-sm"
            style={{
              backgroundColor: activeFilter === 'all' ? 'var(--color-primary)' : 'var(--bg-surface)',
              color: activeFilter === 'all' ? '#FFFFFF' : 'var(--text-secondary)',
              border: '1px solid',
              borderColor: activeFilter === 'all' ? 'var(--color-primary)' : 'var(--border-subtle)'
            }}
          >
            All Events
          </button>
          <button
            onClick={() => setActiveFilter('registered')}
            className="btn btn-sm"
            style={{
              backgroundColor: activeFilter === 'registered' ? 'var(--color-success)' : 'var(--bg-surface)',
              color: activeFilter === 'registered' ? '#FFFFFF' : 'var(--text-secondary)',
              border: '1px solid',
              borderColor: activeFilter === 'registered' ? 'var(--color-success)' : 'var(--border-subtle)',
              gap: '0.35rem'
            }}
          >
            <Check size={13} />
            <span>My Registered</span>
          </button>
          <button
            onClick={() => setActiveFilter('saved')}
            className="btn btn-sm"
            style={{
              backgroundColor: activeFilter === 'saved' ? 'var(--color-warning)' : 'var(--bg-surface)',
              color: activeFilter === 'saved' ? '#FFFFFF' : 'var(--text-secondary)',
              border: '1px solid',
              borderColor: activeFilter === 'saved' ? 'var(--color-warning)' : 'var(--border-subtle)',
              gap: '0.35rem'
            }}
          >
            <Bookmark size={13} />
            <span>Bookmarked</span>
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-medium)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)'
      }}>
        {/* Days Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          backgroundColor: 'var(--bg-surface-elevated)',
          borderBottom: '1px solid var(--border-subtle)',
          textAlign: 'center',
          fontWeight: 700,
          fontSize: '0.8125rem',
          color: 'var(--text-muted)',
          padding: '0.75rem 0'
        }}>
          <div>SUN</div>
          <div>MON</div>
          <div>TUE</div>
          <div>WED</div>
          <div>THU</div>
          <div>FRI</div>
          <div>SAT</div>
        </div>

        {/* Days Cells */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '1px',
          backgroundColor: 'var(--border-subtle)'
        }}>
          {calendarDays.map((cell, idx) => {
            if (cell.type === 'empty') {
              return (
                <div 
                  key={cell.id} 
                  style={{
                    minHeight: '110px',
                    backgroundColor: 'var(--bg-surface)',
                    opacity: 0.4
                  }} 
                />
              );
            }

            const hasEvents = cell.events && cell.events.length > 0;

            return (
              <div
                key={cell.dateStr}
                onClick={() => hasEvents && setSelectedDayEvents(cell)}
                style={{
                  minHeight: '110px',
                  backgroundColor: cell.isToday ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)',
                  padding: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: hasEvents ? 'pointer' : 'default',
                  transition: 'background var(--duration-fast)',
                  position: 'relative',
                  border: cell.isToday ? '1px solid var(--color-primary)' : undefined
                }}
                onMouseEnter={(e) => {
                  if (hasEvents) e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)';
                }}
                onMouseLeave={(e) => {
                  if (hasEvents) e.currentTarget.style.backgroundColor = cell.isToday ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)';
                }}
              >
                {/* Day Number Label */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{
                    fontSize: '0.8125rem',
                    fontWeight: cell.isToday ? 800 : 600,
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: cell.isToday ? 'var(--color-primary)' : 'transparent',
                    color: cell.isToday ? '#FFFFFF' : 'var(--text-primary)'
                  }}>
                    {cell.dayNumber}
                  </span>
                  {cell.isToday && (
                    <span style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                      TODAY
                    </span>
                  )}
                </div>

                {/* Event Pills inside Day Cell */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', overflow: 'hidden' }}>
                  {cell.events.slice(0, 2).map(evt => {
                    const isRegistered = registrations.some(r => r.eventId === evt.id && r.status === 'CONFIRMED');
                    return (
                      <div
                        key={evt.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateTo('event-detail', { eventId: evt.id });
                        }}
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          padding: '2px 6px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: isRegistered ? 'rgba(16, 185, 129, 0.2)' : 'var(--color-primary-light)',
                          color: isRegistered ? 'var(--color-success)' : 'var(--color-primary)',
                          borderLeft: `3px solid ${isRegistered ? 'var(--color-success)' : 'var(--color-primary)'}`,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                        title={`${evt.title} (${evt.startTime})`}
                      >
                        {evt.startTime} {evt.title}
                      </div>
                    );
                  })}
                  {cell.events.length > 2 && (
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, paddingLeft: '4px' }}>
                      +{cell.events.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Popover / Drawer for Selected Day Details */}
      {selectedDayEvents && (
        <div className="modal-overlay" onClick={() => setSelectedDayEvents(null)}>
          <div 
            className="modal-content" 
            style={{ maxWidth: '500px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <span className="badge badge-primary" style={{ fontSize: '0.6875rem', marginBottom: '2px' }}>
                  {selectedDayEvents.dateStr}
                </span>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Events Scheduled on This Date
                </h3>
              </div>
              <button onClick={() => setSelectedDayEvents(null)} className="btn btn-ghost btn-icon-only">
                ✕
              </button>
            </div>

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {selectedDayEvents.events.map(evt => (
                <div
                  key={evt.id}
                  onClick={() => {
                    setSelectedDayEvents(null);
                    navigateTo('event-detail', { eventId: evt.id });
                  }}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{evt.category}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600 }}>{evt.startTime} - {evt.endTime}</span>
                  </div>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {evt.title}
                  </h4>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    📍 {evt.venueName} • Organized by {evt.clubName}
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <button onClick={() => setSelectedDayEvents(null)} className="btn btn-secondary btn-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
