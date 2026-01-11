// Main JavaScript for Corporations of Greater Bengaluru

// Hamburger menu toggle
function toggleMenu() {
    const navTabs = document.getElementById('navTabs');
    const hamburger = document.querySelector('.hamburger');
    navTabs.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Dropdown toggle
function toggleDropdown(event) {
    event.stopPropagation();
    const dropdown = event.currentTarget.closest('.dropdown');
    dropdown.classList.toggle('active');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove('active');
        }
    });
});

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
});

// Complaint form submission
function submitComplaint(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Here you would send the data to your backend
    console.log('Complaint submitted:', Object.fromEntries(formData));
    
    // Show success message
    alert('Thank you! Your complaint has been submitted successfully. You will receive a confirmation via SMS/Email.');
    
    // Close modal and reset form
    closeModal('complaintModal');
    form.reset();
}

// WhatsApp integration
function openWhatsApp() {
    const pageTitle = document.title;
    let corpName = 'Bengaluru';
    
    // Extract corporation name from page title
    if (pageTitle.includes('North')) corpName = 'North';
    else if (pageTitle.includes('South')) corpName = 'South';
    else if (pageTitle.includes('East')) corpName = 'East';
    else if (pageTitle.includes('West')) corpName = 'West';
    else if (pageTitle.includes('Central')) corpName = 'Central';
    
    const message = encodeURIComponent(`Hello, I want to file a complaint for Bengaluru ${corpName} City Corporation.`);
    window.open(`https://wa.me/919845123000?text=${message}`, '_blank');
}

// Telegram integration
function openTelegram() {
    const pageTitle = document.title;
    let botUsername = 'BengaluruCentralBot';
    
    if (pageTitle.includes('North')) botUsername = 'BengaluruNorthBot';
    else if (pageTitle.includes('South')) botUsername = 'BengaluruSouthBot';
    else if (pageTitle.includes('East')) botUsername = 'BengaluruEastBot';
    else if (pageTitle.includes('West')) botUsername = 'BengaluruWestBot';
    
    window.open(`https://t.me/${botUsername}`, '_blank');
}

// Admin login submission
function submitAdminLogin(event) {
    event.preventDefault();
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    // Here you would validate credentials with your backend
    console.log('Login attempt:', username);
    
    // For demo purposes
    if (username && password) {
        alert('Login functionality will be implemented in the backend phase.');
        closeModal('adminModal');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Load rankings on homepage
    if (document.getElementById('rankingsTable')) {
        loadRankings();
    }
    
    // Setup navigation
    setupNavigation();
    
    // Set corporation name in complaint form
    const corpInput = document.getElementById('complaintCorporation');
    if (corpInput) {
        const pageTitle = document.title;
        if (pageTitle.includes('North')) corpInput.value = 'Bengaluru North City Corporation';
        else if (pageTitle.includes('South')) corpInput.value = 'Bengaluru South City Corporation';
        else if (pageTitle.includes('East')) corpInput.value = 'Bengaluru East City Corporation';
        else if (pageTitle.includes('West')) corpInput.value = 'Bengaluru West City Corporation';
        else if (pageTitle.includes('Central')) corpInput.value = 'Bengaluru Central City Corporation';
    }
});

function setupNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            const corpId = this.getAttribute('data-corp');
            if (corpId) {
                e.preventDefault();
                window.location.href = `${corpId}.html`;
            }
        });
    });
}

function loadRankings() {
    const tbody = document.getElementById('rankingsBody');
    if (!tbody) return;
    
    // Calculate scores and create ranking array
    const rankings = [];
    for (const [id, corp] of Object.entries(corporationsData)) {
        const score = calculateScore(corp);
        rankings.push({
            id,
            name: corp.name,
            ...corp.stats,
            overallScore: score
        });
    }
    
    // Sort by overall score
    rankings.sort((a, b) => parseFloat(b.overallScore) - parseFloat(a.overallScore));
    
    // Populate table
    tbody.innerHTML = '';
    rankings.forEach((corp, index) => {
        const rank = index + 1;
        const row = document.createElement('tr');
        
        // Determine rank badge class
        let badgeClass = 'rank-badge';
        if (rank === 1) badgeClass += ' gold';
        else if (rank === 2) badgeClass += ' silver';
        else if (rank === 3) badgeClass += ' bronze';
        
        // Determine metric classes
        const resolutionClass = corp.resolutionRate >= 85 ? 'metric-good' : 
                               corp.resolutionRate >= 80 ? 'metric-medium' : 'metric-poor';
        const slaClass = corp.slaCompliance >= 85 ? 'metric-good' : 
                        corp.slaCompliance >= 80 ? 'metric-medium' : 'metric-poor';
        const scoreClass = parseFloat(corp.overallScore) >= 85 ? 'metric-good' : 
                          parseFloat(corp.overallScore) >= 80 ? 'metric-medium' : 'metric-poor';
        
        row.innerHTML = `
            <td><span class="${badgeClass}">${rank}</span></td>
            <td><a href="${corp.id}.html" class="corp-link">${corp.name}</a></td>
            <td>${corp.totalIssues.toLocaleString()}</td>
            <td>${corp.openIssues.toLocaleString()}</td>
            <td><span class="${resolutionClass}">${corp.resolutionRate}%</span></td>
            <td>${corp.avgResponseTime}</td>
            <td><span class="${slaClass}">${corp.slaCompliance}%</span></td>
            <td>${corp.citizenScore}/5.0</td>
            <td><span class="${scoreClass}">${corp.overallScore}</span></td>
        `;
        
        tbody.appendChild(row);
    });
}

// Initialize map on corporation pages
function initMap(corporationId) {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    const corp = corporationsData[corporationId];
    if (!corp) return;
    
    // Initialize Leaflet map centered on Bengaluru
    const map = L.map('map').setView([12.9716, 77.5946], 11);
    
    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);
    
    // Load GeoJSON for corporation boundaries
    const geojsonPath = 'files/gba_corporation.geojson';
    
    fetch(geojsonPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('GeoJSON loaded successfully:', data.features?.length, 'features');
            
            if (!data.features || data.features.length === 0) {
                throw new Error('No features found in GeoJSON');
            }
            
            // Filter and display only the current corporation
            const targetName = corp.name;
            let foundFeature = false;
            
            const geoJsonLayer = L.geoJSON(data, {
                filter: function(feature) {
                    const featureName = feature.properties?.namecol;
                    const matches = featureName === targetName;
                    if (matches) {
                        console.log('Matched corporation:', featureName);
                        foundFeature = true;
                    }
                    return matches;
                },
                style: function(feature) {
                    return {
                        color: corp.color || '#23A2A5',
                        weight: 2,
                        fillColor: corp.color || '#23A2A5',
                        fillOpacity: 0.3
                    };
                },
                onEachFeature: function(feature, layer) {
                    if (feature.properties?.namecol) {
                        layer.bindPopup(`<strong>${feature.properties.namecol}</strong>`);
                        
                        // Fit map to the bounds of this feature
                        try {
                            map.fitBounds(layer.getBounds(), { padding: [20, 20] });
                        } catch (e) {
                            console.error('Error fitting bounds:', e);
                        }
                    }
                }
            }).addTo(map);
            
            if (!foundFeature) {
                console.warn('No matching feature found for:', targetName);
                console.log('Available features:', data.features.map(f => f.properties?.namecol));
            }
        })
        .catch(error => {
            console.error('Error loading GeoJSON:', error);
            console.error('Attempted path:', geojsonPath);
            console.error('Full error:', error.message);
            
            // Show user-friendly error message
            mapElement.innerHTML = `
                <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:white;padding:1.5rem;border-radius:0.5rem;box-shadow:0 4px 6px rgba(0,0,0,0.1);z-index:1000;text-align:center;max-width:400px;">
                    <p style="color:#ef4444;margin:0 0 0.5rem 0;font-weight:600;">⚠️ Map Data Unavailable</p>
                    <p style="color:#6b7280;margin:0;font-size:0.875rem;">Unable to load corporation boundary. The map service may be temporarily unavailable.</p>
                </div>
            `;
        });
}

function getCorporationNameFromId(id) {
    const corpData = corporationsData[id];
    return corpData ? corpData.name : '';
}

// Load corporation dashboard
function loadCorporationDashboard(corporationId) {
    const corp = corporationsData[corporationId];
    if (!corp) return;
    
    // Update stats if elements exist
    const statsElements = {
        totalIssues: document.getElementById('totalIssues'),
        openIssues: document.getElementById('openIssues'),
        resolutionRate: document.getElementById('resolutionRate'),
        avgResponseTime: document.getElementById('avgResponseTime'),
        slaCompliance: document.getElementById('slaCompliance'),
        citizenScore: document.getElementById('citizenScore')
    };
    
    Object.keys(statsElements).forEach(key => {
        if (statsElements[key] && corp.stats[key]) {
            let value = corp.stats[key];
            if (typeof value === 'number' && key !== 'citizenScore') {
                value = value.toLocaleString();
            }
            if (key === 'resolutionRate' || key === 'slaCompliance') {
                value += '%';
            }
            if (key === 'citizenScore') {
                value += '/5.0';
            }
            statsElements[key].textContent = value;
        }
    });
    
    // Initialize map
    initMap(corporationId);
}
