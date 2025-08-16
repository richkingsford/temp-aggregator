'use client';

import { JobPosting } from "@/app/lib/types";
import { useEffect, useState } from "react";

export default function JobPostingCardClient({ job }: { job: JobPosting }) {
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const role = typeof window !== 'undefined' ? localStorage.getItem('userRole') : null;
        setUserRole(role);
    }, []);

    const handleBookNow = () => {
        alert(`Booking for ${job.title} at ${job.officeProfile.name} has been requested! A confirmation will be sent shortly.`);
    };

    if (userRole !== 'hygienist') {
        return null;
    }

    return (
        <div className="bg-gray-50 p-6">
            <button
                onClick={handleBookNow}
                className="w-full bg-secondary hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-md transition-colors"
            >
                Book Now
            </button>
        </div>
    );
}
