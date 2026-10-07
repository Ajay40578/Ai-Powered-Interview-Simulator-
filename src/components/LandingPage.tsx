import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  BrainCircuit,
  Volume2,
  ShieldCheck,
  Target,
  BarChart3,
  TrendingUp,
  Cpu,
  Layers,
  ChevronRight,
  Award,
  Zap,
  Play
} from 'lucide-react';

interface LandingPageProps {
  onSignInClick: () => void;
  onGetStartedClick: () => void;
  onDemoCandidateClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onSignInClick,
  onGetStartedClick,
  onDemoCandidateClick,
}) => {
  const [activeTab, setActiveTab] = useState<'flow' | 'feedback' | 'readiness'>('flow');

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-slate-800 flex flex-col selection:bg-[#2455F5]/20 selection:text-[#151A45]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* LEFT: InterviewAI Logo & Name */}
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#2455F5] via-[#4438CA] to-[#6D3FE8] flex items-center justify-center text-white shadow-lg shadow-blue-600/25">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-black text-2xl tracking-tight bg-gradient-to-r from-[#151A45] via-[#2455F5] to-[#6D3FE8] bg-clip-text text-transparent">
                InterviewAI
              </span>
              <span className="block text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                Practice Smarter. Interview Better.
              </span>
            </div>
          </div>

          {/* CENTER NAVIGATION */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
            <a href="#home" className="text-[#2455F5] hover:text-[#2455F5] transition-colors">Home</a>
            <a href="#how-it-works" className="hover:text-[#151A45] transition-colors">How It Works</a>
            <a href="#features" className="hover:text-[#151A45] transition-colors">Features</a>
            <a href="#adaptive" className="hover:text-[#151A45] transition-colors">Adaptive AI</a>
            <a href="#about" className="hover:text-[#151A45] transition-colors">About</a>
          </nav>

          {/* RIGHT: Auth Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onSignInClick}
              className="px-4 py-2 text-sm font-bold text-slate-700 hover:text-[#2455F5] hover:bg-slate-100 rounded-xl transition-all"
            >
              Sign In
            </button>
            <button
              onClick={onGetStartedClick}
              className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-[#2455F5] via-[#3155E8] to-[#6D3FE8] hover:opacity-95 shadow-md shadow-blue-600/25 rounded-xl transition-all active:scale-98"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="home" className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
        {/* Subtle decorative glowing background shapes */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#2455F5]/10 via-[#6D3FE8]/10 to-transparent blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* HERO LEFT */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 shadow-2xs">
                <span className="flex h-2 w-2 rounded-full bg-[#2455F5] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#2455F5]">
                  AI-POWERED INTERVIEW COACH
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#151A45] tracking-tight leading-[1.12]">
                Practice Smarter.{' '}
                <span className="bg-gradient-to-r from-[#2455F5] via-[#4438CA] to-[#6D3FE8] bg-clip-text text-transparent block">
                  Interview Better.
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-xl">
                Your personalized AI interview coach for realistic mock interviews, instant feedback and smarter preparation.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onGetStartedClick}
                  className="px-7 py-3.5 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-[#2455F5] via-[#3155E8] to-[#6D3FE8] hover:shadow-xl hover:shadow-blue-600/30 active:scale-98 transition-all flex items-center space-x-2.5"
                >
                  <span>Start Free Interview</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={onDemoCandidateClick}
                  className="px-6 py-3.5 rounded-2xl text-base font-bold text-[#151A45] bg-white border border-slate-200/90 hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-all flex items-center space-x-2"
                >
                  <Play className="w-4 h-4 text-[#2455F5] fill-[#2455F5]" />
                  <span>Explore Demo (Alex Kumar)</span>
                </button>
              </div>

              {/* Feature Highlights (Checkmarks) */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200/60 max-w-lg">
                <div className="flex items-center space-x-2 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#2455F5] shrink-0" />
                  <span>Personalized Interviews</span>
                </div>
                <div className="flex items-center space-x-2 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#2455F5] shrink-0" />
                  <span>Adaptive AI Questions</span>
                </div>
                <div className="flex items-center space-x-2 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#2455F5] shrink-0" />
                  <span>Instant Feedback</span>
                </div>
                <div className="flex items-center space-x-2 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#2455F5] shrink-0" />
                  <span>Interview Readiness Score</span>
                </div>
              </div>
            </div>

            {/* HERO RIGHT: Premium AI Interview Visual / Mock Dashboard Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md sm:max-w-lg rounded-3xl p-1 bg-gradient-to-br from-[#2455F5] via-[#6D3FE8] to-[#151A45] shadow-2xl shadow-blue-900/25">
                <div className="bg-white rounded-[22px] p-6 sm:p-7 space-y-5 text-left">
                  
                  {/* Top Bar of Mock Card */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center space-x-2.5">
                      <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                      <span className="text-xs font-bold text-slate-500 ml-2">AI Simulation Active</span>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-extrabold text-[#2455F5] bg-blue-50 rounded-lg border border-blue-200/60">
                      Target: Java Backend Developer
                    </span>
                  </div>

                  {/* Question Box */}
                  <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/70">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1.5">
                      <span className="text-[#2455F5] font-extrabold uppercase">Question 4 of 10 • Medium</span>
                      <span className="flex items-center text-slate-400">
                        <Volume2 className="w-3.5 h-3.5 mr-1 text-[#2455F5]" /> Audio Enabled
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-bold text-[#151A45]">
                      "Explain the difference between ArrayList and LinkedList in Java."
                    </p>
                  </div>

                  {/* Candidate Answer Preview */}
                  <div className="bg-white rounded-xl p-3.5 border border-blue-200/90 text-xs sm:text-sm text-slate-700 bg-blue-50/20">
                    <span className="text-[11px] font-extrabold uppercase text-[#2455F5] block mb-1">Candidate Answer:</span>
                    "ArrayList uses a dynamic resizing array giving O(1) random lookup by index, whereas LinkedList has doubly-linked nodes. In modern systems, ArrayList is preferred due to CPU cache locality..."
                  </div>

                  {/* Real-Time Evaluation Result */}
                  <div className="rounded-2xl p-4 bg-gradient-to-r from-blue-50/90 via-indigo-50/80 to-purple-50/90 border border-blue-200">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-xs font-bold text-slate-500">AI Instant Evaluation</span>
                        <h4 className="text-lg font-black text-[#151A45]">Overall Score: 82%</h4>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
                        Top Performer
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold mb-3">
                      <div className="bg-white/80 p-1.5 rounded-lg border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-normal">Technical</span>
                        <span className="text-[#2455F5] font-black">8/10</span>
                      </div>
                      <div className="bg-white/80 p-1.5 rounded-lg border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-normal">Delivery</span>
                        <span className="text-[#2455F5] font-black">7/10</span>
                      </div>
                      <div className="bg-white/80 p-1.5 rounded-lg border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-normal">Relevance</span>
                        <span className="text-[#2455F5] font-black">9/10</span>
                      </div>
                      <div className="bg-white/80 p-1.5 rounded-lg border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-normal">Clarity</span>
                        <span className="text-[#2455F5] font-black">8/10</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-xs font-semibold text-[#151A45] bg-white/70 p-2 rounded-xl">
                      <Sparkles className="w-3.5 h-3.5 text-[#6D3FE8] shrink-0" />
                      <span>
                        <strong className="text-[#2455F5]">Adaptive Decision:</strong> High technical accuracy detected → Generating advanced follow-up on HashMap collision resolution!
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Floating Decorative Badge */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-200/90 items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-black text-sm">
                  91%
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-800">Readiness Score</p>
                  <p className="text-[11px] text-emerald-600 font-bold">Interview Ready</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE PRODUCT FLOW SECTION */}
      <section id="how-it-works" className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2455F5] bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200/60">
              End-To-End Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#151A45]">
              How InterviewAI Transforms Your Prep
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Unlike static question banks, InterviewAI listens, diagnoses, and adapts to your exact answers in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            
            {/* Step 1 */}
            <div className="bg-[#F7F8FC] rounded-2xl p-6 border border-slate-200/70 hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100/80 text-[#2455F5] flex items-center justify-center font-black text-lg">
                01
              </div>
              <h3 className="text-lg font-bold text-[#151A45]">Target Role & Profile</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Choose from Java Backend, Full Stack, Python Data, or custom engineering roles with your exact experience level.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#F7F8FC] rounded-2xl p-6 border border-slate-200/70 hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-100/80 text-[#4438CA] flex items-center justify-center font-black text-lg">
                02
              </div>
              <h3 className="text-lg font-bold text-[#151A45]">Adaptive AI Interview</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Speak or type your answers. The AI evaluates every sentence and dynamically branches into deeper follow-up questions.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#F7F8FC] rounded-2xl p-6 border border-slate-200/70 hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-100/80 text-[#6D3FE8] flex items-center justify-center font-black text-lg">
                03
              </div>
              <h3 className="text-lg font-bold text-[#151A45]">Instant Feedback & Score</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Receive instant breakdowns across Technical Accuracy, Communication, Relevance, and Clarity with ideal model responses.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#F7F8FC] rounded-2xl p-6 border border-slate-200/70 hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center font-black text-lg">
                04
              </div>
              <h3 className="text-lg font-bold text-[#151A45]">7-Day Improvement Plan</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Review targeted skill gaps and follow a personalized daily roadmap designed to convert weak areas into strengths.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ADAPTIVE INTERVIEW CONCEPT SHOWCASE */}
      <section id="adaptive" className="py-20 bg-[#F7F8FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2455F5] bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200/60">
              The Adaptive Difference
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#151A45]">
              Real Interviewers Don’t Follow Scripts. Neither Does InterviewAI.
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Traditional mock platforms show fixed question lists. InterviewAI dynamically branches based on the candidate’s answers.
            </p>
          </div>

          {/* Interactive branching tree card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white font-bold text-xs flex items-center justify-center mb-2">
                    A+
                  </div>
                  <h4 className="font-extrabold text-sm text-emerald-950">Excellent Answer</h4>
                  <p className="text-xs text-emerald-700 mt-1">High technical depth & clarity</p>
                </div>
                <div className="mt-4 pt-3 border-t border-emerald-200/60 text-xs font-bold text-emerald-800 flex items-center">
                  <span>→ Escalates to Harder Question</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#2455F5] text-white font-bold text-xs flex items-center justify-center mb-2">
                    B
                  </div>
                  <h4 className="font-extrabold text-sm text-blue-950">Partial Answer</h4>
                  <p className="text-xs text-blue-700 mt-1">Missed trade-offs or concurrency</p>
                </div>
                <div className="mt-4 pt-3 border-t border-blue-200/60 text-xs font-bold text-[#2455F5] flex items-center">
                  <span>→ Targeted Follow-up Question</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-white font-bold text-xs flex items-center justify-center mb-2">
                    C
                  </div>
                  <h4 className="font-extrabold text-sm text-amber-950">Weak Answer</h4>
                  <p className="text-xs text-amber-700 mt-1">Struggles with core definition</p>
                </div>
                <div className="mt-4 pt-3 border-t border-amber-200/60 text-xs font-bold text-amber-800 flex items-center">
                  <span>→ Easier Related Question</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-rose-500 text-white font-bold text-xs flex items-center justify-center mb-2">
                    !
                  </div>
                  <h4 className="font-extrabold text-sm text-rose-950">Repeated Weakness</h4>
                  <p className="text-xs text-rose-700 mt-1">Struggles across subtopics</p>
                </div>
                <div className="mt-4 pt-3 border-t border-rose-200/60 text-xs font-bold text-rose-800 flex items-center">
                  <span>→ Skill Gap Detected & Logged</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#6D3FE8] text-white font-bold text-xs flex items-center justify-center mb-2">
                    ★
                  </div>
                  <h4 className="font-extrabold text-sm text-purple-950">Strong Performance</h4>
                  <p className="text-xs text-purple-700 mt-1">Consistently exceeds benchmarks</p>
                </div>
                <div className="mt-4 pt-3 border-t border-purple-200/60 text-xs font-bold text-[#6D3FE8] flex items-center">
                  <span>→ Advanced Senior Question</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2455F5] bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200/60">
              Built For Serious Candidates
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#151A45]">
              Everything You Need To Secure Your Offer
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Designed with hiring managers to mirror exact FAANG and Fortune 500 interview expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-[#F7F8FC] rounded-2xl p-7 border border-slate-200/80 space-y-4 hover:border-blue-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#2455F5] to-[#4438CA] text-white flex items-center justify-center shadow-md">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#151A45]">Speech-to-Text & Vocal Audio</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Practice answering out loud like a real phone screen or video interview. Listen to the AI read questions with lifelike cadence.
              </p>
            </div>

            <div className="bg-[#F7F8FC] rounded-2xl p-7 border border-slate-200/80 space-y-4 hover:border-blue-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#4438CA] to-[#6D3FE8] text-white flex items-center justify-center shadow-md">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#151A45]">Granular Skill Gap Analysis</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Identify precisely where you shine (Java, SQL, OOP) and where you need immediate focus (System Design, DSA, Communication).
              </p>
            </div>

            <div className="bg-[#F7F8FC] rounded-2xl p-7 border border-slate-200/80 space-y-4 hover:border-blue-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#6D3FE8] to-[#151A45] text-white flex items-center justify-center shadow-md">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#151A45]">Curated Question Bank</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Filter by Role, Skill, Difficulty, and Type across Java, Python, SQL, DSA, System Design, Behavioral, and HR.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA FOOTER BANNER */}
      <section className="py-16 bg-[#F7F8FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-[#2455F5] via-[#4438CA] to-[#151A45] text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between shadow-2xl shadow-blue-900/30 gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-bold tracking-wider uppercase backdrop-blur-xs">
                Ready For Your Next Round?
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Stop Guessing. Start Practicing With InterviewAI.
              </h3>
              <p className="text-blue-100 text-sm sm:text-base">
                Join thousands of students and engineers preparing with adaptive AI feedback and personalized roadmaps.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                onClick={onGetStartedClick}
                className="w-full sm:w-auto px-7 py-4 rounded-xl text-sm font-extrabold text-[#151A45] bg-white hover:bg-blue-50 shadow-lg active:scale-98 transition-all"
              >
                Start Free Interview
              </button>
              <button
                onClick={onDemoCandidateClick}
                className="w-full sm:w-auto px-6 py-4 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all"
              >
                Demo Candidate
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="about" className="mt-auto bg-white border-t border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#2455F5] to-[#6D3FE8] flex items-center justify-center text-white">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-extrabold text-slate-800 text-sm">InterviewAI</span>
            <span>— Practice Smarter. Interview Better.</span>
          </div>

          <div className="flex items-center space-x-6">
            <span>Built for Students & Job Seekers</span>
            <span>Privacy Focused</span>
            <span>v2.4 Hackathon Edition</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
