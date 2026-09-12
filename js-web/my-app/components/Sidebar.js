import { ShieldCheck, LayoutDashboard, Smartphone, ClipboardList, Settings, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview / Alerts', icon: LayoutDashboard },
  { id: 'devices', label: 'Protected Devices', icon: Smartphone },
  { id: 'audit', label: 'Audit & Logs', icon: ClipboardList },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ currentView, setView, isOpen, setIsOpen }) {
  return (
    <aside className={`shrink-0 bg-white border-r border-slate-200 flex flex-col h-full transition-all duration-300 ease-in-out z-20 ${isOpen ? 'w-[280px]' : 'w-[72px]'}`}>
      <div className={`h-16 flex items-center border-b border-slate-200 overflow-hidden shrink-0 transition-all ${isOpen ? 'px-6' : 'px-0 justify-center'}`}>
        <div className="flex items-center gap-2 text-slate-900 font-bold text-lg tracking-tight shrink-0">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shrink-0">
            <ShieldCheck size={20} strokeWidth={2.5} />
          </div>
          <div className={`flex items-center transition-all duration-300 origin-left whitespace-nowrap overflow-hidden ${isOpen ? 'w-auto opacity-100 scale-100' : 'w-0 opacity-0 scale-50'}`}>
            <span className="ml-2">SafeNET</span>
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full ml-1 border border-emerald-100 uppercase tracking-wider">Protected</span>
          </div>
        </div>
      </div>

      <div className={`p-4 flex items-center ${isOpen ? 'justify-between' : 'justify-center'} mt-2 mb-2`}>
        {isOpen && <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">Navigation Console</span>}
        <div className="relative group flex shrink-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-900 transition-colors shadow-sm"
          >
            {isOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
          </button>
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-black text-white text-sm font-medium rounded-full opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            {isOpen ? 'Close sidebar' : 'Open sidebar'}
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto overflow-x-hidden">
        {NAV_ITEMS.map((item) => (
          <div key={item.id} className="relative group">
            <button
              onClick={() => setView(item.id)}
              className={`w-full flex items-center ${isOpen ? 'justify-start px-3' : 'justify-center px-0'} py-2.5 rounded-lg text-sm transition-colors text-left
                ${currentView === item.id 
                  ? 'bg-blue-50 text-blue-700 font-medium' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }
              `}
            >
              <item.icon size={18} className={`${currentView === item.id ? 'text-blue-600' : 'text-slate-400'} shrink-0`} strokeWidth={currentView === item.id ? 2.5 : 2} />
              <div className={`transition-all duration-300 origin-left overflow-hidden whitespace-nowrap ${isOpen ? 'w-auto opacity-100 ml-3' : 'w-0 opacity-0 ml-0'}`}>
                {item.label}
              </div>
            </button>

            {!isOpen && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-black text-white text-sm font-medium rounded-full opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                {item.label}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className={`p-4 border-t border-slate-200 overflow-hidden shrink-0 ${isOpen ? '' : 'flex justify-center'}`}>
        {isOpen ? (
          <div className="whitespace-nowrap">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="font-medium text-slate-700 text-xs">Telemetry Stream Active</span>
            </div>
            <div className="text-slate-400 text-[10px]">Latency: 28ms • Zero Log Retention</div>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center group relative shrink-0">
             <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
             <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-black text-white text-sm font-medium rounded-full opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                Telemetry Active
             </div>
          </div>
        )}
      </div>
    </aside>
  );
}
