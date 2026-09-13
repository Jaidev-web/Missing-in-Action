'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar.js';
import { TopHeader } from '../components/TopHeader.js';
import { SettingsView } from '../views/SettingsView.js';
import { DevicesView } from '../views/DevicesView.js';
import { AuditLogsView } from '../views/AuditLogsView.js';
import { OverviewView } from '../views/OverviewView.js';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ShieldCheck } from 'lucide-react';

export default function Page() {
  const [currentView, setCurrentView] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Login states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-slate-50">Loading SafeNET...</div>;
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-3 justify-center mb-8">
            <div className="p-2 bg-blue-600 rounded-lg">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">SafeNET</h1>
          </div>
          
          <h2 className="text-lg font-semibold text-center mb-6">Parent Dashboard Login</h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg"
                required
              />
            </div>
            {error && <div className="text-red-500 text-sm p-2 bg-red-50 rounded">{error}</div>}
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white font-medium p-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return <OverviewView />;
      case 'settings':
        return <SettingsView />;
      case 'devices':
        return <DevicesView />;
      case 'audit':
        return <AuditLogsView />;
      default:
        return <div className="p-8">Select a view from the sidebar.</div>;
    }
  };

  return (
    <div className="flex h-screen bg-[#f7f9fb] text-slate-900 font-sans overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Pass signOut directly to the header so parent can log out */}
        <TopHeader onLogout={() => signOut(auth)} />
        <main className="flex-1 overflow-y-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
