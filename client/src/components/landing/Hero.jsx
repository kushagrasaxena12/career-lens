import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AnalysisDemo from './AnalysisDemo';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl md:text-7xl font-black text-white leading-tight mb-8 tracking-tighter uppercase">
            AI-Powered Resume Analysis <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400">
              for the Digital Age
            </span>
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Link
              to="/auth?mode=signup"
              className="group relative px-8 py-4 bg-white text-black rounded-full font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <span>Get Started Free</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-3 text-zinc-500 text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              Live Demo Available
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full"
        >
          <AnalysisDemo />
          {/* Subtle Glow behind the demo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-500/10 blur-[100px] rounded-full -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
