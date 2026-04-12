export default function PersonPlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-start pt-8 px-6 pb-24">
      <div className="relative w-full [height:28rem] bg-[#E8E0F7] rounded-2xl flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-40 h-40"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          {/* Head */}
          <circle cx="50" cy="32" r="18" fill="#7c4dbb" opacity="0.85" />
          {/* Body */}
          <ellipse cx="50" cy="78" rx="28" ry="22" fill="#7c4dbb" opacity="0.85" />
        </svg>
      </div>
    </div>
  );
}