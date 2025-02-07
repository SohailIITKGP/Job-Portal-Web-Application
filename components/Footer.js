import Link from 'next/link';
import { FaLinkedin, FaGithub, FaInstagram, FaBriefcase } from 'react-icons/fa';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

export default function Footer() {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: user ? user.email.split('@')[0] : 'Guest',
                    ...formData
                }),
            });

            if (res.ok) {
                toast.success('Message sent successfully!');
                setFormData({ email: '', message: '' });
            } else {
                toast.error('Failed to send message');
            }
        } catch (error) {
            toast.error('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div className="backdrop-blur-sm bg-white/10 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <FaBriefcase className="h-5 w-5" />
                            Job Portal
                        </h3>
                        <p className="text-white/90">
                            Connecting talented professionals with exciting opportunities.
                        </p>
                        <div className="flex space-x-4 mt-4">
                            <a 
                                href="https://www.linkedin.com/in/sohail-belim-082387258/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-white/90 hover:text-white hover:scale-110 transition-all duration-300"
                            >
                                <FaLinkedin className="h-6 w-6" />
                            </a>
                            <a 
                                href="https://github.com/SohailIITKGP" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-white/90 hover:text-white hover:scale-110 transition-all duration-300"
                            >
                                <FaGithub className="h-6 w-6" />
                            </a>
                            <a 
                                href="https://www.instagram.com/sohail.iit_kgp/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-white/90 hover:text-white hover:scale-110 transition-all duration-300"
                            >
                                <FaInstagram className="h-6 w-6" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="backdrop-blur-sm bg-white/10 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/jobs" className="text-white/90 hover:text-white transition-colors flex items-center gap-2">
                                    <span className="hover:translate-x-1 transition-transform">→</span>
                                    Browse Jobs
                                </Link>
                            </li>
                            <li>
                                <Link href="/post-job" className="text-white/90 hover:text-white transition-colors flex items-center gap-2">
                                    <span className="hover:translate-x-1 transition-transform">→</span>
                                    Post a Job
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Form */}
                    <div className="backdrop-blur-sm bg-white/10 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    required
                                    className="w-full px-3 py-2 bg-white/20 rounded-lg text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                            <div>
                                <textarea
                                    placeholder="Your Message"
                                    required
                                    rows="3"
                                    className="w-full px-3 py-2 bg-white/20 rounded-lg text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-all duration-300 disabled:opacity-50 hover:shadow-lg"
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                    <p className="text-center text-white/90">
                        © {new Date().getFullYear()} Job Portal. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
} 