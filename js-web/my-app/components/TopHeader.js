'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Smartphone, ChevronDown, Bell, ShieldAlert, ArrowRight, X } from 'lucide-react';
import { Button } from './ui';
import { auth } from '../lib/firebase';

export function TopHeader({ onLogout }) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    }
    if (isNotifOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNotifOpen]);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">

      {/* Device Selector Mock */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
          <Smartphone size={16} className="text-emerald-600" />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium text-slate-900 flex items-center gap-1">
              Aarav's Galaxy A54 
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            </span>
            <span className="text-xs text-slate-500">Child Device • Protected</span>
          </div>
          <ChevronDown size={14} className="text-slate-400 ml-2" />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <Button 
          onClick={async () => {
            const uid = auth?.currentUser?.uid || 'SM-A546E-01';
            await fetch('/api/threat', {
              method: 'POST',
              body: JSON.stringify({
                child_id: uid,
                text: "Hey, don't tell your parents about our chat. Delete this message.",
                risk_level: "CRITICAL",
                threat_score: 95.2,
                senderApp: "Instagram"
              })
            });
          }}
          variant="outline" 
          className="h-9 font-semibold shadow-sm flex items-center gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
        >
           <ShieldAlert size={16} />
           Demo Threat
        </Button>
        <Button variant="destructive" className="h-9 font-semibold shadow-sm flex items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
           SOS Dispatch
        </Button>

        {/* Bell Icon with Notification Dropdown */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative cursor-pointer p-1 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Bell size={20} className="text-slate-500" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
          </button>

          {/* Notification Dropdown Panel */}
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 shadow-xl rounded-xl overflow-hidden z-50">
              {/* Header */}
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <span className="font-semibold text-slate-900">Priority Alerts</span>
                <button onClick={() => setIsNotifOpen(false)}>
                  <X size={16} className="text-slate-400 hover:text-slate-600" />
                </button>
              </div>

              {/* List */}
              <div className="max-h-[320px] overflow-y-auto">
                {/* Alert 1 */}
                <div className="p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                  <div className="shrink-0 mt-0.5">
                    <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                      <ShieldAlert size={16} className="text-red-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 leading-tight">Predatory Grooming Detected</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">High confidence match for Stage 2 isolation techniques on Instagram Direct.</p>
                    <span className="text-[10px] font-medium text-slate-400 mt-2 block">14:22 PM</span>
                  </div>
                </div>

                {/* Alert 2 */}
                <div className="p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                  <div className="shrink-0 mt-0.5">
                    <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                      <ShieldAlert size={16} className="text-amber-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 leading-tight">Repeated Toxic Language</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">Exclusion phrases detected in WhatsApp "8th Grade Study Group".</p>
                    <span className="text-[10px] font-medium text-slate-400 mt-2 block">11:05 AM</span>
                  </div>
                </div>
              </div>
              
              {/* Footer */}
              <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/30">
                <button className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors w-full text-center">
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-slate-200 mx-2"></div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="flex flex-col text-right leading-tight">
            <span className="text-sm font-semibold text-slate-900">Rajesh Sharma</span>
            <span className="text-xs text-slate-500">Primary Guardian</span>
          </div>
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 group-hover:border-blue-400 transition-colors">
            <Image
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
              alt="Rajesh Sharma"
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
        </div>
        {onLogout && (
          <button 
            onClick={onLogout}
            className="ml-2 text-sm text-slate-500 hover:text-slate-800 transition-colors font-medium px-2 py-1 rounded-md hover:bg-slate-100"
          >
            Logout
          </button>
        )}
      </div>

    </header>
  );
}
