'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Smartphone, ChevronDown, Bell, ShieldAlert, ArrowRight, X } from 'lucide-react';
import { Button } from './ui';

export function TopHeader() {
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
            <div className="absolute right-0 top-full mt-2 w-[420px] bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
              {/* Dropdown Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">Notifications</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500 text-white font-bold">1</span>
                </div>
                <button 
                  onClick={() => setIsNotifOpen(false)}
                  className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Notification Card */}
              <div className="p-3">
                <div className="bg-red-50 rounded-lg p-3.5 border border-red-100">
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-white border border-red-100 flex items-center justify-center text-red-600 shadow-sm flex-shrink-0">
                      <ShieldAlert size={20} className="animate-pulse" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-sm font-semibold text-slate-900 leading-tight">Action Required: 1 High-Risk Incident Detected</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-600 text-white font-semibold uppercase tracking-wider">
                          High Severity Threat
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">Detected 8 mins ago • Aarav's A54</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed mb-3">
                        Local edge heuristics flagged predatory grooming markers in incoming direct messages. Zero unencrypted communication left the child's device.
                      </p>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" className="h-7 text-[11px] font-semibold bg-white px-3">
                          Acknowledge
                        </Button>
                        <Button variant="destructive" className="h-7 text-[11px] font-semibold gap-1 px-3 shadow-sm">
                          Triage Incident <ArrowRight size={12} />
                        </Button>
                      </div>
                    </div>
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

        <div className="flex items-center gap-3 cursor-pointer">
          <div className="flex flex-col text-right leading-tight">
            <span className="text-sm font-semibold text-slate-900">Rajesh Sharma</span>
            <span className="text-xs text-slate-500">Primary Guardian</span>
          </div>
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200">
            <Image
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
              alt="Rajesh Sharma"
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

    </header>
  );
}
