import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { FaBriefcase, FaBuilding, FaMapMarkerAlt, FaRupeeSign, FaList, FaFileAlt } from 'react-icons/fa';

export default function PostJob() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [jobData, setJobData] = useState({
        title: '',
        company: '',
        description: '',
        requirements: '',
        job_location: '',
        salary: ''
    });

    // Redirect if not logged in
    if (!user) {
        if (typeof window !== 'undefined') {
            router.push('/login');
        }
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('https://job-portal-web-application-five.vercel.app/api/jobs/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(jobData)
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Job posted successfully!');
                router.push('/jobs');
            } else {
                toast.error(data.message || 'Failed to post job');
            }
        } catch (error) {
            console.error('Error posting job:', error);
            toast.error('An error occurred while posting the job');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 backdrop-blur-sm py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 md:p-8 border border-purple-100/20">
                    <div className="flex items-center gap-3 mb-8">
                        <FaBriefcase className="text-2xl text-indigo-600" />
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Post a New Job
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                <FaBriefcase className="mr-2 text-indigo-500" />
                                Job Title
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 bg-purple-50/50 border border-purple-100/50 rounded-lg focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400/50 transition-all"
                                value={jobData.title}
                                onChange={(e) => setJobData({...jobData, title: e.target.value})}
                                placeholder="e.g. Frontend Developer"
                            />
                        </div>

                        <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                <FaBuilding className="mr-2 text-indigo-500" />
                                Company Name
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 bg-purple-50/50 border border-purple-100/50 rounded-lg focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400/50 transition-all"
                                value={jobData.company}
                                onChange={(e) => setJobData({...jobData, company: e.target.value})}
                                placeholder="e.g. Tech Solutions Inc."
                            />
                        </div>

                        <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                <FaMapMarkerAlt className="mr-2 text-indigo-500" />
                                Location
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 bg-purple-50/50 border border-purple-100/50 rounded-lg focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400/50 transition-all"
                                value={jobData.job_location}
                                onChange={(e) => setJobData({...jobData, job_location: e.target.value})}
                                placeholder="e.g. Mumbai, India"
                            />
                        </div>

                        <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                <FaRupeeSign className="mr-2 text-indigo-500" />
                                Salary Range
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 bg-purple-50/50 border border-purple-100/50 rounded-lg focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400/50 transition-all"
                                value={jobData.salary}
                                onChange={(e) => setJobData({...jobData, salary: e.target.value})}
                                placeholder="e.g. ₹8-12 LPA"
                            />
                        </div>

                        <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                <FaFileAlt className="mr-2 text-indigo-500" />
                                Job Description
                            </label>
                            <textarea
                                required
                                rows="4"
                                className="w-full px-4 py-3 bg-purple-50/50 border border-purple-100/50 rounded-lg focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400/50 transition-all"
                                value={jobData.description}
                                onChange={(e) => setJobData({...jobData, description: e.target.value})}
                                placeholder="Describe the role and responsibilities..."
                            />
                        </div>

                        <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                <FaList className="mr-2 text-indigo-500" />
                                Requirements
                            </label>
                            <textarea
                                required
                                rows="4"
                                className="w-full px-4 py-3 bg-purple-50/50 border border-purple-100/50 rounded-lg focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400/50 transition-all"
                                value={jobData.requirements}
                                onChange={(e) => setJobData({...jobData, requirements: e.target.value})}
                                placeholder="List the required skills and qualifications..."
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-100/30 transition-all duration-300 disabled:opacity-50"
                            >
                                {loading ? 'Posting...' : 'Post Job'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 