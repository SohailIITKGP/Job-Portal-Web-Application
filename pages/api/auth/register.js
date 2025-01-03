import pool from '../../../lib/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    console.log('Register API called');

    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ 
                message: 'Missing required fields' 
            });
        }

        console.log('Attempting to hash password...');
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log('Getting database connection...');
        const connection = await pool.getConnection();

        try {
            // Check if user exists
            console.log('Checking for existing user...');
            const [users] = await connection.execute(
                'SELECT id FROM users WHERE email = ?',
                [email]
            );

            if (users.length > 0) {
                return res.status(400).json({ 
                    message: 'Email already registered' 
                });
            }

            // Insert new user
            console.log('Creating new user...');
            const [result] = await connection.execute(
                'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
                [name, email, hashedPassword, role || 'user']
            );

            console.log('User created successfully:', {
                id: result.insertId,
                name,
                email,
                role
            });

            res.status(201).json({ 
                message: 'Registration successful',
                userId: result.insertId 
            });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Registration error:', {
            message: error.message,
            code: error.code,
            state: error.sqlState
        });

        res.status(500).json({ 
            message: 'Registration failed',
            error: error.message
        });
    }
} 