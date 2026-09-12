import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  CheckCheck, 
  Radio, 
  Clock, 
  BellRing, 
  Calendar, 
  Sparkles, 
  SlidersHorizontal,
  ChevronRight 
} from 'lucide-react';

export const NotificationDrawer = () => {
  const { 
    notificationDrawerOpen, 
    setNotificationDrawerOpen, 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead,
    navigateTo 
  } = useApp();

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'unread' | 'settings'
  const [preferences, setPreferences] = useState({
    reminders: true,
    clubAnnouncements: true,
    deadlineAlerts: true,
    venueUpdates: true
  });

  if (!notificationDrawerOpen) return null;

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'unread') return !n.read;
    return true;
  });

  const getNotifIcon = (type) => {
    switch (type) {
      case 'live_event':
        return <Radio size={16} color="#EF4444" />;
      case 'deadline':
        return <Clock size={16} color="#F59E0B" />;
      case 'club_update':
        return <Sparkles size={16} color="#8B5CF6" />;
      default:
        return <BellRing size={16} color="#3B82F6" />;
    }
  };

  const handleNotificationClick = (notif) => {
    markNotificationRead(notif.id);
    if (notif.eventId) {
      setNotificationDrawerOpen(false);
      navigateTo('event-detail', { eventId: notif.eventId });
    }
  };

  return (
    <div 
      className="modal-overlay" 
      style={{ justifyContent: 'flex-end', padding: 0 }}
      onClick={() => setNotificationDrawerOpen(false)}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '420px',
          height: '100%',
          backgroundColor: 'var(--bg-surface)',
          borderLeft: '1px solid var(--border-medium)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          animation: 'slideInRight 250ms var(--ease-spring)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>Campus Alerts</span>
              <span className="badge badge-primary" style={{ fontSize: '0.6875rem' }}>
                {notifications.filter(n => !n.read).length} new
              </span>
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Real-time updates, reminders & announcements
            </p>
          </div>
          <button 
            onClick={() => setNotificationDrawerOpen(false)} 
            className="btn btn-ghost btn-icon-only"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-surface-elevated)'
        }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setActiveTab('all')}
              className="btn btn-sm"
              style={{
                backgroundColor: activeTab === 'all' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'all' ? '#FFFFFF' : 'var(--text-secondary)'
              }}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setActiveTab('unread')}
              className="btn btn-sm"
              style={{
                backgroundColor: activeTab === 'unread' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'unread' ? '#FFFFFF' : 'var(--text-secondary)'
              }}
            >
              Unread
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className="btn btn-sm"
              style={{
                backgroundColor: activeTab === 'settings' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'settings' ? '#FFFFFF' : 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <SlidersHorizontal size={13} />
              Prefs
            </button>
          </div>

          {activeTab !== 'settings' && (
            <button
              onClick={markAllNotificationsRead}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: '0.75rem', gap: '0.3rem', color: 'var(--text-muted)' }}
              title="Mark all as read"
            >
              <CheckCheck size={14} />
              <span>Read all</span>
            </button>
          )}
        </div>

        {/* Drawer Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          {activeTab === 'settings' ? (
            /* Preferences Panel */
            <div style={{ padding: '0.5rem' }}>
              <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                Notification Preferences
              </h4>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Customize how SRM Pulse alerts you. We respect your attention and never spam.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { key: 'reminders', title: 'Event Start Reminders', desc: 'Alerts 24 hours & 30 minutes before your registered events' },
                  { key: 'deadlineAlerts', title: 'Registration Deadlines', desc: 'Urgent notices for events closing in under 6 hours' },
                  { key: 'clubAnnouncements', title: 'Followed Club Updates', desc: 'Broadcasts and problem statement releases from clubs you follow' },
                  { key: 'venueUpdates', title: 'Venue & Time Changes', desc: 'Immediate updates if an organizer modifies room or schedule' }
                ].map(item => (
                  <label 
                    key={item.key} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '0.75rem', 
                      cursor: 'pointer',
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface-elevated)'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={preferences[item.key]}
                      onChange={(e) => setPreferences({ ...preferences, [item.key]: e.target.checked })}
                      style={{ marginTop: '3px', accentColor: 'var(--color-primary)' }}
                    />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{item.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ) : (
            /* Notifications List */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {filteredNotifications.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                  <BellRing size={32} style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
                  <p style={{ fontSize: '0.9375rem', fontWeight: 600 }}>All caught up!</p>
                  <p style={{ fontSize: '0.8125rem' }}>No new notifications at this moment.</p>
                </div>
              ) : (
                filteredNotifications.map(notif => (
                  <div
                    key={notif.id}
                    onClick={() => handleNotificationClick(notif)}
                    style={{
                      padding: '0.875rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: notif.read ? 'var(--bg-card-subtle)' : 'var(--bg-surface-elevated)',
                      border: '1px solid',
                      borderColor: notif.read ? 'var(--border-subtle)' : 'var(--border-active)',
                      cursor: 'pointer',
                      transition: 'all var(--duration-fast)',
                      position: 'relative'
                    }}
                  >
                    {!notif.read && (
                      <span style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-primary)'
                      }} />
                    )}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <div style={{
                        padding: '6px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--bg-input)',
                        marginTop: '2px'
                      }}>
                        {getNotifIcon(notif.type)}
                      </div>
                      <div style={{ flex: 1, paddingRight: '0.75rem' }}>
                        <div style={{ 
                          fontSize: '0.875rem', 
                          fontWeight: notif.read ? 600 : 700, 
                          color: 'var(--text-primary)',
                          marginBottom: '3px'
                        }}>
                          {notif.title}
                        </div>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '6px' }}>
                          {notif.message}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                            {notif.time}
                          </span>
                          {notif.eventId && (
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                              View event <ChevronRight size={12} />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
