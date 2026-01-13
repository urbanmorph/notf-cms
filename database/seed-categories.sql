-- =====================================================
-- ISSUE CATEGORIES SEED DATA
-- Hierarchical categories with parent_id for subcategories
-- =====================================================

-- Step 1: Add parent_id column if not exists
ALTER TABLE issue_categories ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES issue_categories(id);
ALTER TABLE issue_categories ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_issue_categories_parent ON issue_categories(parent_id);

-- Step 2: Clear existing categories (optional - comment out if you want to keep existing)
-- TRUNCATE issue_categories CASCADE;

-- Step 3: Insert Main Categories
INSERT INTO issue_categories (id, name, code, parent_id, display_order) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'City Amenities', 'city_amenities', NULL, 1),
  ('a1000000-0000-0000-0000-000000000002', 'Bus Services', 'bus_services', NULL, 2),
  ('a1000000-0000-0000-0000-000000000003', 'Law and Order', 'law_order', NULL, 3),
  ('a1000000-0000-0000-0000-000000000004', 'Drainage', 'drainage', NULL, 4),
  ('a1000000-0000-0000-0000-000000000005', 'Elections', 'elections', NULL, 5),
  ('a1000000-0000-0000-0000-000000000006', 'Environment', 'environment', NULL, 6),
  ('a1000000-0000-0000-0000-000000000007', 'Water', 'water', NULL, 7),
  ('a1000000-0000-0000-0000-000000000008', 'Buildings', 'buildings', NULL, 8),
  ('a1000000-0000-0000-0000-000000000009', 'Civic Issues', 'civic_issues', NULL, 9),
  ('a1000000-0000-0000-0000-000000000010', 'Power Supply', 'power_supply', NULL, 10),
  ('a1000000-0000-0000-0000-000000000011', 'Roads, Traffic and Transport', 'roads_traffic', NULL, 11),
  ('a1000000-0000-0000-0000-000000000012', 'Safety', 'safety', NULL, 12),
  ('a1000000-0000-0000-0000-000000000013', 'Sewage', 'sewage', NULL, 13)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, code = EXCLUDED.code, display_order = EXCLUDED.display_order;

-- =====================================================
-- CITY AMENITIES Subcategories
-- =====================================================
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Libraries', 'libraries', 'a1000000-0000-0000-0000-000000000001', 1),
  ('Burial Grounds', 'burial_grounds', 'a1000000-0000-0000-0000-000000000001', 2),
  ('Playgrounds', 'playgrounds', 'a1000000-0000-0000-0000-000000000001', 3),
  ('Post Offices', 'post_offices', 'a1000000-0000-0000-0000-000000000001', 4),
  ('Public Toilets', 'public_toilets', 'a1000000-0000-0000-0000-000000000001', 5),
  ('Parks', 'parks', 'a1000000-0000-0000-0000-000000000001', 6),
  ('Lakes', 'lakes', 'a1000000-0000-0000-0000-000000000001', 7),
  ('Others', 'city_amenities_others', 'a1000000-0000-0000-0000-000000000001', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- BUS SERVICES Subcategories
-- =====================================================
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Bus Stops and Shelters', 'bus_stops_shelters', 'a1000000-0000-0000-0000-000000000002', 1),
  ('Seating', 'bus_seating', 'a1000000-0000-0000-0000-000000000002', 2),
  ('Frequency', 'bus_frequency', 'a1000000-0000-0000-0000-000000000002', 3),
  ('Condition of Buses', 'bus_condition', 'a1000000-0000-0000-0000-000000000002', 4),
  ('Route Information', 'bus_route_info', 'a1000000-0000-0000-0000-000000000002', 5),
  ('Others', 'bus_services_others', 'a1000000-0000-0000-0000-000000000002', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- LAW AND ORDER Subcategories
-- =====================================================
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Theft and Burglary', 'theft_burglary', 'a1000000-0000-0000-0000-000000000003', 1),
  ('Dowry', 'dowry', 'a1000000-0000-0000-0000-000000000003', 2),
  ('Sexual Assault', 'sexual_assault', 'a1000000-0000-0000-0000-000000000003', 3),
  ('Arson', 'arson', 'a1000000-0000-0000-0000-000000000003', 4),
  ('Cybercrime', 'cybercrime', 'a1000000-0000-0000-0000-000000000003', 5),
  ('Others', 'law_order_others', 'a1000000-0000-0000-0000-000000000003', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- DRAINAGE Subcategories
-- =====================================================
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Flooding', 'flooding', 'a1000000-0000-0000-0000-000000000004', 1),
  ('Broken Drain', 'broken_drain', 'a1000000-0000-0000-0000-000000000004', 2),
  ('Sewage Contamination', 'sewage_contamination', 'a1000000-0000-0000-0000-000000000004', 3),
  ('Others', 'drainage_others', 'a1000000-0000-0000-0000-000000000004', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- ELECTIONS Subcategories
-- =====================================================
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Poll Booths and Stations', 'poll_booths', 'a1000000-0000-0000-0000-000000000005', 1),
  ('Enrollment and Voter Roll', 'voter_enrollment', 'a1000000-0000-0000-0000-000000000005', 2),
  ('Opinion and Exit Polls', 'opinion_polls', 'a1000000-0000-0000-0000-000000000005', 3),
  ('Others', 'elections_others', 'a1000000-0000-0000-0000-000000000005', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- ENVIRONMENT Subcategories
-- =====================================================
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Air Quality', 'air_quality', 'a1000000-0000-0000-0000-000000000006', 1),
  ('Trees and Vegetation', 'trees_vegetation', 'a1000000-0000-0000-0000-000000000006', 2),
  ('Others', 'environment_others', 'a1000000-0000-0000-0000-000000000006', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- WATER Subcategories
-- =====================================================
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Water Supply', 'water_supply', 'a1000000-0000-0000-0000-000000000007', 1),
  ('Smell', 'water_smell', 'a1000000-0000-0000-0000-000000000007', 2),
  ('Colour', 'water_colour', 'a1000000-0000-0000-0000-000000000007', 3),
  ('Pipe Leak', 'pipe_leak', 'a1000000-0000-0000-0000-000000000007', 4),
  ('Others', 'water_others', 'a1000000-0000-0000-0000-000000000007', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- BUILDINGS Subcategories
-- =====================================================
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Illegal Construction', 'illegal_construction', 'a1000000-0000-0000-0000-000000000008', 1),
  ('Encroachment', 'encroachment', 'a1000000-0000-0000-0000-000000000008', 2),
  ('Dangerous Building', 'dangerous_building', 'a1000000-0000-0000-0000-000000000008', 3),
  ('Others', 'buildings_others', 'a1000000-0000-0000-0000-000000000008', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- CIVIC ISSUES Subcategories
-- =====================================================
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Loud Noise', 'loud_noise', 'a1000000-0000-0000-0000-000000000009', 1),
  ('Stray Animals', 'stray_animals', 'a1000000-0000-0000-0000-000000000009', 2),
  ('Others', 'civic_issues_others', 'a1000000-0000-0000-0000-000000000009', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- POWER SUPPLY Subcategories
-- =====================================================
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Power Cut', 'power_cut', 'a1000000-0000-0000-0000-000000000010', 1),
  ('Dangling Wire', 'dangling_wire', 'a1000000-0000-0000-0000-000000000010', 2),
  ('Defective Meter', 'defective_meter', 'a1000000-0000-0000-0000-000000000010', 3),
  ('Power Surge', 'power_surge', 'a1000000-0000-0000-0000-000000000010', 4),
  ('Transformer', 'transformer', 'a1000000-0000-0000-0000-000000000010', 5),
  ('Illegal Connection', 'illegal_connection', 'a1000000-0000-0000-0000-000000000010', 6),
  ('Others', 'power_supply_others', 'a1000000-0000-0000-0000-000000000010', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- ROADS, TRAFFIC AND TRANSPORT Subcategories
-- =====================================================
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Road Conditions', 'road_conditions', 'a1000000-0000-0000-0000-000000000011', 1),
  ('Traffic Management', 'traffic_management', 'a1000000-0000-0000-0000-000000000011', 2),
  ('Signals', 'traffic_signals', 'a1000000-0000-0000-0000-000000000011', 3),
  ('Footpaths', 'footpaths', 'a1000000-0000-0000-0000-000000000011', 4),
  ('Signage', 'signage', 'a1000000-0000-0000-0000-000000000011', 5),
  ('Street Lights', 'street_lights', 'a1000000-0000-0000-0000-000000000011', 6),
  ('Others', 'roads_traffic_others', 'a1000000-0000-0000-0000-000000000011', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- SAFETY Subcategories
-- =====================================================
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Children', 'safety_children', 'a1000000-0000-0000-0000-000000000012', 1),
  ('Elders', 'safety_elders', 'a1000000-0000-0000-0000-000000000012', 2),
  ('Roads', 'safety_roads', 'a1000000-0000-0000-0000-000000000012', 3),
  ('Fire', 'safety_fire', 'a1000000-0000-0000-0000-000000000012', 4),
  ('Food', 'safety_food', 'a1000000-0000-0000-0000-000000000012', 5),
  ('Others', 'safety_others', 'a1000000-0000-0000-0000-000000000012', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- SEWAGE Subcategories
-- =====================================================
INSERT INTO issue_categories (name, code, parent_id, display_order) VALUES
  ('Sewage Dumping', 'sewage_dumping', 'a1000000-0000-0000-0000-000000000013', 1),
  ('Drain Overflow', 'drain_overflow', 'a1000000-0000-0000-0000-000000000013', 2),
  ('Water Contamination', 'water_contamination', 'a1000000-0000-0000-0000-000000000013', 3),
  ('Others', 'sewage_others', 'a1000000-0000-0000-0000-000000000013', 99)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- USEFUL QUERIES
-- =====================================================

-- Get all main categories
-- SELECT * FROM issue_categories WHERE parent_id IS NULL ORDER BY display_order;

-- Get subcategories for a specific category
-- SELECT * FROM issue_categories WHERE parent_id = 'a1000000-0000-0000-0000-000000000001' ORDER BY display_order;

-- Get categories with their subcategories (nested)
-- SELECT
--   parent.name as category,
--   child.name as subcategory,
--   child.code
-- FROM issue_categories parent
-- LEFT JOIN issue_categories child ON child.parent_id = parent.id
-- WHERE parent.parent_id IS NULL
-- ORDER BY parent.display_order, child.display_order;
