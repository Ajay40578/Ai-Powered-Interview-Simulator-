import React from 'react';
import { Sparkles, ArrowRight, Award, Zap, Brain, Play } from 'lucide-react';
import { UserProfile } from '../types/interview';

interface DashboardHeroProps {
  user: UserProfile;
  onStartNewInterview: () => void;
  onViewImprovementPlan: () => void;
}

export const DashboardHero: React.FC<DashboardHeroProps> = ({
  user,
  onStartNewInterview,
  onViewImprovementPlan
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#2455F5] via-[#4438CA] via-[#6D3FE8] to-[#151A45] p-6 sm:p-10 text-white shadow-xl shadow-blue-900/15">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-400/15 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        
        {/* LEFT: Greeting & Role Information */}
        <div className="space-y-4 max-w-2xl text-left">
          
          {/* AI Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-xs font-bold tracking-wide uppercase text-blue-100">
              AI Adaptive Engine Active • Profile Calibrated
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Good morning, {user.name}
            </h1>
            <p className="text-base sm:text-lg text-blue-100/90 font-normal">
              Your personalized interview preparation starts here.
            </p>
          </div>

          {/* Badges row: Target Role & Readiness */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 flex items-center space-x-2">
              <span className="text-xs text-blue-200">Target Role:</span>
              <span className="text-xs font-bold text-white">{user.targetRole}</span>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 flex items-center space-x-2">
              <span className="text-xs text-blue-200">Current Readiness:</span>
              <span className="text-xs font-extrabold text-emerald-300">{user.currentReadiness}%</span>
              <span className="px-1.5 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-300 rounded font-bold uppercase">
                Interview Ready
              </span>
            </div>
          </div>

          {/* Buttons: "Start New Interview" & "View Improvement Plan" */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={onStartNewInterview}
              className="px-6 py-3.5 rounded-2xl text-sm font-extrabold text-[#151A45] bg-white hover:bg-blue-50 shadow-lg shadow-black/10 active:scale-98 transition-all flex items-center space-x-2"
            >
              <Play className="w-4 h-4 text-[#2455F5] fill-[#2455F5]" />
              <span>Start New Interview</span>
            </button>

            <button
              onClick={onViewImprovementPlan}
              className="px-5 py-3.5 rounded-2xl text-sm font-bold text-white bg-white/15 hover:bg-white/25 border border-white/25 backdrop-blur-md transition-all flex items-center space-x-2"
            >
              <span>View Improvement Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* RIGHT: Circular Readiness Dial / Visual AI Widget */}
        <div className="lg:shrink-0 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/25 shadow-xl flex items-center space-x-6 min-w-[280px]">
            {/* SVG Circular Progress Gauge */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-white/20"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  strokeDashoffset={`${2 * Math.PI * 42 * (1 - user.currentReadiness / 100)}`}
                  strokeLinecap="round"
                  className="text-emerald-300 transition-all duration-1000"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-white">{user.currentReadiness}%</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Readiness</span>
              </div>
            </div>

            {/* Quick Metrics Details */}
            <div className="space-y-2 text-left">
              <div>
                <span className="text-[11px] text-blue-200 block font-medium">Hiring Benchmark</span>
                <span className="text-sm font-bold text-white">80% Threshold Reached</span>
              </div>
              <div>
                <span className="text-[11px] text-blue-200 block font-medium">Next Milestone</span>
                <span className="text-xs font-semibold text-emerald-300">Senior Benchmark (88%)</span>
              </div>
              <div className="pt-1">
                <span className="inline-flex items-center text-[10px] font-bold text-blue-100 bg-white/10 px-2 py-0.5 rounded-md">
                  <Zap className="w-3 h-3 text-amber-300 mr-1" /> Top 12% Candidate
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
