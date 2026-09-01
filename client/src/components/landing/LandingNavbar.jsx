import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingNavbar = () => {
  const navLinks = [
    { name: 'FEATURES', href: '#features' },
    { name: 'PRICING', href: '#pricing' },
    { name: 'RESOURCES', href: '#resources' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center glass border-b border-white/10">
      <Link to="/" className="flex items-center gap-2 group cursor-pointer">
        <div className="bg-gradient-to-br from-cyan-400 to-indigo-600 p-1.5 rounded-lg shadow-lg shadow-cyan-500/20">
          <Briefcase className="text-white" size={20} />
        </div>
        <span className="text-xl font-black text-white tracking-tighter">
          CAREER<span className="text-cyan-400">LENS</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-[11px] font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest"
          >
            {link.name}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <Link
          to="/auth"
          className="text-[11px] font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest"
        >
          Sign In
        </Link>
        <Link
          to="/auth"
          className="group relative px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest text-white transition-all hover:scale-105 active:scale-95 overflow-hidden shadow-[0_0_15px_rgba(124,58,237,0.3)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all group-hover:scale-110" />
          <span className="relative z-10">Register</span>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
