-- =====================================================
-- SAMPLE COMPLAINTS SEED DATA
-- Run this after seed-categories.sql
-- =====================================================

-- Get corporation IDs (adjust if needed)
-- SELECT id, code, name FROM corporations;

-- Insert sample complaints for South Corporation
INSERT INTO complaints (
    complaint_number, title, description, status, priority,
    citizen_name, citizen_phone, citizen_email,
    address, landmark, latitude, longitude,
    corporation_id, category_id, ml_category_id,
    created_at
) VALUES
-- Water complaints
(
    'CMP-2025-0001',
    'No water supply for 3 days',
    'Our area has not received water supply for the past 3 days. Multiple houses affected in the locality.',
    'new', 'high',
    'Ramesh Kumar', '9876543210', 'ramesh@example.com',
    '45, 2nd Cross, JP Nagar 5th Phase', 'Near BDA Complex', 12.9082, 77.5851,
    (SELECT id FROM corporations WHERE code = 'south'),
    (SELECT id FROM issue_categories WHERE code = 'water_supply'),
    (SELECT id FROM issue_categories WHERE code = 'water_supply'),
    NOW() - INTERVAL '2 hours'
),
(
    'CMP-2025-0002',
    'Water pipe leaking on main road',
    'Major water pipe leak causing water wastage and road damage. Needs immediate attention.',
    'new', 'high',
    'Lakshmi Devi', '9876543211', 'lakshmi@example.com',
    '123, 5th Main Road, Jayanagar 4th Block', 'Opposite SBI Bank', 12.9279, 77.5831,
    (SELECT id FROM corporations WHERE code = 'south'),
    (SELECT id FROM issue_categories WHERE code = 'pipe_leak'),
    (SELECT id FROM issue_categories WHERE code = 'pipe_leak'),
    NOW() - INTERVAL '5 hours'
),

-- Road complaints
(
    'CMP-2025-0003',
    'Large pothole causing accidents',
    'There is a large pothole on the main road that has caused multiple bike accidents. Very dangerous.',
    'new', 'critical',
    'Suresh Babu', '9876543212', 'suresh@example.com',
    'BTM Layout 2nd Stage, 16th Main', 'Near Forum Mall', 12.9165, 77.6101,
    (SELECT id FROM corporations WHERE code = 'south'),
    (SELECT id FROM issue_categories WHERE code = 'road_conditions'),
    (SELECT id FROM issue_categories WHERE code = 'road_conditions'),
    NOW() - INTERVAL '1 day'
),
(
    'CMP-2025-0004',
    'Street light not working',
    'The street light near our house has not been working for a week. Very dark and unsafe at night.',
    'new', 'medium',
    'Priya Sharma', '9876543213', 'priya@example.com',
    '78, 3rd Cross, Bannerghatta Road', 'Near Meenakshi Temple', 12.8912, 77.5969,
    (SELECT id FROM corporations WHERE code = 'south'),
    (SELECT id FROM issue_categories WHERE code = 'street_lights'),
    (SELECT id FROM issue_categories WHERE code = 'street_lights'),
    NOW() - INTERVAL '3 days'
),

-- Drainage complaints
(
    'CMP-2025-0005',
    'Drain overflow during rain',
    'The drain near our street overflows every time it rains, causing flooding in nearby houses.',
    'new', 'high',
    'Mohammed Rafi', '9876543214', 'rafi@example.com',
    '56, 1st Main, Koramangala 4th Block', 'Near Sony Signal', 12.9352, 77.6245,
    (SELECT id FROM corporations WHERE code = 'south'),
    (SELECT id FROM issue_categories WHERE code = 'drain_overflow'),
    (SELECT id FROM issue_categories WHERE code = 'flooding'),
    NOW() - INTERVAL '12 hours'
),

-- Power supply complaints
(
    'CMP-2025-0006',
    'Frequent power cuts in area',
    'We are experiencing power cuts 4-5 times daily for the past week. Affecting work from home.',
    'assigned', 'high',
    'Anitha Reddy', '9876543215', 'anitha@example.com',
    '234, 7th Cross, HSR Layout Sector 2', 'Behind BDA Park', 12.9116, 77.6389,
    (SELECT id FROM corporations WHERE code = 'south'),
    (SELECT id FROM issue_categories WHERE code = 'power_cut'),
    (SELECT id FROM issue_categories WHERE code = 'power_cut'),
    NOW() - INTERVAL '2 days'
),
(
    'CMP-2025-0007',
    'Dangling electrical wire',
    'There is a dangling electrical wire from the pole that is very dangerous. Could cause electrocution.',
    'new', 'critical',
    'Venkatesh Murthy', '9876543216', 'venkatesh@example.com',
    '89, 4th Main, Bommanahalli', 'Near Bus Stop', 12.9012, 77.6180,
    (SELECT id FROM corporations WHERE code = 'south'),
    (SELECT id FROM issue_categories WHERE code = 'dangling_wire'),
    (SELECT id FROM issue_categories WHERE code = 'dangling_wire'),
    NOW() - INTERVAL '6 hours'
),

-- Civic issues
(
    'CMP-2025-0008',
    'Stray dogs menace',
    'Pack of stray dogs in our area attacking pedestrians. Children are scared to go to school.',
    'in_progress', 'high',
    'Kavitha Rao', '9876543217', 'kavitha@example.com',
    '12, 2nd Cross, Madiwala', 'Near Shoppers Stop', 12.9221, 77.6165,
    (SELECT id FROM corporations WHERE code = 'south'),
    (SELECT id FROM issue_categories WHERE code = 'stray_animals'),
    (SELECT id FROM issue_categories WHERE code = 'stray_animals'),
    NOW() - INTERVAL '4 days'
),

-- Environment
(
    'CMP-2025-0009',
    'Illegal tree cutting',
    'Someone is cutting trees illegally in the park area. Need immediate action to stop this.',
    'new', 'medium',
    'Rajesh Hegde', '9876543218', 'rajesh@example.com',
    'Lalbagh West Gate Area', 'Near Lalbagh Main Gate', 12.9507, 77.5848,
    (SELECT id FROM corporations WHERE code = 'south'),
    (SELECT id FROM issue_categories WHERE code = 'trees_vegetation'),
    (SELECT id FROM issue_categories WHERE code = 'trees_vegetation'),
    NOW() - INTERVAL '1 day'
),

-- Buildings
(
    'CMP-2025-0010',
    'Illegal construction blocking road',
    'New construction is encroaching on the public road, blocking traffic flow.',
    'new', 'medium',
    'Shivakumar', '9876543219', 'shiva@example.com',
    '45, 6th Cross, Wilson Garden', 'Near Nimhans', 12.9423, 77.5932,
    (SELECT id FROM corporations WHERE code = 'south'),
    (SELECT id FROM issue_categories WHERE code = 'encroachment'),
    (SELECT id FROM issue_categories WHERE code = 'illegal_construction'),
    NOW() - INTERVAL '5 days'
);

-- Add a few more for North Corporation
INSERT INTO complaints (
    complaint_number, title, description, status, priority,
    citizen_name, citizen_phone, citizen_email,
    address, landmark, latitude, longitude,
    corporation_id, category_id,
    created_at
) VALUES
(
    'CMP-2025-0011',
    'Garbage not collected for a week',
    'The garbage collection truck has not come to our area for over a week. Garbage piling up.',
    'new', 'high',
    'Deepak Jain', '9876543220', 'deepak@example.com',
    '67, 3rd Main, Malleshwaram', 'Near Mantri Mall', 13.0067, 77.5713,
    (SELECT id FROM corporations WHERE code = 'north'),
    (SELECT id FROM issue_categories WHERE code = 'civic_issues'),
    NOW() - INTERVAL '8 hours'
),
(
    'CMP-2025-0012',
    'Traffic signal not working',
    'The traffic signal at the main junction has been non-functional for 2 days.',
    'new', 'critical',
    'Prashanth Kumar', '9876543221', 'prashanth@example.com',
    'Yeshwanthpur Circle', 'Near Metro Station', 13.0281, 77.5418,
    (SELECT id FROM corporations WHERE code = 'north'),
    (SELECT id FROM issue_categories WHERE code = 'traffic_signals'),
    NOW() - INTERVAL '1 day'
),
(
    'CMP-2025-0013',
    'Park in bad condition',
    'The childrens park has broken swings and benches. Needs maintenance.',
    'new', 'low',
    'Meena Kumari', '9876543222', 'meena@example.com',
    'Sanjaynagar Main Road', 'Near BSNL Office', 13.0356, 77.5739,
    (SELECT id FROM corporations WHERE code = 'north'),
    (SELECT id FROM issue_categories WHERE code = 'parks'),
    NOW() - INTERVAL '3 days'
);

-- Verify the inserts
SELECT
    complaint_number,
    title,
    status,
    priority,
    (SELECT name FROM corporations WHERE id = corporation_id) as corporation,
    (SELECT name FROM issue_categories WHERE id = category_id) as category
FROM complaints
ORDER BY created_at DESC;
