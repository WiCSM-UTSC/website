'use client';
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginCard() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="p-12"
      style={{
        width: '544px',
        height: '476px',
        background: 'linear-gradient(0deg, rgba(250, 246, 255, 0.6), rgba(250, 246, 255, 0.6))',
        boxShadow: '0px 2px 10.4px rgba(109, 109, 109, 0.25)',
        borderRadius: '30px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '32px',
      }}
    >
      <h2 className="text-3xl font-bold" style={{ color: '#390D67' }}>
        Admin Login
      </h2>
      
      <form className="space-y-6">
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <Mail className="w-5 h-5" style={{ color: '#9CA3AF' }} />
          </div>
          <input
            type="email"
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
            placeholder="Email"
            style={{ color: '#6B7280', background: '#FFFFFF' }}
          />
        </div>

        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <Lock className="w-5 h-5" style={{ color: '#9CA3AF' }} />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
            placeholder="Password"
            style={{ color: '#6B7280', background: '#FFFFFF' }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:opacity-70 transition-opacity"
            style={{ color: '#9CA3AF' }}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg font-bold text-white transition-opacity hover:opacity-90"
          style={{ background: '#54528F' }}
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
