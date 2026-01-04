export default function JoinUsSection() {
  return (
    <div className="bg-gradient-to-b from-purple-400 via-purple-300 to-blue-300 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-purple-900 mb-4">
          Join Us
        </h2>
        <p className="text-purple-800 mb-8 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud 
          exercitation ullamco.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold px-8 py-3 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl">
            Apply to Open Positions
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl">
            Join the Mentorship Program
          </button>
        </div>

        {/* WiCSM Logo Card */}
        <div className="bg-gradient-to-br from-purple-400 to-blue-400 rounded-2xl p-8 shadow-xl max-w-md mx-auto">
          <div className="bg-white/20 backdrop-blur rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-600 rounded-lg"></div>
              <h3 className="text-3xl font-bold text-white">WiCSM</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-white text-sm">
              <div>
                <p className="font-semibold">QUICK LINK 1</p>
                <p className="text-white/80">QUICK LINK 1</p>
              </div>
              <div>
                <p className="font-semibold">QUICK LINK 1</p>
                <p className="text-white/80">QUICK LINK 1</p>
              </div>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-4">
            <a href="#" className="w-10 h-10 bg-white/30 hover:bg-white/50 backdrop-blur rounded-lg flex items-center justify-center transition-colors">
              <span className="text-white font-bold">f</span>
            </a>
            <a href="#" className="w-10 h-10 bg-white/30 hover:bg-white/50 backdrop-blur rounded-lg flex items-center justify-center transition-colors">
              <span className="text-white font-bold">in</span>
            </a>
            <a href="#" className="w-10 h-10 bg-white/30 hover:bg-white/50 backdrop-blur rounded-lg flex items-center justify-center transition-colors">
              <span className="text-white font-bold">@</span>
            </a>
            <a href="#" className="w-10 h-10 bg-white/30 hover:bg-white/50 backdrop-blur rounded-lg flex items-center justify-center transition-colors">
              <span className="text-white font-bold">yt</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}