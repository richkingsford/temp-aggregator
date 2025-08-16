'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { OfficeProfile } from '@/app/lib/types';

export default function CreateJobPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [payRate, setPayRate] = useState('');
  const [requiresAnesthesia, setRequiresAnesthesia] = useState(false);
  const [requiresLaser, setRequiresLaser] = useState(false);
  const [hygieneType, setHygieneType] = useState<'single' | 'double'>('single');
  const [officeProfiles, setOfficeProfiles] = useState<OfficeProfile[]>([]);
  const [selectedOffice, setSelectedOffice] = useState<string>('');
  const [error, setError] = useState('');

  // Fetch office profiles to populate the dropdown
  useEffect(() => {
    async function fetchOfficeProfiles() {
      // This is a bit of a hack. In a real app, you'd have a dedicated endpoint.
      // For now, we'll just use the mock data.
      const { officeProfiles: profiles } = await import('@/app/lib/mock-data');
      setOfficeProfiles(profiles);
      if (profiles.length > 0) {
        setSelectedOffice(JSON.stringify(profiles[0]));
      }
    }
    fetchOfficeProfiles();
  }, []);

  // Redirect if user is not a dentist
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
    if (status === 'authenticated' && session.user?.role !== 'dentist') {
      router.push('/'); // Redirect non-dentists
    }
  }, [session, status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedOffice) {
      setError('Please select an office profile.');
      return;
    }

    const officeProfile = JSON.parse(selectedOffice);

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          startTime,
          endTime,
          payRate: parseFloat(payRate),
          requiresAnesthesia,
          requiresLaser,
          hygieneType,
          officeProfile,
          location: officeProfile.location,
        }),
      });

      if (res.ok) {
        router.push('/');
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to create job');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }
  };

  if (status === 'loading' || !session || session.user?.role !== 'dentist') {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  return (
    <main className="bg-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-extrabold text-text-primary mb-8">Create New Job Post</h1>
        <form onSubmit={handleSubmit} className="p-8 bg-white shadow-lg rounded-lg border border-border max-w-2xl mx-auto">
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Form fields go here */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2 border border-border rounded-md" />
            </div>

            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <input id="startTime" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required className="w-full p-2 border border-border rounded-md" />
            </div>

            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <input id="endTime" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required className="w-full p-2 border border-border rounded-md" />
            </div>

            <div>
              <label htmlFor="payRate" className="block text-sm font-medium text-gray-700 mb-1">Pay Rate ($/hr)</label>
              <input id="payRate" type="number" value={payRate} onChange={(e) => setPayRate(e.target.value)} required className="w-full p-2 border border-border rounded-md" />
            </div>

            <div>
              <label htmlFor="office" className="block text-sm font-medium text-gray-700 mb-1">Office Profile</label>
              <select id="office" value={selectedOffice} onChange={(e) => setSelectedOffice(e.target.value)} required className="w-full p-2 border border-border rounded-md">
                {officeProfiles.map(p => <option key={p.location} value={JSON.stringify(p)}>{p.name}</option>)}
              </select>
            </div>

            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <input id="requiresAnesthesia" type="checkbox" checked={requiresAnesthesia} onChange={(e) => setRequiresAnesthesia(e.target.checked)} className="h-4 w-4 text-primary border-gray-300 rounded" />
                <label htmlFor="requiresAnesthesia" className="ml-2 block text-sm text-gray-900">Anesthesia Required</label>
              </div>
              <div className="flex items-center">
                <input id="requiresLaser" type="checkbox" checked={requiresLaser} onChange={(e) => setRequiresLaser(e.target.checked)} className="h-4 w-4 text-primary border-gray-300 rounded" />
                <label htmlFor="requiresLaser" className="ml-2 block text-sm text-gray-900">Laser Certified Required</label>
              </div>
            </div>

            <div>
              <label htmlFor="hygieneType" className="block text-sm font-medium text-gray-700 mb-1">Hygiene Type</label>
              <select id="hygieneType" value={hygieneType} onChange={(e) => setHygieneType(e.target.value as 'single' | 'double')} className="w-full p-2 border border-border rounded-md">
                <option value="single">Single</option>
                <option value="double">Double</option>
              </select>
            </div>
          </div>

          <div className="mt-8">
            <button type="submit" className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors">Create Job</button>
          </div>
        </form>
      </div>
    </main>
  );
}
