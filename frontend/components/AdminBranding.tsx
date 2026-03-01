import Image from 'next/image';

export default function AdminBranding() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative mb-6 md:mb-8 flex items-center justify-center w-[180px] h-[180px] md:w-[238px] md:h-[238px]">
        <div
          className="absolute rounded-full w-[140px] h-[120px] md:w-[180px] md:h-[150px]"
          style={{
            background: '#5957A2',
            boxShadow: '0px 0px 250px #5957A2, 0px 0px 250px #5957A2, 0px 0px 250px #5957A2, 0px 0px 155.61px #5957A2, 0px 0px 44.46px #5957A2, 0px 0px 22.23px #5957A2',
          }}
        />
        <div className="relative z-10">
          <Image
            src="/wicsm_logo_transparent_1.png"
            alt="WiCSM Logo"
            width={920}
            height={1040}
            className="object-contain w-[200px] md:w-auto"
          />
        </div>
      </div>

      <h1 className="text-5xl md:text-8xl font-bold mb-2" style={{ color: '#390D67' }}>
        WiCSM
      </h1>
      
      <p className="text-base md:text-lg text-center px-4" style={{ color: '#390D67' }}>
        Women in Computer Science, Statistics<br /> & Mathematics
      </p>
    </div>
  );
}
