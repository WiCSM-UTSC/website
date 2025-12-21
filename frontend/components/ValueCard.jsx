export default function ValueCard({ title, description }) {
    return (
      <div className="w-[280px] h-[320px] rounded-2xl bg-white/20 backdrop-blur-md
                      flex flex-col items-center justify-center text-center
                      shadow-lg">
        <div className="mb-4 text-4xl">♀</div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm opacity-80 px-4">{description}</p>
      </div>
    );
  }
  