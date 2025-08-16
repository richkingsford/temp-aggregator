import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { jobTemplates, dentistPreferences, officeProfiles } from '@/app/lib/mock-data';
import { JobPosting } from '@/app/lib/types';
import fs from 'fs/promises';
import path from 'path';

const jobsFilePath = path.join(process.cwd(), 'src', 'app', 'lib', 'jobs.json');

async function readCreatedJobs(): Promise<JobPosting[]> {
  try {
    const data = await fs.readFile(jobsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeCreatedJobs(jobs: JobPosting[]) {
  await fs.writeFile(jobsFilePath, JSON.stringify(jobs, null, 2));
}

export async function PUT(req: Request, { params }: { params: { jobId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== 'hygienist') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { jobId } = params;
  const createdJobs = await readCreatedJobs();

  if (jobId.startsWith('template-')) {
    const templateIndex = parseInt(jobId.split('-')[1]) - 1;
    const template = jobTemplates[templateIndex];

    if (!template) {
      return NextResponse.json({ message: 'Template not found' }, { status: 404 });
    }

    const timeSlot = dentistPreferences.timeSlots[template.timeSlotIndex];
    const payRate = dentistPreferences.payRates[template.payRateIndex];
    const officeProfile = officeProfiles[template.officeIndex];

    const newJob: JobPosting = {
      id: `job-${Date.now()}`,
      title: template.title,
      startTime: timeSlot.start,
      endTime: timeSlot.end,
      location: officeProfile.location,
      payRate: payRate,
      requiresAnesthesia: template.requiresAnesthesia,
      requiresLaser: template.requiresLaser,
      hygieneType: template.hygieneType,
      officeProfile: officeProfile,
      status: 'booked',
      bookedBy: session.user.id,
    };

    createdJobs.push(newJob);
    await writeCreatedJobs(createdJobs);
    return NextResponse.json(newJob, { status: 201 });

  } else {
    const jobIndex = createdJobs.findIndex(job => job.id === jobId);
    if (jobIndex === -1) {
      return NextResponse.json({ message: 'Job not found' }, { status: 404 });
    }

    if (createdJobs[jobIndex].status === 'booked') {
      return NextResponse.json({ message: 'Job is already booked' }, { status: 409 });
    }

    createdJobs[jobIndex].status = 'booked';
    createdJobs[jobIndex].bookedBy = session.user.id;

    await writeCreatedJobs(createdJobs);
    return NextResponse.json(createdJobs[jobIndex], { status: 200 });
  }
}
