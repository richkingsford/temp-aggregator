'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

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

            {isLoading ? (
              <div className="w-24 h-8 bg-gray-200 rounded-md animate-pulse"></div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{session.user?.email}</span>
                <button onClick={() => signOut({ callbackUrl: '/login' })} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition-colors">
                  Logout
                </button>
              </div>
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
