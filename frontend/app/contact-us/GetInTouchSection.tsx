export default function GetInTouchSection() {
  return (
    <div className="bg-gradient-to-br from-purple-200 via-blue-200 to-purple-300 py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        
        {/* Get in Touch Card */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-purple-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-700 mb-6">
            Have questions or want to learn more about WiCSM? We're here to help! 
            Reach out to us through any of the channels below and we'll get back to you as soon as possible.
          </p>
          
          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-purple-900">Email us</p>
                <a href="mailto:wicsm@university.edu" className="text-purple-600 hover:underline">
                  wicsm@university.edu
                </a>
              </div>
            </div>

            {/* Instagram */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-purple-900">Instagram</p>
                <a href="https://instagram.com/wicsm" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                  @wicsm
                </a>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-purple-900">LinkedIn</p>
                <a href="https://linkedin.com/company/wicsm" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                  Women in Computer Science and Mathematics
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Send Message Card - Preview */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-purple-900 mb-6">
            Send a Message
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Fill out the form below and we'll get back to you soon!
          </p>
          {/* This is just a preview - actual form is in SendMessageSection */}
          <div className="space-y-3">
            <div className="h-10 bg-gray-100 rounded"></div>
            <div className="h-10 bg-gray-100 rounded"></div>
            <div className="h-24 bg-gray-100 rounded"></div>
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold">
              Send
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}