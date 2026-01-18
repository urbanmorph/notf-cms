-- =====================================================
-- ADD MISSING CRITICAL CATEGORIES
-- Simple approach - only adds categories that don't exist
-- =====================================================

-- Add parent_id column if it doesn't exist
ALTER TABLE issue_categories ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES issue_categories(id);
ALTER TABLE issue_categories ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0;

-- =====================================================
-- ADD MISSING PARENT CATEGORIES
-- =====================================================

-- Solid Waste Management (CRITICAL - completely missing!)
INSERT INTO issue_categories (name, code, parent_id, display_order)
SELECT 'Solid Waste Management', 'waste_management', NULL, 6
WHERE NOT EXISTS (SELECT 1 FROM issue_categories WHERE code = 'waste_management');

-- Street Lighting (separate from Roads)
INSERT INTO issue_categories (name, code, parent_id, display_order)
SELECT 'Street Lighting', 'street_lighting', NULL, 2
WHERE NOT EXISTS (SELECT 1 FROM issue_categories WHERE code = 'street_lighting');

-- Health & Sanitation
INSERT INTO issue_categories (name, code, parent_id, display_order)
SELECT 'Health & Sanitation', 'health_sanitation', NULL, 15
WHERE NOT EXISTS (SELECT 1 FROM issue_categories WHERE code = 'health_sanitation');

-- Pest & Animal Control
INSERT INTO issue_categories (name, code, parent_id, display_order)
SELECT 'Pest & Animal Control', 'pest_animal_control', NULL, 16
WHERE NOT EXISTS (SELECT 1 FROM issue_categories WHERE code = 'pest_animal_control');

-- Trees & Forest
INSERT INTO issue_categories (name, code, parent_id, display_order)
SELECT 'Trees & Forest', 'trees_forest', NULL, 17
WHERE NOT EXISTS (SELECT 1 FROM issue_categories WHERE code = 'trees_forest');

-- =====================================================
-- ADD SOLID WASTE MANAGEMENT SUBCATEGORIES
-- =====================================================

INSERT INTO issue_categories (name, code, parent_id, display_order)
SELECT 'Garbage Not Collected', 'garbage_not_collected',
       (SELECT id FROM issue_categories WHERE code = 'waste_management'), 1
WHERE NOT EXISTS (SELECT 1 FROM issue_categories WHERE code = 'garbage_not_collected');

INSERT INTO issue_categories (name, code, parent_id, display_order)
SELECT 'Garbage Dump', 'garbage_dump',
       (SELECT id FROM issue_categories WHERE code = 'waste_management'), 2
WHERE NOT EXISTS (SELECT 1 FROM issue_categories WHERE code = 'garbage_dump');

INSERT INTO issue_categories (name, code, parent_id, display_order)
SELECT 'Overflowing Bin', 'overflowing_bin',
       (SELECT id FROM issue_categories WHERE code = 'waste_management'), 3
WHERE NOT EXISTS (SELECT 1 FROM issue_categories WHERE code = 'overflowing_bin');

INSERT INTO issue_categories (name, code, parent_id, display_order)
SELECT 'Missing Dustbin', 'missing_dustbin',
       (SELECT id FROM issue_categories WHERE code = 'waste_management'), 4
WHERE NOT EXISTS (SELECT 1 FROM issue_categories WHERE code = 'missing_dustbin');

INSERT INTO issue_categories (name, code, parent_id, display_order)
SELECT 'Street Not Cleaned', 'street_not_cleaned',
       (SELECT id FROM issue_categories WHERE code = 'waste_management'), 5
WHERE NOT EXISTS (SELECT 1 FROM issue_categories WHERE code = 'street_not_cleaned');

INSERT INTO issue_categories (name, code, parent_id, display_order)
SELECT 'Construction Debris', 'construction_debris',
       (SELECT id FROM issue_categories WHERE code = 'waste_management'), 6
WHERE NOT EXISTS (SELECT 1 FROM issue_categories WHERE code = 'construction_debris');

INSERT INTO issue_categories (name, code, parent_id, display_order)
SELECT 'Plastic Waste', 'plastic_waste',
       (SELECT id FROM issue_categories WHERE code = 'waste_management'), 7
WHERE NOT EXISTS (SELECT 1 FROM issue_categories WHERE code = 'plastic_waste');

-- =====================================================
-- ADD STREET LIGHTING SUBCATEGORIES
-- =====================================================

INSERT INTO issue_categories (name, code, parent_id, display_order)
SELECT 'Light Not Working', 'light_not_working',
       (SELECT id FROM issue_categories WHERE code = 'street_lighting'), 1
WHERE NOT EXISTS (SELECT 1 FROM issue_categories WHERE code = 'light_not_working');

INSERT INTO issue_categories (name, code, parent_id, display_order)
SELECT 'Light Broken', 'light_broken',
       (SELECT id FROM issue_categories WHERE code = 'street_lighting'), 2
WHERE NOT EXISTS (SELECT 1 FROM issue_categories WHERE code = 'light_broken');

INSERT INTO issue_categories (name, code, parent_id, display_order)
SELECT 'Pole Damaged', 'pole_damaged',
       (SELECT id FROM issue_categories WHERE code = 'street_lighting'), 3
WHERE NOT EXISTS (SELECT 1 FROM issue_categories WHERE code = 'pole_damaged');

INSERT INTO issue_categories (name, code, parent_id, display_order)
SELECT 'Daytime Light On', 'daytime_light',
       (SELECT id FROM issue_categories WHERE code = 'street_lighting'), 4
WHERE NOT EXISTS (SELECT 1 FROM issue_categories WHERE code = 'daytime_light');

-- =====================================================
-- ADD ROADS/TRAFFIC SUBCATEGORIES (Missing)
-- =====================================================

INSERT INTO issue_categories (name, code, parent_id, display_order)
SELECT 'Pothole', 'pothole',
       (SELECT id FROM issue_categories WHERE code = 'roads_traffic'), 1
WHERE NOT EXISTS (SELECT 1 FROM issue_categories WHERE code = 'pothole');

INSERT INTO issue_categories (name, code, parent_id, display_order)
SELECT 'Road Cave-in', 'road_cavein',
       (SELECT id FROM issue_categories WHERE code = 'roads_traffic'), 2
WHERE NOT EXISTS (SELECT 1 FROM issue_categories WHERE code = 'road_cavein');

INSERT INTO issue_categories (name, code, parent_id, display_order)
SELECT 'Footpath Damage', 'footpath_damage',
       (SELECT id FROM issue_categories WHERE code = 'roads_traffic'), 10
WHERE NOT EXISTS (SELECT 1 FROM issue_categories WHERE code = 'footpath_damage');

-- =====================================================
-- ADD PEST & ANIMAL CONTROL SUBCATEGORIES
-- =====================================================

INSERT INTO issue_categories (name, code, parent_id, display_order)
SELECT 'Stray Dogs', 'stray_dogs',
       (SELECT id FROM issue_categories WHERE code = 'pest_animal_control'), 1
WHERE NOT EXISTS (SELECT 1 FROM issue_categories WHERE code = 'stray_dogs');

INSERT INTO issue_categories (name, code, parent_id, display_order)
SELECT 'Mosquito Breeding', 'mosquito_breeding',
       (SELECT id FROM issue_categories WHERE code = 'pest_animal_control'), 2
WHERE NOT EXISTS (SELECT 1 FROM issue_categories WHERE code = 'mosquito_breeding');

INSERT INTO issue_categories (name, code, parent_id, display_order)
SELECT 'Dead Animal', 'dead_animal',
       (SELECT id FROM issue_categories WHERE code = 'pest_animal_control'), 3
WHERE NOT EXISTS (SELECT 1 FROM issue_categories WHERE code = 'dead_animal');

-- =====================================================
-- VERIFY
-- =====================================================

SELECT
  parent.name as department,
  COUNT(child.id) as subcategory_count
FROM issue_categories parent
LEFT JOIN issue_categories child ON child.parent_id = parent.id
WHERE parent.parent_id IS NULL
GROUP BY parent.id, parent.name, parent.display_order
ORDER BY parent.display_order;
