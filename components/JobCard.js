import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaMapMarkerAlt, FaRupeeSign, FaBriefcase } from 'react-icons/fa';

export default function JobCard({ job, onApply }) {
    const [isHovered, setIsHovered] = useState(false);
    const { user } = useAuth();
    const router = useRouter();

    const handleApply = () => {
        if (!user) {
            toast.error('Please sign in to apply for jobs', {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }
        onApply();
    };

    const formatSalary = (salary) => {
        return salary.startsWith('?') ? salary.substring(1) : salary;
    };

    return (
        <div 
            className={`backdrop-blur-sm bg-white/90 rounded-lg border border-white/20 hover:border-purple-200/30 transition-all duration-300 ${
                isHovered ? 'shadow-lg shadow-purple-100/50 transform scale-[1.01]' : 'shadow-sm'
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                            {job.title}
                        </h2>
                        <div className="flex items-center mt-2 text-gray-600">
                            <FaBriefcase className="mr-2 text-indigo-500" />
                            <span className="font-medium">{job.company}</span>
                        </div>
                    </div>
                    <span className="px-3 py-1 text-sm font-medium text-indigo-700 bg-indigo-50/80 backdrop-blur-sm rounded-full border border-indigo-100/50">
                        Full-time
                    </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center text-gray-600">
                        <FaMapMarkerAlt className="mr-2 text-indigo-500" />
                        <span>{job.job_location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <FaRupeeSign className="mr-2 text-indigo-500" />
                        <span>{formatSalary(job.salary)}</span>
                    </div>
                </div>

                <div className="mt-4 text-gray-600 line-clamp-2">
                    {job.requirements}
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleApply}
                        className={`
                            px-6 py-2.5 rounded-lg font-medium 
                            transition-all duration-300 ease-in-out
                            ${isHovered 
                                ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-md'
                                : 'bg-white/80 text-indigo-600 border border-indigo-200'
                            }
                            hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-500 
                            hover:text-white hover:shadow-md hover:border-transparent
                            active:scale-95
                        `}
                    >
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
    );
} 