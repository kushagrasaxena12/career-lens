import React from 'react';
import { Briefcase } from 'lucide-react';

const GithubIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22C15 22 15 18 7 13c-5.5 2.87-6.3 6.9-6 13H6c0-1.57.57-2.96 1.57-4.05 7.47-3.4 13-6.78 13-11 0-1.25-.27-2.48-1-3.57 3.72-2.14 7.47-2.14 11-1" />
    <path d="M10 17c-6.63 0-12-5.37-12-12 0-1.33.34-2.58 1-3.64" />
  </svg>
);

const TwitterIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-//C 15 20 14 20 12 20s-5-1-7-3c-2 2-5 3-8 3s-3-4-3-4l3 2c2 1 4 1 6 1s4-1 6-1z" />
    <path d="M22 4l-10 10" />
    <path d="M12 4l-10 10" />
  </svg>
);

const LinkedinIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="2" />
    <circle cx="4" cy="5" r="2" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/10 bg-black/50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-gradient-to-br from-cyan-500 to-indigo-600 p-1.5 rounded-lg">
              <Briefcase className="text-white" size={20} />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">CareerLens</span>
          </div>
          <p className="text-zinc-500 max-w-xs leading-relaxed mb-6">
            Empowering professionals with AI-driven insights to navigate their career journey with precision and confidence.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-zinc-500 hover:text-white transition-colors"><GithubIcon size={20} /></a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors"><TwitterIcon size={20} /></a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors"><LinkedinIcon size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Product</h4>
          <ul className="space-y-4 text-sm text-zinc-500">
            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
            <li><a href="#" className="hover:text-white transition-colors">API</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-zinc-500">
            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-sm text-zinc-600">
        © {new Date().getFullYear()} CareerLens AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
