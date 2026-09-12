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

      {/* Top Protocol Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        
        <Card className="lg:col-span-8 p-6 border-slate-200">
           <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
               <Lock size={20} className="text-blue-600" />
               <h2 className="text-lg font-bold text-slate-900">Zero Cloud Persistence Protocol Active</h2>
             </div>
             <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Verified In-Memory Purge</span>
           </div>
           <p className="text-sm text-slate-600 leading-relaxed mb-6">
             Raw chat transcripts and keystroke hooks are <span className="font-bold text-slate-900 underline decoration-red-500/30 decoration-2 underline-offset-2">never written to persistent disk storage or synced to cloud instances</span>. Input tensors are evaluated strictly on-device/in isolated memory, classified via XGBoost, and the allocated heap buffer is securely overwritten with pseudo-random null bytes within <span className="font-bold text-blue-700">&lt; 14.8ms</span>. Only tamper-evident SHA-256 event digests are synchronized for guardian auditability.
           </p>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
             <div>
               <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-400"></div> FastAPI Node (Oracle Mumbai)</div>
             </div>
             <div>
               <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Latency:</div>
               <div className="text-sm font-bold text-slate-900">19.2ms</div>
             </div>
             <div>
               <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Zero Plaintext Retained:</div>
               <div className="text-sm font-bold text-emerald-600">100% Guaranteed</div>
             </div>
             <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Merkle Root:</div>
                <div className="text-xs font-mono font-bold text-blue-600 flex items-center gap-1">0x8F9a...2B4c <Lock size={12}/></div>
             </div>
           </div>
        </Card>

        <Card className="lg:col-span-4 p-6 border-slate-200 bg-slate-50/50">
           <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-4">Runtime Integrity <span className="text-slate-400 font-mono">Audit Epoch #992</span></div>
           
           <div className="flex items-end justify-between mb-6 pb-4 border-b border-slate-200">
             <span className="text-sm font-medium text-slate-600">Average Heap Allocation Life</span>
             <span className="text-2xl font-bold text-slate-900">11.4 ms</span>
           </div>
           
           <div className="flex items-center justify-between gap-1 mb-6">
              <div className="h-2 flex-1 bg-slate-200 rounded-full overflow-hidden flex">
                 <div className="h-full bg-blue-500 w-[15%]"></div>
                 <div className="h-full bg-red-500 w-[20%]"></div>
                 <div className="h-full bg-emerald-500 w-[65%]"></div>
              </div>
           </div>
           <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-6">
              <span>Ingest<br/>(0ms)</span>
              <span className="text-red-600 text-center">Tensors Shredded<br/>(11.4ms)</span>
              <span className="text-emerald-600 text-right">Hash Logged<br/>(18ms)</span>
           </div>

           <div className="flex justify-between text-xs border-t border-slate-200 pt-4 mt-auto">
             <div>
               <span className="text-slate-500 block mb-0.5">ECDSA Signature Status</span>
               <span className="font-semibold text-emerald-600">Valid • Hardware Keystore</span>
             </div>
             <div className="text-right">
               <span className="text-slate-500 block mb-0.5">Model State</span>
               <span className="font-semibold text-blue-700">v3.4.1 (Hinglish/En)</span>
             </div>
           </div>
        </Card>

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

      {/* Cryptographic Inspector */}
      <Card className="bg-slate-50/80 border-slate-200">
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="flex items-center gap-2">
             <Code size={18} className="text-slate-500" />
             <h3 className="font-bold text-slate-900">Cryptographic Proof & RAM Zeroization Inspector</h3>
             <Badge className="bg-blue-100 text-blue-800 border-blue-200 font-mono text-[10px] ml-2">Selected: #ALT-8921B</Badge>
           </div>
           <Button variant="outline" className="h-8 text-xs font-semibold bg-white border-emerald-200 text-emerald-700 hover:bg-emerald-50 gap-1.5">
             <ShieldCheck size={14} /> Re-Verify ECDSA Signature
           </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
           {/* Section 1 */}
           <div className="bg-white border border-slate-200 rounded-lg p-4">
             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">1. Event Hash Digest</div>
             <div className="bg-slate-50 border border-slate-200 rounded p-2 text-xs font-mono text-slate-600 break-all mb-4">
               SHA256: d3a82ef6b9415843a05c31767220198c6448a31e89cfab902167d4f90112
             </div>
             <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Block Height: <span className="font-mono">#849,201</span></span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1"><ShieldCheck size={14}/> Merkle Leaf Verified</span>
             </div>
           </div>

           {/* Section 2 */}
           <div className="bg-white border border-slate-200 rounded-lg p-4">
             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">2. Zero-Retention Memory Shredding</div>
             <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                   <span className="text-slate-500">RAM Heap Address:</span>
                   <span className="font-bold text-slate-900">0x7FFE60B94A00</span>
                </div>
                <div className="flex justify-between">
                   <span className="text-slate-500">Overwritten Bytes:</span>
                   <span className="font-bold text-emerald-600">128B / 128B (100% 0x00)</span>
                </div>
                <div className="flex justify-between">
                   <span className="text-slate-500">Purge Latency:</span>
                   <span className="font-bold text-blue-700">11.4 ms post-eval</span>
                </div>
             </div>
             <div className="mt-4 text-xs text-emerald-600 font-semibold flex items-center gap-1">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Zero Persistent Disk Write Confirmed
             </div>
           </div>

           {/* Section 3 */}
           <div className="bg-white border border-slate-200 rounded-lg p-4">
             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">3. Android Keystore Attestation</div>
             <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                   <span className="text-slate-500">TEE Enclave:</span>
                   <span className="font-semibold text-slate-900 font-mono">ARM TrustZone (A54)</span>
                </div>
                <div className="flex justify-between">
                   <span className="text-slate-500">Algorithm:</span>
                   <span className="font-semibold text-slate-900 font-mono">ECDSA_SECP256R1</span>
                </div>
                <div className="flex justify-between">
                   <span className="text-slate-500">Public Key Fingerprint:</span>
                   <span className="font-bold text-blue-700 font-mono">9D:3A:C1:F0:84...</span>
                </div>
             </div>
             <div className="mt-4 flex justify-between items-center text-xs">
                <span className="text-slate-500">Guardian Key Ring</span>
                <span className="font-semibold text-blue-700 flex items-center gap-1">Rajesh Sharma <span className="text-slate-400 font-normal">(Signed)</span></span>
             </div>
           </div>
        </div>
      </Card>

    </div>
  );
}
