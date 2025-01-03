import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsBriefcaseFill } from 'react-icons/bs';
import { HiMenu, HiX } from 'react-icons/hi';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const router = useRouter();

    return (
        <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/jobs" className="flex items-center space-x-3">
                        <BsBriefcaseFill className="h-8 w-8 text-white" />
                        <span className="text-white text-xl font-bold">JobPortal</span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/jobs" className="text-white/90 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                            Jobs
                        </Link>
                        {user && (
                            <Link href="/post-job" className="text-white/90 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Post Job
                            </Link>
                        )}
                        {!user ? (
                            <Link 
                                href="/login" 
                                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg border border-white/20"
                            >
                                Sign in
                            </Link>
                        ) : (
                            <button
                                onClick={logout}
                                className="bg-red-500/80 hover:bg-red-600/80 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg backdrop-blur-sm"
                            >
                                Sign out
                            </button>
                        )}
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 transition-colors focus:outline-none"
                        >
                            {isMenuOpen ? (
                                <HiX className="block h-6 w-6" />
                            ) : (
                                <HiMenu className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 backdrop-blur-sm bg-white/5 rounded-lg mt-2 border border-white/10">
                            <Link
                                href="/jobs"
                                className="text-white/90 hover:text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Jobs
                            </Link>
                            {user && (
                                <Link
                                    href="/post-job"
                                    className="text-white/90 hover:text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Post Job
                                </Link>
                            )}
                            {!user ? (
                                <Link
                                    href="/login"
                                    className="text-white/90 hover:text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign in
                                </Link>
                            ) : (
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="text-white/90 hover:text-white hover:bg-red-500/50 w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
                                >
                                    Sign out
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar; 