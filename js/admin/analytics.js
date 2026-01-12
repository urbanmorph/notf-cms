// Analytics Dashboard JavaScript
let adminUser = null;
let charts = {};

document.addEventListener('DOMContentLoaded', async function() {
    await waitForSupabase();

    adminUser = await requireAdmin();
    if (!adminUser) return;

    updateUserInfo();
    await updateAnalytics();
});

function updateUserInfo() {
    if (!adminUser) return;
    document.getElementById('userName').textContent = adminUser.name || 'Admin User';
    document.getElementById('userRole').textContent = formatRole(adminUser.role);
    document.getElementById('userAvatar').textContent = (adminUser.name || 'A').charAt(0).toUpperCase();
    if (adminUser.corporation) {
        document.getElementById('sidebarCorporation').textContent = adminUser.corporation.short_name || adminUser.corporation.name;
    }
}

async function updateAnalytics() {
    const days = parseInt(document.getElementById('dateRangeSelect').value);
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);

    await Promise.all([
        loadKPIs(fromDate),
        loadTrendChart(fromDate),
        loadResolutionTrendChart(fromDate),
        loadDepartmentChart(fromDate),
        loadPriorityChart(fromDate),
        loadDepartmentTable(fromDate),
        loadTopIssues(fromDate)
    ]);
}

async function loadKPIs(fromDate) {
    try {
        const corporationId = adminUser.corporation_id;

        // Total complaints in period
        const { count: total } = await supabaseClient
            .from('complaints')
            .select('*', { count: 'exact', head: true })
            .eq('corporation_id', corporationId)
            .gte('created_at', fromDate.toISOString());

        // Resolved in period
        const { count: resolved } = await supabaseClient
            .from('complaints')
            .select('*', { count: 'exact', head: true })
            .eq('corporation_id', corporationId)
            .gte('created_at', fromDate.toISOString())
            .in('status', ['resolved', 'closed']);

        // Average resolution time
        const { data: resolvedComplaints } = await supabaseClient
            .from('complaints')
            .select('created_at, resolved_at')
            .eq('corporation_id', corporationId)
            .gte('created_at', fromDate.toISOString())
            .not('resolved_at', 'is', null);

        let avgTime = 0;
        if (resolvedComplaints && resolvedComplaints.length > 0) {
            const totalHours = resolvedComplaints.reduce((sum, c) => {
                const created = new Date(c.created_at);
                const resolved = new Date(c.resolved_at);
                return sum + (resolved - created) / (1000 * 60 * 60);
            }, 0);
            avgTime = Math.round(totalHours / resolvedComplaints.length);
        }

        // SLA compliance
        const { count: totalWithSLA } = await supabaseClient
            .from('complaints')
            .select('*', { count: 'exact', head: true })
            .eq('corporation_id', corporationId)
            .gte('created_at', fromDate.toISOString())
            .not('sla_deadline', 'is', null);

        const { count: slaBreached } = await supabaseClient
            .from('complaints')
            .select('*', { count: 'exact', head: true })
            .eq('corporation_id', corporationId)
            .gte('created_at', fromDate.toISOString())
            .eq('sla_breached', true);

        const slaCompliance = totalWithSLA > 0
            ? Math.round(((totalWithSLA - (slaBreached || 0)) / totalWithSLA) * 100)
            : 100;

        // Update UI
        document.getElementById('kpiTotal').textContent = formatNumber(total || 0);
        document.getElementById('kpiResolved').textContent = formatNumber(resolved || 0);
        document.getElementById('kpiAvgTime').textContent = `${avgTime}h`;
        document.getElementById('kpiSLA').textContent = `${slaCompliance}%`;

        // Resolution rate change
        const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;
        document.getElementById('kpiResolvedChange').textContent = `${resolutionRate}% resolution rate`;

        // SLA status
        const slaEl = document.getElementById('kpiSLAChange');
        if (slaCompliance >= 90) {
            slaEl.className = 'stat-change positive';
            slaEl.textContent = 'Above target';
        } else if (slaCompliance >= 75) {
            slaEl.className = 'stat-change';
            slaEl.textContent = 'Near target';
        } else {
            slaEl.className = 'stat-change negative';
            slaEl.textContent = 'Below target';
        }

    } catch (error) {
        console.error('Error loading KPIs:', error);
    }
}

async function loadTrendChart(fromDate) {
    try {
        const { data } = await supabaseClient
            .from('complaints')
            .select('created_at')
            .eq('corporation_id', adminUser.corporation_id)
            .gte('created_at', fromDate.toISOString())
            .order('created_at');

        // Group by day
        const dailyCounts = {};
        data?.forEach(c => {
            const day = c.created_at.split('T')[0];
            dailyCounts[day] = (dailyCounts[day] || 0) + 1;
        });

        // Fill in missing days
        const days = [];
        const counts = [];
        const current = new Date(fromDate);
        const today = new Date();

        while (current <= today) {
            const dayStr = current.toISOString().split('T')[0];
            days.push(current.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }));
            counts.push(dailyCounts[dayStr] || 0);
            current.setDate(current.getDate() + 1);
        }

        // Create or update chart
        const ctx = document.getElementById('trendChart').getContext('2d');
        if (charts.trend) charts.trend.destroy();

        charts.trend = new Chart(ctx, {
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    label: 'Complaints',
                    data: counts,
                    borderColor: '#23a2a5',
                    backgroundColor: 'rgba(35, 162, 165, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true },
                    x: {
                        ticks: { maxTicksLimit: 10 }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error loading trend chart:', error);
    }
}

async function loadResolutionTrendChart(fromDate) {
    try {
        const { data: allComplaints } = await supabaseClient
            .from('complaints')
            .select('created_at, status')
            .eq('corporation_id', adminUser.corporation_id)
            .gte('created_at', fromDate.toISOString());

        // Group by week
        const weeklyData = {};
        allComplaints?.forEach(c => {
            const date = new Date(c.created_at);
            const weekStart = new Date(date);
            weekStart.setDate(date.getDate() - date.getDay());
            const weekKey = weekStart.toISOString().split('T')[0];

            if (!weeklyData[weekKey]) {
                weeklyData[weekKey] = { total: 0, resolved: 0 };
            }
            weeklyData[weekKey].total++;
            if (['resolved', 'closed'].includes(c.status)) {
                weeklyData[weekKey].resolved++;
            }
        });

        const weeks = Object.keys(weeklyData).sort();
        const rates = weeks.map(w => {
            const d = weeklyData[w];
            return d.total > 0 ? Math.round((d.resolved / d.total) * 100) : 0;
        });

        const ctx = document.getElementById('resolutionTrendChart').getContext('2d');
        if (charts.resolutionTrend) charts.resolutionTrend.destroy();

        charts.resolutionTrend = new Chart(ctx, {
            type: 'line',
            data: {
                labels: weeks.map(w => new Date(w).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })),
                datasets: [{
                    label: 'Resolution Rate %',
                    data: rates,
                    borderColor: '#27ae60',
                    backgroundColor: 'rgba(39, 174, 96, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: value => value + '%'
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error loading resolution trend:', error);
    }
}

async function loadDepartmentChart(fromDate) {
    try {
        const { data } = await supabaseClient
            .from('complaints')
            .select('department:departments(name)')
            .eq('corporation_id', adminUser.corporation_id)
            .gte('created_at', fromDate.toISOString());

        const deptCounts = {};
        data?.forEach(c => {
            const name = c.department?.name || 'Unassigned';
            deptCounts[name] = (deptCounts[name] || 0) + 1;
        });

        const sorted = Object.entries(deptCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6);

        const ctx = document.getElementById('departmentChart').getContext('2d');
        if (charts.department) charts.department.destroy();

        charts.department = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sorted.map(([name]) => truncateText(name, 12)),
                datasets: [{
                    data: sorted.map(([, count]) => count),
                    backgroundColor: [
                        '#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'
                    ],
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true },
                    x: { grid: { display: false } }
                }
            }
        });
    } catch (error) {
        console.error('Error loading department chart:', error);
    }
}

async function loadPriorityChart(fromDate) {
    try {
        const { data } = await supabaseClient
            .from('complaints')
            .select('priority')
            .eq('corporation_id', adminUser.corporation_id)
            .gte('created_at', fromDate.toISOString());

        const priorityCounts = { critical: 0, high: 0, medium: 0, low: 0 };
        data?.forEach(c => {
            if (priorityCounts.hasOwnProperty(c.priority)) {
                priorityCounts[c.priority]++;
            }
        });

        const ctx = document.getElementById('priorityChart').getContext('2d');
        if (charts.priority) charts.priority.destroy();

        charts.priority = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Critical', 'High', 'Medium', 'Low'],
                datasets: [{
                    data: [
                        priorityCounts.critical,
                        priorityCounts.high,
                        priorityCounts.medium,
                        priorityCounts.low
                    ],
                    backgroundColor: ['#e74c3c', '#f39c12', '#3498db', '#95a5a6'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { usePointStyle: true, padding: 20 }
                    }
                },
                cutout: '60%'
            }
        });
    } catch (error) {
        console.error('Error loading priority chart:', error);
    }
}

async function loadDepartmentTable(fromDate) {
    try {
        const { data: complaints } = await supabaseClient
            .from('complaints')
            .select(`
                status,
                sla_breached,
                created_at,
                resolved_at,
                department:departments(id, name)
            `)
            .eq('corporation_id', adminUser.corporation_id)
            .gte('created_at', fromDate.toISOString());

        // Group by department
        const deptStats = {};
        complaints?.forEach(c => {
            const deptName = c.department?.name || 'Unassigned';
            if (!deptStats[deptName]) {
                deptStats[deptName] = {
                    total: 0,
                    resolved: 0,
                    pending: 0,
                    slaBreached: 0,
                    totalResolutionTime: 0,
                    resolvedCount: 0
                };
            }

            const stats = deptStats[deptName];
            stats.total++;

            if (['resolved', 'closed'].includes(c.status)) {
                stats.resolved++;
                if (c.resolved_at) {
                    const hours = (new Date(c.resolved_at) - new Date(c.created_at)) / (1000 * 60 * 60);
                    stats.totalResolutionTime += hours;
                    stats.resolvedCount++;
                }
            } else if (!['rejected'].includes(c.status)) {
                stats.pending++;
            }

            if (c.sla_breached) {
                stats.slaBreached++;
            }
        });

        const tableBody = document.getElementById('departmentTable');
        const sortedDepts = Object.entries(deptStats).sort((a, b) => b[1].total - a[1].total);

        if (sortedDepts.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 40px;">No data available</td></tr>';
            return;
        }

        tableBody.innerHTML = sortedDepts.map(([name, stats]) => {
            const resolutionRate = stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0;
            const avgTime = stats.resolvedCount > 0 ? Math.round(stats.totalResolutionTime / stats.resolvedCount) : 0;
            const slaCompliance = stats.total > 0 ? Math.round(((stats.total - stats.slaBreached) / stats.total) * 100) : 100;

            return `
                <tr>
                    <td><strong>${name}</strong></td>
                    <td>${formatNumber(stats.total)}</td>
                    <td>${formatNumber(stats.resolved)}</td>
                    <td>${formatNumber(stats.pending)}</td>
                    <td class="${getPerformanceClass(resolutionRate, 80)}">${resolutionRate}%</td>
                    <td>${avgTime}h</td>
                    <td class="${getPerformanceClass(slaCompliance, 90)}">${slaCompliance}%</td>
                </tr>
            `;
        }).join('');

    } catch (error) {
        console.error('Error loading department table:', error);
    }
}

async function loadTopIssues(fromDate) {
    try {
        const { data } = await supabaseClient
            .from('complaints')
            .select('category:issue_categories(name)')
            .eq('corporation_id', adminUser.corporation_id)
            .gte('created_at', fromDate.toISOString());

        const categoryCounts = {};
        data?.forEach(c => {
            const name = c.category?.name || 'Uncategorized';
            categoryCounts[name] = (categoryCounts[name] || 0) + 1;
        });

        const sorted = Object.entries(categoryCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8);

        const maxCount = sorted.length > 0 ? sorted[0][1] : 1;

        const container = document.getElementById('topIssuesContainer');
        container.innerHTML = sorted.map(([name, count]) => {
            const percentage = Math.round((count / maxCount) * 100);
            return `
                <div class="top-issue-card">
                    <div class="top-issue-header">
                        <span class="top-issue-name">${name}</span>
                        <span class="top-issue-count">${formatNumber(count)}</span>
                    </div>
                    <div class="top-issue-bar">
                        <div class="top-issue-bar-fill" style="width: ${percentage}%"></div>
                    </div>
                </div>
            `;
        }).join('');

    } catch (error) {
        console.error('Error loading top issues:', error);
    }
}

function getPerformanceClass(value, threshold) {
    if (value >= threshold) return 'performance-good';
    if (value >= threshold - 15) return 'performance-warning';
    return 'performance-bad';
}

async function exportReport() {
    const days = document.getElementById('dateRangeSelect').value;
    alert(`Exporting ${days}-day report... (Feature coming soon)`);
}

// Utility functions
function formatNumber(num) {
    return num.toLocaleString();
}

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

function truncateText(text, max) {
    return text.length > max ? text.substring(0, max) + '...' : text;
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

async function handleLogout() {
    await signOut();
    sessionStorage.removeItem('adminUser');
    window.location.href = 'login.html';
}
