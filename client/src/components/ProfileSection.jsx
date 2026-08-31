import React, { useState } from 'react';
import { User, Save, Mail, GraduationCap, Award, Briefcase } from 'lucide-react';

const ProfileSection = ({ profile, onSave }) => {
  const [formData, setFormData] = useState(profile || {
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    degree: '',
    experience: '',
    skills: '',
    achievements: '',
    positions: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg shadow-sm">
          <User size={20} />
        </div>
        <h2 className="text-lg font-bold text-slate-800">Candidate Profile</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">First Name</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
            placeholder="John"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Last Name</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
            placeholder="Doe"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-slate-400" size={16} />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
              placeholder="john@example.com"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Degree</label>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-3 text-slate-400" size={16} />
            <input
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
              placeholder="B.Tech Computer Science"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Experience (Years)</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-3 text-slate-400" size={16} />
            <input
              name="experience"
              type="number"
              value={formData.experience}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
              placeholder="2"
            />
          </div>
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Skills (Comma separated)</label>
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            rows="2"
            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
            placeholder="React, Node.js, Python, AWS..."
          />
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Achievements</label>
          <div className="relative">
            <Award className="absolute left-3 top-3 text-slate-400" size={16} />
            <textarea
              name="achievements"
              value={formData.achievements}
              onChange={handleChange}
              rows="2"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
              placeholder="Winner of X Hackathon, Top 1% in Y..."
            />
          </div>
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Positions of Responsibility</label>
          <textarea
            name="positions"
            value={formData.positions}
            onChange={handleChange}
            rows="2"
            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
            placeholder="Club President, Team Lead..."
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => onSave(formData)}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-semibold shadow-md shadow-indigo-200 active:scale-95"
        >
          <Save size={18} />
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;
