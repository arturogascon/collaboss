import { LuCircleAlert } from "react-icons/lu";
import Banner from "@/app/components/banners/Banner";

type ErrorBannerProps = {
  message: string;
};

export default function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <Banner
      message={message}
      icon={
        <LuCircleAlert className="h-[18px] w-[18px] shrink-0 text-[#E4483F]" />
      }
      className="border-brand-coral bg-[#FF6B6B14]"
      textClassName="text-[#E4483F]"
      closeButtonClassName="text-[#E4483F] hover:opacity-70"
    />
  );
}
