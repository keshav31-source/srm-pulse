# 🎓 SRM Pulse — Central Campus Opportunity Platform
> **SRM Institute of Science and Technology (Kattankulathur)**  
> *The single, unified hub to discover hackathons, technical workshops, cultural fests, club recruitments, and student opportunities across the SRM campus.*

---

## 📌 Overview

At SRM University, hundreds of student clubs, teams, and departments host high-impact events every semester. Historically, event announcements were scattered across fragmented WhatsApp groups, Instagram stories, Telegram channels, and physical notice boards. Students frequently missed registration deadlines, while organizers struggled to reach targeted student audiences.

**SRM Pulse** centralizes all campus opportunities into a single, real-time, authenticated web platform featuring role-based workflows for **Students**, **Club Organizers**, and the **Directorate of Student Affairs (DSA)**.

---

## 🚀 How to Access & Run Locally

### 1. Prerequisites
- **Node.js**: `v18.0.0` or higher installed on your machine.
- **Package Manager**: `npm` (comes bundled with Node.js) or `pnpm` / `yarn`.

### 2. Installation Steps

1. **Clone or navigate to the project directory**:
   ```bash
   cd gittask
   ```

2. **Install all dependencies**:
   ```bash
   npm install
   ```

3. **(Optional) Configure Environment Variables**:
   Copy the example environment file if you wish to configure live Google Cloud OAuth credentials:
   ```bash
   cp .env.example .env
   ```
   *(By default, the platform runs with full built-in authentication and in-app Google verification without requiring any external keys!)*

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

5. **Open in Your Browser**:
   Visit the local URL shown in your terminal (typically):
   ```
   http://127.0.0.1:5173/
   ```
   or
   ```
   http://localhost:5173/
   ```

### 3. Production Build & Preview
To test a production bundle:
```bash
npm run build
npm run preview
```

---

## 🔑 Role-Based Access & Authentication Guide

Click the **`Sign In`** button in the top navigation bar to open the Authentication modal. The platform supports three dedicated roles:

### 🎓 1. Student Portal
Students can browse opportunities, RSVP for digital passes, bookmark events, and track verified participation certificates.

* **Method A — Student ID Login (Primary)**:
  - **Student ID / Reg No**: `RA2211003010142` (or any SRM registration number / email)
  - **Password**: `srm12345` (or any password for quick access)
* **Method B — Google Sign-In**:
  - Click **`Sign in with Google`**
  - Enter your Google or SRM student email (e.g. `yourname@gmail.com` or `ab1234@srmist.edu.in`)
  - Click **`Verify & Sign In`** to receive the official **Google Verified ✓** badge on your profile.
* **Method C — New Student Sign-Up**:
  - Switch to the **Sign Up** tab to register a new account with Name, SRM Registration Number (`RA...`), Department (CSE, ECE, Mech, etc.), Year of Study, and Institutional Email.

---

### 🏛️ 2. Club Organizer Portal
Club leads and executive board members can manage their clubs, create and publish new campus events, track registrations, export CSV attendee rosters, and scan QR passes at venue doors.

* **Sign In Credentials**:
  - Switch role tab to **Club Organizer**
  - **Organizer Email**: `aayush.organizer@srmist.edu.in` (or any club lead email)
  - **Password**: `srm12345`
* **Direct Promotion via Club Listing**:
  - Any signed-in student can also click **`+ Register / List Your Club`** in the navigation bar or Clubs page.
  - Completing the club registration instantly elevates the user to **Club Organizer** status for that newly listed club!

---

### ⚖️ 3. Dean of Student Affairs (DSA) Admin Console
The official university moderation portal for the Directorate of Student Affairs to govern campus-wide safety, verify club affiliations, and approve public event broadcasts.

* **Sign In**:
  - Switch role tab to **Dean / DSA**
  - Click the blue **`Instant DSA Admin Access (1-Click)`** button, or enter:
    - **DSA NetID**: `dean.studentaffairs@srmist.edu.in`
    - **Password**: `srm12345`
* **Admin Capabilities**:
  - **Event Approvals**: Review submitted event proposals, inspect faculty advisor details, approve for campus-wide visibility, or reject with custom feedback.
  - **Club Verification**: Review newly registered student clubs, audit faculty advisors, and issue the official **Verified Club ✓** green badge.
  - **Moderation**: Review flagged events and audit attendee statistics.

---

## 🌟 Key Platform Features

### 🔍 Discovery & Feed
- **Smart Category Filtering**: Hackathons, Workshops, Cultural Fests, Club Recruitments, Guest Lectures, Sports, and Competitions.
- **Search & Multi-Filters**: Filter by category, department eligibility, entry fees (Free vs Paid), and date timeline (Today, This Weekend, Next 7 Days).
- **Spotlight Hero**: Curated featured events with registration deadlines, prize pool badges, and quick RSVP triggers.

### 🎟️ 1-Click Digital Event Passes
- Real-time RSVP with instant pass generation.
- Dynamic digital ticket modal with unique **Registration QR Code**, venue details, and calendar reminder triggers.
- Downloadable and viewable anytime under the **Student Dashboard**.

### 🏛️ Club Hub & Management
- Directory of SRM student organizations (SRM HackerEarth, DSC SRM, Directorate of Student Affairs, Camellia Cultural Society, Camber Racing, etc.).
- Dedicated club profile pages showcasing leadership, faculty advisors, social community links (Instagram, Discord, GitHub), and active recruitments.
- **List & Register Your Club Wizard**: Capture organization name, category, faculty advisor details, lead contacts, and community links.

### 📅 Contextual Event Publisher Wizard
- 3-step publishing wizard for organizers:
  1. **Event Details**: Title, category, host club, thumbnail banner URL, and comprehensive description.
  2. **Schedule & Location**: Dates, start/end time, registration deadline, and campus venue (SRM Tech Park, T.P. Ganesan Auditorium, UB, etc.).
  3. **Capacity & Prizes**: Attendee limits, registration cost (Free / Paid), prize pool amount, and certificates.

### 📊 Organizer Command Center & QR Check-In
- Real-time registration counters and capacity progress bars.
- Live attendee roster with one-click **Export to CSV**.
- **Live QR Scanner Modal**: Fast venue check-in simulation with instant attendee verification.

### 🏆 Student Portfolio & Certificates
- Personal dashboard featuring:
  - Active registered passes with live QR codes.
  - Saved bookmarks.
  - Official participation and winner certificates with verifiable credential IDs.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) + [Vite](https://vite.dev/) |
| **Styling & Theme** | Vanilla CSS Design System with dark/light theme, glassmorphism, and responsive layout |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Interactive FX** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) for celebratory RSVPs |
| **Authentication** | Custom multi-role Auth System + Google Identity Services (GIS) integration |
| **State & Persistence** | React Context API (`AppContext`) backed by browser `localStorage` |

---

## 📁 Project Directory Structure

```
gittask/
├── public/                     # Static assets & favicon
├── src/
│   ├── assets/                 # SVGs, banners, and logos
│   ├── components/
│   │   ├── common/             # Navbar, Footer, AuthModal, GoogleLogo, ThemeToggle
│   │   ├── events/             # EventCard, EventDetailModal, TicketPassModal, QRModal
│   │   └── organizer/          # CreateEventModal, RegisterClubModal
│   ├── context/
│   │   └── AppContext.jsx      # Global state (auth, events, clubs, passes, approvals)
│   ├── data/
│   │   └── seedData.js         # Initial clubs, events, venues, and user personas
│   ├── views/
│   │   ├── HomeView.jsx        # Landing page with hero & trending events
│   │   ├── ExploreView.jsx     # Full event discovery feed with advanced filters
│   │   ├── EventDetailView.jsx # Detailed event page with Q&A and schedule
│   │   ├── ClubsView.jsx       # Student organizations directory & club registration
│   │   ├── ClubDetailView.jsx  # Individual club profile & active opportunities
│   │   ├── StudentDashboardView.jsx   # Passes, certificates, bookmarks
│   │   ├── OrganizerDashboardView.jsx # Club management, attendees, event creation
│   │   └── AdminDashboardView.jsx     # DSA approval console for events & clubs
│   ├── App.jsx                 # View routing & modal overlay management
│   ├── index.css               # Design system tokens, utilities & animations
│   └── main.jsx                # Application root mount
├── .env.example                # Template for Google OAuth client configuration
├── package.json                # Project dependencies & scripts
├── vite.config.js              # Vite configuration
└── README.md                   # Project documentation
```

---

## ⚙️ Environment Variables (Optional)

To enable live Google Cloud OAuth in production, create a `.env` file in the root directory:

```env
# Google Identity Services Client ID
# Obtain from https://console.cloud.google.com/apis/credentials
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

> **Note**: If `VITE_GOOGLE_CLIENT_ID` is omitted or left empty, the application automatically activates the seamless in-app Google authentication flow so that no external blocked popups (`Error 401: invalid_client`) occur.

---

## 📄 License & Attribution

Built for the student community of **SRM Institute of Science and Technology, Kattankulathur**.  
All rights reserved © 2026 SRM Pulse.
