export interface OfficeProfile {
  name: string;
  location: string;
  overview: string;
  equipmentAges: {
    xray: string;
    sterilization: string;
    ultrasonic: string;
  };
}

export interface DentistPreferences {
  payRates: [number, number];
  timeSlots: {
    start: string;
    end: string;
  }[];
}

export type HygieneType = 'single' | 'double';

export interface JobPosting {
  id: string;
  title: string;
  startTime: string;
  endTime:string;
  location: string;
  payRate: number;
  requiresAnesthesia: boolean;
  requiresLaser: boolean;
  hygieneType: HygieneType;
  officeProfile: OfficeProfile;
}

export interface JobTemplate {
  title: string;
  requiresAnesthesia: boolean;
  requiresLaser: boolean;
  hygieneType: HygieneType;
  timeSlotIndex: number;
  payRateIndex: number;
}
