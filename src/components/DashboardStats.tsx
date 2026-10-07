import React from 'react';
import {
  CheckCircle,
  TrendingUp,
  Award,
  Flame,
  ArrowUpRight
} from 'lucide-react';

interface DashboardStatsProps {
  completedCount: number;
  averageScore: number;
  bestScore: number;
  streakDays: number;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  completedCount,
  averageScore,
  bestScore,
  streakDays
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      
      {/* CARD 1: INTERVIEWS COMPLETED */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Interviews Completed
          </span>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2455F5] flex items-center justify-center group-hover:bg-[#2455F5] group-hover:text-white transition-colors">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-black text-[#151A45]">{completedCount}</span>
          <span className="text-xs text-slate-400 font-semibold">Sessions</span>
        </div>
        <div className="mt-3 flex items-center text-xs text-slate-500 font-medium">
          <span className="text-emerald-600 font-bold flex items-center mr-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +2
          </span>
          <span>completed this week</span>
        </div>
      </div>

      {/* CARD 2: AVERAGE SCORE */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Average Score
          </span>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#4438CA] flex items-center justify-center group-hover:bg-[#4438CA] group-hover:text-white transition-colors">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-black text-[#151A45]">{averageScore}%</span>
          <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            +7% this week
          </span>
        </div>
        <div className="mt-3 text-xs text-slate-500 font-medium">
          Target benchmark: <span className="font-bold text-slate-700">75%</span>
        </div>
      </div>

      {/* CARD 3: BEST SCORE */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Best Score
          </span>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#6D3FE8] flex items-center justify-center group-hover:bg-[#6D3FE8] group-hover:text-white transition-colors">
            <Award className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-black text-[#151A45]">{bestScore}</span>
          <span className="text-base text-slate-400 font-bold">/100</span>
          <span className="text-xs font-extrabold text-[#6D3FE8] bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
            Top Tier
          </span>
        </div>
        <div className="mt-3 text-xs text-slate-500 font-medium">
          Achieved on: <span className="font-bold text-slate-700">Oct 06 (Today)</span>
        </div>
      </div>

      {/* CARD 4: CURRENT STREAK */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Current Streak
          </span>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors">
            <Flame className="w-5 h-5 fill-amber-500 group-hover:fill-white" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-black text-[#151A45]">{streakDays}</span>
          <span className="text-sm text-slate-500 font-bold">Days</span>
        </div>
        <div className="mt-3 flex items-center text-xs text-amber-600 font-bold">
          <span>🔥 Daily practice goal maintained</span>
        </div>
      </div>

    </div>
  );
};
