import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, LogOut, Briefcase, LayoutDashboard, FileText, Sparkles } from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/profile', label: 'Profile', icon: <User size={18} /> },
    { path: '/resumes', label: 'Resumes', icon: <FileText size={18} /> },
    { path: '/analyze', label: 'AI Analysis', icon: <Sparkles size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-slate-200 px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-8">
        <NavLink to="/dashboard" className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300 shadow-md shadow-indigo-200">
            <Briefcase className="text-white" size={20} />
          </div>
          <span className="text-xl font-extrabold text-slate-800 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">CareerLens</span>
        </NavLink>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        {user && (
          <div className="flex items-center gap-3 px-3 py-1.5 bg-white/50 border border-slate-200 rounded-full text-sm font-medium text-slate-600 transition-all hover:bg-white hover:shadow-sm">
            <div className="w-6 h-6 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-full flex items-center justify-center text-white">
              <User size={12} />
            </div>
            <span className="max-w-[120px] truncate">{user.firstName} {user.lastName}</span>
          </div>
        )}
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-rose-600 transition-all hover:scale-105"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
