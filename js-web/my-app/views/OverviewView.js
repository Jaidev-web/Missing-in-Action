'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, ArrowRight, Smartphone, Zap, ShieldCheck, 
  Lock, LayoutGrid, Flag, MessageCircle, Eye, UserX, ExternalLink, 
  Users, ChevronRight, ChevronDown, Gamepad2, CheckCheck, EyeOff, Siren, GraduationCap, Clock, Download, CheckCircle 
} from 'lucide-react';
import { Card, Button, Badge } from '../components/ui';

// Incident data for each alert
const incidents = [
  {
    id: 'instagram',
    // Card data
    platform: 'Instagram Direct',
    platformIcon: 'MessageCircle',
    platformIconColor: 'text-blue-600',
    time: '14:22 PM Today',
    tagLabel: 'Grooming Pattern',
    tagBg: 'bg-red-50 border-red-100 text-red-700',
    tagDot: true,
    statusLabel: 'Reviewing Now',
    statusStyle: 'bg-blue-600 text-white shadow-sm',
    statusIcon: true,
    title: 'Isolation Attempt & Grooming Pattern',
    description: 'A non-mutual adult account repeatedly solicited child migration to an unmoderated Discord voice server with explicit instructions to conceal communication from parents.',
    indicators: [
      { icon: 'UserX', color: 'text-red-500', label: 'Unknown adult contact' },
      { icon: 'ExternalLink', color: 'text-amber-500', label: 'Off-platform migration request' },
      { icon: 'Lock', color: 'text-red-500', label: 'Secrecy cue detected' },
    ],
    confidence: 91,
    confidenceColor: 'bg-red-500',
    confidenceTextColor: 'text-red-600',
    confidenceLabel: '91% (XGBoost)',
    footerAction: 'Focused in Inspector',
    footerStyle: 'text-blue-600 font-semibold',
    // Inspector data
    incidentId: '#ALT-8921B',
    classification: 'Predatory Grooming • Stage 2 (Isolation & Secrecy)',
    classificationColor: 'text-red-600',
    mlConfidence: '91.4%',
    mlConfidenceColor: 'text-red-600',
    mlBarColor: 'bg-red-500',
    mlBarWidth: '91.4%',
    classifier: 'FastAPI TF-IDF + XGBoost',
    latency: '14.8ms',
    sender: '@stranger_k99',
    recipient: 'Aarav',
    messageType: 'Direct Message',
    originalText: '\u201cGhar pe kisi ko mat batana, tu mere sath Discord pe aaja... parents ko pata chala toh problem hogi.\u201d',
    translation: '\u201cDon\u2019t tell anyone at home, join me on Discord... if parents find out it will cause problems.\u201d',
    recommendations: [
      { step: 1, title: 'Calm Dialogue:', detail: 'Talk to Aarav without punitive tone or device confiscation to prevent conversational withdrawal.' },
      { step: 2, title: 'Handle Quarantine:', detail: 'Block @stranger_k99 across Aarav\u2019s linked accounts immediately.', code: '@stranger_k99' },
      { step: 3, title: 'Secure Evidence:', detail: 'Audit payload signature generated with local timestamp hash for official reporting.' },
    ],
  },
  {
    id: 'whatsapp',
    platform: 'WhatsApp Group',
    platformIcon: 'Users',
    platformIconColor: 'text-emerald-600',
    time: '11:05 AM Today',
    tagLabel: 'Exclusion Tactic',
    tagBg: 'bg-amber-50 border-amber-100 text-amber-700',
    tagDot: false,
    statusLabel: 'Reviewed \u2022 Low escalation',
    statusStyle: 'bg-slate-100 text-slate-600',
    statusIcon: false,
    title: 'Targeted Exclusion & Cyberbullying',
    description: 'Repeated toxic phrase clustering ("don\'t invite him", "kick out") flagged in 8th Grade Study Group.',
    indicators: [],
    confidence: 74,
    confidenceColor: 'bg-amber-500',
    confidenceTextColor: 'text-amber-600',
    confidenceLabel: '74%',
    footerAction: 'View Cached Trace',
    footerStyle: 'text-slate-500 hover:text-blue-600',
    // Inspector data
    incidentId: '#ALT-7734C',
    classification: 'Cyberbullying \u2022 Group Exclusion Tactic',
    classificationColor: 'text-amber-600',
    mlConfidence: '74.2%',
    mlConfidenceColor: 'text-amber-600',
    mlBarColor: 'bg-amber-500',
    mlBarWidth: '74.2%',
    classifier: 'FastAPI TF-IDF + XGBoost',
    latency: '11.2ms',
    sender: 'Class Group (8th Grade Study)',
    recipient: 'Aarav (targeted)',
    messageType: 'Group Chat',
    originalText: '\u201cUsko group se nikaal do... woh aayega toh hum log nahi aayenge. Usko mat invite karo.\u201d',
    translation: '\u201cRemove him from the group... if he comes, we won\u2019t come. Don\u2019t invite him.\u201d',
    recommendations: [
      { step: 1, title: 'Empathetic Conversation:', detail: 'Ask Aarav about his friend group dynamics without being accusatory. Validate his feelings about exclusion.' },
      { step: 2, title: 'Document Pattern:', detail: 'Monitor recurring exclusion language across group chats over the next 48 hours for escalation assessment.' },
      { step: 3, title: 'School Liaison:', detail: 'If pattern persists, consider confidential outreach to school counselor with anonymized evidence digest.' },
    ],
  },
  {
    id: 'roblox',
    platform: 'Roblox In-Game Chat',
    platformIcon: 'Gamepad2',
    platformIconColor: 'text-slate-500',
    time: 'Yesterday 18:40',
    tagLabel: 'Solicitation',
    tagBg: 'bg-slate-100 border-slate-200 text-slate-700',
    tagDot: false,
    statusLabel: 'Auto-deflected by Edge',
    statusStyle: 'bg-emerald-50 border-emerald-100 text-emerald-700',
    statusIcon: true,
    statusIconComponent: 'CheckCheck',
    title: 'Contact Info Solicitation (Phone / Location)',
    description: 'Regex filter blocked phone number request in sandbox gaming session. Zero personal data disclosed.',
    indicators: [],
    confidence: 62,
    confidenceColor: 'bg-blue-600',
    confidenceTextColor: 'text-slate-600',
    confidenceLabel: '62%',
    footerAction: 'Session Closed',
    footerStyle: 'text-slate-500',
    isFooterStatic: true,
    // Inspector data
    incidentId: '#ALT-6201D',
    classification: 'Contact Solicitation \u2022 Auto-Deflected (Resolved)',
    classificationColor: 'text-emerald-600',
    mlConfidence: '62.1%',
    mlConfidenceColor: 'text-slate-600',
    mlBarColor: 'bg-blue-600',
    mlBarWidth: '62.1%',
    classifier: 'Regex + XGBoost Ensemble',
    latency: '8.4ms',
    sender: 'RobloxUser_xK47z',
    recipient: 'Aarav',
    messageType: 'In-Game Chat',
    originalText: '\u201cBro what\u2019s your number? Let\u2019s play on call. Which area you live in? I\u2019m near Andheri.\u201d',
    translation: null,
    recommendations: [
      { step: 1, title: 'Acknowledge Auto-Block:', detail: 'The edge filter successfully intercepted and scrambled the contact solicitation. No further action required.' },
      { step: 2, title: 'Educate on Boundaries:', detail: 'Use this as a teaching moment \u2014 discuss why sharing phone numbers or location with online strangers is risky.' },
      { step: 3, title: 'Review Friend List:', detail: 'Periodically audit Aarav\u2019s Roblox friend list for unknown or suspicious accounts.' },
    ],
  },
];

const PlatformIcon = ({ name, className }) => {
  const icons = { MessageCircle, Users, Gamepad2 };
  const Icon = icons[name];
  return Icon ? <Icon size={14} className={className} /> : null;
};

const IndicatorIcon = ({ name, className }) => {
  const icons = { UserX, ExternalLink, Lock };
  const Icon = icons[name];
  return Icon ? <Icon size={14} className={className} /> : null;
};

export function OverviewView() {
  const [isShrouded, setIsShrouded] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const [appsFrozen, setAppsFrozen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [isRecommendationOpen, setIsRecommendationOpen] = useState(false);
  const [selectedIncidentId, setSelectedIncidentId] = useState('instagram');

  const selectedIncident = incidents.find(i => i.id === selectedIncidentId);

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

  // Reset shroud when switching incidents
  const handleSelectIncident = (id) => {
    setSelectedIncidentId(id);
    setIsShrouded(true);
    setCountdown(30);
    setIsRecommendationOpen(false);
  };

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

      {/* System Telemetry & Quick Metrics Bento Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Device Heartbeat Diagnostics Card */}
        <Card className="lg:col-span-7 p-4 border-slate-200 h-fit self-start ">
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
            
            {incidents.map((incident) => {
              const isSelected = selectedIncidentId === incident.id;
              return (
                <Card 
                  key={incident.id}
                  onClick={() => handleSelectIncident(incident.id)}
                  className={`p-4 transition-all cursor-pointer ${
                    isSelected 
                      ? 'relative overflow-hidden bg-gradient-to-r from-blue-50/50 via-transparent to-transparent ring-1 ring-blue-100' 
                      : 'hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-1 rounded-md bg-slate-50 text-xs font-semibold tracking-wide text-slate-900 flex items-center gap-1.5 border border-slate-100">
                          <PlatformIcon name={incident.platformIcon} className={incident.platformIconColor} /> {incident.platform}
                        </span>
                        <span className="text-xs font-mono text-slate-500">• {incident.time}</span>
                        <span className={`text-[11px] px-2 py-0.5 rounded-full border font-semibold flex items-center gap-1 tracking-wider ${incident.tagBg}`}>
                          {incident.tagDot && <div className="h-1 w-1 rounded-full bg-red-500 animate-pulse"></div>}
                          {incident.tagLabel}
                        </span>
                      </div>
                      <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1 tracking-wider flex-shrink-0 ${incident.statusStyle}`}>
                        {incident.statusIcon && incident.statusIconComponent === 'CheckCheck' 
                          ? <CheckCheck size={12} />
                          : incident.statusIcon ? <Eye size={12} /> : null
                        }
                        {incident.statusLabel}
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 tracking-tight">{incident.title}</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {incident.description}
                      </p>
                    </div>
                    
                    {incident.indicators.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {incident.indicators.map((ind, idx) => (
                          <span key={idx} className="text-xs font-mono font-medium px-2 py-1 rounded bg-slate-50 text-slate-900 flex items-center gap-1.5 border border-slate-100">
                            <IndicatorIcon name={ind.icon} className={ind.color} /> {ind.label}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-1">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[11px] font-medium text-slate-500 tracking-wider">Edge ML Confidence:</span>
                        <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className={`${incident.confidenceColor} h-full rounded-full`} style={{ width: `${incident.confidence}%` }}></div>
                        </div>
                        <span className={`text-xs font-mono font-bold ${incident.confidenceTextColor}`}>{incident.confidenceLabel}</span>
                      </div>
                      {incident.isFooterStatic ? (
                        <span className={`text-[11px] font-medium tracking-wider ${incident.footerStyle}`}>{incident.footerAction}</span>
                      ) : (
                        <span className={`text-[11px] flex items-center gap-1 tracking-wider ${incident.footerStyle}`}>
                          {isSelected ? 'Focused in Inspector' : incident.footerAction} {isSelected ? <ArrowRight size={14} /> : <ChevronRight size={14} />}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}

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
                  <span className="text-xs font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded">{selectedIncident.incidentId}</span>
                </div>
                <span className={`text-xs font-medium block ${selectedIncident.classificationColor}`}>
                  {selectedIncident.classification}
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
                <span className={`text-xs font-mono font-bold ${selectedIncident.mlConfidenceColor}`}>{selectedIncident.mlConfidence} Confidence</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                <span>Classifier: {selectedIncident.classifier}</span>
                <span>Latency: {selectedIncident.latency}</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className={`${selectedIncident.mlBarColor} h-full rounded-full transition-all duration-500`} style={{ width: selectedIncident.mlBarWidth }}></div>
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
                    {selectedIncident.translation 
                      ? 'Hinglish message veiled for child dignity. Click to unblur for legal audit & parent review.'
                      : 'Message veiled for child dignity. Click to unblur for legal audit & parent review.'
                    }
                  </p>
                </div>
                
                {/* Underlying Text Content */}
                <div className={`flex flex-col gap-2 transition-all duration-300 ${isShrouded ? 'filter blur-md scale-95 opacity-40' : 'scale-100 opacity-100'}`}>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-1">
                    <span className="text-xs font-mono text-red-600 font-semibold">Sender: {selectedIncident.sender} • Recipient: {selectedIncident.recipient}</span>
                    <span className="text-xs font-mono text-slate-500">{selectedIncident.messageType}</span>
                  </div>
                  <blockquote className="text-xs font-mono text-slate-900 italic bg-white p-3 rounded-lg border-l-2 border-red-500 shadow-sm leading-relaxed">
                    {selectedIncident.originalText}
                  </blockquote>
                  {selectedIncident.translation && (
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      <span className="font-semibold text-slate-900">English Translation:</span> {selectedIncident.translation}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1 tracking-wider">
                <CheckCircle size={12} className="text-emerald-600" />
                <span className="font-mono">Zero Cloud Persistence Protocol: Ephemeral transit only</span>
              </div>
            </div>

            {/* Recommended Parent Action Steps - Collapsible */}
            <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
              <button 
                onClick={() => setIsRecommendationOpen(!isRecommendationOpen)}
                className="flex items-center justify-between w-full text-left group"
              >
                <h4 className="text-[11px] font-semibold text-slate-900 uppercase tracking-wider">
                  Clinical Recommendation (Crisis Mitigation)
                </h4>
                <ChevronDown 
                  size={16} 
                  className={`text-slate-400 group-hover:text-slate-600 transition-transform duration-200 ${isRecommendationOpen ? 'rotate-180' : ''}`} 
                />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isRecommendationOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <ol className="flex flex-col gap-2.5">
                  {selectedIncident.recommendations.map((rec) => (
                    <li key={rec.step} className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                      <span className="h-5 w-5 rounded-full bg-white border border-slate-200 text-blue-600 font-bold flex items-center justify-center flex-shrink-0 text-[10px] shadow-sm">{rec.step}</span>
                      <span>
                        <strong>{rec.title}</strong>{' '}
                        {rec.code ? (
                          <>Block <code className="bg-white border border-slate-200 px-1 py-0.5 rounded text-slate-900 font-mono text-[10px]">{rec.code}</code> {rec.detail.replace(`Block ${rec.code} `, '')}</>
                        ) : (
                          rec.detail
                        )}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
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
