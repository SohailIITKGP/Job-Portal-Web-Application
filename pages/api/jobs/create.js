import pool from '../../../lib/db';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Verify user is authenticated
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.userId) {
            console.error('No user ID in token:', decoded);
            return res.status(401).json({ message: 'Invalid token - no user ID' });
        }

        console.log('User ID from token:', decoded.userId);
        const userId = decoded.userId;

        const { title, company, description, requirements, job_location, salary } = req.body;

        // Log the data being inserted
        console.log('Inserting job with data:', {
            title,
            company,
            description,
            requirements,
            job_location,
            salary,
            userId
        });

        // Validate required fields
        if (!title || !company || !description || !requirements || !job_location || !salary) {
            return res.status(400).json({ 
                message: 'All fields are required',
                missing: Object.entries({ title, company, description, requirements, job_location, salary })
                    .filter(([_, value]) => !value)
                    .map(([key]) => key)
            });
        }

        const connection = await pool.getConnection();
        try {
            // Convert undefined values to null
            const values = [
                title || null,
                company || null,
                description || null,
                requirements || null,
                job_location || null,
                salary || null,
                userId || null
            ];

            console.log('Executing query with values:', values);

            const [result] = await connection.execute(
                'INSERT INTO jobs (title, company, description, requirements, job_location, salary, employer_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
                values
            );

            console.log('Job inserted successfully:', result);

            res.status(201).json({ 
                message: 'Job posted successfully',
                jobId: result.insertId 
            });
        } catch (dbError) {
            console.error('Database error:', dbError);
            res.status(500).json({ 
                message: 'Error saving job to database',
                error: dbError.message,
                details: {
                    code: dbError.code,
                    sqlMessage: dbError.sqlMessage
                }
            });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ 
            message: 'Error creating job posting',
            error: error.message 
        });
    }
} 