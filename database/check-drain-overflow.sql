-- Check if drain_overflow category exists and has keywords
SELECT
    id,
    code,
    name,
    parent_id,
    keywords,
    array_length(keywords, 1) as keyword_count
FROM issue_categories
WHERE code = 'drain_overflow';

-- Check what drain/sewage related categories exist
SELECT
    parent.name as department,
    child.code,
    child.name,
    array_length(child.keywords, 1) as keyword_count
FROM issue_categories parent
LEFT JOIN issue_categories child ON child.parent_id = parent.id
WHERE parent.parent_id IS NULL
  AND child.code LIKE '%drain%'
ORDER BY parent.name, child.code;

-- Check sewage related categories
SELECT
    parent.name as department,
    child.code,
    child.name,
    array_length(child.keywords, 1) as keyword_count
FROM issue_categories parent
LEFT JOIN issue_categories child ON child.parent_id = parent.id
WHERE parent.parent_id IS NULL
  AND child.code LIKE '%sewage%'
ORDER BY parent.name, child.code;
