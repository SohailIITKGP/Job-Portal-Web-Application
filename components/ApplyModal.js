import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { IoClose } from 'react-icons/io5';

export default function ApplyModal({ job, onClose }) {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        experience: '',
        coverLetter: ''
    });
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/applications/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    jobId: job.id,
                    ...formData
                }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Application submitted successfully!', {
                    position: "top-right",
                    autoClose: 3000
                });
                onClose();
            } else {
                toast.error(data.message || 'Failed to submit application', {
                    position: "top-right",
                    autoClose: 5000
                });
            }
        } catch (error) {
            console.error('Application error:', error);
            toast.error('An error occurred while submitting your application', {
                position: "top-right",
                autoClose: 5000
            });
        } finally {
            setLoading(false);
        }
    };

    const modalContent = (
        <>
            <div 
                className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <div 
                        className="relative bg-white/95 backdrop-blur-md rounded-xl shadow-2xl w-full max-w-md transform transition-all border border-purple-100/20"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="p-6">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <IoClose className="h-6 w-6" />
                            </button>

                            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Apply for {job.title}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100/50 rounded-lg focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400/50 transition-all"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        placeholder="Your Name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100/50 rounded-lg focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400/50 transition-all"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        placeholder="+91 1234567890"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Years of Experience
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100/50 rounded-lg focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400/50 transition-all"
                                        value={formData.experience}
                                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                                        placeholder="2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Cover Letter
                                    </label>
                                    <textarea
                                        required
                                        rows="4"
                                        className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100/50 rounded-lg focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400/50 transition-all"
                                        value={formData.coverLetter}
                                        onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
                                        placeholder="Tell us why you're interested in this position..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-100/30 transition-all duration-300 disabled:opacity-50"
                                >
                                    {loading ? 'Submitting...' : 'Submit Application'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    if (!mounted) return null;

    return createPortal(
        modalContent,
        document.body
    );
} 