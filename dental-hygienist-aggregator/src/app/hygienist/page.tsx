import { JobPosting } from '@/app/lib/types';
import JobPostingCard from '@/app/components/JobPostingCard';

async function getJobPostings(): Promise<JobPosting[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/jobs`);
  if (!res.ok) {
    throw new Error('Failed to fetch job postings');
  }
  return res.json();
}

export default async function HygienistDashboard() {
  const jobPostings = await getJobPostings();

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Available Jobs</h1>
        <div>
          {jobPostings.map((job) => (
            <JobPostingCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </main>
  );
}
