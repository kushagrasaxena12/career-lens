import React, { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

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
    try {
      // TODO: Implement real AI Analysis API call
      // const response = await fetch('/api/analyze', {
      //   method: 'POST',
      //   body: JSON.stringify({ resumeId: activeResumeId, jd: jd.content })
      // });
      // const data = await response.json();
      // setAnalysis(data);

      // For now, we leave it as a placeholder to be filled by the backend integration
      throw new Error("API integration pending");
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("AI Analysis is currently unavailable. Please try again later.");
    } finally {
      setLoading(false);
    }
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
