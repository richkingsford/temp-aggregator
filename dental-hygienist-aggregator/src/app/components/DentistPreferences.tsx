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
    <div className="bg-white border border-border rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-bold text-primary mb-4">Your Office Preferences</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-text-primary mb-2">Pay Rates</h3>
          <ul className="space-y-1">
            {preferences.payRates.map((rate) => (
              <li key={rate} className="text-gray-600">${rate}/hr</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-text-primary mb-2">Standard Time Slots</h3>
          <ul className="space-y-1">
            {preferences.timeSlots.map((slot, index) => (
              <li key={index} className="text-gray-600">{slot.start} - {slot.end}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
