/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { DashboardHero } from './components/DashboardHero';
import { DashboardStats } from './components/DashboardStats';
import { DashboardAnalytics } from './components/DashboardAnalytics';
import { PracticeInterviewView } from './components/PracticeInterviewView';
import { FinalReportView } from './components/FinalReportView';
import { SkillGapView } from './components/SkillGapView';
import { ImprovementPlanView } from './components/ImprovementPlanView';
import { QuestionBankView } from './components/QuestionBankView';
import { InterviewHistoryView } from './components/InterviewHistoryView';
import { ProfileView } from './components/ProfileView';
import { NewInterviewModal } from './components/NewInterviewModal';

import {
  initialUserProfile,
  initialSkillCompetencies,
  scoreHistoryData,
  skillGapData,
  sevenDayPlan,
  curatedQuestionBank,
  sampleBestReport
} from './data/mockData';

import {
  UserProfile,
  Question,
  EvaluationResult,
  FinalInterviewReport,
  PlanDay,
  DifficultyLevel
} from './types/interview';

export default function App() {
  // Navigation / View State
  // Default to 'landing' when opening the app, as requested in prompt:
  // "FIRST OPEN PAGE — LANDING PAGE: When the website opens, show a beautiful landing page first."
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Application Data States
  const [user, setUser] = useState<UserProfile>(initialUserProfile);
  const [skillCompetencies, setSkillCompetencies] = useState(initialSkillCompetencies);
  const [scoreHistory, setScoreHistory] = useState(scoreHistoryData);
  const [skillGaps, setSkillGaps] = useState(skillGapData);
  const [questions, setQuestions] = useState<Question[]>(curatedQuestionBank);
  const [isNewInterviewModalOpen, setIsNewInterviewModalOpen] = useState(false);

  // Active Practice Interview Session State
  const [activeSessionRole, setActiveSessionRole] = useState('Java Backend Developer');
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>(curatedQuestionBank.slice(0, 5));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessionAnswers, setSessionAnswers] = useState<Record<string, string>>({});
  const [sessionEvaluations, setSessionEvaluations] = useState<Record<string, EvaluationResult>>({});
  const [activeFinalReport, setActiveFinalReport] = useState<FinalInterviewReport>(sampleBestReport);
  const [showFinalReport, setShowFinalReport] = useState(false);

  // Quick Action Handlers
  const handleLoginSuccess = (name: string, email: string) => {
    setUser((prev) => ({ ...prev, name, email }));
    setCurrentPage('app');
    setActiveTab('dashboard');
  };

  const handleContinueAsDemo = () => {
    setUser(initialUserProfile);
    setCurrentPage('app');
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setCurrentPage('landing');
  };

  // Start a new interview flow
  const handleStartInterviewWithConfig = (config: {
    role: string;
    type: 'Technical Deep-Dive' | 'Full Mock' | 'System Design' | 'Behavioral';
    difficulty: DifficultyLevel;
    questionCount: number;
  }) => {
    setActiveSessionRole(config.role);
    // Filter or select relevant questions
    const matchingQuestions = questions.filter(
      (q) => q.role.toLowerCase().includes(config.role.toLowerCase()) || q.category === 'Java'
    );
    const selected = (matchingQuestions.length > 0 ? matchingQuestions : questions).slice(
      0,
      config.questionCount
    );

    setSessionQuestions(selected);
    setCurrentQuestionIndex(0);
    setSessionAnswers({});
    setSessionEvaluations({});
    setShowFinalReport(false);
    setIsNewInterviewModalOpen(false);
    setActiveTab('practice');
  };

  // Called when candidate answers and advances
  const handleQuestionCompleted = (
    questionId: string,
    answer: string,
    evalResult: EvaluationResult
  ) => {
    setSessionAnswers((prev) => ({ ...prev, [questionId]: answer }));
    setSessionEvaluations((prev) => ({ ...prev, [questionId]: evalResult }));

    // If next question is within session length, advance
    if (currentQuestionIndex + 1 < sessionQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Completed all questions -> Generate Final Report
      generateFinalReport({
        ...sessionEvaluations,
        [questionId]: evalResult
      });
    }
  };

  const handleSkipQuestion = () => {
    if (currentQuestionIndex + 1 < sessionQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      generateFinalReport(sessionEvaluations);
    }
  };

  const generateFinalReport = (evals: Record<string, EvaluationResult>) => {
    const evalList = Object.values(evals);
    let avgTechnical = 88;
    let avgComm = 82;
    let avgOverall = 91;

    if (evalList.length > 0) {
      avgTechnical = Math.round(
        (evalList.reduce((acc, curr) => acc + curr.technicalAccuracy, 0) / evalList.length) * 10
      );
      avgComm = Math.round(
        (evalList.reduce((acc, curr) => acc + curr.communication, 0) / evalList.length) * 10
      );
      avgOverall = Math.round(
        evalList.reduce((acc, curr) => acc + curr.overallScore, 0) / evalList.length
      );
    }

    const newReport: FinalInterviewReport = {
      sessionId: `sess-${Date.now()}`,
      role: activeSessionRole,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      overallScore: avgOverall,
      readinessBadge:
        avgOverall >= 85
          ? 'Excellent — Interview Ready'
          : avgOverall >= 75
          ? 'Proficient — Minor Polish Required'
          : 'Developing — Review Improvement Plan',
      readinessSummary: `Candidate demonstrated ${
        avgOverall >= 85 ? 'strong' : 'solid'
      } comprehension of backend architecture, collections memory models, and clean problem solving.`,
      technicalKnowledge: avgTechnical,
      communication: avgComm,
      problemSolving: Math.min(100, avgTechnical + 3),
      confidence: Math.min(100, avgComm + 5),
      answerRelevance: 92,
      strengths: [
        'Deep mastery of JVM memory allocation and Java Collections Framework internals',
        'Precise explanation of CPU cache locality and time complexity comparisons',
        'Proactive clarification of edge cases and concurrency safety considerations'
      ],
      areasToImprove: [
        'Expand more on distributed caching failure scenarios (Redis cache stampede/penetration)',
        'Mention specific database indexing B-Tree vs Hash trade-offs when discussing persistence layers'
      ],
      aiRecommendation:
        'You are ready for mid-level backend interviews at top-tier tech companies. Before your upcoming rounds, spend 1 session refining System Design capacity estimations.',
      questionBreakdown: sessionQuestions.map((q) => ({
        question: q,
        userAnswer: sessionAnswers[q.id] || 'Candidate provided spoken explanation.',
        evaluation: evals[q.id] || {
          technicalAccuracy: 8.5,
          communication: 8,
          relevance: 9,
          clarity: 8.5,
          overallScore: 88,
          feedback: 'Solid explanation addressing core functionality.',
          strengths: ['Accurate conceptual framework'],
          areasToImprove: ['Add quantitative complexity analysis'],
          modelAnswer: q.sampleAnswer || '',
          adaptiveAction: 'harder_question',
          adaptiveExplanation: 'High performance triggered an advanced topic.'
        }
      }))
    };

    setActiveFinalReport(newReport);
    setShowFinalReport(true);
  };

  const handlePracticeSpecificQuestion = (q: Question) => {
    setActiveSessionRole(q.role);
    setSessionQuestions([q, ...curatedQuestionBank.filter((item) => item.id !== q.id).slice(0, 4)]);
    setCurrentQuestionIndex(0);
    setSessionAnswers({});
    setSessionEvaluations({});
    setShowFinalReport(false);
    setActiveTab('practice');
  };

  const handlePracticeDayFromPlan = (day: PlanDay) => {
    setActiveSessionRole('Java Backend Developer');
    setShowFinalReport(false);
    setCurrentQuestionIndex(0);
    setActiveTab('practice');
  };

  // Render Landing Page
  if (currentPage === 'landing') {
    return (
      <LandingPage
        onSignInClick={() => setCurrentPage('login')}
        onGetStartedClick={() => setCurrentPage('login')}
        onDemoCandidateClick={handleContinueAsDemo}
      />
    );
  }

  // Render Login Page
  if (currentPage === 'login') {
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onContinueAsDemo={handleContinueAsDemo}
        onBackToHome={() => setCurrentPage('landing')}
      />
    );
  }

  // Render Authenticated Applet Experience
  return (
    <div className="min-h-screen bg-[#F7F8FC] text-slate-800 flex flex-col font-sans">
      {/* Top Sticky White Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'practice') {
            setShowFinalReport(false);
          }
        }}
        user={user}
        onStartNewInterview={() => setIsNewInterviewModalOpen(true)}
        onLogout={handleLogout}
        notificationCount={2}
      />

      {/* Main Container Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Dashboard Hero */}
            <DashboardHero
              user={user}
              onStartNewInterview={() => setIsNewInterviewModalOpen(true)}
              onViewImprovementPlan={() => setActiveTab('plan')}
            />

            {/* Dashboard Statistics (4 white cards) */}
            <DashboardStats
              completedCount={user.interviewsCompleted}
              averageScore={user.averageScore}
              bestScore={user.bestScore}
              streakDays={user.streakDays}
            />

            {/* Dashboard Analytics (Two Columns: Score History Chart + Skill Competency Bars) */}
            <DashboardAnalytics
              scoreHistory={scoreHistory}
              skillCompetencies={skillCompetencies}
              onExploreSkillGaps={() => setActiveTab('skill-gap')}
            />

            {/* Quick Practice Launcher Banner */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2455F5] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60">
                  Daily Recommendation
                </span>
                <h4 className="text-base sm:text-lg font-black text-[#151A45]">
                  Continue Day 3: DSA Arrays & Algorithmic Patterns
                </h4>
                <p className="text-xs text-slate-500">
                  Targeted to raise your DSA competency from 65% to 80% with real-time speech evaluation.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowFinalReport(false);
                  setActiveTab('practice');
                }}
                className="px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-[#2455F5] to-[#6D3FE8] hover:opacity-95 shadow-md shadow-blue-600/20 active:scale-98 transition-all shrink-0"
              >
                Launch Practice Now
              </button>
            </div>
          </div>
        )}

        {/* PRACTICE INTERVIEW TAB */}
        {activeTab === 'practice' && (
          <div>
            {showFinalReport ? (
              <FinalReportView
                report={activeFinalReport}
                onPracticeWeakAreas={() => {
                  setShowFinalReport(false);
                  setCurrentQuestionIndex(0);
                }}
                onStartAnotherInterview={() => {
                  setIsNewInterviewModalOpen(true);
                }}
                onViewImprovementPlan={() => setActiveTab('plan')}
              />
            ) : (
              <PracticeInterviewView
                role={activeSessionRole}
                questions={sessionQuestions}
                currentQuestionIndex={currentQuestionIndex}
                onQuestionCompleted={handleQuestionCompleted}
                onFinishInterview={() => generateFinalReport(sessionEvaluations)}
                onSkipQuestion={handleSkipQuestion}
              />
            )}
          </div>
        )}

        {/* QUESTION BANK TAB */}
        {activeTab === 'questions' && (
          <QuestionBankView
            questions={questions}
            onPracticeQuestion={handlePracticeSpecificQuestion}
          />
        )}

        {/* INTERVIEW HISTORY TAB */}
        {activeTab === 'history' && (
          <InterviewHistoryView
            onViewReport={(id) => {
              setActiveFinalReport(sampleBestReport);
              setShowFinalReport(true);
              setActiveTab('practice');
            }}
            onStartNewInterview={() => setIsNewInterviewModalOpen(true)}
          />
        )}

        {/* SKILL GAP TAB */}
        {activeTab === 'skill-gap' && (
          <SkillGapView
            skillGaps={skillGaps}
            onPracticeSkill={(skill) => {
              setShowFinalReport(false);
              setActiveTab('practice');
            }}
            onGoToImprovementPlan={() => setActiveTab('plan')}
          />
        )}

        {/* IMPROVEMENT PLAN TAB */}
        {activeTab === 'plan' && (
          <ImprovementPlanView
            initialPlan={sevenDayPlan}
            onStartDayPractice={handlePracticeDayFromPlan}
          />
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <ProfileView
            user={user}
            onUpdateUser={(updated) => setUser(updated)}
          />
        )}

      </main>

      {/* New Interview Setup Modal */}
      <NewInterviewModal
        isOpen={isNewInterviewModalOpen}
        onClose={() => setIsNewInterviewModalOpen(false)}
        defaultRole={user.targetRole}
        onStart={handleStartInterviewWithConfig}
      />
    </div>
  );
}
