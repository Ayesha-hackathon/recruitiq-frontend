import { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Target, 
  Video, 
  Award, 
  User, 
  Settings, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Shield,
  GraduationCap
} from 'lucide-react';
import { TabType, UserRole } from '../types';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  candidateName: string;
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  role, 
  setRole,
  candidateName 
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  interface MenuItem {
    readonly id: TabType;
    readonly label: string;
    readonly icon: any;
    readonly badge?: string;
    readonly pulse?: boolean;
  }

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'resume-analysis', label: 'Resume Analysis', icon: FileText, badge: 'AI' },
    { id: 'skill-gap', label: 'Skill Gap', icon: Target },
    { id: 'ai-interview', label: 'AI Interview', icon: Video, pulse: true },
    { id: 'evaluation', label: 'Evaluation Report', icon: Award },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div 
      className={`relative h-screen bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-all duration-300 ease-in-out z-30 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
      id="sidebar-container"
    >
      {/* Brand Header */}
      <div>
        <div className="h-20 flex items-center justify-between px-5 border-b border-slate-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-900/40 shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div className="flex flex-col select-none">
                <span className="text-sm font-bold text-white tracking-wide">RecruitIQ</span>
                <span className="text-[10px] text-violet-400 font-semibold tracking-wider uppercase">AI Suite</span>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex p-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            id="toggle-sidebar-btn"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* View/Role Quick Toggle inside Sidebar when not collapsed */}
        {!collapsed && (
          <div className="p-4 select-none">
            <div className="bg-slate-950 p-1.5 rounded-xl border border-slate-800/80 flex gap-1">
              <button
                onClick={() => setRole('candidate')}
                className={`flex-1 text-center py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  role === 'candidate' 
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                id="role-candidate-btn"
              >
                Candidate
              </button>
              <button
                onClick={() => setRole('recruiter')}
                className={`flex-1 text-center py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  role === 'recruiter' 
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                id="role-recruiter-btn"
              >
                Recruiter
              </button>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="px-3 py-4 space-y-1.5 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (role === 'recruiter') {
                    // Automatically drop back to candidate tab when they click candidate navigation items
                    setRole('candidate');
                  }
                  setActiveTab(item.id);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200 group ${
                  isActive && role === 'candidate'
                    ? 'bg-gradient-to-r from-violet-600/10 to-indigo-600/10 border-l-4 border-violet-500 text-white font-medium pl-2.5'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }`}
                id={`sidebar-tab-${item.id}`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 shrink-0 transition-colors ${
                    isActive && role === 'candidate' ? 'text-violet-400' : 'text-slate-400 group-hover:text-violet-400'
                  }`} />
                  {!collapsed && <span className="text-sm tracking-wide">{item.label}</span>}
                </div>
                
                {!collapsed && (
                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-violet-500/20 text-violet-400 border border-violet-500/30">
                        {item.badge}
                      </span>
                    )}
                    {item.pulse && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Footer block */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-950 border border-indigo-700/50 flex items-center justify-center text-indigo-300 font-bold text-sm shadow-inner shrink-0">
            {role === 'recruiter' ? 'HR' : candidateName.split(' ').map(n => n[0]).join('')}
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0 select-none">
              <span className="text-sm font-semibold text-slate-100 truncate">
                {role === 'recruiter' ? 'Stripe Talent Team' : candidateName}
              </span>
              <span className="text-xs text-slate-500 truncate flex items-center gap-1">
                {role === 'recruiter' ? (
                  <>
                    <Shield className="w-3 h-3 text-emerald-400" /> Enterprise
                  </>
                ) : (
                  <>
                    <GraduationCap className="w-3 h-3 text-indigo-400" /> Candidate Acc.
                  </>
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
