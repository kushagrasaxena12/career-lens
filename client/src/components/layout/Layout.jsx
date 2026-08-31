import React from 'react';
import Navbar from '../Navbar';

const Layout = ({ children, user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 relative overflow-hidden">
      {/* Atmospheric deep blue and violet blends */}
      <div className="fixed top-[-10%] left-[-10%] w-[70%] h-[70%] bg-blue-600/20 rounded-full blur-[120px] opacity-60 pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-purple-600/20 rounded-full blur-[120px] opacity-60 pointer-events-none -z-10"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-indigo-500/10 rounded-full blur-[150px] opacity-40 pointer-events-none -z-10"></div>

      <Navbar user={user} onLogout={onLogout} />
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;
