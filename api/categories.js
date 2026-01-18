// Serverless function to fetch issue categories
// Returns all categories with their departments and keywords
// Last updated: 2026-01-18

const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
    // CORS headers - allow requests from NOTF sites
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
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow GET
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed. Use GET.' });
    }

    try {
        // Initialize Supabase with server-side credentials
        const supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_SERVICE_KEY
        );

        // Fetch all categories with their departments
        const { data: categories, error: categoriesError } = await supabase
            .from('issue_categories')
            .select(`
                id,
                code,
                name,
                keywords,
                department:departments(
                    id,
                    code,
                    name
                )
            `)
            .order('name');

        if (categoriesError) {
            throw categoriesError;
        }

        // Transform data to match expected format
        const formattedCategories = categories.map(cat => ({
            id: cat.code,  // Use code as ID for backward compatibility
            uuid: cat.id,  // Actual UUID
            name: cat.name,
            department: cat.department?.name || 'Other',
            departmentCode: cat.department?.code || 'other',
            keywords: cat.keywords || []
        }));

        // Return categories
        return res.status(200).json({
            success: true,
            categories: formattedCategories,
            count: formattedCategories.length,
            cached_at: new Date().toISOString()
        });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            error: 'Internal server error. Please try again later.',
            details: error.message
        });
    }
}
