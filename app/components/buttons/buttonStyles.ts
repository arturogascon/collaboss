export type IconPosition = "left" | "right";
export type ButtonVariant = "primary" | "secondary";

export const buttonBaseClassName =
  "flex items-center gap-2 rounded-bl-[28px] rounded-br-[8px] rounded-tl-[8px] rounded-tr-[28px] border-2 border-brand-outline bg-gradient-to-br from-brand-purple to-brand-purple-dark px-6 py-[11px] font-heading text-[15px] font-semibold text-white shadow-lg shadow-brand-purple/25 lg:px-[22px] lg:py-[10px] lg:text-[14px]";

export const buttonSecondaryClassName =
  "flex items-center gap-2 rounded-full px-6 py-[11px] font-heading text-[15px] font-semibold text-brand-purple transition hover:bg-brand-purple/5 lg:px-[22px] lg:py-[10px] lg:text-[14px]";

export const buttonClassNameByVariant: Record<ButtonVariant, string> = {
  primary: buttonBaseClassName,
  secondary: buttonSecondaryClassName,
};
