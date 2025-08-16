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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Login As</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => handleLogin('dentist')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Dentist
          </button>
          <button
            onClick={() => handleLogin('hygienist')}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Hygienist
          </button>
        </div>
      </div>
    </div>
  );
}
