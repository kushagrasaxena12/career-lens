import React from 'react';
import { motion } from 'framer-motion';
import ProfileSection from '../components/ProfileSection';
import { useApp } from '../context/AppContext';
import Layout from '../components/layout/Layout';

const ProfilePage = ({ user, onLogout }) => {
  const { profile, setProfile } = useApp();

  return (
    <Layout user={user} onLogout={onLogout}>
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="p-2 bg-indigo-500/20 text-indigo-300 rounded-lg border border-indigo-500/30">👤</span>
            User Profile
          </h1>
          <ProfileSection profile={profile} onSave={setProfile} />
        </motion.div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
