import type { ReactNode } from "react";

type DashboardPageHeaderProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export default function DashboardPageHeader({
  title,
  subtitle,
  action,
}: DashboardPageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 sm:gap-5">
      <div className="flex flex-col gap-1.5 sm:gap-2">
        <h1 className="font-heading text-[26px] font-bold text-brand-ink sm:text-3xl lg:text-[34px]">
          {title}
        </h1>
        {subtitle && (
          <p className="font-body text-sm font-medium text-brand-ink-soft">
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
