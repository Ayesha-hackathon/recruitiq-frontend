import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Sparkles,
  Users,
  UserCheck,
  Check,
  X,
  Sliders,
  ChevronDown,
  Info
} from 'lucide-react';
import { UserRole, NotificationItem } from '../types';

interface HeaderProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  candidateName: string;
}

export default function Header({ 
  role, 
  setRole, 
  notifications, 
  setNotifications, 
  candidateName 
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleRemoveNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <header className="h-20 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-20 px-6 md:px-8 flex items-center justify-between" id="app-header">
      {/* Dynamic Welcome Heading */}
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          {role === 'recruiter' ? (
            <>
              Recruiter Hub <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 font-semibold rounded-full border border-emerald-200">Live</span>
            </>
          ) : (
            <>
              Welcome back, {candidateName.split(' ')[0]}! <Sparkles className="w-4 h-4 text-violet-500 animate-pulse" />
            </>
          )}
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          {role === 'recruiter' 
            ? "Campus Screening & Automated Shortlisting Suite" 
            : "Review your resume score, gap analytics, and AI Interview report."}
        </p>
      </div>

      {/* Global Actions Bar */}
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative hidden lg:block w-72">
          <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={role === 'recruiter' ? "Search student databases..." : "Search resources, jobs..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 pl-10 pr-4 py-2 rounded-xl text-slate-800 transition-all outline-none"
            id="global-search-input"
          />
        </div>

        {/* View Switcher Overlay on Header */}
        <div className="flex bg-slate-100 rounded-xl p-1 border border-slate-200/80">
          <button
            onClick={() => setRole('candidate')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              role === 'candidate'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            id="role-switch-cand"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Candidate</span>
          </button>
          <button
            onClick={() => setRole('recruiter')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              role === 'recruiter'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            id="role-switch-rec"
          >
            <Users className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Recruiter</span>
          </button>
        </div>

        {/* Notification Bell Panel */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 transition-all relative ${
              showNotifications ? 'bg-slate-100 border-slate-300' : ''
            }`}
            id="notification-trigger-btn"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-extrabold text-[9px] h-5 w-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Card */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 md:w-96 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden" id="notifications-panel-dropdown">
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800">System Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-violet-100 text-violet-700 font-bold border border-violet-200">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button 
                    onClick={handleMarkAllRead}
                    className="text-[10px] text-violet-600 hover:text-violet-800 font-semibold flex items-center gap-0.5"
                    id="mark-all-read-btn"
                  >
                    <Check className="w-3 h-3" /> Mark all read
                  </button>
                )}
              </div>

              <div className="divide-y divide-slate-100 max-h-[300px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-xs flex flex-col items-center gap-2">
                    <Info className="w-6 h-6 text-slate-300" />
                    No active notifications
                  </div>
                ) : (
                  notifications.map(item => (
                    <div 
                      key={item.id} 
                      className={`p-4 transition-colors hover:bg-slate-50 relative flex gap-3 ${
                        !item.read ? 'bg-violet-50/20' : ''
                      }`}
                    >
                      <div className="mt-0.5">
                        <div className={`w-2 h-2 rounded-full ${
                          !item.read ? 'bg-violet-500 ring-4 ring-violet-100' : 'bg-slate-300'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <p className="text-xs font-semibold text-slate-800 truncate">{item.title}</p>
                          <span className="text-[9px] text-slate-400 whitespace-nowrap">{item.time}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.message}</p>
                      </div>
                      <button 
                        onClick={() => handleRemoveNotification(item.id)}
                        className="text-slate-400 hover:text-rose-500 p-0.5 rounded transition-colors self-start"
                        title="Dismiss"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-slate-600 hover:text-slate-900 font-semibold"
                >
                  Close Panel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
