import pool from '../../lib/db';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const connection = await pool.getConnection();
        
        try {
            const [jobs] = await connection.query(`
                SELECT 
                    j.id,
                    j.title,
                    j.company,
                    j.description,
                    j.requirements,
                    j.job_location,
                    j.salary,
                    j.created_at,
                    u.name as employer_name
                FROM jobs j
                LEFT JOIN users u ON j.employer_id = u.id
                ORDER BY j.created_at DESC
            `);

            res.status(200).json({ jobs });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ message: 'Error fetching jobs' });
    }
} 