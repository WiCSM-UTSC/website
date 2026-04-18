interface ContactHeaderProps {
  title: string;
  subtitle: string;
}

export default function ContactHeader({ title, subtitle }: ContactHeaderProps) {
  return (
    <div className="relative pb-12 px-6 pt-16">
      {/* Title */}
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-[#54528F] mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-[#54528F]">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}