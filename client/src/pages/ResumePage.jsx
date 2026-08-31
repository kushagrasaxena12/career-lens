import React from 'react';
import { motion } from 'framer-motion';
import ResumeSection from '../components/ResumeSection';
import { useApp } from '../context/AppContext';
import Layout from '../components/layout/Layout';

const ResumePage = ({ user, onLogout }) => {
  const { resumes, setResumes } = useApp();

  const handleUpload = (file) => {
    const newResume = {
      id: Date.now(),
      name: file.name,
      date: new Date().toISOString().split('T')[0],
      isActive: resumes.length === 0,
    };
    setResumes([...resumes, newResume]);
  };

  const handleSetActive = (id) => {
    setResumes(resumes.map(r => ({ ...r, isActive: r.id === id })));
  };

  const handleDeleteResume = (id) => {
    const updated = resumes.filter(r => r.id !== id);
    if (updated.length > 0 && !updated.some(r => r.isActive)) {
      updated[0].isActive = true;
    }
    setResumes(updated);
  };

  return (
    <Layout user={user} onLogout={onLogout}>
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="p-2 bg-indigo-500/20 text-indigo-300 rounded-lg border border-indigo-500/30">📄</span>
            Resume Management
          </h1>
          <ResumeSection
            resumes={resumes}
            onUpload={handleUpload}
            onSetActive={handleSetActive}
            onDelete={handleDeleteResume}
          />
        </motion.div>
      </div>
    </Layout>
  );
};

export default ResumePage;
