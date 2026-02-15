export default function MapSection() {
  return (
    <div className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#54528F] mb-2">
          Find us on campus
        </h2>
        <p className="text-center text-[#54528F] mb-8 text-sm">
          1265 Military Trail, Scarborough, ON M1C 1A4
        </p>

        <div className="bg-white/80 backdrop-blur rounded-3xl p-4 shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2876.871891891892!2d-79.18992!3d43.7844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cd4a3b5e0b5b%3A0x5026b7c208c24f04!2sUniversity%20of%20Toronto%20Scarborough!5e0!3m2!1sen!2sca!4v1737745000000!5m2!1sen!2sca&style=feature:all|element:geometry|color:0x242f3e&style=feature:all|element:labels.text.stroke|color:0x242f3e&style=feature:all|element:labels.text.fill|color:0x746855"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: '16px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="WiCSM Location Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
}