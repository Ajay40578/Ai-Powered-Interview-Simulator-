import React, { useState } from 'react';
import {
  User,
  Mail,
  Briefcase,
  Upload,
  CheckCircle2,
  Sparkles,
  FileText,
  Save,
  Plus,
  X,
  Building,
  Target
} from 'lucide-react';
import { UserProfile } from '../types/interview';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onUpdateUser
}) => {
  const [profile, setProfile] = useState<UserProfile>(user);
  const [newSkill, setNewSkill] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resumeAnalysis, setResumeAnalysis] = useState<string | null>(
    user.resumeSummary || null
  );

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((s) => s !== skillToRemove)
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser(profile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Simulated AI Resume Upload & Parsing
  const handleSimulateResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setProfile((prev) => ({
        ...prev,
        resumeFileName: file.name,
        skills: Array.from(
          new Set([...prev.skills, 'Kafka', 'Redis', 'Kubernetes', 'JUnit 5'])
        )
      }));
      setResumeAnalysis(
        `AI Resume Analysis for ${file.name}: Successfully extracted 11 skills. High match (88%) for Java Backend Developer roles. Detected minor gap in distributed cache invalidation (Redis) and high-concurrency profiling. Added Kafka, Redis, and Kubernetes to profile.`
      );
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left pb-16">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 text-xs font-extrabold uppercase bg-blue-50 text-[#2455F5] rounded-lg border border-blue-200/60">
              Candidate Profile
            </span>
            <span className="text-xs font-semibold text-slate-400">Integrated with Adaptive AI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#151A45] mt-2">
            Profile & Target Calibration
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            InterviewAI customizes mock questions and benchmarks to your profile and target companies.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2455F5] to-[#6D3FE8] text-white flex items-center justify-center font-bold text-lg">
            AK
          </div>
        </div>
      </div>

      {/* Main Profile Form Card */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        
        {savedSuccess && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center space-x-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Profile and AI calibration successfully updated!</span>
          </div>
        )}

        {/* 2-Column Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2455F5]/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2455F5]/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Target Engineering Role</label>
            <div className="relative">
              <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={profile.targetRole}
                onChange={(e) => setProfile({ ...profile, targetRole: e.target.value })}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2455F5]/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Experience Level</label>
            <select
              value={profile.experienceLevel}
              onChange={(e) => setProfile({ ...profile, experienceLevel: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2455F5]/40 bg-white"
            >
              <option>Student / New Grad</option>
              <option>Entry to Mid Level (1-3 yrs)</option>
              <option>Senior Level (4-7 yrs)</option>
              <option>Staff / Lead (8+ yrs)</option>
            </select>
          </div>
        </div>

        {/* Skills Tags */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">Verified Skills & Frameworks</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-xl bg-blue-50 text-[#2455F5] border border-blue-200/80 text-xs font-bold flex items-center space-x-1.5"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-rose-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add skill (e.g., Kafka, Redis, Docker)..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2455F5]/40"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* RESUME UPLOAD SECTION (Required by prompt) */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50/60 to-indigo-50/60 border border-blue-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#2455F5] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>AI Resume Parser & Skill Extractor</span>
            </div>
            {profile.resumeFileName && (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Active: {profile.resumeFileName}
              </span>
            )}
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Upload your resume (PDF/DOCX) so InterviewAI can customize mock interview scenarios and target company questions directly to your project experience.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-white border border-blue-200 hover:bg-blue-50 text-xs font-bold text-[#2455F5] shadow-2xs flex items-center space-x-2 transition-all">
              <Upload className="w-4 h-4" />
              <span>{isUploading ? 'Analyzing Resume...' : 'Upload Resume'}</span>
              <input
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                onChange={handleSimulateResumeUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>

            <button
              type="button"
              onClick={() => {
                setProfile((prev) => ({
                  ...prev,
                  resumeFileName: 'Alex_Kumar_Updated_CV.pdf'
                }));
                setResumeAnalysis(
                  'Auto-parsed Alex_Kumar_Updated_CV.pdf: High alignment with Senior Java Backend roles. Recommended focusing on System Design & Distributed Caching.'
                );
              }}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline"
            >
              Load Sample Resume
            </button>
          </div>

          {resumeAnalysis && (
            <div className="mt-2 p-3 bg-white/90 rounded-xl border border-blue-200/80 text-xs text-slate-700 leading-relaxed">
              <strong className="text-[#2455F5] block mb-0.5">Resume Insights:</strong>
              {resumeAnalysis}
            </div>
          )}
        </div>

        {/* Save Changes Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-[#2455F5] via-[#3155E8] to-[#6D3FE8] hover:opacity-95 shadow-md shadow-blue-600/25 active:scale-98 transition-all flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile & Calibrate AI</span>
          </button>
        </div>

      </form>

    </div>
  );
};
