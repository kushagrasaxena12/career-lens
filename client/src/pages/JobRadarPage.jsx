import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Search, Filter, MapPin, Briefcase, ExternalLink, Sparkles } from 'lucide-react';

const JOB_MOCKS = [
  { id: 1, title: 'Frontend Engineer', company: 'Google', location: 'Mountain View, CA', mode: 'Hybrid', match: 92, source: 'LinkedIn', logo: 'G' },
  { id: 2, title: 'React Developer', company: 'Meta', location: 'Menlo Park, CA', mode: 'Remote', match: 88, source: 'Naukri', logo: 'M' },
  { id: 3, title: 'Software Engineer II', company: 'Amazon', location: 'Seattle, WA', mode: 'On-site', match: 76, source: 'LinkedIn', logo: 'A' },
  { id: 4, title: 'UI Engineer', company: 'Airbnb', location: 'San Francisco, CA', mode: 'Remote', match: 81, source: 'LinkedIn', logo: 'A' },
  { id: 5, title: 'Fullstack Dev', company: 'Netflix', location: 'Los Gatos, CA', mode: 'Hybrid', match: 65, source: 'Naukri', logo: 'N' },
  { id: 6, title: 'Frontend Lead', company: 'Stripe', location: 'Remote', mode: 'Remote', match: 89, source: 'LinkedIn', logo: 'S' },
];

const JobCard = ({ job }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="glass p-6 rounded-3xl border border-white/10 group hover:border-indigo-500/50 transition-all"
  >
    <div className="flex justify-between items-start mb-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-white font-black text-xl group-hover:bg-indigo-500 transition-colors">
          {job.logo}
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{job.title}</h3>
          <p className="text-zinc-400 text-sm">{job.company}</p>
        </div>
      </div>
      <div className="text-right">
        <div className={`text-xl font-black ${job.match > 85 ? 'text-emerald-400' : 'text-indigo-400'}`}>
          {job.match}%
        </div>
        <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-tighter">Match</p>
      </div>
    </div>

    <div className="flex flex-wrap gap-2 mb-6">
      <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 text-zinc-400 text-xs border border-white/10">
        <MapPin size={12} />
        {job.location}
      </div>
      <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 text-zinc-400 text-xs border border-white/10">
        <Briefcase size={12} />
        {job.mode}
      </div>
      <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 text-zinc-400 text-xs border border-white/10">
        {job.source}
      </div>
    </div>

    <div className="flex gap-3">
      <button className="flex-1 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-all flex items-center justify-center gap-2">
        Apply Now
        <ExternalLink size={14} />
      </button>
      <button className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500 hover:text-white transition-all">
        <Sparkles size={16} />
      </button>
    </div>
  </motion.div>
);

const JobRadarPage = () => {
  const [filter, setFilter] = useState('All');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const modes = ['All', 'Remote', 'Hybrid', 'On-site'];

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        if (import.meta.env.VITE_USE_MOCK_JOBS === 'true') {
          setJobs(JOB_MOCKS);
        } else {
          // TODO: Implement real API call to /api/jobs
          // const response = await fetch('/api/jobs');
          // const data = await response.json();
          // setJobs(data);
          setJobs([]); // Default to empty for now
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = filter === 'All'
    ? jobs
    : jobs.filter(job => job.mode === filter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <span className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <Globe size={24} />
            </span>
            Job Radar
          </h1>
          <p className="text-zinc-400 mt-1">Aggregated opportunities matched to your professional profile.</p>
        </div>

        <div className="flex items-center gap-3 p-1.5 bg-white/5 rounded-2xl border border-white/10">
          {modes.map(mode => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === mode
                  ? 'bg-white text-black'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center text-center glass rounded-3xl border border-white/10">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin mb-4" />
          <p className="text-zinc-400">Scanning the job market...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length === 0 ? (
            <div className="col-span-full p-12 text-center glass rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-2 text-indigo-400 animate-pulse">
                <Sparkles size={32} />
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">Integrating Soon</h3>
              <p className="text-zinc-500 max-w-xs mx-auto">We're currently building the job aggregation engine to bring you the best matched opportunities.</p>
            </div>
          ) : (
            filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))
          )}
        </div>
      )}
    </motion.div>
  );
};

// Mock Globe icon since it was missing in some imports
const Globe = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default JobRadarPage;
