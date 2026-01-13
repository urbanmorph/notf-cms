// Admin Dashboard JavaScript
let adminUser = null;
let fullAdminProfile = null;
let currentCorporation = null;
let statusChart = null;
let departmentChart = null;

// Get corporation code from URL
function getCorporationFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('corp');
}

// Update URL with corporation code without reloading
function updateURLWithCorporation(corpCode) {
    const url = new URL(window.location);
    url.searchParams.set('corp', corpCode);
    window.history.replaceState({}, '', url);
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', async function() {
    await waitForSupabase();

    // Check authentication
    adminUser = await requireAdmin();
    if (!adminUser) return;

    // Get full profile with multi-corporation access
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (user) {
        fullAdminProfile = await getFullAdminProfile(user.id);
    }

    // Get corp from URL
    const urlCorp = getCorporationFromURL();
    const userCorp = adminUser.corporation?.code;
    const allCorps = fullAdminProfile?.all_corporations || [];
    const hasMultiCorpAccess = allCorps.length > 1 || fullAdminProfile?.role === 'super_admin';

    // Check if user has access to the requested corporation
    if (urlCorp) {
        const hasAccess = hasMultiCorpAccess &&
            (fullAdminProfile?.role === 'super_admin' || allCorps.some(c => c.code === urlCorp));

        if (!hasAccess && urlCorp !== userCorp) {
            // User doesn't have access to this corporation
            console.log(`Access denied: User doesn't have access to ${urlCorp}`);
            window.location.href = `dashboard.html?corp=${userCorp}`;
            return;
        }

        // Set current corporation based on URL
        currentCorporation = allCorps.find(c => c.code === urlCorp) || adminUser.corporation;
    } else {
        // No corp in URL, use user's primary corporation
        currentCorporation = adminUser.corporation;
        if (userCorp) {
            updateURLWithCorporation(userCorp);
        }
    }

    // Update adminUser.corporation_id to match the currently viewed corporation
    if (currentCorporation && currentCorporation.id !== adminUser.corporation_id) {
        adminUser.corporation_id = currentCorporation.id;
        adminUser.corporation = currentCorporation;
    }

    // Update UI with user info and corporation switcher
    updateUserInfo();
    setupCorporationSwitcher();

    // Load dashboard data
    await loadDashboardData();

    // Set up real-time subscriptions
    setupRealtimeSubscriptions();

    // Global search handler
    document.getElementById('globalSearch').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                window.location.href = `complaints.html?search=${encodeURIComponent(query)}`;
            }
        }
    });
});

// Update user info in sidebar
function updateUserInfo() {
    if (!adminUser) return;

    document.getElementById('userName').textContent = adminUser.name || 'Admin User';
    document.getElementById('userRole').textContent = formatRole(adminUser.role);
    document.getElementById('userAvatar').textContent = (adminUser.name || 'A').charAt(0).toUpperCase();

    // Use currentCorporation for display (may differ from user's primary corp)
    const displayCorp = currentCorporation || adminUser.corporation;
    if (displayCorp) {
        const corpName = displayCorp.short_name || displayCorp.name;
        document.getElementById('sidebarCorporation').textContent = corpName;

        // Update page title to include corporation name
        document.title = `${corpName} - Admin Dashboard`;
    }
}

// Setup corporation switcher for multi-corp users
function setupCorporationSwitcher() {
    const allCorps = fullAdminProfile?.all_corporations || [];
    const hasMultiCorpAccess = allCorps.length > 1 || fullAdminProfile?.role === 'super_admin';

    if (!hasMultiCorpAccess) {
        // Single corp user - hide switcher
        document.getElementById('corpSwitcher').style.display = 'none';
        return;
    }

    // Show and populate the switcher
    const switcher = document.getElementById('corpSwitcher');
    const select = document.getElementById('corpSelect');

    switcher.style.display = 'block';

    // Clear existing options
    select.innerHTML = '';

    // Add corporations to dropdown
    allCorps.forEach(corp => {
        const option = document.createElement('option');
        option.value = corp.code;
        option.textContent = corp.short_name || corp.name;
        if (corp.is_primary) {
            option.textContent += ' (Primary)';
        }
        // Select the current corporation
        if (currentCorporation && corp.code === currentCorporation.code) {
            option.selected = true;
        }
        select.appendChild(option);
    });
}

// Switch to a different corporation
function switchCorporation(corpCode) {
    if (!corpCode) return;

    const allCorps = fullAdminProfile?.all_corporations || [];
    const targetCorp = allCorps.find(c => c.code === corpCode);

    if (!targetCorp) {
        console.error('Corporation not found:', corpCode);
        return;
    }

    // Redirect to the new corporation's dashboard
    window.location.href = `dashboard.html?corp=${corpCode}`;
}

// Format role for display
function formatRole(role) {
    const roleMap = {
        'super_admin': 'Super Admin',
        'commissioner': 'Commissioner',
        'zone_officer': 'Zone Officer',
        'department_head': 'Department Head',
        'field_officer': 'Field Officer'
    };
    return roleMap[role] || role;
}

// Load all dashboard data
async function loadDashboardData() {
    try {
        await Promise.all([
            loadStats(),
            loadRecentComplaints(),
            loadCharts()
        ]);
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showError('Failed to load dashboard data. Please refresh the page.');
    }
}

// Load statistics
async function loadStats() {
    try {
        const corporationId = adminUser?.corporation_id;

        if (!corporationId) {
            console.warn('No corporation_id found for admin user');
            return;
        }

        // Get total complaints
        const { count: total } = await supabaseClient
            .from('complaints')
            .select('*', { count: 'exact', head: true })
            .eq('corporation_id', corporationId);

        // Get complaints by status
        const { data: statusCounts } = await supabaseClient
            .from('complaints')
            .select('status')
            .eq('corporation_id', corporationId);

        const statusMap = statusCounts?.reduce((acc, c) => {
            acc[c.status] = (acc[c.status] || 0) + 1;
            return acc;
        }, {}) || {};

        // Get SLA breached count
        const { count: slaBreached } = await supabaseClient
            .from('complaints')
            .select('*', { count: 'exact', head: true })
            .eq('corporation_id', corporationId)
            .eq('sla_breached', true)
            .not('status', 'in', '("resolved","closed")');

        // Calculate resolution rate
        const resolved = (statusMap['resolved'] || 0) + (statusMap['closed'] || 0);
        const resolutionRate = total > 0 ? ((resolved / total) * 100).toFixed(1) : 0;

        // Update UI
        document.getElementById('statTotal').textContent = formatNumber(total || 0);
        document.getElementById('statPending').textContent = formatNumber((statusMap['new'] || 0) + (statusMap['assigned'] || 0));
        document.getElementById('statInProgress').textContent = formatNumber(statusMap['in_progress'] || 0);
        document.getElementById('statResolved').textContent = formatNumber(resolved);
        document.getElementById('statSLABreached').textContent = formatNumber(slaBreached || 0);
        document.getElementById('statResolutionRate').textContent = `${resolutionRate}%`;

        // Update new complaints badge in sidebar
        const newCount = statusMap['new'] || 0;
        document.getElementById('newComplaintsCount').textContent = newCount;
        document.getElementById('newComplaintsCount').style.display = newCount > 0 ? 'inline' : 'none';

    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Load recent complaints
async function loadRecentComplaints() {
    try {
        // Check if corporation_id exists
        if (!adminUser?.corporation_id) {
            console.warn('No corporation_id found for admin user');
            document.getElementById('recentComplaintsTable').innerHTML = `
                <tr>
                    <td colspan="8" style="text-align: center; padding: 40px; color: #7f8c8d;">
                        No corporation assigned. Contact administrator.
                    </td>
                </tr>
            `;
            return;
        }

        const { data: complaints, error } = await supabaseClient
            .from('complaints')
            .select(`
                *,
                department:departments(name),
                category:issue_categories(name)
            `)
            .eq('corporation_id', adminUser.corporation_id)
            .order('created_at', { ascending: false })
            .limit(10);

        if (error) throw error;

        const tableBody = document.getElementById('recentComplaintsTable');

        if (!complaints || complaints.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align: center; padding: 40px; color: #7f8c8d;">
                        No complaints found. New complaints will appear here.
                    </td>
                </tr>
            `;
            return;
        }

        tableBody.innerHTML = complaints.map(complaint => `
            <tr>
                <td><span class="complaint-id">${complaint.complaint_number || 'N/A'}</span></td>
                <td>${truncateText(complaint.title, 40)}</td>
                <td>${complaint.department?.name || complaint.category?.name || 'Unassigned'}</td>
                <td><span class="status-badge ${complaint.status}">${formatStatus(complaint.status)}</span></td>
                <td><span class="priority-badge ${complaint.priority}">${complaint.priority}</span></td>
                <td>${getSLAIndicator(complaint)}</td>
                <td>${formatDate(complaint.created_at)}</td>
                <td>
                    <div class="table-actions">
                        <button class="action-btn view" title="View" onclick="viewComplaint('${complaint.id}')">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                        <button class="action-btn assign" title="Assign" onclick="assignComplaint('${complaint.id}')">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="8.5" cy="7" r="4"></circle>
                                <line x1="20" y1="8" x2="20" y2="14"></line>
                                <line x1="23" y1="11" x2="17" y2="11"></line>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

    } catch (error) {
        console.error('Error loading complaints:', error);
        document.getElementById('recentComplaintsTable').innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 40px; color: #e74c3c;">
                    Error loading complaints. Please try again.
                </td>
            </tr>
        `;
    }
}

// Load charts
async function loadCharts() {
    try {
        const corporationId = adminUser?.corporation_id;

        if (!corporationId) {
            console.warn('No corporation_id found for admin user');
            return;
        }

        // Get status distribution
        const { data: statusData } = await supabaseClient
            .from('complaints')
            .select('status')
            .eq('corporation_id', corporationId);

        // Get department distribution
        const { data: deptData } = await supabaseClient
            .from('complaints')
            .select('department:departments(name)')
            .eq('corporation_id', corporationId);

        // Process status data
        const statusCounts = statusData?.reduce((acc, c) => {
            acc[c.status] = (acc[c.status] || 0) + 1;
            return acc;
        }, {}) || {};

        // Process department data
        const deptCounts = deptData?.reduce((acc, c) => {
            const deptName = c.department?.name || 'Unassigned';
            acc[deptName] = (acc[deptName] || 0) + 1;
            return acc;
        }, {}) || {};

        // Create status chart
        createStatusChart(statusCounts);

        // Create department chart
        createDepartmentChart(deptCounts);

    } catch (error) {
        console.error('Error loading charts:', error);
    }
}

// Create status pie chart
function createStatusChart(data) {
    const ctx = document.getElementById('statusChart').getContext('2d');

    if (statusChart) {
        statusChart.destroy();
    }

    const labels = Object.keys(data).map(s => formatStatus(s));
    const values = Object.values(data);
    const colors = {
        'new': '#3498db',
        'assigned': '#f39c12',
        'in_progress': '#e67e22',
        'resolved': '#27ae60',
        'closed': '#95a5a6',
        'rejected': '#e74c3c'
    };

    statusChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: Object.keys(data).map(s => colors[s] || '#95a5a6'),
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                }
            },
            cutout: '60%'
        }
    });
}

// Create department bar chart
function createDepartmentChart(data) {
    const ctx = document.getElementById('departmentChart').getContext('2d');

    if (departmentChart) {
        departmentChart.destroy();
    }

    // Sort by count and take top 6
    const sorted = Object.entries(data)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6);

    departmentChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sorted.map(([name]) => truncateText(name, 15)),
            datasets: [{
                label: 'Complaints',
                data: sorted.map(([, count]) => count),
                backgroundColor: '#23a2a5',
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
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

// Set up real-time subscriptions
function setupRealtimeSubscriptions() {
    if (!adminUser?.corporation_id) {
        console.warn('No corporation_id found, skipping real-time subscriptions');
        return;
    }

    // Subscribe to new complaints
    supabaseClient
        .channel('complaints-changes')
        .on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'complaints',
            filter: `corporation_id=eq.${adminUser.corporation_id}`
        }, (payload) => {
            console.log('Complaint change:', payload);
            // Refresh data on changes
            loadStats();
            loadRecentComplaints();
        })
        .subscribe();
}

// View complaint details
function viewComplaint(id) {
    window.location.href = `complaint-detail.html?id=${id}`;
}

// Open assign modal
function assignComplaint(id) {
    window.location.href = `complaints.html?assign=${id}`;
}

// Refresh dashboard data
function refreshData() {
    loadDashboardData();
}

// Toggle sidebar (mobile)
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

// Handle logout
async function handleLogout() {
    try {
        // Get corporation code before signing out - use current viewed corp
        const corpCode = currentCorporation?.code || adminUser?.corporation?.code;
        await signOut();
        sessionStorage.removeItem('adminUser');

        // Redirect to corporation page instead of login
        if (corpCode) {
            window.location.href = `../${corpCode}.html`;
        } else {
            window.location.href = '../index.html';
        }
    } catch (error) {
        console.error('Logout error:', error);
        // Fall back to index page on error
        window.location.href = '../index.html';
    }
}

// Show notifications
function showNotifications() {
    alert('Notifications feature coming soon!');
}

// Utility functions
function formatNumber(num) {
    return num.toLocaleString();
}

function formatStatus(status) {
    const statusMap = {
        'new': 'New',
        'assigned': 'Assigned',
        'in_progress': 'In Progress',
        'resolved': 'Resolved',
        'closed': 'Closed',
        'rejected': 'Rejected'
    };
    return statusMap[status] || status;
}

function formatDate(dateStr) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short'
    });
}

function truncateText(text, maxLength) {
    if (!text) return '-';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

function getSLAIndicator(complaint) {
    if (complaint.sla_breached) {
        return '<span class="sla-indicator breached">Breached</span>';
    }

    if (!complaint.sla_deadline) {
        return '<span class="sla-indicator">-</span>';
    }

    const deadline = new Date(complaint.sla_deadline);
    const now = new Date();
    const hoursLeft = Math.floor((deadline - now) / (1000 * 60 * 60));

    if (hoursLeft < 0) {
        return '<span class="sla-indicator breached">Overdue</span>';
    } else if (hoursLeft < 12) {
        return `<span class="sla-indicator warning">${hoursLeft}h left</span>`;
    } else {
        return `<span class="sla-indicator within">${Math.floor(hoursLeft / 24)}d left</span>`;
    }
}

function showError(message) {
    // Could implement a toast notification system
    console.error(message);
    alert(message);
}
