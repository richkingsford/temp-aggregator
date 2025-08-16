import { JobPosting } from '@/app/lib/types';
import JobPostingCardClient from './JobPostingCardClient';

export default function JobPostingCard({ job }: { job: JobPosting }) {
  return (
    <div className="bg-white border border-border rounded-lg shadow-sm mb-6 overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary mb-2">{job.title}</h2>
        <p className="text-lg text-text-primary font-semibold">{job.officeProfile.name}</p>
        <p className="text-md text-gray-600 mb-4">{job.location}</p>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div><strong>Time:</strong> {job.startTime} - {job.endTime}</div>
          <div><strong>Pay:</strong> ${job.payRate}/hr</div>
          <div><strong>Hygiene:</strong> {job.hygieneType}</div>
          <div><strong>Anesthesia:</strong> {job.requiresAnesthesia ? 'Yes' : 'No'}</div>
          <div className="col-span-2"><strong>Laser Certified:</strong> {job.requiresLaser ? 'Yes' : 'No'}</div>
        </div>

        <div className="border-t border-border pt-4">
          <h3 className="font-semibold text-text-primary mb-2">Office Overview</h3>
          <p className="text-gray-600 mb-2">{job.officeProfile.overview}</p>
          <ul className="text-sm text-gray-500">
            <li>X-Ray: {job.officeProfile.equipmentAges.xray} old</li>
            <li>Sterilization: {job.officeProfile.equipmentAges.sterilization} old</li>
            <li>Ultrasonic: {job.officeProfile.equipmentAges.ultrasonic} old</li>
          </ul>
        </div>
      </div>
      <JobPostingCardClient job={job} />
    </div>
  );
}
