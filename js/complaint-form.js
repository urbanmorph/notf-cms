// Citizen Complaint Form - Supabase Integration
// This file handles the public complaint submission form

// ML Classification for auto-routing
const CLASSIFICATION_RULES = [
    {
        keywords: ['streetlight', 'street light', 'lamp', 'bulb', 'electrical', 'wire', 'transformer', 'light not working', 'dark street', 'no light', 'flickering', 'power'],
        department: 'electrical',
        confidence: 0.85
    },
    {
        keywords: ['garbage', 'waste', 'dustbin', 'rubbish', 'trash', 'dump', 'debris', 'not collected', 'overflow', 'stinking', 'smell', 'litter'],
        department: 'swm',
        confidence: 0.9
    },
    {
        keywords: ['pothole', 'road', 'footpath', 'pavement', 'tar', 'asphalt', 'crater', 'pit', 'road damage', 'speed breaker', 'bump'],
        department: 'roads',
        confidence: 0.88
    },
    {
        keywords: ['water', 'pipe', 'leak', 'supply', 'tap', 'borewell', 'no water', 'low pressure', 'contaminated', 'dirty water', 'brown water'],
        department: 'water',
        confidence: 0.87
    },
    {
        keywords: ['drain', 'sewage', 'manhole', 'flooding', 'waterlogging', 'gutter', 'blocked', 'clogged', 'overflow', 'choked'],
        department: 'drainage',
        confidence: 0.86
    },
    {
        keywords: ['tree', 'branch', 'fallen', 'pruning', 'forest', 'uprooted', 'leaning', 'dangerous tree'],
        department: 'forest',
        confidence: 0.82
    },
    {
        keywords: ['mosquito', 'health', 'sanitation', 'toilet', 'dead animal', 'carcass', 'breeding', 'dengue', 'malaria'],
        department: 'health',
        confidence: 0.8
    },
    {
        keywords: ['dog', 'stray', 'cattle', 'cow', 'bull', 'animal', 'barking', 'bite', 'aggressive'],
        department: 'animals',
        confidence: 0.83
    }
];

// Corporation code mapping
const CORPORATION_CODES = {
    'Bengaluru North City Corporation': 'north',
    'Bengaluru South City Corporation': 'south',
    'Bengaluru East City Corporation': 'east',
    'Bengaluru West City Corporation': 'west',
    'Bengaluru Central City Corporation': 'central'
};

// Classify complaint using ML/keyword matching
function classifyComplaint(title, description) {
    const text = `${title} ${description}`.toLowerCase();
    let bestMatch = { department: 'other', confidence: 0 };

    for (const rule of CLASSIFICATION_RULES) {
        const matchCount = rule.keywords.filter(kw => text.includes(kw)).length;
        if (matchCount > 0) {
            const ruleConfidence = rule.confidence * (matchCount / rule.keywords.length);
            if (ruleConfidence > bestMatch.confidence) {
                bestMatch = {
                    department: rule.department,
                    confidence: ruleConfidence
                };
            }
        }
    }

    return bestMatch;
}

// Determine priority based on keywords
function determinePriority(title, description) {
    const text = `${title} ${description}`.toLowerCase();

    const criticalKeywords = ['emergency', 'urgent', 'dangerous', 'life threatening', 'accident', 'fire', 'collapse', 'electrocution'];
    const highKeywords = ['severe', 'major', 'blocking', 'multiple', 'widespread', 'health hazard', 'children', 'elderly'];
    const lowKeywords = ['minor', 'small', 'cosmetic', 'suggestion', 'feedback'];

    for (const kw of criticalKeywords) {
        if (text.includes(kw)) return 'critical';
    }
    for (const kw of highKeywords) {
        if (text.includes(kw)) return 'high';
    }
    for (const kw of lowKeywords) {
        if (text.includes(kw)) return 'low';
    }

    return 'medium';
}

// Initialize complaint form with Supabase
async function initComplaintFormWithSupabase() {
    // Check if Supabase is available
    if (typeof window.supabase === 'undefined') {
        console.log('Supabase not loaded, complaint form will work in offline mode');
        return;
    }

    // Initialize Supabase client
    const SUPABASE_URL = 'https://abblyaukkoxmgzwretvm.supabase.co';
    const SUPABASE_ANON_KEY = 'sb_publishable_I1nVJvhGbNwAgSiypEq1gg_KkMaKtar';

    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Load categories for dropdown
    await loadCategories();
}

// Load issue categories from Supabase
async function loadCategories() {
    if (!window.supabaseClient) return;

    try {
        const { data: departments, error } = await window.supabaseClient
            .from('departments')
            .select(`
                id,
                code,
                name,
                issue_categories (
                    id,
                    code,
                    name
                )
            `)
            .order('name');

        if (error) throw error;

        // Store for later use
        window.departmentsData = departments;

        // Update the issue type dropdown if it exists
        const issueTypeSelect = document.getElementById('issueType');
        if (issueTypeSelect && departments) {
            // Keep existing options or rebuild
            const currentOptions = issueTypeSelect.innerHTML;
            if (!currentOptions.includes('data-loaded')) {
                let optionsHTML = '<option value="" data-loaded="true">Select Issue Type</option>';
                departments.forEach(dept => {
                    optionsHTML += `<option value="${dept.code}">${dept.name}</option>`;
                });
                issueTypeSelect.innerHTML = optionsHTML;
            }
        }
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

// Submit complaint to Supabase
async function submitComplaintToSupabase(formData) {
    if (!window.supabaseClient) {
        throw new Error('Database connection not available. Please try again later.');
    }

    const corporation = formData.corporation;
    const corpCode = CORPORATION_CODES[corporation] || 'central';

    // Get corporation ID
    const { data: corpData, error: corpError } = await window.supabaseClient
        .from('corporations')
        .select('id')
        .eq('code', corpCode)
        .single();

    if (corpError) {
        console.error('Corporation lookup error:', corpError);
        throw new Error('Unable to identify corporation. Please try again.');
    }

    // Get department ID based on issue type
    let departmentId = null;
    if (formData.issueType) {
        const { data: deptData } = await window.supabaseClient
            .from('departments')
            .select('id')
            .eq('code', formData.issueType)
            .single();

        if (deptData) {
            departmentId = deptData.id;
        }
    }

    // ML Classification
    const classification = classifyComplaint(formData.title || formData.issueType, formData.description);
    const priority = determinePriority(formData.title || formData.issueType, formData.description);

    // Get ML suggested department ID
    let mlDepartmentId = null;
    if (classification.department) {
        const { data: mlDept } = await window.supabaseClient
            .from('departments')
            .select('id')
            .eq('code', classification.department)
            .single();

        if (mlDept) {
            mlDepartmentId = mlDept.id;
        }
    }

    // Build complaint object
    const complaint = {
        corporation_id: corpData.id,
        department_id: departmentId || mlDepartmentId,
        title: formData.title || `${formData.issueType} Issue`,
        description: formData.description,
        address: formData.address,
        landmark: formData.landmark,
        citizen_name: formData.name,
        citizen_phone: formData.phone,
        citizen_email: formData.email,
        status: 'new',
        priority: priority,
        ml_department_id: mlDepartmentId,
        ml_confidence: classification.confidence
    };

    // Add location if provided
    if (formData.latitude && formData.longitude) {
        complaint.latitude = formData.latitude;
        complaint.longitude = formData.longitude;
    }

    // Insert complaint
    const { data, error } = await window.supabaseClient
        .from('complaints')
        .insert([complaint])
        .select()
        .single();

    if (error) {
        console.error('Complaint submission error:', error);
        throw new Error('Failed to submit complaint. Please try again.');
    }

    return data;
}

// Enhanced complaint form submission handler
async function handleComplaintSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : 'Submit';

    // Show loading state
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
    }

    try {
        // Ensure Supabase is initialized
        if (!window.supabaseClient) {
            await initComplaintFormWithSupabase();
        }

        // Gather form data from named fields
        const formData = {
            corporation: form.querySelector('[name="corporation"]')?.value || document.getElementById('complaintCorporation')?.value,
            issueType: form.querySelector('[name="issueType"]')?.value,
            title: form.querySelector('[name="issueType"]')?.selectedOptions?.[0]?.text || form.querySelector('[name="issueType"]')?.value,
            description: form.querySelector('[name="description"]')?.value,
            address: form.querySelector('[name="address"]')?.value,
            landmark: form.querySelector('[name="landmark"]')?.value,
            name: form.querySelector('[name="name"]')?.value,
            phone: form.querySelector('[name="phone"]')?.value,
            email: form.querySelector('[name="email"]')?.value
        };

        console.log('Submitting complaint:', formData);

        // Validate required fields
        if (!formData.description) {
            throw new Error('Please provide a description of your complaint.');
        }
        if (!formData.phone && !formData.email) {
            throw new Error('Please provide either a phone number or email for updates.');
        }
        if (!formData.address) {
            throw new Error('Please provide the location of the issue.');
        }

        // Submit to Supabase
        const result = await submitComplaintToSupabase(formData);

        // Show success message
        const complaintNumber = result.complaint_number || 'Generated';
        showSuccessMessage(complaintNumber, formData.phone);

        // Close modal and reset form
        if (typeof closeModal === 'function') {
            closeModal('complaintModal');
        }
        form.reset();

    } catch (error) {
        console.error('Submission error:', error);
        alert(error.message || 'Failed to submit complaint. Please try again.');
    } finally {
        // Restore button
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }

    return false;
}

// Show success message after submission
function showSuccessMessage(complaintNumber, phone) {
    const message = `
Thank you! Your complaint has been submitted successfully.

Complaint Number: ${complaintNumber}

You will receive updates via ${phone ? 'SMS' : 'email'}.
Please save your complaint number for future reference.
    `.trim();

    alert(message);
}

// Track complaint status (public function)
async function trackComplaint(complaintNumber) {
    if (!window.supabaseClient) {
        alert('Unable to connect to the system. Please try again later.');
        return null;
    }

    try {
        const { data, error } = await window.supabaseClient
            .from('complaints')
            .select(`
                complaint_number,
                title,
                description,
                status,
                priority,
                created_at,
                resolved_at,
                department:departments(name)
            `)
            .eq('complaint_number', complaintNumber.toUpperCase())
            .single();

        if (error || !data) {
            alert('Complaint not found. Please check the complaint number and try again.');
            return null;
        }

        return data;
    } catch (error) {
        console.error('Track complaint error:', error);
        alert('Unable to track complaint. Please try again later.');
        return null;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Supabase connection
    initComplaintFormWithSupabase();

    // Override the existing form submission handler
    const complaintForm = document.getElementById('complaintForm');
    if (complaintForm) {
        // Remove existing handler and add new one
        complaintForm.removeEventListener('submit', submitComplaint);
        complaintForm.addEventListener('submit', handleComplaintSubmit);
    }
});

// Export functions for use in other scripts
window.ComplaintForm = {
    submit: submitComplaintToSupabase,
    classify: classifyComplaint,
    track: trackComplaint,
    init: initComplaintFormWithSupabase,
    handleSubmit: handleComplaintSubmit
};

// Expose handleComplaintSubmit globally for inline form handlers
window.handleComplaintSubmit = handleComplaintSubmit;
