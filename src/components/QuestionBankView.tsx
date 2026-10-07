import React, { useState } from 'react';
import {
  Search,
  Filter,
  BookOpen,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  Sparkles,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { Question, QuestionCategory, DifficultyLevel, QuestionType } from '../types/interview';

interface QuestionBankViewProps {
  questions: Question[];
  onPracticeQuestion: (question: Question) => void;
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({
  questions,
  onPracticeQuestion
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  const categories = [
    'All',
    'Java',
    'Python',
    'SQL',
    'DSA',
    'DBMS',
    'AI/ML',
    'Data Science',
    'System Design',
    'Behavioral',
    'HR'
  ];

  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.context && q.context.toLowerCase().includes(searchQuery.toLowerCase())) ||
      q.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || q.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesDifficulty =
      selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;

    const matchesType =
      selectedType === 'All' || q.type === selectedType;

    return matchesSearch && matchesCategory && matchesDifficulty && matchesType;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-left pb-16">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 text-xs font-extrabold uppercase bg-purple-50 text-[#6D3FE8] rounded-lg border border-purple-200/60">
              Curated Question Repository
            </span>
            <span className="text-xs font-semibold text-slate-400">FAANG & Top Tech Calibrated</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#151A45] mt-2">
            Interview Question Bank
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Browse authentic conceptual, algorithmic, architectural, and behavioral questions with ideal answers.
          </p>
        </div>

        <div className="px-4 py-2.5 bg-blue-50 rounded-2xl border border-blue-200/70 text-right shrink-0">
          <span className="text-xs font-bold text-slate-500 block">Total Questions</span>
          <span className="text-2xl font-black text-[#2455F5]">{questions.length}</span>
        </div>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by keyword, topic, collection, caching, or algorithms..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2455F5]/40 focus:border-[#2455F5] text-slate-800"
          />
        </div>

        {/* Categories Chips */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
            Category / Domain:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-[#2455F5] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty & Type Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-500">Difficulty:</span>
            <div className="flex gap-1">
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-2.5 py-1 rounded-lg font-semibold ${
                    selectedDifficulty === diff
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* QUESTIONS LIST */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-2">
          <span>Showing {filteredQuestions.length} questions</span>
          <span>Click any question to view hints and sample answer</span>
        </div>

        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-500 space-y-2">
            <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-bold">No questions found matching your filter criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedDifficulty('All');
              }}
              className="text-xs text-[#2455F5] font-bold hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isExpanded = expandedQuestionId === q.id;
            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all overflow-hidden"
              >
                {/* Header row */}
                <div
                  onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                  className="p-5 cursor-pointer flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold bg-blue-50 text-[#2455F5] border border-blue-200/60">
                        {q.category}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[11px] font-extrabold ${
                          q.difficulty === 'Hard'
                            ? 'bg-rose-50 text-rose-700'
                            : q.difficulty === 'Easy'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {q.difficulty}
                      </span>
                      <span className="text-[11px] text-slate-400 font-semibold">
                        {q.type}
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-[#151A45]">
                      {q.question}
                    </h4>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPracticeQuestion(q);
                      }}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#2455F5] hover:bg-[#3155E8] flex items-center space-x-1.5 shadow-xs"
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Practice Question</span>
                    </button>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {/* Expanded Answer Key & Key Points */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 bg-[#F7F8FC] border-t border-slate-200 space-y-4 text-xs sm:text-sm animate-in fade-in duration-150">
                    {q.context && (
                      <p className="text-slate-500 italic">
                        Context: {q.context}
                      </p>
                    )}

                    {q.sampleAnswer && (
                      <div className="space-y-1.5 bg-white p-4 rounded-xl border border-slate-200">
                        <span className="text-[11px] font-extrabold text-[#2455F5] uppercase tracking-wider block">
                          Ideal Model Answer Structure:
                        </span>
                        <p className="text-slate-800 leading-relaxed font-mono text-xs">
                          {q.sampleAnswer}
                        </p>
                      </div>
                    )}

                    {q.keyPointsToMention && (
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                          Key Evaluation Points To Mention:
                        </span>
                        <ul className="space-y-1 text-slate-700">
                          {q.keyPointsToMention.map((pt, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
