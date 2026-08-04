type DashboardPageHeaderProps = {
  subtitle: string;
};

export default function DashboardPageHeader({
  subtitle,
}: DashboardPageHeaderProps) {
  return (
    <div className="flex flex-col gap-1.5 sm:gap-2">
      <h1 className="font-heading text-[26px] font-bold text-brand-ink sm:text-3xl lg:text-[34px]">
        Your Dashboards
      </h1>
      <p className="font-body text-sm font-medium text-brand-ink-soft">
        {subtitle}
      </p>
    </div>
  );
}
