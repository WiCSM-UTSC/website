import { useState } from "react";

interface ExecCardProps {
  imageUrl?: string | null;
  intro: string;
  name: string;
  position: string;
}

export function ExecCard({ imageUrl, intro, name, position }: ExecCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <button
      aria-label={`${isFlipped ? "Show" : "Hide"} details for ${name}, ${position}`}
      aria-pressed={isFlipped}
      className="size-75 cursor-pointer border-0 bg-transparent p-0 text-left perspective-[1000px] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand-text"
      onClick={() => setIsFlipped((flipped) => !flipped)}
      type="button"
    >
      <span
        className={`relative block size-full transition-transform duration-500 transform-3d motion-reduce:transition-none ${isFlipped ? "transform-[rotateY(180deg)]" : ""}`}
      >
        <span className="absolute inset-0 block overflow-hidden rounded-4xl bg-brand-secondary shadow-[0_0_15px_rgb(86_45_155/25%),0_0_25px_rgb(86_45_155/25%)] backface-hidden">
          {imageUrl && !imageFailed && (
            <img
              alt=""
              className="absolute top-9 left-1/2 size-36 -translate-x-1/2 rounded-2xl object-cover"
              onError={() => setImageFailed(true)}
              src={imageUrl}
            />
          )}
          <img
            alt=""
            className="absolute top-6.75 right-6.75 size-6"
            height="24"
            src="/refresh-ccw.svg"
            width="24"
          />
          <span className="absolute right-8.25 bottom-8.25 left-8.25 text-2xl font-extrabold leading-9 tracking-[-0.6px] text-black">
            {name},<br />
            {position}
          </span>
        </span>
        <span className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-4xl bg-[#f0e7ff] shadow-[0_0_20px_rgb(0_0_0/25%)] backface-hidden transform-[rotateY(180deg)]">
          <img
            alt=""
            className="absolute top-6.75 right-6.75 size-6 transform-[scaleX(-1)]"
            height="24"
            src="/refresh-ccw.svg"
            width="24"
          />
          <span className="px-8 text-center text-2xl font-extrabold leading-9 tracking-[-0.6px] text-black">
            {intro}
          </span>
        </span>
      </span>
    </button>
  );
}
