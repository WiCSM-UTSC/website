export default function WhoWeAreSection() {
    return (
      <section className="py-40 bg-white">
  
        {/* Text + CTA */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-[#3A1B6B] tracking-wide">
            WHO WE ARE
          </h2>
  
          <p className="mt-8 text-lg text-[#2D1B4E] max-w-2xl mx-auto">
            We are a student-led community supporting women in computer science,
            statistics, and mathematics at UTSC.
          </p>
  
          <button
            className="
              mt-12 px-16 py-4 rounded-full
              bg-[#54528F] text-white text-lg font-semibold
              shadow-md hover:bg-[#3A1B6B]
              transition-all duration-300
            "
          >
            Join Now
          </button>
        </div>
  
        {/* Carousel */}
        <div className="mt-28 relative">
          <div
            className="
              flex gap-10
              overflow-x-auto
              scroll-smooth
              snap-x snap-mandatory
              scrollbar-hide
              px-24
            "
          >
            {[1, 2, 3, 4].map((_, i) => (
              <div
                key={i}
                className="
                  min-w-[420px] h-[260px]
                  rounded-3xl bg-gray-200
                  shadow-[0_12px_35px_rgba(150,120,255,0.35)]
                  flex-shrink-0
                  snap-center
                "
              />
            ))}
          </div>
        </div>
  
      </section>
    );
  }
  