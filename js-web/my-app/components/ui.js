export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function Badge({ children, variant = 'default', className = '' }) {
  const baseClasses = "rounded-full px-2.5 py-0.5 text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap";

  let variantClasses = "bg-slate-100 text-slate-700"; // default

  if (variant === 'success') {
    variantClasses = "bg-emerald-50 text-emerald-700 border border-emerald-200";
  } else if (variant === 'warning') {
    variantClasses = "bg-amber-50 text-amber-800 border border-amber-200";
  } else if (variant === 'critical') {
    variantClasses = "bg-red-50 text-red-700 border border-red-200";
  } else if (variant === 'outline') {
    variantClasses = "bg-transparent text-slate-600 border border-slate-200 font-medium";
  }

  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
}

export function Switch({ checked, onChange, disabled = false, className = '' }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent 
        transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
        ${checked ? 'bg-blue-600' : 'bg-slate-200'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      <span
        aria-hidden="true"
        className={`
          pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
          transition duration-200 ease-in-out
          ${checked ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </button>
  );
}

export function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseClasses = "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  let variantClasses = "";
  if (variant === 'primary') {
    variantClasses = "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600";
  } else if (variant === 'destructive') {
    variantClasses = "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600";
  } else if (variant === 'outline') {
    variantClasses = "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 focus:ring-slate-200";
  } else if (variant === 'ghost') {
    variantClasses = "bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-200";
  }

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
}
