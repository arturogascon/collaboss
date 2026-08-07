export type ColorOption = {
  key: string;
  label: string;
  swatchClassName: string;
};

export const COLOR_OPTIONS: ColorOption[] = [
  { key: "blue", label: "Blue", swatchClassName: "bg-brand-color-blue" },
  { key: "purple", label: "Purple", swatchClassName: "bg-brand-color-purple" },
  { key: "green", label: "Green", swatchClassName: "bg-brand-color-green" },
  { key: "pink", label: "Pink", swatchClassName: "bg-brand-color-pink" },
  { key: "orange", label: "Orange", swatchClassName: "bg-brand-color-orange" },
  { key: "teal", label: "Teal", swatchClassName: "bg-brand-color-teal" },
];
