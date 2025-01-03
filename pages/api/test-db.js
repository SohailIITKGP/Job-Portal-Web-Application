import pool from '../../lib/db';

export default async function handler(req, res) {
    try {
        const connection = await pool.getConnection();
        
        try {
            const [result] = await connection.query('SELECT 1 + 1 AS solution');
            console.log('Test query result:', result);
            
            res.status(200).json({
                status: 'success',
                message: 'Database connection working',
                data: result
            });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Database test failed:', {
            message: error.message,
            code: error.code,
            state: error.sqlState
        });
        
        res.status(500).json({
            status: 'error',
            message: 'Database connection failed',
            error: {
                message: error.message,
                code: error.code
            }
        });
    }
} 