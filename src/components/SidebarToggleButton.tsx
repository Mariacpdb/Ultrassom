type SidebarToggleButtonProps = {
  label: string;
  expanded: boolean;
  controls: string;
  className?: string;
  onClick: () => void;
};

export default function SidebarToggleButton({
  label,
  expanded,
  controls,
  className = "",
  onClick,
}: SidebarToggleButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-expanded={expanded}
      aria-controls={controls}
      onClick={onClick}
      className={`cursor-pointer inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5"
      >
        <rect x="3.5" y="4" width="17" height="16" rx="2.5" />
        <path d="M9 4.5v15" />
        <path d={expanded ? "m15 9-3 3 3 3" : "m12 9 3 3-3 3"} />
      </svg>
    </button>
  );
}
