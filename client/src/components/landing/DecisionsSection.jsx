import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const DecisionItem = ({ label, value }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex items-center gap-3 py-2 group"
  >
    <div className="text-zinc-600 group-hover:text-cyan-400 transition-colors">
      <CheckCircle2 size={16} />
    </div>
    <span className="text-sm text-zinc-400">{label}:</span>
    <div className="flex items-center gap-1">
      {value.split(' ').map((part, i) => (
        <span
          key={i}
          className={`text-xs font-mono px-1.5 py-0.5 rounded border border-white/10 ${
            part.includes('+') ? 'text-zinc-500' : 'bg-white/5 text-cyan-400'
          }`}
        >
          {part}
        </span>
      ))}
    </div>
  </motion.div>
);

const DecisionsSection = () => {
  const decisions = [
    { label: 'Candidate name', value: 'firstName + lastName' },
    { label: 'Multiple resumes', value: 'maximum 3' },
    { label: 'Active resume', value: 'exactly one active resume' },
    { label: 'JD', value: 'stored with each analysis' },
    { label: 'Same resume', value: 'unlimited different JDs' },
    { label: 'Analysis history', value: 'preserved' },
  ];

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em] mb-4">Architectural Decisions</h2>
        <div className="h-1 w-12 bg-cyan-500 mx-auto rounded-full" />
      </div>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
        {decisions.map((d, i) => (
          <DecisionItem key={i} label={d.label} value={d.value} />
        ))}
      </div>
    </section>
  );
};

export default DecisionsSection;
