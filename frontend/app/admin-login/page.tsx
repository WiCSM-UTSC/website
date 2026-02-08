import AdminBranding from '@/components/AdminBranding';
import AdminLoginCard from '@/components/AdminLoginCard';

export default function AdminLogin() {
  return (
    <div
      className="flex min-h-screen"
      style={{
        background: 'radial-gradient(56.52% 82.98% at 76.09% 54.72%, #FFFFFF 0%, #CEEBFF 18.27%, #C4DBFD 33.65%, #C2D9FC 36.06%, #B5C4F9 55.77%, #9895F2 100%)',
      }}
    >
      <div className="flex-1 flex items-center justify-center pl-12 pr-2">
        <AdminBranding />
      </div>

      <div className="flex-1 flex items-center justify-center pl-2 pr-12">
        <AdminLoginCard />
      </div>
    </div>
  );
}
