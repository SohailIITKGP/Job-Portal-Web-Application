import { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import ApplyModal from '../components/ApplyModal';
import { FaBriefcase } from 'react-icons/fa';

export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await fetch('https://job-portal-web-application-five.vercel.app/api/jobs');
            const data = await res.json();
            setJobs(data.jobs || []);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Discover Your Next Career Move
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Find opportunities that match your expertise and aspirations
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-100 border-t-blue-600"></div>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="text-center py-12">
                        <FaBriefcase className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No jobs available</h3>
                        <p className="mt-1 text-sm text-gray-500">Check back later for new opportunities.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {jobs.map((job) => (
                            <JobCard 
                                key={job.id} 
                                job={job} 
                                onApply={() => setSelectedJob(job)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {selectedJob && (
                <ApplyModal
                    job={selectedJob}
                    onClose={() => setSelectedJob(null)}
                />
            )}
        </div>
    );
} 