import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Compass, Radio, Calendar, User, LayoutDashboard, Shield } from 'lucide-react';

export const MobileNav = () => {
  const { currentView, navigateTo, currentUser } = useApp();

  const getDashboardIcon = () => {
    if (currentUser.role === 'ORGANIZER') return LayoutDashboard;
    if (currentUser.role === 'PLATFORM_ADMIN') return Shield;
    return User;
  };

  const getDashboardTarget = () => {
    if (currentUser.role === 'ORGANIZER') return 'organizer-dashboard';
    if (currentUser.role === 'PLATFORM_ADMIN') return 'admin-dashboard';
    return 'student-dashboard';
  };

  const DashboardIcon = getDashboardIcon();

  const items = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'happening-now', label: 'Live', icon: Radio, isLive: true },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: getDashboardTarget(), label: currentUser.role === 'STUDENT' ? 'Profile' : 'Dashboard', icon: DashboardIcon }
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: 'var(--mobile-nav-height)',
      backgroundColor: 'var(--bg-glass)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderTop: '1px solid var(--border-subtle)',
      display: 'none',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 900,
      padding: '0 0.5rem'
    }} className="mobile-bottom-nav">
      {items.map(item => {
        const Icon = item.icon;
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => navigateTo(item.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              padding: '6px 12px',
              color: isActive ? 'var(--color-primary)' : 'var(--text-muted)',
              fontSize: '0.6875rem',
              fontWeight: isActive ? 700 : 500,
              position: 'relative'
            }}
          >
            <div style={{ position: 'relative' }}>
              <Icon size={20} strokeWidth={isActive ? 2.4 : 1.8} />
              {item.isLive && (
                <span className="pulse-dot" style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '6px',
                  height: '6px'
                }} />
              )}
            </div>
            <span>{item.label}</span>
          </button>
        );
      })}

      <style>{`
        @media (max-width: 768px) {
          .mobile-bottom-nav {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
};
