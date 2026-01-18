# Populate Keywords for Issue Categories

## Overview

This migration adds search keywords to all 304 issue categories, enabling the chatbot to use the full database instead of hardcoded fallback categories.

## Prerequisites

- You must have already run `load-all-comprehensive-categories.sql` (304 categories loaded)
- Supabase SQL Editor access

## Installation

### Run the keyword population script

1. Open Supabase SQL Editor
2. Copy and paste the contents of `populate-category-keywords.sql`
3. Click "Run" or press Cmd/Ctrl + Enter
4. Verify results at the end (shows categories with keywords)

**Expected output:**
```
categories_with_keywords: 270+
categories_without_keywords: 0-30
total_categories: 300+
```

## How Keywords Work

### Before (Hardcoded Fallback)
```javascript
// chatbot has ~25 hardcoded categories with keywords
{
    id: 'sewage_dumping',
    name: 'Sewage Dumping',
    keywords: ['sewage', 'sewage dump', 'sewage leak', 'sewage smell']
}
```

### After (Database-Driven)
```sql
-- All 304 categories in database have keywords
UPDATE issue_categories
SET keywords = ARRAY['sewage', 'sewage overflow', 'sewage spill']
WHERE code = 'sewage_overflow';
```

## Benefits

✅ **Use all 304 categories** - Not limited to 25 hardcoded ones
✅ **Centralized management** - Update keywords in database, not code
✅ **Better matching** - More categories = better categorization
✅ **No code changes needed** - Chatbot automatically uses database keywords

## Verification

### Check keyword coverage by department

```sql
SELECT
    parent.name as department,
    COUNT(child.id) as total_categories,
    COUNT(child.keywords) FILTER (WHERE array_length(child.keywords, 1) > 0) as with_keywords
FROM issue_categories parent
LEFT JOIN issue_categories child ON child.parent_id = parent.id
WHERE parent.parent_id IS NULL
GROUP BY parent.id, parent.name, parent.display_order
ORDER BY parent.display_order;
```

### Test a specific category

```sql
SELECT code, name, keywords
FROM issue_categories
WHERE code = 'sewage_overflow';
```

**Expected:**
```
code: sewage_overflow
name: Sewage Overflow
keywords: {sewage, sewage overflow, sewage spill, sewage on road}
```

## Testing the Chatbot

After running the migration:

1. **Hard refresh the chatbot page** (Cmd+Shift+R / Ctrl+Shift+R)
2. **Open browser console** (F12)
3. **Look for initialization messages:**
   ```
   [ComplaintEngine] Loaded 270+ categories from API with keywords
   [ComplaintEngine] Total categories: 270+
   ```
4. **Test complaint categorization:**
   - Enter: "sewage overflowing near my house"
   - Should match: `sewage_overflow` (not `sewage_dumping`)

## Keyword Strategy

### Primary Keywords (Exact Match)
- Issue name words (e.g., "pothole" → "pothole")
- Common synonyms (e.g., "garbage" → "waste", "rubbish", "trash")
- Action verbs (e.g., "not collected", "overflowing", "broken")

### Secondary Keywords (Context)
- Related terms (e.g., "sewage" → "manhole", "drainage")
- Location indicators (e.g., "street light" → "lamp", "pole")
- Consequence descriptions (e.g., "mosquito breeding" → "dengue", "malaria")

### Keyword Length
- 1-word: Common terms (e.g., "pothole", "garbage")
- 2-word: Specific phrases (e.g., "sewage overflow", "street light")
- 3-word: Very specific (e.g., "light not working", "garbage not collected")

## Adding Keywords to New Categories

If you add new categories, populate keywords with:

```sql
UPDATE issue_categories
SET keywords = ARRAY[
    'primary term',
    'synonym 1',
    'synonym 2',
    'specific phrase',
    'related term'
]
WHERE code = 'your_category_code';
```

## Troubleshooting

### Issue: Chatbot still using hardcoded categories

**Solution:**
1. Hard refresh page (clear cache)
2. Check console for: `[ComplaintEngine] Loaded X categories from API with keywords`
3. If X = 0, keywords not populated - re-run SQL
4. Check API endpoint: `https://notf-cms.vercel.app/api/categories`

### Issue: Wrong category being matched

**Solution:**
1. Check current keywords:
   ```sql
   SELECT code, name, keywords FROM issue_categories WHERE code = 'category_code';
   ```
2. Update keywords to be more specific:
   ```sql
   UPDATE issue_categories
   SET keywords = ARRAY['more', 'specific', 'keywords']
   WHERE code = 'category_code';
   ```

### Issue: API returning empty keywords

**Solution:**
- API caches for a few minutes - wait 5 minutes or redeploy
- Check database directly:
  ```sql
  SELECT COUNT(*) FROM issue_categories WHERE keywords IS NOT NULL;
  ```

## Maintenance

### Update keywords as needed
```sql
-- Add a new keyword to existing array
UPDATE issue_categories
SET keywords = keywords || ARRAY['new keyword']
WHERE code = 'category_code';

-- Replace all keywords
UPDATE issue_categories
SET keywords = ARRAY['keyword1', 'keyword2', 'keyword3']
WHERE code = 'category_code';
```

### Remove a keyword
```sql
UPDATE issue_categories
SET keywords = array_remove(keywords, 'old keyword')
WHERE code = 'category_code';
```

## Next Steps

After populating keywords:

1. ✅ Run `populate-category-keywords.sql`
2. ✅ Verify keywords with queries above
3. ✅ Test chatbot with hard refresh
4. ✅ Submit test complaints
5. ⏭️ Monitor categorization accuracy
6. ⏭️ Refine keywords based on real usage

## Related Files

- `load-all-comprehensive-categories.sql` - Loads 304 categories (run first)
- `populate-category-keywords.sql` - Populates keywords (this migration)
- `/website/public/assets/chat/complaint-engine.js` - Chatbot code (uses keywords)
- `/api/categories.js` - API endpoint (returns keywords)
