// Main JavaScript for Corporations of Greater Bengaluru

document.addEventListener('DOMContentLoaded', function() {
    // Load rankings on homepage
    if (document.getElementById('rankingsTable')) {
        loadRankings();
    }
    
    // Setup navigation
    setupNavigation();
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
    fetch('files/gba_corporation.geojson')
        .then(response => response.json())
        .then(data => {
            console.log('GeoJSON loaded:', data);
            
            L.geoJSON(data, {
                filter: function(feature) {
                    // FIXED: Use 'namecol' property instead of 'name'
                    const featureName = feature.properties && feature.properties.namecol;
                    const targetName = corp.name;
                    console.log('Checking:', featureName, 'vs', targetName);
                    return featureName === targetName;
                },
                style: function(feature) {
                    return {
                        color: corp.color || '#4f46e5',
                        weight: 3,
                        fillColor: corp.color || '#4f46e5',
                        fillOpacity: 0.2
                    };
                },
                onEachFeature: function(feature, layer) {
                    if (feature.properties && feature.properties.namecol) {
                        layer.bindPopup(`<strong>${feature.properties.namecol}</strong>`);
                        
                        // Fit map to the bounds of this feature
                        map.fitBounds(layer.getBounds());
                    }
                }
            }).addTo(map);
        })
        .catch(error => {
            console.error('Error loading GeoJSON:', error);
            // Fallback: show a marker at Bengaluru center
            L.marker([12.9716, 77.5946])
                .addTo(map)
                .bindPopup(`<strong>${corp.name}</strong>`)
                .openPopup();
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
