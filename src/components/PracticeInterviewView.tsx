import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Clock,
  Send,
  FastForward,
  BrainCircuit,
  Info,
  CheckCircle,
  Layers,
  ChevronDown,
  ChevronUp,
  Cpu
} from 'lucide-react';
import { Question, EvaluationResult, DifficultyLevel } from '../types/interview';
import { AnswerFeedbackCard } from './AnswerFeedbackCard';
import { evaluateAnswer, speakText, stopSpeaking } from '../services/interviewService';

interface PracticeInterviewViewProps {
  role: string;
  questions: Question[];
  currentQuestionIndex: number;
  onQuestionCompleted: (questionId: string, answer: string, evalResult: EvaluationResult) => void;
  onFinishInterview: () => void;
  onSkipQuestion: () => void;
}

export const PracticeInterviewView: React.FC<PracticeInterviewViewProps> = ({
  role,
  questions,
  currentQuestionIndex,
  onQuestionCompleted,
  onFinishInterview,
  onSkipQuestion
}) => {
  const currentQuestion = questions[currentQuestionIndex] || questions[0];
  const [answerText, setAnswerText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [showAdaptiveRules, setShowAdaptiveRules] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const recognitionRef = useRef<any>(null);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  // Reset answer text and evaluation when question changes
  useEffect(() => {
    setAnswerText('');
    setEvaluation(null);
    setShowHints(false);
  }, [currentQuestionIndex]);

  // Speech-to-Text handler
  const toggleRecording = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      setIsRecording(false);
      return;
    }

    // Check Web Speech API SpeechRecognition
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Fallback simulation if browser does not support SpeechRecognition
      setIsRecording(true);
      const sampleSpokenText =
        ' In Java, ArrayList is implemented as a dynamic array with O(1) random access, while LinkedList is a doubly-linked list. In modern server architecture, ArrayList is preferred because CPU cache locality offers superior throughput.';
      let charIdx = 0;
      const interval = setInterval(() => {
        if (charIdx < sampleSpokenText.length) {
          setAnswerText((prev) => prev + sampleSpokenText[charIdx]);
          charIdx++;
        } else {
          clearInterval(interval);
          setIsRecording(false);
        }
      }, 35);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setAnswerText((prev) => (prev ? `${prev} ${transcript}` : transcript));
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
      setIsRecording(true);
    } catch (err) {
      console.warn('Speech recognition error:', err);
      setIsRecording(false);
    }
  };

  // Text-to-Speech handler
  const handleListenQuestion = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakText(currentQuestion.question, () => {
        setIsSpeaking(false);
      });
    }
  };

  // Submit Answer & Evaluate with AI
  const handleSubmitAnswer = async () => {
    if (!answerText.trim()) return;

    if (isRecording) {
      toggleRecording();
    }
    stopSpeaking();
    setIsSpeaking(false);

    setIsEvaluating(true);

    try {
      const evalResult = await evaluateAnswer({
        role,
        question: currentQuestion.question,
        answer: answerText,
        difficulty: currentQuestion.difficulty,
        questionNumber: currentQuestionIndex + 1,
        totalQuestions: questions.length
      });

      setEvaluation(evalResult);
    } catch (e) {
      console.error(e);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Advance to next question or complete interview
  const handleNext = () => {
    if (evaluation) {
      onQuestionCompleted(currentQuestion.id, answerText, evaluation);
    }
    if (currentQuestionIndex + 1 >= questions.length) {
      onFinishInterview();
    }
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-left pb-16">
      
      {/* TOP HEADER BAR */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2455F5] to-[#6D3FE8] text-white flex items-center justify-center font-bold">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                AI Mock Interview
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold text-emerald-600">Adaptive Active</span>
            </div>
            <h2 className="text-lg font-black text-[#151A45]">
              Target Role: <span className="text-[#2455F5]">{role}</span>
            </h2>
          </div>
        </div>

        {/* Question Counter & Difficulty & Timer */}
        <div className="flex items-center space-x-3">
          <div className="px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-bold text-slate-700 flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{formatTimer(elapsedSeconds)}</span>
          </div>

          <div className="px-3 py-1.5 bg-blue-50 text-[#2455F5] rounded-xl text-xs font-extrabold border border-blue-200/70">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>

          <span
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold ${
              currentQuestion.difficulty === 'Hard'
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : currentQuestion.difficulty === 'Easy'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}
          >
            Difficulty: {currentQuestion.difficulty}
          </span>
        </div>
      </div>

      {/* ADAPTIVE INTERVIEW CONCEPT BANNER */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50/50 to-purple-50 rounded-2xl p-3.5 sm:p-4 border border-blue-200/80 flex items-center justify-between text-xs font-semibold text-slate-700 shadow-2xs">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-[#2455F5] shrink-0" />
          <span>
            <strong>Adaptive Engine:</strong> AI is analyzing your answers in real time and automatically calibrating follow-up questions.
          </span>
        </div>
        <button
          onClick={() => setShowAdaptiveRules(!showAdaptiveRules)}
          className="text-[#2455F5] font-bold hover:underline shrink-0 ml-3 flex items-center space-x-1"
        >
          <span>{showAdaptiveRules ? 'Hide Rules' : 'View Rules'}</span>
          {showAdaptiveRules ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* EXPANDABLE ADAPTIVE RULES DIAGRAM */}
      {showAdaptiveRules && (
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 text-xs shadow-xs animate-in fade-in duration-150">
          <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-3">
            Real-Time Adaptive Branching Matrix:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 text-center">
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="font-extrabold text-emerald-800 block">Excellent answer</span>
              <span className="text-[11px] text-emerald-600 font-bold">→ Harder question</span>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200">
              <span className="font-extrabold text-[#2455F5] block">Partial answer</span>
              <span className="text-[11px] text-blue-600 font-bold">→ Follow-up question</span>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
              <span className="font-extrabold text-amber-800 block">Weak answer</span>
              <span className="text-[11px] text-amber-600 font-bold">→ Easier related question</span>
            </div>
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200">
              <span className="font-extrabold text-rose-800 block">Repeated weakness</span>
              <span className="text-[11px] text-rose-600 font-bold">→ Skill gap detected</span>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200">
              <span className="font-extrabold text-[#6D3FE8] block">Strong performance</span>
              <span className="text-[11px] text-purple-600 font-bold">→ Advanced question</span>
            </div>
          </div>
        </div>
      )}

      {/* QUESTION CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg shadow-slate-200/50 space-y-4">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 text-xs font-extrabold bg-[#2455F5] text-white rounded-lg">
              {currentQuestion.category}
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              Type: {currentQuestion.type}
            </span>
          </div>

          {/* Audio Listen Button */}
          <button
            onClick={handleListenQuestion}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors ${
              isSpeaking
                ? 'bg-rose-50 text-rose-600 border border-rose-200'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>Stop Audio</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#2455F5]" />
                <span>Listen to Question</span>
              </>
            )}
          </button>
        </div>

        {/* Question Heading */}
        <h3 className="text-xl sm:text-2xl font-black text-[#151A45] leading-snug">
          "{currentQuestion.question}"
        </h3>

        {/* Context / Hint preview */}
        {currentQuestion.context && (
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            {currentQuestion.context}
          </p>
        )}

        {/* Expandable Hint / Expected Points */}
        <div>
          <button
            onClick={() => setShowHints(!showHints)}
            className="text-xs font-bold text-[#2455F5] hover:text-[#4438CA] flex items-center space-x-1"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHints ? 'Hide Hints & Key Concepts' : 'Need a Hint / Key Points?'}</span>
          </button>

          {showHints && currentQuestion.hints && (
            <div className="mt-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 animate-in fade-in duration-150">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                Recommended Areas To Cover:
              </span>
              <ul className="space-y-1 text-xs text-slate-600">
                {currentQuestion.hints.map((h, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-[#2455F5] font-bold">✓</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>

      {/* ANSWER AREA OR EVALUATION CARD */}
      {!evaluation ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg shadow-slate-200/50 space-y-5">
          
          <div className="flex items-center justify-between">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Your Answer (Speak or Type):
            </label>
            <span className="text-xs text-slate-400 font-medium">
              Word count: {answerText.trim() ? answerText.trim().split(/\s+/).length : 0} words
            </span>
          </div>

          {/* Large Answer Textarea */}
          <div className="relative">
            <textarea
              rows={7}
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Start speaking or type your technical answer here. For example: 'ArrayList is backed by a dynamic array offering O(1) random access, whereas LinkedList is implemented as a doubly linked list...'"
              className="w-full p-4 text-sm sm:text-base rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2455F5]/40 focus:border-[#2455F5] text-slate-800 placeholder-slate-400 resize-y leading-relaxed font-sans"
            />

            {/* Recording Audio Wave Visualizer Indicator */}
            {isRecording && (
              <div className="absolute bottom-3 left-3 flex items-center space-x-2 bg-rose-50 text-rose-600 px-3 py-1.5 rounded-full border border-rose-200 text-xs font-bold animate-pulse">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                <span>Recording Voice... Speak clearly into your microphone</span>
              </div>
            )}
          </div>

          {/* Buttons: Start Recording, Submit Answer, Skip Question */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            
            <div className="flex items-center space-x-2.5">
              {/* Start / Stop Recording Button */}
              <button
                type="button"
                onClick={toggleRecording}
                className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all ${
                  isRecording
                    ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/25 animate-pulse'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-[#2455F5]" />}
                <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
              </button>

              {/* Sample Answer Fill Button (Useful for instant test) */}
              <button
                type="button"
                onClick={() => {
                  setAnswerText(
                    'ArrayList is backed by an array that dynamically resizes by 50% when full. It provides O(1) random lookup by index, but inserting in the middle requires O(n) element copying. LinkedList consists of doubly-linked nodes; insertions at the head/tail are O(1), but random access is O(n). In modern architectures, ArrayList is preferred because contiguous memory leverages CPU cache locality.'
                  );
                }}
                className="px-3 py-3 rounded-2xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                title="Fill sample answer for testing"
              >
                Fill Sample
              </button>
            </div>

            <div className="flex items-center space-x-2.5">
              {/* Skip Question Button */}
              <button
                type="button"
                onClick={onSkipQuestion}
                className="px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              >
                Skip Question
              </button>

              {/* Submit Answer Button */}
              <button
                type="button"
                onClick={handleSubmitAnswer}
                disabled={!answerText.trim() || isEvaluating}
                className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-extrabold text-white flex items-center space-x-2 transition-all ${
                  !answerText.trim() || isEvaluating
                    ? 'bg-slate-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#2455F5] via-[#3155E8] to-[#6D3FE8] hover:opacity-95 shadow-md shadow-blue-600/25 active:scale-98'
                }`}
              >
                {isEvaluating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Evaluating with AI...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Answer</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      ) : (
        /* Instant AI Evaluation Card */
        <AnswerFeedbackCard
          evaluation={evaluation}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          onNextQuestion={handleNext}
          isLastQuestion={currentQuestionIndex + 1 >= questions.length}
        />
      )}

    </div>
  );
};
