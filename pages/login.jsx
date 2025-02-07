'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiMail, FiLock } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const res = await fetch('https://job-portal-web-application-five.vercel.app/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                login(data.token);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Section - Form */}
            <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-20 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                            Welcome back
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Please sign in to your account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1 relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600">
                                        <FiMail className="h-5 w-5" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-3 text-gray-900 rounded-xl border-2 border-gray-200 
                                                 focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-300
                                                 hover:border-blue-600/30 bg-white"
                                        placeholder="name@company.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1 relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600">
                                        <FiLock className="h-5 w-5" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-3 text-gray-900 rounded-xl border-2 border-gray-200 
                                                 focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all duration-300
                                                 hover:border-blue-600/30 bg-white"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="relative w-full group flex items-center justify-center py-3 px-4 border border-transparent 
                                     text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 
                                     hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 
                                     focus:ring-blue-500 transform transition-all duration-300 hover:scale-[1.02] 
                                     active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="flex items-center space-x-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    <span>Signing in...</span>
                                </div>
                            ) : (
                                'Sign in'
                            )}
                        </button>

                        <p className="text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                                Create one now
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

            {/* Right Section - Image/Illustration */}
            <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800">
                    <div className="absolute inset-0 bg-grid-white/[0.2] bg-[length:16px_16px]" />
                </div>
                <div className="relative w-full h-full flex flex-col justify-center p-12 text-white">
                    <div className="max-w-md">
                        <div className="text-3xl font-bold mb-6">
                            Find Your Dream Job Today
                        </div>
                        <p className="text-blue-100 text-lg mb-12">
                            Connect with top employers and discover opportunities that match your skills and aspirations.
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-12">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                                <div className="text-2xl font-bold">10k+</div>
                                <div className="text-blue-200">Active Jobs</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                                <div className="text-2xl font-bold">8k+</div>
                                <div className="text-blue-200">Companies</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 