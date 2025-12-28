export default function ValueCard({ title, description }) {
  return (
    <div className="
      w-[280px]
      h-[340px]
      rounded-3xl
      bg-white/30
      backdrop-blur-md
      shadow-lg
      flex
      flex-col
      items-center
      justify-center
      text-center
      px-6
    ">
      {/* ICON */}
      <div className="
        mb-6
        text-white
        text-6xl
        drop-shadow-[0_0_18px_rgba(255,255,255,0.9)]
      ">
        ♀
      </div>

      <h3 className="text-xl font-semibold mb-2">
        {title}
      </h3>

      <p className="text-sm opacity-80">
        {description}
      </p>
    </div>
  );
}
