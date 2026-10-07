import React, { useState } from 'react';
import {
  Sparkles,
  Award,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  Zap
} from 'lucide-react';
import { EvaluationResult } from '../types/interview';

interface AnswerFeedbackCardProps {
  evaluation: EvaluationResult;
  questionNumber: number;
  totalQuestions: number;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

export const AnswerFeedbackCard: React.FC<AnswerFeedbackCardProps> = ({
  evaluation,
  questionNumber,
  totalQuestions,
  onNextQuestion,
  isLastQuestion
}) => {
  const [showModelAnswer, setShowModelAnswer] = useState(false);

  // Determine badge styling based on overall score
  const isHighScore = evaluation.overallScore >= 80;
  const isMidScore = evaluation.overallScore >= 65 && evaluation.overallScore < 80;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-blue-900/10 space-y-6 text-left animate-in fade-in zoom-in-95 duration-200">
      
      {/* Top Banner: Score & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              AI Real-Time Evaluation
            </span>
          </div>
          <h3 className="text-2xl font-black text-[#151A45] mt-1">
            Answer Assessment
          </h3>
        </div>

        {/* Overall Score Badge */}
        <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2.5 rounded-2xl border border-blue-200/80">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Overall Score</span>
            <span className="text-2xl font-black text-[#2455F5]">{evaluation.overallScore}%</span>
          </div>
          <div className="h-8 w-px bg-blue-200" />
          <span className={`text-xs font-extrabold px-2.5 py-1 rounded-lg ${
            isHighScore
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              : isMidScore
              ? 'bg-blue-100 text-blue-800 border border-blue-300'
              : 'bg-amber-100 text-amber-800 border border-amber-300'
          }`}>
            {isHighScore ? 'Strong Answer' : isMidScore ? 'Solid Foundation' : 'Needs Polish'}
          </span>
        </div>
      </div>

      {/* 4 Score Pillars Grid (Technical Accuracy 8/10, Communication 7/10, Relevance 9/10, Clarity 8/10) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#F7F8FC] p-3.5 rounded-2xl border border-slate-200/80 text-center">
          <span className="text-[11px] font-semibold text-slate-500 block">Technical Accuracy</span>
          <span className="text-xl font-black text-[#2455F5] mt-1 block">
            {evaluation.technicalAccuracy}/10
          </span>
          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-[#2455F5] h-full rounded-full"
              style={{ width: `${evaluation.technicalAccuracy * 10}%` }}
            />
          </div>
        </div>

        <div className="bg-[#F7F8FC] p-3.5 rounded-2xl border border-slate-200/80 text-center">
          <span className="text-[11px] font-semibold text-slate-500 block">Communication</span>
          <span className="text-xl font-black text-[#4438CA] mt-1 block">
            {evaluation.communication}/10
          </span>
          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-[#4438CA] h-full rounded-full"
              style={{ width: `${evaluation.communication * 10}%` }}
            />
          </div>
        </div>

        <div className="bg-[#F7F8FC] p-3.5 rounded-2xl border border-slate-200/80 text-center">
          <span className="text-[11px] font-semibold text-slate-500 block">Relevance</span>
          <span className="text-xl font-black text-[#6D3FE8] mt-1 block">
            {evaluation.relevance}/10
          </span>
          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-[#6D3FE8] h-full rounded-full"
              style={{ width: `${evaluation.relevance * 10}%` }}
            />
          </div>
        </div>

        <div className="bg-[#F7F8FC] p-3.5 rounded-2xl border border-slate-200/80 text-center">
          <span className="text-[11px] font-semibold text-slate-500 block">Clarity</span>
          <span className="text-xl font-black text-[#151A45] mt-1 block">
            {evaluation.clarity}/10
          </span>
          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-[#151A45] h-full rounded-full"
              style={{ width: `${evaluation.clarity * 10}%` }}
            />
          </div>
        </div>
      </div>

      {/* AI Feedback Statement */}
      <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-1">
        <div className="flex items-center space-x-2 text-xs font-bold text-[#2455F5]">
          <Sparkles className="w-4 h-4" />
          <span>AI Coach Critique</span>
        </div>
        <p className="text-sm font-medium text-slate-800 leading-relaxed italic">
          "{evaluation.feedback}"
        </p>
      </div>

      {/* Strengths & Areas to Improve */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Demonstrated Strengths</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {evaluation.strengths.map((str, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>Refinement Opportunities</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {evaluation.areasToImprove.map((area, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Adaptive Decision Callout */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 border border-indigo-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-[#4438CA] text-white flex items-center justify-center shrink-0">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-[#4438CA] uppercase tracking-wider block">
              Adaptive AI Branch Triggered
            </span>
            <p className="text-xs font-bold text-[#151A45]">
              {evaluation.adaptiveExplanation}
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex px-2.5 py-1 text-xs font-extrabold uppercase bg-white text-[#4438CA] rounded-lg border border-indigo-200 shrink-0">
          {evaluation.adaptiveAction.replace('_', ' ')}
        </span>
      </div>

      {/* Model Answer Toggle */}
      {evaluation.modelAnswer && (
        <div className="border border-slate-200 rounded-2xl overflow-hidden">
          <button
            onClick={() => setShowModelAnswer(!showModelAnswer)}
            className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-[#2455F5]" />
              <span>Show Model Answer / Ideal Structure</span>
            </div>
            {showModelAnswer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showModelAnswer && (
            <div className="p-4 bg-white text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 font-mono bg-slate-50/30">
              {evaluation.modelAnswer}
            </div>
          )}
        </div>
      )}

      {/* Bottom Action: Next Question or Final Report */}
      <div className="pt-2 flex items-center justify-end">
        <button
          onClick={onNextQuestion}
          className="px-6 py-3.5 rounded-2xl text-sm font-extrabold text-white bg-gradient-to-r from-[#2455F5] via-[#3155E8] to-[#6D3FE8] hover:opacity-95 shadow-lg shadow-blue-600/25 active:scale-98 transition-all flex items-center space-x-2"
        >
          <span>{isLastQuestion ? 'Generate Final Interview Report' : 'Proceed to Next Question'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
