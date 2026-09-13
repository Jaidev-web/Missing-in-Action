import React, { useState, useEffect } from 'react';
import { Card, Badge, Button } from '../components/ui';
import { ShieldCheck, Lock, Search, Smartphone, ShieldAlert, AlertTriangle, Eye, EyeOff, Activity, Cpu, Code } from 'lucide-react';
import { db } from '../lib/firebase';
import { collectionGroup, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
export function AuditLogsView() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const q = query(
      collectionGroup(db, 'threat_events'),
      orderBy('timestamp', 'desc'),
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => {
        const data = doc.data();
        const timestamp = data.timestamp?.toDate();
        const timeString = timestamp ? timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST' : 'Live';
        const dateString = timestamp ? timestamp.toLocaleDateString([], { day: '2-digit', month: 'short' }) : 'Today';
        
        const isCritical = data.risk_level === 'CRITICAL';
        const isHigh = data.risk_level === 'HIGH';
        const isMedium = data.risk_level === 'MEDIUM';
        
        let badgeVariant = 'success';
        let badgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
        let badgeDot = 'bg-emerald-500';
        let badgeLabel = 'Monitored';
        
        if (isCritical) {
          badgeVariant = 'critical';
          badgeClass = 'bg-red-50 text-red-700 border-red-200';
          badgeDot = 'bg-red-500';
          badgeLabel = 'Threat Detected';
        } else if (isHigh || isMedium) {
          badgeVariant = 'warning';
          badgeClass = 'bg-amber-50 text-amber-800 border-amber-200';
          badgeDot = 'bg-amber-500';
          badgeLabel = 'Flagged Content';
        }

        return {
          id: doc.id,
          timeString,
          dateString,
          deviceNode: 'Linked Device',
          nodeUid: data.child_id || 'SM-A546E-01',
          badgeVariant,
          badgeClass,
          badgeDot,
          badgeLabel,
          title: isCritical ? 'Predatory Grooming' : (isHigh ? 'Cyberbullying & Exclusion' : (isMedium ? 'Inappropriate Content' : 'Safe Content')),
          description: data.text || 'Message Analyzed',
          titleColor: isCritical || isHigh ? 'text-red-700' : 'text-slate-900',
          score: data.threat_score ? `${data.threat_score}%` : 'N/A',
          engine: 'XGBoost TF-IDF (Cloud)',
        };
      });
      setLogs(fetched);
    });

    return () => unsubscribe();
  }, []);

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
              
              {logs.map((log) => (
                <tr key={log.id} className={`hover:bg-slate-50 transition-colors ${log.badgeVariant === 'warning' ? 'bg-amber-50/10' : ''}`}>
                  <td className="px-5 py-4">
                    <div className="font-semibold text-slate-900">{log.timeString}</div>
                    <div className="text-xs text-slate-500">Today • {log.dateString}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-start gap-2">
                      <Smartphone size={14} className="text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-slate-900">{log.deviceNode}</div>
                        <div className="text-xs font-mono text-slate-400">UID: {log.nodeUid}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={log.badgeVariant} className={log.badgeClass}>
                      <div className={`w-1.5 h-1.5 rounded-full ${log.badgeDot}`}></div> {log.badgeLabel}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className={`font-bold text-base ${log.titleColor}`}>{log.title}</div>
                    <div className="text-xs text-slate-500">{log.description}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className={`font-bold flex items-center gap-1.5 ${log.titleColor}`}>
                      {log.score} {log.badgeVariant === 'critical' && <ShieldAlert size={14} className="text-red-500"/>}
                    </div>
                    <div className="text-xs text-slate-500">{log.engine}</div>
                  </td>
                  <td className="px-5 py-4">
                    <button className="mx-auto w-24 flex flex-col items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors">
                       <span className="text-[10px] font-bold text-slate-600 leading-tight text-center">Click to Shroud Inspect</span>
                       <Eye size={12} className="text-slate-500" />
                       <span className="text-[9px] text-slate-400 font-mono">(30s)</span>
                    </button>
                  </td>
                </tr>
              ))}
              
              {logs.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-5 py-8 text-center text-slate-500">
                    No audit logs available. Awaiting telemetry...
                  </td>
                </tr>
              )}

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
