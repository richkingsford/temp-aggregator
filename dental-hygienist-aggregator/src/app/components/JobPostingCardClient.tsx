'use client';

import { JobPosting } from "@/app/lib/types";
import { useEffect, useState } from "react";

export default function JobPostingCardClient({ job }: { job: JobPosting }) {
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        setUserRole(role);
    }, []);

    const handleBookNow = () => {
        alert(`Booking for ${job.title} at ${job.officeProfile.name} has been requested! A confirmation will be sent shortly.`);
    };

    if (userRole !== 'hygienist') {
        return null;
    }

    return (
        <div className="mt-4">
            <button
                onClick={handleBookNow}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
                Book Now
            </button>
        </div>
    );
}
