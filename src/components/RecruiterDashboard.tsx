import { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  Briefcase, 
  Award, 
  Search, 
  Download, 
  Eye, 
  Sparkles,
  Filter,
  Check,
  Building,
  GraduationCap,
  Sliders,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { mockRecruiterStats, mockCandidatePool, RecruiterCandidate } from '../data/mockData';

interface RecruiterDashboardProps {
  onViewCandidateReport: (candidateId: string, roleName: string, evaluation: any) => void;
}

export default function RecruiterDashboard({ onViewCandidateReport }: RecruiterDashboardProps) {
  const [candidates, setCandidates] = useState<RecruiterCandidate[]>(mockCandidatePool);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Perform search & filters
  const filteredCandidates = candidates.filter(cand => {
    const matchesSearch = 
      cand.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      cand.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cand.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRole = roleFilter === 'All' || cand.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || cand.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleUpdateStatus = (id: string, newStatus: RecruiterCandidate['status']) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  // Preset evaluator mappings to let recruiters inspect Alex Chen or Sarah Jenkins reports instantly
  const handleInspectCandidate = (cand: RecruiterCandidate) => {
    // Inject mock report matching their credentials
    let presetEval = {
      technicalScore: cand.interviewScore,
      communicationScore: cand.interviewScore + 3 > 100 ? 100 : cand.interviewScore + 3,
      confidenceScore: cand.interviewScore - 3,
      overallScore: cand.interviewScore,
      summary: `Hiring metrics indicate ${cand.name} exhibits premium technical competencies aligned with leading organizations. Academics verified at ${cand.college} (STEM focus) with outstanding keyword matches of: ${cand.skills.join(', ')}.`,
      strengths: [
        `Highly verified ${cand.role} skillset with a score of ${cand.matchScore}%.`,
        `Directly aligned academic credentials at ${cand.college}.`
      ],
      growthAreas: [
        `Expand standard project histories under enterprise settings.`
      ]
    };

    onViewCandidateReport(cand.name, cand.role, presetEval);
  };

  return (
    <div className="space-y-8" id="recruiter-dashboard-container">
      {/* Top Welcome Title */}
      <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Building className="w-48 h-48 text-white" />
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800 inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Executive Console
            </span>
            <h2 className="text-xl font-bold mt-3 text-white tracking-tight">University Placement & Recruitment Hub</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
              Analyze talent readiness across engineering cohorts. RecruitIQ automatically scores candidates against premium enterprise hiring benchmarks, reducing screening times from weeks to minutes.
            </p>
          </div>
        </div>
      </div>

      {/* Recruiter KPI Metrics row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6" id="recruiter-kpis">
        {/* KPI 1 */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Screened Candidates</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{mockRecruiterStats.totalCandidates}</p>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1">
              <TrendingUp className="w-3.5 h-3.5 shrink-0" /> +14.2% YoY growth
            </span>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Match Score</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{mockRecruiterStats.averageMatchScore}%</p>
            <span className="text-[10px] text-slate-400 font-bold block mt-1.5">Benchmarked globally</span>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl border border-purple-100">
            <Sliders className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Interviews Completed</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{mockRecruiterStats.interviewsCompleted}</p>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1">
              <TrendingUp className="w-3.5 h-3.5 shrink-0" /> 98% completion rate
            </span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Successful Placements</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{mockRecruiterStats.placementRate}%</p>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1">
              <TrendingUp className="w-3.5 h-3.5 shrink-0" /> Tier 1 company alignment
            </span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Funnel & Skills Demand (Bento grid splits) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="recruiter-bento-split">
        {/* Funnel mapping (7 width) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-5 bg-indigo-600 rounded-full" />
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Screening Funnel Conversion</h3>
            </div>

            {/* Render custom styled horizontal stage pipeline bars */}
            <div className="space-y-4">
              {mockRecruiterStats.pipelineData.map((pipe, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span>{pipe.stage}</span>
                    <span className="text-slate-500">{pipe.count} applicants ({Math.round((pipe.count / 148) * 100)}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full mt-2.5 overflow-hidden">
                    <div className={`${pipe.color} h-3 rounded-full transition-all duration-1000`} style={{ width: `${(pipe.count / 148) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 mt-6 text-[10px] text-slate-400 block text-center uppercase tracking-wider font-bold">
            Average time-to-offer: 14 business days
          </div>
        </div>

        {/* Top Demand Skills lists (5 width) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-5 bg-purple-600 rounded-full" />
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Industry Demands Ranking</h3>
            </div>

            {/* Custom listings */}
            <div className="space-y-3.5">
              {mockRecruiterStats.skillsInDemand.map((sd, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold text-purple-700 bg-purple-50 h-5 w-5 rounded-full inline-flex items-center justify-center border border-purple-100">{i + 1}</span>
                    <span className="text-xs font-bold text-slate-800">{sd.skill}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-slate-400 font-bold">{sd.count} tags</span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">+{sd.growth}% Growth</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 mt-6 text-[10px] text-slate-400 text-center">
            Skill indexing calibrated weekly with partner systems.
          </div>
        </div>
      </div>

      {/* Main Candidate Talent Pool Registry Table */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm" id="recruiter-talent-pool-panel">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-5 bg-emerald-600 rounded-full" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Candidate Talent Pool ({filteredCandidates.length})</h3>
          </div>

          {/* Table Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-48">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search candidates/colleges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs bg-slate-50 focus:bg-white border border-slate-200 focus:border-indigo-500 pl-9 pr-3 py-2 rounded-xl text-slate-800 outline-none"
                id="talent-search"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl px-3 py-2 cursor-pointer"
              id="talent-role-filter"
            >
              <option value="All">All Roles</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Frontend Architect">Frontend Architect</option>
              <option value="Machine Learning Engineer">ML Engineer</option>
              <option value="Technical Product Manager">Product Manager</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl px-3 py-2 cursor-pointer"
              id="talent-status-filter"
            >
              <option value="All">All Statuses</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Screened">Screened</option>
              <option value="Offered">Offered</option>
            </select>
          </div>
        </div>

        {/* Registry Table content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" id="candidate-talent-table">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-50/50">
                <th className="py-4 px-4 rounded-l-xl">Candidate</th>
                <th className="py-4 px-4">Affiliation / College</th>
                <th className="py-4 px-4">Scores (Match/Resume/Int)</th>
                <th className="py-4 px-4">Verified Tech Stack</th>
                <th className="py-4 px-4">Dossier Status</th>
                <th className="py-4 px-4 text-right rounded-r-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCandidates.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                    No candidates found matching selected search parameters.
                  </td>
                </tr>
              ) : (
                filteredCandidates.map((cand) => (
                  <tr key={cand.id} className="hover:bg-slate-50/50 transition-colors">
                    
                    {/* Name block */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-700 font-extrabold text-xs flex items-center justify-center border border-indigo-100 shrink-0">
                          {cand.avatar}
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-slate-800 block">{cand.name}</span>
                          <span className="text-[10px] text-slate-400 mt-0.5 block truncate">{cand.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* Affiliation */}
                    <td className="py-4 px-4 text-xs font-semibold text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <GraduationCap className="w-4.5 h-4.5 text-indigo-500 shrink-0" />
                        <div className="flex flex-col">
                          <span>{cand.college}</span>
                          <span className="text-[9px] text-slate-400 font-normal mt-0.5">{cand.role} Path</span>
                        </div>
                      </div>
                    </td>

                    {/* Scores layout */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3.5">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">Match</span>
                          <span className="text-xs font-bold text-indigo-700 mt-0.5">{cand.matchScore}%</span>
                        </div>
                        <div className="w-px h-6 bg-slate-200" />
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">Resume</span>
                          <span className="text-xs font-bold text-violet-700 mt-0.5">{cand.resumeScore}%</span>
                        </div>
                        <div className="w-px h-6 bg-slate-200" />
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">Interview</span>
                          <span className="text-xs font-bold text-emerald-700 mt-0.5">{cand.interviewScore}%</span>
                        </div>
                      </div>
                    </td>

                    {/* Skills lists */}
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {cand.skills.map((skill, i) => (
                          <span key={i} className="text-[9px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200/50">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Hiring Status Selector */}
                    <td className="py-4 px-4">
                      <select
                        value={cand.status}
                        onChange={(e) => handleUpdateStatus(cand.id, e.target.value as any)}
                        className={`text-[10px] font-bold border rounded-lg px-2.5 py-1 outline-none cursor-pointer ${
                          cand.status === 'Shortlisted' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                          cand.status === 'Interviewing' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          cand.status === 'Offered' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                        id={`status-dropdown-${cand.id}`}
                      >
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Screened">Screened</option>
                        <option value="Offered">Offered</option>
                      </select>
                    </td>

                    {/* Action buttons */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleInspectCandidate(cand)}
                          className="p-1.5 bg-slate-50 border border-slate-200 hover:border-violet-300 text-slate-600 hover:text-violet-700 rounded-lg transition-colors flex items-center gap-1 text-[10px] font-bold"
                          title="Inspect AI interview evaluation and resume parsed data"
                          id={`view-report-btn-${cand.id}`}
                        >
                          <Eye className="w-3.5 h-3.5" /> Inspect
                        </button>
                        <button
                          className="p-1.5 bg-slate-50 border border-slate-200 hover:border-indigo-300 text-slate-600 hover:text-indigo-700 rounded-lg transition-colors"
                          title="Download PDF resume dossier"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
