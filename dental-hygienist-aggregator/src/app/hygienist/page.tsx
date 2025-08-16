'use client';

import { useState, useEffect, useMemo } from 'react';
import { JobPosting } from '@/app/lib/types';
import JobPostingCard from '@/app/components/JobPostingCard';

export default function HygienistDashboard() {
  const [allJobs, setAllJobs] = useState<JobPosting[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobPosting[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('default');

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch('/api/jobs');
        if (!res.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data: JobPosting[] = await res.json();
        setAllJobs(data);
        setFilteredJobs(data);

        const uniqueLocations = [...new Set(data.map(job => job.location))];
        setLocations(uniqueLocations);
      } catch (error) {
        console.error(error);
      }
    }
    fetchJobs();
  }, []);

  useMemo(() => {
    let jobs = [...allJobs];

    if (locationFilter !== 'all') {
      jobs = jobs.filter(job => job.location === locationFilter);
    }

    if (sortOrder === 'pay-high-low') {
      jobs.sort((a, b) => b.payRate - a.payRate);
    } else if (sortOrder === 'pay-low-high') {
      jobs.sort((a, b) => a.payRate - b.payRate);
    }

    setFilteredJobs(jobs);
  }, [allJobs, locationFilter, sortOrder]);

  return (
    <main className="bg-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-extrabold text-text-primary mb-8">Available Jobs</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-white rounded-lg border border-border shadow-sm">
          <div className="flex-1">
            <label htmlFor="location-filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Location</label>
            <select
              id="location-filter"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full p-2 border border-border rounded-md"
            >
              <option value="all">All Locations</option>
              {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="sort-order" className="block text-sm font-medium text-gray-700 mb-1">Sort by Pay</label>
            <select
              id="sort-order"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full p-2 border border-border rounded-md"
            >
              <option value="default">Default</option>
              <option value="pay-high-low">Highest to Lowest</option>
              <option value="pay-low-high">Lowest to Highest</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobPostingCard key={job.id} job={job} />
            ))
          ) : (
            <p className="text-center col-span-full">No jobs found matching your criteria.</p>
          )}
        </div>
      </div>
    </main>
  );
}
