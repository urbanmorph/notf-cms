// Citizen Complaint Form - Supabase Integration
// This file handles the public complaint submission form

// Location picker state
let locationMap = null;
let locationMarker = null;

// Corporation center coordinates (calculated from GeoJSON boundaries)
const CORPORATION_CENTERS = {
    'north': { lat: 13.064921, lng: 77.576663, zoom: 12 },
    'south': { lat: 12.892644, lng: 77.590320, zoom: 12 },
    'east': { lat: 12.993589, lng: 77.708538, zoom: 12 },
    'west': { lat: 12.958023, lng: 77.528152, zoom: 12 },
    'central': { lat: 12.964367, lng: 77.612152, zoom: 13 },
    'default': { lat: 12.9716, lng: 77.5946, zoom: 11 }  // Bengaluru overall center
};

// Detect current corporation from page
function getCurrentCorporation() {
    // Check data-page attribute on body
    const bodyPage = document.body.dataset.page;
    if (bodyPage && CORPORATION_CENTERS[bodyPage]) {
        return bodyPage;
    }

    // Check hidden form field
    const corpField = document.getElementById('complaintCorporation');
    if (corpField) {
        const value = corpField.value.toLowerCase();
        if (value.includes('north')) return 'north';
        if (value.includes('south')) return 'south';
        if (value.includes('east')) return 'east';
        if (value.includes('west')) return 'west';
        if (value.includes('central')) return 'central';
    }

    // Check URL
    const path = window.location.pathname.toLowerCase();
    if (path.includes('north')) return 'north';
    if (path.includes('south')) return 'south';
    if (path.includes('east')) return 'east';
    if (path.includes('west')) return 'west';
    if (path.includes('central')) return 'central';

    return 'default';
}

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

// Load issue categories from Supabase (hierarchical with optgroups)
async function loadCategories() {
    if (!window.supabaseClient) return;

    try {
        // Load main categories (parent_id IS NULL)
        const { data: mainCategories, error: mainError } = await window.supabaseClient
            .from('issue_categories')
            .select('id, code, name')
            .is('parent_id', null)
            .order('display_order');

        if (mainError) throw mainError;

        // Load all subcategories
        const { data: subCategories, error: subError } = await window.supabaseClient
            .from('issue_categories')
            .select('id, code, name, parent_id')
            .not('parent_id', 'is', null)
            .order('display_order');

        if (subError) throw subError;

        // Store for later use
        window.categoriesData = { main: mainCategories, sub: subCategories };

        // Update the issue type dropdown if it exists
        const issueTypeSelect = document.getElementById('issueType');
        if (issueTypeSelect && mainCategories) {
            let optionsHTML = '<option value="">Select Issue Type</option>';

            mainCategories.forEach(category => {
                // Get subcategories for this main category
                const subs = subCategories?.filter(s => s.parent_id === category.id) || [];

                if (subs.length > 0) {
                    // Create optgroup with subcategories
                    optionsHTML += `<optgroup label="${category.name}">`;
                    subs.forEach(sub => {
                        optionsHTML += `<option value="${sub.id}">${sub.name}</option>`;
                    });
                    optionsHTML += '</optgroup>';
                } else {
                    // Main category without subcategories - add as direct option
                    optionsHTML += `<option value="${category.id}">${category.name}</option>`;
                }
            });

            issueTypeSelect.innerHTML = optionsHTML;
        }
    } catch (error) {
        console.error('Error loading categories:', error);
        // Keep the loading placeholder visible on error
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

    // formData.issueType is now a category UUID
    // Look up the category to get its department
    let categoryId = null;
    let departmentId = null;
    if (formData.issueType) {
        const { data: categoryData } = await window.supabaseClient
            .from('issue_categories')
            .select('id, department_id')
            .eq('id', formData.issueType)
            .single();

        if (categoryData) {
            categoryId = categoryData.id;
            departmentId = categoryData.department_id;
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
        category_id: categoryId,
        department_id: departmentId || mlDepartmentId,
        title: formData.title || 'Civic Issue',
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
            email: form.querySelector('[name="email"]')?.value,
            latitude: form.querySelector('[name="latitude"]')?.value || null,
            longitude: form.querySelector('[name="longitude"]')?.value || null
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

// Initialize location map in the complaint form
function initLocationMap() {
    const mapContainer = document.getElementById('locationMap');
    if (!mapContainer || locationMap) return;

    // Get corporation-specific center coordinates
    const corp = getCurrentCorporation();
    const center = CORPORATION_CENTERS[corp] || CORPORATION_CENTERS['default'];

    // Check if Leaflet is available
    if (typeof L === 'undefined') {
        mapContainer.innerHTML = '<p style="text-align: center; padding: 2rem; color: #64748b;">Map loading...</p>';
        return;
    }

    // Initialize map with corporation center
    locationMap = L.map('locationMap').setView([center.lat, center.lng], center.zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(locationMap);

    // Add click handler to place marker
    locationMap.on('click', function(e) {
        setLocationMarker(e.latlng.lat, e.latlng.lng);
    });

    // Add instruction overlay
    const instructionDiv = L.DomUtil.create('div', 'map-instruction');
    instructionDiv.innerHTML = 'Click on map to set location';
    instructionDiv.style.cssText = 'position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.7); color: white; padding: 4px 12px; border-radius: 4px; font-size: 0.75rem; z-index: 1000; pointer-events: none;';
    mapContainer.appendChild(instructionDiv);
}

// Set marker at specified location
function setLocationMarker(lat, lng) {
    if (!locationMap) return;

    // Remove existing marker
    if (locationMarker) {
        locationMap.removeLayer(locationMarker);
    }

    // Create custom icon
    const markerIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="background: #dc2626; width: 24px; height: 24px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>',
        iconSize: [24, 24],
        iconAnchor: [12, 24]
    });

    // Add new marker
    locationMarker = L.marker([lat, lng], {
        icon: markerIcon,
        draggable: true
    }).addTo(locationMap);

    // Update on drag
    locationMarker.on('dragend', function(e) {
        const pos = e.target.getLatLng();
        updateLocationFields(pos.lat, pos.lng);
    });

    // Update form fields
    updateLocationFields(lat, lng);

    // Center map on marker
    locationMap.setView([lat, lng], 16);
}

// Update hidden form fields with coordinates
function updateLocationFields(lat, lng) {
    const latField = document.getElementById('complaintLatitude');
    const lngField = document.getElementById('complaintLongitude');
    const coordsDisplay = document.getElementById('coordsDisplay');
    const coordsContainer = document.getElementById('locationCoords');

    if (latField) latField.value = lat.toFixed(8);
    if (lngField) lngField.value = lng.toFixed(8);

    if (coordsDisplay && coordsContainer) {
        coordsDisplay.textContent = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        coordsContainer.style.display = 'block';
    }
}

// Use device GPS to get current location
function useMyLocation() {
    const statusEl = document.getElementById('locationStatus');
    const btn = event.target.closest('.btn-location');

    if (!navigator.geolocation) {
        if (statusEl) {
            statusEl.textContent = 'Geolocation not supported';
            statusEl.className = 'location-status error';
        }
        return;
    }

    // Show loading state
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner" style="width:16px;height:16px;border:2px solid white;border-top-color:transparent;border-radius:50%;animation:spin 1s linear infinite;display:inline-block;"></span> Getting location...';
    }
    if (statusEl) {
        statusEl.textContent = '';
        statusEl.className = 'location-status';
    }

    // Add spinner animation if not exists
    if (!document.getElementById('spinnerStyle')) {
        const style = document.createElement('style');
        style.id = 'spinnerStyle';
        style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
        document.head.appendChild(style);
    }

    navigator.geolocation.getCurrentPosition(
        function(position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            // Initialize map if needed
            if (!locationMap) {
                initLocationMap();
                // Wait for map to initialize
                setTimeout(() => {
                    setLocationMarker(lat, lng);
                }, 100);
            } else {
                setLocationMarker(lat, lng);
            }

            // Update status
            if (statusEl) {
                statusEl.textContent = 'Location captured!';
                statusEl.className = 'location-status success';
            }

            // Restore button
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line></svg> Use My Location';
            }
        },
        function(error) {
            let message = 'Unable to get location';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    message = 'Location permission denied';
                    break;
                case error.POSITION_UNAVAILABLE:
                    message = 'Location unavailable';
                    break;
                case error.TIMEOUT:
                    message = 'Location request timed out';
                    break;
            }

            if (statusEl) {
                statusEl.textContent = message;
                statusEl.className = 'location-status error';
            }

            // Restore button
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line></svg> Use My Location';
            }
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
        }
    );
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

    // Initialize location map when modal opens
    const complaintModal = document.getElementById('complaintModal');
    if (complaintModal) {
        // Use MutationObserver to detect when modal becomes visible
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'style' || mutation.attributeName === 'class') {
                    const isVisible = complaintModal.style.display !== 'none' &&
                                     complaintModal.classList.contains('active');
                    if (isVisible && !locationMap) {
                        setTimeout(initLocationMap, 100);
                    }
                }
            });
        });
        observer.observe(complaintModal, { attributes: true });
    }
});

// Export functions for use in other scripts
window.ComplaintForm = {
    submit: submitComplaintToSupabase,
    classify: classifyComplaint,
    track: trackComplaint,
    init: initComplaintFormWithSupabase,
    handleSubmit: handleComplaintSubmit,
    useMyLocation: useMyLocation,
    initLocationMap: initLocationMap
};

// Expose functions globally for inline handlers
window.handleComplaintSubmit = handleComplaintSubmit;
window.useMyLocation = useMyLocation;
window.initLocationMap = initLocationMap;
