'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button } from '../components/ui';
import { Smartphone, ShieldCheck, Activity, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { auth } from '../lib/firebase';

export function DevicesView() {
  const [showPairModal, setShowPairModal] = useState(false);
  const [parentUid, setParentUid] = useState(null);

  useEffect(() => {
    if (auth.currentUser) {
      setParentUid(auth.currentUser.uid);
    }
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto p-4 lg:p-8 flex flex-col gap-8 relative">
      
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
          <Button 
            variant="primary" 
            className="gap-2 font-semibold shadow-sm w-full md:w-auto"
            onClick={() => setShowPairModal(true)}
          >
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
            <div className="text-4xl font-bold text-slate-900 mb-1 tracking-tight">1 <span className="text-xs font-medium text-slate-500 ml-1">Registered</span></div>
            <div className="text-xs font-medium text-emerald-600 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> 1 Guarding • 0 Standby</div>
          </div>
        </Card>
      </div>

      {showPairModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900">Pair Child Device</h3>
              <button 
                onClick={() => setShowPairModal(false)}
                className="p-1 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-8 flex flex-col items-center">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
                {parentUid ? (
                  <QRCodeSVG 
                    value={parentUid} 
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                ) : (
                  <div className="w-[200px] h-[200px] flex items-center justify-center text-slate-400 border-2 border-dashed rounded-lg">
                    Not authenticated
                  </div>
                )}
              </div>
              <h4 className="font-semibold text-slate-900 text-center mb-2">Scan with SafeNET App</h4>
              <p className="text-sm text-slate-500 text-center px-4">
                Open the SafeNET app on your child's phone and scan this QR code to securely link the device to your parent dashboard.
              </p>
              
              <div className="w-full mt-8 p-3 bg-blue-50 rounded-lg border border-blue-100 flex gap-3 text-sm">
                <ShieldCheck className="text-blue-600 shrink-0 mt-0.5" size={18} />
                <p className="text-blue-900">This code contains your secure Parent ID. Keep it private.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

