import React, { useState } from 'react';
import {
  X,
  Play,
  Sparkles,
  Layers,
  Cpu,
  Clock,
  Briefcase,
  CheckCircle2
} from 'lucide-react';
import { DifficultyLevel } from '../types/interview';

interface NewInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole: string;
  onStart: (config: {
    role: string;
    type: 'Technical Deep-Dive' | 'Full Mock' | 'System Design' | 'Behavioral';
    difficulty: DifficultyLevel;
    questionCount: number;
  }) => void;
}

export const NewInterviewModal: React.FC<NewInterviewModalProps> = ({
  isOpen,
  onClose,
  defaultRole,
  onStart
}) => {
  const [role, setRole] = useState(defaultRole || 'Java Backend Developer');
  const [type, setType] = useState<'Technical Deep-Dive' | 'Full Mock' | 'System Design' | 'Behavioral'>('Full Mock');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Medium');
  const [questionCount, setQuestionCount] = useState<number>(5);

  if (!isOpen) return null;

  const popularRoles = [
    'Java Backend Developer',
    'Full Stack Engineer',
    'Python Data Engineer',
    'System Design Specialist',
    'Frontend React Developer',
    'AI / ML Engineer'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart({
      role,
      type,
      difficulty,
      questionCount
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150 text-left">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded-lg bg-blue-50 text-[#2455F5]">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-[#2455F5] uppercase tracking-wider">
              AI Session Setup
            </span>
          </div>
          <h3 className="text-2xl font-black text-[#151A45]">
            Start New AI Mock Interview
          </h3>
          <p className="text-xs text-slate-500">
            Configure the interview role, format, and initial difficulty. The AI will adapt dynamically as you answer.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Role selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">Target Role</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {popularRoles.map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setRole(r)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    role === r
                      ? 'bg-[#2455F5] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Or enter custom role..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2455F5]/40"
            />
          </div>

          {/* Interview Type */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">Interview Focus Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Full Mock', 'Technical Deep-Dive', 'System Design', 'Behavioral'] as const).map(
                (t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setType(t)}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                      type === t
                        ? 'bg-blue-50/90 border-[#2455F5] text-[#2455F5] shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {t}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Difficulty and Question count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Initial Difficulty (AI will adapt)
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-white"
              >
                <option value="Easy">Easy (Foundations)</option>
                <option value="Medium">Medium (Mid-Level Standard)</option>
                <option value="Hard">Hard (Senior / FAANG Bar)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Number of Questions
              </label>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-white"
              >
                <option value={3}>3 Questions (Rapid Test)</option>
                <option value={5}>5 Questions (Standard Mock)</option>
                <option value={10}>10 Questions (Comprehensive)</option>
              </select>
            </div>
          </div>

          {/* Adaptive Notification */}
          <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/80 text-xs text-slate-700 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[#2455F5] shrink-0" />
            <span>
              Real-time speech evaluation, speech synthesis, and adaptive follow-up questions will be enabled.
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-[#2455F5] via-[#3155E8] to-[#6D3FE8] hover:opacity-95 shadow-md shadow-blue-600/25 active:scale-98 transition-all flex items-center space-x-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Launch Mock Interview</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
