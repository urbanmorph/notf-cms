// Charts and Visualization System
// Uses Chart.js for interactive data visualization

// Initialize complaint form with real issue categories
function initializeComplaintForm() {
    const issueSelect = document.getElementById('issueTypeSelect');
    if (!issueSelect) return;
    
    // Clear existing options except the first one
    issueSelect.innerHTML = '<option value="">Select issue type</option>';
    
    // Populate with real categories from data
    issueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.value;
        option.textContent = category.label;
        issueSelect.appendChild(option);
    });
    
    // Add subcategory select if needed
    const form = issueSelect.closest('form');
    if (form && !document.getElementById('subCategorySelect')) {
        const parentElement = issueSelect.closest('.mb-3');
        if (!parentElement) return; // Exit if parent doesn't exist
        
        const subCategoryDiv = document.createElement('div');
        subCategoryDiv.className = 'mb-3';
        subCategoryDiv.id = 'subCategoryContainer';
        subCategoryDiv.style.display = 'none';
        subCategoryDiv.innerHTML = `
            <label for="subCategorySelect" class="form-label">Specific Issue</label>
            <select name="subCategory" class="form-select" id="subCategorySelect">
                <option value="">Select specific issue</option>
            </select>
        `;
        parentElement.after(subCategoryDiv);
        
        // Listen for category changes
        issueSelect.addEventListener('change', function() {
            const selectedCategory = issueCategories.find(cat => cat.value === this.value);
            const subCategoryContainer = document.getElementById('subCategoryContainer');
            const subCategorySelect = document.getElementById('subCategorySelect');
            
            if (selectedCategory && selectedCategory.subcategories) {
                subCategorySelect.innerHTML = '<option value="">Select specific issue</option>';
                selectedCategory.subcategories.forEach(sub => {
                    const option = document.createElement('option');
                    option.value = sub;
                    option.textContent = sub;
                    subCategorySelect.appendChild(option);
                });
                subCategoryContainer.style.display = 'block';
            } else {
                subCategoryContainer.style.display = 'none';
            }
        });
    }
}

// Create resolution rate trend chart
function createTrendChart(canvasId, corpData) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    const yearlyData = corpData.yearlyData;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: yearlyData.map(d => d.year),
            datasets: [{
                label: 'Resolution Rate (%)',
                data: yearlyData.map(d => d.rate),
                borderColor: corpData.color,
                backgroundColor: corpData.color + '20',
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Resolution Rate: ' + context.parsed.y.toFixed(1) + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 70,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: '#e5e7eb'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Create volume chart (yearly grievances)
function createVolumeChart(canvasId, corpData) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    const yearlyData = corpData.yearlyData;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: yearlyData.map(d => d.year),
            datasets: [{
                label: 'Total Grievances',
                data: yearlyData.map(d => d.total),
                backgroundColor: corpData.color,
                borderColor: corpData.color,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Total: ' + context.parsed.y.toLocaleString() + ' grievances';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    },
                    grid: {
                        color: '#e5e7eb'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Create category breakdown chart
function createCategoryChart(canvasId, corpData) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    // Use distinct, vibrant colors for better readability
    const colors = [
        '#3b82f6', // Blue
        '#10b981', // Green
        '#f59e0b', // Orange
        '#8b5cf6', // Purple
        '#ef4444', // Red
        '#06b6d4', // Cyan
        '#ec4899', // Pink
        '#14b8a6'  // Teal
    ];
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: corpData.topIssues.map(issue => issue.category),
            datasets: [{
                data: corpData.topIssues.map(issue => issue.count),
                backgroundColor: colors,
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const percentage = ((value / corpData.stats.totalIssues) * 100).toFixed(1);
                            return label + ': ' + value.toLocaleString() + ' (' + percentage + '%)';
                        }
                    }
                }
            }
        }
    });
}

// Create comparison chart (stacked bar for closed vs open)
function createComparisonChart(canvasId, corpData) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    const yearlyData = corpData.yearlyData;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: yearlyData.map(d => d.year),
            datasets: [
                {
                    label: 'Closed',
                    data: yearlyData.map(d => d.closed),
                    backgroundColor: '#22c55e',
                    borderColor: '#22c55e',
                    borderWidth: 1
                },
                {
                    label: 'Open',
                    data: yearlyData.map(d => d.total - d.closed),
                    backgroundColor: '#ef4444',
                    borderColor: '#ef4444',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    grid: {
                        display: false
                    }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    },
                    grid: {
                        color: '#e5e7eb'
                    }
                }
            }
        }
    });
}

// Initialize all charts for a corporation page
function initializeCorporationCharts(corporationId) {
    const corpData = corporationsData[corporationId];
    if (!corpData) return;
    
    // Create all charts
    createTrendChart('trendChart', corpData);
    createVolumeChart('volumeChart', corpData);
    createCategoryChart('categoryChart', corpData);
    createComparisonChart('comparisonChart', corpData);
    
    // Create seasonal chart if canvas exists
    const seasonalCanvas = document.getElementById('seasonalChart');
    if (seasonalCanvas) {
        createSeasonalChart(seasonalCanvas, corporationId);
    }
    
    // Initialize complaint form
    initializeComplaintForm();
}

// Initialize homepage insights
function initializeHomepageInsights() {
    // This will be called on homepage load
    initializeComplaintForm();
}

// Document ready handler
document.addEventListener('DOMContentLoaded', function() {
    // Check which page we're on and initialize accordingly
    const pageId = document.body.getAttribute('data-page');
    
    if (pageId && corporationsData[pageId]) {
        initializeCorporationCharts(pageId);
    } else if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        initializeHomepageInsights();
    }
});

// Create Seasonal Analysis Chart
function createSeasonalChart(ctx, corporationId) {
    const corp = corporationsData[corporationId];
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    
    const data = months.map(month => corp.seasonalData[month] || 0);
    
    // Calculate seasonal insights
    const summer = data[2] + data[3] + data[4]; // Mar, Apr, May
    const monsoon = data[5] + data[6] + data[7] + data[8]; // Jun, Jul, Aug, Sep
    const winter = data[9] + data[10] + data[11] + data[0] + data[1]; // Oct-Feb
    
    const peakMonth = months[data.indexOf(Math.max(...data))];
    const lowMonth = months[data.indexOf(Math.min(...data))];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Monthly Grievances',
                data: data,
                borderColor: getCorpColor(corporationId),
                backgroundColor: getCorpColor(corporationId) + '20',
                tension: 0.4,
                fill: true,
                borderWidth: 3,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: `Peak: ${peakMonth} | Low: ${lowMonth}`,
                    font: {
                        size: 12,
                        weight: 'normal'
                    },
                    color: '#6b7280'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y.toLocaleString() + ' grievances';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value >= 1000 ? (value/1000).toFixed(1) + 'K' : value;
                        }
                    }
                },
                x: {
                    ticks: {
                        callback: function(value, index) {
                            return months[index].substring(0, 3); // Show 3-letter month names
                        }
                    }
                }
            }
        }
    });
}

function getCorpColor(corporationId) {
    const colors = {
        'north': '#3b82f6',
        'south': '#10b981',
        'east': '#f59e0b',
        'west': '#8b5cf6',
        'central': '#ef4444'
    };
    return colors[corporationId] || '#3b82f6';
}

// Render contact section for corporation pages
function renderContactSection(corporationId) {
    const container = document.getElementById('contactContainer');
    if (!container) return;
    
    const contact = contactDetails[corporationId];
    if (!contact) return;
    
    let html = `
        <!-- Office Address -->
        <div class="office-address">
            <h3>📍 Office Address</h3>
            <p>${contact.address}</p>
        </div>
        
        <!-- Control Room -->
        <div class="control-room-box">
            <h3>🚨 24x7 Control Room</h3>
            <div class="control-room-numbers">
                ${contact.controlRoom.map(num => `<div class="control-number">${num}</div>`).join('')}
            </div>
        </div>
        
        <div class="contact-grid">
            <!-- Commissioner -->
            <div class="contact-card">
                <h3>Commissioner</h3>
                <div class="contact-info">
                    <span class="contact-label">Name</span>
                    <div class="contact-value">${contact.commissioner.name}</div>
                </div>
                <div class="contact-info">
                    <span class="contact-label">Phone</span>
                    <div class="contact-value">
                        <span class="contact-icon">📞</span>
                        <a href="tel:${contact.commissioner.phone}">${contact.commissioner.phone}</a>
                    </div>
                </div>
                <div class="contact-info">
                    <span class="contact-label">Email</span>
                    <div class="contact-value">
                        <span class="contact-icon">✉️</span>
                        <a href="mailto:${contact.commissioner.email}">${contact.commissioner.email}</a>
                    </div>
                </div>
            </div>
            
            <!-- Additional Commissioners -->
            <div class="contact-card">
                <h3>Additional Commissioners</h3>
                ${contact.additionalCommissioners.map(ac => `
                    <div class="contact-info">
                        <span class="contact-label">${ac.designation}</span>
                        <div class="contact-value">${ac.name}</div>
                        <div class="contact-value">
                            <span class="contact-icon">📞</span>
                            <a href="tel:${ac.phone}">${ac.phone}</a>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <!-- Joint Commissioners -->
            <div class="contact-card">
                <h3>Joint Commissioners</h3>
                ${contact.zones.map(zone => `
                    <div class="contact-info">
                        <span class="contact-label">${zone.zone}</span>
                        <div class="contact-value">${zone.jointCommissioner}</div>
                        <div class="contact-value">
                            <span class="contact-icon">📞</span>
                            <a href="tel:${zone.phone}">${zone.phone}</a>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <!-- Departments -->
            <div class="contact-card">
                <h3>Department Heads</h3>
                <ul class="contact-dept-list">
                    ${contact.departments.map(dept => `
                        <li class="contact-dept-item">
                            <span class="dept-name">${dept.dept}</span>
                            <span class="dept-person">
                                ${dept.name}
                                <a href="tel:${dept.phone}" class="dept-phone">📞 ${dept.phone}</a>
                            </span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// Corporation-specific insights
const corporationInsights = {
    north: {
        highlight: "Electrical Crisis",
        description: "41.5% of complaints are electrical-related, indicating widespread street lighting infrastructure issues.",
        comparison: "Above city average",
        recommendations: [
            "Conduct comprehensive street light audit across all zones",
            "Deploy rapid response electrical teams for urgent repairs",
            "Consider LED conversion program to reduce failures",
            "Implement preventive maintenance schedule"
        ]
    },
    south: {
        highlight: "Balanced Challenges",
        description: "South has the highest total grievances (140,892) but maintains good resolution rate at 91%.",
        comparison: "40% electrical (at city average)",
        recommendations: [
            "Scale up resources to match high grievance volume",
            "Focus on electrical infrastructure in high-density areas",
            "Enhance waste collection in commercial zones",
            "Prioritize road repairs on arterial routes"
        ]
    },
    east: {
        highlight: "Road Infrastructure Crisis",
        description: "19.8% of complaints are road-related - highest across all corporations. Likely due to rapid IT corridor development.",
        comparison: "Above city average by 7%",
        recommendations: [
            "Emergency road resurfacing program in Whitefield/Marathahalli",
            "Pothole filling on priority basis before monsoon",
            "Coordinate with builders on infrastructure development",
            "Regular road quality audits"
        ]
    },
    west: {
        highlight: "Severe Electrical Crisis",
        description: "48.7% of complaints are electrical - HIGHEST in the city. Nearly half of all grievances involve street lights and power issues.",
        comparison: "17% above city average",
        recommendations: [
            "URGENT: Emergency electrical infrastructure overhaul",
            "Deploy additional electrical maintenance staff",
            "Fast-track LED street light installation",
            "Establish 24/7 electrical helpline",
            "Partner with BESCOM for power supply improvements"
        ]
    },
    central: {
        highlight: "Waste Management Crisis",
        description: "29.2% of complaints are waste-related - HIGHEST in the city. City core faces significant garbage management challenges.",
        comparison: "Above city average",
        recommendations: [
            "Double garbage collection frequency in high-density areas",
            "Deploy additional waste collection vehicles",
            "Install smart bins with sensor monitoring",
            "Strict enforcement of waste segregation",
            "Public awareness campaigns on waste disposal"
        ]
    }
};

// Render top issues section
function renderTopIssues(corporationId) {
    console.log('renderTopIssues called with:', corporationId);
    
    const container = document.getElementById('topIssuesContainer');
    console.log('topIssuesContainer element:', container);
    
    if (!container) {
        console.error('topIssuesContainer not found!');
        return;
    }
    
    const corp = corporationsData[corporationId];
    console.log('corp data:', corp);
    
    const insights = corporationInsights[corporationId];
    console.log('insights data:', insights);
    
    if (!corp || !insights) {
        console.error('Missing data - corp:', !!corp, 'insights:', !!insights);
        return;
    }
    
    console.log('Generating HTML for top issues...');
    
    // Get top 3 issues
    const topThree = corp.topIssues.slice(0, 3);
    
    let html = `
        <div class="issues-grid">
            <!-- Main Issues Display -->
            <div class="issues-main">
                <h3 style="color: var(--primary-color); margin-bottom: 1.5rem; font-size: 1.5rem;">
                    🎯 Top 3 Grievance Categories
                </h3>
                
                ${topThree.map((issue, index) => `
                    <div class="issue-item" style="margin-bottom: 1.5rem;">
                        <div class="issue-header">
                            <div class="issue-rank">
                                <div class="rank-badge rank-${index + 1}">
                                    ${index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                                </div>
                                <span class="issue-name">${issue.category}</span>
                            </div>
                            <div class="issue-percentage">${issue.percentage}%</div>
                        </div>
                        <div class="issue-count">
                            ${issue.count.toLocaleString()} complaints out of ${corp.totalIssues.toLocaleString()} total
                        </div>
                        <div class="issue-bar">
                            <div class="issue-progress" style="width: ${issue.percentage}%"></div>
                        </div>
                    </div>
                `).join('')}
                
                <div style="margin-top: 2rem; padding: 1.5rem; background: #f1f5f9; border-radius: 8px;">
                    <strong style="color: var(--text-primary);">📊 Combined Impact:</strong>
                    <p style="margin: 0.5rem 0 0 0; color: var(--text-secondary);">
                        These top 3 categories represent 
                        <strong>${topThree.reduce((sum, issue) => sum + issue.percentage, 0).toFixed(1)}%</strong> 
                        of all grievances. Focusing resources here could address 
                        <strong>${topThree.reduce((sum, issue) => sum + issue.count, 0).toLocaleString()}</strong> 
                        citizen complaints.
                    </p>
                </div>
            </div>
            
            <!-- Sidebar: Insights & Recommendations -->
            <div class="issues-sidebar">
                <!-- Key Insight -->
                <div class="comparison-card">
                    <h4>🔍 Key Insight</h4>
                    <div class="comparison-value">${insights.highlight}</div>
                    <div class="comparison-label">${insights.description}</div>
                </div>
                
                <!-- Comparison -->
                <div class="insights-card">
                    <h3>📈 Comparison</h3>
                    <div class="insight-item">
                        <span class="insight-label">vs. City Average</span>
                        <div class="insight-value">${insights.comparison}</div>
                    </div>
                    <div class="insight-item">
                        <span class="insight-label">Total Grievances</span>
                        <div class="insight-value">${corp.totalIssues.toLocaleString()} (${((corp.totalIssues / 477997) * 100).toFixed(1)}% of mapped data)</div>
                    </div>
                    <div class="insight-item">
                        <span class="insight-label">Resolution Rate</span>
                        <div class="insight-value">${corp.resolutionRate}% (${corp.closedIssues.toLocaleString()} closed)</div>
                    </div>
                </div>
                
                <!-- Recommendations -->
                <div class="recommendations-card">
                    <h4>💡 Recommendations</h4>
                    <ul class="recommendation-list">
                        ${insights.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    console.log('Setting innerHTML for topIssuesContainer');
    container.innerHTML = html;
    console.log('HTML set successfully');
    
    // Animate progress bars
    setTimeout(() => {
        const progressBars = container.querySelectorAll('.issue-progress');
        progressBars.forEach(bar => {
            bar.style.width = bar.style.width;
        });
    }, 100);
}

// Render compact top issues section (appears after stats cards)
function renderTopIssuesCompact(corporationId) {
    const container = document.getElementById('topIssuesContainer');
    if (!container) return;
    
    const corp = corporationsData[corporationId];
    const insights = corporationInsights[corporationId];
    if (!corp || !insights) return;
    
    // Get top 3 issues
    const topThree = corp.topIssues.slice(0, 3);
    
    let html = `
        <div class="top-issues-compact">
            <h3>🎯 Top 3 Issues</h3>
            
            <div class="issues-compact-grid">
                ${topThree.map((issue, index) => `
                    <div class="issue-compact-card">
                        <div class="issue-compact-header">
                            <div class="rank-badge-compact rank-${index + 1}">
                                ${index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                            </div>
                            <span class="issue-compact-name">${issue.category}</span>
                        </div>
                        <div class="issue-compact-percentage">${issue.percentage}%</div>
                        <div class="issue-compact-count">${issue.count.toLocaleString()} complaints</div>
                        <div class="issue-compact-bar">
                            <div class="issue-compact-progress" style="width: ${issue.percentage}%"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="insights-compact">
                <div class="insight-compact-item">
                    <span class="insight-compact-label">Combined Impact</span>
                    <div class="insight-compact-value">${topThree.reduce((sum, issue) => sum + issue.percentage, 0).toFixed(1)}%</div>
                </div>
                <div class="insight-compact-item">
                    <span class="insight-compact-label">Total Complaints</span>
                    <div class="insight-compact-value">${topThree.reduce((sum, issue) => sum + issue.count, 0).toLocaleString()}</div>
                </div>
                <div class="insight-compact-item">
                    <span class="insight-compact-label">Key Challenge</span>
                    <div class="insight-compact-value" style="font-size: 0.9rem;">${insights.highlight}</div>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}
