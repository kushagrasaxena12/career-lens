import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Target,
  CheckCircle2,
  AlertCircle,
  Copy,
  Lightbulb,
  FileText,
  Search,
  MapPin,
  Briefcase
} from 'lucide-react';

const TabButton = ({ active, onClick, label, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
      active
        ? 'bg-white text-black shadow-lg shadow-white/10'
        : 'text-zinc-400 hover:text-white hover:bg-white/5'
    }`}
  >
    <Icon size={16} />
    {label}
  </button>
);

const AnalysisPage = ({ user }) => {
  const { jd, setJd, analysis, loading, handleAnalyze, resumes } = useApp();
  const [activeTab, setActiveTab] = useState('strong');
  const activeResume = resumes.find(r => r.isActive);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8"
    >
      {/* Left Column: Input Setup */}
      <div className="lg:col-span-5 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3 mb-2">
            <span className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <Sparkles size={24} />
            </span>
            AI Match Analysis
          </h1>
          <p className="text-zinc-400">Compare your active resume against a job description for precision matching.</p>
        </div>

        <div className="space-y-6">
          {/* Active Resume Selector */}
          <div className="glass p-6 rounded-3xl border border-white/10">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FileText size={16} />
              Active Resume
            </h3>
            {activeResume ? (
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500 rounded-lg text-white">
                    <FileText size={18} />
                  </div>
                  <span className="text-white font-bold truncate max-w-[200px]">{activeResume.name}</span>
                </div>
                <span className="text-xs font-bold text-indigo-400">Active</span>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm font-medium">
                No active resume selected. Please set one in the Resume Vault.
              </div>
            )}
          </div>

          {/* JD Entry Form */}
          <div className="glass p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Search size={16} />
              Job Description
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-500">Job Title</label>
                <input
                  value={jd.jobTitle || ''}
                  onChange={(e) => setJd({ ...jd, jobTitle: e.target.value })}
                  placeholder="e.g. Frontend Engineer"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-500">Job Type</label>
                <select
                  value={jd.jobType || ''}
                  onChange={(e) => setJd({ ...jd, jobType: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                >
                  <option value="" className="bg-zinc-900">Select Type</option>
                  <option value="full-time" className="bg-zinc-900">Full-time</option>
                  <option value="internship" className="bg-zinc-900">Internship</option>
                  <option value="contract" className="bg-zinc-900">Contract</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-500">Location</label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
                  <input
                    value={jd.location || ''}
                    onChange={(e) => setJd({ ...jd, location: e.target.value })}
                    placeholder="Remote, NY, etc."
                    className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-500">Work Mode</label>
                <div className="relative">
                  <Briefcase size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
                  <select
                    value={jd.workMode || ''}
                    onChange={(e) => setJd({ ...jd, workMode: e.target.value })}
                    className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  >
                    <option value="" className="bg-zinc-900">Select Mode</option>
                    <option value="remote" className="bg-zinc-900">Remote</option>
                    <option value="hybrid" className="bg-zinc-900">Hybrid</option>
                    <option value="onsite" className="bg-zinc-900">On-site</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-500">Full Job Description</label>
              <textarea
                value={jd.content}
                onChange={(e) => setJd({ ...jd, content: e.target.value })}
                placeholder="Paste the job description here..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all min-h-[200px]"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAnalyze}
            disabled={loading || !activeResume}
            className="w-full py-4 bg-white text-black rounded-2xl font-bold text-lg shadow-lg hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 size={20} className="animate-spin" />
                Analyzing...
              </div>
            ) : (
              <>
                <Sparkles size={20} />
                Run AI Match Analysis
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Right Column: Analysis Result */}
      <div className="lg:col-span-7">
        {!analysis && !loading ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-12 glass rounded-3xl border border-dashed border-white/10">
            <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center mb-6">
              <Target size={40} className="text-zinc-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Analysis Yet</h3>
            <p className="text-zinc-500 max-w-xs">Configure your JD and run the AI match to see your score and improvements.</p>
          </div>
        ) : loading ? (
          <div className="h-full flex flex-col items-center justify-center p-12 glass rounded-3xl border border-white/10">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles size={32} className="text-indigo-400 animate-pulse" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mt-8 mb-2">Processing with AI...</h3>
            <p className="text-zinc-500">Analyzing keywords and semantic alignment.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Score Header */}
            <div className="glass p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-32 h-32">
                {/* Simple SVG Radial Progress */}
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50" cy="50" r="45"
                    fill="none" stroke="currentColor"
                    strokeWidth="8" className="text-zinc-800"
                  />
                  <motion.circle
                    cx="50" cy="50" r="45"
                    fill="none" stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray="282.7"
                    initial={{ strokeDashoffset: 282.7 }}
                    animate={{ strokeDashoffset: 282.7 - (282.7 * analysis.overallScore) / 100 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    strokeLinecap="round"
                    className="text-indigo-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-black text-white">{analysis.overallScore}%</span>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-black text-white mb-2">Match Score: {analysis.overallScore}%</h2>
                <p className="text-zinc-400 leading-relaxed">
                  Your profile has a {analysis.overallScore > 80 ? 'strong' : analysis.overallScore > 60 ? 'moderate' : 'low'} alignment with the target role.
                  Check the breakdown below to see where you can improve.
                </p>
              </div>
            </div>

            {/* Breakdown Tabs */}
            <div className="glass rounded-3xl border border-white/10 overflow-hidden">
              <div className="flex overflow-x-auto border-b border-white/10 bg-white/5 p-2 gap-2">
                <TabButton
                  active={activeTab === 'strong'}
                  onClick={() => setActiveTab('strong')}
                  label="Strong Matches"
                  icon={CheckCircle2}
                />
                <TabButton
                  active={activeTab === 'missing'}
                  onClick={() => setActiveTab('missing')}
                  label="Missing Gaps"
                  icon={AlertCircle}
                />
                <TabButton
                  active={activeTab === 'keywords'}
                  onClick={() => setActiveTab('keywords')}
                  label="Keywords"
                  icon={Copy}
                />
                <TabButton
                  active={activeTab === 'improvements'}
                  onClick={() => setActiveTab('improvements')}
                  label="Improvements"
                  icon={Lightbulb}
                />
              </div>

              <div className="p-8 min-h-[300px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'strong' && (
                    <motion.div
                      key="strong"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex flex-wrap gap-3"
                    >
                      {analysis.strongSkills.map((skill) => (
                        <span key={skill} className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-sm font-bold">
                          {skill}
                        </span>
                      ))}
                    </motion.div>
                  )}
                  {activeTab === 'missing' && (
                    <motion.div
                      key="missing"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex flex-wrap gap-3"
                    >
                      {analysis.missingSkills.map((skill) => (
                        <span key={skill} className="px-4 py-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30 text-sm font-bold">
                          {skill}
                        </span>
                      ))}
                    </motion.div>
                  )}
                  {activeTab === 'keywords' && (
                    <motion.div
                      key="keywords"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex flex-wrap gap-3"
                    >
                      {analysis.keywords.map((keyword) => (
                        <span key={keyword} className="px-4 py-2 rounded-xl bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-sm font-bold cursor-pointer hover:bg-indigo-500/20 transition-colors">
                          {keyword}
                        </span>
                      ))}
                    </motion.div>
                  )}
                  {activeTab === 'improvements' && (
                    <motion.div
                      key="improvements"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-4"
                    >
                      {analysis.recommendations.map((rec, i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-zinc-300 text-sm leading-relaxed">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                            {i + 1}
                          </div>
                          {rec}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// Helper for loader
const Loader2 = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
  </svg>
);

export default AnalysisPage;
