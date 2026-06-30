import { 
  Sparkles, 
  CheckCircle, 
  MapPin, 
  BookOpen, 
  FileText, 
  Video, 
  Award, 
  Target, 
  TrendingUp, 
  Milestone,
  CheckCircle2,
  Sliders,
  CalendarCheck
} from 'lucide-react';
import { TimelineEvent } from '../types';

interface InsightsPanelProps {
  timeline: TimelineEvent[];
  onNavigateToTab: (tabId: string) => void;
}

export default function InsightsPanel({ timeline, onNavigateToTab }: InsightsPanelProps) {
  
  // Dynamic hiring checklist
  const checklists = [
    { label: "PDF Resume Indexed", status: "completed", desc: "Successfully parsed Alex_Chen_Resume_2026.pdf" },
    { label: "Target Profile Aligned", status: "completed", desc: "Aligned against standard 'Software Engineer' career path" },
    { label: "Mock Interview Conducted", status: "completed", desc: "4 detailed system-design and database scenarios completed" },
    { label: "Dossier Screening Ready", status: "active", desc: "Compiled and locked for Stripe, Ramp, and Ashby hiring lists" }
  ];

  // Helper to map icons for timeline
  const getTimelineIcon = (iconName: string) => {
    switch(iconName) {
      case 'file-check': return <FileText className="w-4.5 h-4.5 text-violet-600" />;
      case 'target': return <Target className="w-4.5 h-4.5 text-indigo-600" />;
      case 'video': return <Video className="w-4.5 h-4.5 text-blue-600" />;
      case 'award': return <Award className="w-4.5 h-4.5 text-emerald-600" />;
      default: return <CheckCircle className="w-4.5 h-4.5 text-violet-600" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="insights-timeline-container">
      {/* Left Col: Career Roadmaps & Readiness indices (span 7) */}
      <div className="lg:col-span-7 space-y-6">
        {/* Career growth panel */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-bold text-violet-700 bg-violet-50 px-2.5 py-1 rounded-full border border-violet-100 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-violet-500 animate-pulse" /> AI Insights & Strategic Growth
            </span>
          </div>

          <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">AI Skill Roadmap: Next Milestones</h3>
          <p className="text-xs text-slate-500 mt-1">Personalized actionable milestones calculated by RecruitIQ models based on Stripe goals.</p>

          <div className="space-y-6 mt-6">
            {/* Milestone 1 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 font-bold text-xs flex items-center justify-center shrink-0 border border-violet-200">1</div>
                <div className="w-0.5 h-12 bg-slate-100" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-slate-800">Advanced System Architecture (Target Q3 2026)</span>
                <p className="text-[11px] text-slate-500 leading-normal mt-1">Focus study on distributed key-value stores (Redis/Cassandra), consistent hashing, and split-brain resolution models to cover system architecture benchmarks.</p>
              </div>
            </div>

            {/* Milestone 2 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 border border-indigo-200">2</div>
                <div className="w-0.5 h-12 bg-slate-100" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-slate-800">Containerization & Orchestration (Target Q4 2026)</span>
                <p className="text-[11px] text-slate-500 leading-normal mt-1">Enroll in Kubernetes administration bootcamps to grasp deployment scaling, load balancer configurations, and network mesh overlays.</p>
              </div>
            </div>

            {/* Milestone 3 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-200">3</div>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-slate-800">Mock Interview Routine (Ongoing)</span>
                <p className="text-[11px] text-slate-500 leading-normal mt-1">Practice 2 system scenarios weekly under live voice timer conditions to lower verbal latency times below 100ms.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Readiness Checklist Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <CalendarCheck className="w-4.5 h-4.5 text-indigo-600" /> Hiring Readiness Checklist
            </h3>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">Ready for Review</span>
          </div>

          <div className="divide-y divide-slate-100">
            {checklists.map((check, idx) => (
              <div key={idx} className="py-3 flex items-start gap-3">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-slate-800 block">{check.label}</span>
                  <span className="text-[10px] text-slate-400 mt-0.5 block truncate">{check.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Col: Timeline (span 5) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-5 bg-violet-600 rounded-full" />
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Activity Timeline</h3>
              </div>
            </div>

            {/* Timeline track vertical line */}
            <div className="relative border-l-2 border-slate-100 pl-6 ml-3 space-y-6">
              {timeline.map((event) => (
                <div key={event.id} className="relative">
                  {/* Timeline bullet dot */}
                  <div className="absolute -left-[35px] top-0 bg-white border border-slate-200 rounded-xl p-1.5 shadow-sm hover:scale-110 hover:border-violet-400 transition-transform">
                    {getTimelineIcon(event.icon)}
                  </div>

                  {/* Timeline text info */}
                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-xs font-bold text-slate-800 block">{event.title}</span>
                      <span className="text-[9px] text-slate-400 font-semibold">{event.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed mt-1">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core system message footer */}
          <div className="border-t border-slate-100 pt-4 mt-8">
            <span className="text-[9px] text-slate-400 block text-center uppercase tracking-widest font-extrabold">All interactions logged with SEC-Audit trails</span>
          </div>
        </div>
      </div>
    </div>
  );
}
