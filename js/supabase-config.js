// Supabase Configuration
const SUPABASE_URL = 'https://abblyaukkoxmgzwretvm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_I1nVJvhGbNwAgSiypEq1gg_KkMaKtar';

// Initialize Supabase client (loaded from CDN in HTML)
// Use a different variable name to avoid conflict with window.supabase from CDN
let supabaseClient = null;

function initSupabase() {
    if (supabaseClient) return supabaseClient; // Already initialized

    if (typeof window.supabase !== 'undefined' && typeof window.supabase.createClient === 'function') {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        // Expose as global for easy access
        window.supabaseClient = supabaseClient;
        console.log('Supabase client initialized successfully');
        return supabaseClient;
    } else {
        console.error('Supabase library not loaded yet');
        return null;
    }
}

// Wait for Supabase library to load and initialize
function waitForSupabase(maxAttempts = 50) {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        const check = () => {
            attempts++;
            if (typeof window.supabase !== 'undefined' && typeof window.supabase.createClient === 'function') {
                const client = initSupabase();
                resolve(client);
            } else if (attempts >= maxAttempts) {
                reject(new Error('Supabase library failed to load after ' + maxAttempts + ' attempts'));
            } else {
                setTimeout(check, 100);
            }
        };
        check();
    });
}

// Auto-initialize when script loads (if Supabase CDN is already loaded)
if (typeof window.supabase !== 'undefined') {
    initSupabase();
}

// Auth helper functions
async function signIn(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });
    if (error) throw error;
    return data;
}

async function signOut() {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
}

async function getCurrentUser() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    return user;
}

async function getSession() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    return session;
}

// Get admin user profile with corporation access
async function getAdminProfile(userId) {
    const { data, error } = await supabaseClient
        .from('admin_users')
        .select(`
            *,
            corporation:corporations(*)
        `)
        .eq('user_id', userId)
        .single();

    if (error) throw error;
    return data;
}

// Check if user is authenticated and is an admin
async function requireAdmin() {
    const session = await getSession();
    if (!session) {
        window.location.href = '/admin/login.html';
        return null;
    }

    try {
        const profile = await getAdminProfile(session.user.id);
        return profile;
    } catch (error) {
        console.error('Not an admin user:', error);
        await signOut();
        window.location.href = '/admin/login.html';
        return null;
    }
}

// Export for use in other files
window.SupabaseConfig = {
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    initSupabase,
    waitForSupabase,
    signIn,
    signOut,
    getCurrentUser,
    getSession,
    getAdminProfile,
    requireAdmin
};

// Also expose key functions globally for easier access
window.waitForSupabase = waitForSupabase;
window.initSupabase = initSupabase;
window.getSession = getSession;
