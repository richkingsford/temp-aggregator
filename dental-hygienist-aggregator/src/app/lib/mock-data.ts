import { OfficeProfile, DentistPreferences, JobTemplate } from './types';

export const officeProfile: OfficeProfile = {
  name: 'Lehi Dental & Medical',
  location: '3238 N 980 W, Lehi UT, 84043',
  overview: 'A modern, friendly dental office with a focus on patient comfort.',
  equipmentAges: {
    xray: '2 years',
    sterilization: '1 year',
    ultrasonic: '3 years',
  },
};

export const dentistPreferences: DentistPreferences = {
  payRates: [55, 65], // Two price points
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
    timeSlotIndex: 0, // 08:00 AM - 12:00 PM
    payRateIndex: 0,  // $55/hr
  },
  {
    title: 'Afternoon Shift - Deep Cleaning',
    requiresAnesthesia: true,
    requiresLaser: false,
    hygieneType: 'single',
    timeSlotIndex: 1, // 01:00 PM - 05:00 PM
    payRateIndex: 1,  // $65/hr
  },
  {
    title: 'Full Day - Anesthesia Certified',
    requiresAnesthesia: true,
    requiresLaser: false,
    hygieneType: 'double',
    timeSlotIndex: 2, // 08:00 AM - 05:00 PM
    payRateIndex: 1,  // $65/hr
  },
  {
    title: 'Mid-Day Shift - Laser Certified',
    requiresAnesthesia: false,
    requiresLaser: true,
    hygieneType: 'single',
    timeSlotIndex: 3, // 10:00 AM - 03:00 PM
    payRateIndex: 1,  // $65/hr
  },
  {
    title: 'Full Day - Double Hygiene',
    requiresAnesthesia: false,
    requiresLaser: false,
    hygieneType: 'double',
    timeSlotIndex: 2, // 08:00 AM - 05:00 PM
    payRateIndex: 0,  // $55/hr
  },
];
