import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  FileText,
  Sparkles,
  Globe,
  Mic,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Briefcase
} from 'lucide-react';
import { motion } from 'framer-motion';

const SidebarItem = ({ to, icon: Icon, label, active }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-200 group ${
        isActive
          ? 'bg-white text-black shadow-lg shadow-white/10'
          : 'text-zinc-500 hover:text-white hover:bg-white/5'
      }`
    }
  >
    <Icon size={18} className="group-hover:scale-110 transition-transform duration-200" />
    <span className="transition-opacity duration-200">{label}</span>
  </NavLink>
);

const DashboardLayout = ({ user, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { to: '/profile', icon: User, label: 'Profile' },
    { to: '/resumes', icon: FileText, label: 'Resume Vault' },
    { to: '/analyze', icon: Sparkles, label: 'AI Analysis' },
    { to: '/jobs', icon: Globe, label: 'Job Radar' },
    { to: '/interview', icon: Mic, label: 'Mock Interview' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex relative overflow-hidden">
      {/* Animated Aurora Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[120px] aurora-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-cyan-500/10 rounded-full blur-[120px] aurora-blob" style={{ animationDelay: '-5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-violet-500/10 rounded-full blur-[120px] aurora-blob" style={{ animationDelay: '-10s' }} />
      </div>

      {/* Sidebar */}
      <motion.aside
        animate={{ width: isCollapsed ? 80 : 260 }}
        className="h-screen sticky top-0 glass border-r border-white/10 flex flex-col transition-all duration-300 z-50"
      >
        <div className="p-6 flex items-center justify-between">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <div className="bg-gradient-to-br from-cyan-400 to-indigo-600 p-1.5 rounded-lg shadow-lg shadow-indigo-500/20">
                <Briefcase className="text-white" size={20} />
              </div>
              <span className="text-xl font-black text-white tracking-tighter">
                CAREER<span className="text-cyan-400">LENS</span>
              </span>
            </motion.div>
          )}
          {isCollapsed && (
            <div className="mx-auto bg-gradient-to-br from-cyan-400 to-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
              <Briefcase className="text-white" size={20} />
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-500 hover:text-white transition-colors"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <SidebarItem key={item.to} {...item} />
          ))}
        </div>

        <div className="p-4 border-t border-white/10 space-y-2">
          <SidebarItem to="/settings" icon={Settings} label="Settings" />
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-200 group"
          >
            <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
            {!isCollapsed && <span>Logout</span>}
          </button>

          {!isCollapsed && user && (
            <div className="mt-4 p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-indigo-500/20">
                {user.firstName[0]}{user.lastName[0]}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{user.firstName} {user.lastName}</p>
                <p className="text-[10px] text-zinc-500 truncate">{user.email}</p>
              </div>
            </div>
          )}
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-y-auto h-screen">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
