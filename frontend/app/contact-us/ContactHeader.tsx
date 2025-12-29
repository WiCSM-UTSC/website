interface ContactHeaderProps {
  title: string;
  subtitle: string;
}

export default function ContactHeader({ title, subtitle }: ContactHeaderProps) {
  return (
    <div className="relative bg-gradient-to-br from-purple-400 via-blue-300 to-blue-400 pt-32 pb-20 px-6">
      {/* Browser-like header bar */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white/90 backdrop-blur rounded-t-xl p-3 flex items-center gap-2 shadow-lg">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="flex-1 bg-gray-100 rounded px-4 py-1.5 text-xs text-gray-500">
            wicsm.org/contact
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-purple-900 mb-4">
          {title}
        </h1>
        <p className="text-lg text-purple-800">
          {subtitle}
        </p>
      </div>
    </div>
  );
}