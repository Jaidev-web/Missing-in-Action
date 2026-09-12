'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, Switch, Button, Badge } from '../components/ui';
import { Cpu, ShieldAlert, Lock, Smartphone, Users, HelpCircle, ArrowRight, ShieldCheck, Phone, CheckCircle, Activity, AlertTriangle, EyeOff, Fingerprint, Clock, ChevronDown, MessageSquare, Camera, MessageCircle, Gamepad2, Ghost, Share2, Cloud, Save } from 'lucide-react';

export function SettingsView() {
  const [activeSection, setActiveSection] = useState('edge_ai');
  const [edgeSensitivity, setEdgeSensitivity] = useState(75);
  const [hinglishDict, setHinglishDict] = useState(true);
  const [sosHandshake, setSosHandshake] = useState(true);

  return (
    <div className="max-w-[1440px] mx-auto p-4 lg:p-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Platform Settings & Safety Thresholds</h1>
            <Badge variant="outline" className="font-mono text-[10px] uppercase text-slate-500 bg-white">Config Rev: 2025.4-IN</Badge>
          </div>
          <p className="text-slate-500 text-sm">Configure on-device edge AI models, dual-language NLP parameters, local child welfare hotline escalations, and zero-retention guardian audit controls.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Button variant="outline">Discard Changes</Button>
          <Button variant="primary" className="gap-2">
            <CheckCircle size={16} />
            Save Preferences
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Navigation & Widgets */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Section Nav Card */}
          <Card className="p-2 overflow-hidden flex flex-col gap-1">
            <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Configuration Sections</div>
            
            <button onClick={() => setActiveSection('edge_ai')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left transition-colors ${activeSection === 'edge_ai' ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-slate-50 text-slate-700'}`}>
              <div className="flex items-center gap-3">
                <Cpu size={18} className={activeSection === 'edge_ai' ? 'text-blue-600' : 'text-slate-400'} />
                Edge AI & Hinglish NLP
              </div>
              <Badge variant="outline" className={`${activeSection === 'edge_ai' ? 'bg-white text-slate-700 border-slate-200' : 'bg-white text-slate-500'} text-[10px]`}>v3.2</Badge>
            </button>
            
            <button onClick={() => setActiveSection('emergency')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left transition-colors ${activeSection === 'emergency' ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-slate-50 text-slate-700'}`}>
              <div className="flex items-center gap-3">
                <ShieldAlert size={18} className={activeSection === 'emergency' ? 'text-blue-600' : 'text-slate-400'} />
                Emergency & Welfare (1098)
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1"></div>
            </button>
            
            <button onClick={() => setActiveSection('privacy')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left transition-colors ${activeSection === 'privacy' ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-slate-50 text-slate-700'}`}>
              <div className="flex items-center gap-3">
                <Lock size={18} className={activeSection === 'privacy' ? 'text-blue-600' : 'text-slate-400'} />
                Privacy & Zero-Retention
              </div>
              <Lock size={14} className="text-emerald-500 mr-0.5" />
            </button>
            
            <button onClick={() => setActiveSection('apps')} className={`w-full flex flex-col items-start px-3 py-2.5 rounded-lg text-sm text-left transition-colors ${activeSection === 'apps' ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-slate-50 text-slate-700'}`}>
              <div className="flex items-center gap-3 mb-1">
                <Smartphone size={18} className={activeSection === 'apps' ? 'text-blue-600' : 'text-slate-400'} />
                Monitored Applications
              </div>
              <div className={`pl-7 text-xs ${activeSection === 'apps' ? 'text-blue-500' : 'text-slate-400'} flex justify-between w-full`}>
                <span>5 Active</span>
              </div>
            </button>
            
            <button onClick={() => setActiveSection('guardians')} className={`w-full flex flex-col items-start px-3 py-2.5 rounded-lg text-sm text-left transition-colors ${activeSection === 'guardians' ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-slate-50 text-slate-700'}`}>
              <div className="flex items-center gap-3 mb-1">
                <Users size={18} className={activeSection === 'guardians' ? 'text-blue-600' : 'text-slate-400'} />
                Multi-Guardian Authority
              </div>
              <div className={`pl-7 text-xs ${activeSection === 'guardians' ? 'text-blue-500' : 'text-slate-400'}`}>2 Peers</div>
            </button>
          </Card>

          {/* Compliance Widget */}
          <Card className="p-5 border-emerald-100 bg-emerald-50/30">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">DPDP Act Compliant</h3>
                <p className="text-xs text-slate-500 mt-0.5">India Digital Data Protection 2023</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              All NLP tokens, screen heuristics, and chat telemetry are scrubbed locally on Aarav's Galaxy A54 neural engine. No plaintext data ever transmits across public clouds.
            </p>
            <div className="flex items-center justify-between text-[11px] font-medium text-emerald-700 bg-white border border-emerald-100 rounded px-2 py-1">
              <span>Local NPU Core</span>
              <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>Operational • 1.4W</span>
            </div>
          </Card>

          {/* Triage Guidance Widget */}
          <Card className="p-5">
             <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                <HelpCircle size={18} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Need Triage Guidance?</h3>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Consult clinical psychologists and cyber-forensics specialists vetted by NCPCR for high-anxiety child threat situations.
            </p>
            <div className="flex items-center justify-between">
              <Link href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                Read Protocol Manual <ArrowRight size={14} />
              </Link>
              <Badge variant="outline" className="text-[10px] text-slate-400 bg-slate-50">v2.8-SAFE</Badge>
            </div>
          </Card>

        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Edge AI Card */}
          {activeSection === 'edge_ai' && (
          <Card className="divide-y divide-slate-100">
            {/* Card Header Area */}
            <div className="p-5 flex items-start gap-4 bg-slate-50/50 rounded-t-xl">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <Cpu size={24} strokeWidth={2} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                   <h2 className="text-lg font-semibold text-slate-900 tracking-tight">Edge AI & Hinglish Detection Sensitivity</h2>
                   <Badge variant="success" className="text-[10px]">On-Device NPU</Badge>
                </div>
                <p className="text-sm text-slate-500">On-device transformer inference configuration and slang vector mapping</p>
              </div>
            </div>

            {/* Slider Section */}
            <div className="p-5">
               <div className="flex items-center justify-between mb-3">
                 <span className="text-sm font-semibold text-slate-700">Detection Aggressiveness</span>
                 <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">High (Recommended for Adolescents)</span>
               </div>
               <div className="relative h-2 bg-slate-100 rounded-full mb-2">
                 <div className="absolute top-0 left-0 h-full bg-blue-600 rounded-full" style={{width: `${edgeSensitivity}%`}}></div>
                 <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-600 rounded-full cursor-pointer shadow" style={{left: `calc(${edgeSensitivity}% - 8px)`}}></div>
               </div>
               <div className="flex justify-between text-[11px] font-medium text-slate-400 mt-2">
                 <span>Balanced</span>
                 <span>Strict (Default)</span>
                 <span className="text-blue-600">High Sensitivity</span>
               </div>
               <p className="text-xs text-slate-500 mt-3 leading-relaxed">High sensitivity detects latent grooming markers, early relational boundary violations, and nocturnal behavioral surges with zero false suppression.</p>
            </div>

            {/* Hinglish Toggle */}
            <div className="p-5 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-slate-900">Hinglish Slang & Code-Mixed NLP Dictionary</h3>
                  <Badge variant="outline" className="text-[10px] bg-slate-50">v3.2 Model</Badge>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed max-w-[90%]">25,000+ localized colloquial phrases, Devanagari transliterations, and concealed youth slang (e.g., 'katti', 'babu/shona grooming', 'secret milna').</p>
              </div>
              <Switch checked={hinglishDict} onChange={setHinglishDict} />
            </div>

            {/* Active Classifiers Grid */}
            <div className="p-5 bg-slate-50/50">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Active Threat Neural Classifiers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Classifier 1 */}
                <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-200">
                  <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-600" />
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-sm font-semibold text-slate-900">Predatory Grooming & Secrecy</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">Flags demands for private handles, delete-after-read apps, and elder authority coercion.</p>
                  </div>
                </div>
                {/* Classifier 2 */}
                <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-200">
                  <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-600" />
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-sm font-semibold text-slate-900">Cyberbullying & Mob Harassment</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">Monitors sudden targeted group exclusions, disparaging slurs, and reputation threats.</p>
                  </div>
                </div>
                {/* Classifier 3 */}
                <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-200">
                  <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-600" />
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-sm font-semibold text-slate-900">Contact & Geolocation Solicitation</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">Auto-scrambles GPS pinpoint and addresses before transmission to strangers.</p>
                  </div>
                </div>
                {/* Classifier 4 */}
                <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-200">
                  <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-600" />
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-sm font-semibold text-slate-900">Self-harm & Distress Signals</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">Triggers high-priority crisis screen override and guardian emergency audio handshake.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart Area */}
            <div className="p-5 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-slate-900 mb-1">On-Device Inference Distribution</h3>
                <p className="text-xs text-slate-500 mb-4 max-w-sm">Synthetic benchmark based on Aarav's past 1,420 inspected interaction envelopes.</p>
                <div className="flex items-center gap-4 text-[11px] font-medium text-slate-600">
                   <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-blue-600"></div> Benign (98.4%)</div>
                   <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-red-500"></div> Flagged (1.6%)</div>
                </div>
              </div>
              <div className="h-16 flex items-end gap-1 flex-1 max-w-[200px]">
                 {/* Mock Chart Bars */}
                 {[40, 60, 30, 80, 20, 100, 45, 10, 70, 35, 90, 50, 15, 65, 85].map((val, i) => (
                    <div key={i} className={`w-full rounded-t-sm ${i === 5 || i === 10 || i === 14 ? 'bg-red-500' : 'bg-blue-200'}`} style={{height: `${val}%`}}></div>
                 ))}
              </div>
            </div>
          </Card>
          )}

          {/* Emergency Escalation Card */}
          {activeSection === 'emergency' && (
          <Card className="divide-y divide-slate-100">
             <div className="p-5 flex items-start gap-4 bg-red-50/30 rounded-t-xl border-b-2 border-red-500/20">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                <ShieldAlert size={24} strokeWidth={2} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                   <h2 className="text-lg font-semibold text-slate-900 tracking-tight">Emergency Escalation & Authority Integration</h2>
                   <Badge variant="critical" className="text-[10px] bg-white"><div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div> 1098 Active</Badge>
                </div>
                <p className="text-sm text-slate-500">Interfacing with statutory Indian child protection systems and verified hotlines</p>
              </div>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* Childline Box */}
               <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
                 <div className="flex items-start justify-between mb-3">
                   <div className="flex items-center gap-2">
                     <Phone size={16} className="text-blue-600" />
                     <h3 className="text-sm font-semibold text-slate-900">Childline India (MoWCD)</h3>
                   </div>
                   <div className="text-right leading-tight">
                     <span className="block text-sm font-bold text-emerald-600">1098</span>
                     <span className="text-[10px] font-medium text-emerald-600 uppercase">Connected</span>
                   </div>
                 </div>
                 <p className="text-xs text-slate-500 mb-4 leading-relaxed h-10">Immediate SOS auto-connects to the nearest designated Child Welfare Committee (CWC) triage center in Maharashtra.</p>
                 <div className="flex justify-between items-center text-[11px] border-t border-slate-200 pt-3">
                    <span className="text-slate-500">Response Latency SLA: &lt; 90s</span>
                    <span className="font-semibold text-blue-600">Ping Trunk</span>
                 </div>
               </div>

               {/* Cyber Cell Box */}
               <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
                 <div className="flex items-start justify-between mb-3">
                   <div className="flex items-center gap-2">
                     <ShieldCheck size={16} className="text-slate-700" />
                     <h3 className="text-sm font-semibold text-slate-900">State Cyber Cell API</h3>
                   </div>
                   <div className="text-right leading-tight">
                     <span className="block text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">Portal v4.1</span>
                   </div>
                 </div>
                 <p className="text-xs text-slate-500 mb-4 leading-relaxed h-10">Pre-formats cyber-bullying and extortion evidence hashes directly for the National Cyber Crime Reporting Portal (cybercrime.gov.in).</p>
                 <div className="flex justify-between items-center text-[11px] border-t border-slate-200 pt-3">
                    <span className="text-slate-500">Escalation Threshold: <span className="font-semibold text-slate-700">Critical Only</span></span>
                    <span className="font-semibold text-blue-600">Verify Token</span>
                 </div>
               </div>
            </div>

            <div className="p-5 flex items-start justify-between gap-4 bg-amber-50/20">
               <div className="flex items-start gap-3">
                 <ShieldCheck size={20} className="text-amber-500 mt-0.5 shrink-0" />
                 <div>
                   <h3 className="text-sm font-semibold text-slate-900">SOS Dispatch Double-Handshake Guard</h3>
                   <p className="text-xs text-slate-500 leading-relaxed mt-1 max-w-xl">Requires 2-step confirmation (Fingerprint or PIN challenge) before triggering official distress dispatches to emergency authorities to eliminate false alarms.</p>
                 </div>
               </div>
               <Switch checked={sosHandshake} onChange={setSosHandshake} />
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-900">Emergency Guardian Dispatch Hierarchy</h3>
                <button className="text-[11px] font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"><span className="text-lg leading-none">+</span> Add Secondary Contact</button>
              </div>
              
              <div className="space-y-3">
                {/* Guardian 1 */}
                <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white">
                  <div className="flex items-center gap-3">
                     <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 shrink-0">
                        <Image src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Rajesh Sharma" fill sizes="40px" className="object-cover" />
                     </div>
                     <div className="leading-tight">
                        <div className="flex items-center gap-2">
                           <span className="text-sm font-semibold text-slate-900">Rajesh Sharma</span>
                           <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">Primary Guardian</span>
                        </div>
                        <span className="text-xs text-slate-500 mt-0.5 block">+91 98765 43210 • WhatsApp + Push Fallback</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Verified</span>
                     <button className="text-slate-400 hover:text-slate-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                     </button>
                  </div>
                </div>

                {/* Guardian 2 */}
                <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white">
                  <div className="flex items-center gap-3">
                     <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 shrink-0">
                        <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Sunita Sharma" fill sizes="40px" className="object-cover" />
                     </div>
                     <div className="leading-tight">
                        <div className="flex items-center gap-2">
                           <span className="text-sm font-semibold text-slate-900">Sunita Sharma</span>
                           <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">Secondary Guardian</span>
                        </div>
                        <span className="text-xs text-slate-500 mt-0.5 block">+91 98765 43211 • Cellular SMS Fallback</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Verified</span>
                     <button className="text-slate-400 hover:text-slate-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                     </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          )}

          {/* Privacy Placeholder */}
          {activeSection === 'privacy' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 shrink-0 border border-slate-200">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">Privacy & Data Retention Guarantee</h2>
                  <p className="text-[13px] text-slate-500 mt-0.5">Zero-knowledge proof architecture protecting family dignity and child autonomy</p>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-900 border-none font-medium px-3 py-1">Zero-Cloud<br/>State</Badge>
            </div>
            
            <Card className="p-5 bg-slate-50/70 border-slate-200 shadow-none">
               <div className="flex items-start gap-4">
                 <div className="text-blue-600 mt-0.5"><EyeOff size={20} /></div>
                 <div className="flex-1">
                   <div className="flex items-center justify-between mb-1.5">
                     <div className="flex items-center gap-2">
                       <h3 className="font-semibold text-slate-900 text-[15px]">Zero Cloud Persistence Enforcement</h3>
                       <Badge className="bg-white text-blue-600 border border-blue-100 font-semibold text-[10px]">Mandatory</Badge>
                     </div>
                     <div className="flex items-center gap-1.5 text-slate-600 font-semibold text-xs">
                       <Lock size={14} /> Immutable
                     </div>
                   </div>
                   <p className="text-[13px] text-slate-500 leading-relaxed pr-8">
                     Screenshots, keystrokes, and chat text streams are never written to permanent disk storage or synced to remote servers. Locked to ensure non-invasive safety.
                   </p>
                 </div>
               </div>
            </Card>
            
            <Card className="p-5 border-slate-200 shadow-none flex items-center justify-between">
               <div className="flex items-start gap-4 flex-1 pr-6">
                 <div className="text-blue-600 mt-0.5"><Fingerprint size={20} /></div>
                 <div>
                   <h3 className="font-semibold text-slate-900 text-[15px] mb-1.5">Encrypted Snippet Unblur Authentication</h3>
                   <p className="text-[13px] text-slate-500 leading-relaxed">
                     Require Biometric / Master Guardian PIN challenge before unblurring any conversational threat context on this dashboard. Auto-shrouds after 30 seconds.
                   </p>
                 </div>
               </div>
               <Switch checked={true} />
            </Card>

            <Card className="p-5 bg-slate-50/70 border-slate-200 shadow-none flex items-center justify-between">
               <div className="flex items-start gap-4 flex-1 pr-6">
                 <div className="text-slate-700 mt-0.5"><Clock size={20} /></div>
                 <div>
                   <h3 className="font-semibold text-slate-900 text-[15px] mb-1.5">Ephemeral Memory Auto-Purge Buffer</h3>
                   <p className="text-[13px] text-slate-500 leading-relaxed">
                     Micro-buffer duration before volatile RAM tokens are irreversibly overwritten via secure zeroization.
                   </p>
                 </div>
               </div>
               <div className="flex items-center bg-white border border-slate-200 rounded-md px-3 py-1.5 text-xs font-mono font-medium text-slate-700 shadow-sm whitespace-nowrap cursor-pointer hover:bg-slate-50">
                 20 Milliseconds (Recommended) <ChevronDown size={14} className="ml-2 text-slate-400" />
               </div>
            </Card>
          </div>
          )}

          {/* Apps Placeholder */}
          {activeSection === 'apps' && (
          <Card className="p-5 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 shrink-0 border border-slate-200">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">Monitored Applications Policy</h2>
                  <p className="text-[13px] text-slate-500 mt-0.5">Accessibility service hooks and real-time screen inspection rules</p>
                </div>
              </div>
              <Badge className="bg-emerald-50 text-emerald-600 border-none font-semibold">5 Apps Protected</Badge>
            </div>
            
            <div className="flex flex-col gap-3 mt-2">
              <div className="flex items-center justify-between bg-slate-50/70 border border-slate-200 rounded-xl p-4 transition-colors hover:bg-slate-50">
                <div className="flex items-start gap-4 flex-1 pr-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500 border border-emerald-100 shrink-0">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="font-semibold text-slate-900 text-[15px]">WhatsApp Messenger</h3>
                      <span className="text-[11px] font-mono text-slate-400">v2.24.8</span>
                    </div>
                    <p className="text-[13px] text-slate-500 leading-relaxed pr-2">Group chat link scans, unknown contact inbound filter, audio note sentiment</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-[12px] font-medium text-slate-500 text-right leading-tight">Zero<br/>Storage</div>
                  <Switch checked={true} />
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-50/70 border border-slate-200 rounded-xl p-4 transition-colors hover:bg-slate-50">
                <div className="flex items-start gap-4 flex-1 pr-4">
                  <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center text-rose-500 border border-rose-100 shrink-0">
                    <Instagram size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="font-semibold text-slate-900 text-[15px]">Instagram</h3>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Direct Messages</span>
                    </div>
                    <p className="text-[13px] text-slate-500 leading-relaxed pr-2">Disappearing image alerts, adult account solicitation blocker, van-mode audit</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-[12px] font-medium text-slate-500 text-right leading-tight">OCR<br/>Active</div>
                  <Switch checked={true} />
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-50/70 border border-slate-200 rounded-xl p-4 transition-colors hover:bg-slate-50">
                <div className="flex items-start gap-4 flex-1 pr-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500 border border-indigo-100 shrink-0">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="font-semibold text-slate-900 text-[15px]">Discord</h3>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Server & DM</span>
                    </div>
                    <p className="text-[13px] text-slate-500 leading-relaxed pr-2">External webhook interception, game guild channel groom detection</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-[12px] font-medium text-slate-500 text-right leading-tight">Real-Time<br/>Hook</div>
                  <Switch checked={true} />
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-50/70 border border-slate-200 rounded-xl p-4 transition-colors hover:bg-slate-50">
                <div className="flex items-start gap-4 flex-1 pr-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100 shrink-0">
                    <Gamepad2 size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="font-semibold text-slate-900 text-[15px]">Roblox</h3>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">In-Game Chat</span>
                    </div>
                    <p className="text-[13px] text-slate-500 leading-relaxed pr-2">Robux trade scams, off-platform Discord redirection, adult roleplay filtering</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-[12px] font-medium text-slate-500 text-right leading-tight">In-Game<br/>Overlay</div>
                  <Switch checked={true} />
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-50/70 border border-slate-200 rounded-xl p-4 transition-colors hover:bg-slate-50">
                <div className="flex items-start gap-4 flex-1 pr-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200 shrink-0">
                    <EyeOff size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="font-semibold text-slate-900 text-[15px]">Snapchat</h3>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Ephemeral Media</span>
                    </div>
                    <p className="text-[13px] text-slate-500 leading-relaxed pr-2">Snap Map precision geofence guard and anonymous add requests</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-[12px] font-medium text-slate-500 text-right leading-tight">Active<br/>Shield</div>
                  <Switch checked={true} />
                </div>
              </div>
            </div>
          </Card>
          )}

          {/* Guardians Placeholder */}
          {activeSection === 'guardians' && (
          <div className="flex flex-col gap-4">
            <Card className="p-5 flex flex-col gap-4 shadow-sm border-slate-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 shrink-0 border border-slate-200">
                    <Share2 size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 tracking-tight">Notification & Multi-Guardian Routing</h2>
                    <p className="text-[13px] text-slate-500 mt-0.5">Co-parent escalation trees, quiet hours, and critical audible overrides</p>
                  </div>
                </div>
                <Badge className="bg-emerald-50 text-emerald-600 border-none font-semibold">Dual-Key Active</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-slate-900 text-[15px] leading-tight">Audible Breakthrough<br/>Override</h3>
                      <Badge className="bg-red-500 text-white border-none font-bold rounded">DND<br/>Bypass</Badge>
                    </div>
                    <p className="text-[13px] text-slate-500 leading-relaxed mb-4">
                      High-severity alerts (Threat Score &gt; 85) will override Android/iOS 'Do Not Disturb' and silent profiles on guardian phones.
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-[13px] font-semibold text-slate-600">Volume: 100% Siren Burst</span>
                    <Switch checked={true} />
                  </div>
                </div>

                <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-slate-900 text-[15px] leading-tight">Quiet Hours Triage<br/>Window</h3>
                      <div className="bg-white border border-slate-200 rounded px-2 py-1 text-[11px] font-mono text-slate-600 font-semibold text-right leading-tight">
                        22:00 -<br/>06:00
                      </div>
                    </div>
                    <p className="text-[13px] text-slate-500 leading-relaxed mb-4">
                      Medium-risk cyberbullying alerts are queued for morning digest to prevent late-night guardian panic, unless repeated distress triggers.
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-[13px] font-semibold text-slate-600">Digest Delivered at 06:30 AM</span>
                    <Switch checked={true} />
                  </div>
                </div>
              </div>
            </Card>
          </div>
          )}

        </div>
      </div>
    </div>
  );
}
