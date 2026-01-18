-- =====================================================
-- FIND CATEGORIES WITHOUT KEYWORDS
-- Run this in Supabase to identify which 69 categories are missing
-- =====================================================

-- List all categories without keywords
SELECT
    parent.name as department,
    child.code,
    child.name,
    child.keywords
FROM issue_categories parent
LEFT JOIN issue_categories child ON child.parent_id = parent.id
WHERE parent.parent_id IS NULL
  AND child.id IS NOT NULL
  AND (child.keywords IS NULL OR array_length(child.keywords, 1) = 0)
ORDER BY parent.display_order, child.display_order;

-- Count by department
SELECT
    parent.name as department,
    COUNT(child.id) FILTER (WHERE child.keywords IS NULL OR array_length(child.keywords, 1) = 0) as missing_keywords,
    COUNT(child.id) as total_categories
FROM issue_categories parent
LEFT JOIN issue_categories child ON child.parent_id = parent.id
WHERE parent.parent_id IS NULL
GROUP BY parent.id, parent.name, parent.display_order
HAVING COUNT(child.id) FILTER (WHERE child.keywords IS NULL OR array_length(child.keywords, 1) = 0) > 0
ORDER BY parent.display_order;
