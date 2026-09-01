import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import ResumePage from './pages/ResumePage';
import AnalysisPage from './pages/AnalysisPage';
import JobRadarPage from './pages/JobRadarPage';
import InterviewPage from './pages/InterviewPage';
import Layout from './components/layout/Layout';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/auth"
            element={!user ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/dashboard" />}
          />
          <Route
            element={user ? <Layout user={user} onLogout={handleLogout} /> : <Navigate to="/auth" />}
          >
            <Route path="/dashboard" element={<DashboardPage user={user} />} />
            <Route path="/profile" element={<ProfilePage user={user} />} />
            <Route path="/resumes" element={<ResumePage user={user} />} />
            <Route path="/analyze" element={<AnalysisPage user={user} />} />
            <Route path="/jobs" element={<JobRadarPage />} />
            <Route path="/interview" element={<InterviewPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
