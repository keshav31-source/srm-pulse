// Realistic SRM University Campus Seed Data

export const CATEGORIES = [
  { id: "hackathon", name: "Hackathons", icon: "💻", color: "#3B82F6", description: "Hackathons, sprints & dev challenges" },
  { id: "competition", name: "Competitions", icon: "🎯", color: "#EC4899", description: "Coding contests, quizzes & ideathons" },
  { id: "workshop", name: "Workshops", icon: "🧑‍💻", color: "#10B981", description: "Hands-on tech & creative bootcamps" },
  { id: "seminar", name: "Seminars", icon: "🎤", color: "#8B5CF6", description: "Guest lectures & expert keynotes" },
  { id: "cultural", name: "Cultural", icon: "🎨", color: "#F59E0B", description: "Music, dance, drama & art fests" },
  { id: "sports", name: "Sports", icon: "🏆", color: "#EF4444", description: "Tournaments, athletics & e-sports" },
  { id: "entrepreneurship", name: "Entrepreneurship", icon: "🚀", color: "#6366F1", description: "Pitching, startups & angel funding" },
  { id: "career", name: "Career & Drives", icon: "💼", color: "#14B8A6", description: "Placement prep, internships & hiring" },
  { id: "networking", name: "Networking", icon: "🤝", color: "#06B6D4", description: "Community meetups & club mixers" },
  { id: "academic", name: "Academic", icon: "📚", color: "#84CC16", description: "Research symposiums & conferences" },
  { id: "other", name: "Other Opportunities", icon: "🎭", color: "#64748B", description: "Volunteering, social & campus drives" }
];

export const INTEREST_TAGS = [
  "AI/ML", "Web Development", "App Development", "Cybersecurity", 
  "Data Science", "Competitive Programming", "Robotics", "Electronics", 
  "Entrepreneurship", "Finance", "Design", "Marketing", 
  "Cultural", "Sports", "Public Speaking", "Research", "Career"
];

export const CLUBS = [
  {
    id: "srm-coding-club",
    name: "SRM Coding Club",
    category: "Technical",
    tagline: "Building the finest coders and builders of SRM IST.",
    description: "The premier student-run coding collective at SRM. Organizers of CodeCraft, HackMatrix, and regular algorithmic problem-solving bootcamps for FAANG & tier-1 product companies.",
    logo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=160&auto=format&fit=crop&q=80",
    cover: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80",
    verified: true,
    followerCount: 3840,
    email: "codingclub@srmist.edu.in",
    website: "https://srmcodingclub.org",
    instagram: "@srmcodingclub",
    linkedin: "srm-coding-club",
    github: "srmcodingclub",
    leads: [
      { name: "Aayush Sharma", role: "President (4th Yr CSE)" },
      { name: "Priya Sundaram", role: "Technical Lead (3rd Yr CINTEL)" }
    ],
    announcements: [
      {
        id: "ann-1",
        title: "HackMatrix 2026 Problem Statements Released!",
        date: "2026-09-11",
        content: "We have just unveiled the AI and FinTech problem statements on the portal. Review them with your teammates before check-in!"
      },
      {
        id: "ann-2",
        title: "Weekly LeetCode contest leaderboard",
        date: "2026-09-08",
        content: "Kudos to top 3 SRM coders this week: Raghav (3rd yr), Ananya (2nd yr), and Keshav (3rd yr)!"
      }
    ]
  },
  {
    id: "gdsc-srm",
    name: "Google Developer Groups on Campus (GDG / GDSC SRM)",
    category: "Technical",
    tagline: "Connect, Learn, and Grow with Google technologies.",
    description: "Official Google Developer Student Club at SRM University. Focused on Android, Cloud, TensorFlow, Firebase, and Open Source contributions.",
    logo: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=160&auto=format&fit=crop&q=80",
    cover: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
    verified: true,
    followerCount: 5210,
    email: "gdsc@srmist.edu.in",
    website: "https://gdscsrm.tech",
    instagram: "@gdsc_srm",
    linkedin: "gdsc-srm",
    leads: [
      { name: "Tanmay Gupta", role: "GDG Lead" },
      { name: "Sneha Nair", role: "Design Lead" }
    ],
    announcements: [
      {
        id: "ann-3",
        title: "Core Committee Recruitment Applications Closing Tonight!",
        date: "2026-09-12",
        content: "Final reminder: All applications for Technical, Management, and Creative domains close at 11:59 PM today."
      }
    ]
  },
  {
    id: "aaruush",
    name: "Team Aaruush",
    category: "Techno-Management",
    tagline: "Towards Infinity and Beyond — SRM's National Techno-Management Fest.",
    description: "Organizers of South India's largest collegiate techno-management festival. Featuring 60+ events, international guest lectures, drone arenas, and robotics championships.",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=160&auto=format&fit=crop&q=80",
    cover: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80",
    verified: true,
    followerCount: 9450,
    email: "contact@aaruush.org",
    website: "https://aaruush.org",
    instagram: "@aaruush_srm",
    linkedin: "aaruush-srm",
    leads: [
      { name: "Karthik Verma", role: "Secretary" }
    ],
    announcements: [
      {
        id: "ann-4",
        title: "Robotics Arena Registration Open",
        date: "2026-09-10",
        content: "Teams of 4 can now register for the RoboWars and Drone Swarm competition taking place at TP Ganesan Audi."
      }
    ]
  },
  {
    id: "milan",
    name: "Directorate of Student Affairs — Milan",
    category: "Cultural",
    tagline: "Live the Magic — SRM's National Cultural Extravaganza.",
    description: "The grand cultural festival of SRM University celebrating arts, fashion, international music artists, dance battles, and theatre across 4 electric days.",
    logo: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=160&auto=format&fit=crop&q=80",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80",
    verified: true,
    followerCount: 14200,
    email: "milan@srmist.edu.in",
    website: "https://srmmilan.org",
    instagram: "@srmmilan",
    linkedin: "milan-srm",
    leads: [
      { name: "Dr. R. Ramanathan", role: "Cultural Director" }
    ],
    announcements: [
      {
        id: "ann-5",
        title: "Battle of the Bands Audition Schedule",
        date: "2026-09-09",
        content: "Preliminary band auditions will take place at Dr. TP Ganesan Mini Audi 1 on Sept 18th."
      }
    ]
  },
  {
    id: "camber-racing",
    name: "Camber Racing",
    category: "Formula Student",
    tagline: "Driven by passion, engineered to win.",
    description: "Official Formula Student Combustion & Electric vehicle design team of SRM. Ranked amongst top engineering student teams internationally in Formula Bharat and Formula Student Germany.",
    logo: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=160&auto=format&fit=crop&q=80",
    cover: "https://images.unsplash.com/photo-1532581291347-9c39cf10a73c?w=1200&auto=format&fit=crop&q=80",
    verified: true,
    followerCount: 4620,
    email: "camberracing@srmist.edu.in",
    website: "https://camberracing.com",
    instagram: "@camberracing",
    linkedin: "camber-racing",
    leads: [
      { name: "Vikramaditya Rao", role: "Team Principal" }
    ],
    announcements: [
      {
        id: "ann-6",
        title: "EV Powertrain Workshop & Vehicle Display",
        date: "2026-09-11",
        content: "Meet the team and see our CR-26 Electric prototype live at Java Plaza this Tuesday!"
      }
    ]
  },
  {
    id: "next-tech-lab",
    name: "Next Tech Lab",
    category: "Research & Innovation",
    tagline: "Student-led multi-disciplinary research lab inspired by MIT Media Lab.",
    description: "QS Reimagine Education Award recipient lab housing Satoshi Lab (Crypto), McCarthy Lab (AI), Turing Lab (Quantum), and Tesla Lab (Hardware).",
    logo: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=160&auto=format&fit=crop&q=80",
    cover: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80",
    verified: true,
    followerCount: 3180,
    email: "fellows@nextechlab.io",
    website: "https://nextechlab.io",
    instagram: "@nextechlab",
    linkedin: "next-tech-lab",
    leads: [
      { name: "Devansh Mehra", role: "Lab Lead" }
    ],
    announcements: []
  }
];

export const INITIAL_EVENTS = [
  {
    id: "evt-genai-masterclass",
    title: "Generative AI & Agentic Systems Masterclass",
    clubId: "srm-coding-club",
    clubName: "SRM Coding Club",
    verified: true,
    category: "workshop",
    tags: ["AI/ML", "Web Development", "Career"],
    // Guaranteed high-definition AI neural network artwork
    banner: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80",
    date: "2026-09-12", // TODAY!
    startTime: "17:30",
    endTime: "20:30",
    registrationDeadline: "2026-09-12T16:30:00",
    buildingId: "tp",
    venueName: "Tech Park (TP)",
    room: "TP 204 Seminar Hall",
    format: "In-person",
    eligibility: "Open to All SRM Students (CSE, ECE, CINTEL, DS)",
    cost: "Free",
    capacity: 120,
    registeredCount: 114,
    waitlistCount: 6,
    viewsCount: 2450,
    savesCount: 184,
    status: "happening_now", // Active now
    currentScheduleStep: "Live Coding: Building Autonomous Gemini Agents",
    shortDescription: "Deep dive into multi-agent systems, function calling, tool use, and production LLM orchestration with DeepMind researchers.",
    description: `Generative AI has transformed modern software engineering from simple completions to full agentic reasoning and tool invocation.

In this intensive 3-hour evening masterclass organized by the **SRM Coding Club**, students will bridge the theoretical fundamentals of transformer attention with hands-on implementation of autonomous agents that inspect codebases, execute shell commands, and interact with APIs.

Bring your laptops with Node.js / Python 3.11 installed. You'll leave with a functioning multi-agent assistant deployed on cloud.`,
    whyAttend: [
      "Master tool-calling and agent orchestration frameworks from scratch",
      "Hands-on architectural patterns used by modern frontier AI labs",
      "Live Q&A with ex-Google DeepMind engineer and SRM alumni",
      "Official certificate of completion with verification credential"
    ],
    prizes: "Top 3 working agent prototypes receive Google Cloud Credits ($500 each) & fast-track summer internship referrals.",
    schedule: [
      { time: "5:30 PM", label: "Check-in & Environment Setup" },
      { time: "5:45 PM", label: "Foundations of Agentic Tool Calling & Reasoning Loops" },
      { time: "6:30 PM", label: "Live Coding: Building Autonomous Gemini Agents (CURRENT)" },
      { time: "7:45 PM", label: "Multi-Agent Collaboration & State Persistence" },
      { time: "8:15 PM", label: "Project Showcase & Certificate Awards" }
    ],
    speakers: [
      {
        name: "Arjun Nambiar",
        role: "Senior AI Engineer (ex-Google)",
        company: "DeepMind / Frontier AI"
      },
      {
        name: "Aayush Sharma",
        role: "President, SRM Coding Club",
        company: "SRMIST KTR"
      }
    ],
    registrationType: "internal",
    internalFormFields: ["srmEmail", "regNumber", "department", "year", "githubUrl", "experienceLevel"],
    hasCertificate: true,
    faqs: [
      { q: "Is prior knowledge of Machine Learning required?", a: "Basic proficiency in Python or JavaScript is recommended. We will cover the agentic abstractions from the ground up." },
      { q: "Will WiFi and power outlets be available?", a: "Yes, TP 204 Seminar Hall has dedicated high-speed Wi-Fi and power strips at every row." }
    ]
  },
  {
    id: "evt-gdsc-recruitment",
    title: "GDSC SRM Core Committee Recruitment 2026-27",
    clubId: "gdsc-srm",
    clubName: "Google Developer Groups on Campus",
    verified: true,
    category: "career",
    tags: ["Web Development", "App Development", "Design", "Marketing", "AI/ML"],
    banner: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
    date: "2026-09-12", // TODAY!
    startTime: "23:59",
    endTime: "23:59",
    registrationDeadline: "2026-09-12T23:59:59", // CLOSING TONIGHT!
    buildingId: "ub",
    venueName: "Online Application & University Building",
    room: "UB Council Hall (Interviews next week)",
    format: "Hybrid",
    eligibility: "1st, 2nd, and 3rd Year B.Tech Students of SRM KTR",
    cost: "Free",
    capacity: 500,
    registeredCount: 462,
    waitlistCount: 0,
    viewsCount: 3890,
    savesCount: 312,
    status: "closing_soon", // Deadline in few hours!
    shortDescription: "Recruiting passionate developers, designers, and organizers for Technical, Design, Operations, and Corporate domains.",
    description: `Ready to shape the developer culture at SRM University?

GDSC SRM is looking for its next cohort of student leaders for the 2026-2027 tenure. As a core committee member, you will organize flagship hackathons, mentor hundreds of junior coders, interact directly with Google Developer Advocates, and represent SRM at national summits.

Available Domains:
1. Technical (Web, Android, Cloud, AI/ML, Blockchain)
2. Creative & UI/UX (Figma, 3D Design, Video Production)
3. Corporate Relations & Sponsorships
4. Event Operations & Logistics

Deadlines strictly close at 11:59 PM tonight. Late submissions will not be reviewed.`,
    whyAttend: [
      "Lead initiatives impacting 10,000+ students on campus",
      "Direct mentorship from Google Developer Experts and alumni",
      "Access to Google Cloud credits, swags, and official credential certificates",
      "Lifetime network of top student builders and startup founders"
    ],
    prizes: "Official GDSC SRM Core Committee tenure induction, official Google Developer kit, and credential badge.",
    schedule: [
      { time: "Sept 12 11:59 PM", label: "Online Application Portal Closes" },
      { time: "Sept 14", label: "Domain Shortlist Announcement" },
      { time: "Sept 16 - 17", label: "Technical & Cultural Interviews in UB Council Hall" },
      { time: "Sept 19", label: "Final Core Team Induction" }
    ],
    speakers: [
      {
        name: "Tanmay Gupta",
        role: "GDSC Campus Lead",
        company: "GDSC SRM"
      }
    ],
    registrationType: "internal",
    internalFormFields: ["srmEmail", "regNumber", "department", "year", "domainPreference", "portfolioUrl", "statementOfPurpose"],
    hasCertificate: true,
    faqs: [
      { q: "Can 1st years apply?", a: "Yes, freshmen are enthusiastically encouraged to apply for Junior Associate positions!" }
    ]
  },
  {
    id: "evt-hackmatrix-2026",
    title: "SRM HackMatrix 2026: 36-Hour National Hackathon",
    clubId: "srm-coding-club",
    clubName: "SRM Coding Club",
    verified: true,
    category: "hackathon",
    tags: ["AI/ML", "Web Development", "Entrepreneurship", "Competitive Programming"],
    banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80",
    date: "2026-09-18",
    startTime: "09:00",
    endTime: "21:00",
    registrationDeadline: "2026-09-15T23:59:00",
    buildingId: "tp",
    venueName: "Tech Park (TP)",
    room: "TP Central Foyer & Floors 2-5",
    format: "In-person",
    eligibility: "Open to All College Students (Teams of 2-4)",
    cost: "Free",
    capacity: 350,
    registeredCount: 298,
    waitlistCount: 0,
    viewsCount: 7820,
    savesCount: 654,
    status: "published",
    shortDescription: "SRM's premier 36-hour physical hackathon with ₹1,50,000 in cash prizes, 4 tracks, and VC scouts.",
    description: `HackMatrix 2026 brings together 350 of the country's most passionate hackers and builders under one roof at Tech Park, SRM KTR.

Over 36 intense hours, you will ideate, architect, and ship production-grade solutions across four revolutionary tracks:
1. Autonomous AI & Frontier Models
2. Decentralized Finance & Trustless Systems
3. Smart Healthcare & BioTech
4. Open Innovation & Social Good

Meals, midnight snacks, Red Bull, sleeping areas, and mentorship from top industry engineers provided around the clock.`,
    whyAttend: [
      "₹1,50,000 total cash prize pool + ₹5,00,000 in partner bounties",
      "On-the-spot seed interviews with campus angel networks",
      "Free food, energy drinks, official hacker hoodies, and swags",
      "Hardware lab access with Raspberry Pis, Jetson Nanos, and VR headsets"
    ],
    prizes: "1st Place: ₹75,000 Cash | 2nd Place: ₹45,000 Cash | 3rd Place: ₹30,000 Cash + AWS Credits",
    schedule: [
      { time: "Day 1 - 08:30 AM", label: "Check-in & Swag Collection" },
      { time: "Day 1 - 10:00 AM", label: "Opening Ceremony & Problem Keynote" },
      { time: "Day 1 - 11:00 AM", label: "Hacking Begins & Mentor Matching" },
      { time: "Day 1 - 08:00 PM", label: "Mentorship Review Round 1" },
      { time: "Day 2 - 12:00 AM", label: "Midnight Gaming & Trivia" },
      { time: "Day 2 - 10:00 AM", label: "Review Round 2" },
      { time: "Day 2 - 04:00 PM", label: "Final Code Freeze & Expo" },
      { time: "Day 2 - 06:30 PM", label: "Top 8 Pitches & Prize Ceremony" }
    ],
    speakers: [
      {
        name: "Vikram Sethi",
        role: "VP Engineering",
        company: "Razorpay"
      },
      {
        name: "Shreya Ghoshal-Roy",
        role: "Partner",
        company: "Elevation Capital"
      }
    ],
    registrationType: "internal",
    internalFormFields: ["srmEmail", "regNumber", "teamName", "teamSize", "teamMembers", "trackChoice", "githubUrl"],
    hasCertificate: true,
    faqs: [
      { q: "Is registration free?", a: "Yes, participation is 100% free with meals provided by our sponsors." },
      { q: "Can students from other campuses participate?", a: "Yes, teams can include members from SRM Ramapuram, Vadapalani, or external universities." }
    ]
  },
  {
    id: "evt-milan-battle-bands",
    title: "Milan '26: Battle of the Bands & Star DJ Night",
    clubId: "milan",
    clubName: "Directorate of Student Affairs — Milan",
    verified: true,
    category: "cultural",
    tags: ["Cultural", "Public Speaking"],
    banner: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80",
    date: "2026-09-24",
    startTime: "17:00",
    endTime: "22:30",
    registrationDeadline: "2026-09-22T18:00:00",
    buildingId: "tpg",
    venueName: "Dr. T.P. Ganesan Auditorium",
    room: "Main Auditorium & Open Amphitheater",
    format: "In-person",
    eligibility: "Valid SRM Student ID Required for Free Entry",
    cost: "Free",
    capacity: 4200,
    registeredCount: 3840,
    waitlistCount: 0,
    viewsCount: 15400,
    savesCount: 1420,
    status: "published",
    shortDescription: "The loudest musical evening of the semester featuring 12 campus rock & fusion bands followed by headlining EDM sets.",
    description: `Get ready for an electric evening of pure adrenaline and music!

As part of the road to Milan '26, the Directorate of Student Affairs presents the Inter-Collegiate Battle of the Bands. 12 finalist collegiate bands will compete for the golden guitar trophy, culminating in an electrifying guest DJ set under the lights of Dr. T.P. Ganesan Auditorium.

Entry requires booking a free student QR pass on SRM Pulse.`,
    whyAttend: [
      "Witness 12 top college rock, metal, and indie-fusion bands live",
      "State-of-the-art 50,000 watt Meyer Sound system & laser show",
      "Free event wristbands and sponsor giveaways",
      "Star DJ reveal announced 24 hours prior"
    ],
    prizes: "Winner: ₹50,000 + Studio Recording Session | Runner Up: ₹25,000",
    schedule: [
      { time: "5:00 PM", label: "Gates Open & Pass Scanning" },
      { time: "6:00 PM", label: "Battle of the Bands Round 1 (6 Bands)" },
      { time: "8:00 PM", label: "Intermission & Cultural Dance Showcase" },
      { time: "8:30 PM", label: "Round 2 & Final Showdowns" },
      { time: "10:00 PM", label: "Guest EDM Headliner & Awards" }
    ],
    speakers: [],
    registrationType: "internal",
    internalFormFields: ["srmEmail", "regNumber", "department", "year", "phone"],
    hasCertificate: false,
    faqs: [
      { q: "Do I need to pay for tickets?", a: "No! Entry is strictly free for all SRM students who book their digital pass on SRM Pulse." }
    ]
  },
  {
    id: "evt-camber-ev-telemetry",
    title: "Formula Student: Autonomous EV Telemetry & Powertrain",
    clubId: "camber-racing",
    clubName: "Camber Racing",
    verified: true,
    category: "workshop",
    tags: ["Robotics", "Electronics", "AI/ML"],
    banner: "https://images.unsplash.com/photo-1532581291347-9c39cf10a73c?w=1200&auto=format&fit=crop&q=80",
    date: "2026-09-14",
    startTime: "14:00",
    endTime: "17:30",
    registrationDeadline: "2026-09-13T20:00:00",
    buildingId: "java",
    venueName: "Java Green Block & Mechanical Labs",
    room: "Java Plaza Conference & Workshop Bay",
    format: "In-person",
    eligibility: "Open to Mechanical, Mechatronics, EEE, ECE, CSE students",
    cost: "Free",
    capacity: 80,
    registeredCount: 78,
    waitlistCount: 5,
    viewsCount: 1980,
    savesCount: 156,
    status: "published",
    shortDescription: "Hands-on breakdown of CAN-bus telemetry, battery management systems (BMS), and torque vectoring algorithms.",
    description: `Ever wondered what goes into building an electric racecar that sprints 0-100 km/h in 3.2 seconds?

Join Camber Racing, SRM's premier Formula Student team, for an intensive mechanical and electrical workshop. We'll dismantle an actual telemetry acquisition unit, analyze live CAN bus data streams, and demonstrate regenerative braking simulation.`,
    whyAttend: [
      "Interact directly with Formula Student national champions",
      "Real-world automotive telemetry data analysis with MATLAB & Python",
      "Opportunity to interview for Camber Racing recruitments",
      "Live vehicle display at Java Green Plaza"
    ],
    prizes: "Top 3 workshop problem-solvers get direct bypass to Camber Racing Technical Round.",
    schedule: [
      { time: "2:00 PM", label: "Anatomy of a Formula Student Racecar" },
      { time: "2:45 PM", label: "CAN-Bus Protocol & Microcontroller Sensor Hubs" },
      { time: "4:00 PM", label: "Live Telemetry Demo & Pit Stop Challenge" },
      { time: "5:00 PM", label: "Q&A with Engineering Leads" }
    ],
    speakers: [
      {
        name: "Vikramaditya Rao",
        role: "Team Principal",
        company: "Camber Racing"
      }
    ],
    registrationType: "internal",
    internalFormFields: ["srmEmail", "regNumber", "department", "year", "interests"],
    hasCertificate: true,
    faqs: []
  },
  {
    id: "evt-faang-interview-playbook",
    title: "Cracking Tier-1 SDE Placements: System Design & DSA Playbook",
    clubId: "srm-coding-club",
    clubName: "SRM Coding Club",
    verified: true,
    category: "career",
    tags: ["Competitive Programming", "Career", "Web Development"],
    banner: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80",
    date: "2026-09-15",
    startTime: "16:00",
    endTime: "18:30",
    registrationDeadline: "2026-09-15T12:00:00",
    buildingId: "ub",
    venueName: "University Building (UB)",
    room: "UB 402 Smart Classroom",
    format: "In-person",
    eligibility: "Targeted for 3rd & 4th Year B.Tech / M.Tech Students",
    cost: "Free",
    capacity: 150,
    registeredCount: 150,
    waitlistCount: 24, // FULL! Show waitlist
    viewsCount: 4200,
    savesCount: 520,
    status: "published",
    shortDescription: "Insider strategies for cracking 40+ LPA SDE offers at Microsoft, Google, Amazon, and top startups.",
    description: `Campus placements and off-campus hiring have grown increasingly competitive. Passing the online coding rounds and deep dive system design interviews requires a disciplined, structured approach.

In this session, recent SRM alumni who placed at Microsoft, Atlassian, and Uber will break down their exact preparation timelines, resume templates, mock interview strategies, and system design patterns.`,
    whyAttend: [
      "Access to verified 150-question curated SDE sheet for campus drives",
      "Live mock interview teardown of a real distributed caching problem",
      "ATS-friendly resume templates used to get shortlisted",
      "Direct referral pool connection with alumni"
    ],
    prizes: "Free 1-year LeetCode Premium giveaways for 5 lucky attendees.",
    schedule: [
      { time: "4:00 PM", label: "The Hiring Landscape: What Recruiter Screens Actually Look For" },
      { time: "4:45 PM", label: "Mastering Graphs, DP, and Bitmasking for Online Tests" },
      { time: "5:30 PM", label: "Live System Design: Designing TinyURL and Rate Limiters" },
      { time: "6:15 PM", label: "Open Resume Teardown & AMA" }
    ],
    speakers: [
      {
        name: "Rohan Kapoor",
        role: "Software Engineer 2",
        company: "Microsoft IDC"
      },
      {
        name: "Ananya Iyer",
        role: "Backend Engineer",
        company: "Atlassian"
      }
    ],
    registrationType: "internal",
    internalFormFields: ["srmEmail", "regNumber", "department", "year", "targetCompanies"],
    hasCertificate: true,
    faqs: []
  },
  {
    id: "evt-aaruush-robowars",
    title: "RoboWars: National Heavyweight Combat Championship",
    clubId: "aaruush",
    clubName: "Team Aaruush",
    verified: true,
    category: "competition",
    tags: ["Robotics", "Electronics"],
    banner: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&auto=format&fit=crop&q=80",
    date: "2026-09-20",
    startTime: "10:00",
    endTime: "18:00",
    registrationDeadline: "2026-09-17T23:59:00",
    buildingId: "tpg",
    venueName: "Dr. T.P. Ganesan Auditorium",
    room: "Exhibition Foyer & Combat Arena",
    format: "In-person",
    eligibility: "Open to Collegiate Robotics Teams (15kg & 30kg Bots)",
    cost: "Free",
    capacity: 200,
    registeredCount: 165,
    waitlistCount: 0,
    viewsCount: 3100,
    savesCount: 290,
    status: "published",
    shortDescription: "High-octane custom combat bots clash inside a steel-reinforced polycarbonate cage for ₹80,000 in prizes.",
    description: `Sparks will fly! Team Aaruush presents the flagship combat robotics tournament of SRM University.

Watch customized pneumatic flippers, vertical spinners, and titanium armor robots duke it out in our reinforced 20x20 foot safety battle arena. Spectator seating is free for all SRM students.`,
    whyAttend: [
      "Witness thrilling 3-minute knockout robotic battles",
      "Network with seasoned bot builders from IITs and NITs",
      "Interactive pit lane tours and builder interviews",
      "Special exhibition match: Drone swarm agility race"
    ],
    prizes: "1st Place 30kg: ₹50,000 | 2nd Place: ₹30,000 | Best Engineering Award: ₹15,000",
    schedule: [
      { time: "10:00 AM", label: "Safety Inspections & Weigh-ins" },
      { time: "11:30 AM", label: "Preliminary Round of 16 Matches" },
      { time: "02:00 PM", label: "Quarter Finals" },
      { time: "04:30 PM", label: "Semi Finals & Exhibition Drone Run" },
      { time: "05:30 PM", label: "Grand Championship Final" }
    ],
    speakers: [],
    registrationType: "external",
    externalUrl: "https://unstop.com/competitions/aaruush-robowars-srm-2026",
    hasCertificate: true,
    faqs: []
  },
  {
    id: "evt-ecell-sharktank",
    title: "SRM Shark Tank 2026: Angel Pitch & Seed Grant",
    clubId: "next-tech-lab",
    clubName: "Directorate of Entrepreneurship & E-Cell",
    verified: true,
    category: "entrepreneurship",
    tags: ["Entrepreneurship", "Finance", "Career"],
    banner: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&auto=format&fit=crop&q=80",
    date: "2026-09-22",
    startTime: "11:00",
    endTime: "16:00",
    registrationDeadline: "2026-09-18T18:00:00",
    buildingId: "mba",
    venueName: "School of Management (MBA Block)",
    room: "Startup Pitch Auditorium 2nd Floor",
    format: "In-person",
    eligibility: "Any student with an early-stage startup or prototype",
    cost: "Free",
    capacity: 100,
    registeredCount: 68,
    waitlistCount: 0,
    viewsCount: 2200,
    savesCount: 195,
    status: "published",
    shortDescription: "Pitch your startup idea to genuine angel investors and compete for equity-free ₹2,00,000 seed grants.",
    description: `Got an idea that can solve a real campus or market problem?

SRM Shark Tank connects student entrepreneurs directly with prominent angel investors, venture funds, and SRM innovation alumni. Pitch your MVP in a 5-minute format followed by 3 minutes of investor grilling.`,
    whyAttend: [
      "₹2,00,000 in equity-free seed grants courtesy of SRM NewGen IEDC",
      "Direct incubation access at SRM Innovation & Incubation Centre",
      "Free AWS and Google Cloud startup package credits ($10,000 each)",
      "Media coverage on university channels"
    ],
    prizes: "Top 3 Startups receive ₹1,00,000, ₹60,000, and ₹40,000 non-dilutive grants.",
    schedule: [
      { time: "11:00 AM", label: "Keynote: How to Pitch Without Buzzwords" },
      { time: "11:45 AM", label: "Pitch Batch 1: SaaS & AI Startups" },
      { time: "01:15 PM", label: "Networking Lunch with Investors" },
      { time: "02:15 PM", label: "Pitch Batch 2: Hardware & Consumer Startups" },
      { time: "03:45 PM", label: "Investor Deliberation & Term Sheet Handouts" }
    ],
    speakers: [
      {
        name: "Siddharth Menon",
        role: "Angel Investor",
        company: "Chennai Angels"
      }
    ],
    registrationType: "internal",
    internalFormFields: ["srmEmail", "regNumber", "startupName", "oneLiner", "pitchDeckUrl", "foundersCount"],
    hasCertificate: true,
    faqs: []
  },
  {
    id: "evt-intercollege-sports",
    title: "SRM Founder's Cup: Inter-Collegiate Futsal & Badminton",
    clubId: "milan",
    clubName: "Directorate of Sports & Athletics",
    verified: true,
    category: "sports",
    tags: ["Sports"],
    banner: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&auto=format&fit=crop&q=80",
    date: "2026-09-26",
    startTime: "08:00",
    endTime: "19:00",
    registrationDeadline: "2026-09-23T23:59:00",
    buildingId: "grounds",
    venueName: "Clock Tower & Main Grounds",
    room: "Indoor Sports Pavilion & Astroturf Ground",
    format: "In-person",
    eligibility: "Open to All SRM departments and hostels",
    cost: "Free",
    capacity: 320,
    registeredCount: 270,
    waitlistCount: 0,
    viewsCount: 2600,
    savesCount: 140,
    status: "published",
    shortDescription: "Annual inter-hostel and inter-department sports tournament with rolling trophies and cash prizes.",
    description: `Lace up your boots! The annual Founder's Sports Cup features 5v5 Futsal on the floodlit turf and singles/doubles Badminton championships in the Indoor Complex.

Medals, certificates, and team jerseys for all knockout stage teams.`,
    whyAttend: [
      "Official tournament recognized by the SRM Directorate of Sports",
      "Floodlit night games with commentary and live score updates",
      "Selection trials for the SRM University Varsity Football & Badminton Squads"
    ],
    prizes: "Championship Trophy + ₹30,000 Cash Prize for Futsal, ₹15,000 for Badminton",
    schedule: [
      { time: "08:00 AM", label: "Opening Match: Mech Titans vs CSE Warriors" },
      { time: "12:30 PM", label: "Lunch Break" },
      { time: "02:00 PM", label: "Quarter Finals" },
      { time: "05:00 PM", label: "Badminton Doubles Final" },
      { time: "06:30 PM", label: "Futsal Grand Final under Floodlights" }
    ],
    speakers: [],
    registrationType: "internal",
    internalFormFields: ["srmEmail", "regNumber", "teamName", "sportChoice", "captainPhone"],
    hasCertificate: true,
    faqs: []
  },
  {
    id: "evt-past-cloud-native",
    title: "Fullstack Cloud-Native Development Bootcamp",
    clubId: "srm-coding-club",
    clubName: "SRM Coding Club",
    verified: true,
    category: "workshop",
    tags: ["Web Development", "AI/ML"],
    banner: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    date: "2026-08-28", // Past event
    startTime: "10:00",
    endTime: "16:00",
    registrationDeadline: "2026-08-26T23:59:00",
    buildingId: "tp",
    venueName: "Tech Park (TP)",
    room: "TP 601 High Performance Computing Lab",
    format: "In-person",
    eligibility: "Completed",
    cost: "Free",
    capacity: 100,
    registeredCount: 98,
    waitlistCount: 0,
    viewsCount: 3100,
    savesCount: 140,
    status: "completed", // Past event!
    shortDescription: "Comprehensive workshop on Dockerizing microservices, setting up Kubernetes clusters, and deploying to GCP.",
    description: `Hands-on cloud architecture workshop completed on August 28th. Participants built and deployed microservices with Docker, Kubernetes, and automated CI/CD pipelines.`,
    whyAttend: ["Completed past session"],
    prizes: "Certificates issued to all 92 certified attendees.",
    schedule: [],
    speakers: [],
    registrationType: "internal",
    hasCertificate: true,
    faqs: []
  },
  {
    id: "evt-pending-quantum-talk",
    title: "Introduction to Quantum Algorithms & Qiskit",
    clubId: "next-tech-lab",
    clubName: "Next Tech Lab",
    verified: true,
    category: "seminar",
    tags: ["Research", "Competitive Programming"],
    banner: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&auto=format&fit=crop&q=80",
    date: "2026-09-28",
    startTime: "15:00",
    endTime: "17:00",
    registrationDeadline: "2026-09-26T23:59:00",
    buildingId: "biotech",
    venueName: "Bio-Tech Block",
    room: "BT 301 Amphitheater",
    format: "In-person",
    eligibility: "Open to 2nd-4th year students interested in Quantum Computing",
    cost: "Free",
    capacity: 90,
    registeredCount: 0,
    waitlistCount: 0,
    viewsCount: 42,
    savesCount: 8,
    status: "pending_approval", // In Admin approval queue!
    shortDescription: "Hands-on quantum entanglement, Grover's algorithm, and quantum teleportation simulation with IBM Qiskit.",
    description: `Submitted by Next Tech Lab. Demystifying quantum bits (qubits), superposition, and quantum gates through IBM Quantum Composer.`,
    whyAttend: ["Gain practical familiarity with quantum circuits"],
    prizes: "IBM Quantum Certificate voucher",
    schedule: [],
    speakers: [],
    registrationType: "internal",
    hasCertificate: true,
    faqs: []
  }
];

// Current logged in demo user (NO face photo)
export const INITIAL_USER = {
  id: "usr-keshav",
  name: "Keshav Arora",
  role: "STUDENT", // 'STUDENT' | 'ORGANIZER' | 'PLATFORM_ADMIN'
  email: "ka1234@srmist.edu.in",
  regNumber: "RA2211003010142",
  department: "Computer Science & Engineering",
  year: "3rd Year",
  phone: "+91 98765 43210",
  avatar: null, // No photo per user request!
  bio: "Fullstack developer & AI enthusiast. Building autonomous agent tools and passionate about open source hackathons at SRM.",
  interests: ["AI/ML", "Web Development", "Competitive Programming", "Entrepreneurship"],
  isProfilePublic: true,
  followedClubIds: ["srm-coding-club", "gdsc-srm", "camber-racing"]
};

// Initial registrations for Keshav
export const INITIAL_REGISTRATIONS = [
  {
    id: "reg-1",
    eventId: "evt-genai-masterclass",
    ticketCode: "SRM-GENAI-9842",
    registeredAt: "2026-09-10T14:22:00",
    status: "CONFIRMED", // 'CONFIRMED' | 'WAITLISTED' | 'ATTENDED' | 'CANCELLED'
    attendedAt: null,
    answers: {
      fullName: "Keshav Arora",
      srmEmail: "ka1234@srmist.edu.in",
      regNumber: "RA2211003010142",
      department: "Computer Science & Engineering",
      year: "3rd Year",
      experienceLevel: "Intermediate (Python & LangChain)"
    }
  },
  {
    id: "reg-2",
    eventId: "evt-hackmatrix-2026",
    ticketCode: "SRM-HACK-4512",
    registeredAt: "2026-09-08T19:40:00",
    status: "CONFIRMED",
    attendedAt: null,
    answers: {
      fullName: "Keshav Arora",
      srmEmail: "ka1234@srmist.edu.in",
      regNumber: "RA2211003010142",
      teamName: "MatrixBreakers",
      teamSize: "3",
      trackChoice: "Autonomous AI & Frontier Models"
    }
  },
  {
    id: "reg-3",
    eventId: "evt-past-cloud-native",
    ticketCode: "SRM-CLOUD-1092",
    registeredAt: "2026-08-20T11:15:00",
    status: "ATTENDED",
    attendedAt: "2026-08-28T10:12:00",
    answers: {
      fullName: "Keshav Arora",
      srmEmail: "ka1234@srmist.edu.in",
      regNumber: "RA2211003010142"
    }
  }
];

// Certificates earned
export const INITIAL_CERTIFICATES = [
  {
    id: "cert-1092",
    eventId: "evt-past-cloud-native",
    eventName: "Fullstack Cloud-Native Development Bootcamp",
    issuedBy: "SRM Coding Club",
    issueDate: "2026-08-28",
    credentialId: "SRM-CERT-2026-CLOUD-1092",
    studentName: "Keshav Arora",
    regNumber: "RA2211003010142",
    skills: ["Docker", "Kubernetes", "Microservices", "GCP"]
  }
];

// Saved / Bookmarked Event IDs
export const INITIAL_SAVED_EVENT_IDS = [
  "evt-milan-battle-bands",
  "evt-camber-ev-telemetry",
  "evt-ecell-sharktank"
];

// In-app notifications
export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    type: "live_event",
    title: "Happening Now: Generative AI Masterclass",
    message: "Your registered session is underway in Tech Park, TP 204 Seminar Hall. Live hands-on agent building is beginning.",
    time: "15m ago",
    read: false,
    eventId: "evt-genai-masterclass"
  },
  {
    id: "notif-2",
    type: "deadline",
    title: "Registration Closing Tonight: GDSC SRM Recruitment",
    message: "Applications for GDSC Core Committee close at 11:59 PM today. Don't miss your chance to join!",
    time: "1h ago",
    read: false,
    eventId: "evt-gdsc-recruitment"
  },
  {
    id: "notif-3",
    type: "club_update",
    title: "New Announcement from SRM Coding Club",
    message: "HackMatrix 2026 problem statements have been officially unveiled.",
    time: "4h ago",
    read: true,
    eventId: "evt-hackmatrix-2026"
  },
  {
    id: "notif-4",
    type: "registration",
    title: "Registration Confirmed: HackMatrix 2026",
    message: "Team 'MatrixBreakers' ticket code SRM-HACK-4512 has been issued.",
    time: "2d ago",
    read: true,
    eventId: "evt-hackmatrix-2026"
  }
];

// Q&A Discussions (No photo avatars)
export const INITIAL_DISCUSSIONS = [
  {
    id: "qa-1",
    eventId: "evt-genai-masterclass",
    authorName: "Rhea Sen",
    authorDept: "2nd Year CSE",
    question: "Do we need our own API keys for the Gemini API or will test keys be provided during the hands-on session?",
    timestamp: "2 hours ago",
    upvotes: 8,
    replies: [
      {
        id: "rep-1",
        authorName: "Aayush Sharma",
        authorRole: "SRM Coding Club Lead",
        isOrganizer: true,
        content: "Hi Rhea! Dedicated sandbox API keys with high rate limits will be provided to all checked-in attendees in the hall.",
        timestamp: "1 hour ago"
      }
    ]
  },
  {
    id: "qa-2",
    eventId: "evt-hackmatrix-2026",
    authorName: "Siddharth Raj",
    authorDept: "3rd Year ECE",
    question: "Can two members of a team be from SRM KTR and one member from another college?",
    timestamp: "1 day ago",
    upvotes: 14,
    replies: [
      {
        id: "rep-2",
        authorName: "Priya Sundaram",
        authorRole: "Technical Lead",
        isOrganizer: true,
        content: "Yes! Inter-college teams are completely allowed as long as the team leader has a valid student ID.",
        timestamp: "22 hours ago"
      }
    ]
  }
];

// Anti-Spam / Student Reports
export const INITIAL_REPORTS = [
  {
    id: "rep-101",
    eventId: "evt-fake-crypto",
    reportedTitle: "Guaranteed 10x Crypto Airdrop Workshop",
    reportedBy: "Student (RA221100301089)",
    reason: "Scam / Suspicious External Link",
    details: "The registration URL asks for Telegram phone verification and wallet seed phrase. Appears to be an unauthorized promotional scam.",
    timestamp: "2026-09-11 16:30",
    status: "pending"
  }
];
