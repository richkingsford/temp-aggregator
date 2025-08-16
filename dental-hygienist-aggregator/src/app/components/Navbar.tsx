'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = typeof window !== 'undefined' ? localStorage.getItem('userRole') : null;
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    setUserRole(null);
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            DentalTemp
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-text-primary hover:text-primary transition-colors">Dentist View</Link>
            <Link href="/hygienist" className="text-text-primary hover:text-primary transition-colors">Hygienist View</Link>
            {userRole ? (
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition-colors">
                Logout
              </button>
            ) : (
              <Link href="/login" className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
