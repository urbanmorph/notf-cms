-- =====================================================
-- FIX ISSUE_CATEGORIES CONSTRAINTS
-- Resolves 409 conflict error on complaint submission
-- =====================================================
--
-- Problem: Two conflicting unique constraints exist:
-- 1. schema.sql line 120: UNIQUE(department_id, code) - composite
-- 2. seed-categories.sql line 17: UNIQUE(code) - standalone
--
-- The hierarchical categories use parent_id instead of department_id,
-- causing conflicts with the standalone UNIQUE(code) constraint.
--
-- Run this migration in Supabase SQL Editor before re-seeding categories.
-- =====================================================

-- Step 1: Drop the conflicting standalone unique constraint on code
-- This constraint was added in seed-categories.sql and conflicts with hierarchical categories
ALTER TABLE issue_categories DROP CONSTRAINT IF EXISTS issue_categories_code_unique;

-- Step 2: The composite constraint UNIQUE(department_id, code) from schema.sql stays intact
-- This allows:
--   - Same code with different department_id (or NULL)
--   - Hierarchical categories with parent_id and NULL department_id

-- Step 3: Add a partial unique index for main categories (no parent, no department)
-- This ensures main categories have unique codes among themselves
CREATE UNIQUE INDEX IF NOT EXISTS idx_issue_categories_main_code
ON issue_categories(code)
WHERE parent_id IS NULL AND department_id IS NULL;

-- Step 4: Add a partial unique index for subcategories
-- This ensures subcategories have unique codes within the same parent
CREATE UNIQUE INDEX IF NOT EXISTS idx_issue_categories_parent_code
ON issue_categories(parent_id, code)
WHERE parent_id IS NOT NULL;

-- =====================================================
-- VERIFICATION QUERIES (run after migration)
-- =====================================================

-- Check constraints on the table
-- SELECT conname, contype, pg_get_constraintdef(oid)
-- FROM pg_constraint
-- WHERE conrelid = 'issue_categories'::regclass;

-- Check indexes on the table
-- SELECT indexname, indexdef
-- FROM pg_indexes
-- WHERE tablename = 'issue_categories';

-- Verify main categories exist
-- SELECT id, name, code, parent_id, department_id
-- FROM issue_categories
-- WHERE parent_id IS NULL
-- ORDER BY display_order;

-- Verify subcategories exist
-- SELECT c.name as category, s.name as subcategory, s.code
-- FROM issue_categories c
-- JOIN issue_categories s ON s.parent_id = c.id
-- WHERE c.parent_id IS NULL
-- ORDER BY c.display_order, s.display_order;
