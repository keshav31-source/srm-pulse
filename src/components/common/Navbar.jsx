import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { GoogleLogo } from './GoogleLogo';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Compass, 
  Radio, 
  Calendar as CalendarIcon, 
  Users, 
  LayoutDashboard, 
  Check, 
  ChevronDown,
  Sparkles,
  LogIn,
  LogOut,
  User,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';

export const Navbar = () => {
  const { 
    currentView, 
    navigateTo, 
    currentUser, 
    switchRole, 
    notifications,
    setQuickSearchOpen,
    setNotificationDrawerOpen,
    registrations,
    isLoggedIn,
    openLoginModal,
    openSignUpModal,
    openRegisterClubModal,
    logout
  } = useApp();

  const { theme, toggleTheme } = useTheme();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;
  const activeConfirmedTickets = registrations.filter(r => r.status === 'CONFIRMED').length;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'explore', label: 'Explore', icon: Compass },
    { 
      id: 'happening-now', 
      label: 'Live Now', 
      icon: Radio, 
      badge: 'LIVE',
      badgeClass: 'badge-live' 
    },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'clubs', label: 'Clubs', icon: Users }
  ];

  // Initials generator
  const getInitials = (name) => {
    if (!name) return 'SRM';
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '68px',
      backgroundColor: 'var(--bg-glass)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.25rem',
        maxWidth: '1360px'
      }}>
        {/* Brand / Logo (Single clean row, no awkward multi-line wrapping) */}
        <div 
          onClick={() => navigateTo('home')} 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.65rem', 
            cursor: 'pointer',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
            color: '#FFFFFF'
          }}>
            <Sparkles size={19} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <span style={{ 
              fontSize: '1.25rem', 
              fontWeight: 800, 
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)' 
            }}>
              SRM <span style={{ color: 'var(--color-primary)' }}>PULSE</span>
            </span>
            <span style={{
              fontSize: '0.625rem',
              fontWeight: 700,
              padding: '2px 6px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              letterSpacing: '0.04em'
            }}>
              KTR
            </span>
          </div>
        </div>

        {/* Center Navigation Links (Clean & Spacious) */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem'
        }} className="desktop-nav">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className="btn btn-ghost"
                style={{
                  padding: '0.45rem 0.9rem',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  transition: 'all 150ms ease'
                }}
              >
                <Icon size={16} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`badge ${item.badgeClass}`} style={{ fontSize: '0.625rem', padding: '1px 5px' }}>
                    <span className="pulse-dot" style={{ width: '5px', height: '5px' }} />
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Section: Search, Notifications, Theme, Auth / Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          {/* Quick Search */}
          <button
            onClick={() => setQuickSearchOpen(true)}
            className="btn btn-secondary btn-sm"
            style={{
              gap: '0.5rem',
              padding: '0.4rem 0.75rem',
              color: 'var(--text-secondary)',
              borderRadius: 'var(--radius-full)'
            }}
            title="Search Opportunities (Cmd+K)"
          >
            <Search size={14} />
            <span style={{ fontSize: '0.8125rem' }} className="desktop-inline-block">Search</span>
            <kbd style={{
              fontSize: '0.65rem',
              backgroundColor: 'var(--bg-app)',
              padding: '1px 5px',
              borderRadius: '4px',
              border: '1px solid var(--border-subtle)',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)'
            }}>
              ⌘K
            </kbd>
          </button>

          {/* Notifications Bell */}
          <button
            onClick={() => setNotificationDrawerOpen(true)}
            className="btn btn-ghost btn-icon-only"
            style={{ position: 'relative', borderRadius: '50%' }}
            title="Notifications"
          >
            <Bell size={18} color="var(--text-secondary)" />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                minWidth: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-danger)',
                color: '#FFFFFF',
                fontSize: '0.625rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 2px',
                border: '2px solid var(--bg-surface)'
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-icon-only"
            style={{ borderRadius: '50%' }}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={18} color="#FBBF24" /> : <Moon size={18} color="#6366F1" />}
          </button>

          {/* ===================================================================
              AUTHENTICATION / USER PROFILE SECTION
              =================================================================== */}
          {!isLoggedIn ? (
            /* Logged Out State: Show Log In & Sign Up buttons */
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <button
                onClick={openLoginModal}
                className="btn btn-secondary btn-sm"
                style={{ borderRadius: 'var(--radius-full)', padding: '0.4rem 0.85rem' }}
              >
                <span>Log In</span>
              </button>
              <button
                onClick={openSignUpModal}
                className="btn btn-primary btn-sm"
                style={{ borderRadius: 'var(--radius-full)', padding: '0.4rem 0.85rem' }}
              >
                <span>Sign Up</span>
              </button>
            </div>
          ) : (
            /* Logged In State: User Avatar & Role Switcher Dropdown */
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.4rem' }} ref={dropdownRef}>
              {/* Profile Trigger Button */}
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="btn btn-secondary btn-sm"
                style={{
                  borderRadius: 'var(--radius-full)',
                  padding: '0.35rem 0.75rem 0.35rem 0.4rem',
                  gap: '0.5rem',
                  backgroundColor: 'var(--bg-surface-elevated)'
                }}
              >
                {/* Initials Avatar Badge (NO stock photos) */}
                <div style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: currentUser.role === 'STUDENT'
                    ? 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)'
                    : currentUser.role === 'ORGANIZER'
                    ? 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)'
                    : 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '0.6875rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  letterSpacing: '0.02em'
                }}>
                  {getInitials(currentUser.name)}
                </div>

                <span style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--text-primary)' }}>
                  {currentUser.name.split(' ')[0]}
                </span>

                <span style={{
                  fontSize: '0.6875rem',
                  padding: '1px 6px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--bg-app)',
                  color: 'var(--text-muted)'
                }}>
                  {currentUser.role === 'STUDENT' ? 'Student' : currentUser.role === 'ORGANIZER' ? 'Club Lead' : 'Dean (DSA)'}
                </span>

                <ChevronDown size={13} color="var(--text-muted)" />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: '270px',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)',
                  padding: '0.5rem',
                  zIndex: 1001,
                  animation: 'scaleUp 150ms var(--ease-spring)'
                }}>
                  {/* Student Info Card */}
                  <div style={{
                    padding: '0.75rem',
                    backgroundColor: 'var(--bg-surface)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                        color: '#FFFFFF',
                        fontWeight: 800,
                        fontSize: '0.8125rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {getInitials(currentUser.name)}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {currentUser.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {currentUser.email}
                        </div>
                        {(currentUser.authProvider === 'GOOGLE' || currentUser.isGoogleVerified) && (
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.6875rem', color: '#4285F4', fontWeight: 600, marginTop: '2px' }}>
                            <GoogleLogo size={11} />
                            <span>Google Account</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '0.5rem' }}>
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        if (currentUser.role === 'STUDENT') navigateTo('student-dashboard');
                        else if (currentUser.role === 'ORGANIZER') navigateTo('organizer-dashboard');
                        else navigateTo('admin-dashboard');
                      }}
                      className="btn btn-ghost btn-sm"
                      style={{ justifyContent: 'flex-start', gap: '0.5rem', width: '100%', fontSize: '0.8125rem' }}
                    >
                      <LayoutDashboard size={15} color="var(--color-primary)" />
                      <span>{currentUser.role === 'STUDENT' ? 'My Passes & Workspace' : currentUser.role === 'ORGANIZER' ? 'Organizer Command Center' : 'Dean DSA Console'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        openRegisterClubModal();
                      }}
                      className="btn btn-ghost btn-sm"
                      style={{ justifyContent: 'flex-start', gap: '0.5rem', width: '100%', fontSize: '0.8125rem', color: 'var(--color-purple)' }}
                    >
                      <Sparkles size={15} />
                      <span>+ List / Register a Club</span>
                    </button>
                  </div>

                  {/* Role Switcher Section */}
                  <div style={{
                    padding: '0.5rem 0.75rem 0.25rem',
                    borderTop: '1px solid var(--border-subtle)',
                    marginTop: '0.25rem'
                  }}>
                    <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.35rem' }}>
                      Switch Role
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {[
                        { role: 'STUDENT', label: '🎓 Student Portal', sub: 'Student Dashboard & Passes' },
                        { role: 'ORGANIZER', label: '🏛️ Club Organizer', sub: 'Club Management & Events' },
                        { role: 'PLATFORM_ADMIN', label: '⚖️ Dean of Student Affairs', sub: 'DSA Admin & Approvals' }
                      ].map(item => (
                        <div
                          key={item.role}
                          onClick={() => {
                            switchRole(item.role);
                            setProfileDropdownOpen(false);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.4rem 0.6rem',
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer',
                            fontSize: '0.8125rem',
                            backgroundColor: currentUser.role === item.role ? 'var(--color-primary-light)' : 'transparent',
                            color: currentUser.role === item.role ? 'var(--color-primary)' : 'var(--text-primary)'
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 600 }}>{item.label}</div>
                            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{item.sub}</div>
                          </div>
                          {currentUser.role === item.role && <Check size={14} />}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Log Out */}
                  <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: '0.5rem', paddingTop: '0.35rem' }}>
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="btn btn-ghost btn-sm"
                      style={{ justifyContent: 'flex-start', gap: '0.5rem', width: '100%', color: 'var(--color-danger)', fontSize: '0.8125rem' }}
                    >
                      <LogOut size={14} />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Direct "My Space" CTA */}
              {currentUser.role === 'STUDENT' ? (
                <button
                  onClick={() => navigateTo('student-dashboard')}
                  className="btn btn-primary btn-sm"
                  style={{ gap: '0.35rem', borderRadius: 'var(--radius-full)', padding: '0.4rem 0.85rem' }}
                >
                  <LayoutDashboard size={14} />
                  <span className="desktop-inline-block">My Space</span>
                  {activeConfirmedTickets > 0 && (
                    <span style={{
                      backgroundColor: 'rgba(255,255,255,0.25)',
                      fontSize: '0.625rem',
                      fontWeight: 800,
                      padding: '1px 5px',
                      borderRadius: '10px'
                    }}>
                      {activeConfirmedTickets}
                    </span>
                  )}
                </button>
              ) : currentUser.role === 'ORGANIZER' ? (
                <button
                  onClick={() => navigateTo('organizer-dashboard')}
                  className="btn btn-primary btn-sm"
                  style={{ 
                    gap: '0.35rem', 
                    borderRadius: 'var(--radius-full)', 
                    backgroundColor: 'var(--color-purple)', 
                    borderColor: 'var(--color-purple)' 
                  }}
                >
                  <LayoutDashboard size={14} />
                  <span className="desktop-inline-block">Club Portal</span>
                </button>
              ) : (
                <button
                  onClick={() => navigateTo('admin-dashboard')}
                  className="btn btn-danger btn-sm"
                  style={{ gap: '0.35rem', borderRadius: 'var(--radius-full)' }}
                >
                  <ShieldCheck size={14} />
                  <span className="desktop-inline-block">Admin Ops</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
        }
        @media (max-width: 600px) {
          .desktop-inline-block {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
