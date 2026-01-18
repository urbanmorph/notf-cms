-- =====================================================
-- LOAD ALL COMPREHENSIVE CATEGORIES (250+)
-- Complete migration - adds all missing categories
-- Safe to run - uses ON CONFLICT to avoid duplicates
-- =====================================================

-- Ensure columns exist
ALTER TABLE issue_categories ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES issue_categories(id);
ALTER TABLE issue_categories ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0;

-- Helper function to get category ID by code
CREATE OR REPLACE FUNCTION get_parent_id(category_code TEXT)
RETURNS UUID AS $$
BEGIN
    RETURN (SELECT id FROM issue_categories WHERE code = category_code LIMIT 1);
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- STEP 1: PARENT CATEGORIES (32 total)
-- =====================================================

-- Insert or update parent categories
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Roads & Traffic', 'roads_traffic', NULL, 1),
  ('Street Lighting', 'street_lighting', NULL, 2),
  ('Water Supply (BWSSB/CMWSSB)', 'water_supply', NULL, 3),
  ('Drainage & Storm Water', 'drainage', NULL, 4),
  ('Sewage Management', 'sewage', NULL, 5),
  ('Solid Waste Management', 'waste_management', NULL, 6),
  ('Power Supply (BESCOM/TANGEDCO)', 'power_supply', NULL, 7),
  ('Parks & Playgrounds', 'parks_playgrounds', NULL, 8),
  ('Public Toilets', 'public_toilets', NULL, 9),
  ('Lakes & Water Bodies', 'lakes', NULL, 10),
  ('Cemeteries & Burial Grounds', 'burial_grounds', NULL, 11),
  ('Markets', 'markets', NULL, 12),
  ('Libraries', 'libraries', NULL, 13),
  ('Community Halls', 'community_halls', NULL, 14),
  ('Health & Sanitation', 'health_sanitation', NULL, 15),
  ('Pest & Animal Control', 'pest_animal_control', NULL, 16),
  ('Trees & Forest', 'trees_forest', NULL, 17),
  ('Environment & Pollution', 'environment', NULL, 18),
  ('Building Plans & Approvals', 'building_plans', NULL, 19),
  ('Encroachment', 'encroachment', NULL, 20),
  ('Illegal Construction', 'illegal_construction', NULL, 21),
  ('Property Tax', 'property_tax', NULL, 22),
  ('Trade License', 'trade_license', NULL, 23),
  ('Birth & Death Certificates', 'certificates', NULL, 24),
  ('Public Safety', 'safety', NULL, 25),
  ('Fire Safety', 'fire_safety', NULL, 26),
  ('Law & Order', 'law_order', NULL, 27),
  ('Public Transport (BMTC/MTC)', 'public_transport', NULL, 28),
  ('Corruption & Illegal Activities', 'corruption', NULL, 29),
  ('Welfare Schemes', 'welfare', NULL, 30),
  ('Elections', 'elections', NULL, 31),
  ('General Grievances', 'general', NULL, 99)
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  display_order = EXCLUDED.display_order;

-- =====================================================
-- STEP 2: SUBCATEGORIES (250+)
-- =====================================================

-- 1. ROADS & TRAFFIC (21 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Pothole', 'pothole', get_parent_id('roads_traffic'), 1),
  ('Road Cave-in / Subsidence', 'road_cavein', get_parent_id('roads_traffic'), 2),
  ('Road Repair Required', 'road_repair', get_parent_id('roads_traffic'), 3),
  ('Road Resurfacing', 'road_resurfacing', get_parent_id('roads_traffic'), 4),
  ('Uneven Road Surface', 'uneven_road', get_parent_id('roads_traffic'), 5),
  ('Footpath Damage', 'footpath_damage', get_parent_id('roads_traffic'), 10),
  ('Footpath Missing', 'footpath_missing', get_parent_id('roads_traffic'), 11),
  ('Footpath Encroachment', 'footpath_encroachment', get_parent_id('roads_traffic'), 12),
  ('Traffic Signal Not Working', 'signal_not_working', get_parent_id('roads_traffic'), 20),
  ('Traffic Signal Timing Issue', 'signal_timing', get_parent_id('roads_traffic'), 21),
  ('Traffic Congestion', 'traffic_congestion', get_parent_id('roads_traffic'), 22),
  ('Missing Road Signs', 'missing_signs', get_parent_id('roads_traffic'), 23),
  ('Damaged Road Signs', 'damaged_signs', get_parent_id('roads_traffic'), 24),
  ('Speed Breaker Damage', 'speed_breaker_damage', get_parent_id('roads_traffic'), 30),
  ('Unscientific Speed Breaker', 'unscientific_speedbreaker', get_parent_id('roads_traffic'), 31),
  ('Speed Breaker Required', 'speed_breaker_request', get_parent_id('roads_traffic'), 32),
  ('Zebra Crossing Faded', 'zebra_crossing_faded', get_parent_id('roads_traffic'), 33),
  ('Zebra Crossing Required', 'zebra_crossing_request', get_parent_id('roads_traffic'), 34),
  ('Illegal Parking', 'illegal_parking', get_parent_id('roads_traffic'), 40),
  ('Parking Space Issue', 'parking_issue', get_parent_id('roads_traffic'), 41),
  ('Abandoned Vehicle', 'abandoned_vehicle', get_parent_id('roads_traffic'), 90),
  ('Unauthorized Digging', 'unauthorized_digging', get_parent_id('roads_traffic'), 91),
  ('Others', 'roads_traffic_others', get_parent_id('roads_traffic'), 99)
ON CONFLICT (code) DO NOTHING;

-- 2. STREET LIGHTING (10 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Light Not Working', 'light_not_working', get_parent_id('street_lighting'), 1),
  ('Light Flickering', 'light_flickering', get_parent_id('street_lighting'), 2),
  ('Light Broken/Damaged', 'light_broken', get_parent_id('street_lighting'), 3),
  ('Pole Damaged/Leaning', 'pole_damaged', get_parent_id('street_lighting'), 4),
  ('Daytime Light On', 'daytime_light', get_parent_id('street_lighting'), 5),
  ('New Light Required', 'new_light_request', get_parent_id('street_lighting'), 6),
  ('Junction Box Open', 'junction_box_open', get_parent_id('street_lighting'), 7),
  ('Earthing Issue', 'earthing_issue', get_parent_id('street_lighting'), 8),
  ('Park Light Not Working', 'park_light', get_parent_id('street_lighting'), 9),
  ('Others', 'street_lighting_others', get_parent_id('street_lighting'), 99)
ON CONFLICT (code) DO NOTHING;

-- 3. WATER SUPPLY (15 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('No Water Supply', 'no_water_supply', get_parent_id('water_supply'), 1),
  ('Low Water Pressure', 'low_water_pressure', get_parent_id('water_supply'), 2),
  ('Irregular Supply', 'irregular_supply', get_parent_id('water_supply'), 3),
  ('Pipe Leak / Burst', 'pipe_leak', get_parent_id('water_supply'), 4),
  ('Water Contamination', 'water_contamination', get_parent_id('water_supply'), 5),
  ('Dirty/Colored Water', 'dirty_water', get_parent_id('water_supply'), 6),
  ('Bad Smell', 'water_smell', get_parent_id('water_supply'), 7),
  ('Meter Not Working', 'meter_not_working', get_parent_id('water_supply'), 8),
  ('Meter Reading Issue', 'meter_reading_issue', get_parent_id('water_supply'), 9),
  ('Illegal Connection', 'illegal_water_connection', get_parent_id('water_supply'), 10),
  ('New Connection Required', 'new_water_connection', get_parent_id('water_supply'), 11),
  ('Tanker Request', 'tanker_request', get_parent_id('water_supply'), 12),
  ('Valve Issue', 'valve_issue', get_parent_id('water_supply'), 13),
  ('Borewell Issue', 'borewell_issue', get_parent_id('water_supply'), 14),
  ('Others', 'water_supply_others', get_parent_id('water_supply'), 99)
ON CONFLICT (code) DO NOTHING;

-- 4. DRAINAGE & STORM WATER (11 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Flooding/Waterlogging', 'flooding', get_parent_id('drainage'), 1),
  ('Drain Blocked/Clogged', 'drain_blocked', get_parent_id('drainage'), 2),
  ('Drain Overflow', 'drainage_overflow', get_parent_id('drainage'), 3),
  ('Open Drain', 'open_drain', get_parent_id('drainage'), 4),
  ('Broken Drain', 'broken_drain', get_parent_id('drainage'), 5),
  ('Drain Cover Missing', 'drain_cover_missing', get_parent_id('drainage'), 6),
  ('Drain Cover Broken', 'drain_cover_broken', get_parent_id('drainage'), 7),
  ('Stagnant Water', 'stagnant_water', get_parent_id('drainage'), 8),
  ('Mosquito Breeding in Drain', 'drain_mosquito', get_parent_id('drainage'), 9),
  ('Storm Water Drain Required', 'stormwater_drain_request', get_parent_id('drainage'), 10),
  ('Others', 'drainage_others', get_parent_id('drainage'), 99)
ON CONFLICT (code) DO NOTHING;

-- 5. SEWAGE MANAGEMENT (11 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Sewage Overflow', 'sewage_overflow', get_parent_id('sewage'), 1),
  ('Sewage Leak', 'sewage_leak', get_parent_id('sewage'), 2),
  ('Sewage Smell', 'sewage_smell', get_parent_id('sewage'), 3),
  ('Manhole Overflow', 'manhole_overflow', get_parent_id('sewage'), 4),
  ('Open Manhole', 'open_manhole', get_parent_id('sewage'), 5),
  ('Manhole Cover Missing', 'manhole_cover_missing', get_parent_id('sewage'), 6),
  ('Manhole Cover Broken', 'manhole_cover_broken', get_parent_id('sewage'), 7),
  ('Chamber Missing', 'chamber_missing', get_parent_id('sewage'), 8),
  ('Septic Tank Cleaning', 'septic_tank_cleaning', get_parent_id('sewage'), 9),
  ('Sewage Connection Required', 'sewage_connection', get_parent_id('sewage'), 10),
  ('Sewage Dumping', 'sewage_dumping', get_parent_id('sewage'), 11),
  ('Others', 'sewage_others', get_parent_id('sewage'), 99)
ON CONFLICT (code) DO NOTHING;

-- 6. SOLID WASTE MANAGEMENT (23 subcategories) - CRITICAL
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Garbage Not Collected', 'garbage_not_collected', get_parent_id('waste_management'), 1),
  ('Irregular Collection', 'irregular_collection', get_parent_id('waste_management'), 2),
  ('Wrong Time Collection', 'wrong_time_collection', get_parent_id('waste_management'), 3),
  ('Collection Vehicle Not Coming', 'collection_vehicle_issue', get_parent_id('waste_management'), 4),
  ('No Segregation by Collector', 'no_segregation', get_parent_id('waste_management'), 10),
  ('Mixed Waste Transfer', 'mixed_waste_transfer', get_parent_id('waste_management'), 11),
  ('Dustbin Overflowing', 'overflowing_bin', get_parent_id('waste_management'), 20),
  ('Dustbin Missing', 'missing_dustbin', get_parent_id('waste_management'), 21),
  ('Dustbin Damaged', 'damaged_dustbin', get_parent_id('waste_management'), 22),
  ('New Dustbin Required', 'new_dustbin_request', get_parent_id('waste_management'), 23),
  ('Garbage Dump on Street', 'garbage_dump', get_parent_id('waste_management'), 30),
  ('Construction Debris', 'construction_debris', get_parent_id('waste_management'), 31),
  ('Hazardous Waste Dumping', 'hazardous_waste', get_parent_id('waste_management'), 32),
  ('Plastic Waste', 'plastic_waste', get_parent_id('waste_management'), 33),
  ('E-Waste', 'e_waste', get_parent_id('waste_management'), 34),
  ('Biomedical Waste', 'biomedical_waste', get_parent_id('waste_management'), 35),
  ('Street Not Cleaned', 'street_not_cleaned', get_parent_id('waste_management'), 40),
  ('Area Not Kept Clean', 'area_not_clean', get_parent_id('waste_management'), 41),
  ('SWM Rule Violation by Collector', 'swm_violation_collector', get_parent_id('waste_management'), 50),
  ('SWM Rule Violation by Citizen', 'swm_violation_citizen', get_parent_id('waste_management'), 51),
  ('Others', 'waste_management_others', get_parent_id('waste_management'), 99)
ON CONFLICT (code) DO NOTHING;

-- 7. POWER SUPPLY (12 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Power Cut', 'power_cut', get_parent_id('power_supply'), 1),
  ('Frequent Power Cut', 'frequent_power_cut', get_parent_id('power_supply'), 2),
  ('Low Voltage', 'low_voltage', get_parent_id('power_supply'), 3),
  ('High Voltage / Power Surge', 'power_surge', get_parent_id('power_supply'), 4),
  ('Dangling Wire', 'dangling_wire', get_parent_id('power_supply'), 5),
  ('Transformer Issue', 'transformer', get_parent_id('power_supply'), 6),
  ('Meter Not Working', 'power_meter_not_working', get_parent_id('power_supply'), 7),
  ('Meter Reading Issue', 'power_meter_reading', get_parent_id('power_supply'), 8),
  ('Illegal Connection', 'illegal_power_connection', get_parent_id('power_supply'), 9),
  ('New Connection Required', 'new_power_connection', get_parent_id('power_supply'), 10),
  ('Pole Damaged', 'power_pole_damaged', get_parent_id('power_supply'), 11),
  ('Others', 'power_supply_others', get_parent_id('power_supply'), 99)
ON CONFLICT (code) DO NOTHING;

-- 8-14. PUBLIC FACILITIES

-- Parks & Playgrounds (7 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Park Maintenance', 'park_maintenance', get_parent_id('parks_playgrounds'), 1),
  ('Park Equipment Broken', 'park_equipment_broken', get_parent_id('parks_playgrounds'), 2),
  ('Park Fencing Damage', 'park_fencing', get_parent_id('parks_playgrounds'), 3),
  ('Playground Equipment Issue', 'playground_equipment', get_parent_id('parks_playgrounds'), 4),
  ('Garden Not Maintained', 'garden_maintenance', get_parent_id('parks_playgrounds'), 5),
  ('Encroachment in Park', 'park_encroachment', get_parent_id('parks_playgrounds'), 6),
  ('Others', 'parks_others', get_parent_id('parks_playgrounds'), 99)
ON CONFLICT (code) DO NOTHING;

-- Public Toilets (6 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Toilet Not Clean', 'toilet_not_clean', get_parent_id('public_toilets'), 1),
  ('Toilet Not Working', 'toilet_not_working', get_parent_id('public_toilets'), 2),
  ('No Water in Toilet', 'toilet_no_water', get_parent_id('public_toilets'), 3),
  ('Toilet Door Broken', 'toilet_door_broken', get_parent_id('public_toilets'), 4),
  ('New Toilet Required', 'new_toilet_request', get_parent_id('public_toilets'), 5),
  ('Others', 'public_toilets_others', get_parent_id('public_toilets'), 99)
ON CONFLICT (code) DO NOTHING;

-- Lakes & Water Bodies (6 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Lake Pollution', 'lake_pollution', get_parent_id('lakes'), 1),
  ('Lake Encroachment', 'lake_encroachment', get_parent_id('lakes'), 2),
  ('Lake Fencing Issue', 'lake_fencing', get_parent_id('lakes'), 3),
  ('Lake Maintenance', 'lake_maintenance', get_parent_id('lakes'), 4),
  ('Sewage Entering Lake', 'sewage_in_lake', get_parent_id('lakes'), 5),
  ('Others', 'lakes_others', get_parent_id('lakes'), 99)
ON CONFLICT (code) DO NOTHING;

-- Burial Grounds (3 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Burial Ground Maintenance', 'burial_ground_maintenance', get_parent_id('burial_grounds'), 1),
  ('Crematorium Issue', 'crematorium_issue', get_parent_id('burial_grounds'), 2),
  ('Others', 'burial_grounds_others', get_parent_id('burial_grounds'), 99)
ON CONFLICT (code) DO NOTHING;

-- Markets (3 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Market Not Clean', 'market_not_clean', get_parent_id('markets'), 1),
  ('Market Infrastructure Issue', 'market_infrastructure', get_parent_id('markets'), 2),
  ('Others', 'markets_others', get_parent_id('markets'), 99)
ON CONFLICT (code) DO NOTHING;

-- Libraries (3 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Library Maintenance', 'library_maintenance', get_parent_id('libraries'), 1),
  ('Library Timing Issue', 'library_timing', get_parent_id('libraries'), 2),
  ('Others', 'libraries_others', get_parent_id('libraries'), 99)
ON CONFLICT (code) DO NOTHING;

-- Community Halls (3 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Community Hall Maintenance', 'community_hall_maintenance', get_parent_id('community_halls'), 1),
  ('Community Hall Booking', 'community_hall_booking', get_parent_id('community_halls'), 2),
  ('Others', 'community_halls_others', get_parent_id('community_halls'), 99)
ON CONFLICT (code) DO NOTHING;

-- 15-16. HEALTH & PEST CONTROL

-- Health & Sanitation (5 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Public Health Center Issue', 'phc_issue', get_parent_id('health_sanitation'), 1),
  ('Food Safety / Hygiene', 'food_safety', get_parent_id('health_sanitation'), 2),
  ('Unsanitary Conditions', 'unsanitary_conditions', get_parent_id('health_sanitation'), 3),
  ('Dead Animal', 'dead_animal', get_parent_id('health_sanitation'), 4),
  ('Others', 'health_sanitation_others', get_parent_id('health_sanitation'), 99)
ON CONFLICT (code) DO NOTHING;

-- Pest & Animal Control (9 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Mosquito Breeding', 'mosquito_breeding', get_parent_id('pest_animal_control'), 1),
  ('Mosquito Fogging Required', 'mosquito_fogging', get_parent_id('pest_animal_control'), 2),
  ('Stray Dogs', 'stray_dogs', get_parent_id('pest_animal_control'), 3),
  ('Stray Cattle', 'stray_cattle', get_parent_id('pest_animal_control'), 4),
  ('Monkey Menace', 'monkey_menace', get_parent_id('pest_animal_control'), 5),
  ('Snake', 'snake', get_parent_id('pest_animal_control'), 6),
  ('Pest Control Required', 'pest_control', get_parent_id('pest_animal_control'), 7),
  ('Rat Problem', 'rat_problem', get_parent_id('pest_animal_control'), 8),
  ('Others', 'pest_animal_others', get_parent_id('pest_animal_control'), 99)
ON CONFLICT (code) DO NOTHING;

-- 17-18. ENVIRONMENT & TREES

-- Trees & Forest (7 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Tree Fallen', 'tree_fallen', get_parent_id('trees_forest'), 1),
  ('Dangerous Tree', 'dangerous_tree', get_parent_id('trees_forest'), 2),
  ('Tree Pruning Required', 'tree_pruning', get_parent_id('trees_forest'), 3),
  ('Tree Cutting Permission', 'tree_cutting_permission', get_parent_id('trees_forest'), 4),
  ('Unauthorized Tree Cutting', 'unauthorized_tree_cutting', get_parent_id('trees_forest'), 5),
  ('Tree Plantation Request', 'tree_plantation', get_parent_id('trees_forest'), 6),
  ('Others', 'trees_forest_others', get_parent_id('trees_forest'), 99)
ON CONFLICT (code) DO NOTHING;

-- Environment & Pollution (8 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Air Pollution', 'air_pollution', get_parent_id('environment'), 1),
  ('Noise Pollution', 'noise_pollution', get_parent_id('environment'), 2),
  ('Water Pollution', 'water_pollution', get_parent_id('environment'), 3),
  ('Soil Contamination', 'soil_contamination', get_parent_id('environment'), 4),
  ('Industrial Pollution', 'industrial_pollution', get_parent_id('environment'), 5),
  ('Littering', 'littering', get_parent_id('environment'), 6),
  ('Plastic Burning', 'plastic_burning', get_parent_id('environment'), 7),
  ('Others', 'environment_others', get_parent_id('environment'), 99)
ON CONFLICT (code) DO NOTHING;

-- 19-21. BUILDINGS & PLANNING

-- Building Plans & Approvals (7 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Building Plan Approval', 'building_plan_approval', get_parent_id('building_plans'), 1),
  ('Khata Certificate', 'khata_certificate', get_parent_id('building_plans'), 2),
  ('Completion Certificate', 'completion_certificate', get_parent_id('building_plans'), 3),
  ('Occupancy Certificate', 'occupancy_certificate', get_parent_id('building_plans'), 4),
  ('Building Violation', 'building_violation', get_parent_id('building_plans'), 5),
  ('Rainwater Harvesting', 'rainwater_harvesting', get_parent_id('building_plans'), 6),
  ('Others', 'building_plans_others', get_parent_id('building_plans'), 99)
ON CONFLICT (code) DO NOTHING;

-- Encroachment (7 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Footpath Encroachment', 'encroach_footpath', get_parent_id('encroachment'), 1),
  ('Road Encroachment', 'encroach_road', get_parent_id('encroachment'), 2),
  ('Public Land Encroachment', 'encroach_public_land', get_parent_id('encroachment'), 3),
  ('Vendor Encroachment', 'vendor_encroachment', get_parent_id('encroachment'), 4),
  ('Park Encroachment', 'encroach_park', get_parent_id('encroachment'), 5),
  ('Lake Encroachment', 'encroach_lake', get_parent_id('encroachment'), 6),
  ('Others', 'encroachment_others', get_parent_id('encroachment'), 99)
ON CONFLICT (code) DO NOTHING;

-- Illegal Construction (6 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Illegal Construction', 'illegal_construction_issue', get_parent_id('illegal_construction'), 1),
  ('Unauthorized Floor', 'unauthorized_floor', get_parent_id('illegal_construction'), 2),
  ('Setback Violation', 'setback_violation', get_parent_id('illegal_construction'), 3),
  ('Dangerous Building', 'dangerous_building', get_parent_id('illegal_construction'), 4),
  ('Demolition Required', 'demolition', get_parent_id('illegal_construction'), 5),
  ('Others', 'illegal_construction_others', get_parent_id('illegal_construction'), 99)
ON CONFLICT (code) DO NOTHING;

-- 22-24. REVENUE & ADMINISTRATION

-- Property Tax (4 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Property Tax Query', 'property_tax_query', get_parent_id('property_tax'), 1),
  ('Property Tax Payment', 'property_tax_payment', get_parent_id('property_tax'), 2),
  ('Property Tax Assessment', 'property_tax_assessment', get_parent_id('property_tax'), 3),
  ('Others', 'property_tax_others', get_parent_id('property_tax'), 99)
ON CONFLICT (code) DO NOTHING;

-- Trade License (3 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Trade License Application', 'trade_license_application', get_parent_id('trade_license'), 1),
  ('Trade License Renewal', 'trade_license_renewal', get_parent_id('trade_license'), 2),
  ('Others', 'trade_license_others', get_parent_id('trade_license'), 99)
ON CONFLICT (code) DO NOTHING;

-- Birth & Death Certificates (3 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Birth Certificate', 'birth_certificate', get_parent_id('certificates'), 1),
  ('Death Certificate', 'death_certificate', get_parent_id('certificates'), 2),
  ('Others', 'certificates_others', get_parent_id('certificates'), 99)
ON CONFLICT (code) DO NOTHING;

-- 25-27. SAFETY & LAW

-- Public Safety (5 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Safety Issue - Children', 'safety_children', get_parent_id('safety'), 1),
  ('Safety Issue - Women', 'safety_women', get_parent_id('safety'), 2),
  ('Safety Issue - Elders', 'safety_elders', get_parent_id('safety'), 3),
  ('Dark Area / Unsafe', 'dark_area', get_parent_id('safety'), 4),
  ('Others', 'safety_others', get_parent_id('safety'), 99)
ON CONFLICT (code) DO NOTHING;

-- Fire Safety (4 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Fire Incident', 'fire_incident', get_parent_id('fire_safety'), 1),
  ('Fire Safety Violation', 'fire_safety_violation', get_parent_id('fire_safety'), 2),
  ('Fire NOC', 'fire_noc', get_parent_id('fire_safety'), 3),
  ('Others', 'fire_safety_others', get_parent_id('fire_safety'), 99)
ON CONFLICT (code) DO NOTHING;

-- Law & Order (5 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Theft / Burglary', 'theft_burglary', get_parent_id('law_order'), 1),
  ('Assault', 'assault', get_parent_id('law_order'), 2),
  ('Cybercrime', 'cybercrime', get_parent_id('law_order'), 3),
  ('Suspicious Activity', 'suspicious_activity', get_parent_id('law_order'), 4),
  ('Others', 'law_order_others', get_parent_id('law_order'), 99)
ON CONFLICT (code) DO NOTHING;

-- 28. PUBLIC TRANSPORT (6 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Bus Not Coming', 'bus_not_coming', get_parent_id('public_transport'), 1),
  ('Bus Delay', 'bus_delay', get_parent_id('public_transport'), 2),
  ('Bus Condition Issue', 'bus_condition', get_parent_id('public_transport'), 3),
  ('Bus Stop Issue', 'bus_stop_issue', get_parent_id('public_transport'), 4),
  ('Route Information', 'route_information', get_parent_id('public_transport'), 5),
  ('Others', 'public_transport_others', get_parent_id('public_transport'), 99)
ON CONFLICT (code) DO NOTHING;

-- 29-31. GOVERNANCE

-- Corruption & Illegal Activities (4 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Bribery / Corruption', 'bribery', get_parent_id('corruption'), 1),
  ('Official Misconduct', 'official_misconduct', get_parent_id('corruption'), 2),
  ('Illegal Activity', 'illegal_activity', get_parent_id('corruption'), 3),
  ('Others', 'corruption_others', get_parent_id('corruption'), 99)
ON CONFLICT (code) DO NOTHING;

-- Welfare Schemes (4 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Ration Card', 'ration_card', get_parent_id('welfare'), 1),
  ('Pension', 'pension', get_parent_id('welfare'), 2),
  ('Scholarship', 'scholarship', get_parent_id('welfare'), 3),
  ('Others', 'welfare_others', get_parent_id('welfare'), 99)
ON CONFLICT (code) DO NOTHING;

-- Elections (4 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Voter ID', 'voter_id', get_parent_id('elections'), 1),
  ('Voter Registration', 'voter_registration', get_parent_id('elections'), 2),
  ('Poll Booth Issue', 'poll_booth', get_parent_id('elections'), 3),
  ('Others', 'elections_others', get_parent_id('elections'), 99)
ON CONFLICT (code) DO NOTHING;

-- 32. GENERAL GRIEVANCES (5 subcategories)
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Feedback', 'feedback', get_parent_id('general'), 1),
  ('Suggestion', 'suggestion', get_parent_id('general'), 2),
  ('Appreciation', 'appreciation', get_parent_id('general'), 3),
  ('Query', 'query', get_parent_id('general'), 4),
  ('Others', 'general_others', get_parent_id('general'), 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- CLEANUP & VERIFICATION
-- =====================================================

-- Drop helper function
DROP FUNCTION IF EXISTS get_parent_id(TEXT);

-- Show results
SELECT
  parent.name as department,
  COUNT(child.id) as subcategory_count
FROM issue_categories parent
LEFT JOIN issue_categories child ON child.parent_id = parent.id
WHERE parent.parent_id IS NULL
GROUP BY parent.id, parent.name, parent.display_order
ORDER BY parent.display_order;

-- Total count
SELECT
  COUNT(*) FILTER (WHERE parent_id IS NULL) as parent_categories,
  COUNT(*) FILTER (WHERE parent_id IS NOT NULL) as subcategories,
  COUNT(*) as total_categories
FROM issue_categories;
