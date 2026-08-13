import type { ReactNode } from "react";

type EmptyStatePanelProps = {
  icon: ReactNode;
  heading: string;
  description: string;
  action?: ReactNode;
};

export default function EmptyStatePanel({
  icon,
  heading,
  description,
  action,
}: EmptyStatePanelProps) {
  return (
    <div className="flex justify-center pt-4 sm:pt-6 lg:pt-10">
      <div className="flex w-full max-w-xl flex-col items-center gap-4 rounded-3xl border-[1.5px] border-brand-border px-6 py-10 text-center sm:gap-6 sm:px-14 sm:py-16">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-purple sm:h-[88px] sm:w-[88px]">
          {icon}
        </span>
        <div className="flex flex-col items-center gap-1.5 sm:gap-2">
          <h2 className="font-heading text-lg font-bold text-brand-ink sm:text-[22px]">
            {heading}
          </h2>
          <p className="font-body text-sm font-medium text-brand-ink-soft">
            {description}
          </p>
        </div>
        {action}
      </div>
    </div>
  );
}
