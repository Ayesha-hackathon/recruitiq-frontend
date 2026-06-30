import { 
  FileCheck, 
  Target, 
  Video, 
  Award, 
  TrendingUp, 
  ArrowUpRight 
} from 'lucide-react';

interface KpiCardsProps {
  resumeScore: number;
  skillMatchScore: number;
  interviewReadiness: number;
  overallRating: number;
  onCardClick?: (tabId: string) => void;
}

export default function KpiCards({ 
  resumeScore, 
  skillMatchScore, 
  interviewReadiness, 
  overallRating,
  onCardClick
}: KpiCardsProps) {
  
  // Custom SVG Circular Progress Ring generator
  const ProgressRing = ({ percentage, colorClass, size = 52 }: { percentage: number, colorClass: string, size?: number }) => {
    const radius = size * 0.4;
    const strokeWidth = size * 0.09;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="stroke-slate-100"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Active progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className={`${colorClass} transition-all duration-1000 ease-out`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <div className="absolute text-[10px] font-extrabold text-slate-800">
          {percentage}%
        </div>
      </div>
    );
  };

  const cards = [
    {
      id: 'resume-analysis',
      title: "Resume Score",
      value: resumeScore,
      rating: "Top 8%",
      comparison: "+12% vs Stanford mean",
      icon: FileCheck,
      color: "stroke-violet-600",
      bgGradient: "from-violet-50 to-white hover:border-violet-300",
      iconColor: "bg-violet-100 text-violet-700",
      description: "Based on grammar, keyword density, metrics-driven bullet points, and formatting structure."
    },
    {
      id: 'skill-gap',
      title: "Skill Match Score",
      value: skillMatchScore,
      rating: "Highly Aligned",
      comparison: "+18% versus core requirements",
      icon: Target,
      color: "stroke-indigo-600",
      bgGradient: "from-indigo-50 to-white hover:border-indigo-300",
      iconColor: "bg-indigo-100 text-indigo-700",
      description: "Comparison of your skills against the Software Engineer target industry role profile."
    },
    {
      id: 'ai-interview',
      title: "Interview Readiness",
      value: interviewReadiness,
      rating: "Ready for Stripe",
      comparison: "+15% versus placement benchmarks",
      icon: Video,
      color: "stroke-blue-600",
      bgGradient: "from-blue-50 to-white hover:border-blue-300",
      iconColor: "bg-blue-100 text-blue-700",
      description: "Based on confidence levels, vocabulary pacing, clarity, and system-design answer accuracy."
    },
    {
      id: 'evaluation',
      title: "Overall Rating",
      value: overallRating,
      rating: "Tier 1 Candidate",
      comparison: "Outstanding talent pool fit",
      icon: Award,
      color: "stroke-emerald-600",
      bgGradient: "from-emerald-50 to-white hover:border-emerald-300",
      iconColor: "bg-emerald-100 text-emerald-700",
      description: "Unified index evaluation calculated by RecruitIQ models across all screening phases."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6" id="kpi-cards-grid">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            onClick={() => onCardClick && onCardClick(card.id)}
            className={`bg-gradient-to-b ${card.bgGradient} border border-slate-200/80 p-5 rounded-2xl shadow-sm transition-all duration-300 ease-out cursor-pointer group hover:-translate-y-1 hover:shadow-md flex flex-col justify-between`}
            id={`kpi-card-${card.id}`}
          >
            <div>
              {/* Header inside KPI */}
              <div className="flex items-center justify-between gap-3">
                <div className={`p-2 rounded-xl shrink-0 ${card.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ProgressRing percentage={card.value} colorClass={card.color} />
              </div>

              {/* Metric Values */}
              <div className="mt-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{card.title}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-slate-900 tracking-tight">{card.value}%</span>
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                    {card.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Comparison line */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-slate-500">
              <span className="text-xs font-medium flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                {card.comparison}
              </span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-violet-600 transition-opacity" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
