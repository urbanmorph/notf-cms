-- =====================================================
-- FIX MISSING KEYWORDS (142 categories)
-- Adds keywords to all categories that were missed in the first run
-- =====================================================

-- ROADS & TRAFFIC (additional categories)
UPDATE issue_categories SET keywords = ARRAY['speed breaker missing', 'no speed breaker', 'need speed breaker'] WHERE code = 'speed_breaker_missing';
UPDATE issue_categories SET keywords = ARRAY['road hump broken', 'speed bump broken', 'damaged hump'] WHERE code = 'road_hump_broken';
UPDATE issue_categories SET keywords = ARRAY['water on road', 'rainwater', 'water stagnation'] WHERE code = 'water_on_road';
UPDATE issue_categories SET keywords = ARRAY['new road', 'road needed', 'road construction'] WHERE code = 'new_road_request';
UPDATE issue_categories SET keywords = ARRAY['road other', 'traffic issue'] WHERE code = 'roads_traffic_others';

-- PARKS & PLAYGROUNDS (fix codes)
UPDATE issue_categories SET keywords = ARRAY['park equipment', 'playground equipment', 'broken equipment', 'swing broken', 'slide broken'] WHERE code = 'park_equipment_broken';
UPDATE issue_categories SET keywords = ARRAY['playground equipment', 'play equipment', 'children play area'] WHERE code = 'playground_equipment';
UPDATE issue_categories SET keywords = ARRAY['garden', 'garden maintenance', 'garden not clean', 'garden upkeep'] WHERE code = 'garden_maintenance';
UPDATE issue_categories SET keywords = ARRAY['park other', 'playground issue', 'park problem'] WHERE code = 'parks_others';

-- PUBLIC TOILETS (fix codes)
UPDATE issue_categories SET keywords = ARRAY['toilet dirty', 'unclean toilet', 'toilet not cleaned', 'dirty restroom'] WHERE code = 'toilet_not_clean';
UPDATE issue_categories SET keywords = ARRAY['toilet broken', 'damaged toilet', 'toilet not working', 'toilet issue'] WHERE code = 'toilet_not_working';
UPDATE issue_categories SET keywords = ARRAY['toilet door', 'door broken', 'toilet lock broken', 'door damaged'] WHERE code = 'toilet_door_broken';
UPDATE issue_categories SET keywords = ARRAY['new toilet', 'toilet needed', 'toilet required', 'restroom needed'] WHERE code = 'new_toilet_request';

-- BURIAL GROUNDS (fix codes)
UPDATE issue_categories SET keywords = ARRAY['burial ground', 'cemetery', 'graveyard', 'burial maintenance'] WHERE code = 'burial_ground_maintenance';
UPDATE issue_categories SET keywords = ARRAY['crematorium', 'cremation', 'crematory issue'] WHERE code = 'crematorium_issue';

-- MARKETS (fix codes)
UPDATE issue_categories SET keywords = ARRAY['market dirty', 'market not clean', 'market cleanliness', 'unclean market'] WHERE code = 'market_not_clean';
UPDATE issue_categories SET keywords = ARRAY['market infrastructure', 'market building', 'market facility'] WHERE code = 'market_infrastructure';

-- LIBRARIES (missing)
UPDATE issue_categories SET keywords = ARRAY['library timing', 'library hours', 'library closed', 'opening hours'] WHERE code = 'library_timing';

-- COMMUNITY HALLS (fix codes)
UPDATE issue_categories SET keywords = ARRAY['community hall', 'hall maintenance', 'hall cleaning', 'hall repair'] WHERE code = 'community_hall_maintenance';
UPDATE issue_categories SET keywords = ARRAY['hall booking', 'book hall', 'hall reservation', 'rent hall'] WHERE code = 'community_hall_booking';

-- HEALTH & SANITATION (missing)
UPDATE issue_categories SET keywords = ARRAY['phc', 'health center', 'primary health', 'clinic', 'dispensary'] WHERE code = 'phc_issue';
UPDATE issue_categories SET keywords = ARRAY['food safety', 'food hygiene', 'food contamination', 'unhygienic food'] WHERE code = 'food_safety';

-- PEST & ANIMAL CONTROL (missing)
UPDATE issue_categories SET keywords = ARRAY['pest control', 'pest issue', 'insect problem', 'pest removal'] WHERE code = 'pest_control';
UPDATE issue_categories SET keywords = ARRAY['rat', 'mouse', 'rodent', 'rat problem', 'rat infestation'] WHERE code = 'rat_problem';
UPDATE issue_categories SET keywords = ARRAY['stray pig', 'pig', 'wild pig', 'pig menace'] WHERE code = 'stray_pigs';
UPDATE issue_categories SET keywords = ARRAY['pest animal other', 'animal control issue'] WHERE code = 'pest_animal_others';

-- TREES & FOREST (missing)
UPDATE issue_categories SET keywords = ARRAY['unauthorized cutting', 'illegal tree cutting', 'tree cut illegally'] WHERE code = 'unauthorized_tree_cutting';
UPDATE issue_categories SET keywords = ARRAY['tree planting', 'plant tree', 'tree plantation', 'new tree'] WHERE code = 'tree_plantation';
UPDATE issue_categories SET keywords = ARRAY['tree disease', 'sick tree', 'dying tree', 'tree dying'] WHERE code = 'tree_disease';

-- ENVIRONMENT & POLLUTION (fix and add)
UPDATE issue_categories SET keywords = ARRAY['soil contamination', 'soil pollution', 'contaminated soil', 'land pollution'] WHERE code = 'soil_contamination';
UPDATE issue_categories SET keywords = ARRAY['industrial pollution', 'factory pollution', 'industry pollution', 'industrial waste'] WHERE code = 'industrial_pollution';
UPDATE issue_categories SET keywords = ARRAY['littering', 'litter', 'trash thrown', 'garbage thrown'] WHERE code = 'littering';
UPDATE issue_categories SET keywords = ARRAY['plastic burning', 'burning plastic', 'smoke from burning', 'waste burning'] WHERE code = 'plastic_burning';
UPDATE issue_categories SET keywords = ARRAY['hazardous waste', 'toxic waste', 'chemical waste', 'dangerous waste'] WHERE code = 'hazardous_waste';

-- BUILDING PLANS & APPROVALS (fix and add)
UPDATE issue_categories SET keywords = ARRAY['khata', 'khata certificate', 'property document', 'khata issue'] WHERE code = 'khata_certificate';
UPDATE issue_categories SET keywords = ARRAY['completion certificate', 'cc', 'occupancy certificate', 'building completion'] WHERE code = 'completion_certificate';
UPDATE issue_categories SET keywords = ARRAY['occupancy certificate', 'oc', 'occupation permit'] WHERE code = 'occupancy_certificate';
UPDATE issue_categories SET keywords = ARRAY['building violation', 'construction violation', 'plan violation'] WHERE code = 'building_violation';
UPDATE issue_categories SET keywords = ARRAY['rainwater harvesting', 'rwh', 'rain water', 'water harvesting'] WHERE code = 'rainwater_harvesting';

-- ENCROACHMENT (fix codes)
UPDATE issue_categories SET keywords = ARRAY['footpath encroachment', 'footpath blocked', 'pavement blocked', 'sidewalk blocked'] WHERE code = 'encroach_footpath';
UPDATE issue_categories SET keywords = ARRAY['road encroachment', 'road blocked', 'road obstruction', 'road occupied'] WHERE code = 'encroach_road';
UPDATE issue_categories SET keywords = ARRAY['public land', 'government land', 'land encroachment', 'illegal occupation'] WHERE code = 'encroach_public_land';
UPDATE issue_categories SET keywords = ARRAY['vendor encroachment', 'street vendor', 'hawker', 'illegal vendor'] WHERE code = 'vendor_encroachment';
UPDATE issue_categories SET keywords = ARRAY['park encroachment', 'park occupied', 'park land'] WHERE code = 'encroach_park';
UPDATE issue_categories SET keywords = ARRAY['lake encroachment', 'lake land', 'lake occupied'] WHERE code = 'encroach_lake';

-- ILLEGAL CONSTRUCTION (fix and add)
UPDATE issue_categories SET keywords = ARRAY['illegal construction', 'unauthorized construction', 'illegal building'] WHERE code = 'illegal_construction_issue';
UPDATE issue_categories SET keywords = ARRAY['unauthorized floor', 'illegal floor', 'extra floor', 'floor violation'] WHERE code = 'unauthorized_floor';
UPDATE issue_categories SET keywords = ARRAY['dangerous building', 'unsafe building', 'collapsing building', 'building risk'] WHERE code = 'dangerous_building';
UPDATE issue_categories SET keywords = ARRAY['demolition', 'demolish', 'demolition required', 'tear down'] WHERE code = 'demolition';

-- PROPERTY TAX (fix codes)
UPDATE issue_categories SET keywords = ARRAY['property tax query', 'tax question', 'tax information'] WHERE code = 'property_tax_query';
UPDATE issue_categories SET keywords = ARRAY['property tax payment', 'pay tax', 'tax payment issue'] WHERE code = 'property_tax_payment';
UPDATE issue_categories SET keywords = ARRAY['tax assessment', 'property assessment', 'wrong assessment', 'reassessment'] WHERE code = 'property_tax_assessment';

-- TRADE LICENSE (fix codes)
UPDATE issue_categories SET keywords = ARRAY['trade license', 'business license', 'license application', 'new license'] WHERE code = 'trade_license_application';
UPDATE issue_categories SET keywords = ARRAY['license renewal', 'renew license', 'license expiry', 'extend license'] WHERE code = 'trade_license_renewal';

-- PUBLIC SAFETY (fix and add)
UPDATE issue_categories SET keywords = ARRAY['safety children', 'child safety', 'children risk', 'unsafe for kids'] WHERE code = 'safety_children';
UPDATE issue_categories SET keywords = ARRAY['safety women', 'women safety', 'women security', 'unsafe for women'] WHERE code = 'safety_women';
UPDATE issue_categories SET keywords = ARRAY['safety elders', 'senior safety', 'elderly safety', 'old people safety'] WHERE code = 'safety_elders';
UPDATE issue_categories SET keywords = ARRAY['dark area', 'no light', 'unsafe area', 'dangerous spot'] WHERE code = 'dark_area';

-- FIRE SAFETY (fix and add)
UPDATE issue_categories SET keywords = ARRAY['fire incident', 'fire accident', 'fire emergency', 'fire outbreak'] WHERE code = 'fire_incident';
UPDATE issue_categories SET keywords = ARRAY['fire safety violation', 'fire safety issue', 'fire compliance'] WHERE code = 'fire_safety_violation';

-- LAW & ORDER (fix and add)
UPDATE issue_categories SET keywords = ARRAY['theft', 'burglary', 'robbery', 'stolen', 'break-in'] WHERE code = 'theft_burglary';
UPDATE issue_categories SET keywords = ARRAY['assault', 'attack', 'violence', 'fight'] WHERE code = 'assault';
UPDATE issue_categories SET keywords = ARRAY['cybercrime', 'online fraud', 'hacking', 'cyber fraud'] WHERE code = 'cybercrime';
UPDATE issue_categories SET keywords = ARRAY['suspicious activity', 'suspicious person', 'suspicious behavior'] WHERE code = 'suspicious_activity';

-- PUBLIC TRANSPORT (fix and add)
UPDATE issue_categories SET keywords = ARRAY['bus not coming', 'no bus', 'bus missing', 'bus absent'] WHERE code = 'bus_not_coming';
UPDATE issue_categories SET keywords = ARRAY['bus delay', 'late bus', 'bus timing', 'bus delayed'] WHERE code = 'bus_delay';
UPDATE issue_categories SET keywords = ARRAY['bus condition', 'bus broken', 'bus dirty', 'bus maintenance'] WHERE code = 'bus_condition';
UPDATE issue_categories SET keywords = ARRAY['bus stop issue', 'bus stop broken', 'bus shelter', 'bus stand'] WHERE code = 'bus_stop_issue';
UPDATE issue_categories SET keywords = ARRAY['route information', 'bus route', 'route query', 'bus timing'] WHERE code = 'route_information';

-- CORRUPTION (fix and add)
UPDATE issue_categories SET keywords = ARRAY['official misconduct', 'officer misbehavior', 'staff misconduct'] WHERE code = 'official_misconduct';
UPDATE issue_categories SET keywords = ARRAY['illegal activity', 'illegal operation', 'unlawful activity'] WHERE code = 'illegal_activity';

-- WELFARE SCHEMES (fix and add)
UPDATE issue_categories SET keywords = ARRAY['ration card', 'ration', 'food card', 'pds card'] WHERE code = 'ration_card';
UPDATE issue_categories SET keywords = ARRAY['pension', 'pension scheme', 'elderly pension', 'widow pension'] WHERE code = 'pension';
UPDATE issue_categories SET keywords = ARRAY['scholarship', 'student scholarship', 'education scholarship'] WHERE code = 'scholarship';

-- ELECTIONS (fix and add)
UPDATE issue_categories SET keywords = ARRAY['poll booth', 'polling station', 'voting booth', 'voting center'] WHERE code = 'poll_booth';

-- GENERAL GRIEVANCES (fix and add)
UPDATE issue_categories SET keywords = ARRAY['feedback', 'comment', 'review', 'opinion'] WHERE code = 'feedback';
UPDATE issue_categories SET keywords = ARRAY['suggestion', 'recommend', 'improvement', 'idea'] WHERE code = 'suggestion';
UPDATE issue_categories SET keywords = ARRAY['appreciation', 'thank you', 'praise', 'compliment'] WHERE code = 'appreciation';
UPDATE issue_categories SET keywords = ARRAY['query', 'question', 'inquiry', 'ask'] WHERE code = 'query';
UPDATE issue_categories SET keywords = ARRAY['general other', 'miscellaneous', 'other issue'] WHERE code = 'general_others';

-- Additional missing categories from earlier sections

-- STREET LIGHTING (additional)
UPDATE issue_categories SET keywords = ARRAY['park light issue', 'garden light issue'] WHERE code = 'park_light_issue';

-- WATER SUPPLY (additional)
UPDATE issue_categories SET keywords = ARRAY['sump overflow', 'water tank overflow', 'tank issue'] WHERE code = 'sump_overflow';

-- DRAINAGE (additional)
UPDATE issue_categories SET keywords = ARRAY['gully pot', 'gully pot blocked', 'drain gully'] WHERE code = 'gully_pot';

-- SOLID WASTE MANAGEMENT (additional)
UPDATE issue_categories SET keywords = ARRAY['dry waste', 'recyclable waste', 'recyclables'] WHERE code = 'dry_waste';
UPDATE issue_categories SET keywords = ARRAY['hazardous household', 'hazardous waste', 'toxic household'] WHERE code = 'hazardous_household_waste';
UPDATE issue_categories SET keywords = ARRAY['bulk waste', 'large waste', 'big items'] WHERE code = 'bulk_waste';
UPDATE issue_categories SET keywords = ARRAY['waste vehicle', 'garbage truck', 'collection vehicle'] WHERE code = 'waste_vehicle_issue';

-- POWER SUPPLY (additional)
UPDATE issue_categories SET keywords = ARRAY['street light wire', 'light cable', 'street light connection'] WHERE code = 'street_light_wire';

-- PARKS (additional)
UPDATE issue_categories SET keywords = ARRAY['park gate', 'park entrance', 'gate broken'] WHERE code = 'park_gate';
UPDATE issue_categories SET keywords = ARRAY['park toilet', 'toilet in park', 'park restroom'] WHERE code = 'park_toilet';

-- HEALTH (additional)
UPDATE issue_categories SET keywords = ARRAY['disease outbreak', 'epidemic', 'infection spread'] WHERE code = 'disease_outbreak';

-- Verify all updates
SELECT
    code,
    name,
    array_length(keywords, 1) as keyword_count,
    keywords
FROM issue_categories
WHERE parent_id IS NOT NULL
  AND (keywords IS NULL OR array_length(keywords, 1) = 0)
ORDER BY code;

-- Count updated categories
SELECT
    COUNT(*) FILTER (WHERE keywords IS NOT NULL AND array_length(keywords, 1) > 0) as categories_with_keywords,
    COUNT(*) FILTER (WHERE keywords IS NULL OR array_length(keywords, 1) = 0) as categories_without_keywords,
    COUNT(*) as total_subcategories
FROM issue_categories
WHERE parent_id IS NOT NULL;
