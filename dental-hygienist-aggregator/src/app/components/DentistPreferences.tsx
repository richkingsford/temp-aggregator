import { DentistPreferences as DentistPreferencesType } from '@/app/lib/types';

async function getDentistPreferences(): Promise<DentistPreferencesType> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/preferences`);
  if (!res.ok) {
    throw new Error('Failed to fetch preferences');
  }
  return res.json();
}

export default async function DentistPreferences() {
  const preferences = await getDentistPreferences();

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Your Preferences</h2>
      <div>
        <h3 className="font-semibold">Pay Rates</h3>
        <ul className="list-disc list-inside">
          {preferences.payRates.map((rate) => (
            <li key={rate}>${rate}/hr</li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Time Slots</h3>
        <ul className="list-disc list-inside">
          {preferences.timeSlots.map((slot, index) => (
            <li key={index}>{slot.start} - {slot.end}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
