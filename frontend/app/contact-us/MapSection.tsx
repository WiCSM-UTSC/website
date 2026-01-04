export default function MapSection() {
  return (
    <div className="bg-gradient-to-b from-blue-300 via-purple-300 to-purple-400 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-purple-900 mb-4">
          Find us on campus
        </h2>
        <p className="text-center text-purple-800 mb-8">
          Visit us at our office or attend one of our events!
        </p>

        <div className="bg-white/90 backdrop-blur rounded-2xl p-4 shadow-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.454806183469!2d-79.39733492346658!3d43.66274497110232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34c8a0133eef%3A0x5c5b0f8c5c5b0f8c!2sUniversity%20of%20Toronto!5e0!3m2!1sen!2sca!4v1234567890123!5m2!1sen!2sca"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: '12px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="WiCSM Location Map"
          />
        </div>

        <div className="mt-6 text-center">
          <p className="text-purple-900 font-medium">
            📍 Computer Science Building, Room 101
          </p>
          <p className="text-purple-800">
            Open hours: Monday - Friday, 9 AM - 5 PM
          </p>
        </div>
      </div>
    </div>
  );
}