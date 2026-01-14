// Chat-based Complaint Form
// This file handles the conversational UI for filing complaints

// ML Classification Rules (same as traditional form)
const CLASSIFICATION_RULES = [
    {
        keywords: ['streetlight', 'street light', 'lamp', 'bulb', 'electrical', 'wire', 'transformer', 'light not working', 'dark street', 'no light', 'flickering', 'power'],
        department: 'electrical',
        categoryKeywords: ['street light', 'electrical'],
        confidence: 0.85
    },
    {
        keywords: ['garbage', 'waste', 'dustbin', 'rubbish', 'trash', 'dump', 'debris', 'not collected', 'overflow', 'stinking', 'smell', 'litter'],
        department: 'swm',
        categoryKeywords: ['garbage', 'waste'],
        confidence: 0.9
    },
    {
        keywords: ['pothole', 'road', 'footpath', 'pavement', 'tar', 'asphalt', 'crater', 'pit', 'road damage', 'speed breaker', 'bump'],
        department: 'roads',
        categoryKeywords: ['road', 'pothole'],
        confidence: 0.88
    },
    {
        keywords: ['water supply', 'water tank', 'tap', 'borewell', 'no water', 'low pressure', 'contaminated', 'dirty water', 'brown water', 'water connection'],
        department: 'water',
        categoryKeywords: ['water'],
        confidence: 0.87
    },
    {
        keywords: ['drain', 'sewage', 'sewer', 'manhole', 'flooding', 'waterlogging', 'gutter', 'blocked', 'clogged', 'overflow', 'choked', 'sewage pipe', 'drainage pipe', 'underground drainage', 'septic'],
        department: 'drainage',
        categoryKeywords: ['drainage', 'sewage', 'drain'],
        confidence: 0.9
    },
    {
        keywords: ['tree', 'branch', 'fallen', 'pruning', 'forest', 'uprooted', 'leaning', 'dangerous tree'],
        department: 'forest',
        categoryKeywords: ['tree', 'forest'],
        confidence: 0.82
    },
    {
        keywords: ['mosquito', 'health', 'sanitation', 'toilet', 'dead animal', 'carcass', 'breeding', 'dengue', 'malaria'],
        department: 'health',
        categoryKeywords: ['health', 'sanitation'],
        confidence: 0.8
    },
    {
        keywords: ['dog', 'stray', 'cattle', 'cow', 'bull', 'animal', 'barking', 'bite', 'aggressive'],
        department: 'animals',
        categoryKeywords: ['animal', 'stray'],
        confidence: 0.83
    }
];

// Classify complaint using keyword matching
function classifyComplaint(text) {
    const lowerText = text.toLowerCase();
    const matches = [];

    for (const rule of CLASSIFICATION_RULES) {
        const matchCount = rule.keywords.filter(kw => lowerText.includes(kw)).length;
        if (matchCount > 0) {
            const ruleConfidence = rule.confidence * (matchCount / rule.keywords.length);
            matches.push({
                department: rule.department,
                categoryKeywords: rule.categoryKeywords,
                confidence: ruleConfidence,
                matchCount: matchCount
            });
        }
    }

    // Sort by confidence (highest first)
    matches.sort((a, b) => b.confidence - a.confidence);

    return matches;
}

// Location extraction helper

// Extract location from description text
function extractLocationFromText(text) {
    const lowerText = text.toLowerCase();

    // Location patterns to look for
    const patterns = [
        /(?:in|at|near|on|around)\s+([a-z\s]+(?:road|street|layout|nagar|area|circle|cross|main|extension|park|lake|hospital|school|bus stop|metro|junction|signal))/i,
        /(?:in|at|near|on|around)\s+([a-z\s]{3,30})/i, // Generic pattern
    ];

    // Common Bengaluru location keywords that indicate a location
    const locationIndicators = [
        'layout', 'nagar', 'road', 'street', 'cross', 'main', 'circle', 'area',
        'extension', 'park', 'lake', 'colony', 'phase', 'stage', 'sector',
        'hebbal', 'yelahanka', 'sanjaynagar', 'jalahalli', 'mathikere', 'malleshwaram',
        'rajajinagar', 'vijayanagar', 'basaveshwara', 'yeshwanthpur',
        'koramangala', 'btm', 'jayanagar', 'banashankari', 'jp nagar', 'kumaraswamy',
        'bannerghatta', 'bommanahalli', 'hsr', 'sarjapur',
        'whitefield', 'marathahalli', 'brookefield', 'mahadevapura', 'kr puram',
        'indiranagar', 'domlur', 'ulsoor',
        'rajajinagar', 'mahalakshmi', 'magadi', 'kamakshipalya', 'kengeri'
    ];

    let bestMatch = null;
    let highestConfidence = 0;

    for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match && match[1]) {
            const location = match[1].trim();

            // Calculate confidence based on keywords
            let confidence = 0.3; // Base confidence for pattern match

            // Boost confidence if it contains location indicators
            const hasIndicator = locationIndicators.some(indicator =>
                location.toLowerCase().includes(indicator)
            );

            if (hasIndicator) {
                confidence += 0.4;
            }

            // Boost confidence based on length (not too short, not too long)
            if (location.length >= 5 && location.length <= 50) {
                confidence += 0.2;
            }

            // Boost if it contains multiple words (more specific)
            const wordCount = location.split(/\s+/).length;
            if (wordCount >= 2 && wordCount <= 5) {
                confidence += 0.1;
            }

            if (confidence > highestConfidence) {
                highestConfidence = confidence;
                bestMatch = {
                    location: location,
                    confidence: Math.min(confidence, 1.0)
                };
            }
        }
    }

    return bestMatch;
}

// Geocoding and boundary helper functions

// Geocode an address string using Nominatim
async function geocodeAddress(address, corporationId = 'north') {
    if (!address || address.length < 5) return null;

    // Append Bengaluru to improve accuracy
    const searchQuery = address.toLowerCase().includes('bengaluru') ||
                       address.toLowerCase().includes('bangalore')
        ? address
        : `${address}, Bengaluru`;

    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=5&viewbox=77.35,12.75,77.85,13.20&bounded=1`
        );

        if (!response.ok) return null;

        const results = await response.json();

        if (results && results.length > 0) {
            return {
                lat: parseFloat(results[0].lat),
                lng: parseFloat(results[0].lon),
                display_name: results[0].display_name,
                allResults: results
            };
        }

        return null;
    } catch (error) {
        console.error('Geocoding error:', error);
        return null;
    }
}

// Reverse geocode coordinates to get address
async function reverseGeocode(lat, lng) {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );

        if (!response.ok) return null;

        const result = await response.json();

        if (result && result.display_name) {
            return result.display_name;
        }

        return null;
    } catch (error) {
        console.error('Reverse geocoding error:', error);
        return null;
    }
}

// Check if a point is within the corporation boundary using Turf.js
function isPointInBoundary(lat, lng, boundary) {
    if (!boundary) {
        console.warn('Corporation boundary not loaded');
        return true; // Allow if boundary not loaded
    }

    if (typeof turf === 'undefined') {
        console.warn('Turf.js not loaded, skipping boundary check');
        return true;
    }

    try {
        const point = turf.point([lng, lat]); // GeoJSON uses [lng, lat]
        const polygon = turf.polygon(boundary.geometry.coordinates);
        return turf.booleanPointInPolygon(point, polygon);
    } catch (error) {
        console.error('Point-in-polygon check failed:', error);
        return true; // Fail-open on error
    }
}

// Chat State Enum
const ChatStates = {
    WELCOME: 'welcome',
    DESCRIPTION: 'awaiting_description',
    TAGS: 'awaiting_tags',
    LOCATION: 'awaiting_location',
    CONTACT: 'awaiting_contact',
    NAME: 'awaiting_name',
    PHOTO: 'awaiting_photo',
    REVIEW: 'review',
    SUBMITTED: 'submitted'
};

// Chat Bot Class
class ComplaintChatbot {
    constructor(corporationId) {
        this.state = ChatStates.WELCOME;
        this.corporationId = corporationId || 'north';
        this.formData = {
            corporation_id: this.corporationId,
            description: '',
            category_id: null,
            latitude: null,
            longitude: null,
            address: '',
            landmark: '',
            citizen_name: null,
            citizen_phone: null,
            citizen_email: null,
            photo: null
        };
        this.messages = [];
        this.currentSuggestions = [];
        this.allCategories = []; // Store all categories from database

        // Map state
        this.map = null;
        this.marker = null;
        this.boundary = null;
        this.boundaryLayer = null;

        this.init();
    }

    async init() {
        // Wait for Supabase to be ready
        await waitForSupabase();

        // Load categories from database
        await this.loadCategories();

        // Initialize map
        await this.initMap();

        // Load corporation boundary
        await this.loadBoundary();

        // Set up event listeners
        this.setupEventListeners();

        // Show welcome message
        this.showWelcomeMessage();
    }

    async loadCategories() {
        try {
            // Load all issue categories from database
            const { data: categories, error } = await window.supabaseClient
                .from('issue_categories')
                .select('id, code, name, parent_id, department_id')
                .order('display_order');

            if (error) {
                console.error('Error loading categories:', error);
                return;
            }

            this.allCategories = categories || [];
            console.log('Loaded', this.allCategories.length, 'categories from database');
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    }

    async loadBoundary() {
        try {
            // Load corporation boundary GeoJSON
            const response = await fetch('files/gba_corporation.geojson');
            const geojson = await response.json();

            // Map corporation IDs to their names in the GeoJSON
            const corpNameMap = {
                'north': 'Bengaluru North City Corporation',
                'south': 'Bengaluru South City Corporation',
                'east': 'Bengaluru East City Corporation',
                'west': 'Bengaluru West City Corporation',
                'central': 'Bengaluru Central City Corporation'
            };

            const searchName = corpNameMap[this.corporationId];

            // Find the boundary for this corporation (property is 'namecol' in the GeoJSON)
            const feature = geojson.features.find(f =>
                f.properties.namecol && f.properties.namecol === searchName
            );

            if (feature) {
                this.boundary = feature;

                // Add boundary to map
                if (this.map && this.boundary) {
                    this.boundaryLayer = L.geoJSON(this.boundary, {
                        style: {
                            color: '#667eea',
                            weight: 3,
                            opacity: 0.6,
                            fillOpacity: 0.1
                        }
                    }).addTo(this.map);

                    // Fit map to boundary
                    this.map.fitBounds(this.boundaryLayer.getBounds());
                }

                console.log('Loaded boundary for', this.corporationId, ':', searchName);
            } else {
                console.warn('Boundary not found for', this.corporationId, '- looking for:', searchName);
                console.warn('Available boundaries:', geojson.features.map(f => f.properties.namecol));
            }
        } catch (error) {
            console.error('Error loading boundary:', error);
        }
    }

    setupEventListeners() {
        const sendBtn = document.getElementById('sendBtn');
        const messageInput = document.getElementById('messageInput');
        const attachBtn = document.getElementById('attachBtn');
        const photoInput = document.getElementById('photoInput');
        const useGpsBtn = document.getElementById('useGpsBtn');

        // Send button click
        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.handleSend());
        }

        // Enter key to send
        if (messageInput) {
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handleSend();
                }
            });
        }

        // Attach photo button
        if (attachBtn) {
            attachBtn.addEventListener('click', () => {
                photoInput.click();
            });
        }

        // Photo selection
        if (photoInput) {
            photoInput.addEventListener('change', (e) => {
                this.handlePhotoUpload(e.target.files[0]);
            });
        }

        // Use GPS button
        if (useGpsBtn) {
            useGpsBtn.addEventListener('click', () => {
                this.useMyLocation();
            });
        }
    }

    showWelcomeMessage() {
        // Get corporation name
        const corpNames = {
            'north': 'Bengaluru North City Corporation',
            'south': 'Bengaluru South City Corporation',
            'east': 'Bengaluru East City Corporation',
            'west': 'Bengaluru West City Corporation',
            'central': 'Bengaluru Central City Corporation'
        };

        const corpName = corpNames[this.corporationId] || 'Greater Bengaluru Corporation';

        this.addBotMessage(`Hello! 👋 I\'m here to help you file a complaint with the ${corpName}.`);

        setTimeout(() => {
            this.addBotMessage('To get started, please describe the issue you\'re facing. Be as detailed as possible.');
            this.state = ChatStates.DESCRIPTION;
        }, 800);
    }

    handleSend() {
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();

        if (!message) return;

        // Add user message
        this.addUserMessage(message);
        messageInput.value = '';

        // Process based on current state
        setTimeout(() => {
            this.processMessage(message);
        }, 500);
    }

    async processMessage(message) {
        this.showTypingIndicator();

        // Wait a bit for natural feel
        await this.delay(500);

        this.hideTypingIndicator();

        switch (this.state) {
            case ChatStates.DESCRIPTION:
                await this.handleDescription(message);
                break;

            case ChatStates.TAGS:
                // Tags are handled via chip clicks, not text
                this.addBotMessage('Please select a category from the options above, or type "skip" to proceed without selecting.');
                break;

            case ChatStates.LOCATION:
                await this.handleLocation(message);
                break;

            case ChatStates.CONTACT:
                await this.handleContact(message);
                break;

            case ChatStates.NAME:
                await this.handleName(message);
                break;

            case ChatStates.PHOTO:
                await this.handlePhotoPrompt(message);
                break;

            case ChatStates.REVIEW:
                await this.handleReviewResponse(message);
                break;

            default:
                this.addBotMessage('I didn\'t understand that. Please try again.');
        }
    }

    // State Handlers

    async handleDescription(description) {
        if (description.length < 10) {
            this.addBotMessage('Please provide more details. Your description should be at least 10 characters.');
            return;
        }

        this.formData.description = description;
        this.addBotMessage('✓ Got it! Thank you for describing the issue.');

        await this.delay(800);

        // Classify the description using ML
        const matches = classifyComplaint(description);

        if (matches.length > 0) {
            this.addBotMessage('Based on your description, I think this might be related to:');

            await this.delay(600);

            // Find matching categories from database
            const suggestedCategories = this.findMatchingCategories(matches);

            if (suggestedCategories.length > 0) {
                // Show top 3 suggestions + "Other" option
                const topSuggestions = suggestedCategories.slice(0, 3);
                topSuggestions.push({ id: 'other', label: 'Other / None of these' });

                this.currentSuggestions = topSuggestions;
                this.addBotMessage('Select the most appropriate category:', { tags: topSuggestions });

                // Highlight the best match
                if (matches[0].confidence > 0.7) {
                    await this.delay(400);
                    this.addBotMessage('💡 "' + topSuggestions[0].label + '" seems like the best match for your issue.');
                }
            } else {
                // Fallback: show generic categories
                this.showGenericCategories();
            }
        } else {
            // No match found, show generic categories
            this.showGenericCategories();
        }

        // Try to extract location from description
        await this.delay(600);
        const locationMatch = extractLocationFromText(description);

        if (locationMatch && locationMatch.confidence > 0.6) {
            this.addBotMessage(`I noticed you mentioned "${locationMatch.location}" in your description. Let me find that for you...`);

            this.showTypingIndicator();
            const geoResult = await geocodeAddress(locationMatch.location, this.corporationId);
            this.hideTypingIndicator();

            if (geoResult && this.boundary) {
                const isInside = isPointInBoundary(geoResult.lat, geoResult.lng, this.boundary);

                if (isInside) {
                    this.setLocation(geoResult.lat, geoResult.lng, geoResult.display_name);
                    this.addBotMessage('✓ Found: ' + geoResult.display_name);

                    await this.delay(600);
                    this.addBotMessage('I\'ve marked this location on the map. You can adjust it later if needed.');

                    // Store that we auto-detected location
                    this.formData.locationAutoDetected = true;
                } else {
                    this.addBotMessage('⚠️ The location you mentioned appears to be outside our service area. You\'ll be able to specify a different location after selecting the category.');
                }
            } else {
                this.addBotMessage('I couldn\'t find the exact location you mentioned, but you can specify it on the map after selecting the category.');
            }
        }

        this.state = ChatStates.TAGS;
    }

    findMatchingCategories(matches) {
        const suggestions = [];

        for (const match of matches) {
            // Find categories that match the department or keywords
            const matchingCats = this.allCategories.filter(cat => {
                const catName = cat.name.toLowerCase();
                const catCode = (cat.code || '').toLowerCase();

                // Check if category name contains any of the keywords
                return match.categoryKeywords.some(kw =>
                    catName.includes(kw.toLowerCase()) ||
                    catCode.includes(kw.toLowerCase())
                );
            });

            // Add to suggestions (avoid duplicates)
            for (const cat of matchingCats) {
                if (!suggestions.find(s => s.id === cat.id)) {
                    suggestions.push({
                        id: cat.id,
                        label: cat.name,
                        confidence: match.confidence
                    });
                }
            }

            // Stop after we have enough suggestions
            if (suggestions.length >= 5) break;
        }

        // Sort by confidence
        suggestions.sort((a, b) => b.confidence - a.confidence);

        return suggestions;
    }

    showGenericCategories() {
        this.addBotMessage('I couldn\'t automatically detect the category. Please select one from the list:');

        // Show main parent categories
        const mainCategories = this.allCategories
            .filter(cat => !cat.parent_id)
            .slice(0, 6)
            .map(cat => ({
                id: cat.id,
                label: cat.name
            }));

        mainCategories.push({ id: 'other', label: 'Other' });

        this.currentSuggestions = mainCategories;
        this.addBotMessage('Select a category:', { tags: mainCategories });
    }

    async handleTagSelection(tag) {
        // Store selected category
        this.formData.category_id = tag.id;
        this.formData.category_name = tag.label;

        this.addUserMessage(tag.label);

        await this.delay(500);
        this.showTypingIndicator();
        await this.delay(800);
        this.hideTypingIndicator();

        this.addBotMessage('✓ Category selected: ' + tag.label);

        await this.delay(800);

        // Check if location was already auto-detected
        if (this.formData.locationAutoDetected && this.formData.latitude && this.formData.longitude) {
            // Location already set, confirm with user
            this.addBotMessage('I\'ve already marked the location you mentioned on the map.');

            await this.delay(600);

            this.addBotMessage('Type "done" to confirm this location, or you can:\n• Type a different address\n• Click on the map to adjust\n• Click "Use My Location" button');

            this.state = ChatStates.LOCATION;
        } else {
            // Move to LOCATION state normally
            this.addBotMessage('Great! Now I need to know where this issue is located.');

            await this.delay(600);

            this.addBotMessage('You can:\n• Type the address or area name\n• Click on the map on the right →\n• Click "Use My Location" button');

            this.state = ChatStates.LOCATION;
        }
    }

    async handleLocation(locationText) {
        const cmd = locationText.toLowerCase().trim();

        if (cmd === 'skip') {
            this.addBotMessage('⚠️ Location is required to file a complaint. Please provide the location.');
            return;
        }

        if (cmd === 'done') {
            // Check if location is set
            if (this.formData.latitude && this.formData.longitude) {
                this.moveToContactState();
            } else {
                this.addBotMessage('Please set a location on the map first, or provide an address.');
            }
            return;
        }

        // Try to geocode the address
        this.showTypingIndicator();
        this.addBotMessage('🔍 Searching for: ' + locationText);

        const result = await geocodeAddress(locationText, this.corporationId);

        this.hideTypingIndicator();

        if (result) {
            // Check if location is within boundary
            if (this.boundary) {
                const isInside = isPointInBoundary(result.lat, result.lng, this.boundary);

                if (!isInside) {
                    const corpNames = {
                        'north': 'Bengaluru North',
                        'south': 'Bengaluru South',
                        'east': 'Bengaluru East',
                        'west': 'Bengaluru West',
                        'central': 'Bengaluru Central'
                    };
                    const corpName = corpNames[this.corporationId] || this.corporationId;

                    this.addBotMessage(`❌ This location appears to be outside ${corpName} corporation's service area.`);

                    await this.delay(600);

                    this.addBotMessage('Please:\n• Provide a location within the boundary (shown in blue on the map)\n• Or select the correct corporation from the menu');
                    return;
                }
            }

            // Location is valid - update map
            this.setLocation(result.lat, result.lng, result.display_name);

            this.addBotMessage('✓ Found: ' + result.display_name);

            await this.delay(800);

            this.addBotMessage('I\'ve marked this location on the map. You can adjust it by clicking on the map if needed.');

            await this.delay(600);

            this.addBotMessage('Type "done" to confirm, or click on a different location on the map.');

        } else {
            this.addBotMessage('❌ I couldn\'t find that location. Please try:\n• Being more specific (e.g., "Main Road, Sanjaynagar")\n• Including a landmark\n• Or click directly on the map');
        }
    }

    handleMapLocationSet() {
        if (this.state === ChatStates.LOCATION && this.formData.latitude && this.formData.longitude) {
            // Location is set via map, move to next state
            this.moveToContactState();
        }
    }

    async moveToContactState() {
        this.showTypingIndicator();
        await this.delay(800);
        this.hideTypingIndicator();

        this.addBotMessage('✓ Location confirmed!');

        await this.delay(800);

        this.addBotMessage('How can we send you updates about this complaint?');

        await this.delay(600);

        this.addBotMessage('Please provide your 10-digit mobile number (starting with 6, 7, 8, or 9).');

        this.state = ChatStates.CONTACT;
    }

    async handleContact(input) {
        const phoneRegex = /^[6-9]\d{9}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (phoneRegex.test(input)) {
            this.formData.citizen_phone = input;
            this.addBotMessage('✓ Phone number saved: ' + input);

            await this.delay(800);

            this.askForName();
        } else if (emailRegex.test(input)) {
            this.formData.citizen_email = input;
            this.addBotMessage('✓ Email saved: ' + input);

            await this.delay(800);

            this.askForName();
        } else {
            this.addBotMessage('❌ Invalid format. Please enter:\n• A 10-digit phone number (e.g., 9876543210)\n• OR a valid email address (e.g., name@example.com)');
        }
    }

    async askForName() {
        this.addBotMessage('May I have your name? (This is optional - type "skip" if you prefer to remain anonymous)');
        this.state = ChatStates.NAME;
    }

    async handleName(name) {
        if (name.toLowerCase() === 'skip') {
            this.addBotMessage('✓ Proceeding anonymously.');
            this.formData.citizen_name = null;
        } else {
            this.formData.citizen_name = name;
            this.addBotMessage('✓ Thank you, ' + name + '!');
        }

        await this.delay(800);

        this.askForPhoto();
    }

    async askForPhoto() {
        this.addBotMessage('Would you like to upload a photo of the issue? This helps us understand and resolve it faster.');

        await this.delay(600);

        this.addBotMessage('Click the 📎 button below to attach a photo, or type "skip" to continue without one.');

        this.state = ChatStates.PHOTO;
    }

    async handlePhotoPrompt(response) {
        if (response.toLowerCase() === 'skip') {
            this.addBotMessage('✓ Proceeding without a photo.');

            await this.delay(800);

            this.showReview();
        } else {
            this.addBotMessage('Please click the 📎 button below to attach a photo, or type "skip".');
        }
    }

    async handlePhotoUploaded() {
        // Called when photo is successfully uploaded
        await this.delay(800);

        this.showReview();
    }

    async showReview() {
        this.state = ChatStates.REVIEW;

        this.showTypingIndicator();
        await this.delay(1000);
        this.hideTypingIndicator();

        this.addBotMessage('Perfect! Let me summarize your complaint:');

        await this.delay(600);

        // Build review summary
        const summary = this.buildReviewSummary();
        this.addBotMessage('Please review the details:', { summary: true });

        // Add summary as a special message
        this.addReviewSummary(summary);

        await this.delay(800);

        this.addBotMessage('Type "submit" to file this complaint, or "edit" if you need to make changes.');
    }

    buildReviewSummary() {
        return {
            'Issue Type': this.formData.category_name || 'Not specified',
            'Description': this.formData.description,
            'Location': this.formData.address || `${this.formData.latitude?.toFixed(5)}, ${this.formData.longitude?.toFixed(5)}`,
            'Contact': this.formData.citizen_phone || this.formData.citizen_email || 'Not provided',
            'Name': this.formData.citizen_name || 'Anonymous',
            'Photo': this.formData.photo ? 'Attached' : 'No photo'
        };
    }

    addReviewSummary(summary) {
        const messagesContainer = document.getElementById('chatMessages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot';

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';

        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'review-summary';

        const title = document.createElement('h4');
        title.textContent = 'Complaint Summary';
        reviewDiv.appendChild(title);

        Object.entries(summary).forEach(([key, value]) => {
            const item = document.createElement('div');
            item.className = 'review-item';

            const label = document.createElement('div');
            label.className = 'review-label';
            label.textContent = key + ':';

            const val = document.createElement('div');
            val.className = 'review-value';
            val.textContent = value;

            item.appendChild(label);
            item.appendChild(val);
            reviewDiv.appendChild(item);
        });

        bubble.appendChild(reviewDiv);
        messageDiv.appendChild(bubble);
        messagesContainer.appendChild(messageDiv);

        this.scrollToBottom();
    }

    async handleReviewResponse(response) {
        const cmd = response.toLowerCase().trim();

        if (cmd === 'submit') {
            await this.submitComplaint();
        } else if (cmd === 'edit') {
            this.addBotMessage('What would you like to edit? (Type the field name: description, category, location, contact, name, or photo)');
            // Will implement edit flow in enhancement phase
        } else {
            this.addBotMessage('Please type "submit" to proceed, or "edit" to make changes.');
        }
    }

    async submitComplaint() {
        this.showTypingIndicator();

        try {
            // Call Vercel serverless function (API keys hidden on server)
            const response = await fetch('/api/submit-complaint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    corporation_id: this.corporationId,
                    category_id: this.formData.category_id,
                    description: this.formData.description,
                    address: this.formData.address,
                    landmark: this.formData.landmark || '',
                    latitude: this.formData.latitude,
                    longitude: this.formData.longitude,
                    citizen_name: this.formData.citizen_name,
                    citizen_phone: this.formData.citizen_phone,
                    citizen_email: this.formData.citizen_email
                })
            });

            const result = await response.json();

            this.hideTypingIndicator();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to submit complaint');
            }

            // Store the complaint number for success message
            this.submittedComplaint = result.complaint;
            this.state = ChatStates.SUBMITTED;

            // Show success message with real ticket number
            this.showSuccessMessage(result.complaint.complaint_number);

        } catch (error) {
            this.hideTypingIndicator();
            this.addBotMessage('❌ Error submitting complaint: ' + error.message);
            this.addBotMessage('Please try again or contact support.');
        }
    }

    showSuccessMessage(complaintNumber) {
        const messagesContainer = document.getElementById('chatMessages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot';

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';

        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';

        // Success icon
        const icon = document.createElement('div');
        icon.className = 'success-icon';
        icon.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        `;
        successDiv.appendChild(icon);

        // Success text
        const text = document.createElement('div');
        text.innerHTML = '<strong>✅ Complaint Submitted Successfully!</strong>';
        successDiv.appendChild(text);

        // Complaint number (real ticket number from database)
        const number = document.createElement('div');
        number.className = 'complaint-number';
        number.textContent = complaintNumber || 'Processing...';
        successDiv.appendChild(number);

        // Additional info
        const info = document.createElement('p');
        info.textContent = 'We\'ll send updates to your registered contact. Thank you for helping us improve Bengaluru!';
        successDiv.appendChild(info);

        bubble.appendChild(successDiv);
        messageDiv.appendChild(bubble);
        messagesContainer.appendChild(messageDiv);

        this.scrollToBottom();

        // Disable input
        const messageInput = document.getElementById('messageInput');
        const sendBtn = document.getElementById('sendBtn');
        if (messageInput) messageInput.disabled = true;
        if (sendBtn) sendBtn.disabled = true;
    }

    // Helper function for delays
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    addBotMessage(text, metadata = {}) {
        this.addMessage('bot', text, metadata);
    }

    addUserMessage(text, metadata = {}) {
        this.addMessage('user', text, metadata);
    }

    addMessage(type, content, metadata = {}) {
        const messagesContainer = document.getElementById('chatMessages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';

        // Add message content
        const textNode = document.createElement('div');
        textNode.textContent = content;
        bubble.appendChild(textNode);

        // Add tag chips if provided
        if (metadata.tags && metadata.tags.length > 0) {
            const chipsContainer = document.createElement('div');
            chipsContainer.className = 'tag-chips';

            metadata.tags.forEach(tag => {
                const chip = document.createElement('div');
                chip.className = 'tag-chip';
                chip.textContent = tag.label || tag;
                chip.onclick = () => {
                    // Mark as selected
                    document.querySelectorAll('.tag-chip').forEach(c => c.classList.remove('selected'));
                    chip.classList.add('selected');
                    // Handle selection
                    this.handleTagSelect(tag);
                };
                chipsContainer.appendChild(chip);
            });

            bubble.appendChild(chipsContainer);
        }

        // Add photo preview if provided
        if (metadata.photo) {
            const photoDiv = document.createElement('div');
            photoDiv.className = 'photo-message';
            const img = document.createElement('img');
            img.src = URL.createObjectURL(metadata.photo);
            img.alt = 'Uploaded photo';
            photoDiv.appendChild(img);
            bubble.appendChild(photoDiv);
        }

        // Add timestamp
        const time = document.createElement('span');
        time.className = 'message-time';
        time.textContent = new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        });
        bubble.appendChild(time);

        messageDiv.appendChild(bubble);
        messagesContainer.appendChild(messageDiv);

        // Store message
        this.messages.push({
            type,
            content,
            metadata,
            timestamp: new Date()
        });

        // Scroll to bottom
        this.scrollToBottom();
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatMessages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatMessages');
        if (!messagesContainer) return;

        const indicator = document.createElement('div');
        indicator.className = 'message bot';
        indicator.id = 'typingIndicator';

        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';

        indicator.appendChild(typingDiv);
        messagesContainer.appendChild(indicator);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    // Map Functions
    async initMap() {
        const mapElement = document.getElementById('chatMap');
        if (!mapElement) return;

        // Corporation centers
        const CORPORATION_CENTERS = {
            'north': { lat: 13.064921, lng: 77.576663, zoom: 12 },
            'south': { lat: 12.892644, lng: 77.590320, zoom: 12 },
            'east': { lat: 12.993589, lng: 77.708538, zoom: 12 },
            'west': { lat: 12.958023, lng: 77.528152, zoom: 12 },
            'central': { lat: 12.964367, lng: 77.612152, zoom: 13 },
            'default': { lat: 12.9716, lng: 77.5946, zoom: 11 }
        };

        const center = CORPORATION_CENTERS[this.corporationId] || CORPORATION_CENTERS.default;

        // Initialize Leaflet map
        this.map = L.map('chatMap').setView([center.lat, center.lng], center.zoom);

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(this.map);

        // Map click handler
        this.map.on('click', (e) => {
            this.setLocation(e.latlng.lat, e.latlng.lng, null, true);
        });
    }

    setLocation(lat, lng, addressName = null, isMapClick = false) {
        // Validate boundary first
        if (this.boundary) {
            const isInside = isPointInBoundary(lat, lng, this.boundary);

            if (!isInside) {
                const corpNames = {
                    'north': 'Bengaluru North',
                    'south': 'Bengaluru South',
                    'east': 'Bengaluru East',
                    'west': 'Bengaluru West',
                    'central': 'Bengaluru Central'
                };
                const corpName = corpNames[this.corporationId] || this.corporationId;

                this.showLocationStatus('❌ Location is outside service area', 'error');
                this.addBotMessage(`❌ This location is outside ${corpName} corporation's service area. Please select a location within the blue boundary on the map.`);
                return false;
            }
        }

        // Remove existing marker
        if (this.marker) {
            this.map.removeLayer(this.marker);
        }

        // Add new marker (draggable)
        this.marker = L.marker([lat, lng], { draggable: true }).addTo(this.map);

        // Handle marker drag
        this.marker.on('dragend', async (e) => {
            const pos = e.target.getLatLng();
            this.setLocation(pos.lat, pos.lng, null, true);
        });

        // Store coordinates
        this.formData.latitude = lat;
        this.formData.longitude = lng;

        // Show status
        this.showLocationStatus('✓ Location set', 'success');

        // Reverse geocode to get address if not provided
        if (addressName) {
            this.formData.address = addressName;
        } else {
            // Do reverse geocoding
            reverseGeocode(lat, lng).then(address => {
                if (address) {
                    this.formData.address = address;

                    // If this was a map click in LOCATION state, show confirmation message
                    if (isMapClick && this.state === ChatStates.LOCATION) {
                        this.addBotMessage('✓ Location set to: ' + address);
                        this.addBotMessage('Type "done" to confirm and continue, or click on the map to adjust the location.');
                    }
                }
            });
        }

        // Center map on marker
        this.map.setView([lat, lng], 15);

        // If map click in LOCATION state, prompt user immediately (before reverse geocoding completes)
        if (isMapClick && this.state === ChatStates.LOCATION && !addressName) {
            this.addBotMessage('✓ Location marked on the map. Finding address...');
        }

        return true;
    }

    useMyLocation() {
        if (!navigator.geolocation) {
            this.showLocationStatus('Geolocation not supported by your browser', 'error');
            return;
        }

        this.showLocationStatus('Getting your location...', '');
        this.addBotMessage('📍 Getting your current location...');

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                this.setLocation(lat, lng, null, true);
                this.map.setView([lat, lng], 15);
            },
            (error) => {
                this.showLocationStatus('Unable to get your location: ' + error.message, 'error');
                this.addBotMessage('❌ Unable to get your location: ' + error.message);
                this.addBotMessage('Please click on the map or type an address instead.');
            }
        );
    }

    showLocationStatus(message, type) {
        const statusDiv = document.getElementById('locationStatus');
        if (!statusDiv) return;

        statusDiv.textContent = message;
        statusDiv.className = 'location-status active ' + type;

        // Hide after 3 seconds
        setTimeout(() => {
            statusDiv.classList.remove('active');
        }, 3000);
    }

    handlePhotoUpload(file) {
        if (!file) return;

        // Validate file (same logic as traditional form)
        const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
        const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

        if (!ALLOWED_TYPES.includes(file.type)) {
            this.addBotMessage('❌ Invalid file type. Please upload JPG, PNG, WebP, or HEIC images only.');
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
            this.addBotMessage(`❌ Image too large (${sizeMB} MB). Maximum size is 2 MB.`);
            return;
        }

        // Store photo
        this.formData.photo = file;

        // Show in chat
        const sizeKB = (file.size / 1024).toFixed(0);
        this.addUserMessage(`📷 ${file.name} (${sizeKB} KB)`, { photo: file });

        this.addBotMessage('✓ Photo uploaded successfully!');

        // Move to next state if in PHOTO state
        if (this.state === ChatStates.PHOTO) {
            this.handlePhotoUploaded();
        }
    }

    handleTagSelect(tag) {
        if (this.state !== ChatStates.TAGS) {
            return; // Ignore if not in tags state
        }

        this.handleTagSelection(tag);
    }

    // Helper to get corporation from URL
    getCorporationFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('corp') || 'north';
    }
}

// Initialize chatbot when page loads
let chatbot;

document.addEventListener('DOMContentLoaded', function() {
    // Get corporation from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const corp = urlParams.get('corp') || 'north';

    // Initialize chatbot
    chatbot = new ComplaintChatbot(corp);

    // Expose globally for debugging
    window.chatbot = chatbot;
});
