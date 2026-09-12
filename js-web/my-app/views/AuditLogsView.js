import React from 'react';
import { Card, Badge, Button } from '../components/ui';
import { ShieldCheck, Lock, Search, Smartphone, ShieldAlert, AlertTriangle, Eye, EyeOff, Activity, Cpu, Code } from 'lucide-react';

export function AuditLogsView() {
  return (
    <div className="max-w-[1440px] mx-auto p-4 lg:p-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span className="text-blue-600 font-bold">SAFENET CRYPTOGRAPHIC VAULT</span> • Node: in-mum-1.oraclecloud.internal
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Security & Cryptographic Audit Logs</h1>
          <p className="text-slate-500 text-sm mt-1 max-w-3xl">Immutable, privacy-preserving telemetry feed with mathematical zero-plaintext retention. Every classification produces an immediate RAM purge cycle and an append-only SHA-256 state tree.</p>
        </div>
        <div className="flex flex-col gap-2 shrink-0">
           <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors self-end w-full md:w-auto">
             <Smartphone size={16} className="text-slate-400" />
             <span className="text-sm font-medium text-slate-900 whitespace-nowrap">Aarav's Galaxy A54</span>
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 ml-4"><path d="m6 9 6 6 6-6"/></svg>
           </div>
          <Button variant="primary" className="gap-2 font-semibold shadow-sm w-full md:w-auto">
            <ShieldCheck size={16} /> Export Tamper-Proof Report
          </Button>
        </div>
      </div>

      

      {/* Table Filters */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        <div className="relative shrink-0">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search /" className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm w-48 focus:outline-none focus:ring-1 focus:ring-blue-500" />
        </div>
        
        <button className="shrink-0 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg flex items-center gap-2">
          All Logs (1,482)
        </button>
        <button className="shrink-0 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-medium rounded-lg flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Critical Alerts (3)
        </button>
        <button className="shrink-0 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-medium rounded-lg">
          Daemon Heartbeats
        </button>
        <button className="shrink-0 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-medium rounded-lg">
          Tamper Alerts
        </button>
        <button className="shrink-0 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-medium rounded-lg">
          Model Updates
        </button>
        
        <div className="ml-auto shrink-0">
          <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-medium rounded-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Last 7 Days (Live)
          </button>
        </div>
      </div>

      {/* Main Table */}
      <Card className="overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-4 w-40">Timestamp</th>
                <th className="px-5 py-4 w-56">Device Node</th>
                <th className="px-5 py-4">Event Category</th>
                <th className="px-5 py-4">Threat Classification</th>
                <th className="px-5 py-4">Model Engine</th>
                <th className="px-5 py-4 text-center">Privacy & Shroud</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              
              {/* Row 1: Critical */}
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="font-semibold text-slate-900">14:22:18 IST</div>
                  <div className="text-xs text-slate-500">Today • 03 May</div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-start gap-2">
                    <Smartphone size={14} className="text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-900">Aarav's Galaxy A54</div>
                      <div className="text-xs font-mono text-slate-400">UID: SM-A546E-01</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <Badge variant="critical" className="bg-red-50 text-red-700 border-red-200"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Threat Detected</Badge>
                </td>
                <td className="px-5 py-4">
                  <div className="font-bold text-red-700 text-base">Predatory Grooming</div>
                  <div className="text-xs text-slate-500">Stage 2: Coercion, Isolation & Secrecy (Hinglish/En)</div>
                </td>
                <td className="px-5 py-4">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">91.4% <ShieldAlert size={14} className="text-red-500"/></div>
                  <div className="text-xs text-slate-500">XGBoost TF-IDF (Edge)</div>
                </td>
                <td className="px-5 py-4">
                  <button className="mx-auto w-24 flex flex-col items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors">
                     <span className="text-[10px] font-bold text-slate-600 leading-tight text-center">Click to Shroud Inspect</span>
                     <Eye size={12} className="text-slate-500" />
                     <span className="text-[9px] text-slate-400 font-mono">(30s)</span>
                  </button>
                </td>
              </tr>

              {/* Row 2: Warning */}
              <tr className="hover:bg-slate-50 transition-colors bg-amber-50/10">
                <td className="px-5 py-4">
                  <div className="font-semibold text-slate-900">11:05:44 IST</div>
                  <div className="text-xs text-slate-500">Today • 03 May</div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-start gap-2">
                    <Smartphone size={14} className="text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-900">Aarav's Galaxy A54</div>
                      <div className="text-xs font-mono text-slate-400">UID: SM-A546E-01</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <Badge variant="warning" className="bg-amber-50 text-amber-800 border-amber-200"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> Flagged Content</Badge>
                </td>
                <td className="px-5 py-4">
                  <div className="font-bold text-slate-900 text-base">Cyberbullying & Exclusion</div>
                  <div className="text-xs text-slate-500">Repeated aggressive group targeting</div>
                </td>
                <td className="px-5 py-4">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">74.0%</div>
                  <div className="text-xs text-slate-500">XGBoost Hinglish Model</div>
                </td>
                <td className="px-5 py-4">
                  <button className="mx-auto w-24 flex flex-col items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors">
                     <span className="text-[10px] font-bold text-slate-600 leading-tight text-center">Click to Shroud Inspect</span>
                     <Eye size={12} className="text-slate-500" />
                  </button>
                </td>
              </tr>

              {/* Row 3: Normal */}
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="font-semibold text-slate-900">08:30:12 IST</div>
                  <div className="text-xs text-slate-500">Today • 03 May</div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-start gap-2">
                    <Smartphone size={14} className="text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-900">Aarav's Galaxy A54</div>
                      <div className="text-xs font-mono text-slate-400">UID: SM-A546E-01</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <Badge variant="success" className="bg-emerald-50 text-emerald-700 border-emerald-200"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Daemon Health</Badge>
                </td>
                <td className="px-5 py-4">
                  <div className="font-bold text-slate-900 text-base">Accessibility Service Ping</div>
                  <div className="text-xs text-slate-500">Android 14 Accessibility Daemon Responsive</div>
                </td>
                <td className="px-5 py-4">
                  <div className="font-bold text-emerald-600">Heuristic OK</div>
                </td>
                <td className="px-5 py-4 text-center">
                  <span className="text-xs text-slate-400 italic">No Payload<br/>(Ping Only)</span>
                </td>
              </tr>

              {/* Row 4: Info */}
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="font-semibold text-slate-900">18:40:02 IST</div>
                  <div className="text-xs text-slate-500">Yesterday • 02 May</div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-start gap-2">
                    <Smartphone size={14} className="text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-900">Aarav's Galaxy A54</div>
                      <div className="text-xs font-mono text-slate-400">UID: SM-A546E-01</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <Badge className="bg-blue-50 text-blue-700 border-blue-200"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Prevention Hook</Badge>
                </td>
                <td className="px-5 py-4">
                  <div className="font-bold text-slate-900 text-base">Contact Solicitation Attempt</div>
                  <div className="text-xs text-slate-500">Roblox in-game chat external link request</div>
                </td>
                <td className="px-5 py-4">
                  <div className="font-bold text-slate-900">62.0%</div>
                  <div className="text-xs text-slate-500">Local Regex Hook</div>
                </td>
                <td className="px-5 py-4 text-center">
                  <span className="text-xs font-semibold text-blue-600">Deflected<br/>Pre-Transmit</span>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-sm">
           <div className="text-slate-500 flex items-center gap-2">
              Showing 6 of 1,482 Cryptographically Verified Audit Records • 
              <span className="text-emerald-600 font-medium">Merkle Root Validated</span>
           </div>
           <div className="flex items-center gap-1">
              <button className="px-3 py-1 text-slate-400 hover:text-slate-600">Previous</button>
              <button className="w-8 h-8 rounded bg-blue-600 text-white font-medium flex items-center justify-center">1</button>
              <button className="w-8 h-8 rounded text-slate-600 hover:bg-slate-200 font-medium flex items-center justify-center">2</button>
              <button className="w-8 h-8 rounded text-slate-600 hover:bg-slate-200 font-medium flex items-center justify-center">3</button>
              <span className="px-2 text-slate-400">...</span>
              <button className="w-8 h-8 rounded text-slate-600 hover:bg-slate-200 font-medium flex items-center justify-center">74</button>
              <button className="px-3 py-1 text-slate-600 hover:text-slate-900 font-medium">Next</button>
           </div>
        </div>
      </Card>

    </div>
  );
}
