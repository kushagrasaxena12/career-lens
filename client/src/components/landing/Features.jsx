import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Bell, Mic, ArrowUpRight } from 'lucide-react';

const FEATURES = [
  {
    title: 'AI Resume & JD Match Analysis',
    description: 'Deep semantic analysis that goes beyond keywords to understand the intent and experience requirements of any job description.',
    icon: <Target className="text-cyan-400" size={24} />,
    color: 'from-cyan-500/20 to-cyan-500/0',
  },
  {
    title: 'Auto-Parsed Candidate Profiles',
    description: 'Upload your resume and let our AI extract every skill, achievement, and experience detail into a structured professional profile.',
    icon: <Zap className="text-indigo-400" size={24} />,
    color: 'from-indigo-500/20 to-indigo-500/0',
  },
  {
    title: 'Real-Time Job Alerts',
    description: 'Get notified the moment a job is posted that matches your unique profile and skill set with a high compatibility score.',
    icon: <Bell className="text-violet-400" size={24} />,
    color: 'from-violet-500/20 to-violet-500/0',
  },
  {
    title: 'AI Mock Interviews',
    description: 'Practice with a role-specific AI interviewer and receive a detailed transcript with strengths and weaknesses analysis.',
    icon: <Mic className="text-fuchsia-400" size={24} />,
    color: 'from-fuchsia-500/20 to-fuchsia-500/0',
  },
];

const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative p-8 rounded-3xl glass border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          {feature.icon}
        </div>

        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-white">{feature.title}</h3>
          <ArrowUpRight size={18} className="text-zinc-500 group-hover:text-white transition-colors" />
        </div>

        <p className="text-zinc-400 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-3 py-1 rounded-full glass border border-white/10 text-indigo-400 text-xs font-bold tracking-wider uppercase mb-4"
        >
          Core Capabilities
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight"
        >
          Everything you need to <br />
          <span className="text-zinc-500">land your dream role.</span>
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Features;
