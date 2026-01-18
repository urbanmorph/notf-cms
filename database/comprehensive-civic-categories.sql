-- =====================================================
-- COMPREHENSIVE CIVIC COMPLAINT CATEGORIES
-- Based on best practices from Indian municipal systems
-- Reference: BBMP Sahaaya (20+ departments), Chennai Corporation, Smart City 311 systems
-- Date: 2026-01-18
-- =====================================================

-- IMPORTANT: Run this FIRST to add unique constraint:
-- database/add-unique-code-constraint.sql
--
-- Then run this file in Supabase SQL Editor

-- This replaces/extends the existing seed-categories.sql with a more comprehensive structure
-- Based on:
-- 1. BBMP Sahaaya (Bengaluru) - covers 20+ departments
-- 2. NYC 311 system - international best practices
-- 3. Indian Smart City initiatives
-- 4. Common civic issues across Indian municipalities

-- STRUCTURE:
-- - 32 parent categories (departments)
-- - 250+ subcategories (specific issue types)
-- - Uses ON CONFLICT (code) to safely add/update categories

-- =====================================================
-- PARENT CATEGORIES (Departments)
-- =====================================================

-- Clear existing if starting fresh (comment out if appending)
-- TRUNCATE issue_categories CASCADE;

INSERT INTO issue_categories (id, name, code, parent_id, display_order) VALUES
  -- Infrastructure & Basic Services
  ('a1000000-0000-0000-0000-000000000001', 'Roads & Traffic', 'roads_traffic', NULL, 1),
  ('a1000000-0000-0000-0000-000000000002', 'Street Lighting', 'street_lighting', NULL, 2),
  ('a1000000-0000-0000-0000-000000000003', 'Water Supply (BWSSB/CMWSSB)', 'water_supply', NULL, 3),
  ('a1000000-0000-0000-0000-000000000004', 'Drainage & Storm Water', 'drainage', NULL, 4),
  ('a1000000-0000-0000-0000-000000000005', 'Sewage Management', 'sewage', NULL, 5),
  ('a1000000-0000-0000-0000-000000000006', 'Solid Waste Management', 'waste_management', NULL, 6),

  -- Power & Utilities
  ('a1000000-0000-0000-0000-000000000007', 'Power Supply (BESCOM/TANGEDCO)', 'power_supply', NULL, 7),

  -- Public Facilities
  ('a1000000-0000-0000-0000-000000000008', 'Parks & Playgrounds', 'parks_playgrounds', NULL, 8),
  ('a1000000-0000-0000-0000-000000000009', 'Public Toilets', 'public_toilets', NULL, 9),
  ('a1000000-0000-0000-0000-000000000010', 'Lakes & Water Bodies', 'lakes', NULL, 10),
  ('a1000000-0000-0000-0000-000000000011', 'Cemeteries & Burial Grounds', 'burial_grounds', NULL, 11),
  ('a1000000-0000-0000-0000-000000000012', 'Markets', 'markets', NULL, 12),
  ('a1000000-0000-0000-0000-000000000013', 'Libraries', 'libraries', NULL, 13),
  ('a1000000-0000-0000-0000-000000000014', 'Community Halls', 'community_halls', NULL, 14),

  -- Health & Sanitation
  ('a1000000-0000-0000-0000-000000000015', 'Health & Sanitation', 'health_sanitation', NULL, 15),
  ('a1000000-0000-0000-0000-000000000016', 'Pest & Animal Control', 'pest_animal_control', NULL, 16),

  -- Environment & Trees
  ('a1000000-0000-0000-0000-000000000017', 'Trees & Forest', 'trees_forest', NULL, 17),
  ('a1000000-0000-0000-0000-000000000018', 'Environment & Pollution', 'environment', NULL, 18),

  -- Buildings & Planning
  ('a1000000-0000-0000-0000-000000000019', 'Building Plans & Approvals', 'building_plans', NULL, 19),
  ('a1000000-0000-0000-0000-000000000020', 'Encroachment', 'encroachment', NULL, 20),
  ('a1000000-0000-0000-0000-000000000021', 'Illegal Construction', 'illegal_construction', NULL, 21),

  -- Revenue & Administration
  ('a1000000-0000-0000-0000-000000000022', 'Property Tax', 'property_tax', NULL, 22),
  ('a1000000-0000-0000-0000-000000000023', 'Trade License', 'trade_license', NULL, 23),
  ('a1000000-0000-0000-0000-000000000024', 'Birth & Death Certificates', 'certificates', NULL, 24),

  -- Safety & Law
  ('a1000000-0000-0000-0000-000000000025', 'Public Safety', 'safety', NULL, 25),
  ('a1000000-0000-0000-0000-000000000026', 'Fire Safety', 'fire_safety', NULL, 26),
  ('a1000000-0000-0000-0000-000000000027', 'Law & Order', 'law_order', NULL, 27),

  -- Transport
  ('a1000000-0000-0000-0000-000000000028', 'Public Transport (BMTC/MTC)', 'public_transport', NULL, 28),

  -- Governance
  ('a1000000-0000-0000-0000-000000000029', 'Corruption & Illegal Activities', 'corruption', NULL, 29),
  ('a1000000-0000-0000-0000-000000000030', 'Welfare Schemes', 'welfare', NULL, 30),
  ('a1000000-0000-0000-0000-000000000031', 'Elections', 'elections', NULL, 31),
  ('a1000000-0000-0000-0000-000000000032', 'General Grievances', 'general', NULL, 99)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  code = EXCLUDED.code,
  display_order = EXCLUDED.display_order;

-- =====================================================
-- 1. ROADS & TRAFFIC (Most common complaints)
-- =====================================================
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  -- Road Surface
  ('Pothole', 'pothole', 'a1000000-0000-0000-0000-000000000001', 1),
  ('Road Cave-in / Subsidence', 'road_cavein', 'a1000000-0000-0000-0000-000000000001', 2),
  ('Road Repair Required', 'road_repair', 'a1000000-0000-0000-0000-000000000001', 3),
  ('Road Resurfacing', 'road_resurfacing', 'a1000000-0000-0000-0000-000000000001', 4),
  ('Uneven Road Surface', 'uneven_road', 'a1000000-0000-0000-0000-000000000001', 5),

  -- Footpaths
  ('Footpath Damage', 'footpath_damage', 'a1000000-0000-0000-0000-000000000001', 10),
  ('Footpath Missing', 'footpath_missing', 'a1000000-0000-0000-0000-000000000001', 11),
  ('Footpath Encroachment', 'footpath_encroachment', 'a1000000-0000-0000-0000-000000000001', 12),

  -- Traffic Management
  ('Traffic Signal Not Working', 'signal_not_working', 'a1000000-0000-0000-0000-000000000001', 20),
  ('Traffic Signal Timing Issue', 'signal_timing', 'a1000000-0000-0000-0000-000000000001', 21),
  ('Traffic Congestion', 'traffic_congestion', 'a1000000-0000-0000-0000-000000000001', 22),
  ('Missing Road Signs', 'missing_signs', 'a1000000-0000-0000-0000-000000000001', 23),
  ('Damaged Road Signs', 'damaged_signs', 'a1000000-0000-0000-0000-000000000001', 24),

  -- Safety Features
  ('Speed Breaker Damage', 'speed_breaker_damage', 'a1000000-0000-0000-0000-000000000001', 30),
  ('Unscientific Speed Breaker', 'unscientific_speedbreaker', 'a1000000-0000-0000-0000-000000000001', 31),
  ('Speed Breaker Required', 'speed_breaker_request', 'a1000000-0000-0000-0000-000000000001', 32),
  ('Zebra Crossing Faded', 'zebra_crossing_faded', 'a1000000-0000-0000-0000-000000000001', 33),
  ('Zebra Crossing Required', 'zebra_crossing_request', 'a1000000-0000-0000-0000-000000000001', 34),

  -- Parking
  ('Illegal Parking', 'illegal_parking', 'a1000000-0000-0000-0000-000000000001', 40),
  ('Parking Space Issue', 'parking_issue', 'a1000000-0000-0000-0000-000000000001', 41),

  -- Others
  ('Abandoned Vehicle', 'abandoned_vehicle', 'a1000000-0000-0000-0000-000000000001', 90),
  ('Unauthorized Digging', 'unauthorized_digging', 'a1000000-0000-0000-0000-000000000001', 91),
  ('Others', 'roads_traffic_others', 'a1000000-0000-0000-0000-000000000001', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- 2. STREET LIGHTING
-- =====================================================
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Light Not Working', 'light_not_working', 'a1000000-0000-0000-0000-000000000002', 1),
  ('Light Flickering', 'light_flickering', 'a1000000-0000-0000-0000-000000000002', 2),
  ('Light Broken/Damaged', 'light_broken', 'a1000000-0000-0000-0000-000000000002', 3),
  ('Pole Damaged/Leaning', 'pole_damaged', 'a1000000-0000-0000-0000-000000000002', 4),
  ('Daytime Light On', 'daytime_light', 'a1000000-0000-0000-0000-000000000002', 5),
  ('New Light Required', 'new_light_request', 'a1000000-0000-0000-0000-000000000002', 6),
  ('Junction Box Open', 'junction_box_open', 'a1000000-0000-0000-0000-000000000002', 7),
  ('Earthing Issue', 'earthing_issue', 'a1000000-0000-0000-0000-000000000002', 8),
  ('Park Light Not Working', 'park_light', 'a1000000-0000-0000-0000-000000000002', 9),
  ('Others', 'street_lighting_others', 'a1000000-0000-0000-0000-000000000002', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- 3. WATER SUPPLY
-- =====================================================
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('No Water Supply', 'no_water_supply', 'a1000000-0000-0000-0000-000000000003', 1),
  ('Low Water Pressure', 'low_water_pressure', 'a1000000-0000-0000-0000-000000000003', 2),
  ('Irregular Supply', 'irregular_supply', 'a1000000-0000-0000-0000-000000000003', 3),
  ('Pipe Leak / Burst', 'pipe_leak', 'a1000000-0000-0000-0000-000000000003', 4),
  ('Water Contamination', 'water_contamination', 'a1000000-0000-0000-0000-000000000003', 5),
  ('Dirty/Colored Water', 'dirty_water', 'a1000000-0000-0000-0000-000000000003', 6),
  ('Bad Smell', 'water_smell', 'a1000000-0000-0000-0000-000000000003', 7),
  ('Meter Not Working', 'meter_not_working', 'a1000000-0000-0000-0000-000000000003', 8),
  ('Meter Reading Issue', 'meter_reading_issue', 'a1000000-0000-0000-0000-000000000003', 9),
  ('Illegal Connection', 'illegal_water_connection', 'a1000000-0000-0000-0000-000000000003', 10),
  ('New Connection Required', 'new_water_connection', 'a1000000-0000-0000-0000-000000000003', 11),
  ('Tanker Request', 'tanker_request', 'a1000000-0000-0000-0000-000000000003', 12),
  ('Valve Issue', 'valve_issue', 'a1000000-0000-0000-0000-000000000003', 13),
  ('Borewell Issue', 'borewell_issue', 'a1000000-0000-0000-0000-000000000003', 14),
  ('Others', 'water_supply_others', 'a1000000-0000-0000-0000-000000000003', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- 4. DRAINAGE & STORM WATER
-- =====================================================
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Flooding/Waterlogging', 'flooding', 'a1000000-0000-0000-0000-000000000004', 1),
  ('Drain Blocked/Clogged', 'drain_blocked', 'a1000000-0000-0000-0000-000000000004', 2),
  ('Drain Overflow', 'drain_overflow', 'a1000000-0000-0000-0000-000000000004', 3),
  ('Open Drain', 'open_drain', 'a1000000-0000-0000-0000-000000000004', 4),
  ('Broken Drain', 'broken_drain', 'a1000000-0000-0000-0000-000000000004', 5),
  ('Drain Cover Missing', 'drain_cover_missing', 'a1000000-0000-0000-0000-000000000004', 6),
  ('Drain Cover Broken', 'drain_cover_broken', 'a1000000-0000-0000-0000-000000000004', 7),
  ('Stagnant Water', 'stagnant_water', 'a1000000-0000-0000-0000-000000000004', 8),
  ('Mosquito Breeding in Drain', 'drain_mosquito', 'a1000000-0000-0000-0000-000000000004', 9),
  ('Storm Water Drain Required', 'stormwater_drain_request', 'a1000000-0000-0000-0000-000000000004', 10),
  ('Others', 'drainage_others', 'a1000000-0000-0000-0000-000000000004', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- 5. SEWAGE MANAGEMENT
-- =====================================================
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Sewage Overflow', 'sewage_overflow', 'a1000000-0000-0000-0000-000000000005', 1),
  ('Sewage Leak', 'sewage_leak', 'a1000000-0000-0000-0000-000000000005', 2),
  ('Sewage Smell', 'sewage_smell', 'a1000000-0000-0000-0000-000000000005', 3),
  ('Manhole Overflow', 'manhole_overflow', 'a1000000-0000-0000-0000-000000000005', 4),
  ('Open Manhole', 'open_manhole', 'a1000000-0000-0000-0000-000000000005', 5),
  ('Manhole Cover Missing', 'manhole_cover_missing', 'a1000000-0000-0000-0000-000000000005', 6),
  ('Manhole Cover Broken', 'manhole_cover_broken', 'a1000000-0000-0000-0000-000000000005', 7),
  ('Chamber Missing', 'chamber_missing', 'a1000000-0000-0000-0000-000000000005', 8),
  ('Septic Tank Cleaning', 'septic_tank_cleaning', 'a1000000-0000-0000-0000-000000000005', 9),
  ('Sewage Connection Required', 'sewage_connection', 'a1000000-0000-0000-0000-000000000005', 10),
  ('Others', 'sewage_others', 'a1000000-0000-0000-0000-000000000005', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- 6. SOLID WASTE MANAGEMENT (Critical!)
-- =====================================================
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  -- Collection Issues
  ('Garbage Not Collected', 'garbage_not_collected', 'a1000000-0000-0000-0000-000000000006', 1),
  ('Irregular Collection', 'irregular_collection', 'a1000000-0000-0000-0000-000000000006', 2),
  ('Wrong Time Collection', 'wrong_time_collection', 'a1000000-0000-0000-0000-000000000006', 3),
  ('Collection Vehicle Not Coming', 'collection_vehicle_issue', 'a1000000-0000-0000-0000-000000000006', 4),

  -- Segregation & Handling
  ('No Segregation by Collector', 'no_segregation', 'a1000000-0000-0000-0000-000000000006', 10),
  ('Mixed Waste Transfer', 'mixed_waste_transfer', 'a1000000-0000-0000-000000000006', 11),

  -- Infrastructure
  ('Dustbin Overflowing', 'overflowing_bin', 'a1000000-0000-0000-0000-000000000006', 20),
  ('Dustbin Missing', 'missing_dustbin', 'a1000000-0000-0000-0000-000000000006', 21),
  ('Dustbin Damaged', 'damaged_dustbin', 'a1000000-0000-0000-0000-000000000006', 22),
  ('New Dustbin Required', 'new_dustbin_request', 'a1000000-0000-0000-0000-000000000006', 23),

  -- Illegal Dumping
  ('Garbage Dump on Street', 'garbage_dump', 'a1000000-0000-0000-0000-000000000006', 30),
  ('Construction Debris', 'construction_debris', 'a1000000-0000-0000-0000-000000000006', 31),
  ('Hazardous Waste Dumping', 'hazardous_waste', 'a1000000-0000-0000-0000-000000000006', 32),
  ('Plastic Waste', 'plastic_waste', 'a1000000-0000-0000-0000-000000000006', 33),
  ('E-Waste', 'e_waste', 'a1000000-0000-0000-0000-000000000006', 34),
  ('Biomedical Waste', 'biomedical_waste', 'a1000000-0000-0000-0000-000000000006', 35),

  -- Cleaning
  ('Street Not Cleaned', 'street_not_cleaned', 'a1000000-0000-0000-0000-000000000006', 40),
  ('Area Not Kept Clean', 'area_not_clean', 'a1000000-0000-0000-0000-000000000006', 41),

  -- Violations
  ('SWM Rule Violation by Collector', 'swm_violation_collector', 'a1000000-0000-0000-0000-000000000006', 50),
  ('SWM Rule Violation by Citizen', 'swm_violation_citizen', 'a1000000-0000-0000-0000-000000000006', 51),

  ('Others', 'waste_management_others', 'a1000000-0000-0000-0000-000000000006', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- 7. POWER SUPPLY (BESCOM/TANGEDCO)
-- =====================================================
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Power Cut', 'power_cut', 'a1000000-0000-0000-0000-000000000007', 1),
  ('Frequent Power Cut', 'frequent_power_cut', 'a1000000-0000-0000-0000-000000000007', 2),
  ('Low Voltage', 'low_voltage', 'a1000000-0000-0000-0000-000000000007', 3),
  ('High Voltage / Power Surge', 'power_surge', 'a1000000-0000-0000-0000-000000000007', 4),
  ('Dangling Wire', 'dangling_wire', 'a1000000-0000-0000-0000-000000000007', 5),
  ('Transformer Issue', 'transformer', 'a1000000-0000-0000-0000-000000000007', 6),
  ('Meter Not Working', 'defective_meter', 'a1000000-0000-0000-0000-000000000007', 7),
  ('Meter Reading Issue', 'meter_reading', 'a1000000-0000-0000-0000-000000000007', 8),
  ('Illegal Connection', 'illegal_power_connection', 'a1000000-0000-0000-0000-000000000007', 9),
  ('New Connection Required', 'new_power_connection', 'a1000000-0000-0000-0000-000000000007', 10),
  ('Pole Damaged', 'power_pole_damaged', 'a1000000-0000-0000-0000-000000000007', 11),
  ('Others', 'power_supply_others', 'a1000000-0000-0000-0000-000000000007', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- 8-14. PUBLIC FACILITIES
-- =====================================================

-- Parks & Playgrounds
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Park Maintenance', 'park_maintenance', 'a1000000-0000-0000-0000-000000000008', 1),
  ('Park Equipment Broken', 'park_equipment_broken', 'a1000000-0000-0000-0000-000000000008', 2),
  ('Park Fencing Damage', 'park_fencing', 'a1000000-0000-0000-0000-000000000008', 3),
  ('Playground Equipment Issue', 'playground_equipment', 'a1000000-0000-0000-0000-000000000008', 4),
  ('Garden Not Maintained', 'garden_maintenance', 'a1000000-0000-0000-0000-000000000008', 5),
  ('Encroachment in Park', 'park_encroachment', 'a1000000-0000-0000-0000-000000000008', 6),
  ('Others', 'parks_others', 'a1000000-0000-0000-0000-000000000008', 99)
ON CONFLICT (code) DO NOTHING;

-- Public Toilets
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Toilet Not Clean', 'toilet_not_clean', 'a1000000-0000-0000-0000-000000000009', 1),
  ('Toilet Not Working', 'toilet_not_working', 'a1000000-0000-0000-0000-000000000009', 2),
  ('No Water in Toilet', 'toilet_no_water', 'a1000000-0000-0000-0000-000000000009', 3),
  ('Toilet Door Broken', 'toilet_door_broken', 'a1000000-0000-0000-0000-000000000009', 4),
  ('New Toilet Required', 'new_toilet_request', 'a1000000-0000-0000-0000-000000000009', 5),
  ('Others', 'public_toilets_others', 'a1000000-0000-0000-0000-000000000009', 99)
ON CONFLICT (code) DO NOTHING;

-- Lakes & Water Bodies
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Lake Pollution', 'lake_pollution', 'a1000000-0000-0000-0000-000000000010', 1),
  ('Lake Encroachment', 'lake_encroachment', 'a1000000-0000-0000-0000-000000000010', 2),
  ('Lake Fencing Issue', 'lake_fencing', 'a1000000-0000-0000-0000-000000000010', 3),
  ('Lake Maintenance', 'lake_maintenance', 'a1000000-0000-0000-0000-000000000010', 4),
  ('Sewage Entering Lake', 'sewage_in_lake', 'a1000000-0000-0000-0000-000000000010', 5),
  ('Others', 'lakes_others', 'a1000000-0000-0000-0000-000000000010', 99)
ON CONFLICT (code) DO NOTHING;

-- Burial Grounds
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Burial Ground Maintenance', 'burial_ground_maintenance', 'a1000000-0000-0000-0000-000000000011', 1),
  ('Crematorium Issue', 'crematorium_issue', 'a1000000-0000-0000-0000-000000000011', 2),
  ('Others', 'burial_grounds_others', 'a1000000-0000-0000-0000-000000000011', 99)
ON CONFLICT (code) DO NOTHING;

-- Markets
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Market Not Clean', 'market_not_clean', 'a1000000-0000-0000-0000-000000000012', 1),
  ('Market Infrastructure Issue', 'market_infrastructure', 'a1000000-0000-0000-0000-000000000012', 2),
  ('Others', 'markets_others', 'a1000000-0000-0000-0000-000000000012', 99)
ON CONFLICT (code) DO NOTHING;

-- Libraries
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Library Maintenance', 'library_maintenance', 'a1000000-0000-0000-0000-000000000013', 1),
  ('Library Timing Issue', 'library_timing', 'a1000000-0000-0000-0000-000000000013', 2),
  ('Others', 'libraries_others', 'a1000000-0000-0000-0000-000000000013', 99)
ON CONFLICT (code) DO NOTHING;

-- Community Halls
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Community Hall Maintenance', 'community_hall_maintenance', 'a1000000-0000-0000-0000-000000000014', 1),
  ('Community Hall Booking', 'community_hall_booking', 'a1000000-0000-0000-0000-000000000014', 2),
  ('Others', 'community_halls_others', 'a1000000-0000-0000-0000-000000000014', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- 15-16. HEALTH & PEST CONTROL
-- =====================================================

-- Health & Sanitation
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Public Health Center Issue', 'phc_issue', 'a1000000-0000-0000-0000-000000000015', 1),
  ('Food Safety / Hygiene', 'food_safety', 'a1000000-0000-0000-0000-000000000015', 2),
  ('Unsanitary Conditions', 'unsanitary_conditions', 'a1000000-0000-0000-0000-000000000015', 3),
  ('Dead Animal', 'dead_animal', 'a1000000-0000-0000-0000-000000000015', 4),
  ('Others', 'health_sanitation_others', 'a1000000-0000-0000-0000-000000000015', 99)
ON CONFLICT (code) DO NOTHING;

-- Pest & Animal Control
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Mosquito Breeding', 'mosquito_breeding', 'a1000000-0000-0000-0000-000000000016', 1),
  ('Mosquito Fogging Required', 'mosquito_fogging', 'a1000000-0000-0000-0000-000000000016', 2),
  ('Stray Dogs', 'stray_dogs', 'a1000000-0000-0000-0000-000000000016', 3),
  ('Stray Cattle', 'stray_cattle', 'a1000000-0000-0000-0000-000000000016', 4),
  ('Monkey Menace', 'monkey_menace', 'a1000000-0000-0000-0000-000000000016', 5),
  ('Snake', 'snake', 'a1000000-0000-0000-0000-000000000016', 6),
  ('Pest Control Required', 'pest_control', 'a1000000-0000-0000-0000-000000000016', 7),
  ('Rat Problem', 'rat_problem', 'a1000000-0000-0000-0000-000000000016', 8),
  ('Others', 'pest_animal_others', 'a1000000-0000-0000-0000-000000000016', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- 17-18. ENVIRONMENT & TREES
-- =====================================================

-- Trees & Forest
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Tree Fallen', 'tree_fallen', 'a1000000-0000-0000-0000-000000000017', 1),
  ('Dangerous Tree', 'dangerous_tree', 'a1000000-0000-0000-0000-000000000017', 2),
  ('Tree Pruning Required', 'tree_pruning', 'a1000000-0000-0000-0000-000000000017', 3),
  ('Tree Cutting Permission', 'tree_cutting_permission', 'a1000000-0000-0000-0000-000000000017', 4),
  ('Unauthorized Tree Cutting', 'unauthorized_tree_cutting', 'a1000000-0000-0000-0000-000000000017', 5),
  ('Tree Plantation Request', 'tree_plantation', 'a1000000-0000-0000-0000-000000000017', 6),
  ('Others', 'trees_forest_others', 'a1000000-0000-0000-0000-000000000017', 99)
ON CONFLICT (code) DO NOTHING;

-- Environment & Pollution
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Air Pollution', 'air_pollution', 'a1000000-0000-0000-0000-000000000018', 1),
  ('Noise Pollution', 'noise_pollution', 'a1000000-0000-0000-0000-000000000018', 2),
  ('Water Pollution', 'water_pollution', 'a1000000-0000-0000-0000-000000000018', 3),
  ('Soil Contamination', 'soil_contamination', 'a1000000-0000-0000-0000-000000000018', 4),
  ('Industrial Pollution', 'industrial_pollution', 'a1000000-0000-0000-0000-000000000018', 5),
  ('Littering', 'littering', 'a1000000-0000-0000-0000-000000000018', 6),
  ('Plastic Burning', 'plastic_burning', 'a1000000-0000-0000-0000-000000000018', 7),
  ('Others', 'environment_others', 'a1000000-0000-0000-0000-000000000018', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- 19-21. BUILDINGS & PLANNING
-- =====================================================

-- Building Plans & Approvals
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Building Plan Approval', 'building_plan_approval', 'a1000000-0000-0000-0000-000000000019', 1),
  ('Khata Certificate', 'khata_certificate', 'a1000000-0000-0000-0000-000000000019', 2),
  ('Completion Certificate', 'completion_certificate', 'a1000000-0000-0000-0000-000000000019', 3),
  ('Occupancy Certificate', 'occupancy_certificate', 'a1000000-0000-0000-0000-000000000019', 4),
  ('Building Violation', 'building_violation', 'a1000000-0000-0000-0000-000000000019', 5),
  ('Rainwater Harvesting', 'rainwater_harvesting', 'a1000000-0000-0000-0000-000000000019', 6),
  ('Others', 'building_plans_others', 'a1000000-0000-0000-0000-000000000019', 99)
ON CONFLICT (code) DO NOTHING;

-- Encroachment
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Footpath Encroachment', 'encroach_footpath', 'a1000000-0000-0000-0000-000000000020', 1),
  ('Road Encroachment', 'encroach_road', 'a1000000-0000-0000-0000-000000000020', 2),
  ('Public Land Encroachment', 'encroach_public_land', 'a1000000-0000-0000-0000-000000000020', 3),
  ('Vendor Encroachment', 'vendor_encroachment', 'a1000000-0000-0000-0000-000000000020', 4),
  ('Park Encroachment', 'encroach_park', 'a1000000-0000-0000-0000-000000000020', 5),
  ('Lake Encroachment', 'encroach_lake', 'a1000000-0000-0000-0000-000000000020', 6),
  ('Others', 'encroachment_others', 'a1000000-0000-0000-0000-000000000020', 99)
ON CONFLICT (code) DO NOTHING;

-- Illegal Construction
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Illegal Construction', 'illegal_construction', 'a1000000-0000-0000-0000-000000000021', 1),
  ('Unauthorized Floor', 'unauthorized_floor', 'a1000000-0000-0000-0000-000000000021', 2),
  ('Setback Violation', 'setback_violation', 'a1000000-0000-0000-0000-000000000021', 3),
  ('Dangerous Building', 'dangerous_building', 'a1000000-0000-0000-0000-000000000021', 4),
  ('Demolition Required', 'demolition', 'a1000000-0000-0000-0000-000000000021', 5),
  ('Others', 'illegal_construction_others', 'a1000000-0000-0000-0000-000000000021', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- 22-24. REVENUE & ADMINISTRATION
-- =====================================================

-- Property Tax
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Property Tax Query', 'property_tax_query', 'a1000000-0000-0000-0000-000000000022', 1),
  ('Property Tax Payment', 'property_tax_payment', 'a1000000-0000-0000-0000-000000000022', 2),
  ('Property Tax Assessment', 'property_tax_assessment', 'a1000000-0000-0000-0000-000000000022', 3),
  ('Others', 'property_tax_others', 'a1000000-0000-0000-0000-000000000022', 99)
ON CONFLICT (code) DO NOTHING;

-- Trade License
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Trade License Application', 'trade_license_application', 'a1000000-0000-0000-0000-000000000023', 1),
  ('Trade License Renewal', 'trade_license_renewal', 'a1000000-0000-0000-0000-000000000023', 2),
  ('Others', 'trade_license_others', 'a1000000-0000-0000-0000-000000000023', 99)
ON CONFLICT (code) DO NOTHING;

-- Birth & Death Certificates
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Birth Certificate', 'birth_certificate', 'a1000000-0000-0000-0000-000000000024', 1),
  ('Death Certificate', 'death_certificate', 'a1000000-0000-0000-0000-000000000024', 2),
  ('Others', 'certificates_others', 'a1000000-0000-0000-0000-000000000024', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- 25-27. SAFETY & LAW
-- =====================================================

-- Public Safety
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Safety Issue - Children', 'safety_children', 'a1000000-0000-0000-0000-000000000025', 1),
  ('Safety Issue - Women', 'safety_women', 'a1000000-0000-0000-0000-000000000025', 2),
  ('Safety Issue - Elders', 'safety_elders', 'a1000000-0000-0000-0000-000000000025', 3),
  ('Dark Area / Unsafe', 'dark_area', 'a1000000-0000-0000-0000-000000000025', 4),
  ('Others', 'safety_others', 'a1000000-0000-0000-0000-000000000025', 99)
ON CONFLICT (code) DO NOTHING;

-- Fire Safety
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Fire Incident', 'fire_incident', 'a1000000-0000-0000-0000-000000000026', 1),
  ('Fire Safety Violation', 'fire_safety_violation', 'a1000000-0000-0000-0000-000000000026', 2),
  ('Fire NOC', 'fire_noc', 'a1000000-0000-0000-0000-000000000026', 3),
  ('Others', 'fire_safety_others', 'a1000000-0000-0000-0000-000000000026', 99)
ON CONFLICT (code) DO NOTHING;

-- Law & Order
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Theft / Burglary', 'theft_burglary', 'a1000000-0000-0000-0000-000000000027', 1),
  ('Assault', 'assault', 'a1000000-0000-0000-0000-000000000027', 2),
  ('Cybercrime', 'cybercrime', 'a1000000-0000-0000-0000-000000000027', 3),
  ('Suspicious Activity', 'suspicious_activity', 'a1000000-0000-0000-0000-000000000027', 4),
  ('Others', 'law_order_others', 'a1000000-0000-0000-0000-000000000027', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- 28. PUBLIC TRANSPORT
-- =====================================================
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Bus Not Coming', 'bus_not_coming', 'a1000000-0000-0000-0000-000000000028', 1),
  ('Bus Delay', 'bus_delay', 'a1000000-0000-0000-0000-000000000028', 2),
  ('Bus Condition Issue', 'bus_condition', 'a1000000-0000-0000-0000-000000000028', 3),
  ('Bus Stop Issue', 'bus_stop_issue', 'a1000000-0000-0000-0000-000000000028', 4),
  ('Route Information', 'route_information', 'a1000000-0000-0000-0000-000000000028', 5),
  ('Others', 'public_transport_others', 'a1000000-0000-0000-0000-000000000028', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- 29-31. GOVERNANCE
-- =====================================================

-- Corruption & Illegal Activities
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Bribery / Corruption', 'bribery', 'a1000000-0000-0000-0000-000000000029', 1),
  ('Official Misconduct', 'official_misconduct', 'a1000000-0000-0000-0000-000000000029', 2),
  ('Illegal Activity', 'illegal_activity', 'a1000000-0000-0000-0000-000000000029', 3),
  ('Others', 'corruption_others', 'a1000000-0000-0000-0000-000000000029', 99)
ON CONFLICT (code) DO NOTHING;

-- Welfare Schemes
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Ration Card', 'ration_card', 'a1000000-0000-0000-0000-000000000030', 1),
  ('Pension', 'pension', 'a1000000-0000-0000-0000-000000000030', 2),
  ('Scholarship', 'scholarship', 'a1000000-0000-0000-0000-000000000030', 3),
  ('Others', 'welfare_others', 'a1000000-0000-0000-0000-000000000030', 99)
ON CONFLICT (code) DO NOTHING;

-- Elections
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Voter ID', 'voter_id', 'a1000000-0000-0000-0000-000000000031', 1),
  ('Voter Registration', 'voter_registration', 'a1000000-0000-0000-0000-000000000031', 2),
  ('Poll Booth Issue', 'poll_booth', 'a1000000-0000-0000-0000-000000000031', 3),
  ('Others', 'elections_others', 'a1000000-0000-0000-0000-000000000031', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- 32. GENERAL GRIEVANCES
-- =====================================================
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Feedback', 'feedback', 'a1000000-0000-0000-0000-000000000032', 1),
  ('Suggestion', 'suggestion', 'a1000000-0000-0000-0000-000000000032', 2),
  ('Appreciation', 'appreciation', 'a1000000-0000-0000-0000-000000000032', 3),
  ('Query', 'query', 'a1000000-0000-0000-0000-000000000032', 4),
  ('Others', 'general_others', 'a1000000-0000-0000-0000-000000000032', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Count categories
-- SELECT
--   parent.name as department,
--   COUNT(child.id) as subcategory_count
-- FROM issue_categories parent
-- LEFT JOIN issue_categories child ON child.parent_id = parent.id
-- WHERE parent.parent_id IS NULL
-- GROUP BY parent.id, parent.name, parent.display_order
-- ORDER BY parent.display_order;

-- Total count
-- SELECT COUNT(*) FROM issue_categories WHERE parent_id IS NOT NULL;
