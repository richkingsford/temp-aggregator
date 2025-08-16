import { OfficeProfile, DentistPreferences, JobTemplate } from './types';

export const officeProfiles: OfficeProfile[] = [
  {
    name: 'Lehi Dental & Medical',
    location: '3238 N 980 W, Lehi UT, 84043',
    overview: 'A modern, friendly dental office with a focus on patient comfort.',
    equipmentAges: { xray: '2 years', sterilization: '1 year', ultrasonic: '3 years' },
  },
  {
    name: 'Skyridge Valley Dental Care',
    location: '1626 E 3500 N, Ste 102, Lehi, UT 84043',
    overview: 'Quality, comfortable care with a focus on cosmetic dentistry.',
    equipmentAges: { xray: '5 years', sterilization: '2 years', ultrasonic: '1 year' },
  },
  {
    name: 'Floss Family Dentistry',
    location: '3300 N Running Creek Way, Lehi, UT 84043',
    overview: 'Advanced instruments and technology for the whole family.',
    equipmentAges: { xray: '1 year', sterilization: 'new', ultrasonic: 'new' },
  },
];

export const dentistPreferences: DentistPreferences = {
  payRates: [55, 65],
  timeSlots: [
    { start: '08:00 AM', end: '12:00 PM' },
    { start: '01:00 PM', end: '05:00 PM' },
    { start: '08:00 AM', end: '05:00 PM' },
    { start: '10:00 AM', end: '03:00 PM' },
  ],
};

export const jobTemplates: JobTemplate[] = [
  {
    title: 'Morning Shift - Standard Cleaning',
    requiresAnesthesia: false,
    requiresLaser: false,
    hygieneType: 'single',
    timeSlotIndex: 0,
    payRateIndex: 0,
    officeIndex: 0,
  },
  {
    title: 'Afternoon Shift - Deep Cleaning',
    requiresAnesthesia: true,
    requiresLaser: false,
    hygieneType: 'single',
    timeSlotIndex: 1,
    payRateIndex: 1,
    officeIndex: 1,
  },
  {
    title: 'Full Day - Anesthesia Certified',
    requiresAnesthesia: true,
    requiresLaser: false,
    hygieneType: 'double',
    timeSlotIndex: 2,
    payRateIndex: 1,
    officeIndex: 2,
  },
  {
    title: 'Mid-Day Shift - Laser Certified',
    requiresAnesthesia: false,
    requiresLaser: true,
    hygieneType: 'single',
    timeSlotIndex: 3,
    payRateIndex: 1,
    officeIndex: 0,
  },
  {
    title: 'Full Day - Double Hygiene',
    requiresAnesthesia: false,
    requiresLaser: false,
    hygieneType: 'double',
    timeSlotIndex: 2,
    payRateIndex: 0,
    officeIndex: 1,
  },
];
