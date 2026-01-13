// Complaints Management JavaScript
let adminUser = null;
let fullAdminProfile = null;
let currentCorporation = null;
let complaints = [];
let departments = [];
let officers = [];
let currentPage = 1;
let pageSize = 20;
let totalComplaints = 0;
let selectedComplaints = new Set();
let currentAssignComplaint = null;

// Get corporation code from URL
function getCorporationFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('corp');
}

// Initialize
document.addEventListener('DOMContentLoaded', async function() {
    await waitForSupabase();

    adminUser = await requireAdmin();
    if (!adminUser) return;

    // Get full profile with multi-corporation access
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (user) {
        fullAdminProfile = await getFullAdminProfile(user.id);
    }

    // Handle multi-corporation access
    const urlCorp = getCorporationFromURL();
    const userCorp = adminUser.corporation?.code;
    const allCorps = fullAdminProfile?.all_corporations || [];

    if (urlCorp) {
        currentCorporation = allCorps.find(c => c.code === urlCorp) || adminUser.corporation;
    } else {
        currentCorporation = adminUser.corporation || (allCorps.length > 0 ? allCorps[0] : null);
    }

    // Update adminUser.corporation_id to match the currently viewed corporation
    if (currentCorporation) {
        adminUser.corporation_id = currentCorporation.id;
        adminUser.corporation = currentCorporation;
    }

    updateUserInfo();
    await loadDepartments();
    await loadComplaints();

    // Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    const assignId = urlParams.get('assign');
    const viewId = urlParams.get('view');

    if (searchQuery) {
        document.getElementById('searchInput').value = searchQuery;
        applyFilters();
    }

    if (viewId) {
        viewComplaint(viewId);
    }

    if (assignId) {
        openAssignModal(assignId);
    }

    // Set up search debounce
    let searchTimeout;
    document.getElementById('searchInput').addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => applyFilters(), 300);
    });

    // Filter change listeners
    ['statusFilter', 'departmentFilter', 'priorityFilter', 'dateFilter'].forEach(id => {
        document.getElementById(id).addEventListener('change', applyFilters);
    });
});

// Update user info
function updateUserInfo() {
    if (!adminUser) return;
    document.getElementById('userName').textContent = adminUser.name || 'Admin User';
    document.getElementById('userRole').textContent = formatRole(adminUser.role);
    document.getElementById('userAvatar').textContent = (adminUser.name || 'A').charAt(0).toUpperCase();
    if (adminUser.corporation) {
        document.getElementById('sidebarCorporation').textContent = adminUser.corporation.short_name || adminUser.corporation.name;
    }
}

// Load departments for filters
async function loadDepartments() {
    try {
        const { data, error } = await supabaseClient
            .from('departments')
            .select('*')
            .order('name');

        if (error) throw error;
        departments = data || [];

        // Populate filter dropdown
        const filterSelect = document.getElementById('departmentFilter');
        const assignSelect = document.getElementById('assignDepartment');

        departments.forEach(dept => {
            filterSelect.innerHTML += `<option value="${dept.id}">${dept.name}</option>`;
            assignSelect.innerHTML += `<option value="${dept.id}">${dept.name}</option>`;
        });
    } catch (error) {
        console.error('Error loading departments:', error);
    }
}

// Load complaints with filters
async function loadComplaints() {
    try {
        const filters = getActiveFilters();

        let query = supabaseClient
            .from('complaints')
            .select(`
                *,
                department:departments!complaints_department_id_fkey(id, name),
                category:issue_categories!complaints_category_id_fkey(id, name),
                assigned_officer:admin_users!complaints_assigned_to_fkey(id, name)
            `, { count: 'exact' })
            .eq('corporation_id', adminUser.corporation_id)
            .order('created_at', { ascending: false });

        // Apply filters
        if (filters.status) {
            query = query.eq('status', filters.status);
        }
        if (filters.department) {
            query = query.eq('department_id', filters.department);
        }
        if (filters.priority) {
            query = query.eq('priority', filters.priority);
        }
        if (filters.search) {
            query = query.or(`complaint_number.ilike.%${filters.search}%,title.ilike.%${filters.search}%,citizen_name.ilike.%${filters.search}%`);
        }
        if (filters.dateRange) {
            const dateFrom = getDateRangeStart(filters.dateRange);
            if (dateFrom) {
                query = query.gte('created_at', dateFrom.toISOString());
            }
        }

        // Pagination
        const from = (currentPage - 1) * pageSize;
        const to = from + pageSize - 1;
        query = query.range(from, to);

        const { data, error, count } = await query;

        if (error) throw error;

        complaints = data || [];
        totalComplaints = count || 0;

        renderComplaints();
        renderPagination();
        updateNewCount();

    } catch (error) {
        console.error('Error loading complaints:', error);
        document.getElementById('complaintsTable').innerHTML = `
            <tr>
                <td colspan="10" style="text-align: center; padding: 40px; color: #e74c3c;">
                    Error loading complaints. Please try again.
                </td>
            </tr>
        `;
    }
}

// Get active filter values
function getActiveFilters() {
    return {
        search: document.getElementById('searchInput').value.trim(),
        status: document.getElementById('statusFilter').value,
        department: document.getElementById('departmentFilter').value,
        priority: document.getElementById('priorityFilter').value,
        dateRange: document.getElementById('dateFilter').value
    };
}

// Get date range start
function getDateRangeStart(range) {
    const now = new Date();
    switch (range) {
        case 'today':
            return new Date(now.getFullYear(), now.getMonth(), now.getDate());
        case 'week':
            const weekAgo = new Date(now);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return weekAgo;
        case 'month':
            return new Date(now.getFullYear(), now.getMonth(), 1);
        case 'quarter':
            const quarterMonth = Math.floor(now.getMonth() / 3) * 3;
            return new Date(now.getFullYear(), quarterMonth, 1);
        default:
            return null;
    }
}

// Render complaints table
function renderComplaints() {
    const tableBody = document.getElementById('complaintsTable');

    if (complaints.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="10" style="text-align: center; padding: 40px; color: #7f8c8d;">
                    No complaints found matching your criteria.
                </td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = complaints.map(c => `
        <tr data-id="${c.id}">
            <td>
                <input type="checkbox" class="complaint-checkbox" value="${c.id}"
                    ${selectedComplaints.has(c.id) ? 'checked' : ''}
                    onchange="toggleComplaintSelection('${c.id}')">
            </td>
            <td><span class="complaint-id">${c.complaint_number || 'N/A'}</span></td>
            <td title="${c.title}">${truncateText(c.title, 35)}</td>
            <td>${c.department?.name || 'Unassigned'}</td>
            <td><span class="status-badge ${c.status}">${formatStatus(c.status)}</span></td>
            <td><span class="priority-badge ${c.priority}">${c.priority}</span></td>
            <td>${c.assigned_officer?.name || '<span style="color: #e74c3c;">Unassigned</span>'}</td>
            <td>${getSLAIndicator(c)}</td>
            <td>${formatDate(c.created_at)}</td>
            <td>
                <div class="table-actions">
                    <button class="action-btn view" title="View Details" onclick="viewComplaint('${c.id}')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                    <button class="action-btn assign" title="Assign" onclick="openAssignModal('${c.id}')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="8.5" cy="7" r="4"></circle>
                            <line x1="20" y1="8" x2="20" y2="14"></line>
                            <line x1="23" y1="11" x2="17" y2="11"></line>
                        </svg>
                    </button>
                    <button class="action-btn edit" title="Edit" onclick="editComplaint('${c.id}')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Render pagination
function renderPagination() {
    const totalPages = Math.ceil(totalComplaints / pageSize);
    const info = document.getElementById('paginationInfo');
    const controls = document.getElementById('paginationControls');

    const from = (currentPage - 1) * pageSize + 1;
    const to = Math.min(currentPage * pageSize, totalComplaints);

    info.textContent = `Showing ${from}-${to} of ${totalComplaints} complaints`;

    let paginationHTML = '';

    // Previous button
    paginationHTML += `
        <button class="pagination-btn" onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
            &laquo; Prev
        </button>
    `;

    // Page numbers
    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage < maxButtons - 1) {
        startPage = Math.max(1, endPage - maxButtons + 1);
    }

    if (startPage > 1) {
        paginationHTML += `<button class="pagination-btn" onclick="goToPage(1)">1</button>`;
        if (startPage > 2) {
            paginationHTML += `<span style="padding: 8px;">...</span>`;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">
                ${i}
            </button>
        `;
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHTML += `<span style="padding: 8px;">...</span>`;
        }
        paginationHTML += `<button class="pagination-btn" onclick="goToPage(${totalPages})">${totalPages}</button>`;
    }

    // Next button
    paginationHTML += `
        <button class="pagination-btn" onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
            Next &raquo;
        </button>
    `;

    controls.innerHTML = paginationHTML;
}

// Go to page
function goToPage(page) {
    if (page < 1 || page > Math.ceil(totalComplaints / pageSize)) return;
    currentPage = page;
    loadComplaints();
}

// Apply filters
function applyFilters() {
    currentPage = 1;
    loadComplaints();
}

// Clear filters
function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('statusFilter').value = '';
    document.getElementById('departmentFilter').value = '';
    document.getElementById('priorityFilter').value = '';
    document.getElementById('dateFilter').value = '';
    applyFilters();
}

// Toggle complaint selection
function toggleComplaintSelection(id) {
    if (selectedComplaints.has(id)) {
        selectedComplaints.delete(id);
    } else {
        selectedComplaints.add(id);
    }
    updateBulkActionsBar();
}

// Toggle select all
function toggleSelectAll() {
    const selectAll = document.getElementById('selectAll').checked;
    const checkboxes = document.querySelectorAll('.complaint-checkbox');

    checkboxes.forEach(cb => {
        cb.checked = selectAll;
        if (selectAll) {
            selectedComplaints.add(cb.value);
        } else {
            selectedComplaints.delete(cb.value);
        }
    });

    updateBulkActionsBar();
}

// Update bulk actions bar
function updateBulkActionsBar() {
    const bar = document.getElementById('bulkActionsBar');
    const count = document.getElementById('selectedCount');

    if (selectedComplaints.size > 0) {
        bar.style.display = 'flex';
        count.textContent = `${selectedComplaints.size} selected`;
    } else {
        bar.style.display = 'none';
    }
}

// Clear selection
function clearSelection() {
    selectedComplaints.clear();
    document.querySelectorAll('.complaint-checkbox').forEach(cb => cb.checked = false);
    document.getElementById('selectAll').checked = false;
    updateBulkActionsBar();
}

// View complaint details
async function viewComplaint(id) {
    const complaint = complaints.find(c => c.id === id);
    if (!complaint) {
        // Fetch from database
        const { data, error } = await supabaseClient
            .from('complaints')
            .select(`
                *,
                department:departments!complaints_department_id_fkey(name),
                category:issue_categories!complaints_category_id_fkey(name),
                assigned_officer:admin_users!complaints_assigned_to_fkey(name, phone, email)
            `)
            .eq('id', id)
            .single();

        if (error) {
            alert('Error loading complaint details');
            return;
        }
        showComplaintDetail(data);
    } else {
        showComplaintDetail(complaint);
    }
}

// Show complaint detail modal
function showComplaintDetail(complaint) {
    document.getElementById('detailModalTitle').textContent = `Complaint ${complaint.complaint_number}`;

    document.getElementById('detailModalBody').innerHTML = `
        <div class="detail-grid">
            <div class="detail-section">
                <h4>Complaint Information</h4>
                <div class="detail-row">
                    <span class="detail-label">Status</span>
                    <span class="detail-value"><span class="status-badge ${complaint.status}">${formatStatus(complaint.status)}</span></span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Priority</span>
                    <span class="detail-value"><span class="priority-badge ${complaint.priority}">${complaint.priority}</span></span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Department</span>
                    <span class="detail-value">${complaint.department?.name || 'Unassigned'}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Category</span>
                    <span class="detail-value">${complaint.category?.name || 'N/A'}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Created</span>
                    <span class="detail-value">${new Date(complaint.created_at).toLocaleString()}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">SLA Deadline</span>
                    <span class="detail-value">${complaint.sla_deadline ? new Date(complaint.sla_deadline).toLocaleString() : 'Not set'}</span>
                </div>
            </div>

            <div class="detail-section">
                <h4>Citizen Information</h4>
                <div class="detail-row">
                    <span class="detail-label">Name</span>
                    <span class="detail-value">${complaint.citizen_name || 'Anonymous'}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Phone</span>
                    <span class="detail-value">${complaint.citizen_phone || 'N/A'}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Email</span>
                    <span class="detail-value">${complaint.citizen_email || 'N/A'}</span>
                </div>
            </div>

            <div class="detail-section" style="grid-column: 1 / -1;">
                <h4>Description</h4>
                <p style="margin: 0; line-height: 1.6;">${complaint.description || 'No description provided.'}</p>
            </div>

            <div class="detail-section">
                <h4>Location</h4>
                <div class="detail-row">
                    <span class="detail-label">Address</span>
                    <span class="detail-value">${complaint.address || 'N/A'}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Landmark</span>
                    <span class="detail-value">${complaint.landmark || 'N/A'}</span>
                </div>
                ${complaint.latitude && complaint.longitude ? `
                <div class="detail-row">
                    <span class="detail-label">Coordinates</span>
                    <span class="detail-value">${complaint.latitude}, ${complaint.longitude}</span>
                </div>
                ` : ''}
            </div>

            <div class="detail-section">
                <h4>Assignment</h4>
                <div class="detail-row">
                    <span class="detail-label">Assigned To</span>
                    <span class="detail-value">${complaint.assigned_officer?.name || 'Unassigned'}</span>
                </div>
                ${complaint.assigned_officer ? `
                <div class="detail-row">
                    <span class="detail-label">Officer Phone</span>
                    <span class="detail-value">${complaint.assigned_officer.phone || 'N/A'}</span>
                </div>
                ` : ''}
                <div class="detail-row">
                    <span class="detail-label">Assigned At</span>
                    <span class="detail-value">${complaint.assigned_at ? new Date(complaint.assigned_at).toLocaleString() : 'N/A'}</span>
                </div>
            </div>
        </div>
    `;

    currentAssignComplaint = complaint;
    document.getElementById('detailModal').style.display = 'flex';
}

// Close detail modal
function closeDetailModal() {
    document.getElementById('detailModal').style.display = 'none';
    currentAssignComplaint = null;
}

// Assign from detail modal
function assignFromDetail() {
    if (currentAssignComplaint) {
        closeDetailModal();
        openAssignModal(currentAssignComplaint.id);
    }
}

// Open assign modal
async function openAssignModal(id) {
    const complaint = complaints.find(c => c.id === id) || await fetchComplaint(id);
    if (!complaint) return;

    currentAssignComplaint = complaint;

    document.getElementById('assignComplaintInfo').innerHTML = `
        <h4>${complaint.complaint_number}</h4>
        <p>${truncateText(complaint.title, 100)}</p>
    `;

    // Set current values if already assigned
    if (complaint.department_id) {
        document.getElementById('assignDepartment').value = complaint.department_id;
        await loadOfficersForDepartment();
    }
    if (complaint.assigned_to) {
        document.getElementById('assignOfficer').value = complaint.assigned_to;
    }
    if (complaint.priority) {
        document.getElementById('assignPriority').value = complaint.priority;
    }

    // Get ML suggestion
    await getMLSuggestion(complaint);

    document.getElementById('assignModal').style.display = 'flex';
}

// Fetch single complaint
async function fetchComplaint(id) {
    const { data, error } = await supabaseClient
        .from('complaints')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching complaint:', error);
        return null;
    }
    return data;
}

// Close assign modal
function closeAssignModal() {
    document.getElementById('assignModal').style.display = 'none';
    document.getElementById('assignForm').reset();
    document.getElementById('mlSuggestion').style.display = 'none';
    currentAssignComplaint = null;
}

// Load officers for department
async function loadOfficersForDepartment() {
    const departmentId = document.getElementById('assignDepartment').value;
    const officerSelect = document.getElementById('assignOfficer');

    officerSelect.innerHTML = '<option value="">Select Officer</option>';

    if (!departmentId) return;

    try {
        const { data, error } = await supabaseClient
            .from('admin_users')
            .select('*')
            .eq('corporation_id', adminUser.corporation_id)
            .eq('is_active', true)
            .or(`department_id.eq.${departmentId},department_id.is.null`);

        if (error) throw error;

        officers = data || [];
        officers.forEach(officer => {
            officerSelect.innerHTML += `<option value="${officer.id}">${officer.name} (${formatRole(officer.role)})</option>`;
        });
    } catch (error) {
        console.error('Error loading officers:', error);
    }
}

// Get ML suggestion for assignment
async function getMLSuggestion(complaint) {
    const mlDiv = document.getElementById('mlSuggestion');
    const mlText = document.getElementById('mlSuggestionText');

    // Simple keyword-based ML suggestion
    const text = `${complaint.title} ${complaint.description}`.toLowerCase();

    let suggestedDept = null;
    let confidence = 0;

    // Keyword matching rules
    const rules = [
        { keywords: ['streetlight', 'street light', 'lamp', 'bulb', 'electrical', 'wire', 'transformer'], dept: 'electrical', confidence: 0.85 },
        { keywords: ['garbage', 'waste', 'dustbin', 'rubbish', 'trash', 'dump', 'debris'], dept: 'swm', confidence: 0.9 },
        { keywords: ['pothole', 'road', 'footpath', 'pavement', 'tar', 'asphalt'], dept: 'roads', confidence: 0.88 },
        { keywords: ['water', 'pipe', 'leak', 'supply', 'tap', 'borewell'], dept: 'water', confidence: 0.87 },
        { keywords: ['drain', 'sewage', 'manhole', 'flooding', 'waterlogging', 'gutter'], dept: 'drainage', confidence: 0.86 },
        { keywords: ['tree', 'branch', 'fallen', 'pruning', 'forest'], dept: 'forest', confidence: 0.82 },
        { keywords: ['mosquito', 'health', 'sanitation', 'toilet', 'dead animal'], dept: 'health', confidence: 0.8 },
        { keywords: ['dog', 'stray', 'cattle', 'cow', 'animal'], dept: 'animals', confidence: 0.83 }
    ];

    for (const rule of rules) {
        const matchCount = rule.keywords.filter(kw => text.includes(kw)).length;
        if (matchCount > 0) {
            const ruleConfidence = rule.confidence * (matchCount / rule.keywords.length);
            if (ruleConfidence > confidence) {
                suggestedDept = rule.dept;
                confidence = ruleConfidence;
            }
        }
    }

    if (suggestedDept && confidence > 0.3) {
        const dept = departments.find(d => d.code === suggestedDept);
        if (dept) {
            mlText.innerHTML = `
                Based on the complaint description, we suggest assigning this to
                <strong>${dept.name}</strong> (${Math.round(confidence * 100)}% confidence).
            `;
            mlDiv.dataset.deptId = dept.id;
            mlDiv.style.display = 'block';
        }
    } else {
        mlDiv.style.display = 'none';
    }
}

// Apply ML suggestion
function applyMLSuggestion() {
    const mlDiv = document.getElementById('mlSuggestion');
    const deptId = mlDiv.dataset.deptId;

    if (deptId) {
        document.getElementById('assignDepartment').value = deptId;
        loadOfficersForDepartment();
    }
}

// Submit assignment
async function submitAssignment() {
    const departmentId = document.getElementById('assignDepartment').value;
    const officerId = document.getElementById('assignOfficer').value;
    const priority = document.getElementById('assignPriority').value;
    const notes = document.getElementById('assignNotes').value;

    if (!departmentId || !officerId) {
        alert('Please select a department and officer');
        return;
    }

    try {
        const { error } = await supabaseClient
            .from('complaints')
            .update({
                department_id: departmentId,
                assigned_to: officerId,
                assigned_by: adminUser.id,
                assigned_at: new Date().toISOString(),
                priority: priority,
                status: 'assigned'
            })
            .eq('id', currentAssignComplaint.id);

        if (error) throw error;

        // Add comment if notes provided
        if (notes) {
            await supabaseClient
                .from('complaint_comments')
                .insert({
                    complaint_id: currentAssignComplaint.id,
                    admin_user_id: adminUser.id,
                    comment: `Assignment notes: ${notes}`,
                    is_internal: true
                });
        }

        closeAssignModal();
        loadComplaints();
        alert('Complaint assigned successfully!');

    } catch (error) {
        console.error('Error assigning complaint:', error);
        alert('Failed to assign complaint. Please try again.');
    }
}

// Bulk assign
function bulkAssign() {
    if (selectedComplaints.size === 0) return;
    alert(`Bulk assignment for ${selectedComplaints.size} complaints coming soon!`);
}

// Bulk update status
function bulkUpdateStatus() {
    if (selectedComplaints.size === 0) return;
    alert(`Bulk status update for ${selectedComplaints.size} complaints coming soon!`);
}

// Edit complaint
function editComplaint(id) {
    alert('Edit functionality coming soon!');
}

// Export complaints
async function exportComplaints() {
    try {
        const { data, error } = await supabaseClient
            .from('complaints')
            .select(`
                complaint_number,
                title,
                description,
                status,
                priority,
                citizen_name,
                citizen_phone,
                address,
                created_at,
                department:departments(name)
            `)
            .eq('corporation_id', adminUser.corporation_id)
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Convert to CSV
        const headers = ['Complaint ID', 'Title', 'Description', 'Status', 'Priority', 'Citizen Name', 'Phone', 'Address', 'Department', 'Created At'];
        const rows = data.map(c => [
            c.complaint_number,
            `"${(c.title || '').replace(/"/g, '""')}"`,
            `"${(c.description || '').replace(/"/g, '""')}"`,
            c.status,
            c.priority,
            c.citizen_name || '',
            c.citizen_phone || '',
            `"${(c.address || '').replace(/"/g, '""')}"`,
            c.department?.name || '',
            new Date(c.created_at).toLocaleString()
        ]);

        const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

        // Download
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `complaints_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);

    } catch (error) {
        console.error('Export error:', error);
        alert('Failed to export complaints');
    }
}

// Update new complaints count in sidebar
async function updateNewCount() {
    const { count } = await supabaseClient
        .from('complaints')
        .select('*', { count: 'exact', head: true })
        .eq('corporation_id', adminUser.corporation_id)
        .eq('status', 'new');

    const badge = document.getElementById('newComplaintsCount');
    badge.textContent = count || 0;
    badge.style.display = count > 0 ? 'inline' : 'none';
}

// Utility functions
function formatRole(role) {
    const roleMap = {
        'super_admin': 'Super Admin',
        'commissioner': 'Commissioner',
        'zone_officer': 'Zone Officer',
        'department_head': 'Dept Head',
        'field_officer': 'Field Officer'
    };
    return roleMap[role] || role;
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
    return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
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

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

async function handleLogout() {
    await signOut();
    sessionStorage.removeItem('adminUser');
    window.location.href = 'login.html';
}

// Close modals on outside click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});
