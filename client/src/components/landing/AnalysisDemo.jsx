import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const AIWave = () => (
  <div className="flex items-center gap-0.5 h-4">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        animate={{ height: [4, 12, 8, 16, 4] }}
        transition={{
          repeat: Infinity,
          duration: 0.6,
          delay: i * 0.1,
          ease: "easeInOut",
        }}
        className="w-0.5 bg-cyan-400 rounded-full"
      />
    ))}
  </div>
);

const Badge = ({ type, text }) => {
  const styles = {
    match: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    missing: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  };
  return (
    <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-tighter ${styles[type]}`}>
      {text}
    </span>
  );
};

const AnalysisDemo = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { label: 'Analyzing Resume...', type: 'match', text: '[MATCH]' },
    { label: 'Comparing with JD...', type: 'missing', text: '[MISSING KEYWORD]' },
    { label: 'Optimizing Profile...', type: 'match', text: '[MATCH]' },
    { label: 'Finalizing Score...', type: 'match', text: '[MATCH]' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto p-8 glass rounded-[40px] border border-white/20 shadow-2xl overflow-hidden">
      {/* Top Label */}
      <div className="absolute top-6 left-8 flex items-center gap-3 z-20">
        <div className="p-1.5 bg-white/10 rounded-lg border border-white/10">
          <AIWave />
        </div>
        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Live Analysis Demo</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative mt-8">
        {/* Left: Resume Document */}
        <div className="relative z-10">
          <div className="w-64 h-80 glass rounded-xl border border-white/20 p-6 shadow-xl rotate-[-2deg] relative">
            <div className="space-y-3">
              <div className="h-4 w-1/2 bg-white/20 rounded-full" />
              <div className="h-2 w-full bg-white/10 rounded-full" />
              <div className="h-2 w-full bg-white/10 rounded-full" />
              <div className="h-2 w-3/4 bg-white/10 rounded-full" />
              <div className="pt-4 space-y-2">
                <div className="h-2 w-full bg-white/10 rounded-full" />
                <div className="h-2 w-full bg-white/10 rounded-full" />
                <div className="h-2 w-5/6 bg-white/10 rounded-full" />
              </div>
            </div>
            {/* Floating Badges */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute -right-8 top-20 space-y-2"
              >
                <Badge type={steps[step].type} text={steps[step].text} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Job Description */}
        <div className="relative z-10">
          <div className="glass rounded-2xl border border-white/20 p-6 shadow-xl rotate-[2deg]">
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-3 flex items-center gap-2">
              <Sparkles size={14} className="text-cyan-400" />
              Job Description
            </h4>
            <div className="space-y-2">
              <div className="text-xs font-bold text-cyan-400 mb-1">Software Engineer (Remote)</div>
              <div className="text-[10px] text-zinc-400 leading-relaxed">
                Seeking a proficient React developer with experience in Next.js and Tailwind CSS.
                Must have a strong understanding of system design and cloud infrastructure.
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full mt-4 overflow-hidden">
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="h-full w-1/3 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Animated Flow Lines (Center) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 800 400">
            <motion.path
              d="M 300 200 Q 400 150 500 200"
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray="10,10"
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <motion.path
              d="M 300 220 Q 400 270 500 220"
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray="10,10"
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#818CF8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDemo;
