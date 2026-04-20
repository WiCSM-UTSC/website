import { MdEmail } from "react-icons/md";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
export default function GetInTouchSection() {
  return (
    <div className="py-8 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        
        {/* Get in Touch Card - LEFT SIDE - NO BACKGROUND */}
        <div className="rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-[#54528F] mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-700 mb-6 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco
          </p>
          
          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-start gap-3">
              <MdEmail className="w-6 h-6 text-[#562D9B] flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-[#562D9B] text-sm">Email us</p>
                <a href="mailto:wicsm.utsc@gmail.com" className="text-[#54528F] hover:underline text-sm">
                  wicsm.utsc@gmail.com
                </a>
              </div>
            </div>

            {/* Instagram */}
            <div className="flex items-start gap-3">
              <FaInstagram className="w-6 h-6 text-[#562D9B] flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-[#562D9B] text-sm">Instagram</p>
                <a href="https://instagram.com/wicsm.utsc" target="_blank" rel="noopener noreferrer" className="text-[#54528F] hover:underline text-sm">
                  @wicsm.utsc
                </a>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="flex items-start gap-3">
              <FaLinkedin className="w-6 h-6 text-[#562D9B] flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-[#562D9B] text-sm">Linked In</p>
                <a href="https://linkedin.com/company/wicsm" target="_blank" rel="noopener noreferrer" className="text-[#54528F] hover:underline text-sm">
                  Women in Computer Science, Statistics and Mathematics
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Send a Message Card - RIGHT SIDE - SOLID WHITE */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-[#54528F] mb-6">
            Send a Message
          </h2>

          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#54528F] mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#54528F] focus:border-transparent outline-none text-gray-800"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#54528F] mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#54528F] focus:border-transparent outline-none text-gray-800"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#54528F] mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#54528F] focus:border-transparent outline-none resize-none text-gray-800"
              />
            </div>

            <button
              type="button"
              className="w-full bg-[#54528F] hover:bg-[#6b69a0] text-white font-semibold py-3 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Submit
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}