import React from 'react';
import {
  TrendingDown,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Sparkles,
  Zap,
  Target
} from 'lucide-react';
import { SkillGapItem } from '../types/interview';

interface SkillGapViewProps {
  skillGaps: SkillGapItem[];
  onPracticeSkill: (skillName: string) => void;
  onGoToImprovementPlan: () => void;
}

export const SkillGapView: React.FC<SkillGapViewProps> = ({
  skillGaps,
  onPracticeSkill,
  onGoToImprovementPlan
}) => {
  const strongSkills = skillGaps.filter((s) => s.status === 'strong');
  const needsImprovementSkills = skillGaps.filter((s) => s.status === 'needs_improvement');

  return (
    <div className="max-w-6xl mx-auto space-y-8 text-left pb-16">
      
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 text-xs font-extrabold uppercase bg-blue-50 text-[#2455F5] rounded-lg border border-blue-200/60">
              AI Skill Diagnostic
            </span>
            <span className="text-xs font-semibold text-slate-400">Target Role: Java Backend Developer</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#151A45] mt-2">
            Skill Gap Analysis
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Real-time evaluation of your technical and behavioral competence versus top-tier company interview bars.
          </p>
        </div>

        <button
          onClick={onGoToImprovementPlan}
          className="px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#2455F5] via-[#4438CA] to-[#6D3FE8] hover:opacity-95 shadow-md shadow-blue-600/20 active:scale-98 transition-all flex items-center space-x-2 self-start md:self-auto shrink-0"
        >
          <span>View 7-Day Roadmap</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2-COLUMN GRID: STRONG SKILLS VS NEEDS IMPROVEMENT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT: STRONG SKILLS (Java: 91%, SQL: 87%, OOP: 84%) */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">
                Strong Skills (Above Benchmark)
              </h3>
              <p className="text-xs text-slate-500">
                Consistently scored 80%+ across recent mock interviews
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {strongSkills.map((item) => (
              <div
                key={item.skill}
                className="bg-white rounded-2xl p-5 border border-emerald-200/80 shadow-xs hover:border-emerald-300 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-base text-[#151A45]">{item.skill}</span>
                    <span className="px-2 py-0.5 text-[10px] font-extrabold bg-emerald-100 text-emerald-800 rounded-md">
                      Verified
                    </span>
                  </div>
                  <div className="flex items-baseline space-x-1.5">
                    <span className="text-xl font-black text-emerald-600">{item.currentLevel}%</span>
                    <span className="text-xs text-slate-400 font-semibold">vs target {item.targetLevel}%</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                    style={{ width: `${item.currentLevel}%` }}
                  />
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.gapDescription}
                </p>

                {/* Topics */}
                <div className="pt-1 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Advanced Next Steps:</span>
                  {item.recommendedTopics.map((top, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-semibold"
                    >
                      {top}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: NEEDS IMPROVEMENT (System Design: 61%, DSA: 65%, Communication: 72%) */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">
                Needs Improvement (Priority Focus)
              </h3>
              <p className="text-xs text-slate-500">
                Identified knowledge gaps where practice will yield the highest ROI
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {needsImprovementSkills.map((item) => (
              <div
                key={item.skill}
                className="bg-white rounded-2xl p-5 border border-amber-200/80 shadow-xs hover:border-amber-300 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-base text-[#151A45]">{item.skill}</span>
                    <span className="px-2 py-0.5 text-[10px] font-extrabold bg-amber-100 text-amber-800 rounded-md">
                      Skill Gap
                    </span>
                  </div>
                  <div className="flex items-baseline space-x-1.5">
                    <span className="text-xl font-black text-amber-600">{item.currentLevel}%</span>
                    <span className="text-xs text-slate-400 font-semibold">vs target {item.targetLevel}%</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-rose-400 rounded-full"
                    style={{ width: `${item.currentLevel}%` }}
                  />
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.gapDescription}
                </p>

                {/* Topics and Practice Button */}
                <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {item.recommendedTopics.map((top, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/60 text-[11px] font-semibold"
                      >
                        {top}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onPracticeSkill(item.skill)}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-[#2455F5] hover:bg-[#3155E8] rounded-xl flex items-center space-x-1 shadow-xs"
                  >
                    <Target className="w-3.5 h-3.5" />
                    <span>Practice Skill</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
