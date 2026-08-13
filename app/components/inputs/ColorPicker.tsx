"use client";
import { useEffect, useRef, useState } from "react";
import { LuCheck, LuChevronDown, LuChevronUp } from "react-icons/lu";
import { COLOR_OPTIONS } from "./colorOptions";

type ColorPickerProps = {
  name: string;
  label?: string;
  defaultValue?: string;
};

export default function ColorPicker({
  name,
  label = "Color",
  defaultValue = COLOR_OPTIONS[0].key,
}: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState(defaultValue);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected =
    COLOR_OPTIONS.find((color) => color.key === selectedKey) ??
    COLOR_OPTIONS[0];

  return (
    <div className="flex flex-col gap-1.5" ref={containerRef}>
      <span className="font-body text-[13px] font-semibold text-brand-ink-soft">
        {label}
      </span>
      <div className="relative">
        <input type="hidden" name={name} value={selected.key} />
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          className={`flex w-full items-center justify-between gap-2.5 rounded-xl border-[1.5px] bg-brand-canvas px-3.5 py-3 outline-none ${
            isOpen ? "border-brand-purple" : "border-brand-border"
          }`}
        >
          <span className="flex items-center gap-2.5">
            <span
              className={`h-[22px] w-[22px] shrink-0 rounded-full border-2 border-white ${selected.swatchClassName}`}
            />
            <span className="font-body text-[15px] font-medium text-brand-ink">
              {selected.label}
            </span>
          </span>
          {isOpen ? (
            <LuChevronUp className="h-[18px] w-[18px] shrink-0 text-brand-purple" />
          ) : (
            <LuChevronDown className="h-[18px] w-[18px] shrink-0 text-brand-ink-faint" />
          )}
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-2.5 w-full rounded-2xl border-[1.5px] border-brand-border bg-white p-3.5 shadow-lg">
            <p className="mb-3 font-body text-[13px] font-semibold text-brand-ink-soft">
              Choose a color
            </p>
            <div className="grid grid-cols-3 justify-items-center gap-3.5">
              {COLOR_OPTIONS.map((color) => {
                const isSelected = color.key === selectedKey;
                return (
                  <button
                    key={color.key}
                    type="button"
                    onClick={() => {
                      setSelectedKey(color.key);
                      setIsOpen(false);
                    }}
                    aria-label={color.label}
                    aria-pressed={isSelected}
                    className={`flex h-[42px] w-[42px] items-center justify-center rounded-full border-2 ${
                      isSelected ? "border-brand-purple" : "border-transparent"
                    }`}
                  >
                    <span
                      className={`flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-white ${color.swatchClassName}`}
                    >
                      {isSelected && (
                        <LuCheck className="h-3.5 w-3.5 text-white" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
