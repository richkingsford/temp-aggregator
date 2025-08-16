import { JobPosting } from '@/app/lib/types';
import JobPostingCard from '@/app/components/JobPostingCard';

async function getJobPostings(): Promise<JobPosting[]> {
  // In a real app, you'd fetch from a proper API endpoint.
  // For this example, we're using the mock API route.
  // The URL needs to be absolute for server-side fetching.
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/jobs`);
  if (!res.ok) {
    throw new Error('Failed to fetch job postings');
  }
  return res.json();
}

import DentistPreferences from '@/app/components/DentistPreferences';

export default async function DentistDashboard() {
  const jobPostings = await getJobPostings();

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Dentist Dashboard</h1>
        <DentistPreferences />
        <h2 className="text-2xl font-bold mb-4">Job Templates</h2>
        <div>
          {jobPostings.map((job) => (
            <JobPostingCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </main>
  );
}
