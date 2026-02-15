import AdminBranding from '@/components/AdminBranding';
import AdminLoginCard from '@/components/AdminLoginCard';

export default function AdminLogin() {
  return (
    <div
      className="flex flex-col md:flex-row min-h-screen"
      style={{
        background: 'radial-gradient(56.52% 82.98% at 76.09% 54.72%, #FFFFFF 0%, #CEEBFF 18.27%, #C4DBFD 33.65%, #C2D9FC 36.06%, #B5C4F9 55.77%, #9895F2 100%)',
      }}
    >
      <div className="flex-1 flex items-center justify-center px-4 py-8 md:pl-12 md:pr-2 md:py-0">
        <AdminBranding />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8 md:pl-2 md:pr-12 md:py-0">
        <AdminLoginCard />
      </div>
    </div>
  );
}
