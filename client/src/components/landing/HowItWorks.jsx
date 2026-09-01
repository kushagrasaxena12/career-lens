import React from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Sparkles } from 'lucide-react';

const STEPS = [
  {
    title: 'Upload Resume',
    description: 'Drag and drop your current resume. Our AI parses your experience and skills instantly.',
    icon: <Upload size={24} />,
  },
  {
    title: 'Paste Job Description',
    description: 'Paste the JD for the role you want. We analyze the specific requirements and keywords.',
    icon: <FileText size={24} />,
  },
  {
    title: 'Get AI Feedback',
    description: 'Receive a comprehensive match score and a roadmap of exactly how to improve your resume.',
    icon: <Sparkles size={24} />,
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-3 py-1 rounded-full glass border border-white/10 text-indigo-400 text-xs font-bold tracking-wider uppercase mb-4"
        >
          The Process
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight"
        >
          Three steps to a <br />
          <span className="text-zinc-500">perfect application.</span>
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-3 gap-12 relative">
        {/* Connector Line */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-800 -translate-y-1/2 z-0" />

        {STEPS.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="relative z-10 flex flex-col items-center text-center group"
          >
            <div className="w-16 h-16 rounded-full glass border border-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 bg-zinc-900 text-indigo-400">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
            <p className="text-zinc-400 leading-relaxed max-w-xs">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
