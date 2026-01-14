// Serverless function to submit complaints
// API keys are hidden in Vercel environment variables

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    // CORS headers for your domain
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed. Use POST.' });
    }

    try {
        // Initialize Supabase with server-side credentials (hidden from client)
        const supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_SERVICE_KEY
        );

        // Parse complaint data
        const complaint = req.body;

        // Server-side validation (can't be bypassed by client!)
        if (!complaint.description || complaint.description.length < 10) {
            return res.status(400).json({
                error: 'Description must be at least 10 characters long.'
            });
        }

        if (!complaint.citizen_phone && !complaint.citizen_email) {
            return res.status(400).json({
                error: 'Please provide either a phone number or email address.'
            });
        }

        // Validate phone number format (if provided)
        if (complaint.citizen_phone) {
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(complaint.citizen_phone)) {
                return res.status(400).json({
                    error: 'Invalid phone number. Must be 10 digits starting with 6-9.'
                });
            }
        }

        // Validate email format (if provided)
        if (complaint.citizen_email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(complaint.citizen_email)) {
                return res.status(400).json({
                    error: 'Invalid email address format.'
                });
            }
        }

        // Insert complaint into database
        const { data, error } = await supabase
            .from('complaints')
            .insert({
                corporation_id: complaint.corporation_id,
                category_id: complaint.category_id,
                description: complaint.description,
                address: complaint.address,
                landmark: complaint.landmark,
                latitude: complaint.latitude,
                longitude: complaint.longitude,
                citizen_name: complaint.citizen_name,
                citizen_phone: complaint.citizen_phone,
                citizen_email: complaint.citizen_email,
                status: 'pending'
            })
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return res.status(500).json({
                error: 'Failed to submit complaint. Please try again.',
                details: error.message
            });
        }

        // Success! Return the created complaint with ticket number
        return res.status(200).json({
            success: true,
            complaint: data,
            message: `Complaint submitted successfully. Ticket: ${data.complaint_number}`
        });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            error: 'Internal server error. Please try again later.',
            details: error.message
        });
    }
}
