import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Zap,
  ArrowLeft
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (userName: string, email: string) => void;
  onContinueAsDemo: () => void;
  onBackToHome: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onContinueAsDemo,
  onBackToHome
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide an email address');
      return;
    }
    onLoginSuccess(name || 'Alex Kumar', email);
  };

  const handleGoogleLogin = () => {
    onLoginSuccess('Alex Kumar', 'alex.kumar@example.com');
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Top back button */}
      <button
        onClick={onBackToHome}
        className="fixed top-6 left-6 inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-[#151A45] bg-white px-3 py-2 rounded-xl shadow-xs border border-slate-200 transition-all z-50"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Home</span>
      </button>

      {/* Main 2-Column Container */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-200/90 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
        
        {/* LEFT SIDE: Blue -> Indigo -> Purple -> Dark Navy gradient */}
        <div className="md:col-span-5 bg-gradient-to-br from-[#2455F5] via-[#4438CA] via-[#6D3FE8] to-[#151A45] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle light glow elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-2xl -ml-20 -mb-20 pointer-events-none" />

          {/* Top Branding */}
          <div className="relative z-10 space-y-6">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={onBackToHome}>
              <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-md">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-2xl tracking-tight text-white block">
                  InterviewAI
                </span>
                <span className="text-[11px] font-semibold text-blue-200 uppercase tracking-widest">
                  Practice Smarter.
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Your AI-Powered Interview Coach
              </h2>
              <p className="text-blue-100/90 text-sm leading-relaxed">
                Personalized mock interviews with real-time speech evaluation, adaptive questioning, and structured 7-day preparation roadmaps.
              </p>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="relative z-10 space-y-3 pt-6 border-t border-white/20 text-xs sm:text-sm font-medium text-blue-50">
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Real-time voice & text AI evaluation</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Adaptive questions tuned to your skill level</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Diagnostic skill gap readiness scoring</span>
            </div>
          </div>

          {/* Security badge footer */}
          <div className="relative z-10 pt-4 flex items-center space-x-2 text-[11px] text-blue-200">
            <ShieldCheck className="w-4 h-4" />
            <span>End-to-end encrypted session practice</span>
          </div>
        </div>

        {/* RIGHT SIDE: Clean White Background */}
        <div className="md:col-span-7 bg-white p-8 sm:p-10 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-6">
            
            {/* Header */}
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-[#151A45]">
                {isSignUp ? 'Create your InterviewAI Account' : 'Welcome to InterviewAI'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                {isSignUp
                  ? 'Sign up to start practicing adaptive interviews with instant feedback'
                  : 'Sign in to continue your interview preparation'}
              </p>
            </div>

            {/* DEMO CANDIDATE ONE-CLICK CALLOUT */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/90 flex items-center justify-between shadow-2xs">
              <div className="space-y-0.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2455F5]">
                  Hackathon Fast-Track
                </span>
                <p className="text-xs font-bold text-slate-800">
                  Alex Kumar (Java Backend Dev)
                </p>
                <p className="text-[11px] text-slate-500">
                  Instant access with 4 completed interviews & score 91
                </p>
              </div>
              <button
                type="button"
                onClick={onContinueAsDemo}
                className="px-3.5 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-[#2455F5] to-[#6D3FE8] rounded-xl hover:opacity-95 shadow-md shadow-blue-600/20 shrink-0 ml-3"
              >
                Launch Demo
              </button>
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-xl text-xs sm:text-sm font-bold text-slate-700 shadow-2xs transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                OR
              </span>
              <div className="border-t border-slate-200 w-full" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-2.5 rounded-lg bg-rose-50 text-rose-600 text-xs font-semibold">
                  {error}
                </div>
              )}

              {isSignUp && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Kumar"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2455F5]/40 focus:border-[#2455F5]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex.kumar@example.com"
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2455F5]/40 focus:border-[#2455F5]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">Password</label>
                  {!isSignUp && (
                    <a href="#forgot" className="text-xs text-[#2455F5] font-semibold hover:underline">
                      Forgot Password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2455F5]/40 focus:border-[#2455F5]"
                  />
                </div>
              </div>

              {/* Blue / Purple Gradient Sign In Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#2455F5] via-[#3155E8] to-[#6D3FE8] hover:opacity-95 shadow-md shadow-blue-600/25 active:scale-98 transition-all flex items-center justify-center space-x-2"
              >
                <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Toggle sign in / sign up */}
            <div className="text-center pt-2 border-t border-slate-100">
              <p className="text-xs text-slate-500 font-medium">
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-[#2455F5] font-bold hover:underline"
                >
                  {isSignUp ? 'Sign In' : 'Create Account'}
                </button>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
