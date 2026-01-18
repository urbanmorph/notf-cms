-- =====================================================
-- FIX REMAINING 69 CATEGORIES WITHOUT KEYWORDS
-- Adds keywords to all remaining categories from seed data
-- =====================================================

-- ROADS & TRAFFIC (22 categories)
UPDATE issue_categories SET keywords = ARRAY['road condition', 'road quality', 'road issue', 'bad road', 'road problem'] WHERE code = 'road_conditions';
UPDATE issue_categories SET keywords = ARRAY['traffic management', 'traffic control', 'traffic flow', 'traffic issue'] WHERE code = 'traffic_management';
UPDATE issue_categories SET keywords = ARRAY['traffic signal', 'traffic light', 'signal', 'traffic lights general'] WHERE code = 'traffic_signals';
UPDATE issue_categories SET keywords = ARRAY['footpath', 'pavement', 'sidewalk', 'walking path', 'pedestrian path'] WHERE code = 'footpaths';
UPDATE issue_categories SET keywords = ARRAY['road resurfacing', 'road repair', 'resurface', 'road relaying', 'tar road'] WHERE code = 'road_resurfacing';
UPDATE issue_categories SET keywords = ARRAY['signage', 'road sign', 'signboard', 'sign', 'road signage'] WHERE code = 'signage';
UPDATE issue_categories SET keywords = ARRAY['uneven road', 'bumpy road', 'rough road', 'uneven surface', 'bad road'] WHERE code = 'uneven_road';
UPDATE issue_categories SET keywords = ARRAY['street light', 'street lights', 'street lighting', 'road light', 'lamp'] WHERE code = 'street_lights';
UPDATE issue_categories SET keywords = ARRAY['signal not working', 'signal broken', 'traffic light not working', 'signal off', 'signal issue'] WHERE code = 'signal_not_working';
UPDATE issue_categories SET keywords = ARRAY['signal timing', 'signal delay', 'timing issue', 'signal time wrong', 'traffic light timing'] WHERE code = 'signal_timing';
UPDATE issue_categories SET keywords = ARRAY['traffic congestion', 'traffic jam', 'heavy traffic', 'traffic block', 'congestion'] WHERE code = 'traffic_congestion';
UPDATE issue_categories SET keywords = ARRAY['missing sign', 'no sign', 'sign missing', 'sign not there', 'need sign'] WHERE code = 'missing_signs';
UPDATE issue_categories SET keywords = ARRAY['damaged sign', 'broken sign', 'sign damaged', 'sign broken', 'faded sign'] WHERE code = 'damaged_signs';
UPDATE issue_categories SET keywords = ARRAY['speed breaker damage', 'broken speed breaker', 'speed bump broken', 'damaged hump'] WHERE code = 'speed_breaker_damage';
UPDATE issue_categories SET keywords = ARRAY['unscientific speed breaker', 'bad speed breaker', 'dangerous hump', 'high speed breaker', 'wrong speed breaker'] WHERE code = 'unscientific_speedbreaker';
UPDATE issue_categories SET keywords = ARRAY['speed breaker required', 'need speed breaker', 'speed breaker needed', 'hump needed', 'speed bump required'] WHERE code = 'speed_breaker_request';
UPDATE issue_categories SET keywords = ARRAY['zebra crossing faded', 'faded crossing', 'crossing not visible', 'zebra lines faded', 'pedestrian crossing faded'] WHERE code = 'zebra_crossing_faded';
UPDATE issue_categories SET keywords = ARRAY['zebra crossing required', 'need crossing', 'crossing needed', 'pedestrian crossing needed', 'zebra lines needed'] WHERE code = 'zebra_crossing_request';
UPDATE issue_categories SET keywords = ARRAY['illegal parking', 'wrong parking', 'parking violation', 'unauthorized parking', 'no parking zone'] WHERE code = 'illegal_parking';
UPDATE issue_categories SET keywords = ARRAY['parking issue', 'no parking', 'parking problem', 'parking space', 'parking shortage'] WHERE code = 'parking_issue';
UPDATE issue_categories SET keywords = ARRAY['abandoned vehicle', 'old vehicle', 'vehicle abandoned', 'scrapped vehicle', 'junk vehicle'] WHERE code = 'abandoned_vehicle';
UPDATE issue_categories SET keywords = ARRAY['unauthorized digging', 'illegal digging', 'road digging', 'digging without permission', 'road excavation'] WHERE code = 'unauthorized_digging';

-- CITY AMENITIES (8 categories)
UPDATE issue_categories SET keywords = ARRAY['playground', 'play area', 'children park', 'kids play area', 'play ground'] WHERE code = 'playgrounds';
UPDATE issue_categories SET keywords = ARRAY['post office', 'postal service', 'post', 'post office issue'] WHERE code = 'post_offices';
UPDATE issue_categories SET keywords = ARRAY['park', 'garden', 'public park', 'parks', 'green space'] WHERE code = 'parks';
UPDATE issue_categories SET keywords = ARRAY['public toilet', 'toilet', 'restroom', 'washroom', 'public restroom'] WHERE code = 'public_toilets';
UPDATE issue_categories SET keywords = ARRAY['lake', 'water body', 'pond', 'reservoir', 'tank'] WHERE code = 'lakes';
UPDATE issue_categories SET keywords = ARRAY['burial ground', 'cemetery', 'graveyard', 'crematorium', 'burial place'] WHERE code = 'burial_grounds';
UPDATE issue_categories SET keywords = ARRAY['library', 'public library', 'reading room', 'book library'] WHERE code = 'libraries';
UPDATE issue_categories SET keywords = ARRAY['city amenity', 'amenity', 'other amenity', 'facility'] WHERE code = 'city_amenities_others';

-- BUS SERVICES (5 categories)
UPDATE issue_categories SET keywords = ARRAY['bus stop', 'bus shelter', 'bus stand', 'bus bay', 'bus halt'] WHERE code = 'bus_stops_shelters';
UPDATE issue_categories SET keywords = ARRAY['bus seating', 'bus seat', 'seat broken', 'no seat', 'seating issue'] WHERE code = 'bus_seating';
UPDATE issue_categories SET keywords = ARRAY['bus frequency', 'bus timing', 'bus schedule', 'bus late', 'irregular bus'] WHERE code = 'bus_frequency';
UPDATE issue_categories SET keywords = ARRAY['bus route', 'route information', 'route map', 'bus route info', 'route query'] WHERE code = 'bus_route_info';
UPDATE issue_categories SET keywords = ARRAY['bus service other', 'bus other', 'bus issue'] WHERE code = 'bus_services_others';

-- DRAINAGE & STORM WATER (1 category)
UPDATE issue_categories SET keywords = ARRAY['sewage contamination', 'sewage mixed', 'drain contamination', 'contaminated water', 'sewage in drain'] WHERE code = 'sewage_contamination';

-- SEWAGE MANAGEMENT (1 category - different from drainage_overflow)
UPDATE issue_categories SET keywords = ARRAY['drain overflow', 'drain overflowing', 'sewage drain overflow', 'drain full'] WHERE code = 'drain_overflow';

-- SOLID WASTE MANAGEMENT (10 categories)
UPDATE issue_categories SET keywords = ARRAY['wrong time collection', 'collection timing', 'garbage wrong time', 'wrong collection time', 'timing issue'] WHERE code = 'wrong_time_collection';
UPDATE issue_categories SET keywords = ARRAY['collection vehicle', 'truck not coming', 'garbage truck', 'collection van', 'vehicle not coming'] WHERE code = 'collection_vehicle_issue';
UPDATE issue_categories SET keywords = ARRAY['no segregation', 'not segregating', 'mixed waste', 'waste not separated', 'no sorting'] WHERE code = 'no_segregation';
UPDATE issue_categories SET keywords = ARRAY['mixed waste', 'waste mixed', 'no separation', 'waste not segregated', 'mixing waste'] WHERE code = 'mixed_waste_transfer';
UPDATE issue_categories SET keywords = ARRAY['dustbin damaged', 'bin broken', 'broken dustbin', 'damaged bin', 'dustbin broken'] WHERE code = 'damaged_dustbin';
UPDATE issue_categories SET keywords = ARRAY['new dustbin', 'dustbin needed', 'bin required', 'need dustbin', 'dustbin request'] WHERE code = 'new_dustbin_request';
UPDATE issue_categories SET keywords = ARRAY['e-waste', 'electronic waste', 'ewaste', 'electronics disposal', 'electronic items'] WHERE code = 'e_waste';
UPDATE issue_categories SET keywords = ARRAY['area not clean', 'area dirty', 'not cleaned', 'dirty area', 'unclean area'] WHERE code = 'area_not_clean';
UPDATE issue_categories SET keywords = ARRAY['swm violation', 'collector violation', 'worker violation', 'garbage collector issue', 'collector not following rules'] WHERE code = 'swm_violation_collector';
UPDATE issue_categories SET keywords = ARRAY['citizen violation', 'resident violation', 'public violation', 'littering', 'citizen not following rules'] WHERE code = 'swm_violation_citizen';

-- WATER (3 categories)
UPDATE issue_categories SET keywords = ARRAY['water supply', 'water', 'water issue', 'water problem', 'bwssb', 'cmwssb'] WHERE code = 'water_supply';
UPDATE issue_categories SET keywords = ARRAY['water color', 'colored water', 'water colour', 'dirty water', 'brown water', 'muddy water'] WHERE code = 'water_colour';
UPDATE issue_categories SET keywords = ARRAY['water other', 'water issue', 'water problem'] WHERE code = 'water_others';

-- POWER SUPPLY (2 categories)
UPDATE issue_categories SET keywords = ARRAY['defective meter', 'meter broken', 'meter faulty', 'meter not working', 'meter issue'] WHERE code = 'defective_meter';
UPDATE issue_categories SET keywords = ARRAY['illegal connection', 'unauthorized power', 'power theft', 'illegal electric connection', 'unauthorized electricity'] WHERE code = 'illegal_connection';

-- BUILDINGS (3 categories)
UPDATE issue_categories SET keywords = ARRAY['encroachment', 'building encroachment', 'illegal occupation', 'unauthorized occupation', 'encroach'] WHERE code = 'encroachment';
UPDATE issue_categories SET keywords = ARRAY['illegal construction', 'unauthorized building', 'illegal building', 'unauthorized construction', 'construction violation'] WHERE code = 'illegal_construction';
UPDATE issue_categories SET keywords = ARRAY['building other', 'building issue', 'building problem'] WHERE code = 'buildings_others';

-- CIVIC ISSUES (3 categories)
UPDATE issue_categories SET keywords = ARRAY['loud noise', 'noise', 'loud sound', 'noise pollution', 'disturbing noise', 'sound pollution'] WHERE code = 'loud_noise';
UPDATE issue_categories SET keywords = ARRAY['stray animals', 'stray', 'animal', 'street animal', 'stray dog', 'stray cattle'] WHERE code = 'stray_animals';
UPDATE issue_categories SET keywords = ARRAY['civic issue other', 'civic other', 'civic problem'] WHERE code = 'civic_issues_others';

-- ENVIRONMENT & POLLUTION (2 categories)
UPDATE issue_categories SET keywords = ARRAY['air quality', 'air pollution', 'pollution', 'bad air', 'air contamination'] WHERE code = 'air_quality';
UPDATE issue_categories SET keywords = ARRAY['tree', 'trees', 'vegetation', 'plants', 'greenery', 'tree issue'] WHERE code = 'trees_vegetation';

-- PUBLIC SAFETY (3 categories)
UPDATE issue_categories SET keywords = ARRAY['road safety', 'safety road', 'unsafe road', 'dangerous road', 'road hazard'] WHERE code = 'safety_roads';
UPDATE issue_categories SET keywords = ARRAY['fire safety', 'fire hazard', 'fire risk', 'fire danger', 'fire emergency'] WHERE code = 'safety_fire';
UPDATE issue_categories SET keywords = ARRAY['food safety', 'food hygiene', 'food contamination', 'unhygienic food', 'food quality'] WHERE code = 'safety_food';

-- LAW & ORDER (3 categories)
UPDATE issue_categories SET keywords = ARRAY['dowry', 'dowry harassment', 'dowry case', 'dowry demand', 'dowry torture'] WHERE code = 'dowry';
UPDATE issue_categories SET keywords = ARRAY['sexual assault', 'rape', 'sexual harassment', 'molestation', 'sexual abuse'] WHERE code = 'sexual_assault';
UPDATE issue_categories SET keywords = ARRAY['arson', 'fire crime', 'intentional fire', 'fire set', 'burning property'] WHERE code = 'arson';

-- ELECTIONS (3 categories)
UPDATE issue_categories SET keywords = ARRAY['poll booth', 'polling station', 'voting center', 'voting booth', 'election booth'] WHERE code = 'poll_booths';
UPDATE issue_categories SET keywords = ARRAY['voter enrollment', 'voter registration', 'voter list', 'voter roll', 'voter name'] WHERE code = 'voter_enrollment';
UPDATE issue_categories SET keywords = ARRAY['opinion poll', 'exit poll', 'election poll', 'voting poll', 'survey'] WHERE code = 'opinion_polls';

-- =====================================================
-- VERIFICATION
-- =====================================================

-- Check remaining categories without keywords
SELECT
    parent.name as department,
    child.code,
    child.name,
    array_length(child.keywords, 1) as keyword_count
FROM issue_categories parent
LEFT JOIN issue_categories child ON child.parent_id = parent.id
WHERE parent.parent_id IS NULL
  AND child.id IS NOT NULL
  AND (child.keywords IS NULL OR array_length(child.keywords, 1) = 0)
ORDER BY parent.display_order, child.display_order;

-- Final count
SELECT
    COUNT(*) FILTER (WHERE keywords IS NOT NULL AND array_length(keywords, 1) > 0) as categories_with_keywords,
    COUNT(*) FILTER (WHERE keywords IS NULL OR array_length(keywords, 1) = 0) as categories_without_keywords,
    COUNT(*) as total_subcategories
FROM issue_categories
WHERE parent_id IS NOT NULL;

-- Summary by department
SELECT
    parent.name as department,
    COUNT(child.id) as total_categories,
    COUNT(child.id) FILTER (WHERE child.keywords IS NOT NULL AND array_length(child.keywords, 1) > 0) as with_keywords,
    COUNT(child.id) FILTER (WHERE child.keywords IS NULL OR array_length(child.keywords, 1) = 0) as without_keywords
FROM issue_categories parent
LEFT JOIN issue_categories child ON child.parent_id = parent.id
WHERE parent.parent_id IS NULL
GROUP BY parent.id, parent.name, parent.display_order
ORDER BY parent.display_order;
