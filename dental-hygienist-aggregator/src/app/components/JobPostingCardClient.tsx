'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { JobPosting } from "@/app/lib/types";
import { useRouter } from 'next/navigation';

export default function JobPostingCardClient({ job }: { job: JobPosting }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isBooked, setIsBooked] = useState(job.status === 'booked');
    const [error, setError] = useState('');

    const handleBookNow = async () => {
        setError('');
        if (status !== 'authenticated') {
            router.push('/login');
            return;
        }

        try {
            const res = await fetch(`/api/jobs/${job.id}/book`, {
                method: 'PUT',
            });

            if (res.ok) {
                setIsBooked(true);
            } else {
                const data = await res.json();
                setError(data.message || 'Failed to book job');
            }
        } catch (err) {
            setError('An unexpected error occurred');
        }
    };

    const isHygienist = session?.user?.role === 'hygienist';
    const canBook = isHygienist && !isBooked;

    if (!isHygienist) {
        return null;
    }

    return (
        <div className="bg-gray-50 p-6">
            {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
            <button
                onClick={handleBookNow}
                disabled={!canBook}
                className={`w-full font-bold py-3 px-4 rounded-md transition-colors ${
                    canBook
                        ? 'bg-secondary hover:bg-teal-600 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
                {isBooked ? 'Booked' : 'Book Now'}
            </button>
        </div>
    );
}
