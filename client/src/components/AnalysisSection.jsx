import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, CheckCircle2, XCircle, Lightbulb, Sparkles } from 'lucide-react';

const AnalysisSection = ({ analysis, loading }) => {
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-12 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center"
      >
        <div className="relative w-20 h-20 mb-4">
          <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent"
          ></motion.div>
        </div>
        <motion.h3
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-lg font-semibold text-gray-800"
        >
          AI is Analyzing...
        </motion.h3>
        <p className="text-sm text-gray-500 mt-2">Matching your resume with the job description</p>
      </motion.div>
    );
  }

  if (!analysis) {
    return (
      <div className="bg-white p-12 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
        <BrainCircuit className="text-gray-300 mb-4" size={48} />
        <h3 className="text-lg font-semibold text-gray-800">No Analysis Yet</h3>
        <p className="text-sm text-gray-500 mt-2">Enter a job description and click analyze to see the results.</p>
      </div>
    );
  }

  const { overallScore, strongSkills, missingSkills, keywords, recommendations } = analysis;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Score Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between"
      >
        <div>
          <h2 className="text-xl font-bold text-gray-800">AI Analysis Result</h2>
          <p className="text-sm text-gray-500">Based on your active resume and provided JD</p>
        </div>
        <div className="relative flex items-center justify-center">
          <svg className="w-24 h-24">
            <circle
              className="text-gray-200"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="48"
              cy="48"
            />
            <motion.circle
              initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - overallScore / 100) }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-indigo-600"
              strokeWidth="8"
              strokeDasharray={2 * Math.PI * 40}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="48"
              cy="48"
            />
          </svg>
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute text-2xl font-bold text-indigo-700"
          >
            {overallScore}%
          </motion.span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strong Skills */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4 text-emerald-600">
            <CheckCircle2 size={20} />
            <h3 className="font-bold">Strong Match Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {strongSkills.map((skill, i) => (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + (i * 0.05) }}
                key={i}
                className="px-3 py-1 bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Missing Skills */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4 text-rose-600">
            <XCircle size={20} />
            <h3 className="font-bold">Missing Critical Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill, i) => (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + (i * 0.05) }}
                key={i}
                className="px-3 py-1 bg-rose-100 text-rose-700 border border-rose-200 rounded-full text-xs font-bold"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Keywords to Add */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4 text-sky-600">
            <Sparkles size={20} />
            <h3 className="font-bold">Suggested Keywords</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {keywords.map((kw, i) => (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + (i * 0.05) }}
                key={i}
                className="px-3 py-1 bg-sky-100 text-sky-700 border border-sky-200 rounded-full text-xs font-bold italic"
              >
                "{kw}"
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4 text-orange-600">
            <Lightbulb size={20} />
            <h3 className="font-bold">AI Recommendations</h3>
          </div>
          <ul className="space-y-2">
            {recommendations.map((rec, i) => (
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                key={i}
                className="text-sm text-gray-600 flex gap-2"
              >
                <span className="text-orange-500">•</span>
                {rec}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnalysisSection;
