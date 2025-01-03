import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { name, email, message } = req.body;

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: {
                name: 'Job Portal Contact Form',
                address: process.env.EMAIL_USER
            },
            to: 'sohailbelim2425@gmail.com',
            subject: `New Message from ${name}`,
            html: `
                <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%); padding: 20px; border-radius: 10px 10px 0 0;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Message</h1>
                    </div>
                    
                    <div style="border: 1px solid #e5e7eb; border-top: none; padding: 20px; border-radius: 0 0 10px 10px; background-color: white;">
                        <div style="margin-bottom: 20px;">
                            <div style="font-weight: bold; color: #4f46e5; font-size: 16px; margin-bottom: 5px;">From:</div>
                            <div style="background-color: #f3f4f6; padding: 10px; border-radius: 6px;">
                                <div style="margin-bottom: 5px;"><strong>Name:</strong> ${name}</div>
                                <div><strong>Email:</strong> ${email}</div>
                            </div>
                        </div>

                        <div>
                            <div style="font-weight: bold; color: #4f46e5; font-size: 16px; margin-bottom: 5px;">Message:</div>
                            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; line-height: 1.5;">
                                ${message}
                            </div>
                        </div>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                            <p style="color: #6b7280; font-size: 14px; margin: 0;">
                                This message was sent from the Job Portal contact form.
                            </p>
                        </div>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
} 