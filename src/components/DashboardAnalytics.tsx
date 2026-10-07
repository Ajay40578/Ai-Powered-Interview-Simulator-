import React, { useState } from 'react';
import {
  TrendingUp,
  Brain,
  Info,
  ChevronRight,
  Sparkles,
  BarChart2
} from 'lucide-react';
import { SkillCompetency } from '../types/interview';

interface DashboardAnalyticsProps {
  scoreHistory: { id: string; interview: string; date: string; score: number; role: string }[];
  skillCompetencies: SkillCompetency[];
  onExploreSkillGaps: () => void;
}

export const DashboardAnalytics: React.FC<DashboardAnalyticsProps> = ({
  scoreHistory,
  skillCompetencies,
  onExploreSkillGaps
}) => {
  const [activePointIndex, setActivePointIndex] = useState<number | null>(4); // Default to latest (91)

  // Chart coordinate calculation
  const chartHeight = 180;
  const chartWidth = 500;
  const minScore = 60;
  const maxScore = 100;
  const paddingX = 40;
  const paddingY = 25;

  const points = scoreHistory.map((item, index) => {
    const x = paddingX + (index * (chartWidth - 2 * paddingX)) / (scoreHistory.length - 1);
    const y = chartHeight - paddingY - ((item.score - minScore) / (maxScore - minScore)) * (chartHeight - 2 * paddingY);
    return { x, y, ...item };
  });

  const pathD = points.reduce((acc, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    // Bezier control points for smooth SaaS curve
    const prev = points[index - 1];
    const cpX1 = prev.x + (point.x - prev.x) / 2;
    const cpY1 = prev.y;
    const cpX2 = prev.x + (point.x - prev.x) / 2;
    const cpY2 = point.y;
    return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${point.x} ${point.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* LEFT COLUMN: Score Over Previous Interviews (72, 78, 84, 80, 91) */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-extrabold text-[#151A45]">
                  Score Over Previous Interviews
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-[#2455F5] rounded border border-blue-200/60">
                  Adaptive AI
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Trajectory across recent mock sessions (Goal: 85%+)
              </p>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-[#2455F5]">
                {activePointIndex !== null ? `${scoreHistory[activePointIndex].score}%` : '91%'}
              </span>
              <span className="block text-[11px] font-semibold text-emerald-600">
                +19% Overall Gain
              </span>
            </div>
          </div>

          {/* SVG Line Chart */}
          <div className="relative w-full overflow-hidden pt-2">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-48 sm:h-56 overflow-visible"
            >
              <defs>
                <linearGradient id="scoreAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2455F5" stopOpacity="0.28" />
                  <stop offset="70%" stopColor="#6D3FE8" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#6D3FE8" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2455F5" />
                  <stop offset="50%" stopColor="#4438CA" />
                  <stop offset="100%" stopColor="#6D3FE8" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[60, 70, 80, 90, 100].map((val) => {
                const y = chartHeight - paddingY - ((val - minScore) / (maxScore - minScore)) * (chartHeight - 2 * paddingY);
                return (
                  <g key={val}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={chartWidth - paddingX}
                      y2={y}
                      stroke="#E2E8F0"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                    <text
                      x={paddingX - 10}
                      y={y + 3}
                      fill="#94A3B8"
                      fontSize="9"
                      textAnchor="end"
                      fontWeight="600"
                    >
                      {val}%
                    </text>
                  </g>
                );
              })}

              {/* Shaded Area */}
              <path d={areaD} fill="url(#scoreAreaGradient)" />

              {/* Main Line */}
              <path
                d={pathD}
                fill="none"
                stroke="url(#strokeGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data Points */}
              {points.map((pt, idx) => {
                const isSelected = activePointIndex === idx;
                return (
                  <g
                    key={pt.id}
                    className="cursor-pointer group"
                    onClick={() => setActivePointIndex(idx)}
                    onMouseEnter={() => setActivePointIndex(idx)}
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isSelected ? '6.5' : '4.5'}
                      fill="#FFFFFF"
                      stroke={isSelected ? '#6D3FE8' : '#2455F5'}
                      strokeWidth={isSelected ? '3.5' : '2.5'}
                      className="transition-all duration-150"
                    />
                    {/* Score value above point */}
                    <text
                      x={pt.x}
                      y={pt.y - 10}
                      fill={isSelected ? '#151A45' : '#475569'}
                      fontSize={isSelected ? '11' : '10'}
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {pt.score}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* X-Axis labels below SVG */}
            <div className="flex justify-between px-8 text-xs font-bold text-slate-500 pt-2 border-t border-slate-100">
              {scoreHistory.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setActivePointIndex(idx)}
                  className={`text-center cursor-pointer transition-colors ${
                    activePointIndex === idx ? 'text-[#2455F5]' : 'hover:text-slate-800'
                  }`}
                >
                  <span className="block text-[11px] font-bold">{item.interview}</span>
                  <span className="block text-[10px] text-slate-400 font-normal">{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Interview Details Pill */}
        {activePointIndex !== null && (
          <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#2455F5]" />
              <span className="font-semibold text-slate-700">
                Selected: <strong>{scoreHistory[activePointIndex].interview}</strong> ({scoreHistory[activePointIndex].role})
              </span>
            </div>
            <span className="font-extrabold text-[#2455F5] bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200">
              Score: {scoreHistory[activePointIndex].score}/100
            </span>
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: Skill Competency Analysis */}
      <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-extrabold text-[#151A45]">
                Skill Competency Analysis
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Multi-dimensional rating across core evaluators
              </p>
            </div>
            <button
              onClick={onExploreSkillGaps}
              className="text-xs font-bold text-[#2455F5] hover:text-[#4438CA] flex items-center"
            >
              <span>View Gaps</span>
              <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          {/* Progress Bars for each competency */}
          <div className="space-y-4">
            {skillCompetencies.map((comp) => {
              // Custom color gradient for each skill
              return (
                <div key={comp.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-700">{comp.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] text-slate-400 font-semibold">{comp.trend}</span>
                      <span className="text-[#151A45] font-extrabold">{comp.score}%</span>
                    </div>
                  </div>

                  {/* Elegant blue/purple progress bar container */}
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#2455F5] via-[#4438CA] to-[#6D3FE8] transition-all duration-700"
                      style={{ width: `${comp.score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary note footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-slate-500">
            <Info className="w-4 h-4 text-[#2455F5] shrink-0" />
            <span>Benchmark for Java Backend is <strong>80%</strong></span>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
            4 / 5 Ready
          </span>
        </div>

      </div>

    </div>
  );
};
