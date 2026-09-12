import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_EVENTS,
  CLUBS,
  CATEGORIES,
  INTEREST_TAGS,
  INITIAL_USER,
  INITIAL_REGISTRATIONS,
  INITIAL_CERTIFICATES,
  INITIAL_SAVED_EVENT_IDS,
  INITIAL_NOTIFICATIONS,
  INITIAL_DISCUSSIONS,
  INITIAL_REPORTS
} from '../data/seedData';
import { CAMPUS_BUILDINGS } from '../data/campusBuildings';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation state (Map feature removed per user request)
  const [currentView, setCurrentView] = useState('home');
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedClubId, setSelectedClubId] = useState(null);

  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('srm_pulse_v3_logged_in');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [registerClubOpen, setRegisterClubOpen] = useState(false);
  const [organizerActiveClubId, setOrganizerActiveClubId] = useState('srm-coding-club');

  const openRegisterClubModal = () => setRegisterClubOpen(true);
  const closeRegisterClubModal = () => setRegisterClubOpen(false);

  // User & Role state ('STUDENT' | 'ORGANIZER' | 'PLATFORM_ADMIN')
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('srm_pulse_v3_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  // Core collections with localStorage persistence (v3 keys to ensure fresh clean seed data)
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('srm_pulse_v3_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [clubs, setClubs] = useState(() => {
    const saved = localStorage.getItem('srm_pulse_v3_clubs');
    return saved ? JSON.parse(saved) : CLUBS;
  });

  const [registrations, setRegistrations] = useState(() => {
    const saved = localStorage.getItem('srm_pulse_v3_registrations');
    return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
  });

  const [savedEventIds, setSavedEventIds] = useState(() => {
    const saved = localStorage.getItem('srm_pulse_v3_saved');
    return saved ? JSON.parse(saved) : INITIAL_SAVED_EVENT_IDS;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('srm_pulse_v3_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [discussions, setDiscussions] = useState(() => {
    const saved = localStorage.getItem('srm_pulse_v3_discussions');
    return saved ? JSON.parse(saved) : INITIAL_DISCUSSIONS;
  });

  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem('srm_pulse_v3_reports');
    return saved ? JSON.parse(saved) : INITIAL_REPORTS;
  });

  const [certificates, setCertificates] = useState(() => {
    const saved = localStorage.getItem('srm_pulse_v3_certificates');
    return saved ? JSON.parse(saved) : INITIAL_CERTIFICATES;
  });

  // Global UI states
  const [searchQuery, setSearchQuery] = useState('');
  const [quickSearchOpen, setQuickSearchOpen] = useState(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('srm_pulse_v3_logged_in', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('srm_pulse_v3_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('srm_pulse_v3_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('srm_pulse_v3_clubs', JSON.stringify(clubs));
  }, [clubs]);

  useEffect(() => {
    localStorage.setItem('srm_pulse_v3_registrations', JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem('srm_pulse_v3_saved', JSON.stringify(savedEventIds));
  }, [savedEventIds]);

  useEffect(() => {
    localStorage.setItem('srm_pulse_v3_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('srm_pulse_v3_discussions', JSON.stringify(discussions));
  }, [discussions]);

  useEffect(() => {
    localStorage.setItem('srm_pulse_v3_reports', JSON.stringify(reports));
  }, [reports]);

  // Toast dispatch helper
  const addToast = (title, message = '', type = 'info') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4200);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Auth Handlers
  const openLoginModal = () => {
    setAuthModalMode('login');
    setAuthModalOpen(true);
  };

  const openSignUpModal = () => {
    setAuthModalMode('signup');
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const login = (identifier, password, roleHint) => {
    let user = { ...INITIAL_USER };
    const idLower = identifier.toLowerCase();

    if (roleHint === 'PLATFORM_ADMIN' || idLower.includes('dean') || idLower.includes('dsa') || idLower.includes('admin')) {
      user.role = 'PLATFORM_ADMIN';
      user.name = "Prof. S. Ramachandran";
      user.title = "Dean of Student Affairs (DSA)";
      user.email = identifier.includes('@') ? identifier : "dean.studentaffairs@srmist.edu.in";
      user.department = "Directorate of Student Affairs, SRMIST";
      user.regNumber = "EMP-DSA-001";
      setCurrentView('admin-dashboard');
      addToast('Dean Access Granted ⚖️', 'Signed in to Directorate of Student Affairs Admin Console.', 'success');
    } else if (roleHint === 'ORGANIZER' || idLower.includes('organizer') || idLower.includes('lead') || idLower.includes('coding') || idLower.includes('club')) {
      user.role = 'ORGANIZER';
      const cleanName = identifier.includes('@')
        ? identifier.split('@')[0].split(/[._]/).filter(Boolean).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
        : "Club Organizer";
      user.name = cleanName || "Club Organizer";
      user.title = "Lead Club Organizer";
      user.email = identifier.includes('@') ? identifier : `${identifier}@srmist.edu.in`;
      user.regNumber = identifier.toUpperCase().startsWith('RA') ? identifier.toUpperCase() : "RA2111003010290";
      user.department = "Computing Technologies (CINTEL)";
      user.year = "4th Year";
      user.managedClubIds = ["srm-coding-club"];
      user.activeClubId = "srm-coding-club";
      setOrganizerActiveClubId("srm-coding-club");
      setCurrentView('organizer-dashboard');
      addToast('Club Organizer Access 🏛️', `Welcome, ${user.name} (Club Lead).`, 'success');
    } else {
      user.role = 'STUDENT';
      const cleanName = identifier.includes('@')
        ? identifier.split('@')[0].split(/[._]/).filter(Boolean).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
        : identifier.toUpperCase().startsWith('RA') ? `Student (${identifier.toUpperCase()})` : identifier;
      user.name = cleanName || "SRM Student";
      user.title = "Student";
      user.email = identifier.includes('@') ? identifier : `${identifier}@srmist.edu.in`;
      user.regNumber = identifier.toUpperCase().startsWith('RA') ? identifier.toUpperCase() : "RA2311003010142";
      user.department = "Computer Science & Engineering";
      user.year = "3rd Year";
      setCurrentView('student-dashboard');
      addToast('Student Session Active 🎓', `Welcome back, ${user.name}.`, 'success');
    }

    setCurrentUser(user);
    setIsLoggedIn(true);
    return { success: true, user };
  };

  const signup = (studentData) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      name: studentData.name,
      role: 'STUDENT',
      email: studentData.email,
      regNumber: studentData.regNumber,
      department: studentData.department,
      year: studentData.year,
      phone: "+91 98765 00000",
      avatar: null,
      bio: `SRM ${studentData.year} student pursuing ${studentData.department}. Excited to explore campus hackathons and workshops!`,
      interests: ["AI/ML", "Web Development", "Hackathons"],
      isProfilePublic: true,
      followedClubIds: ["srm-coding-club", "gdsc-srm"]
    };

    setCurrentUser(newUser);
    setIsLoggedIn(true);
    setCurrentView('student-dashboard');
    addToast('Account Created! 🎉', `Welcome to SRM Pulse, ${studentData.name}`, 'success');
    return { success: true, user: newUser };
  };

  const loginWithGoogle = (googleData = {}) => {
    const email = (googleData.email || 'student@srmist.edu.in').trim();
    const emailPrefix = email.split('@')[0];
    
    // Inferred student name if not provided
    const inferredName = (googleData.name && googleData.name.trim()) || emailPrefix
      .split(/[._0-9]/)
      .filter(Boolean)
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ') || 'SRM Student';

    // Inferred or generated SRM Registration number (e.g. RA2311...)
    const regNumber = (googleData.regNumber && googleData.regNumber.trim()) || 
      (emailPrefix.toUpperCase().startsWith('RA') ? emailPrefix.toUpperCase() : `RA2311003010${Math.floor(100 + Math.random() * 900)}`);

    const user = {
      id: `usr-google-${Date.now()}`,
      name: inferredName,
      role: 'STUDENT',
      authProvider: 'GOOGLE',
      isGoogleVerified: true,
      email: email,
      regNumber: regNumber,
      department: googleData.department || 'Computer Science & Engineering',
      year: googleData.year || '2nd Year',
      phone: googleData.phone || '+91 98765 00000',
      avatar: null, // Per user instruction, no photos; initial badge is used
      bio: `SRM student authenticated via Google account (${email}).`,
      interests: ['AI/ML', 'Web Development', 'Hackathons', 'Competitive Programming'],
      isProfilePublic: true,
      followedClubIds: ['srm-coding-club', 'gdsc-srm']
    };

    setCurrentUser(user);
    setIsLoggedIn(true);
    setCurrentView('student-dashboard');
    addToast('Google Sign-In Successful! 🎓', `Authenticated with Google as ${user.name} (${email}).`, 'success');
    return { success: true, user };
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentView('home');
    addToast('Logged Out', 'You have been signed out of your SRM session.', 'info');
  };

  // Role Switcher for seamless paired testing
  const switchRole = (newRole, targetClubId) => {
    setIsLoggedIn(true);
    setCurrentUser(prev => {
      let updated = { ...prev, role: newRole, avatar: null };
      if (newRole === 'ORGANIZER') {
        updated.name = prev.name && prev.role === 'ORGANIZER' ? prev.name : "Club Organizer";
        updated.email = "club.lead@srmist.edu.in";
        updated.regNumber = "RA2111003010290";
        updated.department = "Computing Technologies (CINTEL)";
        updated.year = "4th Year";
        updated.managedClubIds = prev.managedClubIds || ["srm-coding-club"];
        updated.activeClubId = targetClubId || updated.managedClubIds[0] || "srm-coding-club";
        setOrganizerActiveClubId(updated.activeClubId);
        setCurrentView('organizer-dashboard');
      } else if (newRole === 'PLATFORM_ADMIN') {
        updated.name = "Prof. S. Ramachandran";
        updated.title = "Dean of Student Affairs (DSA)";
        updated.email = "dean.studentaffairs@srmist.edu.in";
        updated.department = "Directorate of Student Affairs, SRMIST";
        setCurrentView('admin-dashboard');
      } else {
        updated.name = prev.name && prev.role === 'STUDENT' ? prev.name : "SRM Student";
        updated.email = "student@srmist.edu.in";
        updated.regNumber = "RA2311003010142";
        updated.department = "Computer Science & Engineering";
        updated.year = "3rd Year";
        setCurrentView('student-dashboard');
      }
      return updated;
    });

    const roleName = newRole === 'STUDENT' ? 'Student' : newRole === 'ORGANIZER' ? 'Club Organizer' : 'Dean of Student Affairs';
    addToast(`Switched to ${roleName}`, `Active view updated for ${roleName}.`, 'info');
  };

  // Register a New Club / Student Organization
  const registerClub = (clubData) => {
    const newId = clubData.id || `club-${Date.now()}`;
    const newClub = {
      id: newId,
      name: clubData.name,
      category: clubData.category || 'Technical',
      tagline: clubData.tagline || 'Student organization at SRM University',
      description: clubData.description || '',
      department: clubData.department || 'School of Computing',
      facultyAdvisor: clubData.facultyAdvisor || 'Faculty Advisor, SRMIST',
      advisorEmail: clubData.advisorEmail || '',
      logo: clubData.logo || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=200&auto=format&fit=crop&q=80',
      banner: clubData.banner || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
      verified: currentUser.role === 'PLATFORM_ADMIN',
      status: currentUser.role === 'PLATFORM_ADMIN' ? 'approved' : 'pending_verification',
      memberCount: 1,
      followerCount: 1,
      recruitmentStatus: clubData.recruitmentStatus || 'Open for Core Team',
      socialLinks: {
        instagram: clubData.instagram || '',
        github: clubData.github || '',
        discord: clubData.discord || '',
        website: clubData.website || ''
      },
      leads: [
        {
          name: clubData.leadName || currentUser.name,
          role: "President / Founder",
          email: clubData.leadEmail || currentUser.email
        }
      ]
    };

    setClubs(prev => [newClub, ...prev]);
    setOrganizerActiveClubId(newId);

    // Automatically elevate session to ORGANIZER so user can immediately create events
    setCurrentUser(prev => ({
      ...prev,
      role: 'ORGANIZER',
      name: clubData.leadName || prev.name,
      email: clubData.leadEmail || prev.email,
      managedClubIds: [...(prev.managedClubIds || ['srm-coding-club']), newId],
      activeClubId: newId
    }));

    addToast(
      'Club Listed Successfully! 🏛️',
      `"${newClub.name}" has been registered. You can now publish events for your club!`,
      'success'
    );

    setCurrentView('organizer-dashboard');
    return newClub;
  };

  // Check for Event Conflict
  const checkConflict = (targetEvent) => {
    const confirmedRegistrations = registrations.filter(
      r => r.status === 'CONFIRMED' && r.eventId !== targetEvent.id
    );

    for (const reg of confirmedRegistrations) {
      const regEvt = events.find(e => e.id === reg.eventId);
      if (!regEvt) continue;

      if (regEvt.date === targetEvent.date) {
        const parseTime = (tStr) => {
          const [h, m] = (tStr || "00:00").split(':').map(Number);
          return h * 60 + m;
        };

        const startA = parseTime(targetEvent.startTime);
        const endA = parseTime(targetEvent.endTime || targetEvent.startTime);
        const startB = parseTime(regEvt.startTime);
        const endB = parseTime(regEvt.endTime || regEvt.startTime);

        if (Math.max(startA, startB) < Math.min(endA, endB)) {
          return { hasConflict: true, conflictingEvent: regEvt };
        }
      }
    }
    return { hasConflict: false, conflictingEvent: null };
  };

  // Register for Event
  const registerForEvent = (eventId, formAnswers = {}, forceBypassConflict = false) => {
    if (!isLoggedIn) {
      openLoginModal();
      return { success: false, message: "Please sign in with your SRM NetID to register." };
    }

    const event = events.find(e => e.id === eventId);
    if (!event) return { success: false, message: "Event not found" };

    const existing = registrations.find(r => r.eventId === eventId && (r.status === 'CONFIRMED' || r.status === 'WAITLISTED'));
    if (existing) {
      return { success: false, message: "You are already registered for this event." };
    }

    if (!forceBypassConflict) {
      const conflictResult = checkConflict(event);
      if (conflictResult.hasConflict) {
        return {
          conflict: true,
          conflictingEvent: conflictResult.conflictingEvent
        };
      }
    }

    const isFull = event.registeredCount >= event.capacity;
    const isWaitlist = isFull;
    const ticketCode = `SRM-${event.category.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newReg = {
      id: `reg-${Date.now()}`,
      eventId,
      ticketCode,
      registeredAt: new Date().toISOString(),
      status: isWaitlist ? 'WAITLISTED' : 'CONFIRMED',
      attendedAt: null,
      answers: formAnswers
    };

    setRegistrations(prev => [newReg, ...prev]);

    setEvents(prev => prev.map(e => {
      if (e.id === eventId) {
        return {
          ...e,
          registeredCount: isWaitlist ? e.registeredCount : e.registeredCount + 1,
          waitlistCount: isWaitlist ? e.waitlistCount + 1 : e.waitlistCount
        };
      }
      return e;
    }));

    const newNotif = {
      id: `notif-${Date.now()}`,
      type: 'registration',
      title: isWaitlist ? `Joined Waitlist: ${event.title}` : `Registration Confirmed: ${event.title}`,
      message: isWaitlist
        ? `You are #${event.waitlistCount + 1} on the waitlist.`
        : `Your pass ${ticketCode} is ready. Venue: ${event.venueName}, ${event.room}.`,
      time: 'Just now',
      read: false,
      eventId
    };
    setNotifications(prev => [newNotif, ...prev]);

    addToast(
      isWaitlist ? 'Added to Waitlist' : 'Registration Confirmed! 🎉',
      isWaitlist ? 'You will be notified if a spot opens up.' : `Ticket code: ${ticketCode}`,
      isWaitlist ? 'warning' : 'success'
    );

    return { success: true, isWaitlist, registration: newReg };
  };

  // Cancel Registration
  const cancelRegistration = (eventId) => {
    const reg = registrations.find(r => r.eventId === eventId && r.status === 'CONFIRMED');
    if (!reg) return;

    setRegistrations(prev => prev.map(r => r.id === reg.id ? { ...r, status: 'CANCELLED' } : r));

    const waitlistedReg = registrations.find(r => r.eventId === eventId && r.status === 'WAITLISTED');

    setEvents(prev => prev.map(e => {
      if (e.id === eventId) {
        if (waitlistedReg) {
          return { ...e, waitlistCount: Math.max(0, e.waitlistCount - 1) };
        } else {
          return { ...e, registeredCount: Math.max(0, e.registeredCount - 1) };
        }
      }
      return e;
    }));

    if (waitlistedReg) {
      setRegistrations(prev => prev.map(r => r.id === waitlistedReg.id ? { ...r, status: 'CONFIRMED' } : r));
      addToast('Seat Offered to Waitlist', 'The first waitlisted student has been automatically promoted.', 'info');
    }

    addToast('Registration Cancelled', 'Your seat has been released.', 'info');
  };

  // Toggle Bookmark
  const toggleBookmark = (eventId) => {
    const isSaved = savedEventIds.includes(eventId);
    if (isSaved) {
      setSavedEventIds(prev => prev.filter(id => id !== eventId));
      addToast('Removed from Saved', '', 'info');
    } else {
      setSavedEventIds(prev => [...prev, eventId]);
      addToast('Saved to My Opportunities 🔖', 'Access it anytime from your dashboard.', 'success');
    }
  };

  // Toggle Follow Club
  const toggleFollowClub = (clubId) => {
    const isFollowed = currentUser.followedClubIds.includes(clubId);
    const updatedIds = isFollowed
      ? currentUser.followedClubIds.filter(id => id !== clubId)
      : [...currentUser.followedClubIds, clubId];

    setCurrentUser(prev => ({ ...prev, followedClubIds: updatedIds }));

    setClubs(prev => prev.map(c => {
      if (c.id === clubId) {
        return {
          ...c,
          followerCount: isFollowed ? Math.max(0, c.followerCount - 1) : c.followerCount + 1
        };
      }
      return c;
    }));

    const club = clubs.find(c => c.id === clubId);
    addToast(
      isFollowed ? `Unfollowed ${club?.name}` : `Following ${club?.name} ⭐`,
      '',
      'info'
    );
  };

  // Mark Attendance via QR code or manual Ticket ID
  const markAttendance = (ticketCode) => {
    const normalized = (ticketCode || '').trim().toUpperCase();
    const reg = registrations.find(r => r.ticketCode === normalized);

    if (!reg) {
      return { success: false, message: `No registration found for ticket: "${ticketCode}"` };
    }

    if (reg.status === 'ATTENDED') {
      return {
        success: false,
        message: `Student has already checked in at ${new Date(reg.attendedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      };
    }

    const attendedTime = new Date().toISOString();

    setRegistrations(prev => prev.map(r => {
      if (r.id === reg.id) {
        return { ...r, status: 'ATTENDED', attendedAt: attendedTime };
      }
      return r;
    }));

    const event = events.find(e => e.id === reg.eventId);

    if (event?.hasCertificate) {
      const newCert = {
        id: `cert-${Date.now()}`,
        eventId: event.id,
        eventName: event.title,
        issuedBy: event.clubName,
        issueDate: new Date().toISOString().split('T')[0],
        credentialId: `SRM-CERT-${new Date().getFullYear()}-${event.category.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
        studentName: currentUser.name,
        regNumber: currentUser.regNumber,
        skills: event.tags || ["Campus Leadership", "Technical Skills"]
      };
      setCertificates(prev => [newCert, ...prev]);
    }

    addToast('Attendance Verified! ✓', `Checked in: ${currentUser.name} (${reg.ticketCode})`, 'success');
    return { success: true, registration: reg, event };
  };

  // Create Event
  const createEvent = (eventData) => {
    const newId = `evt-${Date.now()}`;
    const newEvent = {
      id: newId,
      ...eventData,
      registeredCount: 0,
      waitlistCount: 0,
      viewsCount: 1,
      savesCount: 0,
      status: currentUser.role === 'PLATFORM_ADMIN' ? 'published' : 'pending_approval'
    };

    setEvents(prev => [newEvent, ...prev]);

    if (currentUser.role === 'PLATFORM_ADMIN') {
      addToast('Event Published Directly!', 'Event is live on campus feed.', 'success');
    } else {
      addToast('Submitted for Review', 'Platform admin will review within 24 hours.', 'info');
    }

    return newEvent;
  };

  // Approve Event
  const approveEvent = (eventId) => {
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, status: 'published' } : e));
    const evt = events.find(e => e.id === eventId);
    addToast('Event Approved ✓', `"${evt?.title}" is now publicly visible.`, 'success');
  };

  // Reject Event
  const rejectEvent = (eventId, reason = 'Did not meet campus guidelines.') => {
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, status: 'rejected', rejectionReason: reason } : e));
    addToast('Event Rejected', reason, 'warning');
  };

  // Verify Club
  const verifyClub = (clubId) => {
    setClubs(prev => prev.map(c => c.id === clubId ? { ...c, verified: !c.verified } : c));
    const club = clubs.find(c => c.id === clubId);
    addToast('Club Verification Updated', `${club?.name} verified badge toggled.`, 'info');
  };

  // Q&A
  const addDiscussionQuestion = (eventId, questionText) => {
    if (!questionText.trim()) return;

    const newQ = {
      id: `qa-${Date.now()}`,
      eventId,
      authorName: currentUser.name,
      authorDept: `${currentUser.year} ${currentUser.department}`,
      question: questionText,
      timestamp: 'Just now',
      upvotes: 1,
      replies: []
    };

    setDiscussions(prev => [newQ, ...prev]);
    addToast('Question Posted', 'The organizer will receive an alert to answer.', 'success');
  };

  const addDiscussionReply = (eventId, questionId, replyText) => {
    if (!replyText.trim()) return;
    const isOrganizer = currentUser.role === 'ORGANIZER' || currentUser.role === 'PLATFORM_ADMIN';

    const newReply = {
      id: `rep-${Date.now()}`,
      authorName: currentUser.name,
      authorRole: isOrganizer ? 'Organizer / Core Lead' : `${currentUser.year} Student`,
      isOrganizer,
      content: replyText,
      timestamp: 'Just now'
    };

    setDiscussions(prev => prev.map(q => {
      if (q.id === questionId) {
        return { ...q, replies: [...(q.replies || []), newReply] };
      }
      return q;
    }));

    addToast('Reply Posted', '', 'success');
  };

  const upvoteQuestion = (eventId, questionId) => {
    setDiscussions(prev => prev.map(q => {
      if (q.id === questionId) {
        return { ...q, upvotes: q.upvotes + 1 };
      }
      return q;
    }));
  };

  // Report Event
  const reportEvent = (reportData) => {
    const newReport = {
      id: `rep-${Date.now()}`,
      eventId: reportData.eventId,
      reportedTitle: reportData.title,
      reportedBy: `${currentUser.name} (${currentUser.regNumber})`,
      reason: reportData.reason,
      details: reportData.details,
      timestamp: new Date().toLocaleString(),
      status: 'pending'
    };

    setReports(prev => [newReport, ...prev]);
    addToast('Report Submitted', 'Our campus moderation team will review this notice.', 'info');
  };

  const dismissReport = (reportId) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'dismissed' } : r));
    addToast('Report Dismissed', '', 'info');
  };

  const resolveReport = (reportId, actionTaken) => {
    const report = reports.find(r => r.id === reportId);
    if (report && actionTaken === 'remove_event') {
      setEvents(prev => prev.filter(e => e.id !== report.eventId));
      addToast('Event Removed', 'The reported event has been removed from campus feed.', 'warning');
    }
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'resolved' } : r));
  };

  // Notifications
  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Update Interests
  const updateUserInterests = (newInterests) => {
    setCurrentUser(prev => ({ ...prev, interests: newInterests }));
    addToast('Interests Updated', 'Your feed has been personalized.', 'success');
  };

  // Reset to default
  const resetToDefaultData = () => {
    localStorage.clear();
    setEvents(INITIAL_EVENTS);
    setClubs(CLUBS);
    setCurrentUser(INITIAL_USER);
    setIsLoggedIn(true);
    setRegistrations(INITIAL_REGISTRATIONS);
    setSavedEventIds(INITIAL_SAVED_EVENT_IDS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setDiscussions(INITIAL_DISCUSSIONS);
    setReports(INITIAL_REPORTS);
    setCertificates(INITIAL_CERTIFICATES);
    addToast('Data Reset', 'All campus records restored to fresh state.', 'info');
  };

  // Navigation
  const navigateTo = (view, params = {}) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
    if (params.eventId) setSelectedEventId(params.eventId);
    if (params.clubId) setSelectedClubId(params.clubId);
    if (params.search) setSearchQuery(params.search);
  };

  return (
    <AppContext.Provider value={{
      currentView,
      setCurrentView,
      navigateTo,
      selectedEventId,
      setSelectedEventId,
      selectedClubId,
      setSelectedClubId,
      isLoggedIn,
      openLoginModal,
      openSignUpModal,
      closeAuthModal,
      authModalOpen,
      authModalMode,
      login,
      loginWithGoogle,
      signup,
      logout,
      currentUser,
      switchRole,
      events,
      clubs,
      registerClub,
      registerClubOpen,
      openRegisterClubModal,
      closeRegisterClubModal,
      organizerActiveClubId,
      setOrganizerActiveClubId,
      buildings: CAMPUS_BUILDINGS,
      categories: CATEGORIES,
      interestTags: INTEREST_TAGS,
      registrations,
      savedEventIds,
      notifications,
      discussions,
      reports,
      certificates,
      registerForEvent,
      cancelRegistration,
      toggleBookmark,
      toggleFollowClub,
      markAttendance,
      createEvent,
      approveEvent,
      rejectEvent,
      verifyClub,
      addDiscussionQuestion,
      addDiscussionReply,
      upvoteQuestion,
      reportEvent,
      dismissReport,
      resolveReport,
      markNotificationRead,
      markAllNotificationsRead,
      updateUserInterests,
      resetToDefaultData,
      searchQuery,
      setSearchQuery,
      quickSearchOpen,
      setQuickSearchOpen,
      notificationDrawerOpen,
      setNotificationDrawerOpen,
      toasts,
      addToast,
      removeToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
