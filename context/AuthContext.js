import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        console.log('Checking auth token:', token ? 'exists' : 'not found');
        
        if (token) {
            try {
                const decoded = jwt.decode(token);
                setUser({ 
                    token,
                    id: decoded.userId,
                    email: decoded.email,
                    role: decoded.role
                });
            } catch (error) {
                console.error('Invalid token:', error);
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    const login = (token) => {
        console.log('Logging in user with token');
        localStorage.setItem('token', token);
        const decoded = jwt.decode(token);
        setUser({ 
            token,
            id: decoded.userId,
            email: decoded.email,
            role: decoded.role
        });
        router.push('/jobs');
    };

    const logout = () => {
        console.log('Logging out user');
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
} 