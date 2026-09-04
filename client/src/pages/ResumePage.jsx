import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { FileText, Upload, Trash2, CheckCircle2, Loader2, FileUp } from 'lucide-react';

const ResumePage = ({ user }) => {
  const { resumes, setResumes } = useApp();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    if (resumes.length >= 3) {
      alert('Maximum of 3 resumes allowed. Please delete one first.');
      return;
    }
  
    setIsUploading(true);

    setUploadProgress(10);
  
    try {
      const formData = new FormData();
      formData.append('resume', file);
  
      setUploadProgress(30);
  
      const response = await fetch('/api/resumes/upload', {
        method: 'POST',
        headers: {
          'x-user-id': '1'
        },
        body: formData
      });
  
      setUploadProgress(70);
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload resume');
      }
  
      const data = await response.json();
  
      setUploadProgress(100);
  
      const resume = data.resume;
  
      const newResume = {
        id: resume.id,
        name: resume.fileName,
        date: new Date(resume.createdAt || Date.now()).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        isActive: resume.isActive,
        fileUrl: resume.fileUrl,
        extractedText: resume.extractedText
      };
  
      setResumes(prev => [...prev, newResume]);
    } catch (error) {
      console.error('Resume upload failed:', error);
      alert(error.message || 'Failed to upload resume');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      e.target.value = '';
    }
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <span className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <FileText size={24} />
            </span>
            Resume Vault
          </h1>
          <p className="text-zinc-400 mt-1">Upload up to 3 versions of your resume. Select one as your active profile.</p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative glass p-12 rounded-3xl border border-white/10 text-center">
          <input
            type="file"
            id="resume-upload"
            className="hidden"
            accept=".pdf,.docx"
            onChange={handleUpload}
            disabled={isUploading}
          />
          <label
            htmlFor="resume-upload"
            className={`cursor-pointer flex flex-col items-center justify-center gap-4 transition-all ${isUploading ? 'cursor-not-allowed' : 'hover:scale-105'}`}
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${isUploading ? 'bg-indigo-500/20' : 'bg-white/5 border border-white/10 hover:border-indigo-500/50'}`}>
              {isUploading ? (
                <Loader2 size={32} className="text-indigo-400 animate-spin" />
              ) : (
                <FileUp size={32} className="text-zinc-400 group-hover:text-indigo-400 transition-colors" />
              )}
            </div>
            <div>
              <p className="text-xl font-bold text-white mb-2">
                {isUploading ? 'AI Parsing Your Resume...' : 'Upload Your Resume'}
              </p>
              <p className="text-zinc-500 text-sm">
                {isUploading ? `Processing details... ${uploadProgress}%` : 'Drag and drop your PDF or DOCX file here'}
              </p>
            </div>
          </label>

          {/* Progress Bar */}
          <AnimatePresence>
            {isUploading && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800 rounded-b-3xl overflow-hidden"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-indigo-600"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Resumes List */}
      <div className="grid grid-cols-1 gap-4">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          Your Resumes
          <span className="text-xs font-medium text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">
            {resumes.length}/3
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {resumes.length === 0 ? (
              <div className="col-span-full p-12 text-center glass rounded-3xl border border-dashed border-white/10">
                <p className="text-zinc-500">No resumes uploaded yet. Start by uploading your first one!</p>
              </div>
            ) : (
              resumes.map((resume) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`glass p-6 rounded-3xl border transition-all duration-300 flex items-center justify-between ${
                    resume.isActive ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${resume.isActive ? 'bg-indigo-500 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                      <FileText size={20} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-white font-bold truncate">{resume.name}</p>
                      <p className="text-zinc-500 text-xs">{resume.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleSetActive(resume.id)}
                      className={`p-2 rounded-lg transition-all ${
                        resume.isActive
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                      }`}
                      title={resume.isActive ? "Active Resume" : "Set as Active"}
                    >
                      <CheckCircle2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteResume(resume.id)}
                      className="p-2 rounded-lg bg-white/5 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );

};

export default ResumePage;
