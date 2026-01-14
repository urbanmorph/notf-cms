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
