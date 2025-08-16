import { JobPosting } from '@/app/lib/types';
import JobPostingCard from '@/app/components/JobPostingCard';
import DentistPreferences from '@/app/components/DentistPreferences';

async function getJobPostings(): Promise<JobPosting[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/jobs`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch job postings');
  }
  return res.json();
}

export default async function DentistDashboard() {
  const jobPostings = await getJobPostings();

  return (
    <main className="bg-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-extrabold text-text-primary mb-8">Dentist Dashboard</h1>
        <DentistPreferences />
        <h2 className="text-3xl font-bold text-text-primary mt-12 mb-6">Available Job Templates</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {jobPostings.map((job) => (
            <JobPostingCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </main>
  );
}
