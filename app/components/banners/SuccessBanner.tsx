import { LuCircleCheck } from "react-icons/lu";
import Banner from "@/app/components/banners/Banner";

type SuccessBannerProps = {
  message: string;
};

export default function SuccessBanner({ message }: SuccessBannerProps) {
  return (
    <Banner
      message={message}
      icon={
        <LuCircleCheck className="h-[18px] w-[18px] shrink-0 text-brand-mint" />
      }
      className="border-brand-mint bg-[#53D8C814]"
      textClassName="text-brand-ink"
      closeButtonClassName="text-brand-mint hover:opacity-70"
    />
  );
}
