import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { User, GraduationCap, Briefcase, Award, Save, CheckCircle2 } from 'lucide-react';

const InputField = ({ label, value, onChange, placeholder, type = "text", icon: Icon }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{label}</label>
    <div className="relative group">
      {Icon && <Icon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" />}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full ${Icon ? 'pl-10' : 'px-4'} py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-600 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all`}
      />
    </div>
  </div>
);

const ProfilePage = ({ user }) => {
  const { profile, setProfile } = useApp();
  const [formData, setFormData] = useState(profile);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setProfile(formData);
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAddSkill = (skill) => {
    if (!skill.trim()) return;
    if (formData.skills.includes(skill)) return;
    setFormData({ ...formData, skills: [...formData.skills, skill] });
  };

  const removeSkill = (skillToRemove) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skillToRemove) });
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
              <User size={24} />
            </span>
            Candidate Profile
          </h1>
          <p className="text-zinc-400 mt-1">Keep your professional details up to date for better AI matching.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          disabled={isSaving}
          className={`px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg ${
            saved
              ? 'bg-emerald-500 text-white'
              : 'bg-white text-black hover:bg-zinc-200'
          }`}
        >
          {isSaving ? (
            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
          ) : saved ? (
            <CheckCircle2 size={18} />
          ) : (
            <Save size={18} />
          )}
          {isSaving ? 'Saving...' : saved ? 'Saved!' : 'Save Profile'}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Information */}
        <div className="glass p-8 rounded-3xl border border-white/10 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
            <User size={20} className="text-indigo-400" />
            Personal Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="First Name"
              value={formData.firstName}
              onChange={(val) => setFormData({ ...formData, firstName: val })}
              placeholder="John"
            />
            <InputField
              label="Last Name"
              value={formData.lastName}
              onChange={(val) => setFormData({ ...formData, lastName: val })}
              placeholder="Doe"
            />
          </div>
          <InputField
            label="Email Address"
            value={formData.email}
            onChange={(val) => setFormData({ ...formData, email: val })}
            placeholder="john@example.com"
            icon={Mail}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Gender"
              value={formData.gender}
              onChange={(val) => setFormData({ ...formData, gender: val })}
              placeholder="Male/Female/Other"
            />
            <InputField
              label="Degree"
              value={formData.degree}
              onChange={(val) => setFormData({ ...formData, degree: val })}
              placeholder="B.Tech CS"
              icon={GraduationCap}
            />
          </div>
        </div>

        {/* Professional Details */}
        <div className="glass p-8 rounded-3xl border border-white/10 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
            <Briefcase size={20} className="text-indigo-400" />
            Professional Details
          </h3>
          <InputField
            label="Total Experience (Years)"
            value={formData.experience}
            onChange={(val) => setFormData({ ...formData, experience: val })}
            placeholder="e.g. 3"
            type="number"
          />

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Skills</label>
            <div className="flex flex-wrap gap-2 p-3 bg-white/5 border border-white/10 rounded-xl min-h-[100px]">
              {formData.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-lg border border-indigo-500/30 flex items-center gap-2 group"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="text-indigo-500 hover:text-rose-400 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
                placeholder="Add skill & press Enter..."
                className="flex-1 min-w-[120px] bg-transparent text-sm text-white outline-none placeholder-zinc-600"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Key Achievements</label>
            <textarea
              value={formData.achievements}
              onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
              placeholder="Describe your biggest wins..."
              className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-600 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all min-h-[100px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Positions of Responsibility</label>
            <textarea
              value={formData.responsibility}
              onChange={(e) => setFormData({ ...formData, responsibility: e.target.value })}
              placeholder="Leadership roles, clubs, etc..."
              className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-600 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all min-h-[100px]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Helper icon for Email
const Mail = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7-9.03-5.7" />
  </svg>
);

export default ProfilePage;
