-- =====================================================
-- ADD MULTI-CITY SUPPORT TO COMPLAINT MANAGEMENT SYSTEM
-- Migration: Add 11 new cities + metadata support
-- Date: 2026-01-18
-- =====================================================

-- =====================================================
-- 1. ADD METADATA COLUMNS TO CORPORATIONS TABLE
-- =====================================================

-- Add city and state columns if they don't exist
ALTER TABLE corporations
ADD COLUMN IF NOT EXISTS city VARCHAR(100),
ADD COLUMN IF NOT EXISTS state VARCHAR(100),
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

-- Update existing Bengaluru corporations with metadata
UPDATE corporations
SET
    city = 'Bengaluru',
    state = 'Karnataka',
    metadata = jsonb_build_object(
        'has_boundaries', true,
        'ward_file', 'gba-369-wards-december-2025.kml',
        'boundary_file', 'gba_corporation.geojson'
    )
WHERE code IN ('north', 'south', 'east', 'west', 'central');

-- =====================================================
-- 2. ADD METADATA COLUMN TO COMPLAINTS TABLE
-- =====================================================

-- Add metadata column to complaints for storing auto-tagging info
ALTER TABLE complaints
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

-- Create index for metadata queries
CREATE INDEX IF NOT EXISTS idx_complaints_metadata ON complaints USING GIN (metadata);

-- =====================================================
-- 3. INSERT 11 NEW CITY CORPORATIONS
-- =====================================================

-- Insert new cities (all have ward boundaries available)
INSERT INTO corporations (code, name, short_name, city, state, metadata) VALUES
    ('ahmedabad', 'Ahmedabad Municipal Corporation', 'Ahmedabad', 'Ahmedabad', 'Gujarat',
        '{"has_boundaries": true, "ward_file": "ahmedabad-wards.kml"}'),

    ('bhubaneswar', 'Bhubaneswar Municipal Corporation', 'Bhubaneswar', 'Bhubaneswar', 'Odisha',
        '{"has_boundaries": true, "ward_file": "bhubaneshwar-wards.kml"}'),

    ('chennai', 'Chennai Municipal Corporation', 'Chennai', 'Chennai', 'Tamil Nadu',
        '{"has_boundaries": true, "ward_file": "chennai-wards.kml"}'),

    ('gurugram', 'Gurugram Municipal Corporation', 'Gurugram', 'Gurugram', 'Haryana',
        '{"has_boundaries": true, "ward_file": "gurugram-wards.kml"}'),

    ('hyderabad', 'Hyderabad Municipal Corporation', 'Hyderabad', 'Hyderabad', 'Telangana',
        '{"has_boundaries": true, "ward_file": "hyderabad-wards.kml"}'),

    ('jaipur', 'Jaipur Municipal Corporation', 'Jaipur', 'Jaipur', 'Rajasthan',
        '{"has_boundaries": true, "ward_file": "jaipur-wards.kml"}'),

    ('kolkata', 'Kolkata Municipal Corporation', 'Kolkata', 'Kolkata', 'West Bengal',
        '{"has_boundaries": true, "ward_file": "kolkata-wards.kml"}'),

    ('mumbai', 'Mumbai Municipal Corporation', 'Mumbai', 'Mumbai', 'Maharashtra',
        '{"has_boundaries": true, "ward_file": "mumbai-wards.kml"}'),

    ('pune', 'Pune Municipal Corporation', 'Pune', 'Pune', 'Maharashtra',
        '{"has_boundaries": true, "ward_file": "pune-wards.kml"}'),

    ('thane', 'Thane Municipal Corporation', 'Thane', 'Thane', 'Maharashtra',
        '{"has_boundaries": true, "ward_file": "thane-wards.kml"}'),

    ('visakhapatnam', 'Visakhapatnam Municipal Corporation', 'Vizag', 'Visakhapatnam', 'Andhra Pradesh',
        '{"has_boundaries": true, "ward_file": "vizag-wards.kml"}')
ON CONFLICT (code) DO UPDATE SET
    city = EXCLUDED.city,
    state = EXCLUDED.state,
    metadata = EXCLUDED.metadata;

-- Insert unassigned fallback if not exists
INSERT INTO corporations (code, name, short_name, city, state, metadata) VALUES
    ('unassigned', 'Unassigned Corporation', 'Unassigned', NULL, NULL,
        '{"has_boundaries": false}')
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- 4. UPDATE COMPLAINT NUMBER GENERATION FOR MULTI-CITY
-- =====================================================

-- Drop existing function and trigger
DROP TRIGGER IF EXISTS set_complaint_number ON complaints;
DROP FUNCTION IF EXISTS generate_complaint_number();

-- Create improved function that handles multi-city ticket numbers
CREATE OR REPLACE FUNCTION generate_complaint_number()
RETURNS TRIGGER AS $$
DECLARE
    corp_code VARCHAR(10);
    year_code VARCHAR(2);
    seq_num INTEGER;
    corp_city VARCHAR(100);
BEGIN
    -- Get corporation code and city
    SELECT code, city INTO corp_code, corp_city
    FROM corporations WHERE id = NEW.corporation_id;

    IF corp_code IS NULL THEN
        corp_code := 'GEN';
    ELSE
        -- For Bengaluru, use 3-letter corp code (NOR, SOU, EAS, WES, CEN)
        -- For other cities, use city code (MUM, DEL, CHE, etc.)
        IF corp_city = 'Bengaluru' THEN
            corp_code := UPPER(SUBSTRING(corp_code, 1, 3));
        ELSE
            -- Use first 3 letters of city/corp code
            corp_code := UPPER(SUBSTRING(corp_code, 1, 3));
        END IF;
    END IF;

    -- Get year code
    year_code := TO_CHAR(NOW(), 'YY');

    -- Get sequence number for this corporation and year
    SELECT COALESCE(MAX(
        CAST(SUBSTRING(complaint_number FROM '[0-9]+$') AS INTEGER)
    ), 0) + 1 INTO seq_num
    FROM complaints
    WHERE complaint_number LIKE corp_code || '-' || year_code || '-%';

    -- Generate complaint number: NOR-26-000001 or MUM-26-000001
    NEW.complaint_number := corp_code || '-' || year_code || '-' || LPAD(seq_num::TEXT, 6, '0');

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate trigger
CREATE TRIGGER set_complaint_number
    BEFORE INSERT ON complaints
    FOR EACH ROW
    WHEN (NEW.complaint_number IS NULL)
    EXECUTE FUNCTION generate_complaint_number();

-- =====================================================
-- 5. CREATE VIEW FOR CORPORATION LOOKUP
-- =====================================================

CREATE OR REPLACE VIEW corporation_lookup AS
SELECT
    id,
    code,
    name,
    short_name,
    city,
    state,
    metadata,
    (metadata->>'has_boundaries')::boolean as has_boundaries,
    metadata->>'ward_file' as ward_file,
    metadata->>'boundary_file' as boundary_file,
    CASE
        WHEN city = 'Bengaluru' THEN 'bengaluru_corporation'
        WHEN metadata->>'has_boundaries' = 'true' THEN 'city_generic'
        ELSE 'unassigned'
    END as corporation_type,
    created_at,
    updated_at
FROM corporations
ORDER BY
    CASE
        WHEN city = 'Bengaluru' THEN 1
        WHEN code = 'unassigned' THEN 3
        ELSE 2
    END,
    name;

-- =====================================================
-- 6. VERIFICATION QUERIES
-- =====================================================

-- Query to verify all corporations
-- SELECT * FROM corporation_lookup;

-- Count by type
-- SELECT corporation_type, COUNT(*) FROM corporation_lookup GROUP BY corporation_type;

-- =====================================================
-- ROLLBACK SCRIPT (if needed)
-- =====================================================

/*
-- To rollback this migration:

-- Delete new corporations
DELETE FROM corporations
WHERE code IN (
    'ahmedabad', 'bhubaneswar', 'chennai', 'gurugram', 'hyderabad',
    'jaipur', 'kolkata', 'mumbai', 'pune', 'thane', 'visakhapatnam',
    'unassigned'
);

-- Remove metadata columns
ALTER TABLE corporations
DROP COLUMN IF EXISTS city,
DROP COLUMN IF EXISTS state,
DROP COLUMN IF EXISTS metadata;

ALTER TABLE complaints
DROP COLUMN IF EXISTS metadata;

-- Restore original complaint number function (see schema.sql)
*/

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================
