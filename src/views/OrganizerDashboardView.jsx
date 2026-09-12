import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CreateEventModal } from '../components/organizer/CreateEventModal';
import { QRCheckInScanner } from '../components/organizer/QRCheckInScanner';
import { 
  PlusCircle, 
  Scan, 
  Users, 
  Calendar, 
  BarChart3, 
  Download, 
  Eye, 
  CheckCircle, 
  Clock, 
  XCircle,
  ExternalLink,
  ArrowRight,
  Building2
} from 'lucide-react';

export const OrganizerDashboardView = () => {
  const { 
    events, 
    clubs, 
    registrations, 
    currentUser, 
    navigateTo, 
    organizerActiveClubId, 
    setOrganizerActiveClubId, 
    openRegisterClubModal 
  } = useApp();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [activeScannerEvent, setActiveScannerEvent] = useState(null);
  const [selectedEventForParticipants, setSelectedEventForParticipants] = useState(null);

  // Available clubs for organizer (clubs they manage, active club, or all clubs)
  const managedClubs = clubs.filter(c => 
    (currentUser.managedClubIds && currentUser.managedClubIds.includes(c.id)) ||
    c.id === organizerActiveClubId ||
    c.leads?.some(l => l.email === currentUser.email)
  );
  const availableClubs = managedClubs.length > 0 ? managedClubs : clubs;
  const organizerClub = clubs.find(c => c.id === organizerActiveClubId) || availableClubs[0] || clubs[0];
  const clubEvents = events.filter(e => e.clubId === organizerClub.id);

  // Aggregate stats
  const totalEvents = clubEvents.length;
  const totalRegistrations = clubEvents.reduce((acc, e) => acc + (e.registeredCount || 0), 0);
  const totalViews = clubEvents.reduce((acc, e) => acc + (e.viewsCount || 0), 0);
  const totalSaves = clubEvents.reduce((acc, e) => acc + (e.savesCount || 0), 0);

  // CSV export handler
  const handleExportCSV = (event) => {
    const eventRegs = registrations.filter(r => r.eventId === event.id);
    let csvContent = "data:text/csv;charset=utf-8,Ticket Code,Attendee Name,SRM Email,Reg Number,Department,Year,Status,Attended At\n";
    eventRegs.forEach(r => {
      csvContent += `${r.ticketCode},${r.answers?.fullName || 'Student'},${r.answers?.srmEmail || ''},${r.answers?.regNumber || ''},${r.answers?.department || ''},${r.answers?.year || ''},${r.status},${r.attendedAt || 'N/A'}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${event.title.slice(0, 15)}-participants.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return <span className="badge badge-success">Published ✓</span>;
      case 'happening_now':
        return <span className="badge badge-live"><span className="pulse-dot" /> Live Now</span>;
      case 'closing_soon':
        return <span className="badge badge-warning">Closing Soon</span>;
      case 'pending_approval':
        return <span className="badge badge-purple">Pending DSA Review</span>;
      case 'completed':
        return <span className="badge" style={{ backgroundColor: 'var(--bg-surface-hover)', color: 'var(--text-muted)' }}>Completed</span>;
      case 'rejected':
        return <span className="badge badge-danger">Rejected</span>;
      default:
        return <span className="badge badge-primary">{status}</span>;
    }
  };

  return (
    <div className="container" style={{ paddingBottom: '4rem' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img
            src={organizerClub.logo}
            alt={organizerClub.name}
            style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-medium)' }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2px' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {organizerClub.name}
              </h1>
              {organizerClub.verified && (
                <span className="badge badge-primary" style={{ fontSize: '0.6875rem' }}>
                  Verified Club ✓
                </span>
              )}
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Organizer Command Center • Lead: <strong>{currentUser.name}</strong>
            </p>
          </div>
        </div>

        {/* Action Controls: Club Switcher & Event Publisher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Club Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Active Club:
            </span>
            <select
              value={organizerClub.id}
              onChange={(e) => setOrganizerActiveClubId(e.target.value)}
              className="form-select"
              style={{
                fontSize: '0.8125rem',
                fontWeight: 700,
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-primary)',
                minWidth: '200px'
              }}
            >
              {availableClubs.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} {c.verified ? '✓' : '(Pending Verification)'}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={openRegisterClubModal}
            className="btn btn-secondary"
            style={{ gap: '0.4rem' }}
            title="Register a new student club or society at SRM"
          >
            <Building2 size={16} />
            <span>+ List Another Club</span>
          </button>

          <button
            onClick={() => setCreateModalOpen(true)}
            className="btn btn-primary"
            style={{ gap: '0.5rem' }}
          >
            <PlusCircle size={18} />
            <span>Add Event for {organizerClub.name.slice(0, 15)}...</span>
          </button>
        </div>
      </div>

      {/* Aggregate Statistics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2.5rem'
      }}>
        <div style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.25rem',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Total Events
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
            {totalEvents}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)', marginTop: '2px' }}>
            Published across campus
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.25rem',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Total Registrations
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-success)', marginTop: '4px' }}>
            {totalRegistrations}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Confirmed student seats
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.25rem',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Total Page Views
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-purple)', marginTop: '4px' }}>
            {totalViews.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Across SRM student feeds
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.25rem',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Student Saves / Bookmarks
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-warning)', marginTop: '4px' }}>
            {totalSaves}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Bookmarked on student spaces
          </div>
        </div>
      </div>

      {/* Events Management Table */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-medium)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '2.5rem'
      }}>
        <div style={{
          padding: '1.25rem 1.5rem',
          backgroundColor: 'var(--bg-surface-elevated)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Organized Opportunities ({clubEvents.length})
          </h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Manage registrations, launch check-in scanners, and review attendance
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.875rem 1.5rem' }}>Opportunity</th>
                <th style={{ padding: '0.875rem 1rem' }}>Date & Venue</th>
                <th style={{ padding: '0.875rem 1rem' }}>Status</th>
                <th style={{ padding: '0.875rem 1rem' }}>Registrations</th>
                <th style={{ padding: '0.875rem 1rem' }}>Views / Saves</th>
                <th style={{ padding: '0.875rem 1.5rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clubEvents.map(evt => (
                <tr
                  key={evt.id}
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
                    transition: 'background var(--duration-fast)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-surface-elevated)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={evt.banner} alt={evt.title} style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{evt.title}</div>
                        <span className="badge badge-primary" style={{ fontSize: '0.625rem', marginTop: '2px' }}>{evt.category}</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{evt.date}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{evt.venueName} • {evt.room}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    {getStatusBadge(evt.status)}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                      {evt.registeredCount} / {evt.capacity}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {evt.waitlistCount > 0 ? `${evt.waitlistCount} waitlisted` : 'Capacity normal'}
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ color: 'var(--text-primary)' }}>{evt.viewsCount} views</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{evt.savesCount} bookmarks</div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                      {/* Check-in QR Scanner Button */}
                      <button
                        onClick={() => setActiveScannerEvent(evt)}
                        className="btn btn-primary btn-sm"
                        style={{ gap: '0.3rem', padding: '0.35rem 0.65rem' }}
                        title="Open Live Attendance Scanner"
                      >
                        <Scan size={14} />
                        <span>QR Check-in</span>
                      </button>

                      {/* View & Export Attendees Button */}
                      <button
                        onClick={() => setSelectedEventForParticipants(evt)}
                        className="btn btn-secondary btn-sm"
                        style={{ gap: '0.3rem', padding: '0.35rem 0.65rem' }}
                        title="View Participants & Export CSV"
                      >
                        <Users size={14} />
                        <span>Attendees</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Event Wizard Modal */}
      {createModalOpen && (
        <CreateEventModal onClose={() => setCreateModalOpen(false)} />
      )}

      {/* Live QR Attendance Check-In Modal */}
      {activeScannerEvent && (
        <QRCheckInScanner
          event={activeScannerEvent}
          onClose={() => setActiveScannerEvent(null)}
        />
      )}

      {/* Participants List & CSV Export Modal */}
      {selectedEventForParticipants && (
        <div className="modal-overlay" onClick={() => setSelectedEventForParticipants(null)}>
          <div className="modal-content" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="badge badge-primary" style={{ fontSize: '0.6875rem' }}>Attendee Roster</span>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>
                  {selectedEventForParticipants.title}
                </h3>
              </div>
              <button onClick={() => setSelectedEventForParticipants(null)} className="btn btn-ghost btn-icon-only">✕</button>
            </div>

            <div className="modal-body" style={{ maxHeight: '55vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  Total Registered: <strong>{selectedEventForParticipants.registeredCount}</strong>
                </span>
                <button
                  onClick={() => handleExportCSV(selectedEventForParticipants)}
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '0.35rem' }}
                >
                  <Download size={14} />
                  <span>Export Attendance CSV</span>
                </button>
              </div>

              {/* Sample list of registrations */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {registrations.filter(r => r.eventId === selectedEventForParticipants.id).map(r => (
                  <div
                    key={r.id}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                        {r.answers?.fullName || 'Keshav Arora'}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {r.ticketCode} • {r.answers?.regNumber || 'RA2211003010142'}
                      </div>
                    </div>
                    <span className={r.status === 'ATTENDED' ? "badge badge-success" : "badge badge-primary"} style={{ fontSize: '0.6875rem' }}>
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setSelectedEventForParticipants(null)} className="btn btn-secondary btn-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
