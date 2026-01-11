/**
 * Corporation Comparison Tool
 * Provides side-by-side comparison of all 5 corporations
 */

const CORP_COLORS = {
    north: '#3b82f6',
    south: '#10b981',
    east: '#f59e0b',
    west: '#8b5cf6',
    central: '#ef4444'
};

const CORP_NAMES = {
    north: 'North',
    south: 'South',
    east: 'East',
    west: 'West',
    central: 'Central'
};

let comparisonCharts = {};

// Initialize comparison on page load
document.addEventListener('DOMContentLoaded', () => {
    updateComparison();
});

function updateComparison() {
    const selected = getSelectedCorporations();
    
    if (selected.length === 0) {
        alert('Please select at least one corporation to compare');
        return;
    }
    
    // Update all comparison views
    renderMetricsCards(selected);
    renderResolutionChart(selected);
    renderVolumeChart(selected);
    renderSeasonalChart(selected);
    renderTopIssuesComparison(selected);
    renderRankingsTable(selected);
}

function getSelectedCorporations() {
    const checkboxes = document.querySelectorAll('.checkbox-card input[type="checkbox"]');
    const selected = [];
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selected.push(checkbox.value);
        }
    });
    
    return selected;
}

function renderMetricsCards(selected) {
    const container = document.getElementById('metricsCards');
    container.innerHTML = '';
    container.className = 'metrics-grid';
    
    selected.forEach(corpId => {
        const corp = corporationsData[corpId];
        if (!corp) return;
        
        const card = document.createElement('div');
        card.className = 'metric-card';
        card.style.borderTop = `4px solid ${CORP_COLORS[corpId]}`;
        
        card.innerHTML = `
            <h3 style="color: ${CORP_COLORS[corpId]}; margin-bottom: 1rem;">${corp.name}</h3>
            <div class="metric-row">
                <div class="metric">
                    <div class="metric-label">Total Grievances</div>
                    <div class="metric-value">${corp.totalIssues.toLocaleString()}</div>
                </div>
                <div class="metric">
                    <div class="metric-label">Resolution Rate</div>
                    <div class="metric-value">${corp.resolutionRate}%</div>
                </div>
            </div>
            <div class="metric-row" style="margin-top: 0.75rem;">
                <div class="metric">
                    <div class="metric-label">Closed</div>
                    <div class="metric-value small">${corp.closedIssues.toLocaleString()}</div>
                </div>
                <div class="metric">
                    <div class="metric-label">Open</div>
                    <div class="metric-value small">${corp.openIssues.toLocaleString()}</div>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

function renderResolutionChart(selected) {
    const ctx = document.getElementById('resolutionCompareChart');
    if (!ctx) return;
    
    // Destroy existing chart
    if (comparisonCharts.resolution) {
        comparisonCharts.resolution.destroy();
    }
    
    const datasets = selected.map(corpId => {
        const corp = corporationsData[corpId];
        return {
            label: CORP_NAMES[corpId],
            data: corp.yearlyData.map(y => y.rate),
            borderColor: CORP_COLORS[corpId],
            backgroundColor: CORP_COLORS[corpId] + '20',
            tension: 0.4,
            borderWidth: 3
        };
    });
    
    comparisonCharts.resolution = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toFixed(2) + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 80,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

function renderVolumeChart(selected) {
    const ctx = document.getElementById('volumeCompareChart');
    if (!ctx) return;
    
    if (comparisonCharts.volume) {
        comparisonCharts.volume.destroy();
    }
    
    const datasets = selected.map(corpId => {
        const corp = corporationsData[corpId];
        return {
            label: CORP_NAMES[corpId],
            data: corp.yearlyData.map(y => y.total),
            backgroundColor: CORP_COLORS[corpId],
            borderColor: CORP_COLORS[corpId],
            borderWidth: 1
        };
    });
    
    comparisonCharts.volume = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

function renderSeasonalChart(selected) {
    const ctx = document.getElementById('seasonalCompareChart');
    if (!ctx) return;
    
    if (comparisonCharts.seasonal) {
        comparisonCharts.seasonal.destroy();
    }
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    
    const datasets = selected.map(corpId => {
        const corp = corporationsData[corpId];
        const monthlyData = months.map(month => corp.seasonalData[month] || 0);
        
        return {
            label: CORP_NAMES[corpId],
            data: monthlyData,
            borderColor: CORP_COLORS[corpId],
            backgroundColor: CORP_COLORS[corpId] + '40',
            tension: 0.4,
            fill: true,
            borderWidth: 2
        };
    });
    
    comparisonCharts.seasonal = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Grievances peak during monsoon (Jun-Sep) and summer (Mar-May)'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    stacked: false
                }
            }
        }
    });
}

function renderTopIssuesComparison(selected) {
    const container = document.getElementById('topIssuesComparison');
    container.innerHTML = '';
    
    selected.forEach(corpId => {
        const corp = corporationsData[corpId];
        
        const card = document.createElement('div');
        card.className = 'issues-compare-card';
        card.style.borderLeft = `4px solid ${CORP_COLORS[corpId]}`;
        
        let issuesHtml = corp.topIssues.slice(0, 5).map((issue, idx) => `
            <div class="issue-row">
                <span class="issue-rank" style="background: ${CORP_COLORS[corpId]}">${idx + 1}</span>
                <div class="issue-details">
                    <div class="issue-name">${issue.category}</div>
                    <div class="issue-stats">
                        <span>${issue.count.toLocaleString()}</span>
                        <span class="issue-percent">${issue.percentage}%</span>
                    </div>
                </div>
            </div>
        `).join('');
        
        card.innerHTML = `
            <h3 style="color: ${CORP_COLORS[corpId]}; margin-bottom: 1rem;">${CORP_NAMES[corpId]}</h3>
            ${issuesHtml}
        `;
        
        container.appendChild(card);
    });
}

function renderRankingsTable(selected) {
    const tbody = document.getElementById('rankingsBody');
    tbody.innerHTML = '';
    
    // Sort by resolution rate
    const sorted = selected
        .map(corpId => ({
            id: corpId,
            ...corporationsData[corpId]
        }))
        .sort((a, b) => b.resolutionRate - a.resolutionRate);
    
    sorted.forEach((corp, idx) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <span class="rank-badge" style="background: ${CORP_COLORS[corp.id]}">${idx + 1}</span>
            </td>
            <td>
                <strong style="color: ${CORP_COLORS[corp.id]}">${CORP_NAMES[corp.id]}</strong>
            </td>
            <td>${corp.totalIssues.toLocaleString()}</td>
            <td>
                <div class="progress-cell">
                    <div class="progress-bar-mini">
                        <div class="progress-fill-mini" style="width: ${corp.resolutionRate}%; background: ${CORP_COLORS[corp.id]}"></div>
                    </div>
                    <span class="progress-label">${corp.resolutionRate}%</span>
                </div>
            </td>
            <td>${corp.openIssues.toLocaleString()}</td>
        `;
        tbody.appendChild(row);
    });
}
