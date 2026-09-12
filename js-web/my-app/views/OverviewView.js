'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, ArrowRight, Smartphone, Zap, ShieldCheck, 
  Lock, LayoutGrid, Flag, MessageCircle, Eye, UserX, ExternalLink, 
  Users, ChevronRight, Gamepad2, CheckCheck, EyeOff, Siren, GraduationCap, Clock, Download, CheckCircle 
} from 'lucide-react';
import { Card, Button, Badge } from '../components/ui';

export function OverviewView() {
  const [isShrouded, setIsShrouded] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const [appsFrozen, setAppsFrozen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Handle privacy shroud countdown
  useEffect(() => {
    let timer;
    if (!isShrouded && countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    } else if (countdown === 0 && !isShrouded) {
      setIsShrouded(true);
      setCountdown(30);
    }
    return () => clearTimeout(timer);
  }, [isShrouded, countdown]);

  const handleUnshroud = () => {
    if (isShrouded) {
      setIsShrouded(false);
      setCountdown(30);
    } else {
      setIsShrouded(true);
      setCountdown(30);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto p-4 lg:p-8 flex flex-col gap-6">
      
      {/* Notification Banner: Calm, Clinical High-Risk Alert */}
      <div className="w-full bg-red-50 rounded-xl p-4 shadow-sm relative overflow-hidden border border-red-100">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="h-10 w-10 rounded-lg bg-white border border-red-100 flex items-center justify-center text-red-600 shadow-sm flex-shrink-0">
              <ShieldAlert size={24} className="animate-pulse" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <span className="text-base font-semibold text-slate-900 tracking-tight">Action Required: 1 High-Risk Incident Detected</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-red-600 text-white font-semibold uppercase tracking-wider">
                  High Severity Threat
                </span>
                <span className="text-xs font-mono text-slate-500 font-medium">Detected 8 mins ago • Aarav's A54</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Local edge heuristics flagged predatory grooming markers in incoming direct messages. Zero unencrypted communication left the child's device.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto justify-end">
            <Button variant="outline" className="h-8 text-xs font-semibold bg-white">
              Acknowledge
            </Button>
            <Button variant="destructive" className="h-8 text-xs font-semibold gap-1.5 px-4 shadow-sm">
              Triage Incident <ArrowRight size={14} />
            </Button>
          </div>
        </div>
      </div>

      {/* System Telemetry & Quick Metrics Bento Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Device Heartbeat Diagnostics Card */}
        <Card className="lg:col-span-7 p-4 border-slate-200 flex flex-col justify-between">
          <div className="flex items-start justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <Smartphone size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h2 className="text-base font-semibold text-slate-900 tracking-tight">Aarav's Samsung Galaxy A54</h2>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">Android 14 (OneUI 6.1)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block"></span>
                  <span className="text-[11px] text-slate-900 font-medium tracking-wider">Online & Guarding</span>
                  <span className="text-xs font-mono text-slate-400">• Last ping: 12 seconds ago</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-600">
              <Zap size={14} />
              <span className="text-xs font-mono font-semibold">78% Charging</span>
            </div>
          </div>
          
          {/* Telemetry Sub-indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-3">
              <ShieldCheck size={18} className="text-emerald-600 mt-0.5" />
              <div>
                <span className="text-[11px] font-medium text-slate-500 block mb-0.5 tracking-wider uppercase">Accessibility Daemon</span>
                <span className="text-sm font-semibold text-slate-900 block leading-tight">Active & Unrestricted</span>
                <span className="text-xs font-mono text-emerald-600 block mt-1">Zero OS background killing</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-3">
              <ShieldCheck size={18} className="text-blue-600 mt-0.5" />
              <div>
                <span className="text-[11px] font-medium text-slate-500 block mb-0.5 tracking-wider uppercase">Edge Telemetry Engine</span>
                <span className="text-sm font-semibold text-slate-900 block leading-tight">Local Regex + XGBoost</span>
                <span className="text-xs font-mono text-slate-500 block mt-1">Zero persistent cloud logs</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Metric Counters */}
        <div className="lg:col-span-5 grid grid-cols-3 gap-4">
          <Card className="p-4 border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-500 tracking-wider uppercase">Monitored</span>
              <LayoutGrid size={16} className="text-blue-600" />
            </div>
            <div className="my-2">
              <span className="text-3xl font-bold text-slate-900 tracking-tight">3</span>
              <span className="text-[11px] font-medium text-slate-500 block mt-0.5">Apps Protected</span>
            </div>
            <div className="flex items-center gap-1 text-slate-600 text-xs font-mono truncate">
              WA, IG, RBLX
            </div>
          </Card>
          
          <Card className="p-4 border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-500 tracking-wider uppercase">Flags</span>
              <Flag size={16} className="text-red-600" />
            </div>
            <div className="my-2">
              <span className="text-3xl font-bold text-red-600 tracking-tight">1</span>
              <span className="text-[11px] font-medium text-red-600 block mt-0.5">Critical Threat</span>
            </div>
            <div className="text-xs font-mono text-slate-500 truncate">
              XGBoost: 91%
            </div>
          </Card>
          
          <Card className="p-4 border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-500 tracking-wider uppercase">Integrity</span>
              <ShieldCheck size={16} className="text-emerald-600" />
            </div>
            <div className="my-2">
              <span className="text-3xl font-bold text-slate-900 tracking-tight">0</span>
              <span className="text-[11px] font-medium text-emerald-600 block mt-0.5">Tamper Events</span>
            </div>
            <div className="text-xs font-mono text-slate-500 truncate">
              Daemon Secure
            </div>
          </Card>
        </div>
      </div>

      {/* Primary Working Area: Incident Triage Feed & Detailed Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Filterable Incident Feed (~60%) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* Navigation & Filter Tabs */}
          <Card className="p-2 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1 overflow-x-auto">
              {['all', 'grooming', 'cyberbullying', 'resolved'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors whitespace-nowrap capitalize ${
                    activeTab === tab 
                      ? 'bg-slate-100 text-slate-900' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {tab === 'all' && 'All Alerts (3)'}
                  {tab === 'grooming' && 'Critical / Grooming (1)'}
                  {tab === 'cyberbullying' && 'Cyberbullying (1)'}
                  {tab === 'resolved' && 'Resolved (1)'}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 px-2">
              <span className="text-xs font-mono text-slate-500 hidden sm:inline">Stream: Realtime</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            </div>
          </Card>

          {/* INCIDENT CARDS LIST */}
          <div className="flex flex-col gap-4">
            
            {/* ACTIVE SELECTED CARD: Alert 1 (Instagram Direct) */}
            <Card className="p-4 relative overflow-hidden bg-gradient-to-r from-blue-50/50 via-transparent to-transparent ring-1 ring-blue-100">
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-1 rounded-md bg-slate-50 text-xs font-semibold tracking-wide text-slate-900 flex items-center gap-1.5 border border-slate-100">
                      <MessageCircle size={14} className="text-blue-600" /> Instagram Direct
                    </span>
                    <span className="text-xs font-mono text-slate-500">• 14:22 PM Today</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-red-50 border border-red-100 text-red-700 font-semibold flex items-center gap-1 tracking-wider">
                      <div className="h-1 w-1 rounded-full bg-red-500 animate-pulse"></div>
                      Grooming Pattern
                    </span>
                  </div>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-blue-600 text-white font-medium flex items-center gap-1 tracking-wider flex-shrink-0 shadow-sm">
                    <Eye size={12} /> Reviewing Now
                  </span>
                </div>
                
                <div>
                  <h3 className="text-base font-semibold text-slate-900 tracking-tight">Isolation Attempt & Grooming Pattern</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    A non-mutual adult account repeatedly solicited child migration to an unmoderated Discord voice server with explicit instructions to conceal communication from parents.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-xs font-mono font-medium px-2 py-1 rounded bg-slate-50 text-slate-900 flex items-center gap-1.5 border border-slate-100">
                    <UserX size={14} className="text-red-500" /> Unknown adult contact
                  </span>
                  <span className="text-xs font-mono font-medium px-2 py-1 rounded bg-slate-50 text-slate-900 flex items-center gap-1.5 border border-slate-100">
                    <ExternalLink size={14} className="text-amber-500" /> Off-platform migration request
                  </span>
                  <span className="text-xs font-mono font-medium px-2 py-1 rounded bg-slate-50 text-slate-900 flex items-center gap-1.5 border border-slate-100">
                    <Lock size={14} className="text-red-500" /> Secrecy cue detected
                  </span>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] font-medium text-slate-500 tracking-wider">Edge ML Confidence:</span>
                    <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-red-500 h-full rounded-full" style={{ width: '91%' }}></div>
                    </div>
                    <span className="text-xs font-mono font-bold text-red-600">91% (XGBoost)</span>
                  </div>
                  <span className="text-[11px] text-blue-600 flex items-center gap-1 font-semibold tracking-wider">
                    Focused in Inspector <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Card>

            {/* CARD 2: WhatsApp Group Cyberbullying */}
            <Card className="p-4 hover:bg-slate-50/50 transition-all cursor-pointer">
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-1 rounded-md bg-slate-50 text-xs font-semibold tracking-wide text-slate-900 flex items-center gap-1.5 border border-slate-100">
                      <Users size={14} className="text-emerald-600" /> WhatsApp Group
                    </span>
                    <span className="text-xs font-mono text-slate-500">• 11:05 AM Today</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-50 border border-amber-100 text-amber-700 font-semibold tracking-wider">
                      Exclusion Tactic
                    </span>
                  </div>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium tracking-wider">
                    Reviewed • Low escalation
                  </span>
                </div>
                
                <div>
                  <h3 className="text-base font-semibold text-slate-900 tracking-tight">Targeted Exclusion & Cyberbullying</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Repeated toxic phrase clustering ("don't invite him", "kick out") flagged in 8th Grade Study Group.
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] font-medium text-slate-500 tracking-wider">Edge ML Confidence:</span>
                    <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '74%' }}></div>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-600">74%</span>
                  </div>
                  <button className="text-[11px] text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors tracking-wider font-medium">
                    View Cached Trace <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </Card>

            {/* CARD 3: Roblox */}
            <Card className="p-4 hover:bg-slate-50/50 transition-all cursor-pointer">
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-1 rounded-md bg-slate-50 text-xs font-semibold tracking-wide text-slate-900 flex items-center gap-1.5 border border-slate-100">
                      <Gamepad2 size={14} className="text-slate-500" /> Roblox In-Game Chat
                    </span>
                    <span className="text-xs font-mono text-slate-500">• Yesterday 18:40</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-semibold tracking-wider">
                      Solicitation
                    </span>
                  </div>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-medium flex items-center gap-1 tracking-wider">
                    <CheckCheck size={12} /> Auto-deflected by Edge
                  </span>
                </div>
                
                <div>
                  <h3 className="text-base font-semibold text-slate-900 tracking-tight">Contact Info Solicitation (Phone / Location)</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Regex filter blocked phone number request in sandbox gaming session. Zero personal data disclosed.
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] font-medium text-slate-500 tracking-wider">Edge ML Confidence:</span>
                    <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: '62%' }}></div>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-600">62%</span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 tracking-wider">Session Closed</span>
                </div>
              </div>
            </Card>

          </div>

          {/* Edge Zero-Retention Guarantee Pill */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
            <ShieldCheck size={24} className="text-blue-600 flex-shrink-0" />
            <div className="flex flex-col text-xs text-slate-600">
              <span className="font-semibold text-slate-900">Privacy-Preserving Audit Architecture</span>
              <span className="mt-0.5">Child communications never enter centralized storage. Raw strings are discarded from RAM once vectorized locally.</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Detailed Threat Investigation (~40%) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <Card className="p-4 flex flex-col gap-5">
            
            {/* Inspector Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base font-semibold text-slate-900 tracking-tight">Incident Intelligence</span>
                  <span className="text-xs font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded">#ALT-8921B</span>
                </div>
                <span className="text-xs text-red-600 font-medium block">
                  Predatory Grooming • Stage 2 (Isolation & Secrecy)
                </span>
              </div>
              <button className="p-1.5 text-slate-500 hover:text-slate-900 bg-slate-50 border border-slate-200 rounded-lg transition-colors" title="Download Cryptographic Hash">
                <Download size={18} />
              </button>
            </div>
            
            {/* ML Inference Metadata Box */}
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Model Inference Pipeline</span>
                <span className="text-xs font-mono font-bold text-red-600">91.4% Confidence</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                <span>Classifier: FastAPI TF-IDF + XGBoost</span>
                <span>Latency: 14.8ms</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full rounded-full" style={{ width: '91.4%' }}></div>
              </div>
            </div>

            {/* Intercepted Message Context: Privacy Shroud */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-900 flex items-center gap-1.5 tracking-wide">
                  <Lock size={14} className="text-blue-600" />
                  Edge Intercepted Text Snippet
                </label>
                {!isShrouded && (
                  <span className="text-xs font-mono text-slate-500">
                    Auto-redacting in <span className="text-red-600 font-bold">{countdown}</span>s
                  </span>
                )}
              </div>
              
              <div 
                className="relative bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-hidden select-none cursor-pointer min-h-[140px] flex flex-col justify-center"
                onClick={handleUnshroud}
              >
                {/* Shroud Overlay */}
                <div className={`absolute inset-0 backdrop-blur-md bg-slate-100/80 flex flex-col items-center justify-center p-4 text-center z-10 transition-opacity duration-300 ${!isShrouded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                  <div className="h-8 w-8 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-600 mb-2 border border-slate-200">
                    <EyeOff size={16} />
                  </div>
                  <span className="text-sm font-semibold text-slate-900">🔒 Privacy Protected Content</span>
                  <p className="text-xs text-slate-600 mt-1 max-w-[260px] leading-relaxed">
                    Hinglish message veiled for child dignity. Click to unblur for legal audit & parent review.
                  </p>
                </div>
                
                {/* Underlying Text Content */}
                <div className={`flex flex-col gap-2 transition-all duration-300 ${isShrouded ? 'filter blur-md scale-95 opacity-40' : 'scale-100 opacity-100'}`}>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-1">
                    <span className="text-xs font-mono text-red-600 font-semibold">Sender: @stranger_k99 • Recipient: Aarav</span>
                    <span className="text-xs font-mono text-slate-500">Direct Message</span>
                  </div>
                  <blockquote className="text-xs font-mono text-slate-900 italic bg-white p-3 rounded-lg border-l-2 border-red-500 shadow-sm leading-relaxed">
                    “Ghar pe kisi ko mat batana, tu mere sath Discord pe aaja... parents ko pata chala toh problem hogi.”
                  </blockquote>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                    <span className="font-semibold text-slate-900">English Translation:</span> “Don't tell anyone at home, join me on Discord... if parents find out it will cause problems.”
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1 tracking-wider">
                <CheckCircle size={12} className="text-emerald-600" />
                <span className="font-mono">Zero Cloud Persistence Protocol: Ephemeral transit only</span>
              </div>
            </div>

            {/* Recommended Parent Action Steps */}
            <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
              <h4 className="text-[11px] font-semibold text-slate-900 uppercase tracking-wider">
                Clinical Recommendation (Crisis Mitigation)
              </h4>
              <ol className="flex flex-col gap-2.5">
                <li className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                  <span className="h-5 w-5 rounded-full bg-white border border-slate-200 text-blue-600 font-bold flex items-center justify-center flex-shrink-0 text-[10px] shadow-sm">1</span>
                  <span><strong>Calm Dialogue:</strong> Talk to Aarav without punitive tone or device confiscation to prevent conversational withdrawal.</span>
                </li>
                <li className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                  <span className="h-5 w-5 rounded-full bg-white border border-slate-200 text-blue-600 font-bold flex items-center justify-center flex-shrink-0 text-[10px] shadow-sm">2</span>
                  <span><strong>Handle Quarantine:</strong> Block <code className="bg-white border border-slate-200 px-1 py-0.5 rounded text-slate-900 font-mono text-[10px]">@stranger_k99</code> across Aarav's linked accounts immediately.</span>
                </li>
                <li className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                  <span className="h-5 w-5 rounded-full bg-white border border-slate-200 text-blue-600 font-bold flex items-center justify-center flex-shrink-0 text-[10px] shadow-sm">3</span>
                  <span><strong>Secure Evidence:</strong> Audit payload signature generated with local timestamp hash for official reporting.</span>
                </li>
              </ol>
            </div>

            {/* Physical Intervention Action Buttons */}
            <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
              <Button variant="destructive" className="w-full py-2.5 px-4 font-semibold text-sm shadow-sm gap-2">
                <Siren size={18} />
                Contact Local Child Welfare (NCPCR / 1098)
              </Button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                <Button variant="outline" className="w-full py-2 px-3 font-semibold text-xs shadow-sm gap-1.5 border-slate-200">
                  <GraduationCap size={16} className="text-slate-600" /> Notify School
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setAppsFrozen(!appsFrozen)}
                  className={`w-full py-2 px-3 font-semibold text-xs shadow-sm gap-1.5 transition-colors ${
                    appsFrozen 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100' 
                      : 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
                  }`}
                >
                  {appsFrozen ? (
                    <><CheckCheck size={16} /> Apps Frozen (2h)</>
                  ) : (
                    <><Clock size={16} /> Freeze Social Apps</>
                  )}
                </Button>
              </div>
            </div>

          </Card>
        </div>
        
      </div>
    </div>
  );
}
