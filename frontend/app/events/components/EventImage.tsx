/**
 * EventImage Component
 *
 * Purpose:
 * - Displays event poster image or fallback placeholder
 * - Handles responsive image sizing with Next.js Image optimization
 *
 * Notes:
 * - Uses Next.js Image component for optimization when src is provided
 * - Falls back to a decorative gradient placeholder when no src available
 */

import Image from "next/image";

type EventImageProps = {
  src?: string;
  alt: string;
};

export default function EventImage({ src, alt }: EventImageProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={482}
        height={521}
        className="h-full w-full rounded-[30px] object-cover"
      />
    );
  }

  return (
    <div
      aria-label={alt}
      className="h-full w-full rounded-[30px] border border-[#EFE8FF] bg-[conic-gradient(from_45deg,#F4F4F4_0deg,#F4F4F4_90deg,#EAEAEA_90deg,#EAEAEA_180deg,#F4F4F4_180deg,#F4F4F4_270deg,#EAEAEA_270deg,#EAEAEA_360deg)] bg-size-[28px_28px]"
    />
  );
}
