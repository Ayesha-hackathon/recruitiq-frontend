import { 
  ResumeMetadata, 
  SkillGapItem, 
  InterviewSession, 
  TimelineEvent, 
  NotificationItem, 
  RecruiterStats 
} from '../types';

// Default Candidate Resume Details
export const mockResumeData: ResumeMetadata = {
  fileName: "Alex_Chen_Resume_2026.pdf",
  fileSize: "142 KB",
  uploadedAt: "June 28, 2026, 10:14 AM",
  parsedSuccess: true,
  parsedData: {
    name: "Alex Chen",
    email: "alex.chen@university.edu",
    phone: "+1 (555) 342-9081",
    location: "San Francisco, CA",
    skills: ["TypeScript", "React", "Node.js", "Python", "GraphQL", "Tailwind CSS", "Docker", "PostgreSQL", "Next.js", "REST APIs"],
    education: [
      {
        degree: "B.S. in Computer Science",
        school: "Stanford University",
        period: "2022 - 2026",
        gpa: "3.85 / 4.00"
      }
    ],
    experience: [
      {
        role: "Software Engineer Intern",
        company: "Stripe",
        period: "Summer 2025",
        highlights: [
          "Optimized checkout page load performance by 32% by implementing lazy loading and component memoization.",
          "Collaborated on the core subscription APIs, migrating 3 legacy endpoints to modern TypeScript microservices.",
          "Wrote extensive integration tests with Jest and Cypress, raising coverage from 76% to 92% across payments dashboard."
        ]
      },
      {
        role: "Full-Stack Developer Consultant",
        company: "Stanford Spark Lab",
        period: "Fall 2024 - Present",
        highlights: [
          "Developed a real-time data visualization platform for lab researchers tracking sensor telemetry.",
          "Implemented WebSockets with Redis adapter to handle 1,000+ concurrent active socket connections."
        ]
      }
    ],
    certifications: [
      "AWS Certified Solutions Architect - Associate",
      "Google Professional Cloud Developer"
    ],
    projects: [
      {
        title: "RecruitIQ AI Core Engine",
        tech: ["React", "FastAPI", "Gemini Pro", "ChromaDB"],
        description: "An open-source resume analysis toolkit utilizing vector embeddings and LLMs to identify skill vectors and recommend custom courses."
      },
      {
        title: "Distributed Task Scheduler",
        tech: ["Go", "gRPC", "Redis", "Docker"],
        description: "A resilient, distributed cron-like scheduler featuring high availability, automatic retries, and task-stealing worker nodes."
      }
    ]
  }
};

// Available Target Job Roles for Skill Gap and Interviews
export const availableRoles = [
  { id: 'swe', name: 'Software Engineer', industry: 'Tech', expectedMatch: 88 },
  { id: 'mle', name: 'Machine Learning Engineer', industry: 'AI & Data', expectedMatch: 68 },
  { id: 'fe', name: 'Frontend Architect', industry: 'Tech', expectedMatch: 94 },
  { id: 'pm', name: 'Technical Product Manager', industry: 'Product', expectedMatch: 72 }
];

// Skill Gap details for different roles
export const mockSkillGaps: Record<string, SkillGapItem[]> = {
  swe: [
    {
      skill: "System Design",
      category: "technical",
      currentLevel: 55,
      requiredLevel: 85,
      gap: 30,
      resources: [
        { title: "System Design Primer", type: "article", provider: "GitHub / Donne Martin", link: "#", duration: "10h study" },
        { title: "Designing Data-Intensive Applications", type: "course", provider: "O'Reilly Media", link: "#", duration: "25h read" }
      ]
    },
    {
      skill: "Docker & Kubernetes",
      category: "technical",
      currentLevel: 70,
      requiredLevel: 80,
      gap: 10,
      resources: [
        { title: "Docker & Kubernetes: The Practical Guide", type: "course", provider: "Udemy", link: "#", duration: "18 hours" }
      ]
    },
    {
      skill: "System Monitoring (Prometheus)",
      category: "technical",
      currentLevel: 30,
      requiredLevel: 75,
      gap: 45,
      resources: [
        { title: "Mastering Prometheus and Grafana", type: "video", provider: "Coursera", link: "#", duration: "6 hours" }
      ]
    },
    {
      skill: "System Negotiation",
      category: "soft",
      currentLevel: 75,
      requiredLevel: 80,
      gap: 5,
      resources: [
        { title: "Effective Engineering Communication", type: "article", provider: "Medium", link: "#", duration: "45 min" }
      ]
    }
  ],
  mle: [
    {
      skill: "TensorFlow & PyTorch",
      category: "technical",
      currentLevel: 40,
      requiredLevel: 90,
      gap: 50,
      resources: [
        { title: "Deep Learning Specialization", type: "course", provider: "DeepLearning.AI", link: "#", duration: "40 hours" },
        { title: "PyTorch for Deep Learning Bootcamp", type: "video", provider: "YouTube", link: "#", duration: "12 hours" }
      ]
    },
    {
      skill: "Data Pipeline Orchestration (Airflow)",
      category: "technical",
      currentLevel: 20,
      requiredLevel: 80,
      gap: 60,
      resources: [
        { title: "Data Engineering with Apache Airflow", type: "course", provider: "DataCamp", link: "#", duration: "15 hours" }
      ]
    },
    {
      skill: "Mathematical Modeling & Statistics",
      category: "domain",
      currentLevel: 65,
      requiredLevel: 85,
      gap: 20,
      resources: [
        { title: "Practical Statistics for Data Scientists", type: "article", provider: "O'Reilly", link: "#", duration: "8h read" }
      ]
    }
  ],
  fe: [
    {
      skill: "Performance Optimization",
      category: "technical",
      currentLevel: 80,
      requiredLevel: 95,
      gap: 15,
      resources: [
        { title: "Web Performance Deep Dive", type: "course", provider: "Frontend Masters", link: "#", duration: "12 hours" }
      ]
    },
    {
      skill: "Micro-Frontends & Module Federation",
      category: "technical",
      currentLevel: 45,
      requiredLevel: 85,
      gap: 40,
      resources: [
        { title: "Architecting Micro-Frontends", type: "video", provider: "Pluralsight", link: "#", duration: "5 hours" }
      ]
    }
  ],
  pm: [
    {
      skill: "Product Roadmap Planning",
      category: "domain",
      currentLevel: 50,
      requiredLevel: 90,
      gap: 40,
      resources: [
        { title: "Product Management 101", type: "course", provider: "Reforge", link: "#", duration: "20 hours" }
      ]
    },
    {
      skill: "A/B Testing & Product Metrics",
      category: "technical",
      currentLevel: 60,
      requiredLevel: 85,
      gap: 25,
      resources: [
        { title: "Data-Driven Product Management", type: "course", provider: "GoPractice", link: "#", duration: "30 hours" }
      ]
    },
    {
      skill: "Cross-Functional Leadership",
      category: "soft",
      currentLevel: 80,
      requiredLevel: 90,
      gap: 10,
      resources: [
        { title: "Product Leadership Strategies", type: "article", provider: "Harvard Business Review", link: "#", duration: "2h read" }
      ]
    }
  ]
};

// Prestine AI Interview presets
export const mockInterviews: Record<string, InterviewSession> = {
  swe: {
    role: "Software Engineer",
    industry: "Tech",
    difficulty: "Mid",
    currentQuestionIndex: 0,
    isCompleted: false,
    questions: [
      {
        id: 1,
        question: "How would you optimize a slow database query that performs a JOIN across multiple large tables with millions of records?",
        category: "Database & Performance",
        difficulty: "Medium",
        suggestedPoints: ["Add composite indexes", "Analyze query execution plans (EXPLAIN)", "Denormalize data if necessary", "Implement read replicas / caching with Redis"],
        userAnswer: "First, I would use EXPLAIN ANALYZE to see how PostgreSQL executes the query. I will look for sequential scans and check if they can be converted to index scans. Then I would construct composite indexes on the foreign keys used in the JOIN. If there are massive aggregations, I might use a materialized view, or layer Redis as a caching mechanism for read-heavy operations."
      },
      {
        id: 2,
        question: "Can you describe a scenario where you would choose a Microservices architecture over a Monolithic architecture?",
        category: "System Architecture",
        difficulty: "Hard",
        suggestedPoints: ["Independent scaling", "Multi-team parallel delivery", "Different technology stacks", "Isolated blast radius"],
        userAnswer: "I would choose microservices when different parts of the application have drastically different scaling needs. For example, a video transcribing module that requires heavy GPU/CPU resources should scale independently of the user settings profile CRUD module. Also, if there are multiple teams working independently, microservices prevent merge collisions and isolate deployment risks."
      },
      {
        id: 3,
        question: "Explain the differences between REST and gRPC. When would you prefer one over the other in a production setup?",
        category: "API Design",
        difficulty: "Medium",
        suggestedPoints: ["HTTP/1.1 vs HTTP/2", "JSON payloads vs Protocol Buffers", "Bi-directional streaming", "Browser compatibility"],
        userAnswer: ""
      },
      {
        id: 4,
        question: "How do you ensure state synchronization across multiple tabs or server instances in a real-time web application?",
        category: "Real-time State",
        difficulty: "Hard",
        suggestedPoints: ["Redis Pub/Sub", "Sticky sessions", "BroadcastChannel API on client", "CRDTs or conflict resolution"],
        userAnswer: ""
      }
    ]
  },
  mle: {
    role: "Machine Learning Engineer",
    industry: "AI & Data",
    difficulty: "Mid",
    currentQuestionIndex: 0,
    isCompleted: false,
    questions: [
      {
        id: 1,
        question: "What is the vanishing gradient problem in deep neural networks, and how do modern architectures mitigate it?",
        category: "Deep Learning Theory",
        difficulty: "Hard",
        suggestedPoints: ["Residual connections (ResNet)", "Activation functions like ReLU", "Batch Normalization", "Proper weight initialization (He/Xavier)"],
        userAnswer: ""
      },
      {
        id: 2,
        question: "How do you detect and handle feature drift after a predictive model has been deployed to production?",
        category: "MLOps",
        difficulty: "Hard",
        suggestedPoints: ["KS-Test / PSI calculations", "Statistical logging", "Periodic retraining", "Shadow deployment strategies"],
        userAnswer: ""
      }
    ]
  },
  fe: {
    role: "Frontend Architect",
    industry: "Tech",
    difficulty: "Senior",
    currentQuestionIndex: 0,
    isCompleted: false,
    questions: [
      {
        id: 1,
        question: "How does React 19's Server Components and Action system change how we handle form submission and data mutations compared to standard API routers?",
        category: "React Architecture",
        difficulty: "Hard",
        suggestedPoints: ["useActionState hook", "Server Actions direct database call", "Automatic transition pending states", "Reduced client-bundle size"],
        userAnswer: "React 19 Server Actions allow us to declare functions that run on the server and trigger them directly from forms. This removes the need for manual fetch boilerplate. It also introduces useActionState to automatically track transition pending state, making the user experience seamless without managing manual isLoading flags."
      },
      {
        id: 2,
        question: "Walk us through your strategy for achieving a sub-100ms Interaction to Next Paint (INP) score on a highly interactive dashboard.",
        category: "Performance Architecture",
        difficulty: "Hard",
        suggestedPoints: ["Yielding with scheduler.yield()", "Avoiding long tasks in event handlers", "Using CSS transitions instead of JS timers", "Debouncing heavy rendering calculations"],
        userAnswer: ""
      }
    ]
  },
  pm: {
    role: "Technical Product Manager",
    industry: "Product",
    difficulty: "Mid",
    currentQuestionIndex: 0,
    isCompleted: false,
    questions: [
      {
        id: 1,
        question: "How do you balance high-priority technical debt with urgent revenue-generating feature requests when engineering capacity is limited?",
        category: "Product Strategy",
        difficulty: "Medium",
        suggestedPoints: ["Quantify risk of tech debt", "Determine core business metrics impact", "Dedicate a fixed baseline capacity (e.g. 20%)", "Map dependencies"],
        userAnswer: ""
      }
    ]
  }
};

// Preset Interview Evaluations (Once completed)
export const mockEvaluations: Record<string, NonNullable<InterviewSession['evaluation']>> = {
  swe: {
    technicalScore: 88,
    communicationScore: 92,
    confidenceScore: 85,
    overallScore: 88,
    summary: "Alex shows an exceptional baseline understanding of software engineering patterns and database optimizations. His performance during the structured checkout optimization scenario was highly articulate, showing both theoretical knowledge and deep practical exposure at high-performing startups (like Stripe).",
    strengths: [
      "Excellent grasp of database profiling and query optimization protocols.",
      "Clear, structured architectural description of Monolith vs Microservices tradeoffs.",
      "Highly professional vocabulary and responsive communication pacing."
    ],
    growthAreas: [
      "Could expand on the implementation specifics of distributed caches (e.g. invalidation strategies).",
      "Slightly faster response initialization times."
    ]
  },
  fe: {
    technicalScore: 95,
    communicationScore: 90,
    confidenceScore: 94,
    overallScore: 93,
    summary: "Superb candidate for a Frontend Architect role. Alex excels at modern React patterns, micro-frontend design and core web vitals. He understands performance down to the main thread yielding mechanics, which is rare for fresh grads.",
    strengths: [
      "Exceptional command of React 19 Action and Transition mechanics.",
      "Thorough understanding of INP (Interaction to Next Paint) and thread scheduling.",
      "Clear, design-system-minded answers."
    ],
    growthAreas: [
      "Integrate and test accessibility standards in micro-frontends."
    ]
  }
};

// Timeline History
export const mockTimeline: TimelineEvent[] = [
  {
    id: "t1",
    title: "Resume Analyzed",
    description: "Successfully parsed Alex_Chen_Resume_2026.pdf with a score of 87/100.",
    timestamp: "2 hours ago",
    status: "completed",
    icon: "file-check"
  },
  {
    id: "t2",
    title: "Skill Gap Configured",
    description: "Evaluated gaps against 'Software Engineer' target career profile.",
    timestamp: "1 hour ago",
    status: "completed",
    icon: "target"
  },
  {
    id: "t3",
    title: "AI Interview Completed",
    description: "Simulated a 4-question technical mock interview for Software Engineer role.",
    timestamp: "30 mins ago",
    status: "completed",
    icon: "video"
  },
  {
    id: "t4",
    title: "Evaluation Score Issued",
    description: "Awarded an overall candidate rating of 88% by RecruitIQ AI Coach.",
    timestamp: "15 mins ago",
    status: "completed",
    icon: "award"
  },
  {
    id: "t5",
    title: "Review Application Ready",
    description: "RecruitIQ finalized the profile dossier for active recruiter review.",
    timestamp: "Just now",
    status: "active",
    icon: "user-check"
  }
];

// Mock Notifications
export const mockNotifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Interview Request",
    message: "Hiring Manager at Stripe requested access to your Interview Evaluation report.",
    time: "10 mins ago",
    read: false,
    type: "success"
  },
  {
    id: "n2",
    title: "New Course Recommended",
    message: "A new tutorial 'System Design for Scale' matches your required skills list.",
    time: "2 hours ago",
    read: false,
    type: "info"
  },
  {
    id: "n3",
    title: "Resume Parsed",
    message: "Parsed 12 new skills and updated standard scoring metrics.",
    time: "3 hours ago",
    read: true,
    type: "info"
  }
];

// Recruiter Dashboard Metrics
export const mockRecruiterStats: RecruiterStats = {
  totalCandidates: 148,
  averageMatchScore: 78,
  interviewsCompleted: 412,
  placementRate: 92.4,
  pipelineData: [
    { stage: "Sourced", count: 42, color: "bg-indigo-500" },
    { stage: "Screened (AI)", count: 56, color: "bg-purple-500" },
    { stage: "Interviewing", count: 28, color: "bg-blue-500" },
    { stage: "Offered", count: 14, color: "bg-emerald-500" },
    { stage: "Placed", count: 8, color: "bg-teal-500" }
  ],
  skillsInDemand: [
    { skill: "React / Next.js", growth: 12, count: 94 },
    { skill: "TypeScript", growth: 15, count: 88 },
    { skill: "Python / PyTorch", growth: 22, count: 62 },
    { skill: "System Design", growth: 8, count: 54 },
    { skill: "Docker / AWS", growth: 5, count: 47 }
  ]
};

// Rich Candidate Pool for the Recruiter Tab
export interface RecruiterCandidate {
  id: string;
  name: string;
  avatar: string;
  role: string;
  matchScore: number;
  resumeScore: number;
  interviewScore: number;
  skills: string[];
  college: string;
  status: 'Interviewing' | 'Screened' | 'Offered' | 'Shortlisted';
  lastActive: string;
  email: string;
}

export const mockCandidatePool: RecruiterCandidate[] = [
  {
    id: "cand1",
    name: "Alex Chen",
    avatar: "AC",
    role: "Software Engineer",
    matchScore: 88,
    resumeScore: 87,
    interviewScore: 88,
    skills: ["TypeScript", "React", "Node.js", "Docker", "PostgreSQL"],
    college: "Stanford University",
    status: "Shortlisted",
    lastActive: "15 mins ago",
    email: "alex.chen@university.edu"
  },
  {
    id: "cand2",
    name: "Sarah Jenkins",
    avatar: "SJ",
    role: "Frontend Architect",
    matchScore: 94,
    resumeScore: 92,
    interviewScore: 95,
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Web Performance"],
    college: "UC Berkeley",
    status: "Interviewing",
    lastActive: "1 hour ago",
    email: "sjenkins@berkeley.edu"
  },
  {
    id: "cand3",
    name: "Marcus Aurelius",
    avatar: "MA",
    role: "Machine Learning Engineer",
    matchScore: 81,
    resumeScore: 78,
    interviewScore: 84,
    skills: ["Python", "PyTorch", "FastAPI", "Scikit-Learn", "Docker"],
    college: "MIT",
    status: "Screened",
    lastActive: "1 day ago",
    email: "marcus@mit.edu"
  },
  {
    id: "cand4",
    name: "Elena Rostova",
    avatar: "ER",
    role: "Technical Product Manager",
    matchScore: 89,
    resumeScore: 85,
    interviewScore: 92,
    skills: ["Roadmapping", "A/B Testing", "Agile", "SQL", "Product Analytics"],
    college: "Stanford University",
    status: "Offered",
    lastActive: "3 hours ago",
    email: "elena.rostova@stanford.edu"
  },
  {
    id: "cand5",
    name: "Devon Miller",
    avatar: "DM",
    role: "Software Engineer",
    matchScore: 79,
    resumeScore: 82,
    interviewScore: 76,
    skills: ["Go", "Kubernetes", "gRPC", "PostgreSQL", "Redis"],
    college: "Carnegie Mellon",
    status: "Screened",
    lastActive: "2 days ago",
    email: "dmiller@cmu.edu"
  }
];
