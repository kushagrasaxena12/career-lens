import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  User,
  TrendingUp,
  Target,
  Clock
} from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="glass p-6 rounded-3xl border border-white/10 flex items-center gap-4">
    <div className={`p-3 rounded-2xl ${color} bg-opacity-20 text-white shadow-inner`}>
      <Icon size={24} className="text-white" />
    </div>
    <div>
      <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-black text-white">{value}</p>
    </div>
  </div>
);

const DashboardPage = ({ user }) => {
  const { profile, resumes, analyses = [] } = useApp();
  const activeResume = resumes.find(r => r.isActive);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2 flex items-center gap-3">
            <span className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <LayoutDashboard size={32} />
            </span>
            Welcome back, {profile.firstName}!
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Your career trajectory is looking sharp. Here's a snapshot of your AI-powered insights.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/analyze"
            className="px-6 py-3 bg-white text-black rounded-2xl font-bold text-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Sparkles size={18} />
            Run New Analysis
          </Link>
        </div>
      </div>

      {/* Quick Stats Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Resume Score"
          value="84%"
          icon={Target}
          color="bg-cyan-500"
        />
        <StatCard
          label="JDs Analyzed"
          value={analyses.length || 12}
          icon={FileText}
          color="bg-indigo-500"
        />
        <StatCard
          label="Profile Completeness"
          value="92%"
          icon={User}
          color="bg-violet-500"
        />
        <StatCard
          label="Match Trend"
          value="+12%"
          icon={TrendingUp}
          color="bg-emerald-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Analyses Widget */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock size={20} className="text-zinc-500" />
              Recent Analyses
            </h3>
            <Link to="/analyze" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
              View all history →
            </Link>
          </div>

          <div className="space-y-4">
            {(analyses.length > 0 ? analyses : [
              { id: 1, jobTitle: 'Frontend Engineer', company: 'Google', score: 84, date: '2 days ago' },
              { id: 2, jobTitle: 'Product Designer', company: 'Airbnb', score: 72, date: '1 week ago' },
              { id: 3, jobTitle: 'Fullstack Developer', company: 'Meta', score: 91, date: '2 weeks ago' },
            ]).map((analysis, index) => (
              <motion.div
                key={analysis.id}
                whileHover={{ x: 10 }}
                className="glass p-5 rounded-2xl border border-white/10 flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-white font-bold group-hover:bg-indigo-500/20 transition-colors">
                    {analysis.company[0]}
                  </div>
                  <div>
                    <p className="text-white font-bold">{analysis.jobTitle}</p>
                    <p className="text-zinc-500 text-sm">{analysis.company} • {analysis.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-tighter">Match Score</p>
                    <p className={`text-xl font-black ${analysis.score > 80 ? 'text-emerald-400' : 'text-yellow-400'}`}>
                      {analysis.score}%
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                    <Sparkles size={18} className="text-zinc-400 group-hover:text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column - Profile Summary & Active Resume */}
        <div className="space-y-6">
          <div className="glass p-6 rounded-3xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <User size={20} className="text-zinc-500" />
              Quick Profile
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-zinc-500 text-xs font-medium">Experience</span>
                <span className="text-white text-sm font-bold">{profile.experience} Years</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-zinc-500 text-xs font-medium">Education</span>
                <span className="text-white text-sm font-bold truncate ml-2">{profile.degree}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-zinc-500 text-xs font-medium">Status</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">Active</span>
              </div>
            </div>
            <Link
              to="/profile"
              className="block w-full mt-6 text-center py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-300 text-sm font-bold hover:bg-white/10 transition-all"
            >
              Edit Profile
            </Link>
          </div>

          <div className="glass p-6 rounded-3xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <FileText size={20} className="text-zinc-500" />
              Active Resume
            </h3>
            {activeResume ? (
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/20 blur-2xl rounded-full" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="p-3 bg-indigo-500 rounded-xl text-white shadow-lg shadow-indigo-500/40">
                    <FileText size={20} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-bold text-white truncate">{activeResume.name}</p>
                    <p className="text-xs text-zinc-500">Last updated {activeResume.date}</p>
                  </div>
                </div>
                <Link
                  to="/resumes"
                  className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Sparkles size={14} />
                </Link>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-zinc-800/50 border border-dashed border-zinc-700 text-center">
                <p className="text-zinc-500 text-sm mb-3">No active resume found</p>
                <Link to="/resumes" className="text-indigo-400 text-xs font-bold hover:underline">Upload Now →</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
