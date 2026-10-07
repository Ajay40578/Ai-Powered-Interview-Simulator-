import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Calendar,
  Share2,
  Download,
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  TrendingUp,
  Target
} from 'lucide-react';
import { FinalInterviewReport } from '../types/interview';

interface FinalReportViewProps {
  report: FinalInterviewReport;
  onPracticeWeakAreas: () => void;
  onStartAnotherInterview: () => void;
  onViewImprovementPlan: () => void;
}

export const FinalReportView: React.FC<FinalReportViewProps> = ({
  report,
  onPracticeWeakAreas,
  onStartAnotherInterview,
  onViewImprovementPlan
}) => {
  const [expandedQuestionIdx, setExpandedQuestionIdx] = useState<number | null>(null);

  // Trigger celebration confetti upon report reveal
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  }, []);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `I scored ${report.overallScore}/100 on InterviewAI for ${report.role}! Ready for top tech interviews.`
      );
      alert('Report summary copied to clipboard!');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-left pb-16 animate-in fade-in duration-300">
      
      {/* GRAND HERO CARD: 91 / 100 "Excellent — Interview Ready" */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#2455F5] via-[#4438CA] via-[#6D3FE8] to-[#151A45] p-8 sm:p-12 text-white shadow-2xl shadow-blue-900/25">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 backdrop-blur-md">
              <Award className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-100">
                Official InterviewAI Readiness Assessment
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {report.readinessBadge}
              </h1>
              <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
                {report.readinessSummary}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-blue-200">
              <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/20">
                Role: <strong className="text-white">{report.role}</strong>
              </span>
              <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/20">
                Date: <strong className="text-white">{report.date}</strong>
              </span>
            </div>
          </div>

          {/* Big Score Dial */}
          <div className="shrink-0 flex flex-col items-center justify-center p-6 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/25 min-w-[200px] text-center shadow-lg">
            <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">
              {report.overallScore}
            </span>
            <span className="text-base text-blue-200 font-bold">/ 100</span>
            <div className="mt-3 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-extrabold border border-emerald-400/30">
              Top 8% Candidate
            </div>
          </div>

        </div>
      </div>

      {/* 5 COMPETENCY PILLARS:
          Technical Knowledge, Communication, Problem Solving, Confidence, Answer Relevance */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-[#151A45]">
              Competency Breakdown
            </h3>
            <p className="text-xs text-slate-500">
              Normalized performance against standard mid/senior engineering benchmarks
            </p>
          </div>
          <span className="px-3 py-1 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
            All Targets Met
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3.5 pt-2">
          
          <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-slate-200 text-center">
            <span className="text-xs font-bold text-slate-500 block">Technical Knowledge</span>
            <span className="text-2xl font-black text-[#2455F5] mt-1 block">
              {report.technicalKnowledge}%
            </span>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#2455F5] h-full rounded-full" style={{ width: `${report.technicalKnowledge}%` }} />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-slate-200 text-center">
            <span className="text-xs font-bold text-slate-500 block">Communication</span>
            <span className="text-2xl font-black text-[#4438CA] mt-1 block">
              {report.communication}%
            </span>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#4438CA] h-full rounded-full" style={{ width: `${report.communication}%` }} />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-slate-200 text-center">
            <span className="text-xs font-bold text-slate-500 block">Problem Solving</span>
            <span className="text-2xl font-black text-[#6D3FE8] mt-1 block">
              {report.problemSolving}%
            </span>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#6D3FE8] h-full rounded-full" style={{ width: `${report.problemSolving}%` }} />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-slate-200 text-center">
            <span className="text-xs font-bold text-slate-500 block">Confidence</span>
            <span className="text-2xl font-black text-[#151A45] mt-1 block">
              {report.confidence}%
            </span>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#151A45] h-full rounded-full" style={{ width: `${report.confidence}%` }} />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-slate-200 text-center">
            <span className="text-xs font-bold text-slate-500 block">Answer Relevance</span>
            <span className="text-2xl font-black text-emerald-600 mt-1 block">
              {report.answerRelevance}%
            </span>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${report.answerRelevance}%` }} />
            </div>
          </div>

        </div>
      </div>

      {/* STRENGTHS & AREAS TO IMPROVE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Strengths */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-200/80 shadow-xs space-y-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">Key Strengths</h3>
              <p className="text-xs text-slate-500">What elevated your interview score</p>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            {report.strengths.map((str, idx) => (
              <li key={idx} className="flex items-start space-x-2.5 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                <span className="text-emerald-600 font-black mt-0.5">✓</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas to Improve */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-amber-200/80 shadow-xs space-y-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">Areas to Improve</h3>
              <p className="text-xs text-slate-500">Targeted growth opportunities</p>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            {report.areasToImprove.map((area, idx) => (
              <li key={idx} className="flex items-start space-x-2.5 bg-amber-50/50 p-3 rounded-xl border border-amber-100">
                <span className="text-amber-600 font-black mt-0.5">!</span>
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* AI RECOMMENDATION CARD */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-6 sm:p-8 border border-blue-200 shadow-sm space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-[#2455F5] uppercase tracking-wider">
          <BrainCircuit className="w-4 h-4" />
          <span>AI Coach Personalized Recommendation</span>
        </div>
        <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed">
          "{report.aiRecommendation}"
        </p>
      </div>

      {/* QUESTION-BY-QUESTION TRANSCRIPT BREAKDOWN */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-[#151A45]">
            Question Performance Transcript
          </h3>
          <span className="text-xs text-slate-400 font-medium">
            {report.questionBreakdown.length} questions evaluated
          </span>
        </div>

        <div className="space-y-3">
          {report.questionBreakdown.map((item, idx) => {
            const isExpanded = expandedQuestionIdx === idx;
            return (
              <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden transition-all">
                <div
                  onClick={() => setExpandedQuestionIdx(isExpanded ? null : idx)}
                  className="p-4 bg-slate-50/70 hover:bg-slate-100/70 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div className="space-y-1 pr-4">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#2455F5] text-white">
                        Q{idx + 1}
                      </span>
                      <span className="text-xs font-bold text-slate-500 uppercase">
                        {item.question.category} • {item.question.difficulty}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-800">
                      {item.question.question}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    <span className="text-sm font-black text-[#2455F5]">
                      {item.evaluation.overallScore}%
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-4 sm:p-5 bg-white border-t border-slate-100 space-y-3 text-xs sm:text-sm">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                        Your Answer:
                      </span>
                      <p className="p-3 rounded-xl bg-slate-50 text-slate-700 italic border border-slate-200/60">
                        "{item.userAnswer}"
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-[#2455F5] uppercase block mb-1">
                        AI Coach Feedback:
                      </span>
                      <p className="text-slate-700">
                        {item.evaluation.feedback}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* BUTTONS: "Practice Weak Areas", "Start Another Interview", "View Improvement Plan" */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleShare}
            className="px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors flex items-center space-x-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Result</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onPracticeWeakAreas}
            className="px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-[#151A45] bg-white border border-slate-200 hover:bg-slate-50 transition-colors flex items-center space-x-2"
          >
            <Target className="w-4 h-4 text-[#2455F5]" />
            <span>Practice Weak Areas</span>
          </button>

          <button
            onClick={onViewImprovementPlan}
            className="px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white bg-[#4438CA] hover:bg-[#3155E8] shadow-md transition-colors flex items-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>View Improvement Plan</span>
          </button>

          <button
            onClick={onStartAnotherInterview}
            className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-[#2455F5] to-[#6D3FE8] hover:opacity-95 shadow-md shadow-blue-600/25 active:scale-98 transition-all flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Start Another Interview</span>
          </button>
        </div>
      </div>

    </div>
  );
};
