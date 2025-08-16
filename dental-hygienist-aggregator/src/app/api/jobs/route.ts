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

export async function GET() {
  const templateJobs: JobPosting[] = jobTemplates.map((template, index) => {
    const timeSlot = dentistPreferences.timeSlots[template.timeSlotIndex];
    const payRate = dentistPreferences.payRates[template.payRateIndex];
    const officeProfile = officeProfiles[template.officeIndex];
    return {
      id: `template-${index + 1}`,
      title: template.title,
      startTime: timeSlot.start,
      endTime: timeSlot.end,
      location: officeProfile.location,
      payRate: payRate,
      requiresAnesthesia: template.requiresAnesthesia,
      requiresLaser: template.requiresLaser,
      hygieneType: template.hygieneType,
      officeProfile: officeProfile,
    };
  });

  const createdJobs = await readCreatedJobs();
  const allJobs = [...templateJobs, ...createdJobs];

  return NextResponse.json(allJobs);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== 'dentist') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const newJobData = await req.json();
    const createdJobs = await readCreatedJobs();

    const newJob: JobPosting = {
      id: `job-${Date.now()}`,
      ...newJobData,
    };

    createdJobs.push(newJob);
    await writeCreatedJobs(createdJobs);

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating job' }, { status: 500 });
  }
}
