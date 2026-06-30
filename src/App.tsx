import { useState } from 'react';
import { 
  mockResumeData, 
  mockTimeline, 
  mockNotifications, 
  mockEvaluations,
  availableRoles 
} from './data/mockData';
import { TabType, UserRole, ResumeMetadata, NotificationItem, TimelineEvent } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import KpiCards from './components/KpiCards';
import ResumeSection from './components/ResumeSection';
import SkillGapSection from './components/SkillGapSection';
import InterviewSection from './components/InterviewSection';
import EvaluationSection from './components/EvaluationSection';
import InsightsPanel from './components/InsightsPanel';
import RecruiterDashboard from './components/RecruiterDashboard';
import { 
  User, 
  Settings as SettingsIcon, 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles, 
  GraduationCap, 
  Check, 
  Lock, 
  Sliders, 
  ShieldCheck, 
  Volume2, 
  Eye, 
  Trash2,
  CalendarDays,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('candidate');
  const [candidateName, setCandidateName] = useState('Alex Chen');
  const [resumeData, setResumeData] = useState<ResumeMetadata>(mockResumeData);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [timeline, setTimeline] = useState<TimelineEvent[]>(mockTimeline);
  
  // Custom states for active evaluations & readiness
  const [selectedRoleId, setSelectedRoleId] = useState('swe');
  const [evaluationReport, setEvaluationReport] = useState<any | null>(null);

  // Scores
  const [resumeScore, setResumeScore] = useState(87);
  const [skillMatchScore, setSkillMatchScore] = useState(88);
  const [interviewReadiness, setInterviewReadiness] = useState(81);
  const [overallRating, setOverallRating] = useState(85);

  // Settings states
  const [isVoiceOn, setIsVoiceOn] = useState(true);
  const [isEmailAlertOn, setIsEmailAlertOn] = useState(true);
  const [apiGateway, setApiGateway] = useState('Production Secure-V2');

  const selectedRoleName = availableRoles.find(r => r.id === selectedRoleId)?.name || "Software Engineer";

  // Triggered when user finishes simulated interview
  const handleCompleteInterview = (roleId: string, evaluation: any) => {
    setSelectedRoleId(roleId);
    setEvaluationReport(evaluation);
    
    // Auto-update overall rating dynamically
    setInterviewReadiness(evaluation.overallScore);
    const calculatedOverall = Math.round((resumeScore + skillMatchScore + evaluation.overallScore) / 3);
    setOverallRating(calculatedOverall);

    // Push new activity event onto timeline
    const newEvent: TimelineEvent = {
      id: `t_${Date.now()}`,
      title: "Interview Evaluated",
      description: `Completed mock interview for ${selectedRoleName} with score of ${evaluation.overallScore}%.`,
      timestamp: "Just now",
      status: "completed",
      icon: "award"
    };
    setTimeline(prev => [newEvent, ...prev]);

    // Push alert notification
    const newAlert: NotificationItem = {
      id: `n_${Date.now()}`,
      title: "Report Score Generated",
      message: `AI generated your assessment report for ${selectedRoleName}. Overall rating: ${evaluation.overallScore}%.`,
      time: "Just now",
      read: false,
      type: "success"
    };
    setNotifications(prev => [newAlert, ...prev]);

    // Relocate viewport tab automatically
    setActiveTab('evaluation');
  };

  // Recruiter view-dossier action
  const handleInspectCandidateDossier = (inspectedName: string, roleName: string, customEval: any) => {
    setCandidateName(inspectedName);
    setEvaluationReport(customEval);
    setInterviewReadiness(customEval.overallScore);
    setOverallRating(customEval.overallScore);
    
    // Switch to candidate perspective immediately
    setUserRole('candidate');
    setActiveTab('evaluation');
  };

  // Reset demo candidate profile
  const handleResetDemo = () => {
    setCandidateName('Alex Chen');
    setResumeData(mockResumeData);
    setNotifications(mockNotifications);
    setTimeline(mockTimeline);
    setEvaluationReport(null);
    setResumeScore(87);
    setSkillMatchScore(88);
    setInterviewReadiness(81);
    setOverallRating(85);
    setActiveTab('dashboard');
    setUserRole('candidate');
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 font-sans" id="app-root">
      
      {/* 1. Sidebar Panel */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        role={userRole} 
        setRole={setUserRole}
        candidateName={candidateName}
      />

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Header Top Bar */}
        <Header 
          role={userRole} 
          setRole={setUserRole} 
          notifications={notifications} 
          setNotifications={setNotifications}
          candidateName={candidateName}
        />

        {/* Inner Scrollable main content viewport */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8" id="main-scroller">
          
          {/* Quick Persisted Demo Reset Info Bar */}
          <div className="bg-gradient-to-r from-violet-600/5 to-indigo-600/5 border border-violet-100 p-4 rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-600 shrink-0" />
              <span className="text-xs text-slate-600 font-medium leading-relaxed">
                <span className="font-bold text-slate-800">Demo presentation shortcuts active:</span> Toggle roles or click mock voice-dictation inside the AI Interview to trigger technical assessment grading reports instantly.
              </span>
            </div>
            <button 
              onClick={handleResetDemo}
              className="text-[10px] text-violet-700 bg-white hover:bg-violet-50 font-bold px-3 py-1.5 rounded-xl border border-violet-200 shadow-sm shrink-0 transition-colors"
              id="reset-demo-state-btn"
            >
              Reset Demo States
            </button>
          </div>

          {/* Conditional Rendering base on Role */}
          {userRole === 'recruiter' ? (
            <RecruiterDashboard onViewCandidateReport={handleInspectCandidateDossier} />
          ) : (
            // Candidate Tab Routing
            <>
              {activeTab === 'dashboard' && (
                <div className="space-y-8" id="dashboard-tab-content">
                  <KpiCards 
                    resumeScore={resumeScore}
                    skillMatchScore={skillMatchScore}
                    interviewReadiness={interviewReadiness}
                    overallRating={overallRating}
                    onCardClick={setActiveTab}
                  />
                  <InsightsPanel 
                    timeline={timeline}
                    onNavigateToTab={setActiveTab}
                  />
                </div>
              )}

              {activeTab === 'resume-analysis' && (
                <ResumeSection 
                  resumeData={resumeData} 
                  onUpdateResume={(updated) => {
                    setResumeData(updated);
                    setResumeScore(90); // Boost score for newly simulated premium upload
                  }} 
                />
              )}

              {activeTab === 'skill-gap' && (
                <SkillGapSection 
                  onUpdateScore={(score) => {
                    setSkillMatchScore(score);
                    // Automatically re-calculate composite overall score
                    const calculatedOverall = Math.round((resumeScore + score + interviewReadiness) / 3);
                    setOverallRating(calculatedOverall);
                  }}
                />
              )}

              {activeTab === 'ai-interview' && (
                <InterviewSection 
                  onCompleteInterview={handleCompleteInterview}
                  onUpdateReadinessScore={setInterviewReadiness}
                />
              )}

              {activeTab === 'evaluation' && (
                <EvaluationSection 
                  evaluationData={evaluationReport}
                  selectedRoleName={selectedRoleName}
                />
              )}

              {activeTab === 'profile' && (
                <div className="space-y-8" id="profile-tab-content">
                  {/* Premium Profile card */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-violet-100 text-violet-700 font-bold text-2xl flex items-center justify-center border-2 border-violet-200 shadow-inner">
                          {candidateName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-slate-900 tracking-tight">{candidateName}</h2>
                          <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-1">
                            <GraduationCap className="w-4 h-4 text-violet-500" /> B.S. in Computer Science • Stanford University (Senior)
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span className="text-[10px] font-bold text-violet-700 bg-violet-50 px-3 py-1.5 rounded-xl border border-violet-100">STEM Cohort 2026</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">Dossier Public</span>
                      </div>
                    </div>
                  </div>

                  {/* Profile details grid splits */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left details info */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
                      <div>
                        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-4">Contact Credentials</span>
                        <div className="space-y-3.5">
                          <div className="flex items-center gap-2.5 text-xs text-slate-600">
                            <Mail className="w-4.5 h-4.5 text-slate-400 shrink-0" /> alex.chen@university.edu
                          </div>
                          <div className="flex items-center gap-2.5 text-xs text-slate-600">
                            <Phone className="w-4.5 h-4.5 text-slate-400 shrink-0" /> +1 (555) 342-9081
                          </div>
                          <div className="flex items-center gap-2.5 text-xs text-slate-600">
                            <MapPin className="w-4.5 h-4.5 text-slate-400 shrink-0" /> San Francisco, CA
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-slate-100 pt-5">
                        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-4">Academic Validation</span>
                        <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-2.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-500">Cumulative GPA</span>
                            <span className="font-bold text-slate-800">3.85 / 4.00</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-500">Major Core GPA</span>
                            <span className="font-bold text-slate-800">3.94 / 4.00</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-500">Verification Status</span>
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 flex items-center gap-0.5">
                              <ShieldCheck className="w-3 h-3" /> Official
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right active applications (span 2) */}
                    <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-6">
                          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">Active Partner Applications ({availableRoles.length})</span>
                          <span className="text-[10px] text-slate-400 font-semibold">Updated today</span>
                        </div>

                        <div className="space-y-4">
                          {availableRoles.map((role) => (
                            <div key={role.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-colors gap-4">
                              <div className="flex items-start gap-3">
                                <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-100 shrink-0">
                                  <Briefcase className="w-4.5 h-4.5" />
                                </div>
                                <div>
                                  <span className="text-xs font-bold text-slate-800 block">{role.name}</span>
                                  <span className="text-[10px] text-slate-400 mt-1 block">Industry: {role.industry} • Standard Core Alignments</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-4 self-end sm:self-auto">
                                <div className="text-right">
                                  <span className="text-[10px] text-slate-400 font-bold block">AI Match</span>
                                  <span className="text-xs font-bold text-indigo-700 block mt-0.5">{role.expectedMatch}%</span>
                                </div>
                                <button className="p-1.5 bg-white border border-slate-200 hover:border-indigo-300 text-slate-600 hover:text-indigo-700 rounded-lg transition-colors">
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-slate-100 pt-4 mt-6 flex justify-between items-center text-[10px] text-slate-400">
                        <span>Profile synchronized with university registries</span>
                        <a href="#" className="font-bold text-violet-600 hover:underline flex items-center gap-0.5">Export Profile dossier <ExternalLink className="w-3 h-3" /></a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-8" id="settings-tab-content">
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                    <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                      <SettingsIcon className="w-5 h-5 text-violet-600" /> Platform Configurations
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">Configure your RecruitIQ assessment profiles, AI voice synthesizers, and security endpoints.</p>

                    <div className="space-y-6 mt-8 max-w-2xl">
                      {/* Setting Item 1 */}
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-start gap-3">
                          <Volume2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-xs font-bold text-slate-800 block">AI Voice Dictation Assistance</span>
                            <span className="text-[11px] text-slate-500 mt-0.5 block">Synthesizes speech sounds to guide you vocally during mock interviews.</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setIsVoiceOn(!isVoiceOn)}
                          className={`w-11 h-6 rounded-full transition-colors relative ${isVoiceOn ? 'bg-violet-600' : 'bg-slate-300'}`}
                          id="toggle-voice-btn"
                        >
                          <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${isVoiceOn ? 'right-1' : 'left-1'}`} />
                        </button>
                      </div>

                      {/* Setting Item 2 */}
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-start gap-3">
                          <Sliders className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-xs font-bold text-slate-800 block">Daily Recruiter Alert Digests</span>
                            <span className="text-[11px] text-slate-500 mt-0.5 block">Emails you instantly whenever top partner recruiters (like Stripe, Ramp) view your interview reports.</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setIsEmailAlertOn(!isEmailAlertOn)}
                          className={`w-11 h-6 rounded-full transition-colors relative ${isEmailAlertOn ? 'bg-violet-600' : 'bg-slate-300'}`}
                          id="toggle-alerts-btn"
                        >
                          <span className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${isEmailAlertOn ? 'right-1' : 'left-1'}`} />
                        </button>
                      </div>

                      {/* Setting Item 3 */}
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-start gap-3">
                          <Lock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-xs font-bold text-slate-800 block">Cognitive Security Ingestion Node</span>
                            <span className="text-[11px] text-slate-500 mt-0.5 block">Selected secure gateway node where candidate credentials are hosted.</span>
                          </div>
                        </div>
                        <select
                          value={apiGateway}
                          onChange={(e) => setApiGateway(e.target.value)}
                          className="text-xs font-bold text-slate-700 bg-white border border-slate-200 focus:border-violet-500 rounded-xl px-2.5 py-1.5 cursor-pointer outline-none"
                          id="settings-api-gateway"
                        >
                          <option value="Production Secure-V2">SEC-V2 (San Francisco)</option>
                          <option value="Standard Gateway-V1">GATEWAY-V1 (Default)</option>
                          <option value="Direct P2P Encrypted">DIRECT-P2P (Sandbox)</option>
                        </select>
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </>
          )}

        </main>
      </div>

    </div>
  );
}
