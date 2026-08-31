import React, { useState } from 'react';
import { FileText, Upload, Trash2, CheckCircle } from 'lucide-react';

const ResumeSection = ({ resumes, onUpload, onSetActive, onDelete }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (resumes.length >= 3) {
      alert("You can upload a maximum of 3 resumes.");
      return;
    }

    setUploading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onUpload(file);
    setUploading(false);
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-lg shadow-sm">
          <FileText size={20} />
        </div>
        <h2 className="text-lg font-bold text-slate-800">Your Resumes</h2>
      </div>

      <div className="mb-6">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer bg-slate-50/50 hover:bg-indigo-50/50 hover:border-indigo-300 transition-all group">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="p-2 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300 mb-2">
              <Upload className="text-slate-400 group-hover:text-indigo-600" size={24} />
            </div>
            <p className="text-sm text-slate-500">
              <span className="font-semibold text-slate-700">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-slate-400 mt-1">PDF, DOCX (Max 5MB)</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            disabled={uploading || resumes.length >= 3}
          />
        </label>
        {uploading && <p className="text-center text-xs text-indigo-600 mt-2 animate-pulse font-medium">Uploading resume...</p>}
        {resumes.length >= 3 && <p className="text-center text-xs text-red-500 mt-2 font-medium">Maximum limit of 3 resumes reached.</p>}
      </div>

      <div className="space-y-3">
        {resumes.length === 0 ? (
          <p className="text-center text-sm text-slate-500 py-4">No resumes uploaded yet.</p>
        ) : (
          resumes.map((resume, index) => (
            <div
              key={resume.id}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                resume.isActive ? 'border-indigo-500 bg-indigo-50/50 ring-1 ring-indigo-500/20' : 'border-slate-200 bg-white hover:border-indigo-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg transition-colors ${resume.isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  <FileText size={18} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold text-slate-800 truncate max-w-[150px]">{resume.name}</p>
                  <p className="text-xs text-slate-500">{resume.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!resume.isActive && (
                  <button
                    onClick={() => onSetActive(resume.id)}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    Set Active
                  </button>
                )}
                {resume.isActive && (
                  <div className="flex items-center gap-1 text-xs font-bold text-indigo-600 px-2 py-1 bg-indigo-100 rounded-lg">
                    <CheckCircle size={14} />
                    <span>Active</span>
                  </div>
                )}
                <button
                  onClick={() => onDelete(resume.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Resume"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ResumeSection;
