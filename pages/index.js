import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to jobs page
        router.push('/jobs');
    }, []);

    return null;
} 