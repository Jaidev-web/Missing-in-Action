import Image from 'next/image';
import { Smartphone, ChevronDown, Bell } from 'lucide-react';
import { Button } from './ui';

export function TopHeader() {
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

        <div className="relative cursor-pointer">
          <Bell size={20} className="text-slate-500" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
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
