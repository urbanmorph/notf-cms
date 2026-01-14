/**
 * Internationalization (i18n) System for Corporations of Greater Bengaluru
 * Supports English (en) and Kannada (kn)
 */

const translations = {
    en: {
        nav: {
            brand: "Corporations of Greater Bengaluru",
            home: "Home",
            corporations: "Corporations",
            trackComplaint: "Track Complaint",
            admin: "Admin"
        },
        corporations: {
            north: "Bengaluru North",
            south: "Bengaluru South",
            east: "Bengaluru East",
            west: "Bengaluru West",
            central: "Bengaluru Central"
        },
        hero: {
            title: "Intelligent Civic Issue Management for Bengaluru",
            subtitle: "AI-powered issue tracking and resolution across Greater Bengaluru's 5 city corporations"
        },
        stats: {
            totalGrievances: "Total Grievances Analyzed",
            resolutionRate: "Overall Resolution Rate",
            wardsCovered: "Wards Covered",
            dataHistory: "Data History (2020-2025)"
        },
        insights: {
            title: "Key Insights from 766,648 Grievances",
            subtitle: "Analysis of BBMP data from 2020-2025",
            topConcern: "Top Citizen Concern",
            topConcernDesc: "Street lights account for the largest share of complaints (293,580 grievances)",
            topConcernTrend: "Quick wins available in electrical infrastructure",
            performance: "Performance Improvement",
            performanceDesc: "Resolution rate improved from 87.6% (2020) to 96.9% (2023)",
            performanceTrend: "Peak performance in 2022-2023",
            engagement: "Citizen Engagement",
            engagementDesc: "2024 saw massive increase to 207K complaints",
            engagementTrend: "Higher awareness of grievance systems"
        },
        focusAreas: {
            title: "Top 3 Focus Areas",
            electrical: "Electrical / Street Lights",
            swm: "Solid Waste Management",
            roads: "Road Maintenance"
        },
        rankings: {
            title: "Corporation Performance Rankings",
            subtitle: "Based on 477,997 mapped grievances (62.3% of total data)",
            rank: "Rank",
            corporation: "Corporation",
            totalGrievances: "Total Grievances",
            closed: "Closed",
            open: "Open",
            resolutionRate: "Resolution Rate",
            topIssue: "Top Issue"
        },
        features: {
            title: "Platform Features",
            aiRouting: "AI-Powered Issue Routing",
            aiRoutingDesc: "Advanced ML algorithms automatically assign issues to the right engineers based on geography and responsibility areas",
            dashboards: "Real-Time Dashboards",
            dashboardsDesc: "Commissioner dashboards provide instant visibility into issue status, trends, and performance metrics",
            multiChannel: "Multi-Channel Support",
            multiChannelDesc: "Citizens can report issues via WhatsApp, Telegram, Email, or Web - all integrated into one system",
            maps: "Interactive Maps",
            mapsDesc: "Visual geographic tracking of all issues with heat maps showing problem areas across the city",
            priority: "Priority Matrix",
            priorityDesc: "Smart escalation system ensures critical issues get immediate attention from the right agencies",
            analytics: "Performance Analytics",
            analyticsDesc: "Track KPIs including resolution time, SLA compliance, and citizen satisfaction scores"
        },
        dashboard: {
            title: "Performance Dashboard",
            totalGrievances: "Total Grievances",
            closed: "Closed",
            open: "Open",
            resolutionRate: "Resolution Rate"
        },
        corpHeader: {
            commissioner: "City Corporation Commissioner",
            phone: "Phone",
            controlRoom: "Control Room"
        },
        geographic: {
            title: "Geographic Coverage",
            subtitle: "Interactive map showing ward boundaries and issue density across the corporation"
        },
        charts: {
            title: "Performance Analytics & Trends",
            resolutionTrend: "Resolution Rate Trend (2020-2025)",
            yearlyVolume: "Yearly Grievance Volume",
            topCategories: "Top Issue Categories",
            closedVsOpen: "Closed vs Open Grievances",
            seasonal: "Monthly Distribution (Seasonal Patterns)"
        },
        contact: {
            title: "Contact Information",
            subtitle: "Official contact details for corporation officials"
        },
        complaint: {
            fileComplaint: "File a Complaint",
            yourName: "Your Name",
            phone: "Phone Number",
            email: "Email",
            emailPlaceholder: "For updates (optional)",
            issueType: "Issue Type",
            location: "Location of Issue",
            locationPlaceholder: "Street address or area",
            landmark: "Landmark",
            landmarkPlaceholder: "Nearby landmark (optional)",
            pinLocation: "Pin Location on Map",
            useMyLocation: "Use My Location",
            description: "Description",
            descriptionPlaceholder: "Please describe the issue in detail",
            uploadPhoto: "Upload Photo (Optional)",
            submit: "Submit Complaint"
        },
        track: {
            title: "Track Your Complaint",
            subtitle: "Enter your complaint ID or phone number to check the status",
            searchLabel: "Complaint ID or Phone Number",
            searchPlaceholder: "Enter complaint ID (e.g., GBA-NORTH-001) or phone number",
            searchButton: "Search",
            recentTitle: "Recent Complaints",
            noResults: "No complaints found. Please check your complaint ID or phone number."
        },
        footer: {
            about: "Greater Bengaluru Authority",
            aboutDesc: "Civic grievance tracking and transparency platform for all five corporations of Greater Bengaluru.",
            corporations: "Corporations",
            features: "Features",
            trackComplaint: "Track Complaint",
            dataInsights: "Data Insights",
            aboutPlatform: "About the Platform",
            dataResources: "Data & Resources",
            bbmpData: "BBMP Grievances Data",
            wardData: "GBA Ward Delimitation",
            github: "GitHub Repository",
            copyright: "Corporations of Greater Bengaluru. Data sourced from"
        },
        common: {
            loading: "Loading...",
            required: "required",
            optional: "optional"
        },
        admin: {
            // Sidebar
            sidebar: {
                title: "GBA Admin",
                switchCorporation: "Switch Corporation",
                overview: "Overview",
                dashboard: "Dashboard",
                allComplaints: "All Complaints",
                management: "Management",
                assignments: "Assignments",
                slaTracking: "SLA Tracking",
                analytics: "Analytics",
                reports: "Reports",
                officerPerformance: "Officer Performance",
                settings: "Settings"
            },
            // Header
            header: {
                home: "Home",
                search: "Search complaints...",
                notifications: "Notifications",
                logout: "Logout"
            },
            // Login
            login: {
                title: "GBA Admin Portal",
                subtitle: "Complaint Management System",
                email: "Email Address",
                emailPlaceholder: "admin@corporation.gov.in",
                password: "Password",
                passwordPlaceholder: "Enter your password",
                rememberMe: "Remember me",
                forgotPassword: "Forgot password?",
                signIn: "Sign In",
                resetPassword: "Reset Password",
                resetInstructions: "Enter your email address and we'll send you a link to reset your password.",
                sendResetLink: "Send Reset Link",
                footer: "Greater Bengaluru Authority"
            },
            // Dashboard
            dashboard: {
                title: "Dashboard",
                subtitle: "Welcome back! Here's an overview of your corporation's complaints.",
                refresh: "Refresh",
                totalComplaints: "Total Complaints",
                pending: "Pending",
                awaitingAction: "Awaiting action",
                inProgress: "In Progress",
                beingWorkedOn: "Being worked on",
                resolved: "Resolved",
                thisMonth: "This month",
                slaBreached: "SLA Breached",
                needsAttention: "Needs attention",
                resolutionRate: "Resolution Rate",
                overall: "Overall",
                complaintsByStatus: "Complaints by Status",
                complaintsByDepartment: "Complaints by Department",
                recentComplaints: "Recent Complaints",
                viewAll: "View All",
                complaintId: "Complaint ID",
                title_col: "Title",
                category: "Category",
                status: "Status",
                priority: "Priority",
                sla: "SLA",
                created: "Created",
                actions: "Actions"
            },
            // Complaints
            complaints: {
                title: "All Complaints",
                subtitle: "Manage and track all complaints for your corporation",
                export: "Export",
                search: "Search:",
                searchPlaceholder: "ID, title, or citizen name...",
                statusFilter: "Status:",
                allStatus: "All Status",
                new: "New",
                assigned: "Assigned",
                inProgress: "In Progress",
                resolved: "Resolved",
                closed: "Closed",
                rejected: "Rejected",
                statusNew: "New",
                statusAssigned: "Assigned",
                statusInProgress: "In Progress",
                statusResolved: "Resolved",
                statusClosed: "Closed",
                statusRejected: "Rejected",
                departmentFilter: "Department:",
                allDepartments: "All Departments",
                priorityFilter: "Priority:",
                allPriorities: "All Priorities",
                critical: "Critical",
                high: "High",
                medium: "Medium",
                low: "Low",
                priorityCritical: "Critical",
                priorityHigh: "High",
                priorityMedium: "Medium",
                priorityLow: "Low",
                dateFilter: "Date Range:",
                dateRange: "Date Range:",
                allTime: "All Time",
                today: "Today",
                thisWeek: "This Week",
                thisMonth: "This Month",
                thisQuarter: "This Quarter",
                clear: "Clear",
                apply: "Apply",
                assignedTo: "Assigned To",
                loadingComplaints: "Loading complaints...",
                showing: "Showing",
                of: "of",
                selected: "selected",
                assignSelected: "Assign Selected",
                updateStatus: "Update Status",
                clearSelection: "Clear Selection",
                assignComplaint: "Assign Complaint",
                department: "Department",
                assignTo: "Assign To",
                selectDepartment: "Select Department",
                selectOfficer: "Select Officer",
                notes: "Notes",
                notesPlaceholder: "Add any notes for the officer...",
                aiSuggestion: "AI Suggestion",
                applySuggestion: "Apply Suggestion",
                cancel: "Cancel",
                assign: "Assign",
                complaintDetails: "Complaint Details",
                close: "Close",
                complaintId: "Complaint ID",
                titleCol: "Title",
                status: "Status",
                priority: "Priority",
                sla: "SLA",
                created: "Created",
                actions: "Actions",
                departmentRequired: "Department *",
                assignToRequired: "Assign To *"
            },
            // Officers
            officers: {
                title: "Officer Performance",
                subtitle: "Track and analyze individual officer performance metrics",
                last7Days: "Last 7 Days",
                last30Days: "Last 30 Days",
                last90Days: "Last 90 Days",
                activeOfficers: "Active Officers",
                totalResolved: "Total Resolved",
                avgResolutionTime: "Avg Resolution Time",
                avgSlaCompliance: "Avg SLA Compliance",
                topPerformers: "Top Performers",
                workloadDistribution: "Workload Distribution",
                performanceDetails: "Officer Performance Details",
                sortBy: "Sort By:",
                mostResolved: "Most Resolved",
                leastResolved: "Least Resolved",
                fastestResolution: "Fastest Resolution",
                slowestResolution: "Slowest Resolution",
                bestSlaCompliance: "Best SLA Compliance",
                worstSlaCompliance: "Worst SLA Compliance",
                rank: "Rank",
                officer: "Officer",
                role: "Role",
                assigned: "Assigned",
                pendingCol: "Pending",
                resolutionRateCol: "Resolution Rate",
                avgTime: "Avg Time (hrs)",
                slaCompliance: "SLA Compliance"
            },
            // Assignments
            assignments: {
                title: "Assignment Management",
                subtitle: "Auto-assign and manage complaint routing to officers",
                autoAssignUnassigned: "Auto-Assign Unassigned",
                mlAutoAssignSettings: "ML Auto-Assignment Settings",
                autoAssignEnabled: "Auto-assign enabled",
                categoryBasedRouting: "Category-based Routing",
                categoryRoutingDesc: "Route complaints to departments based on issue category",
                automatic: "Automatic (ML-based)",
                ruleBased: "Rule-based",
                manualOnly: "Manual only",
                zoneBasedAssignment: "Zone-based Assignment",
                zoneAssignmentDesc: "Assign to officers based on geographic zones/wards",
                enabled: "Enabled",
                disabled: "Disabled",
                loadBalancing: "Load Balancing",
                loadBalancingDesc: "Distribute complaints evenly among available officers",
                byWorkload: "By Current Workload",
                roundRobin: "Round Robin",
                byPerformance: "By Performance Score",
                priorityEscalation: "Priority Escalation",
                escalationDesc: "Auto-escalate high priority complaints",
                categoryToDepartment: "Category to Department Mapping",
                saveMappings: "Save Mappings",
                issueCategory: "Issue Category",
                primaryDepartment: "Primary Department",
                secondaryDepartment: "Secondary Department",
                defaultPriority: "Default Priority",
                slaHours: "SLA (Hours)",
                unassignedComplaints: "Unassigned Complaints",
                assignSelectedBtn: "Assign Selected",
                id: "ID",
                locationWard: "Location/Ward",
                description: "Description",
                submitted: "Submitted",
                mlSuggestion: "ML Suggestion",
                noUnassigned: "No unassigned complaints",
                recentAssignments: "Recent Assignments",
                assignedBy: "Assigned By",
                method: "Method",
                assignedAt: "Assigned At",
                aiRecommendation: "AI Recommendation",
                autoAssignInProgress: "Auto-Assignment in Progress",
                analyzingComplaints: "Analyzing complaints...",
                processed: "processed"
            },
            // Analytics
            analytics: {
                title: "Analytics & Reports",
                subtitle: "Comprehensive analytics for your corporation's complaint management",
                lastYear: "Last Year",
                exportReport: "Export Report",
                totalReceived: "Total Received",
                avgResolutionTime: "Avg Resolution Time",
                inHours: "In hours",
                slaCompliance: "SLA Compliance",
                target: "Target: 90%",
                complaintsTrend: "Complaints Trend",
                resolutionRateTrend: "Resolution Rate Trend",
                complaintsByDepartment: "Complaints by Department",
                priorityDistribution: "Priority Distribution",
                departmentPerformance: "Department Performance",
                total: "Total",
                pending: "Pending",
                avgTimeHrs: "Avg Time (hrs)",
                topIssueCategories: "Top Issue Categories"
            },
            // SLA Tracking
            sla: {
                title: "SLA Tracking",
                subtitle: "Monitor service level agreements and prevent breaches",
                withinSla: "Within SLA",
                onTrack: "On track",
                atRisk: "At Risk",
                hoursLeft: "< 12 hours left",
                lessThan12Hours: "< 12 hours left",
                breached: "Breached",
                needsAttention: "Needs attention",
                overallSlaRate: "Overall SLA Rate",
                aboveTarget: "Above target (90%)",
                belowTarget: "Below target (90%)",
                slaComplianceByDept: "SLA Compliance by Department",
                slaTrend: "SLA Trend (Last 30 Days)",
                atRiskAndBreached: "At Risk & Breached Complaints",
                atRiskBreachedComplaints: "At Risk & Breached Complaints",
                all: "All",
                filterAll: "All",
                atRiskOnly: "At Risk Only",
                filterAtRisk: "At Risk Only",
                breachedOnly: "Breached Only",
                filterBreached: "Breached Only",
                slaDeadline: "SLA Deadline",
                timeLeftOverdue: "Time Left/Overdue",
                escalate: "Escalate",
                noComplaintsAtRisk: "No complaints at risk! Great job staying on top of SLAs.",
                departmentSlaConfig: "Department SLA Configuration",
                defaultSlaHours: "Default SLA (Hours)",
                totalComplaints: "Total Complaints",
                complianceRate: "Compliance Rate",
                overdue: "overdue",
                left: "left"
            },
            // Common
            common: {
                loading: "Loading...",
                noData: "No data available",
                save: "Save",
                cancel: "Cancel",
                confirm: "Confirm",
                delete: "Delete",
                edit: "Edit",
                view: "View",
                adminUser: "Admin User",
                administrator: "Administrator",
                clear: "Clear",
                apply: "Apply",
                close: "Close"
            }
        }
    },
    kn: {
        nav: {
            brand: "ಬೃಹತ್ ಬೆಂಗಳೂರು ನಿಗಮಗಳು",
            home: "ಮುಖಪುಟ",
            corporations: "ನಿಗಮಗಳು",
            trackComplaint: "ದೂರು ಹುಡುಕಿ",
            admin: "ನಿರ್ವಾಹಕ"
        },
        corporations: {
            north: "ಬೆಂಗಳೂರು ಉತ್ತರ",
            south: "ಬೆಂಗಳೂರು ದಕ್ಷಿಣ",
            east: "ಬೆಂಗಳೂರು ಪೂರ್ವ",
            west: "ಬೆಂಗಳೂರು ಪಶ್ಚಿಮ",
            central: "ಬೆಂಗಳೂರು ಕೇಂದ್ರ"
        },
        hero: {
            title: "ಬೆಂಗಳೂರಿಗಾಗಿ ಬುದ್ಧಿವಂತ ನಾಗರಿಕ ಸಮಸ್ಯೆ ನಿರ್ವಹಣೆ",
            subtitle: "ಬೃಹತ್ ಬೆಂಗಳೂರಿನ 5 ನಗರ ನಿಗಮಗಳಲ್ಲಿ AI-ಚಾಲಿತ ಸಮಸ್ಯೆ ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು ಪರಿಹಾರ"
        },
        stats: {
            totalGrievances: "ವಿಶ್ಲೇಷಿಸಿದ ಒಟ್ಟು ದೂರುಗಳು",
            resolutionRate: "ಒಟ್ಟಾರೆ ಪರಿಹಾರ ದರ",
            wardsCovered: "ಒಳಗೊಂಡ ವಾರ್ಡ್‌ಗಳು",
            dataHistory: "ಡೇಟಾ ಇತಿಹಾಸ (2020-2025)"
        },
        insights: {
            title: "766,648 ದೂರುಗಳಿಂದ ಪ್ರಮುಖ ಒಳನೋಟಗಳು",
            subtitle: "BBMP ಡೇಟಾದ ವಿಶ್ಲೇಷಣೆ 2020-2025",
            topConcern: "ಅಗ್ರ ನಾಗರಿಕ ಕಾಳಜಿ",
            topConcernDesc: "ಬೀದಿ ದೀಪಗಳು ಅತಿ ಹೆಚ್ಚು ದೂರುಗಳನ್ನು ಹೊಂದಿವೆ (293,580 ದೂರುಗಳು)",
            topConcernTrend: "ವಿದ್ಯುತ್ ಮೂಲಸೌಕರ್ಯದಲ್ಲಿ ತ್ವರಿತ ಗೆಲುವುಗಳು ಲಭ್ಯವಿದೆ",
            performance: "ಕಾರ್ಯಕ್ಷಮತೆ ಸುಧಾರಣೆ",
            performanceDesc: "ಪರಿಹಾರ ದರ 87.6% (2020) ರಿಂದ 96.9% (2023) ಗೆ ಸುಧಾರಿಸಿದೆ",
            performanceTrend: "2022-2023 ರಲ್ಲಿ ಉತ್ತಮ ಕಾರ್ಯಕ್ಷಮತೆ",
            engagement: "ನಾಗರಿಕ ತೊಡಗಿಸಿಕೊಳ್ಳುವಿಕೆ",
            engagementDesc: "2024 ರಲ್ಲಿ 207K ದೂರುಗಳಿಗೆ ಭಾರೀ ಹೆಚ್ಚಳ",
            engagementTrend: "ದೂರು ವ್ಯವಸ್ಥೆಗಳ ಬಗ್ಗೆ ಹೆಚ್ಚಿನ ಅರಿವು"
        },
        focusAreas: {
            title: "ಅಗ್ರ 3 ಗಮನ ಕ್ಷೇತ್ರಗಳು",
            electrical: "ವಿದ್ಯುತ್ / ಬೀದಿ ದೀಪಗಳು",
            swm: "ಘನ ತ್ಯಾಜ್ಯ ನಿರ್ವಹಣೆ",
            roads: "ರಸ್ತೆ ನಿರ್ವಹಣೆ"
        },
        rankings: {
            title: "ನಿಗಮ ಕಾರ್ಯಕ್ಷಮತೆ ಶ್ರೇಯಾಂಕಗಳು",
            subtitle: "477,997 ಮ್ಯಾಪ್ ಮಾಡಿದ ದೂರುಗಳ ಆಧಾರದ ಮೇಲೆ (ಒಟ್ಟು ಡೇಟಾದ 62.3%)",
            rank: "ಶ್ರೇಯಾಂಕ",
            corporation: "ನಿಗಮ",
            totalGrievances: "ಒಟ್ಟು ದೂರುಗಳು",
            closed: "ಮುಚ್ಚಲಾಗಿದೆ",
            open: "ತೆರೆದಿದೆ",
            resolutionRate: "ಪರಿಹಾರ ದರ",
            topIssue: "ಅಗ್ರ ಸಮಸ್ಯೆ"
        },
        features: {
            title: "ವೇದಿಕೆ ವೈಶಿಷ್ಟ್ಯಗಳು",
            aiRouting: "AI-ಚಾಲಿತ ಸಮಸ್ಯೆ ಮಾರ್ಗನಿರ್ದೇಶನ",
            aiRoutingDesc: "ಸುಧಾರಿತ ML ಅಲ್ಗಾರಿದಮ್‌ಗಳು ಭೌಗೋಳಿಕತೆ ಮತ್ತು ಜವಾಬ್ದಾರಿ ಪ್ರದೇಶಗಳ ಆಧಾರದ ಮೇಲೆ ಸರಿಯಾದ ಎಂಜಿನಿಯರ್‌ಗಳಿಗೆ ಸಮಸ್ಯೆಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ನಿಯೋಜಿಸುತ್ತವೆ",
            dashboards: "ನೈಜ-ಸಮಯದ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗಳು",
            dashboardsDesc: "ಆಯುಕ್ತರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗಳು ಸಮಸ್ಯೆಯ ಸ್ಥಿತಿ, ಪ್ರವೃತ್ತಿಗಳು ಮತ್ತು ಕಾರ್ಯಕ್ಷಮತೆ ಮೆಟ್ರಿಕ್ಸ್‌ಗಳಲ್ಲಿ ತಕ್ಷಣದ ಗೋಚರತೆಯನ್ನು ಒದಗಿಸುತ್ತವೆ",
            multiChannel: "ಬಹು-ಚಾನಲ್ ಬೆಂಬಲ",
            multiChannelDesc: "ನಾಗರಿಕರು WhatsApp, Telegram, Email, ಅಥವಾ Web ಮೂಲಕ ಸಮಸ್ಯೆಗಳನ್ನು ವರದಿ ಮಾಡಬಹುದು - ಎಲ್ಲವೂ ಒಂದೇ ವ್ಯವಸ್ಥೆಯಲ್ಲಿ ಸಂಯೋಜಿತವಾಗಿದೆ",
            maps: "ಸಂವಾದಾತ್ಮಕ ನಕ್ಷೆಗಳು",
            mapsDesc: "ನಗರದಾದ್ಯಂತ ಸಮಸ್ಯಾ ಪ್ರದೇಶಗಳನ್ನು ತೋರಿಸುವ ಹೀಟ್ ಮ್ಯಾಪ್‌ಗಳೊಂದಿಗೆ ಎಲ್ಲಾ ಸಮಸ್ಯೆಗಳ ದೃಶ್ಯ ಭೌಗೋಳಿಕ ಟ್ರ್ಯಾಕಿಂಗ್",
            priority: "ಆದ್ಯತೆ ಮ್ಯಾಟ್ರಿಕ್ಸ್",
            priorityDesc: "ಸ್ಮಾರ್ಟ್ ಎಸ್ಕಲೇಶನ್ ಸಿಸ್ಟಮ್ ನಿರ್ಣಾಯಕ ಸಮಸ್ಯೆಗಳು ಸರಿಯಾದ ಏಜೆನ್ಸಿಗಳಿಂದ ತಕ್ಷಣದ ಗಮನವನ್ನು ಪಡೆಯುತ್ತವೆ ಎಂದು ಖಚಿತಪಡಿಸುತ್ತದೆ",
            analytics: "ಕಾರ್ಯಕ್ಷಮತೆ ವಿಶ್ಲೇಷಣೆ",
            analyticsDesc: "ಪರಿಹಾರ ಸಮಯ, SLA ಅನುಸರಣೆ, ಮತ್ತು ನಾಗರಿಕ ತೃಪ್ತಿ ಅಂಕಗಳು ಸೇರಿದಂತೆ KPI ಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ"
        },
        dashboard: {
            title: "ಕಾರ್ಯಕ್ಷಮತೆ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
            totalGrievances: "ಒಟ್ಟು ದೂರುಗಳು",
            closed: "ಮುಚ್ಚಲಾಗಿದೆ",
            open: "ತೆರೆದಿದೆ",
            resolutionRate: "ಪರಿಹಾರ ದರ"
        },
        corpHeader: {
            commissioner: "ನಗರ ನಿಗಮ ಆಯುಕ್ತರು",
            phone: "ಫೋನ್",
            controlRoom: "ನಿಯಂತ್ರಣ ಕೊಠಡಿ"
        },
        geographic: {
            title: "ಭೌಗೋಳಿಕ ವ್ಯಾಪ್ತಿ",
            subtitle: "ನಿಗಮದಾದ್ಯಂತ ವಾರ್ಡ್ ಗಡಿಗಳು ಮತ್ತು ಸಮಸ್ಯೆ ಸಾಂದ್ರತೆಯನ್ನು ತೋರಿಸುವ ಸಂವಾದಾತ್ಮಕ ನಕ್ಷೆ"
        },
        charts: {
            title: "ಕಾರ್ಯಕ್ಷಮತೆ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಪ್ರವೃತ್ತಿಗಳು",
            resolutionTrend: "ಪರಿಹಾರ ದರ ಪ್ರವೃತ್ತಿ (2020-2025)",
            yearlyVolume: "ವಾರ್ಷಿಕ ದೂರು ಪ್ರಮಾಣ",
            topCategories: "ಅಗ್ರ ಸಮಸ್ಯೆ ವರ್ಗಗಳು",
            closedVsOpen: "ಮುಚ್ಚಿದ vs ತೆರೆದ ದೂರುಗಳು",
            seasonal: "ಮಾಸಿಕ ವಿತರಣೆ (ಋತುಮಾನ ಮಾದರಿಗಳು)"
        },
        contact: {
            title: "ಸಂಪರ್ಕ ಮಾಹಿತಿ",
            subtitle: "ನಿಗಮ ಅಧಿಕಾರಿಗಳ ಅಧಿಕೃತ ಸಂಪರ್ಕ ವಿವರಗಳು"
        },
        complaint: {
            fileComplaint: "ದೂರು ಸಲ್ಲಿಸಿ",
            yourName: "ನಿಮ್ಮ ಹೆಸರು",
            phone: "ಫೋನ್ ಸಂಖ್ಯೆ",
            email: "ಇಮೇಲ್",
            emailPlaceholder: "ನವೀಕರಣಗಳಿಗಾಗಿ (ಐಚ್ಛಿಕ)",
            issueType: "ಸಮಸ್ಯೆ ಪ್ರಕಾರ",
            location: "ಸಮಸ್ಯೆಯ ಸ್ಥಳ",
            locationPlaceholder: "ಬೀದಿ ವಿಳಾಸ ಅಥವಾ ಪ್ರದೇಶ",
            landmark: "ಹೆಗ್ಗುರುತು",
            landmarkPlaceholder: "ಹತ್ತಿರದ ಹೆಗ್ಗುರುತು (ಐಚ್ಛಿಕ)",
            pinLocation: "ನಕ್ಷೆಯಲ್ಲಿ ಸ್ಥಳ ಗುರುತಿಸಿ",
            useMyLocation: "ನನ್ನ ಸ್ಥಳ ಬಳಸಿ",
            description: "ವಿವರಣೆ",
            descriptionPlaceholder: "ದಯವಿಟ್ಟು ಸಮಸ್ಯೆಯನ್ನು ವಿವರವಾಗಿ ವಿವರಿಸಿ",
            uploadPhoto: "ಫೋಟೋ ಅಪ್‌ಲೋಡ್ (ಐಚ್ಛಿಕ)",
            submit: "ದೂರು ಸಲ್ಲಿಸಿ"
        },
        track: {
            title: "ನಿಮ್ಮ ದೂರು ಹುಡುಕಿ",
            subtitle: "ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಲು ನಿಮ್ಮ ದೂರು ID ಅಥವಾ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ",
            searchLabel: "ದೂರು ID ಅಥವಾ ಫೋನ್ ಸಂಖ್ಯೆ",
            searchPlaceholder: "ದೂರು ID ನಮೂದಿಸಿ (ಉದಾ., GBA-NORTH-001) ಅಥವಾ ಫೋನ್ ಸಂಖ್ಯೆ",
            searchButton: "ಹುಡುಕಿ",
            recentTitle: "ಇತ್ತೀಚಿನ ದೂರುಗಳು",
            noResults: "ಯಾವುದೇ ದೂರುಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ದೂರು ID ಅಥವಾ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ಪರಿಶೀಲಿಸಿ."
        },
        footer: {
            about: "ಬೃಹತ್ ಬೆಂಗಳೂರು ಪ್ರಾಧಿಕಾರ",
            aboutDesc: "ಬೃಹತ್ ಬೆಂಗಳೂರಿನ ಐದು ನಿಗಮಗಳಿಗೆ ನಾಗರಿಕ ಕುಂದುಕೊರತೆ ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು ಪಾರದರ್ಶಕತೆ ವೇದಿಕೆ.",
            corporations: "ನಿಗಮಗಳು",
            features: "ವೈಶಿಷ್ಟ್ಯಗಳು",
            trackComplaint: "ದೂರು ಹುಡುಕಿ",
            dataInsights: "ಡೇಟಾ ಒಳನೋಟಗಳು",
            aboutPlatform: "ವೇದಿಕೆ ಬಗ್ಗೆ",
            dataResources: "ಡೇಟಾ ಮತ್ತು ಸಂಪನ್ಮೂಲಗಳು",
            bbmpData: "BBMP ದೂರುಗಳ ಡೇಟಾ",
            wardData: "GBA ವಾರ್ಡ್ ವಿಂಗಡಣೆ",
            github: "GitHub ರೆಪೊಸಿಟರಿ",
            copyright: "ಬೃಹತ್ ಬೆಂಗಳೂರು ನಿಗಮಗಳು. ಡೇಟಾ ಮೂಲ"
        },
        common: {
            loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
            required: "ಅಗತ್ಯ",
            optional: "ಐಚ್ಛಿಕ"
        },
        admin: {
            // Sidebar
            sidebar: {
                title: "GBA ನಿರ್ವಾಹಕ",
                switchCorporation: "ನಿಗಮ ಬದಲಾಯಿಸಿ",
                overview: "ಅವಲೋಕನ",
                dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
                allComplaints: "ಎಲ್ಲಾ ದೂರುಗಳು",
                management: "ನಿರ್ವಹಣೆ",
                assignments: "ನಿಯೋಜನೆಗಳು",
                slaTracking: "SLA ಟ್ರ್ಯಾಕಿಂಗ್",
                analytics: "ವಿಶ್ಲೇಷಣೆ",
                reports: "ವರದಿಗಳು",
                officerPerformance: "ಅಧಿಕಾರಿ ಕಾರ್ಯಕ್ಷಮತೆ",
                settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು"
            },
            // Header
            header: {
                home: "ಮುಖಪುಟ",
                search: "ದೂರುಗಳನ್ನು ಹುಡುಕಿ...",
                notifications: "ಅಧಿಸೂಚನೆಗಳು",
                logout: "ಲಾಗ್ಔಟ್"
            },
            // Login
            login: {
                title: "GBA ನಿರ್ವಾಹಕ ಪೋರ್ಟಲ್",
                subtitle: "ದೂರು ನಿರ್ವಹಣಾ ವ್ಯವಸ್ಥೆ",
                email: "ಇಮೇಲ್ ವಿಳಾಸ",
                emailPlaceholder: "admin@corporation.gov.in",
                password: "ಪಾಸ್‌ವರ್ಡ್",
                passwordPlaceholder: "ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ",
                rememberMe: "ನನ್ನನ್ನು ನೆನಪಿಟ್ಟುಕೊಳ್ಳಿ",
                forgotPassword: "ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರಾ?",
                signIn: "ಸೈನ್ ಇನ್",
                resetPassword: "ಪಾಸ್‌ವರ್ಡ್ ಮರುಹೊಂದಿಸಿ",
                resetInstructions: "ನಿಮ್ಮ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ ಮತ್ತು ನಾವು ನಿಮಗೆ ಪಾಸ್‌ವರ್ಡ್ ಮರುಹೊಂದಿಸಲು ಲಿಂಕ್ ಕಳುಹಿಸುತ್ತೇವೆ.",
                sendResetLink: "ಮರುಹೊಂದಿಸುವ ಲಿಂಕ್ ಕಳುಹಿಸಿ",
                footer: "ಬೃಹತ್ ಬೆಂಗಳೂರು ಪ್ರಾಧಿಕಾರ"
            },
            // Dashboard
            dashboard: {
                title: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
                subtitle: "ಸ್ವಾಗತ! ನಿಮ್ಮ ನಿಗಮದ ದೂರುಗಳ ಅವಲೋಕನ ಇಲ್ಲಿದೆ.",
                refresh: "ರಿಫ್ರೆಶ್",
                totalComplaints: "ಒಟ್ಟು ದೂರುಗಳು",
                pending: "ಬಾಕಿ",
                awaitingAction: "ಕ್ರಮಕ್ಕಾಗಿ ಕಾಯುತ್ತಿದೆ",
                inProgress: "ಪ್ರಗತಿಯಲ್ಲಿದೆ",
                beingWorkedOn: "ಕೆಲಸ ನಡೆಯುತ್ತಿದೆ",
                resolved: "ಪರಿಹರಿಸಲಾಗಿದೆ",
                thisMonth: "ಈ ತಿಂಗಳು",
                slaBreached: "SLA ಉಲ್ಲಂಘನೆ",
                needsAttention: "ಗಮನ ಅಗತ್ಯ",
                resolutionRate: "ಪರಿಹಾರ ದರ",
                overall: "ಒಟ್ಟಾರೆ",
                complaintsByStatus: "ಸ್ಥಿತಿಯ ಪ್ರಕಾರ ದೂರುಗಳು",
                complaintsByDepartment: "ಇಲಾಖೆಯ ಪ್ರಕಾರ ದೂರುಗಳು",
                recentComplaints: "ಇತ್ತೀಚಿನ ದೂರುಗಳು",
                viewAll: "ಎಲ್ಲವನ್ನೂ ವೀಕ್ಷಿಸಿ",
                complaintId: "ದೂರು ID",
                title_col: "ಶೀರ್ಷಿಕೆ",
                category: "ವರ್ಗ",
                status: "ಸ್ಥಿತಿ",
                priority: "ಆದ್ಯತೆ",
                sla: "SLA",
                created: "ರಚಿಸಲಾಗಿದೆ",
                actions: "ಕ್ರಿಯೆಗಳು"
            },
            // Complaints
            complaints: {
                title: "ಎಲ್ಲಾ ದೂರುಗಳು",
                subtitle: "ನಿಮ್ಮ ನಿಗಮದ ಎಲ್ಲಾ ದೂರುಗಳನ್ನು ನಿರ್ವಹಿಸಿ ಮತ್ತು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
                export: "ರಫ್ತು",
                search: "ಹುಡುಕಿ:",
                searchPlaceholder: "ID, ಶೀರ್ಷಿಕೆ, ಅಥವಾ ನಾಗರಿಕ ಹೆಸರು...",
                statusFilter: "ಸ್ಥಿತಿ:",
                allStatus: "ಎಲ್ಲಾ ಸ್ಥಿತಿ",
                new: "ಹೊಸ",
                assigned: "ನಿಯೋಜಿಸಲಾಗಿದೆ",
                inProgress: "ಪ್ರಗತಿಯಲ್ಲಿದೆ",
                resolved: "ಪರಿಹರಿಸಲಾಗಿದೆ",
                closed: "ಮುಚ್ಚಲಾಗಿದೆ",
                rejected: "ತಿರಸ್ಕರಿಸಲಾಗಿದೆ",
                statusNew: "ಹೊಸ",
                statusAssigned: "ನಿಯೋಜಿಸಲಾಗಿದೆ",
                statusInProgress: "ಪ್ರಗತಿಯಲ್ಲಿದೆ",
                statusResolved: "ಪರಿಹರಿಸಲಾಗಿದೆ",
                statusClosed: "ಮುಚ್ಚಲಾಗಿದೆ",
                statusRejected: "ತಿರಸ್ಕರಿಸಲಾಗಿದೆ",
                departmentFilter: "ಇಲಾಖೆ:",
                allDepartments: "ಎಲ್ಲಾ ಇಲಾಖೆಗಳು",
                priorityFilter: "ಆದ್ಯತೆ:",
                allPriorities: "ಎಲ್ಲಾ ಆದ್ಯತೆಗಳು",
                critical: "ನಿರ್ಣಾಯಕ",
                high: "ಹೆಚ್ಚು",
                medium: "ಮಧ್ಯಮ",
                low: "ಕಡಿಮೆ",
                priorityCritical: "ನಿರ್ಣಾಯಕ",
                priorityHigh: "ಹೆಚ್ಚು",
                priorityMedium: "ಮಧ್ಯಮ",
                priorityLow: "ಕಡಿಮೆ",
                dateFilter: "ದಿನಾಂಕ ವ್ಯಾಪ್ತಿ:",
                dateRange: "ದಿನಾಂಕ ವ್ಯಾಪ್ತಿ:",
                allTime: "ಎಲ್ಲಾ ಸಮಯ",
                today: "ಇಂದು",
                thisWeek: "ಈ ವಾರ",
                thisMonth: "ಈ ತಿಂಗಳು",
                thisQuarter: "ಈ ತ್ರೈಮಾಸಿಕ",
                clear: "ತೆರವುಗೊಳಿಸಿ",
                apply: "ಅನ್ವಯಿಸು",
                assignedTo: "ನಿಯೋಜಿಸಲಾಗಿದೆ",
                loadingComplaints: "ದೂರುಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
                showing: "ತೋರಿಸುತ್ತಿದೆ",
                of: "ಒಟ್ಟು",
                selected: "ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ",
                assignSelected: "ಆಯ್ಕೆಮಾಡಿದವುಗಳನ್ನು ನಿಯೋಜಿಸಿ",
                updateStatus: "ಸ್ಥಿತಿ ನವೀಕರಿಸಿ",
                clearSelection: "ಆಯ್ಕೆ ತೆರವುಗೊಳಿಸಿ",
                assignComplaint: "ದೂರು ನಿಯೋಜಿಸಿ",
                department: "ಇಲಾಖೆ",
                assignTo: "ಗೆ ನಿಯೋಜಿಸಿ",
                selectDepartment: "ಇಲಾಖೆ ಆಯ್ಕೆಮಾಡಿ",
                selectOfficer: "ಅಧಿಕಾರಿ ಆಯ್ಕೆಮಾಡಿ",
                notes: "ಟಿಪ್ಪಣಿಗಳು",
                notesPlaceholder: "ಅಧಿಕಾರಿಗೆ ಟಿಪ್ಪಣಿಗಳನ್ನು ಸೇರಿಸಿ...",
                aiSuggestion: "AI ಸಲಹೆ",
                applySuggestion: "ಸಲಹೆ ಅನ್ವಯಿಸಿ",
                cancel: "ರದ್ದುಮಾಡಿ",
                assign: "ನಿಯೋಜಿಸಿ",
                complaintDetails: "ದೂರು ವಿವರಗಳು",
                close: "ಮುಚ್ಚಿ",
                complaintId: "ದೂರು ID",
                titleCol: "ಶೀರ್ಷಿಕೆ",
                status: "ಸ್ಥಿತಿ",
                priority: "ಆದ್ಯತೆ",
                sla: "SLA",
                created: "ರಚಿಸಲಾಗಿದೆ",
                actions: "ಕ್ರಿಯೆಗಳು",
                departmentRequired: "ಇಲಾಖೆ *",
                assignToRequired: "ಗೆ ನಿಯೋಜಿಸಿ *"
            },
            // Officers
            officers: {
                title: "ಅಧಿಕಾರಿ ಕಾರ್ಯಕ್ಷಮತೆ",
                subtitle: "ವೈಯಕ್ತಿಕ ಅಧಿಕಾರಿ ಕಾರ್ಯಕ್ಷಮತೆ ಮೆಟ್ರಿಕ್ಸ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ ಮತ್ತು ವಿಶ್ಲೇಷಿಸಿ",
                last7Days: "ಕಳೆದ 7 ದಿನಗಳು",
                last30Days: "ಕಳೆದ 30 ದಿನಗಳು",
                last90Days: "ಕಳೆದ 90 ದಿನಗಳು",
                activeOfficers: "ಸಕ್ರಿಯ ಅಧಿಕಾರಿಗಳು",
                totalResolved: "ಒಟ್ಟು ಪರಿಹರಿಸಲಾಗಿದೆ",
                avgResolutionTime: "ಸರಾಸರಿ ಪರಿಹಾರ ಸಮಯ",
                avgSlaCompliance: "ಸರಾಸರಿ SLA ಅನುಸರಣೆ",
                topPerformers: "ಅಗ್ರ ಕಾರ್ಯನಿರ್ವಾಹಕರು",
                workloadDistribution: "ಕೆಲಸದ ಹೊರೆ ವಿತರಣೆ",
                performanceDetails: "ಅಧಿಕಾರಿ ಕಾರ್ಯಕ್ಷಮತೆ ವಿವರಗಳು",
                sortBy: "ವಿಂಗಡಿಸಿ:",
                mostResolved: "ಹೆಚ್ಚು ಪರಿಹರಿಸಿದ",
                leastResolved: "ಕಡಿಮೆ ಪರಿಹರಿಸಿದ",
                fastestResolution: "ವೇಗದ ಪರಿಹಾರ",
                slowestResolution: "ನಿಧಾನ ಪರಿಹಾರ",
                bestSlaCompliance: "ಉತ್ತಮ SLA ಅನುಸರಣೆ",
                worstSlaCompliance: "ಕಳಪೆ SLA ಅನುಸರಣೆ",
                rank: "ಶ್ರೇಯಾಂಕ",
                officer: "ಅಧಿಕಾರಿ",
                role: "ಪಾತ್ರ",
                assigned: "ನಿಯೋಜಿಸಲಾಗಿದೆ",
                pendingCol: "ಬಾಕಿ",
                resolutionRateCol: "ಪರಿಹಾರ ದರ",
                avgTime: "ಸರಾಸರಿ ಸಮಯ (ಗಂ)",
                slaCompliance: "SLA ಅನುಸರಣೆ"
            },
            // Assignments
            assignments: {
                title: "ನಿಯೋಜನೆ ನಿರ್ವಹಣೆ",
                subtitle: "ಅಧಿಕಾರಿಗಳಿಗೆ ದೂರು ಮಾರ್ಗನಿರ್ದೇಶನವನ್ನು ಸ್ವಯಂ-ನಿಯೋಜಿಸಿ ಮತ್ತು ನಿರ್ವಹಿಸಿ",
                autoAssignUnassigned: "ನಿಯೋಜಿಸದವುಗಳನ್ನು ಸ್ವಯಂ-ನಿಯೋಜಿಸಿ",
                mlAutoAssignSettings: "ML ಸ್ವಯಂ-ನಿಯೋಜನೆ ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
                autoAssignEnabled: "ಸ್ವಯಂ-ನಿಯೋಜನೆ ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ",
                categoryBasedRouting: "ವರ್ಗ-ಆಧಾರಿತ ಮಾರ್ಗನಿರ್ದೇಶನ",
                categoryRoutingDesc: "ಸಮಸ್ಯೆ ವರ್ಗದ ಆಧಾರದ ಮೇಲೆ ಇಲಾಖೆಗಳಿಗೆ ದೂರುಗಳನ್ನು ಮಾರ್ಗನಿರ್ದೇಶಿಸಿ",
                automatic: "ಸ್ವಯಂಚಾಲಿತ (ML-ಆಧಾರಿತ)",
                ruleBased: "ನಿಯಮ-ಆಧಾರಿತ",
                manualOnly: "ಹಸ್ತಚಾಲಿತ ಮಾತ್ರ",
                zoneBasedAssignment: "ವಲಯ-ಆಧಾರಿತ ನಿಯೋಜನೆ",
                zoneAssignmentDesc: "ಭೌಗೋಳಿಕ ವಲಯ/ವಾರ್ಡ್‌ಗಳ ಆಧಾರದ ಮೇಲೆ ಅಧಿಕಾರಿಗಳಿಗೆ ನಿಯೋಜಿಸಿ",
                enabled: "ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ",
                disabled: "ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ",
                loadBalancing: "ಲೋಡ್ ಬ್ಯಾಲೆನ್ಸಿಂಗ್",
                loadBalancingDesc: "ಲಭ್ಯವಿರುವ ಅಧಿಕಾರಿಗಳ ನಡುವೆ ದೂರುಗಳನ್ನು ಸಮಾನವಾಗಿ ವಿತರಿಸಿ",
                byWorkload: "ಪ್ರಸ್ತುತ ಕೆಲಸದ ಹೊರೆಯಿಂದ",
                roundRobin: "ರೌಂಡ್ ರಾಬಿನ್",
                byPerformance: "ಕಾರ್ಯಕ್ಷಮತೆ ಸ್ಕೋರ್‌ನಿಂದ",
                priorityEscalation: "ಆದ್ಯತೆ ಎಸ್ಕಲೇಶನ್",
                escalationDesc: "ಹೆಚ್ಚಿನ ಆದ್ಯತೆಯ ದೂರುಗಳನ್ನು ಸ್ವಯಂ-ಎಸ್ಕಲೇಟ್ ಮಾಡಿ",
                categoryToDepartment: "ವರ್ಗದಿಂದ ಇಲಾಖೆ ಮ್ಯಾಪಿಂಗ್",
                saveMappings: "ಮ್ಯಾಪಿಂಗ್‌ಗಳನ್ನು ಉಳಿಸಿ",
                issueCategory: "ಸಮಸ್ಯೆ ವರ್ಗ",
                primaryDepartment: "ಪ್ರಾಥಮಿಕ ಇಲಾಖೆ",
                secondaryDepartment: "ದ್ವಿತೀಯ ಇಲಾಖೆ",
                defaultPriority: "ಡೀಫಾಲ್ಟ್ ಆದ್ಯತೆ",
                slaHours: "SLA (ಗಂಟೆಗಳು)",
                unassignedComplaints: "ನಿಯೋಜಿಸದ ದೂರುಗಳು",
                assignSelectedBtn: "ಆಯ್ಕೆಮಾಡಿದವುಗಳನ್ನು ನಿಯೋಜಿಸಿ",
                id: "ID",
                locationWard: "ಸ್ಥಳ/ವಾರ್ಡ್",
                description: "ವಿವರಣೆ",
                submitted: "ಸಲ್ಲಿಸಲಾಗಿದೆ",
                mlSuggestion: "ML ಸಲಹೆ",
                noUnassigned: "ನಿಯೋಜಿಸದ ದೂರುಗಳಿಲ್ಲ",
                recentAssignments: "ಇತ್ತೀಚಿನ ನಿಯೋಜನೆಗಳು",
                assignedBy: "ನಿಯೋಜಿಸಿದವರು",
                method: "ವಿಧಾನ",
                assignedAt: "ನಿಯೋಜಿಸಿದ ಸಮಯ",
                aiRecommendation: "AI ಶಿಫಾರಸು",
                autoAssignInProgress: "ಸ್ವಯಂ-ನಿಯೋಜನೆ ಪ್ರಗತಿಯಲ್ಲಿದೆ",
                analyzingComplaints: "ದೂರುಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
                processed: "ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗಿದೆ"
            },
            // Analytics
            analytics: {
                title: "ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ವರದಿಗಳು",
                subtitle: "ನಿಮ್ಮ ನಿಗಮದ ದೂರು ನಿರ್ವಹಣೆಗೆ ಸಮಗ್ರ ವಿಶ್ಲೇಷಣೆ",
                lastYear: "ಕಳೆದ ವರ್ಷ",
                exportReport: "ವರದಿ ರಫ್ತು",
                totalReceived: "ಒಟ್ಟು ಸ್ವೀಕರಿಸಲಾಗಿದೆ",
                avgResolutionTime: "ಸರಾಸರಿ ಪರಿಹಾರ ಸಮಯ",
                inHours: "ಗಂಟೆಗಳಲ್ಲಿ",
                slaCompliance: "SLA ಅನುಸರಣೆ",
                target: "ಗುರಿ: 90%",
                complaintsTrend: "ದೂರುಗಳ ಪ್ರವೃತ್ತಿ",
                resolutionRateTrend: "ಪರಿಹಾರ ದರ ಪ್ರವೃತ್ತಿ",
                complaintsByDepartment: "ಇಲಾಖೆಯ ಪ್ರಕಾರ ದೂರುಗಳು",
                priorityDistribution: "ಆದ್ಯತೆ ವಿತರಣೆ",
                departmentPerformance: "ಇಲಾಖೆ ಕಾರ್ಯಕ್ಷಮತೆ",
                total: "ಒಟ್ಟು",
                pending: "ಬಾಕಿ",
                avgTimeHrs: "ಸರಾಸರಿ ಸಮಯ (ಗಂ)",
                topIssueCategories: "ಅಗ್ರ ಸಮಸ್ಯೆ ವರ್ಗಗಳು"
            },
            // SLA Tracking
            sla: {
                title: "SLA ಟ್ರ್ಯಾಕಿಂಗ್",
                subtitle: "ಸೇವಾ ಮಟ್ಟದ ಒಪ್ಪಂದಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ ಮತ್ತು ಉಲ್ಲಂಘನೆಗಳನ್ನು ತಡೆಯಿರಿ",
                withinSla: "SLA ಒಳಗೆ",
                onTrack: "ಸರಿಯಾದ ಹಾದಿಯಲ್ಲಿ",
                atRisk: "ಅಪಾಯದಲ್ಲಿ",
                hoursLeft: "< 12 ಗಂಟೆಗಳು ಬಾಕಿ",
                lessThan12Hours: "< 12 ಗಂಟೆಗಳು ಬಾಕಿ",
                breached: "ಉಲ್ಲಂಘಿಸಲಾಗಿದೆ",
                needsAttention: "ಗಮನ ಬೇಕು",
                overallSlaRate: "ಒಟ್ಟಾರೆ SLA ದರ",
                aboveTarget: "ಗುರಿಗಿಂತ ಮೇಲೆ (90%)",
                belowTarget: "ಗುರಿಗಿಂತ ಕೆಳಗೆ (90%)",
                slaComplianceByDept: "ಇಲಾಖೆಯ ಪ್ರಕಾರ SLA ಅನುಸರಣೆ",
                slaTrend: "SLA ಪ್ರವೃತ್ತಿ (ಕಳೆದ 30 ದಿನಗಳು)",
                atRiskAndBreached: "ಅಪಾಯದಲ್ಲಿರುವ ಮತ್ತು ಉಲ್ಲಂಘಿಸಿದ ದೂರುಗಳು",
                atRiskBreachedComplaints: "ಅಪಾಯದಲ್ಲಿರುವ ಮತ್ತು ಉಲ್ಲಂಘಿಸಿದ ದೂರುಗಳು",
                all: "ಎಲ್ಲಾ",
                filterAll: "ಎಲ್ಲಾ",
                atRiskOnly: "ಅಪಾಯದಲ್ಲಿರುವವು ಮಾತ್ರ",
                filterAtRisk: "ಅಪಾಯದಲ್ಲಿರುವವು ಮಾತ್ರ",
                breachedOnly: "ಉಲ್ಲಂಘಿಸಿದವು ಮಾತ್ರ",
                filterBreached: "ಉಲ್ಲಂಘಿಸಿದವು ಮಾತ್ರ",
                slaDeadline: "SLA ಗಡುವು",
                timeLeftOverdue: "ಬಾಕಿ ಸಮಯ/ಮಿತಿಮೀರಿದೆ",
                escalate: "ಎಸ್ಕಲೇಟ್",
                noComplaintsAtRisk: "ಅಪಾಯದಲ್ಲಿ ಯಾವುದೇ ದೂರುಗಳಿಲ್ಲ! SLA ಗಳನ್ನು ಅನುಸರಿಸಿದ್ದಕ್ಕಾಗಿ ಅಭಿನಂದನೆಗಳು.",
                departmentSlaConfig: "ಇಲಾಖೆ SLA ಸಂರಚನೆ",
                defaultSlaHours: "ಡೀಫಾಲ್ಟ್ SLA (ಗಂಟೆಗಳು)",
                totalComplaints: "ಒಟ್ಟು ದೂರುಗಳು",
                complianceRate: "ಅನುಸರಣೆ ದರ",
                overdue: "ಮಿತಿಮೀರಿದೆ",
                left: "ಬಾಕಿ"
            },
            // Common
            common: {
                loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
                noData: "ಯಾವುದೇ ಡೇಟಾ ಲಭ್ಯವಿಲ್ಲ",
                save: "ಉಳಿಸಿ",
                cancel: "ರದ್ದುಮಾಡಿ",
                confirm: "ದೃಢೀಕರಿಸಿ",
                delete: "ಅಳಿಸಿ",
                edit: "ಸಂಪಾದಿಸಿ",
                view: "ವೀಕ್ಷಿಸಿ",
                adminUser: "ನಿರ್ವಾಹಕ ಬಳಕೆದಾರ",
                administrator: "ನಿರ್ವಾಹಕ",
                clear: "ತೆರವುಗೊಳಿಸಿ",
                apply: "ಅನ್ವಯಿಸು",
                close: "ಮುಚ್ಚಿ"
            }
        }
    }
};

// Current language state
let currentLanguage = 'en';

/**
 * Get stored language preference or detect from browser
 */
function getCurrentLanguage() {
    const stored = localStorage.getItem('gba-language');
    if (stored && (stored === 'en' || stored === 'kn')) {
        return stored;
    }

    // Check browser language preference
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang && browserLang.startsWith('kn')) {
        return 'kn';
    }

    return 'en';
}

/**
 * Get a translation by dot-notation key
 */
function t(key) {
    const keys = key.split('.');
    let value = translations[currentLanguage];

    for (const k of keys) {
        if (value && value[k] !== undefined) {
            value = value[k];
        } else {
            // Fallback to English
            value = translations.en;
            for (const fallbackKey of keys) {
                if (value && value[fallbackKey] !== undefined) {
                    value = value[fallbackKey];
                } else {
                    return key; // Return key if no translation found
                }
            }
            break;
        }
    }

    return typeof value === 'string' ? value : key;
}

/**
 * Set language and update all translated elements
 */
function setLanguage(lang) {
    if (lang !== 'en' && lang !== 'kn') return;

    currentLanguage = lang;
    localStorage.setItem('gba-language', lang);

    // Update HTML lang attribute
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);

    // Translate all elements with data-i18n attribute
    translatePage();

    // Update toggle button state
    updateToggleState();
}

/**
 * Toggle between English and Kannada
 */
function toggleLanguage() {
    setLanguage(currentLanguage === 'en' ? 'kn' : 'en');
}

/**
 * Translate all elements with data-i18n attribute
 */
function translatePage() {
    // Translate text content
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = t(key);

        // Handle different element types
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            if (element.hasAttribute('placeholder')) {
                element.placeholder = translation;
            }
        } else {
            element.textContent = translation;
        }
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = t(key);
    });

    // Translate titles/tooltips
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        element.title = t(key);
    });
}

/**
 * Update toggle button visual state
 */
function updateToggleState() {
    const toggleBtn = document.querySelector('.lang-toggle');
    if (toggleBtn) {
        const enSpan = toggleBtn.querySelector('.lang-en');
        const knSpan = toggleBtn.querySelector('.lang-kn');

        if (enSpan && knSpan) {
            if (currentLanguage === 'en') {
                enSpan.classList.add('active');
                knSpan.classList.remove('active');
            } else {
                knSpan.classList.add('active');
                enSpan.classList.remove('active');
            }
        }
    }
}

/**
 * Initialize i18n system
 */
function initI18n() {
    currentLanguage = getCurrentLanguage();
    document.documentElement.setAttribute('data-lang', currentLanguage);
    translatePage();
    updateToggleState();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
} else {
    initI18n();
}

// Export for use in other scripts
window.i18n = {
    t,
    setLanguage,
    toggleLanguage,
    getCurrentLanguage: () => currentLanguage
};
