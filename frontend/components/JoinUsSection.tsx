export default function JoinUsSection() {
  return (
    <div className="py-16 px-6" style={{ background: 'linear-gradient(180deg, #F0EEFF 0%, #F0EEFF 90%, #C8E8FA 100%)' }}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-[#54528F] mb-4">
          Join Us
        </h2>
        <p className="text-[#54528F] mb-8 max-w-2xl mx-auto text-sm leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button className="bg-[#54528F] hover:bg-[#6b69a0] text-white font-semibold px-8 py-3 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl">
            Apply to Open Positions
          </button>
          <button className="bg-[#54528F] hover:bg-[#6b69a0] text-white font-semibold px-8 py-3 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl">
            Join the Mentorship Program
          </button>
        </div>
      </div>
    </div>
  );
}