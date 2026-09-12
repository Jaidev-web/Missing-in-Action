'use client';

import React, { useState } from 'react';
import { Card, Switch, Button, Badge } from '../components/ui';
import { Smartphone, ShieldCheck, Activity, Cpu, Wifi, Zap, PowerOff, Battery, Network, AlertTriangle, Lock, ClipboardList, ShieldAlert, LayoutGrid } from 'lucide-react';

export function DevicesView() {
  const [autoRestart, setAutoRestart] = useState(true);
  const [bgTask, setBgTask] = useState(true);
  const [ephemeralWipe, setEphemeralWipe] = useState(true);
  const [tamperDetect, setTamperDetect] = useState(true);

  return (
    <div className="max-w-[1440px] mx-auto p-4 lg:p-8 flex flex-col gap-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            Telemetry Fleet Orchestration • V2.4.8-K8S
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Protected Devices & Client Nodes</h1>
          <p className="text-slate-500 text-sm mt-1 max-w-3xl">Real-time edge telemetry, accessibility daemon health, and client node status across linked guardian devices. Zero-retention child safety monitoring with on-device NLP vectorization.</p>
        </div>
        <div className="flex flex-col gap-2 shrink-0 w-full md:w-auto">
          <Button variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100 gap-2 font-semibold shadow-sm w-full md:w-auto">
            <Activity size={16} /> Force Heartbeat Sync
          </Button>
          <Button variant="primary" className="gap-2 font-semibold shadow-sm w-full md:w-auto">
            <span className="text-lg leading-none">+</span> Pair New Device
          </Button>
        </div>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-slate-200 flex flex-col justify-between min-h-[140px]">
          <div className="flex items-start justify-between">
            <span className="text-sm font-semibold text-slate-700">Total Linked Nodes</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
               <Smartphone size={18} />
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold text-slate-900 mb-1 tracking-tight">3 <span className="text-xs font-medium text-slate-500 ml-1">Registered</span></div>
            <div className="text-xs font-medium text-emerald-600 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> 2 Guarding • 1 Standby / Off-grid</div>
          </div>
        </Card>
        
        <Card className="p-4 border-emerald-200 bg-emerald-50/10 shadow-[0_0_15px_rgba(16,185,129,0.05)] flex flex-col justify-between min-h-[140px]">
          <div className="flex items-start justify-between">
            <span className="text-sm font-semibold text-slate-700">Daemon Integrity</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
               <ShieldCheck size={18} />
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold text-emerald-600 mb-1 tracking-tight">100% <span className="text-xs font-medium text-slate-500 ml-1">Service SLA</span></div>
            <div className="text-xs font-medium text-emerald-600 flex items-center gap-1.5"><ShieldCheck size={14} /> Zero battery kills detected</div>
          </div>
        </Card>

        <Card className="p-4 border-slate-200 flex flex-col justify-between min-h-[140px]">
          <div className="flex items-start justify-between">
            <span className="text-sm font-semibold text-slate-700">Monitored App Hooks</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
               <LayoutGrid size={18} />
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold text-slate-900 mb-1 tracking-tight">8 <span className="text-xs font-medium text-slate-500 ml-1">Active Sandbox Hooks</span></div>
            <div className="text-xs font-mono text-slate-500 truncate">WhatsApp, IG, Roblox, Discord +4</div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
               <div className="h-full bg-blue-600 rounded-full w-[80%]"></div>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-slate-200 flex flex-col justify-between min-h-[140px]">
          <div className="flex items-start justify-between">
            <span className="text-sm font-semibold text-slate-700">Edge AI Vectorizer</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
               <Cpu size={18} />
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-1 tracking-tight">Active <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded ml-1 uppercase">FastAPI + XGB</span></div>
            <div className="text-xs font-medium text-blue-700 flex items-center gap-1.5"><ShieldCheck size={14} /> Zero persistent text cache</div>
          </div>
        </Card>
      </div>

      {/* Active Client Nodes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Smartphone size={20} className="text-slate-400" />
            <h2 className="text-lg font-semibold text-slate-900">Active Client Nodes (3 Linked)</h2>
          </div>
          <span className="text-xs font-mono text-slate-400">Last global heartbeat received 4s ago</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Node 1: Primary */}
          <Card className="flex flex-col border-emerald-200 bg-white shadow-sm overflow-hidden min-h-[480px]">
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div className="flex gap-4">
                  <div className="w-10 h-16 bg-slate-100 rounded-lg border-2 border-slate-300 relative shrink-0">
                    <div className="absolute inset-x-2 top-1 h-1 bg-slate-200 rounded-full"></div>
                    <div className="absolute inset-2 top-3 bottom-3 bg-blue-50/50 rounded-sm border border-blue-100 flex items-center justify-center">
                      <ShieldCheck size={16} className="text-emerald-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg leading-tight">Aarav's<br/>Samsung Galaxy<br/>A54</h3>
                    <div className="text-xs text-slate-500 mt-1">Primary child device •<br/>SM-A546E/DS</div>
                  </div>
                </div>
                <Badge variant="success" className="bg-emerald-50 text-emerald-700 border-emerald-200 whitespace-nowrap"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Online & Guarding</Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-4 bg-slate-50/80 rounded-lg p-3 text-xs border border-slate-100">
                <div>
                  <div className="text-slate-500 mb-1">OS / Runtime</div>
                  <div className="font-bold text-slate-900 leading-tight">Android 14<br/><span className="text-[10px] font-normal text-slate-500">OneUI 6.1</span></div>
                </div>
                <div>
                  <div className="text-slate-500 mb-1">Battery Cell</div>
                  <div className="font-bold text-slate-900 flex items-start gap-1">
                    <Zap size={14} className="mt-0.5 shrink-0 text-emerald-600" />
                    <span className="leading-tight">78%<br/>Charging<br/><span className="text-[10px] font-semibold text-emerald-600">Optimal temp 31°C</span></span>
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 mb-1">Last Ping</div>
                  <div className="font-bold text-slate-900 leading-tight">8s ago<br/><span className="text-[10px] font-normal text-slate-500">RTT 24ms<br/>(5G)</span></div>
                </div>
              </div>

              <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-3 mb-5 flex gap-3">
                <ShieldCheck size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-800">Daemon Service: Unrestricted</h4>
                  <p className="text-[11px] text-emerald-700/80 leading-snug mt-0.5">Samsung Knox Battery Optimization bypassed via Device Owner enrollment. Crash guard auto-revives daemon within 250ms.</p>
                </div>
              </div>

              <div className="mb-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Intercepted App Packages</span>
                  <span className="text-[10px] text-slate-500">4 Active Hooks</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-emerald-50 border border-emerald-100 text-slate-700 text-[11px] px-2 py-1 rounded-md font-medium flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> WhatsApp <span className="opacity-60 text-[9px] font-mono">v2.24</span></span>
                  <span className="bg-emerald-50 border border-emerald-100 text-slate-700 text-[11px] px-2 py-1 rounded-md font-medium flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Instagram Direct <span className="opacity-60 text-[9px] font-mono">v312</span></span>
                  <span className="bg-emerald-50 border border-emerald-100 text-slate-700 text-[11px] px-2 py-1 rounded-md font-medium flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Roblox <span className="opacity-60 text-[9px] font-mono">v2.6</span></span>
                  <span className="bg-emerald-50 border border-emerald-100 text-slate-700 text-[11px] px-2 py-1 rounded-md font-medium flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Discord</span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 mt-auto">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Edge Classification Pipeline</div>
                <div className="flex justify-between items-start mb-2">
                  <div className="text-xs font-semibold text-slate-700 leading-tight">Regex Tier 1 + XGBoost Classifier</div>
                  <div className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 text-right leading-tight">ON-DEVICE<br/>RUNTIME</div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Inference Latency: 12ms</span>
                  <span>Zero Remote Audio/Screen Uploads</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-3">
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 text-xs h-8 bg-white">Run Diag</Button>
                <Button variant="outline" className="flex-1 text-xs h-8 bg-white">App Hooks</Button>
                <Button variant="outline" className="flex-1 text-xs h-8 bg-white">Node Logs</Button>
              </div>
              <Button variant="outline" className="w-full text-red-600 border-red-200 bg-red-50 hover:bg-red-100 font-semibold gap-2">
                <Smartphone size={16} /> Trigger Emergency Lockdown
              </Button>
            </div>
          </Card>

          {/* Node 2: Tablet */}
          <Card className="flex flex-col border-emerald-200 bg-white shadow-sm overflow-hidden min-h-[480px]">
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div className="flex gap-4">
                  <div className="w-12 h-16 bg-slate-100 rounded-lg border-2 border-slate-300 relative shrink-0">
                    <div className="absolute inset-x-3 top-1 h-1 bg-slate-200 rounded-full"></div>
                    <div className="absolute inset-2 top-3 bottom-3 bg-blue-50/50 rounded-sm border border-blue-100 flex items-center justify-center">
                      <ShieldCheck size={16} className="text-emerald-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg leading-tight">Aarav's<br/>Lenovo Tab<br/>M10</h3>
                    <div className="text-xs text-slate-500 mt-1">Study & Gaming<br/>Tablet • TB-328FU</div>
                  </div>
                </div>
                <Badge variant="success" className="bg-emerald-50 text-emerald-700 border-emerald-200 whitespace-nowrap"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Online & Guarding</Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-4 bg-slate-50/80 rounded-lg p-3 text-xs border border-slate-100">
                <div>
                  <div className="text-slate-500 mb-1">OS / Runtime</div>
                  <div className="font-bold text-slate-900 leading-tight">Android 13<br/><span className="text-[10px] font-normal text-slate-500">ZUI 15</span></div>
                </div>
                <div>
                  <div className="text-slate-500 mb-1">Battery Cell</div>
                  <div className="font-bold text-slate-900 flex items-start gap-1">
                    <Battery size={14} className="mt-0.5 shrink-0 text-emerald-600" />
                    <span className="leading-tight">92%<br/>Clean<br/><span className="text-[10px] font-normal text-slate-500">Drain: 1.2%/hr</span></span>
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 mb-1">Last Ping</div>
                  <div className="font-bold text-slate-900 leading-tight">42s ago<br/><span className="text-[10px] font-normal text-slate-500">Wi-Fi (Home Mesh)</span></div>
                </div>
              </div>

              <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-3 mb-5 flex gap-3">
                <ShieldCheck size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-800">Daemon Service: Active</h4>
                  <p className="text-[11px] text-emerald-700/80 leading-snug mt-0.5">Accessibility Daemon bound and active. Scheduled night lockout policy programmed for 21:30 IST.</p>
                </div>
              </div>

              <div className="mb-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Intercepted App Packages</span>
                  <span className="text-[10px] text-slate-500">3 Active Hooks</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-emerald-50 border border-emerald-100 text-slate-700 text-[11px] px-2 py-1 rounded-md font-medium flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> YouTube Kids</span>
                  <span className="bg-emerald-50 border border-emerald-100 text-slate-700 text-[11px] px-2 py-1 rounded-md font-medium flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Roblox</span>
                  <span className="bg-slate-100 border border-slate-200 text-slate-600 text-[11px] px-2 py-1 rounded-md font-medium flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> Chrome Sandbox</span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 mt-auto">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Edge Classification Pipeline</div>
                <div className="flex justify-between items-start mb-2">
                  <div className="text-xs font-semibold text-slate-700 leading-tight">Lightweight Regex Parser</div>
                  <div className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 text-right leading-tight">ON-DEVICE<br/>RUNTIME</div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Inference Latency: 4ms</span>
                  <span>Local Whitelist Cached</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-3">
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 text-xs h-8 bg-white">Run Diag</Button>
                <Button variant="outline" className="flex-1 text-xs h-8 bg-white">App Hooks</Button>
                <Button variant="outline" className="flex-1 text-xs h-8 bg-white">Node Logs</Button>
              </div>
              <Button variant="outline" className="w-full text-slate-700 font-semibold gap-2 bg-white">
                <Lock size={16} /> Set Sleep Mode Lock
              </Button>
            </div>
          </Card>

          {/* Node 3: Secondary Offline */}
          <Card className="flex flex-col border-amber-200 bg-white shadow-sm overflow-hidden min-h-[480px]">
            <div className="p-5 flex-1 flex flex-col opacity-90 hover:opacity-100 transition-opacity">
              <div className="flex items-start justify-between mb-6">
                <div className="flex gap-4">
                  <div className="w-10 h-16 bg-slate-100 rounded-lg border-2 border-slate-300 relative shrink-0 opacity-70">
                    <div className="absolute inset-x-2 top-1 h-1 bg-slate-200 rounded-full"></div>
                    <div className="absolute inset-2 top-3 bottom-3 bg-slate-200 rounded-sm border border-slate-300 flex items-center justify-center">
                      <PowerOff size={16} className="text-slate-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg leading-tight">Ananya's Redmi<br/>Note 12</h3>
                    <div className="text-xs text-slate-500 mt-1">Secondary child node •<br/>23021RAA2Y</div>
                  </div>
                </div>
                <Badge variant="warning" className="bg-amber-50 text-amber-800 border-amber-200 whitespace-nowrap"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> Idle / Standby</Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-4 bg-slate-50/80 rounded-lg p-3 text-xs border border-slate-100">
                <div>
                  <div className="text-slate-500 mb-1">OS / Runtime</div>
                  <div className="font-bold text-slate-900 leading-tight">Android 13<br/><span className="text-[10px] font-normal text-slate-500">MIUI 14 Global</span></div>
                </div>
                <div>
                  <div className="text-slate-500 mb-1">Battery Cell</div>
                  <div className="font-bold text-slate-900 flex items-start gap-1">
                    <Battery size={14} className="mt-0.5 shrink-0 text-amber-500" />
                    <span className="leading-tight">45%<br/>Standby<br/><span className="text-[10px] font-normal text-amber-600">Sleep scheduled</span></span>
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 mb-1">Last Ping</div>
                  <div className="font-bold text-slate-900 leading-tight">14m ago<br/><span className="text-[10px] font-bold text-amber-600 uppercase">Deep Sleep</span></div>
                </div>
              </div>

              <div className="bg-amber-50/50 border border-amber-100 rounded-lg p-3 mb-5 flex gap-3">
                <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-amber-800">Heartbeat Pending Re-auth</h4>
                  <p className="text-[11px] text-amber-700/80 leading-snug mt-0.5">MIUI Doze state triggered an aggressive sleep routine. Device needs ping payload or child unlock to verify daemon persistence.</p>
                </div>
              </div>

              <div className="mb-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Configured Package Hooks</span>
                  <span className="text-[10px] text-slate-500">3 Hooks (Paused)</span>
                </div>
                <div className="flex flex-wrap gap-2 opacity-60">
                  <span className="bg-slate-100 border border-slate-200 text-slate-600 text-[11px] px-2 py-1 rounded-md font-medium flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> BGMI (Battlegrounds)</span>
                  <span className="bg-slate-100 border border-slate-200 text-slate-600 text-[11px] px-2 py-1 rounded-md font-medium flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> Telegram</span>
                  <span className="bg-slate-100 border border-slate-200 text-slate-600 text-[11px] px-2 py-1 rounded-md font-medium flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> Messages (SMS)</span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 mt-auto opacity-70">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Edge Classification Pipeline</div>
                <div className="flex justify-between items-start mb-2">
                  <div className="text-xs font-semibold text-slate-700 leading-tight">Tier 1 Regex Parser</div>
                  <div className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100 text-right uppercase">HIBERNATED</div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Awaiting push wakeup</span>
                  <span>Zero Log Retention Enforced</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex gap-3">
              <Button variant="outline" className="flex-1 text-blue-600 font-semibold gap-2 bg-white border-slate-200 hover:bg-slate-50">
                <Network size={16} /> Ping Node
              </Button>
              <Button variant="primary" className="flex-1 font-semibold gap-2">
                <Lock size={16} /> Re-authenticate
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Policy section */}
      <div className="mt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Edge Node Daemon Policy & Enforcement</h2>
              <p className="text-sm text-slate-500 mt-1 max-w-2xl">Cryptographic security posture and system permission rules applied immediately to all connected Android nodes.</p>
            </div>
          </div>
          <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[10px] uppercase font-bold shrink-0 self-start md:self-auto px-3 py-1">PO-POL-ENFORCED-7729</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Toggle 1 */}
          <Card className="p-6 flex items-start gap-4 border-slate-200 bg-white hover:border-blue-200 transition-colors cursor-pointer group">
             <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-blue-600 shrink-0 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
               <PowerOff size={20} />
             </div>
             <div className="flex-1 min-w-0">
               <div className="flex items-start justify-between mb-2">
                 <h3 className="text-base font-semibold text-slate-900 tracking-tight">Auto-restart Daemon on Boot</h3>
                 <Switch checked={autoRestart} onChange={setAutoRestart} />
               </div>
               <p className="text-xs text-slate-500 leading-relaxed mb-4">Spawns SafeNET persistent worker service automatically upon device cold-boot and restarts within 250ms if terminated by aggressive OEM memory cleaners.</p>
               <p className="text-xs font-mono font-medium text-emerald-600">Status: Enforced via Knox / Device Admin</p>
             </div>
          </Card>

          {/* Toggle 2 */}
          <Card className="p-6 flex items-start gap-4 border-slate-200 bg-white hover:border-blue-200 transition-colors cursor-pointer group">
             <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-blue-600 shrink-0 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
             </div>
             <div className="flex-1 min-w-0">
               <div className="flex items-start justify-between mb-2">
                 <h3 className="text-base font-semibold text-slate-900 tracking-tight">Background Task Exemption</h3>
                 <Switch checked={bgTask} onChange={setBgTask} />
               </div>
               <p className="text-xs text-slate-500 leading-relaxed mb-4">Whitelists SafeNET binary from Android Power Optimization, Doze mode network cuts, and vendor-specific memory kills (MIUI, Samsung OneUI).</p>
               <p className="text-xs font-mono font-medium text-emerald-600">Status: Verified active on 3/3 devices</p>
             </div>
          </Card>
          
          {/* Toggle 3 */}
          <Card className="p-6 flex items-start gap-4 border-slate-200 bg-white hover:border-blue-200 transition-colors cursor-pointer group">
             <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-blue-600 shrink-0 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
               <ClipboardList size={20} />
             </div>
             <div className="flex-1 min-w-0">
               <div className="flex items-start justify-between mb-2">
                 <h3 className="text-base font-semibold text-slate-900 tracking-tight">Ephemeral Cache Wipe Interval</h3>
                 <Switch checked={ephemeralWipe} onChange={setEphemeralWipe} />
               </div>
               <p className="text-xs text-slate-500 leading-relaxed mb-4">Guarantees strict zero-retention compliance. In-flight message strings are parsed solely in RAM, transformed into anonymous embeddings, and wiped instantly.</p>
               <p className="text-xs font-mono font-medium text-slate-600 flex items-center gap-2">Interval: <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded">Immediate on Vectorization</span></p>
             </div>
          </Card>

          {/* Toggle 4 */}
          <Card className="p-6 flex items-start gap-4 border-slate-200 bg-white hover:border-blue-200 transition-colors cursor-pointer group">
             <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-blue-600 shrink-0 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
               <ShieldAlert size={20} />
             </div>
             <div className="flex-1 min-w-0">
               <div className="flex items-start justify-between mb-2">
                 <h3 className="text-base font-semibold text-slate-900 tracking-tight">Tamper Detection & SOS Relay</h3>
                 <Switch checked={tamperDetect} onChange={setTamperDetect} />
               </div>
               <p className="text-xs text-slate-500 leading-relaxed mb-4">Detects Accessibility Service revocation, SIM removal, or ADB debug connection. Immediately issues high-priority silent notification to primary guardian.</p>
               <p className="text-xs font-mono font-medium text-emerald-600">Status: Silent SOS Alert Armed</p>
             </div>
          </Card>
        </div>
      </div>

    </div>
  );
}
