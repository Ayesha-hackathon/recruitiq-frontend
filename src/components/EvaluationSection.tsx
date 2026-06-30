import { 
  Award, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  UserCheck, 
  ArrowUpRight,
  ShieldAlert,
  FileCheck2
} from 'lucide-react';
import { InterviewSession } from '../types';

interface EvaluationSectionProps {
  evaluationData: NonNullable<InterviewSession['evaluation']> | null;
  selectedRoleName: string;
}

export default function EvaluationSection({ evaluationData, selectedRoleName }: EvaluationSectionProps) {
  
  // Custom interactive SVG multi-axis Radar Chart representing competency vectors
  const HandcraftedRadarChart = () => {
    // 5 dimensions: System Architecture, Database/Performance, API Design, Communication, Problem Solving
    const dimensions = [
      { name: "System Design", score: evaluationData?.technicalScore || 85 },
      { name: "Communication", score: evaluationData?.communicationScore || 90 },
      { name: "Confidence", score: evaluationData?.confidenceScore || 82 },
      { name: "Code Purity", score: 92 },
      { name: "Problem Solving", score: 88 }
    ];

    const size = 320;
    const center = size / 2;
    const rMax = 100; // max radius

    // Calculate coordinates for polygon
    const points = dimensions.map((dim, index) => {
      const angle = (Math.PI * 2 / dimensions.length) * index - Math.PI / 2;
      const r = (dim.score / 100) * rMax;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return { x, y, angle, name: dim.name, score: dim.score };
    });

    const polygonPointsStr = points.map(p => `${p.x},${p.y}`).join(' ');

    // Radar grids (circles at 20, 40, 60, 80, 100)
    const gridRadii = [25, 50, 75, 100];

    return (
      <div className="relative flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-100 rounded-2xl shadow-inner select-none" id="radar-chart-container">
        <svg width={size} height={size} className="overflow-visible">
          {/* Grid circles */}
          {gridRadii.map((r, idx) => (
            <circle
              key={idx}
              cx={center}
              cy={center}
              r={r}
              fill="none"
              className="stroke-slate-200"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          ))}

          {/* Grid axis lines */}
          {points.map((p, idx) => {
            const endX = center + rMax * Math.cos(p.angle);
            const endY = center + rMax * Math.sin(p.angle);
            return (
              <line
                key={idx}
                x1={center}
                y1={center}
                x2={endX}
                y2={endY}
                className="stroke-slate-200"
                strokeWidth="1"
              />
            );
          })}

          {/* Glowing polygon area representing candidate scores */}
          <polygon
            points={polygonPointsStr}
            fill="rgba(99, 102, 241, 0.15)"
            className="stroke-violet-600"
            strokeWidth="2.5"
          />

          {/* Glowing points markers */}
          {points.map((p, idx) => (
            <circle
              key={idx}
              cx={p.x}
              cy={p.y}
              r="4.5"
              className="fill-violet-700 stroke-white"
              strokeWidth="1.5"
            />
          ))}

          {/* Grid dimension labels with conditional positions */}
          {points.map((p, idx) => {
            const labelDist = rMax + 18;
            const labelX = center + labelDist * Math.cos(p.angle);
            const labelY = center + labelDist * Math.sin(p.angle);
            let textAnchor = "middle";
            if (Math.cos(p.angle) > 0.1) textAnchor = "start";
            if (Math.cos(p.angle) < -0.1) textAnchor = "end";

            return (
              <text
                key={idx}
                x={labelX}
                y={labelY + 4}
                textAnchor={textAnchor}
                className="fill-slate-500 font-bold text-[9px] uppercase tracking-wide"
              >
                {p.name} ({p.score}%)
              </text>
            );
          })}
        </svg>
      </div>
    );
  };

  // Default fallback data if interview hasn't been simulated yet
  const displayData = evaluationData || {
    technicalScore: 84,
    communicationScore: 80,
    confidenceScore: 78,
    overallScore: 81,
    summary: "Mock interview not finalized. To generate real-time evaluations, navigate to the 'AI Interview' tab, select a target tech role, click 'Generate AI Interview' and input answers to complete the mock room evaluation.",
    strengths: [
      "No active strengths logged. Complete the mock interview to evaluate.",
    ],
    growthAreas: [
      "No active developmental needs logged.",
    ]
  };

  return (
    <div className="space-y-8" id="evaluation-section-container">
      {/* Top Welcome Title block */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-violet-50 text-violet-700 rounded-2xl shrink-0 border border-violet-100">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">AI Diagnostic Assessment Dossier</h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Review your detailed mock evaluation report. This includes qualitative code purity, structured behavioral scores, and strategic growth guidelines compiled for hiring recruiters.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
              Target Profile: {selectedRoleName}
            </span>
          </div>
        </div>
      </div>

      {/* Main Scoring layouts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left (Radar competence & core metric bars) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-5 bg-violet-600 rounded-full" />
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Competency Vector Mapping</h3>
              </div>

              {/* Handcrafted Radar rendering */}
              <div className="flex justify-center my-4">
                <HandcraftedRadarChart />
              </div>
            </div>

            {/* Individual bar breakdowns */}
            <div className="border-t border-slate-100 pt-5 mt-6 space-y-4">
              {/* Technical Score */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-1.5"><Sliders className="w-4 h-4 text-violet-500" /> Technical & Core Architecture</span>
                  <span className="text-violet-700">{displayData.technicalScore}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-violet-600 h-2 rounded-full transition-all duration-1000" style={{ width: `${displayData.technicalScore}%` }} />
                </div>
              </div>

              {/* Communication */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-1.5"><Sliders className="w-4 h-4 text-indigo-500" /> Conversational Articulation</span>
                  <span className="text-indigo-700">{displayData.communicationScore}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-indigo-600 h-2 rounded-full transition-all duration-1000" style={{ width: `${displayData.communicationScore}%` }} />
                </div>
              </div>

              {/* Confidence */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-1.5"><Sliders className="w-4 h-4 text-blue-500" /> Sound Delivery & Pacing</span>
                  <span className="text-blue-700">{displayData.confidenceScore}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-blue-600 h-2 rounded-full transition-all duration-1000" style={{ width: `${displayData.confidenceScore}%` }} />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right (AI Coach notes, strengths, and shortlists) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Diagnostic overview text */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-violet-700 bg-violet-50 px-2.5 py-1 rounded-full border border-violet-100 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-violet-500 animate-pulse" /> AI Assessment Overview
                </span>
                <span className="text-[10px] font-bold text-slate-400">Composite: {displayData.overallScore}%</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                {displayData.summary}
              </p>

              {/* Strengths lists */}
              <div className="mt-6 space-y-4">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Core Assessment Highlights</span>
                
                {displayData.strengths.map((st, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{st}</span>
                  </div>
                ))}

                {displayData.growthAreas.map((ga, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs font-semibold text-slate-600 bg-amber-50/40 p-2.5 rounded-xl border border-amber-100">
                    <ShieldAlert className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wide">Growth Area</span>
                      <span className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{ga}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Partner recruiter dossier lock */}
            {evaluationData && (
              <div className="border-t border-slate-100 pt-5 mt-6 bg-violet-50/10 p-4 rounded-2xl border border-violet-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-violet-600 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-800 block">Dossier Locked</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">Ready for Stripe and Ashby channels</span>
                  </div>
                </div>
                <button className="text-[10px] font-bold text-violet-700 bg-violet-100/60 hover:bg-violet-100 px-3 py-1.5 rounded-xl border border-violet-200 shrink-0 flex items-center gap-1">
                  Share <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
