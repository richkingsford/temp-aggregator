'use client';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (role: 'dentist' | 'hygienist') => {
    localStorage.setItem('userRole', role);
    if (role === 'dentist') {
      router.push('/');
    } else {
      router.push('/hygienist');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="p-8 bg-white shadow-lg rounded-lg border border-border w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center text-text-primary">Login As</h1>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => handleLogin('dentist')}
            className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors"
          >
            Dentist
          </button>
          <button
            onClick={() => handleLogin('hygienist')}
            className="w-full bg-secondary hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-md transition-colors"
          >
            Hygienist
          </button>
        </div>
      </div>
    </div>
  );
}
