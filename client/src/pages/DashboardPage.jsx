import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { User, FileText, Sparkles, LayoutDashboard } from 'lucide-react';
import Layout from '../components/layout/Layout';

const DashboardPage = ({ user, onLogout }) => {
  const { profile, resumes } = useApp();
  const activeResume = resumes.find(r => r.isActive);

  const cards = [
    {
      title: 'Profile',
      description: 'Manage your personal information and professional details.',
      icon: <User size={32} />,
      link: '/profile',
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Resumes',
      description: 'Upload and manage multiple versions of your resume.',
      icon: <FileText size={32} />,
      link: '/resumes',
      color: 'bg-emerald-500',
      lightColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
    {
      title: 'AI Analysis',
      description: 'Analyze your resume against a job description using AI.',
      icon: <Sparkles size={32} />,
      link: '/analyze',
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
  ];

  return (
    <Layout user={user} onLogout={onLogout}>
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <div className="mb-12">
            <h1 className="text-4xl font-extrabold text-white mb-4 flex items-center gap-3">
              <span className="p-2 bg-indigo-500/20 text-indigo-300 rounded-xl border border-indigo-500/30">
                <LayoutDashboard size={32} />
              </span>
              Welcome back, {profile.firstName}!
            </h1>
            <p className="text-indigo-100/80 text-lg">Here's what's happening with your career lens today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`${card.lightColor} ${card.textColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{card.title}</h3>
                <p className="text-slate-500 mb-6">{card.description}</p>
                <Link
                  to={card.link}
                  className={`inline-flex items-center font-semibold ${card.textColor} hover:underline`}
                >
                  Go to {card.title} →
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-3xl text-white shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Quick Profile Summary</h3>
              <div className="space-y-4 opacity-90">
                <p><strong className="opacity-70">Name:</strong> {profile.firstName} {profile.lastName}</p>
                <p><strong className="opacity-70">Degree:</strong> {profile.degree}</p>
                <p><strong className="opacity-70">Experience:</strong> {profile.experience} years</p>
                <p><strong className="opacity-70">Top Skills:</strong> {profile.skills}</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Active Resume</h3>
              {activeResume ? (
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                      <FileText size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{activeResume.name}</p>
                      <p className="text-sm text-slate-500">Updated on {activeResume.date}</p>
                    </div>
                  </div>
                  <Link to="/resumes" className="text-indigo-600 font-semibold hover:underline text-sm">Change</Link>
                </div>
              ) : (
                <p className="text-slate-500">No active resume selected. <Link to="/resumes" className="text-indigo-600 font-semibold hover:underline">Upload one now</Link></p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
