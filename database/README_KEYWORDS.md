# Add Keywords to Issue Categories

## Overview
This migration adds keywords to all 80 issue categories to enable text matching in the chatbot.

## How to Run

### Option 1: Supabase SQL Editor (Recommended)

1. Go to: https://supabase.com/dashboard/project/abblyaukkoxmgzwretvm/sql
2. Click "New query"
3. Copy the entire contents of `add-category-keywords.sql`
4. Paste into the SQL editor
5. Click "Run"

### Option 2: Node.js Script

```bash
cd /Users/sathya/Documents/GitHub/notf-cms

# Set environment variables
export SUPABASE_URL="https://abblyaukkoxmgzwretvm.supabase.co"
export SUPABASE_SERVICE_KEY="your-service-key-here"

# Run script
node database/add-keywords.js
```

## What This Does

- Adds keywords to 67 subcategories (e.g., "street_lights", "road_conditions")
- Adds keywords to 13 parent categories (e.g., "power_supply", "roads_traffic")
- Enables auto-categorization based on complaint text
- Returns keywords via GET /api/categories endpoint

## Expected Results

After running:
- All categories will have `keywords` arrays populated
- Chatbot can match complaint text to categories automatically
- API will return categories with keywords for the complaint-engine.js

## Verification

Run this query in Supabase SQL editor:

```sql
SELECT code, name, array_length(keywords, 1) as keyword_count
FROM issue_categories
WHERE keywords IS NOT NULL AND array_length(keywords, 1) > 0
ORDER BY name
LIMIT 10;
```

Expected output: 10 categories with keyword_count > 0

## Test API

```bash
curl https://notf-cms.vercel.app/api/categories | jq '.categories[] | select(.code == "street_lights")'
```

Expected output:
```json
{
  "id": "street_lights",
  "uuid": "...",
  "name": "Street Lights",
  "department": "Other",
  "departmentCode": "other",
  "keywords": [
    "street light",
    "streetlight",
    "street lamp",
    "light not working",
    "no light",
    "dark street",
    "lamp",
    "light pole"
  ]
}
```
