-- =====================================================
-- ADD UNIQUE CONSTRAINT ON CODE
-- Required for comprehensive-civic-categories.sql to work
-- =====================================================

-- Drop existing partial indexes if they exist
DROP INDEX IF EXISTS idx_issue_categories_main_code;
DROP INDEX IF EXISTS idx_issue_categories_parent_code;

-- Drop existing constraints that might conflict
ALTER TABLE issue_categories DROP CONSTRAINT IF EXISTS issue_categories_code_unique;
ALTER TABLE issue_categories DROP CONSTRAINT IF EXISTS issue_categories_code_key;

-- Add a simple global unique constraint on code
-- This allows ON CONFLICT (code) to work in INSERT statements
ALTER TABLE issue_categories
ADD CONSTRAINT issue_categories_code_key UNIQUE (code);

-- Verify the constraint was added
SELECT
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as definition
FROM pg_constraint
WHERE conrelid = 'issue_categories'::regclass
AND conname = 'issue_categories_code_key';
