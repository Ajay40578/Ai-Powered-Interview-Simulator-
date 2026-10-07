export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export type QuestionCategory =
  | 'Java'
  | 'Python'
  | 'SQL'
  | 'DSA'
  | 'DBMS'
  | 'AI/ML'
  | 'Data Science'
  | 'System Design'
  | 'Behavioral'
  | 'HR'
  | 'OOP'
  | 'Concurrency';

export type QuestionType =
  | 'Conceptual'
  | 'Coding & Architecture'
  | 'System Design'
  | 'Behavioral'
  | 'Scenario & Debugging';

export interface Question {
  id: string;
  role: string;
  category: QuestionCategory;
  difficulty: DifficultyLevel;
  type: QuestionType;
  question: string;
  context?: string;
  hints?: string[];
  sampleAnswer?: string;
  keyPointsToMention?: string[];
  adaptiveBranchNote?: string;
}

export interface EvaluationResult {
  technicalAccuracy: number; // 1 - 10
  communication: number; // 1 - 10
  relevance: number; // 1 - 10
  clarity: number; // 1 - 10
  overallScore: number; // 0 - 100
  feedback: string;
  strengths: string[];
  areasToImprove: string[];
  modelAnswer: string;
  adaptiveAction: 'harder_question' | 'follow_up' | 'easier_question' | 'advanced_question';
  adaptiveExplanation: string;
}

export interface AnswerSubmission {
  questionId: string;
  answerText: string;
  timeSpentSeconds: number;
}

export interface FinalInterviewReport {
  sessionId: string;
  role: string;
  date: string;
  overallScore: number; // e.g. 91
  readinessBadge: string; // "Excellent — Interview Ready"
  readinessSummary: string;
  technicalKnowledge: number; // 84
  communication: number; // 76
  problemSolving: number; // 83
  confidence: number; // 79
  answerRelevance: number; // 90
  strengths: string[];
  areasToImprove: string[];
  aiRecommendation: string;
  questionBreakdown: {
    question: Question;
    userAnswer: string;
    evaluation: EvaluationResult;
  }[];
}

export interface InterviewSession {
  id: string;
  role: string;
  type: 'Technical Deep-Dive' | 'Full Mock' | 'System Design' | 'Behavioral';
  startedAt: string;
  status: 'in_progress' | 'completed';
  totalQuestions: number;
  currentIndex: number;
  questions: Question[];
  answers: Record<string, string>;
  evaluations: Record<string, EvaluationResult>;
  finalScore?: number;
  durationMinutes?: number;
  finalReport?: FinalInterviewReport;
}

export interface SkillCompetency {
  name: string;
  score: number;
  benchmark: number;
  trend: string;
}

export interface SkillGapItem {
  skill: string;
  currentLevel: number;
  targetLevel: number;
  status: 'strong' | 'needs_improvement';
  gapDescription: string;
  recommendedTopics: string[];
}

export interface PlanDayTask {
  id: string;
  title: string;
  completed: boolean;
  type: 'concept' | 'code' | 'mock';
  duration: string;
}

export interface PlanDay {
  day: number;
  title: string;
  topic: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  description: string;
  estimatedMinutes: number;
  tasks: PlanDayTask[];
}

export interface UserProfile {
  name: string;
  email: string;
  targetRole: string;
  experienceLevel: string;
  currentReadiness: number;
  skills: string[];
  targetCompanies: string[];
  interviewsCompleted: number;
  streakDays: number;
  bestScore: number;
  averageScore: number;
  resumeFileName?: string;
  resumeSummary?: string;
}
