import React, { useState } from 'react';
import {
  Sparkles,
  PlayCircle,
  BookOpen,
  History,
  TrendingDown,
  Calendar,
  User,
  Bell,
  Menu,
  X,
  Plus,
  LayoutDashboard,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { UserProfile } from '../types/interview';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: UserProfile;
  onStartNewInterview: () => void;
  onLogout: () => void;
  notificationCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  onStartNewInterview,
  onLogout,
  notificationCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'practice', label: 'Practice Interview', icon: PlayCircle },
    { id: 'questions', label: 'Question Bank', icon: BookOpen },
    { id: 'history', label: 'Interview History', icon: History },
    { id: 'skill-gap', label: 'Skill Gap', icon: TrendingDown },
    { id: 'plan', label: 'Improvement Plan', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const notifications = [
    {
      id: 1,
      title: 'Adaptive Calibration Complete',
      desc: 'Your Java collection knowledge moved to 91% (Top Tier).',
      time: '15m ago',
      unread: true
    },
    {
      id: 2,
      title: 'Day 3 Improvement Plan Ready',
      desc: 'DSA Arrays: Kadane’s algorithm session is waiting for you.',
      time: '2h ago',
      unread: true
    },
    {
      id: 3,
      title: 'New Mock Interview Available',
      desc: 'System Design: Distributed Rate Limiter simulator added.',
      time: '1d ago',
      unread: false
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LEFT: InterviewAI Logo & Branding */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2455F5] via-[#4438CA] to-[#6D3FE8] flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-[#151A45] via-[#2455F5] to-[#6D3FE8] bg-clip-text text-transparent">
                  InterviewAI
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#2455F5] rounded border border-blue-200/60">
                  Pro
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400 hidden sm:block leading-none">
                AI Interview Coach
              </p>
            </div>
          </div>

          {/* CENTER: Desktop Navigation Tabs */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150 flex items-center space-x-1.5 ${
                    isActive
                      ? 'text-[#2455F5] bg-blue-50/80 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-[#151A45] hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#2455F5]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* RIGHT: Notifications, Avatar, "+ New Interview" */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            
            {/* Notification Button */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg relative transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#2455F5] rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-3 px-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                    <span className="font-bold text-sm text-slate-800">Notifications</span>
                    <span className="text-xs text-[#2455F5] font-semibold cursor-pointer hover:underline">
                      Mark all read
                    </span>
                  </div>
                  <div className="space-y-1">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-2.5 rounded-xl transition-colors hover:bg-slate-50 cursor-pointer ${
                          n.unread ? 'bg-blue-50/40' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <p className="text-xs font-bold text-slate-800">{n.title}</p>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar & Name */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center space-x-2 p-1 pl-1.5 pr-2 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2455F5] to-[#6D3FE8] flex items-center justify-center text-white text-xs font-bold ring-2 ring-blue-100">
                  AK
                </div>
                <div className="hidden md:block text-left">
                  <span className="block text-xs font-bold text-slate-800 leading-tight">
                    {user.name}
                  </span>
                  <span className="block text-[10px] text-slate-400 leading-tight">
                    Ready: {user.currentReadiness}%
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-800">{user.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    <div className="mt-1 flex items-center space-x-1 text-[11px] font-semibold text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{user.targetRole}</span>
                    </div>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      View Profile & Resume
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('plan');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      7-Day Improvement Plan
                    </button>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* "+ New Interview" Button */}
            <button
              onClick={onStartNewInterview}
              className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#2455F5] via-[#3155E8] to-[#6D3FE8] hover:opacity-95 shadow-md shadow-blue-600/20 active:scale-98 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New Interview</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 text-left transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-[#2455F5]'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#2455F5]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartNewInterview();
              }}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#2455F5] to-[#6D3FE8] shadow-md shadow-blue-600/20"
            >
              <Plus className="w-4 h-4" />
              <span>Start New Interview</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
