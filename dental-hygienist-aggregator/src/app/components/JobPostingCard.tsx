import { JobPosting } from '@/app/lib/types';
import JobPostingCardClient from './JobPostingCardClient';

export default function JobPostingCard({ job }: { job: JobPosting }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-xl font-bold mb-2">{job.title}</h2>
      <p className="text-gray-600">{job.officeProfile.name}</p>
      <p className="text-gray-600">{job.location}</p>
      <div className="mt-4">
        <p><strong>Time:</strong> {job.startTime} - {job.endTime}</p>
        <p><strong>Pay:</strong> ${job.payRate}/hr</p>
        <p><strong>Hygiene Type:</strong> {job.hygieneType}</p>
        <p><strong>Anesthesia Required:</strong> {job.requiresAnesthesia ? 'Yes' : 'No'}</p>
        <p><strong>Laser Certified Required:</strong> {job.requiresLaser ? 'Yes' : 'No'}</p>
      </div>
      <div className="mt-4 border-t pt-4">
        <h3 className="font-semibold">Office Overview</h3>
        <p>{job.officeProfile.overview}</p>
        <ul className="list-disc list-inside mt-2">
          <li>X-Ray machine age: {job.officeProfile.equipmentAges.xray}</li>
          <li>Sterilization equipment age: {job.officeProfile.equipmentAges.sterilization}</li>
          <li>Ultrasonic scaler age: {job.officeProfile.equipmentAges.ultrasonic}</li>
        </ul>
      </div>
      <JobPostingCardClient job={job} />
    </div>
  );
}
