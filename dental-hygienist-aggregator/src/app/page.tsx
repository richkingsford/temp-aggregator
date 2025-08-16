'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { JobPosting } from '@/app/lib/types';
import JobPostingCard from '@/app/components/JobPostingCard';
import DentistPreferences from '@/app/components/DentistPreferences';

export default function DentistDashboard() {
  const { data: session } = useSession();
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);

  useEffect(() => {
    async function fetchJobs() {
      const res = await fetch('/api/jobs');
      if (res.ok) {
        const data = await res.json();
        setJobPostings(data);
      }
    }
    fetchJobs();
  }, []);

  return (
    <main className="bg-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-text-primary">Dentist Dashboard</h1>
          {session?.user?.role === 'dentist' && (
            <Link href="/jobs/create" className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
              + Create New Post
            </Link>
          )}
        </div>

        <DentistPreferences />

        <h2 className="text-3xl font-bold text-text-primary mt-12 mb-6">Your Job Postings</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {jobPostings.length > 0 ? (
            jobPostings.map((job) => (
              <JobPostingCard key={job.id} job={job} />
            ))
          ) : (
            <p>No job postings found.</p>
          )}
        </div>
      </div>
    </main>
  );
}
