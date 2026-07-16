import { type ReactNode } from "react";

type ValueCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
};

export default function ValueCard({
  title,
  description,
  icon,
}: ValueCardProps) {
  return (
    <div
      className="
      w-full
      max-w-[280px]
      md:h-[340px]
      rounded-3xl
      bg-white/30
      backdrop-blur-md
      shadow-lg
      flex
      flex-row
      md:flex-col
      items-center
      justify-start
      md:justify-center
      text-left
      md:text-center
      gap-4
      md:gap-0
      px-6
      py-5
      md:py-0
    "
    >
      {/* ICON */}
      <div
        className="
        mb-0
        md:mb-6
        text-white
        text-5xl
        md:text-6xl
        shrink-0
        drop-shadow-[0_0_18px_rgba(255,255,255,0.9)]
      "
      >
        {icon}
      </div>

      <div className="flex-1 md:flex-none">
        <h3 className="text-xl font-semibold mb-1 md:mb-2">{title}</h3>

        <p className="text-sm opacity-80">{description}</p>
      </div>
    </div>
  );
}
