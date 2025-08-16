import { NextResponse } from 'next/server';
import { jobTemplates, dentistPreferences, officeProfiles } from '@/app/lib/mock-data';
import { JobPosting } from '@/app/lib/types';

export async function GET() {
  const jobPostings: JobPosting[] = jobTemplates.map((template, index) => {
    const timeSlot = dentistPreferences.timeSlots[template.timeSlotIndex];
    const payRate = dentistPreferences.payRates[template.payRateIndex];
    const officeProfile = officeProfiles[template.officeIndex];

    return {
      id: `job-${index + 1}`,
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

  return NextResponse.json(jobPostings);
}
