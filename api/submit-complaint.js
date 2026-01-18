// Serverless function to submit complaints
// API keys are hidden in Vercel environment variables
// Last updated: 2026-01-18 - Added CORS restrictions, metadata support, and source tracking for NOTF chatbot integration

const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
    // CORS headers - restrict to specific origins for security
    const allowedOrigins = [
        'https://notf.vercel.app',
        'https://notf-one.vercel.app',
        'https://notf-cms.vercel.app',
        'http://localhost:8080',
        'http://127.0.0.1:8080'
    ];

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');

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

        // Convert corporation code (e.g., "north") to UUID
        let corporationId = complaint.corporation_id;
        if (typeof complaint.corporation_id === 'string' && !complaint.corporation_id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
            // It's a code like "north", "south", etc. - look up the UUID
            const { data: corpData, error: corpError } = await supabase
                .from('corporations')
                .select('id')
                .eq('code', complaint.corporation_id.toLowerCase())
                .single();

            if (corpError || !corpData) {
                return res.status(400).json({
                    error: 'Invalid corporation code: ' + complaint.corporation_id
                });
            }

            corporationId = corpData.id;
        }

        // Convert category code (e.g., "garbage_not_collected") to UUID
        let categoryId = complaint.category_id;
        if (categoryId && typeof categoryId === 'string' && !categoryId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
            // It's a code like "garbage_not_collected" - look up the UUID
            const { data: catData, error: catError } = await supabase
                .from('issue_categories')
                .select('id')
                .eq('code', categoryId.toLowerCase())
                .single();

            if (catError || !catData) {
                console.warn('Category code not found:', categoryId, '- setting to null');
                categoryId = null; // Don't reject, just set to null
            } else {
                categoryId = catData.id;
            }
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

        // Build complaint object
        const complaintData = {
            corporation_id: corporationId,
            category_id: categoryId || null,  // Use converted UUID (or null)
            title: complaint.title || 'Civic Issue',  // Default title if not provided
            description: complaint.description,
            address: complaint.address,
            landmark: complaint.landmark || '',
            citizen_name: complaint.citizen_name || null,
            citizen_phone: complaint.citizen_phone || null,
            citizen_email: complaint.citizen_email || null,
            status: 'new'
        };

        // Add optional fields if provided
        if (complaint.latitude && complaint.longitude) {
            complaintData.latitude = complaint.latitude;
            complaintData.longitude = complaint.longitude;
        }
        if (complaint.department_id) {
            complaintData.department_id = complaint.department_id;
        }
        if (complaint.priority) {
            complaintData.priority = complaint.priority;
        }

        // Add metadata with source tracking
        const metadata = complaint.metadata || {};
        if (!metadata.source) {
            // Auto-detect source if not provided
            metadata.source = (origin?.includes('notf.vercel.app') || origin?.includes('notf-one.vercel.app')) ? 'notf-chatbot' : 'notf-cms-chatbot';
            metadata.submitted_at = new Date().toISOString();
            metadata.origin = origin;
        }
        complaintData.metadata = metadata;

        // Insert complaint into database
        const { data, error } = await supabase
            .from('complaints')
            .insert(complaintData)
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
