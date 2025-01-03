import pool from '../../../lib/db';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Get user from token
        const token = req.headers.authorization?.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = decoded.email;

        const { jobId, name, phone, experience, coverLetter } = req.body;

        // Save application to database
        const connection = await pool.getConnection();
        try {
            // Get job details
            const [jobs] = await connection.execute(
                'SELECT title, company FROM jobs WHERE id = ?',
                [jobId]
            );

            if (jobs.length === 0) {
                return res.status(404).json({ message: 'Job not found' });
            }

            const job = jobs[0];

            // Save application
            const [result] = await connection.execute(
                'INSERT INTO applications (job_id, name, email, phone, experience, cover_letter) VALUES (?, ?, ?, ?, ?, ?)',
                [jobId, name, userEmail, phone, experience, coverLetter]
            );

            // Create transporter with updated configuration
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // use SSL
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD // Note: using EMAIL_PASSWORD instead of EMAIL_PASS
                },
                debug: true // Enable debug logs
            });

            // Verify SMTP connection
            try {
                await transporter.verify();
                console.log('SMTP connection verified successfully');
            } catch (error) {
                console.error('SMTP verification failed:', error);
                throw error;
            }

            const emailTemplate = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2563eb;">Job Application Confirmation</h2>
                    <p>Dear ${name},</p>
                    <p>Thank you for applying to the position of <strong>${job.title}</strong> at <strong>${job.company}</strong>.</p>
                    
                    <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #374151; margin-top: 0;">Application Details:</h3>
                        <ul style="list-style: none; padding: 0;">
                            <li><strong>Position:</strong> ${job.title}</li>
                            <li><strong>Company:</strong> ${job.company}</li>
                            <li><strong>Experience:</strong> ${experience} years</li>
                            <li><strong>Phone:</strong> ${phone}</li>
                        </ul>
                    </div>

                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                        <p style="color: #6b7280; font-size: 14px;">Best regards,<br>Job Portal Team</p>
                    </div>
                </div>
            `;

            try {
                // Send email with better error handling
                const info = await transporter.sendMail({
                    from: {
                        name: 'Job Portal',
                        address: process.env.EMAIL_USER
                    },
                    to: userEmail,
                    subject: `Application Confirmation - ${job.title} at ${job.company}`,
                    html: emailTemplate
                });

                console.log('Email sent successfully:', info.messageId);
            } catch (emailError) {
                console.error('Error sending email:', emailError);
                // Don't throw error here, just log it
                // We still want to return success if application was saved
            }

            res.status(201).json({ 
                message: 'Application submitted successfully',
                applicationId: result.insertId 
            });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Application error:', error);
        res.status(500).json({ 
            message: 'Error submitting application',
            error: error.message 
        });
    }
} 