'use client';

import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar.js';
import { TopHeader } from '../components/TopHeader.js';
import { SettingsView } from '../views/SettingsView.js';
import { DevicesView } from '../views/DevicesView.js';
import { AuditLogsView } from '../views/AuditLogsView.js';
import { OverviewView } from '../views/OverviewView.js';

export default function Page() {
  const [currentView, setCurrentView] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
        <TopHeader />
        <main className="flex-1 overflow-y-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
