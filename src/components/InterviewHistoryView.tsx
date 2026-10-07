import React from 'react';
import {
  Calendar,
  Clock,
  Award,
  ArrowRight,
  CheckCircle2,
  Filter,
  TrendingUp,
  FileText
} from 'lucide-react';

interface HistoryItem {
  id: string;
  date: string;
  role: string;
  type: string;
  score: number;
  duration: string;
  status: 'Completed' | 'In Progress';
  highlight: string;
}

interface InterviewHistoryViewProps {
  onViewReport: (id: string) => void;
  onStartNewInterview: () => void;
}

export const InterviewHistoryView: React.FC<InterviewHistoryViewProps> = ({
  onViewReport,
  onStartNewInterview
}) => {
  const historyList: HistoryItem[] = [
    {
      id: 'sess-5',
      date: 'Oct 06, 2026',
      role: 'Java Backend Developer',
      type: 'Full Mock Interview',
      score: 91,
      duration: '32 mins',
      status: 'Completed',
      highlight: 'Strongest score! Mastered Collections & Cache Locality.'
    },
    {
      id: 'sess-4',
      date: 'Oct 04, 2026',
      role: 'Java Concurrency & DB',
      type: 'Technical Deep-Dive',
      score: 80,
      duration: '28 mins',
      status: 'Completed',
      highlight: 'Good SQL knowledge, slight hesitation on deadlocks.'
    },
    {
      id: 'sess-3',
      date: 'Oct 01, 2026',
      role: 'Spring Boot & Microservices',
      type: 'Technical Deep-Dive',
      score: 84,
      duration: '35 mins',
      status: 'Completed',
      highlight: 'Solid grasp of Dependency Inversion & JPA EntityGraphs.'
    },
    {
      id: 'sess-2',
      date: 'Sep 28, 2026',
      role: 'Java Backend Developer',
      type: 'Technical Deep-Dive',
      score: 78,
      duration: '25 mins',
      status: 'Completed',
      highlight: 'Good basics, missed treeify threshold details.'
    },
    {
      id: 'sess-1',
      date: 'Sep 24, 2026',
      role: 'Java Backend Developer',
      type: 'Diagnostic Baseline',
      score: 72,
      duration: '20 mins',
      status: 'Completed',
      highlight: 'Initial baseline calibration completed.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-left pb-16">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 text-xs font-extrabold uppercase bg-blue-50 text-[#2455F5] rounded-lg border border-blue-200/60">
              Session Archive
            </span>
            <span className="text-xs font-semibold text-slate-400">Total: {historyList.length} completed</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#151A45] mt-2">
            Interview History
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Review detailed transcripts, scores, and past AI evaluation recommendations.
          </p>
        </div>

        <button
          onClick={onStartNewInterview}
          className="px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-[#2455F5] to-[#6D3FE8] hover:opacity-95 shadow-md shadow-blue-600/20 active:scale-98 transition-all shrink-0"
        >
          + Start New Interview
        </button>
      </div>

      {/* History Cards / Table */}
      <div className="space-y-3">
        {historyList.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 max-w-xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="text-slate-400 flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1" /> {item.date}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1" /> {item.duration}
                </span>
                <span className="text-slate-300">•</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
                  {item.type}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {item.status}
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-black text-[#151A45]">
                {item.role}
              </h4>

              <p className="text-xs text-slate-500 italic">
                {item.highlight}
              </p>
            </div>

            {/* Score & View Report Button */}
            <div className="flex items-center space-x-4 self-end sm:self-center shrink-0">
              <div className="text-right">
                <span className="text-2xl font-black text-[#2455F5] block leading-none">
                  {item.score}
                  <span className="text-xs text-slate-400 font-bold">/100</span>
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  {item.score >= 90 ? 'Top Tier' : item.score >= 80 ? 'Proficient' : 'Developing'}
                </span>
              </div>

              <button
                onClick={() => onViewReport(item.id)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#151A45] bg-[#F7F8FC] border border-slate-200 hover:bg-slate-100 transition-colors flex items-center space-x-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-[#2455F5]" />
                <span>View Report</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
