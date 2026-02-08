import Image from 'next/image';

export default function AdminBranding() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative mb-8 flex items-center justify-center" style={{ width: '238px', height: '238px' }}>
        <div
          className="absolute rounded-full"
          style={{
            width: '180px',
            height: '150px',
            background: '#5957A2',
            boxShadow: '0px 0px 250px #5957A2, 0px 0px 250px #5957A2, 0px 0px 250px #5957A2, 0px 0px 155.61px #5957A2, 0px 0px 44.46px #5957A2, 0px 0px 22.23px #5957A2',
          }}
        />
        <div className="relative z-10">
          <Image
            src="/wicsm_logo_transparent_1.png"
            alt="WiCSM Logo"
            width={600}
            height={700}
            className="object-contain"
          />
        </div>
      </div>

      <h1 className="text-7xl font-bold mb-2" style={{ color: '#390D67' }}>
        WiCSM
      </h1>
      
      <p className="text-lg text-center" style={{ color: '#390D67' }}>
        Women in Computer Science, Statistics &<br />Mathematics
      </p>
    </div>
  );
}
