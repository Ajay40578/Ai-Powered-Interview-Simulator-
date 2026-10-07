import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Code2,
  PlayCircle,
  Award,
  ChevronRight,
  Flame,
  CheckSquare,
  Square
} from 'lucide-react';
import { PlanDay } from '../types/interview';

interface ImprovementPlanViewProps {
  initialPlan: PlanDay[];
  onStartDayPractice: (day: PlanDay) => void;
}

export const ImprovementPlanView: React.FC<ImprovementPlanViewProps> = ({
  initialPlan,
  onStartDayPractice
}) => {
  const [plan, setPlan] = useState<PlanDay[]>(initialPlan);
  const [selectedDay, setSelectedDay] = useState<number>(3); // Default to current day 3 (DSA Arrays)

  const toggleTask = (dayNum: number, taskId: string) => {
    setPlan((prev) =>
      prev.map((d) => {
        if (d.day !== dayNum) return d;
        const updatedTasks = d.tasks.map((t) =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        );
        const allCompleted = updatedTasks.every((t) => t.completed);
        return {
          ...d,
          tasks: updatedTasks,
          status: allCompleted ? 'completed' : 'in_progress'
        };
      })
    );
  };

  const activeDayData = plan.find((d) => d.day === selectedDay) || plan[2];
  const totalTasks = plan.reduce((acc, d) => acc + d.tasks.length, 0);
  const completedTasks = plan.reduce(
    (acc, d) => acc + d.tasks.filter((t) => t.completed).length,
    0
  );
  const planProgressPct = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="max-w-6xl mx-auto space-y-8 text-left pb-16">
      
      {/* HEADER BANNER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 text-xs font-extrabold uppercase bg-indigo-50 text-[#4438CA] rounded-lg border border-indigo-200/60">
              Personalized Roadmap
            </span>
            <span className="text-xs font-semibold text-slate-400">Target Role: Java Backend Developer</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#151A45] mt-2">
            7-Day Interview Improvement Plan
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Custom curriculum generated from your latest skill gap diagnostic to advance your readiness score to 90%+.
          </p>
        </div>

        {/* Overall Plan Completion Metric */}
        <div className="bg-[#F7F8FC] p-4 rounded-2xl border border-slate-200 min-w-[200px] text-right">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
            <span>Roadmap Progress</span>
            <span className="text-[#2455F5] font-black">{planProgressPct}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#2455F5] to-[#6D3FE8] h-full rounded-full transition-all duration-500"
              style={{ width: `${planProgressPct}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-400 mt-1.5 block">
            {completedTasks} of {totalTasks} tasks completed
          </span>
        </div>
      </div>

      {/* 7-DAY NAVIGATION CARDS TIMELINE */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {plan.map((item) => {
          const isSelected = selectedDay === item.day;
          return (
            <div
              key={item.day}
              onClick={() => setSelectedDay(item.day)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all text-left flex flex-col justify-between h-32 ${
                isSelected
                  ? 'bg-blue-50/90 border-[#2455F5] ring-2 ring-[#2455F5]/20 shadow-md'
                  : item.status === 'completed'
                  ? 'bg-white border-emerald-200 hover:border-emerald-300'
                  : item.status === 'in_progress'
                  ? 'bg-white border-blue-200 hover:border-blue-300'
                  : 'bg-white border-slate-200 hover:border-slate-300 opacity-90'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase text-slate-400">
                  Day {item.day}
                </span>
                {item.status === 'completed' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : item.status === 'in_progress' ? (
                  <span className="w-2 h-2 rounded-full bg-[#2455F5] animate-ping" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-200" />
                )}
              </div>

              <div>
                <p className="font-extrabold text-xs sm:text-sm text-[#151A45] line-clamp-2 leading-tight">
                  {item.title}
                </p>
              </div>

              <div className="text-[10px] font-bold">
                {item.status === 'completed' ? (
                  <span className="text-emerald-600">Completed</span>
                ) : item.status === 'in_progress' ? (
                  <span className="text-[#2455F5]">Active Today</span>
                ) : (
                  <span className="text-slate-400">Upcoming</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* SELECTED DAY DETAIL PANEL */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 text-xs font-black uppercase bg-[#2455F5] text-white rounded-lg">
                Day {activeDayData.day} Focus
              </span>
              <span className="text-xs font-semibold text-slate-500 flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" /> Est: {activeDayData.estimatedMinutes} mins
              </span>
            </div>
            <h3 className="text-2xl font-black text-[#151A45]">
              {activeDayData.title}: {activeDayData.topic}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              {activeDayData.description}
            </p>
          </div>

          <button
            onClick={() => onStartDayPractice(activeDayData)}
            className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-[#2455F5] via-[#3155E8] to-[#6D3FE8] hover:opacity-95 shadow-md shadow-blue-600/25 active:scale-98 transition-all flex items-center space-x-2 shrink-0 self-start sm:self-auto"
          >
            <PlayCircle className="w-4 h-4" />
            <span>Practice Day {activeDayData.day} In Mock AI</span>
          </button>
        </div>

        {/* Tasks list */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
            Daily Action Items & Checkpoints:
          </h4>

          <div className="space-y-2.5">
            {activeDayData.tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(activeDayData.day, task.id)}
                className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                  task.completed
                    ? 'bg-emerald-50/50 border-emerald-200 text-slate-600'
                    : 'bg-[#F7F8FC] border-slate-200 hover:border-blue-300 text-slate-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {task.completed ? (
                    <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                  <div className="space-y-0.5">
                    <p className={`text-xs sm:text-sm font-bold ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                      {task.title}
                    </p>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">
                      Type: {task.type} • Est {task.duration}
                    </span>
                  </div>
                </div>

                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                  task.completed
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-white border border-slate-200 text-slate-600'
                }`}>
                  {task.completed ? 'Done' : 'Start'}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
