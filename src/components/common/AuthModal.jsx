import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { GoogleLogo } from './GoogleLogo';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  GraduationCap,
  Building2,
  Scale
} from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const { login, loginWithGoogle, signup, addToast, switchRole, openRegisterClubModal } = useApp();

  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [selectedRole, setSelectedRole] = useState('STUDENT'); // 'STUDENT' | 'ORGANIZER' | 'PLATFORM_ADMIN'
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Google Authentication state
  const googleBtnRef = useRef(null);
  const [googlePromptOpen, setGooglePromptOpen] = useState(false);
  const [googleEmailInput, setGoogleEmailInput] = useState('');

  // Sign up state
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    regNumber: '',
    department: 'Computer Science & Engineering',
    year: '1st Year',
    password: ''
  });

  // Google Identity Services (GIS) integration
  useEffect(() => {
    const handleGoogleResponse = (res) => {
      try {
        if (!res?.credential) return;
        const base64Url = res.credential.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const payload = JSON.parse(jsonPayload);
        if (payload?.email) {
          loginWithGoogle({
            email: payload.email,
            name: payload.name,
            picture: payload.picture,
            sub: payload.sub
          });
          onClose();
        }
      } catch (err) {
        console.error("Google authentication error", err);
      }
    };

    const liveClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const isLiveClient = Boolean(liveClientId && !liveClientId.includes('dummy') && liveClientId.includes('.apps.googleusercontent.com'));

    if (window.google?.accounts?.id && isOpen && selectedRole === 'STUDENT' && isLiveClient) {
      try {
        window.google.accounts.id.initialize({
          client_id: liveClientId,
          callback: handleGoogleResponse,
          auto_select: false
        });

        if (googleBtnRef.current) {
          googleBtnRef.current.innerHTML = '';
          window.google.accounts.id.renderButton(googleBtnRef.current, {
            theme: 'outline',
            size: 'large',
            text: 'signin_with',
            shape: 'rectangular',
            width: 380,
            logo_alignment: 'left'
          });
        }
      } catch (e) {
        // Handled silently
      }
    }
  }, [isOpen, selectedRole, mode]);

  if (!isOpen) return null;

  const handleRoleTabChange = (role) => {
    setSelectedRole(role);
    setError('');
    setIdentifier('');
    setPassword('');
    setGooglePromptOpen(false);
    if (role === 'PLATFORM_ADMIN') {
      setIdentifier('dean.studentaffairs@srmist.edu.in');
      setPassword('dean2026');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError(selectedRole === 'STUDENT' 
        ? 'Please enter your Student ID or Registration Number.' 
        : 'Please enter your institutional ID.');
      return;
    }

    const res = login(identifier.trim(), password, selectedRole);
    if (res.success) {
      onClose();
    } else {
      setError(res.message || 'Invalid credentials');
    }
  };

  const handleGoogleSignInClick = () => {
    const liveClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const isLiveClient = Boolean(liveClientId && !liveClientId.includes('dummy') && liveClientId.includes('.apps.googleusercontent.com'));

    if (window.google?.accounts?.id && isLiveClient) {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          setGooglePromptOpen(true);
        }
      });
    } else {
      setGooglePromptOpen(true);
    }
  };

  const handleGoogleEmailSubmit = (e) => {
    e.preventDefault();
    if (!googleEmailInput.trim().includes('@')) {
      setError('Please enter a valid Google email address.');
      return;
    }
    loginWithGoogle({
      email: googleEmailInput.trim()
    });
    onClose();
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!signUpData.email.includes('@srmist.edu.in') && !signUpData.email.includes('@srm')) {
      setError('Please use a valid SRM University institutional email (@srmist.edu.in).');
      return;
    }

    if (!signUpData.regNumber.toUpperCase().startsWith('RA')) {
      setError('Registration number must begin with RA (e.g. RA2211003010142).');
      return;
    }

    const res = signup(signUpData);
    if (res.success) {
      onClose();
    } else {
      setError(res.message || 'Could not create account');
    }
  };

  const handleQuickLogin = (role) => {
    switchRole(role);
    onClose();
  };

  const handleOpenClubRegistration = () => {
    onClose();
    openRegisterClubModal();
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 10003, overflowY: 'auto' }}>
      <div 
        className="modal-content" 
        style={{ 
          maxWidth: '490px', 
          width: '100%',
          padding: 0, 
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
          overflow: 'hidden' 
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Banner */}
        <div style={{
          padding: '1.75rem 2rem 1.25rem',
          backgroundColor: 'var(--bg-surface-elevated)',
          borderBottom: '1px solid var(--border-subtle)',
          position: 'relative',
          flexShrink: 0
        }}>
          <button 
            onClick={onClose} 
            className="btn btn-ghost btn-icon-only"
            style={{ position: 'absolute', top: '14px', right: '14px' }}
          >
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.5rem' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <GraduationCap size={20} />
            </div>
            <span style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              SRM <span style={{ color: 'var(--color-primary)' }}>PULSE</span>
            </span>
          </div>

          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
            {mode === 'login' ? 'Campus Authentication' : 'Create Student Account'}
          </h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            {mode === 'login' 
              ? 'Sign in with your Student ID or Google account' 
              : 'Join the campus opportunity network for SRM students'}
          </p>

          {/* Mode Switcher Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); setGooglePromptOpen(false); }}
              className="btn btn-sm"
              style={{
                flex: 1,
                backgroundColor: mode === 'login' ? 'var(--color-primary)' : 'var(--bg-surface)',
                color: mode === 'login' ? '#FFFFFF' : 'var(--text-secondary)',
                fontWeight: mode === 'login' ? 700 : 500
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setError(''); setGooglePromptOpen(false); }}
              className="btn btn-sm"
              style={{
                flex: 1,
                backgroundColor: mode === 'signup' ? 'var(--color-primary)' : 'var(--bg-surface)',
                color: mode === 'signup' ? '#FFFFFF' : 'var(--text-secondary)',
                fontWeight: mode === 'signup' ? 700 : 500
              }}
            >
              New Student Sign Up
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ 
          padding: '1.75rem 2rem', 
          overflowY: 'auto', 
          flex: 1, 
          WebkitOverflowScrolling: 'touch' 
        }}>
          {error && (
            <div style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid var(--color-danger)',
              color: 'var(--color-danger)',
              fontSize: '0.8125rem',
              marginBottom: '1.25rem'
            }}>
              {error}
            </div>
          )}

          {mode === 'login' ? (
            /* Log In Form */
            <div>
              {/* Role Selection Tabs */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Select Authentication Role:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
                  <button
                    type="button"
                    onClick={() => handleRoleTabChange('STUDENT')}
                    className="btn btn-sm"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '0.6rem 0.35rem',
                      gap: '4px',
                      backgroundColor: selectedRole === 'STUDENT' ? 'var(--color-primary-light)' : 'var(--bg-surface-elevated)',
                      color: selectedRole === 'STUDENT' ? 'var(--color-primary)' : 'var(--text-secondary)',
                      border: selectedRole === 'STUDENT' ? '1.5px solid var(--color-primary)' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.75rem',
                      fontWeight: selectedRole === 'STUDENT' ? 700 : 500
                    }}
                  >
                    <GraduationCap size={16} />
                    <span>Student</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleTabChange('ORGANIZER')}
                    className="btn btn-sm"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '0.6rem 0.35rem',
                      gap: '4px',
                      backgroundColor: selectedRole === 'ORGANIZER' ? 'var(--color-primary-light)' : 'var(--bg-surface-elevated)',
                      color: selectedRole === 'ORGANIZER' ? 'var(--color-primary)' : 'var(--text-secondary)',
                      border: selectedRole === 'ORGANIZER' ? '1.5px solid var(--color-primary)' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.75rem',
                      fontWeight: selectedRole === 'ORGANIZER' ? 700 : 500
                    }}
                  >
                    <Building2 size={16} />
                    <span>Club Organizer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleTabChange('PLATFORM_ADMIN')}
                    className="btn btn-sm"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '0.6rem 0.35rem',
                      gap: '4px',
                      backgroundColor: selectedRole === 'PLATFORM_ADMIN' ? 'var(--color-primary-light)' : 'var(--bg-surface-elevated)',
                      color: selectedRole === 'PLATFORM_ADMIN' ? 'var(--color-primary)' : 'var(--text-secondary)',
                      border: selectedRole === 'PLATFORM_ADMIN' ? '1.5px solid var(--color-primary)' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.75rem',
                      fontWeight: selectedRole === 'PLATFORM_ADMIN' ? 700 : 500
                    }}
                  >
                    <Scale size={16} />
                    <span>Dean / DSA</span>
                  </button>
                </div>
              </div>

              {/* Student ID / Institutional ID Login Form (Primary) */}
              <form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <label className="form-label">
                    {selectedRole === 'STUDENT' && 'Student Name, ID, or Registration Number'}
                    {selectedRole === 'ORGANIZER' && 'Club Official NetID or Lead Email'}
                    {selectedRole === 'PLATFORM_ADMIN' && 'Directorate / Dean Official NetID'}
                  </label>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={
                      selectedRole === 'STUDENT'
                        ? 'e.g. Keshav Arora, RA2211003010142, or email'
                        : selectedRole === 'ORGANIZER'
                        ? 'e.g. club.lead@srmist.edu.in'
                        : 'dean.studentaffairs@srmist.edu.in'
                    }
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label className="form-label">Password</label>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', cursor: 'pointer' }}>
                      Forgot password?
                    </span>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="form-input"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }}
                >
                  <span>
                    {selectedRole === 'STUDENT' ? 'Sign In with Student ID' : selectedRole === 'ORGANIZER' ? 'Sign In as Club Organizer' : 'Sign In as Dean of Student Affairs'}
                  </span>
                  <ArrowRight size={16} />
                </button>
              </form>

              {/* Google Authentication Service (For Students) */}
              {selectedRole === 'STUDENT' && (
                <div style={{ marginTop: '1.25rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '0.875rem',
                    color: 'var(--text-muted)',
                    fontSize: '0.75rem'
                  }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-subtle)' }} />
                    <span style={{ padding: '0 0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Or sign in with Google
                    </span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-subtle)' }} />
                  </div>

                  {/* Google Identity Services Container */}
                  <div 
                    ref={googleBtnRef} 
                    style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
                  >
                    <button
                      type="button"
                      onClick={handleGoogleSignInClick}
                      className="btn"
                      style={{
                        width: '100%',
                        backgroundColor: '#FFFFFF',
                        color: '#1F2937',
                        border: '1px solid #D1D5DB',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        padding: '0.625rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        cursor: 'pointer'
                      }}
                    >
                      <GoogleLogo size={18} />
                      <span>Sign in with Google</span>
                    </button>
                  </div>

                  {googlePromptOpen && (
                    <div style={{
                      marginTop: '0.75rem',
                      padding: '0.875rem 1rem',
                      backgroundColor: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-md)'
                    }}>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <GoogleLogo size={15} />
                        <span>Google Authentication</span>
                      </div>
                      <form onSubmit={handleGoogleEmailSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                          type="email"
                          placeholder="Enter your Google email"
                          value={googleEmailInput}
                          onChange={(e) => setGoogleEmailInput(e.target.value)}
                          className="form-input"
                          style={{ fontSize: '0.8125rem', padding: '0.4rem 0.6rem', flex: 1 }}
                          required
                          autoFocus
                        />
                        <button type="submit" className="btn btn-primary btn-sm">
                          Continue
                        </button>
                        <button type="button" onClick={() => setGooglePromptOpen(false)} className="btn btn-ghost btn-sm">
                          Cancel
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {/* Quick Demo Access for Testing */}
              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, textAlign: 'center', marginBottom: '0.625rem' }}>
                  ⚡ Quick Demo Access
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('STUDENT')}
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%', justifyContent: 'space-between', textAlign: 'left' }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.8125rem' }}>🎓 Keshav Arora (Student)</div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>RA2211003010142 • 3rd Year CSE</div>
                    </div>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--color-primary)', fontWeight: 700 }}>Log In →</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('ORGANIZER')}
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%', justifyContent: 'space-between', textAlign: 'left' }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.8125rem' }}>🏛️ Aarav Sharma (Club Lead)</div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>SRM Coding Club • Event Organizer</div>
                    </div>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--color-purple)', fontWeight: 700 }}>Log In →</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('PLATFORM_ADMIN')}
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%', justifyContent: 'space-between', textAlign: 'left' }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.8125rem' }}>⚖️ Prof. S. Ramachandran (Dean / DSA)</div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Dean of Student Affairs • Event & Club Approvals</div>
                    </div>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--color-danger)', fontWeight: 700 }}>Log In →</span>
                  </button>
                </div>
              </div>

              {/* Club Registration Shortcut */}
              <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Want to register a new student club? </span>
                <button
                  type="button"
                  onClick={handleOpenClubRegistration}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--color-primary)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  List your club here →
                </button>
              </div>
            </div>
          ) : (
            /* Sign Up Form */
            <div>
              <form onSubmit={handleSignUpSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Aryan Sharma"
                    value={signUpData.name}
                    onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label">SRM Email</label>
                    <input
                      type="email"
                      placeholder="as1234@srmist.edu.in"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Registration No</label>
                    <input
                      type="text"
                      placeholder="RA2311003010450"
                      value={signUpData.regNumber}
                      onChange={(e) => setSignUpData({ ...signUpData, regNumber: e.target.value })}
                      className="form-input font-mono"
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label">Department</label>
                    <select
                      value={signUpData.department}
                      onChange={(e) => setSignUpData({ ...signUpData, department: e.target.value })}
                      className="form-select"
                    >
                      <option value="Computer Science & Engineering">CSE</option>
                      <option value="Computing Technologies (CINTEL)">CINTEL / AI & DS</option>
                      <option value="Data Science & Business Systems">DSBS</option>
                      <option value="Information Technology">IT</option>
                      <option value="Electronics & Communication (ECE)">ECE</option>
                      <option value="Mechanical Engineering">Mechanical</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Year</label>
                    <select
                      value={signUpData.year}
                      onChange={(e) => setSignUpData({ ...signUpData, year: e.target.value })}
                      className="form-select"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    placeholder="At least 6 characters"
                    value={signUpData.password}
                    onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }}
                >
                  <span>Create Student Account</span>
                  <Check size={16} />
                </button>
              </form>

              {/* Google Sign Up Alternative */}
              <div style={{ marginTop: '1.25rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '0.875rem',
                  color: 'var(--text-muted)',
                  fontSize: '0.75rem'
                }}>
                  <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-subtle)' }} />
                  <span style={{ padding: '0 0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Or sign up with Google
                  </span>
                  <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-subtle)' }} />
                </div>

                {!googlePromptOpen ? (
                  <button
                    type="button"
                    onClick={handleGoogleSignInClick}
                    className="btn"
                    style={{
                      width: '100%',
                      backgroundColor: '#FFFFFF',
                      color: '#1F2937',
                      border: '1px solid #D1D5DB',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.75rem',
                      padding: '0.625rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                      cursor: 'pointer'
                    }}
                  >
                    <GoogleLogo size={18} />
                    <span>Sign up with Google</span>
                  </button>
                ) : (
                  <div style={{
                    padding: '0.875rem 1rem',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)'
                  }}>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <GoogleLogo size={15} />
                      <span>Google Account Sign-Up</span>
                    </div>
                    <form onSubmit={handleGoogleEmailSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        type="email"
                        placeholder="Enter your Google email"
                        value={googleEmailInput}
                        onChange={(e) => setGoogleEmailInput(e.target.value)}
                        className="form-input"
                        style={{ fontSize: '0.8125rem', padding: '0.4rem 0.6rem', flex: 1 }}
                        required
                        autoFocus
                      />
                      <button type="submit" className="btn btn-primary btn-sm">
                        Continue
                      </button>
                      <button type="button" onClick={() => setGooglePromptOpen(false)} className="btn btn-ghost btn-sm">
                        Cancel
                      </button>
                    </form>
                  </div>
                )}
              </div>

              <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Are you a club lead? </span>
                <button
                  type="button"
                  onClick={handleOpenClubRegistration}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--color-primary)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Register your student organization →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
