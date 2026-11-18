import type { ReactNode } from "react";

type TopicPillProps = {
  href: string;
  active: boolean;
  onClick: () => void;
  children: ReactNode;
};

export default function TopicPill({
  href,
  active,
  onClick,
  children,
}: TopicPillProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={active ? "location" : undefined}
      className={`min-w-24 shrink-0 snap-start rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
        active
          ? "border-emerald-600 bg-emerald-600 text-white"
          : "border-slate-300 bg-white text-slate-700 hover:border-emerald-500 hover:text-emerald-700"
      }`}
    >
      {children}
    </a>
  );
}
