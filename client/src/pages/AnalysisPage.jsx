import React from 'react';
import { motion } from 'framer-motion';
import JDSection from '../components/JDSection';
import AnalysisSection from '../components/AnalysisSection';
import { Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Layout from '../components/layout/Layout';

const AnalysisPage = ({ user, onLogout }) => {
  const { jd, setJd, analysis, loading, handleAnalyze } = useApp();

  return (
    <Layout user={user} onLogout={onLogout}>
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          <div className="lg:col-span-5 space-y-8">
            <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="p-2 bg-indigo-500/20 text-indigo-300 rounded-lg border border-indigo-500/30">✨</span>
              AI Analysis
            </h1>
            <JDSection jd={jd} onUpdate={setJd} />

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(79, 70, 229, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles size={24} />
              {loading ? 'Analyzing...' : 'Run AI Analysis'}
            </motion.button>
          </div>

          <div className="lg:col-span-7">
            <AnalysisSection analysis={analysis} loading={loading} />
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AnalysisPage;
