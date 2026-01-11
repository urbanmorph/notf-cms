// Mock data for Bengaluru City Corporations
// Based on BBMP data analysis from opencity.in

const corporationsData = {
    north: {
        name: "Bengaluru North City Corporation",
        color: "#23A2A5", // Teal
        commissioner: {
            name: "Dr. Nandini Kumar",
            initials: "NK",
            phone: "+91-98451-23001",
            whatsapp: "919845123001",
            telegram: "@BengaluruNorthBot",
            email: "commissioner.north@gba.gov.in",
            photo: null
        },
        stats: {
            totalIssues: 26234,
            openIssues: 3892,
            closedIssues: 22342,
            resolutionRate: 85.2,
            avgResponseTime: "18 hours",
            slaCompliance: 88.5,
            citizenScore: 4.2
        },
        issueCategories: {
            electrical: { total: 8702, resolved: 8385, rate: 96.4 },
            waste: { total: 7894, resolved: 6718, rate: 85.1 },
            roads: { total: 4567, resolved: 2649, rate: 58.0 },
            water: { total: 3456, resolved: 3145, rate: 91.0 },
            other: { total: 1615, resolved: 1445, rate: 89.5 }
        }
    },
    south: {
        name: "Bengaluru South City Corporation",
        color: "#0D7576", // Green
        commissioner: {
            name: "Mr. Rajesh Patel",
            initials: "RP",
            phone: "+91-98451-23002",
            whatsapp: "919845123002",
            telegram: "@BengaluruSouthBot",
            email: "commissioner.south@gba.gov.in",
            photo: null
        },
        stats: {
            totalIssues: 28567,
            openIssues: 3214,
            closedIssues: 25353,
            resolutionRate: 88.8,
            avgResponseTime: "14 hours",
            slaCompliance: 92.3,
            citizenScore: 4.5
        },
        issueCategories: {
            electrical: { total: 9487, resolved: 9145, rate: 96.4 },
            waste: { total: 8571, resolved: 7294, rate: 85.1 },
            roads: { total: 5123, resolved: 2971, rate: 58.0 },
            water: { total: 3845, resolved: 3499, rate: 91.0 },
            other: { total: 1541, resolved: 1444, rate: 93.7 }
        }
    },
    east: {
        name: "Bengaluru East City Corporation",
        color: "#FBC831", // Yellow
        commissioner: {
            name: "Ms. Priya Sharma",
            initials: "PS",
            phone: "+91-98451-23003",
            whatsapp: "919845123003",
            telegram: "@BengaluruEastBot",
            email: "commissioner.east@gba.gov.in",
            photo: null
        },
        stats: {
            totalIssues: 24891,
            openIssues: 4234,
            closedIssues: 20657,
            resolutionRate: 82.9,
            avgResponseTime: "22 hours",
            slaCompliance: 84.7,
            citizenScore: 4.0
        },
        issueCategories: {
            electrical: { total: 8145, resolved: 7851, rate: 96.4 },
            waste: { total: 7523, resolved: 6400, rate: 85.1 },
            roads: { total: 4789, resolved: 2777, rate: 58.0 },
            water: { total: 3034, resolved: 2761, rate: 91.0 },
            other: { total: 1400, resolved: 868, rate: 62.0 }
        }
    },
    west: {
        name: "Bengaluru West City Corporation",
        color: "#F7A782", // Pink
        commissioner: {
            name: "Dr. Arvind Menon",
            initials: "AM",
            phone: "+91-98451-23004",
            whatsapp: "919845123004",
            telegram: "@BengaluruWestBot",
            email: "commissioner.west@gba.gov.in",
            photo: null
        },
        stats: {
            totalIssues: 25678,
            openIssues: 3567,
            closedIssues: 22111,
            resolutionRate: 86.1,
            avgResponseTime: "16 hours",
            slaCompliance: 89.2,
            citizenScore: 4.3
        },
        issueCategories: {
            electrical: { total: 8523, resolved: 8216, rate: 96.4 },
            waste: { total: 7745, resolved: 6590, rate: 85.1 },
            roads: { total: 4901, resolved: 2842, rate: 58.0 },
            water: { total: 3209, resolved: 2920, rate: 91.0 },
            other: { total: 1300, resolved: 1543, rate: 118.7 }
        }
    },
    central: {
        name: "Bengaluru Central City Corporation",
        color: "#4f46e5", // Blue (default)
        commissioner: {
            name: "Ms. Lakshmi Venkatesh",
            initials: "LV",
            phone: "+91-98451-23005",
            whatsapp: "919845123005",
            telegram: "@BengaluruCentralBot",
            email: "commissioner.central@gba.gov.in",
            photo: null
        },
        stats: {
            totalIssues: 21604,
            openIssues: 3827,
            closedIssues: 17777,
            resolutionRate: 82.3,
            avgResponseTime: "20 hours",
            slaCompliance: 83.6,
            citizenScore: 3.9
        },
        issueCategories: {
            electrical: { total: 7217, resolved: 6957, rate: 96.4 },
            waste: { total: 6512, resolved: 5540, rate: 85.1 },
            roads: { total: 4134, resolved: 2398, rate: 58.0 },
            water: { total: 2687, resolved: 2445, rate: 91.0 },
            other: { total: 1054, resolved: 437, rate: 41.5 }
        }
    }
};

// Calculate overall score for rankings
function calculateScore(corp) {
    const weights = {
        resolutionRate: 0.35,
        slaCompliance: 0.25,
        citizenScore: 0.25,
        responseTime: 0.15
    };
    
    // Convert response time to score (lower is better)
    const responseTimeHours = parseInt(corp.stats.avgResponseTime);
    const responseTimeScore = Math.max(0, 100 - (responseTimeHours * 3));
    
    // Normalize citizen score to 100
    const citizenScoreNormalized = (corp.stats.citizenScore / 5) * 100;
    
    return (
        corp.stats.resolutionRate * weights.resolutionRate +
        corp.stats.slaCompliance * weights.slaCompliance +
        citizenScoreNormalized * weights.citizenScore +
        responseTimeScore * weights.responseTime
    ).toFixed(1);
}
