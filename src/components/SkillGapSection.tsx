import { useState } from 'react';
import { 
  Target, 
  Sparkles, 
  TrendingUp, 
  BookOpen, 
  ChevronRight, 
  Award, 
  Layers, 
  CheckCircle,
  ExternalLink,
  BookMarked
} from 'lucide-react';
import { SkillGapItem } from '../types';
import { availableRoles, mockSkillGaps } from '../data/mockData';

interface SkillGapSectionProps {
  onUpdateScore: (score: number) => void;
}

export default function SkillGapSection({ onUpdateScore }: SkillGapSectionProps) {
  const [selectedRoleId, setSelectedRoleId] = useState('swe');
  
  const currentRole = availableRoles.find(r => r.id === selectedRoleId) || availableRoles[0];
  const skillGaps = mockSkillGaps[selectedRoleId] || [];

  // Filter strengths (gap <= 10 or current >= required) and gaps (gap > 10)
  const strengths = skillGaps.filter(s => s.gap <= 10 || s.currentLevel >= s.requiredLevel);
  const gaps = skillGaps.filter(s => s.gap > 10 && s.currentLevel < s.requiredLevel);

  const handleRoleChange = (roleId: string) => {
    setSelectedRoleId(roleId);
    const selected = availableRoles.find(r => r.id === roleId);
    if (selected) {
      onUpdateScore(selected.expectedMatch);
    }
  };

  // Custom SVG Half-Circle Match Gauge
  const MatchGauge = ({ score }: { score: number }) => {
    const radius = 60;
    const strokeWidth = 12;
    const circumference = Math.PI * radius; // Half circle
    const offset = circumference - (score / 100) * circumference;

    return (
      <div className="relative flex flex-col items-center justify-center select-none" id="match-gauge-container">
        <svg width="150" height="90" className="transform overflow-visible">
          {/* Base Track */}
          <path
            d="M 15 80 A 60 60 0 0 1 135 80"
            fill="none"
            className="stroke-slate-100"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Dynamic Fill with Indigo-Violet gradient */}
          <path
            d="M 15 80 A 60 60 0 0 1 135 80"
            fill="none"
            stroke="url(#indigoVioletGrad)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="indigoVioletGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute top-8 flex flex-col items-center">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{score}%</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Match Score</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8" id="skill-gap-section-container">
      {/* Target Role Selector Toolbar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-indigo-50 text-indigo-700 rounded-2xl shrink-0 border border-indigo-100">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">AI Career Vector Profiler</h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Select your career aspirations. RecruitIQ will align your resume skills with market demands to discover critical knowledge gaps.
              </p>
            </div>
          </div>

          {/* Quick Dropdown select list */}
          <div className="relative w-full md:w-64">
            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">Aspirations Target</label>
            <select
              value={selectedRoleId}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="w-full text-xs font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100/60 border border-slate-200 focus:border-violet-500 rounded-xl px-3.5 py-2.5 transition-all outline-none cursor-pointer"
              id="job-role-dropdown"
            >
              {availableRoles.map(role => (
                <option key={role.id} value={role.id}>
                  {role.name} ({role.industry})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Matching Analytics Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Match Meter & Alignment Index */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between" id="alignment-index-card">
          <div className="text-center">
            <span className="text-[10px] font-bold text-violet-700 bg-violet-50 px-2.5 py-1 rounded-full border border-violet-100 inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-violet-500 animate-pulse" /> Alignment Metrics
            </span>
            <div className="flex justify-center mt-6">
              <MatchGauge score={currentRole.expectedMatch} />
            </div>
            <p className="text-xs font-bold text-slate-800 mt-3">{currentRole.name} Vector</p>
            <p className="text-xs text-slate-500 px-4 mt-2 leading-relaxed">
              Based on {skillGaps.length} target indicators. You exhibit exceptional core skill overlaps.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-5 mt-6 space-y-3.5">
            <div className="flex items-center justify-between text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> Technical Skills Matching</span>
              <span className="font-bold text-slate-800">{currentRole.expectedMatch - 2}%</span>
            </div>
            <div className="flex items-center justify-between text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> Academic Domain Fit</span>
              <span className="font-bold text-slate-800">95%</span>
            </div>
            <div className="flex items-center justify-between text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> Experience Seniority Index</span>
              <span className="font-bold text-slate-800">80%</span>
            </div>
          </div>
        </div>

        {/* Right Col (spanning 2 cols): Strengths & Weaknesses mapped side by side */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6" id="skills-bento-split">
          {/* Strengths Card */}
          <div className="bg-gradient-to-b from-emerald-50/10 to-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-600" /> Checked Strengths
                </span>
                <span className="text-[11px] font-bold text-slate-400">{strengths.length} items</span>
              </div>
              
              {strengths.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">No major skills matched as strong yet.</p>
              ) : (
                <div className="space-y-4">
                  {strengths.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                        <span>{item.skill}</span>
                        <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-extrabold">{item.currentLevel}% Match</span>
                      </div>
                      
                      {/* Progress representation */}
                      <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${item.currentLevel}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="border-t border-slate-100 pt-3 mt-4 text-[10px] text-slate-400">
              Strengths meet or exceed benchmark standards.
            </div>
          </div>

          {/* Gaps/Missing Skills Card */}
          <div className="bg-gradient-to-b from-rose-50/10 to-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-rose-800 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-rose-600" /> Core Skill Gaps
                </span>
                <span className="text-[11px] font-bold text-slate-400">{gaps.length} items</span>
              </div>

              {gaps.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">Incredible! Zero major gaps discovered.</p>
              ) : (
                <div className="space-y-4">
                  {gaps.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                        <span>{item.skill}</span>
                        <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded text-[10px] font-extrabold">-{item.gap}% Gap</span>
                      </div>
                      
                      {/* Dual Progress: Current vs Required */}
                      <div className="relative w-full bg-slate-200 h-1.5 rounded-full mt-2.5 overflow-hidden">
                        <div className="bg-slate-300 h-1.5 rounded-full absolute" style={{ width: `${item.requiredLevel}%` }} />
                        <div className="bg-rose-500 h-1.5 rounded-full absolute" style={{ width: `${item.currentLevel}%` }} />
                      </div>
                      
                      <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold mt-1">
                        <span>Current: {item.currentLevel}%</span>
                        <span>Required: {item.requiredLevel}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-slate-100 pt-3 mt-4 text-[10px] text-slate-400">
              Action recommended: See personalized curation map below.
            </div>
          </div>
        </div>
      </div>

      {/* Course Curation & Learning Recommendations */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm" id="resource-recommendations-row">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 mb-4">
          <BookMarked className="w-4.5 h-4.5 text-violet-600" /> Personalized AI Curation & Course Path
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {skillGaps.map((skillItem) => 
            skillItem.resources.map((res, i) => (
              <div 
                key={`${skillItem.skill}-${i}`}
                className="bg-slate-50/50 border border-slate-200/80 p-5 rounded-2xl shadow-inner hover:border-violet-300 hover:bg-white transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="text-[10px] font-bold text-violet-700 bg-violet-50 px-2.5 py-1 rounded-full border border-violet-100">
                      {skillItem.skill}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{res.type}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 leading-snug group-hover:text-violet-700 transition-colors">{res.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-2">Provider: {res.provider} • Duration: {res.duration}</p>
                </div>

                <div className="border-t border-slate-200/40 pt-4 mt-5 flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Study Core Curriculum
                  </span>
                  <a 
                    href={res.link} 
                    className="text-[10px] text-violet-600 group-hover:text-violet-800 font-extrabold flex items-center gap-0.5 hover:underline"
                    target="_blank" 
                    rel="noreferrer"
                  >
                    Enroll <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
