import React, { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    firstName: 'Lakshit',
    lastName: 'Barak',
    email: 'lakshit@example.com',
    gender: 'Male',
    degree: 'B.Tech Computer Science',
    experience: '2',
    skills: ['React', 'Node.js', 'JavaScript', 'Tailwind CSS'],
    achievements: 'Won 2 Hackathons, Certified AWS Cloud Practitioner',
    positions: 'Lead Developer at College Tech Club'
  });

  const [resumes, setResumes] = useState([]);
  const fetchResumes = async () => {
    try {
      const response = await fetch('/api/resumes', {
        headers: {
          'x-user-id': '1'
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch resumes');
      }
  
      const data = await response.json();
  
      const formattedResumes = data.resumes.map(resume => ({
        id: resume.id,
        name: resume.fileName,
        date: new Date(resume.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        isActive: resume.isActive,
        fileUrl: resume.fileUrl,
        extractedText: resume.extractedText
      }));
  
      setResumes(formattedResumes);
    } catch (error) {
      console.error('Failed to fetch resumes:', error);
    }
  };
  
  useEffect(() => {
    fetchResumes();
  }, []);

  const [jd, setJd] = useState({
    content: '',
    jobType: '',
    location: '',
    workMode: ''
  });

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resumes.some(r => r.isActive)) {
      alert("Please set an active resume first.");
      return;
    }
    if (!jd.content) {
      alert("Please provide a job description.");
      return;
    }

    setLoading(true);
    // Simulate AI Analysis
    await new Promise(resolve => setTimeout(resolve, 3000));

    setAnalysis({
      overallScore: Math.floor(Math.random() * 40) + 60,
      strongSkills: ['React', 'JavaScript', 'Tailwind CSS', 'API Integration'],
      missingSkills: ['Redis', 'Docker', 'Kubernetes', 'Unit Testing'],
      keywords: ['Scalability', 'Microservices', 'CI/CD Pipeline', 'Performance Optimization'],
      recommendations: [
        "Add more quantified achievements to your experience section.",
        "Incorporate keywords like 'Microservices' into your projects.",
        "Mention specific tools used for state management (e.g., Redux, Zustand).",
        "Highlight any experience with cloud deployment (AWS/Azure/GCP)."
      ]
    });
    setLoading(false);
  };

  return (
    <AppContext.Provider value={{
      profile, setProfile,
      resumes, setResumes,
      jd, setJd,
      analysis, setAnalysis,
      loading, setLoading,
      handleAnalyze
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
