export type TabType = 
  | 'dashboard'
  | 'resume-analysis'
  | 'skill-gap'
  | 'ai-interview'
  | 'evaluation'
  | 'profile'
  | 'settings';

export type UserRole = 'candidate' | 'recruiter' | 'campus';

export interface ResumeMetadata {
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  parsedSuccess: boolean;
  parsedData?: {
    name: string;
    email: string;
    phone: string;
    location: string;
    skills: string[];
    education: {
      degree: string;
      school: string;
      period: string;
      gpa?: string;
    }[];
    experience: {
      role: string;
      company: string;
      period: string;
      highlights: string[];
    }[];
    certifications: string[];
    projects: {
      title: string;
      tech: string[];
      description: string;
    }[];
  };
}

export interface SkillGapItem {
  skill: string;
  category: 'technical' | 'soft' | 'domain';
  currentLevel: number; // 0 to 100
  requiredLevel: number; // 0 to 100
  gap: number; // difference
  resources: {
    title: string;
    type: 'course' | 'article' | 'video';
    provider: string;
    link: string;
    duration: string;
  }[];
}

export interface InterviewQuestion {
  id: number;
  question: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  suggestedPoints: string[];
  userAnswer?: string;
  feedback?: {
    score: number;
    strength: string;
    improvement: string;
    modelAnswer: string;
  };
}

export interface InterviewSession {
  role: string;
  industry: string;
  difficulty: 'Entry' | 'Mid' | 'Senior';
  questions: InterviewQuestion[];
  currentQuestionIndex: number;
  isCompleted: boolean;
  evaluation?: {
    technicalScore: number;
    communicationScore: number;
    confidenceScore: number;
    overallScore: number;
    summary: string;
    strengths: string[];
    growthAreas: string[];
  };
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'active' | 'pending';
  icon: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'alert';
}

export interface RecruiterStats {
  totalCandidates: number;
  averageMatchScore: number;
  interviewsCompleted: number;
  placementRate: number;
  pipelineData: {
    stage: string;
    count: number;
    color: string;
  }[];
  skillsInDemand: {
    skill: string;
    growth: number;
    count: number;
  }[];
}
