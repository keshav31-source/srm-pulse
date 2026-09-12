import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { MobileNav } from './components/common/MobileNav';
import { Footer } from './components/common/Footer';
import { QuickSearchModal } from './components/common/QuickSearchModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { Toast } from './components/common/Toast';

// Event Modals
import { RegistrationModal } from './components/events/RegistrationModal';
import { DigitalPassModal } from './components/events/DigitalPassModal';
import { ShareModal } from './components/events/ShareModal';
import { ReportModal } from './components/events/ReportModal';

// Views
import { LandingView } from './views/LandingView';
import { ExploreView } from './views/ExploreView';
import { EventDetailView } from './views/EventDetailView';
import { HappeningNowView } from './views/HappeningNowView';
import { ClubsView } from './views/ClubsView';
import { ClubDetailView } from './views/ClubDetailView';
import { StudentDashboardView } from './views/StudentDashboardView';
import { OrganizerDashboardView } from './views/OrganizerDashboardView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { CampusCalendar } from './components/calendar/CampusCalendar';
import { AuthModal } from './components/common/AuthModal';
import { RegisterClubModal } from './components/organizer/RegisterClubModal';

export function App() {
  const { 
    currentView, 
    selectedEventId, 
    selectedClubId,
    authModalOpen,
    authModalMode,
    closeAuthModal,
    registerClubOpen,
    closeRegisterClubModal
  } = useApp();

  // Modal states
  const [activeRegisterEvent, setActiveRegisterEvent] = useState(null);
  const [activeShareEvent, setActiveShareEvent] = useState(null);
  const [activePassData, setActivePassData] = useState(null); // { registration, event }
  const [activeReportEvent, setActiveReportEvent] = useState(null);

  const handleRegisterClick = (event) => {
    setActiveRegisterEvent(event);
  };

  const handleShareClick = (event) => {
    setActiveShareEvent(event);
  };

  const handleViewPassClick = (registration, event) => {
    setActivePassData({ registration, event });
  };

  const handleReportClick = (event) => {
    setActiveReportEvent(event);
  };

  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return (
          <LandingView 
            onRegisterClick={handleRegisterClick} 
            onShareClick={handleShareClick} 
          />
        );
      case 'explore':
        return (
          <ExploreView 
            onRegisterClick={handleRegisterClick} 
            onShareClick={handleShareClick} 
          />
        );
      case 'event-detail':
        return (
          <EventDetailView 
            eventId={selectedEventId}
            onRegisterClick={handleRegisterClick}
            onShareClick={handleShareClick}
            onViewPassClick={handleViewPassClick}
            onReportClick={handleReportClick}
          />
        );
      case 'happening-now':
        return (
          <HappeningNowView 
            onRegisterClick={handleRegisterClick}
            onShareClick={handleShareClick}
          />
        );
      case 'clubs':
        return <ClubsView />;
      case 'club-detail':
        return (
          <ClubDetailView 
            clubId={selectedClubId}
            onRegisterClick={handleRegisterClick}
            onShareClick={handleShareClick}
          />
        );
      case 'student-dashboard':
        return (
          <StudentDashboardView 
            onRegisterClick={handleRegisterClick}
            onShareClick={handleShareClick}
            onViewPassClick={handleViewPassClick}
          />
        );
      case 'organizer-dashboard':
        return <OrganizerDashboardView />;
      case 'admin-dashboard':
        return <AdminDashboardView />;
      case 'calendar':
        return <CampusCalendar />;
      default:
        return (
          <LandingView 
            onRegisterClick={handleRegisterClick} 
            onShareClick={handleShareClick} 
          />
        );
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content View */}
      <main className="app-main">
        {renderActiveView()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav />

      {/* Global Quick Search Modal (Cmd+K) */}
      <QuickSearchModal />

      {/* Global Notification Drawer */}
      <NotificationDrawer />

      {/* Floating Toast Container */}
      <Toast />

      {/* Registration Modal */}
      {activeRegisterEvent && (
        <RegistrationModal
          event={activeRegisterEvent}
          onClose={() => setActiveRegisterEvent(null)}
          onSuccess={(registration) => {
            setActivePassData({ registration, event: activeRegisterEvent });
          }}
        />
      )}

      {/* Digital Pass / Ticket Modal */}
      {activePassData && (
        <DigitalPassModal
          registration={activePassData.registration}
          event={activePassData.event}
          onClose={() => setActivePassData(null)}
        />
      )}

      {/* Share / Flyer Modal */}
      {activeShareEvent && (
        <ShareModal
          event={activeShareEvent}
          onClose={() => setActiveShareEvent(null)}
        />
      )}

      {/* Spam / Content Report Modal */}
      {activeReportEvent && (
        <ReportModal
          event={activeReportEvent}
          onClose={() => setActiveReportEvent(null)}
        />
      )}

      {/* Student & Organization Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={closeAuthModal}
        initialMode={authModalMode}
      />

      {/* Club Registration Modal */}
      <RegisterClubModal
        isOpen={registerClubOpen}
        onClose={closeRegisterClubModal}
      />
    </div>
  );
}
export default App;
