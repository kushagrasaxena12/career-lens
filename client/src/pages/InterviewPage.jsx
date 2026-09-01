import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Video, MessageSquare, TrendingUp, BarChart3, ArrowRight, CheckCircle2 } from 'lucide-react';

const InterviewPage = () => {
  const [stage, setStage] = useState('setup'); // setup, interviewing, result
  const [selectedRole, setSelectedRole] = useState('');

  const roles = [
    { id: 'frontend', name: 'Frontend Engineer', tech: 'React, Next.js, Tailwind' },
    { id: 'backend', name: 'Backend Developer', tech: 'Node.js, Python, PostgreSQL' },
    { id: 'fullstack', name: 'Fullstack Engineer', tech: 'MERN Stack, AWS, Docker' },
    { id: 'product', name: 'Product Manager', tech: 'Agile, Jira, Product Analytics' },
  ];

  const startInterview = () => {
    if (!selectedRole) return;
    setStage('interviewing');
  };

  const endInterview = () => {
    setStage('result');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto"
    >
      <AnimatePresence mode="wait">
        {stage === 'setup' && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-3xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-8 border border-indigo-500/30">
              <Mic size={40} />
            </div>
            <h1 className="text-4xl font-black text-white mb-4 tracking-tight">AI Mock Interview</h1>
            <p className="text-zinc-400 mb-12 max-w-lg mx-auto">
              Prepare for your real interview with our AI interviewer. Get real-time feedback and a detailed performance report.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
              {roles.map(role => (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all text-left ${
                    selectedRole === role.id
                      ? 'bg-white text-black border-white shadow-xl shadow-white/10 scale-105'
                      : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                  }`}
                >
                  <h3 className="font-bold mb-1">{role.name}</h3>
                  <p className={`text-xs ${selectedRole === role.id ? 'text-black/60' : 'text-zinc-500'}`}>{role.tech}</p>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startInterview}
              disabled={!selectedRole}
              className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg flex items-center gap-2 mx-auto disabled:opacity-50 transition-all"
            >
              Start Interview <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        )}

        {stage === 'interviewing' && (
          <motion.div
            key="interviewing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[70vh]"
          >
            {/* AI Interviewer View */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="relative aspect-video glass rounded-3xl border border-white/20 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                {/* AI Avatar Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-indigo-500/20 blur-2xl animate-pulse" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-2xl shadow-2xl">
                        AI
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                  <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-sm font-medium">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    AI Interviewer: Active
                  </div>
                  <div className="flex gap-2">
                    <button className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-colors">
                      <Mic size={20} />
                    </button>
                    <button className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-colors">
                      <Video size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Waveform Visualization */}
              <div className="h-24 glass rounded-3xl border border-white/10 flex items-center justify-center gap-1 px-8">
                {[...Array(40)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [10, Math.random() * 40 + 10, 10] }}
                    transition={{ repeat: Infinity, duration: 0.5 + Math.random(), ease: "easeInOut" }}
                    className="w-1 bg-indigo-500 rounded-full"
                  />
                ))}
              </div>
            </div>

            {/* Response Box */}
            <div className="flex flex-col gap-6">
              <div className="flex-1 glass rounded-3xl border border-white/10 p-6 flex flex-col">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <MessageSquare size={20} className="text-indigo-400" />
                  Interview Transcript
                </h3>
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">AI Interviewer</span>
                    <p className="text-sm text-zinc-300 bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/10">
                      Tell me about a time you had to handle a complex technical challenge. How did you approach it?
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">You</span>
                    <p className="text-sm text-white bg-indigo-600 p-3 rounded-2xl rounded-tr-none shadow-lg">
                      I recently optimized a data-fetching layer that reduced latency by 40%...
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <input
                    placeholder="Type your answer..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all pr-12"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-colors">
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              <button
                onClick={endInterview}
                className="py-4 bg-rose-500 text-white rounded-2xl font-bold hover:bg-rose-600 transition-all flex items-center justify-center gap-2"
              >
                End Interview & Get Report
              </button>
            </div>
          </motion.div>
        )}

        {stage === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl font-black text-white mb-4 tracking-tight">Interview Analysis</h1>
              <p className="text-zinc-400">Here is the breakdown of your performance across key metrics.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Score Card */}
              <div className="glass p-8 rounded-3xl border border-white/10 flex flex-col items-center justify-center text-center">
                <div className="relative w-32 h-32 mb-6">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-zinc-800" />
                    <motion.circle
                      cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8"
                      strokeDasharray="282.7"
                      initial={{ strokeDashoffset: 282.7 }}
                      animate={{ strokeDashoffset: 282.7 - (282.7 * 78) / 100 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      strokeLinecap="round"
                      className="text-emerald-400"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-black text-white">78%</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Overall Performance</h3>
                <p className="text-zinc-500 text-sm">You demonstrated strong technical depth, but could improve in structured storytelling.</p>
              </div>

              {/* Metrics Radar/Chart Placeholder */}
              <div className="lg:col-span-2 glass p-8 rounded-3xl border border-white/10">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <BarChart3 size={20} className="text-indigo-400" />
                  Competency Breakdown
                </h3>
                <div className="space-y-6">
                  {[
                    { label: 'Technical Depth', score: 90, color: 'bg-cyan-500' },
                    { label: 'Communication', score: 65, color: 'bg-indigo-500' },
                    { label: 'Problem Solving', score: 82, color: 'bg-violet-500' },
                    { label: 'Cultural Fit', score: 70, color: 'bg-fuchsia-500' },
                  ].map(metric => (
                    <div key={metric.label} className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-zinc-300">{metric.label}</span>
                        <span className="text-white">{metric.score}%</span>
                      </div>
                      <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.score}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className={`h-full ${metric.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Transcript analysis */}
            <div className="glass p-8 rounded-3xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp size={20} className="text-indigo-400" />
                Key Takeaways & Feedback
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-4">
                  <h4 className="text-emerald-400 font-bold flex items-center gap-2">
                    <CheckCircle2 size={18} />
                    Strengths
                  </h4>
                  <ul className="text-sm text-zinc-300 space-y-2">
                    <li>• Detailed explanation of React reconciliation.</li>
                    <li>• Clear understanding of system design patterns.</li>
                    <li>• Confident delivery of technical answers.</li>
                  </ul>
                </div>
                <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-4">
                  <h4 className="text-rose-400 font-bold flex items-center gap-2">
                    <AlertCircle size={18} />
                    Areas for Growth
                  </h4>
                  <ul className="text-sm text-zinc-300 space-y-2">
                    <li>• Use the STAR method for behavioral questions.</li>
                    <li>• Avoid over-explaining simple concepts.</li>
                    <li>• Better alignment between technical solution and business value.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setStage('setup')}
                className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition-all"
              >
                Try Another Session
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Helper for alert circle since it's used in results
const AlertCircle = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export default InterviewPage;
