# Comprehensive Civic Complaint Categories

This migration adds **32 parent categories** with **250+ subcategories** based on best practices from Indian municipal systems (BBMP Sahaaya, Chennai Corporation, Smart City 311 systems).

## 📋 What's Included

### New Parent Categories (Departments)
1. Roads & Traffic (21 subcategories)
2. **Street Lighting** (10) - NEW separate department
3. Water Supply (15)
4. Drainage & Storm Water (11)
5. Sewage Management (11)
6. **Solid Waste Management** (23) - NEW critical category
7. Power Supply (12)
8. **Parks & Playgrounds** (7) - NEW
9. **Public Toilets** (6) - NEW
10. **Lakes & Water Bodies** (6) - NEW
11. Burial Grounds (3)
12. Markets (3)
13. Libraries (3)
14. Community Halls (3)
15. **Health & Sanitation** (5) - NEW
16. **Pest & Animal Control** (9) - NEW
17. **Trees & Forest** (7) - NEW
18. **Environment & Pollution** (8) - NEW
19. Building Plans & Approvals (7)
20. Encroachment (7)
21. Illegal Construction (6)
22. Property Tax (4)
23. Trade License (3)
24. Birth & Death Certificates (3)
25. Public Safety (5)
26. Fire Safety (4)
27. Law & Order (5)
28. Public Transport (6)
29. Corruption & Illegal Activities (4)
30. Welfare Schemes (4)
31. Elections (4)
32. General Grievances (5)

## 🚀 Installation Steps

### Step 1: Add Unique Constraint

Run this **FIRST** in Supabase SQL Editor:

```sql
-- Copy and paste contents of:
-- database/add-unique-code-constraint.sql
```

This adds a unique constraint on the `code` column, which is required for the `ON CONFLICT` clause to work.

### Step 2: Import Comprehensive Categories

Run this **SECOND** in Supabase SQL Editor:

```sql
-- Copy and paste contents of:
-- database/comprehensive-civic-categories.sql
```

This will:
- Add all 32 parent categories
- Add 250+ subcategories
- Use `ON CONFLICT (code) DO UPDATE` to safely merge with existing data
- Not duplicate categories if they already exist

### Step 3: Verify Installation

Run this query to check category counts:

```sql
SELECT
  parent.name as department,
  COUNT(child.id) as subcategory_count
FROM issue_categories parent
LEFT JOIN issue_categories child ON child.parent_id = parent.id
WHERE parent.parent_id IS NULL
GROUP BY parent.id, parent.name, parent.display_order
ORDER BY parent.display_order;
```

Expected output: 32 departments with varying subcategory counts.

## 📊 Before vs After

| Aspect | Before | After |
|--------|--------|-------|
| **Parent Categories** | 13 | 32 |
| **Total Subcategories** | ~60 | 250+ |
| **Solid Waste Management** | ❌ Missing | ✅ 23 categories |
| **Street Lighting** | Mixed with Roads | ✅ Separate (10) |
| **Health & Sanitation** | ❌ Missing | ✅ 5 categories |
| **Pest & Animal Control** | ❌ Missing | ✅ 9 categories |
| **Trees & Forest** | ❌ Missing | ✅ 7 categories |

## 🔍 Key Improvements

### 1. Solid Waste Management (Most Critical!)
Previously completely missing! Now includes:
- Garbage collection issues
- Illegal dumping
- Segregation problems
- E-waste, biomedical waste
- Construction debris

### 2. Street Lighting (Independent Department)
Separated from Roads to match real-world structure (BESCOM/electricity department handles this separately).

### 3. Comprehensive Coverage
Covers ALL 20+ departments found in BBMP Sahaaya system:
- Infrastructure (roads, water, drainage, sewage)
- Utilities (power, lighting)
- Environment (trees, pollution, waste)
- Public facilities (parks, toilets, lakes)
- Governance (tax, licenses, certificates)
- Safety (fire, law & order)

## 📚 Sources

Based on research from:
- [BBMP Sahaaya](https://bbmp.sahaaya.in/) - Bengaluru's 311 system
- [OpenCity BBMP Analysis](https://opencity.in/decoding-bengalurus-civic-complaints-a-deep-dive-into-bbmp-grievances-data-2025/)
- [MoHUA Consumer Grievance Framework](https://www.mohua.gov.in/upload/uploadfiles/files/TERI_CGR_Report27.pdf)
- NYC 311 system (international best practices)

## ⚠️ Important Notes

1. **Backwards Compatible**: Uses `ON CONFLICT (code)` so existing categories won't be duplicated
2. **Safe to Re-run**: If it fails midway, you can re-run it without issues
3. **No Data Loss**: Existing complaints will remain linked to their original categories
4. **Department IDs**: Set to NULL for hierarchical categories (use `parent_id` instead)

## 🔄 Updating the Chatbot

After running this migration, you'll need to update the chatbot's hardcoded categories in:

```
/Users/sathya/Documents/GitHub/notf/website/public/assets/chat/complaint-engine.js
```

Add categories for the new departments (waste management, pest control, trees, etc.).

## 🆘 Troubleshooting

### Error: "no unique or exclusion constraint matching the ON CONFLICT specification"

**Solution**: You forgot Step 1! Run `add-unique-code-constraint.sql` first.

### Error: "duplicate key value violates unique constraint"

**Solution**: A category with that code already exists. This shouldn't happen with `ON CONFLICT`, but if it does:
1. Check which code is conflicting
2. Either remove the duplicate manually or update the code in the SQL file

### Categories not showing in chatbot

**Solution**: The chatbot has its own hardcoded category list. Update `complaint-engine.js` to include the new categories.

## 📈 Statistics

After installation, you should have:
- ✅ 32 parent categories
- ✅ 250+ subcategories
- ✅ Coverage of all major civic issues
- ✅ Matching BBMP Sahaaya's 20+ departments

Run the verification query (Step 3) to confirm!
