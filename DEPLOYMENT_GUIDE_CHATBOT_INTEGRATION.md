# NOTF Chatbot Integration - Deployment Guide
## Phase A: Backend API Preparation

---

## Overview

This guide outlines the deployment steps for integrating the NOTF chatbot with the notf-cms complaint submission API. All backend changes have been completed and are ready for deployment.

---

## Files Changed

### 1. Database Migration
**File:** `/database/add-multi-city-support.sql`

**Changes:**
- Adds `city`, `state`, and `metadata` columns to `corporations` table
- Adds `metadata` JSONB column to `complaints` table
- Inserts 11 new city corporations (Ahmedabad, Bhubaneswar, Chennai, Gurugram, Hyderabad, Jaipur, Kolkata, Mumbai, Pune, Thane, Visakhapatnam)
- Updates complaint number generation function to handle multi-city ticket numbers
- Creates `corporation_lookup` view for easy querying

### 2. API Endpoint Update
**File:** `/api/submit-complaint.js`

**Changes:**
- **CORS Restriction:** Limited to specific origins (`notf.vercel.app`, `notf-one.vercel.app`, `notf-cms.vercel.app`, localhost)
- **Metadata Support:** Accepts and stores `metadata` field from requests
- **Source Tracking:** Auto-detects complaint source (notf-chatbot vs. notf-cms-chatbot)
- **Security:** Reduced allowed methods to POST and OPTIONS only

---

## Deployment Steps

### Step 1: Run Database Migration

**Connect to Supabase:**

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/abblyaukkoxmgzwretvm)
2. Navigate to **SQL Editor**
3. Create a new query
4. Copy the entire contents of `/database/add-multi-city-support.sql`
5. Paste into SQL Editor
6. Click **Run**

**Verification:**
```sql
-- Verify corporations were added
SELECT * FROM corporation_lookup ORDER BY city;

-- Should return 17 rows:
-- - 5 Bengaluru corporations (north, south, east, west, central)
-- - 11 other cities (ahmedabad, bhubaneswar, chennai, gurugram, hyderabad, jaipur, kolkata, mumbai, pune, thane, visakhapatnam)
-- - 1 unassigned

-- Verify metadata column exists
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'complaints' AND column_name = 'metadata';

-- Should return: metadata | jsonb
```

### Step 2: Deploy API Changes

**Option A: Automatic Deployment (Recommended)**

notf-cms is connected to Vercel for automatic deployments:

```bash
cd /Users/sathya/Documents/GitHub/notf-cms
git add api/submit-complaint.js
git add database/add-multi-city-support.sql
git add DEPLOYMENT_GUIDE_CHATBOT_INTEGRATION.md
git commit -m "Add NOTF chatbot integration support

- Add CORS restrictions for security
- Add metadata field support for auto-tagging
- Add source tracking (notf-chatbot vs notf-cms-chatbot)
- Add 11 new city corporations to database
- Update ticket number generation for multi-city support"

git push origin main
```

Vercel will automatically deploy the changes.

**Option B: Manual Deployment**

If automatic deployment is not configured:

```bash
cd /Users/sathya/Documents/GitHub/notf-cms
vercel --prod
```

### Step 3: Verify Deployment

**Check API Endpoint:**

```bash
# Test CORS from allowed origin
curl -X POST https://notf-cms.vercel.app/api/submit-complaint \
  -H "Content-Type: application/json" \
  -H "Origin: https://notf.vercel.app" \
  -d '{
    "description": "Test complaint for deployment verification",
    "address": "Test Address, Bengaluru",
    "citizen_phone": "9876543210",
    "corporation_id": "north",
    "metadata": {
      "source": "deployment-test",
      "test": true
    }
  }'

# Expected Response:
# {
#   "success": true,
#   "complaint": { ... },
#   "message": "Complaint submitted successfully. Ticket: NOR-26-XXXXXX"
# }
```

**Verify Metadata Storage:**

```sql
-- In Supabase SQL Editor
SELECT
    complaint_number,
    metadata->>'source' as source,
    metadata->>'original_city' as city,
    metadata
FROM complaints
WHERE metadata->>'source' = 'deployment-test'
ORDER BY created_at DESC
LIMIT 1;

-- Should return the test complaint with metadata
```

### Step 4: Test All Corporation Codes

```bash
# Test Bengaluru corporation
curl -X POST https://notf-cms.vercel.app/api/submit-complaint \
  -H "Content-Type: application/json" \
  -H "Origin: https://notf.vercel.app" \
  -d '{"description": "Test Bengaluru North", "address": "Test", "citizen_phone": "9876543210", "corporation_id": "north"}'

# Test new city corporation (Mumbai)
curl -X POST https://notf-cms.vercel.app/api/submit-complaint \
  -H "Content-Type: application/json" \
  -H "Origin: https://notf.vercel.app" \
  -d '{"description": "Test Mumbai", "address": "Test", "citizen_phone": "9876543210", "corporation_id": "mumbai"}'

# Test new city corporation (Ahmedabad)
curl -X POST https://notf-cms.vercel.app/api/submit-complaint \
  -H "Content-Type: application/json" \
  -H "Origin: https://notf.vercel.app" \
  -d '{"description": "Test Ahmedabad", "address": "Test", "citizen_phone": "9876543210", "corporation_id": "ahmedabad"}'
```

**Expected Ticket Numbers:**
- Bengaluru North: `NOR-26-XXXXXX`
- Mumbai: `MUM-26-XXXXXX`
- Ahmedabad: `AHM-26-XXXXXX`

### Step 5: Test CORS Restrictions

```bash
# Test from allowed origin - should succeed
curl -X POST https://notf-cms.vercel.app/api/submit-complaint \
  -H "Content-Type: application/json" \
  -H "Origin: https://notf.vercel.app" \
  -d '{"description": "Test from notf.vercel.app", "address": "Test", "citizen_phone": "9876543210", "corporation_id": "north"}'

# Test from disallowed origin - should fail or not set CORS header
curl -X POST https://notf-cms.vercel.app/api/submit-complaint \
  -H "Content-Type: application/json" \
  -H "Origin: https://malicious-site.com" \
  -d '{"description": "Test from malicious site", "address": "Test", "citizen_phone": "9876543210", "corporation_id": "north"}'

# Check response headers - should NOT include Access-Control-Allow-Origin for malicious-site.com
```

---

## Rollback Plan

If issues occur after deployment:

### Rollback Database Changes

```sql
-- Delete new corporations (keep Bengaluru + unassigned)
DELETE FROM corporations
WHERE code IN (
    'ahmedabad', 'bhubaneswar', 'chennai', 'gurugram', 'hyderabad',
    'jaipur', 'kolkata', 'mumbai', 'pune', 'thane', 'visakhapatnam'
);

-- Remove metadata columns
ALTER TABLE corporations
DROP COLUMN IF EXISTS city,
DROP COLUMN IF EXISTS state,
DROP COLUMN IF EXISTS metadata;

ALTER TABLE complaints
DROP COLUMN IF EXISTS metadata;

-- Restore original complaint number function
-- (See original schema.sql)
```

### Rollback API Changes

```bash
cd /Users/sathya/Documents/GitHub/notf-cms
git revert HEAD
git push origin main
```

---

## Environment Variables

**Verify these are set in Vercel Dashboard:**

- `SUPABASE_URL`: `https://abblyaukkoxmgzwretvm.supabase.co`
- `SUPABASE_SERVICE_KEY`: (admin key - hidden)

**No new environment variables needed.**

---

## Post-Deployment Checklist

- [ ] Database migration executed successfully
- [ ] 17 corporations exist in database (5 Bengaluru + 11 cities + 1 unassigned)
- [ ] `metadata` column exists on `complaints` table
- [ ] API endpoint deployed to Vercel
- [ ] Test complaint submitted successfully
- [ ] Ticket number generated correctly (e.g., `NOR-26-000001`)
- [ ] Metadata stored in database
- [ ] CORS headers restricted to allowed origins
- [ ] Source tracking works (detects `notf-chatbot` vs `notf-cms-chatbot`)
- [ ] All 12 city corporation codes work (test at least 3)
- [ ] Invalid corporation code returns error
- [ ] Validation errors still work (description too short, missing contact)

---

## Known Issues & Limitations

**None currently.**

---

## Next Steps

After Phase A deployment is verified:

1. **Phase B:** Test API with comprehensive test cases
2. **Phase C:** Build NOTF chatbot frontend
3. **Integration:** Connect chatbot to API
4. **Production Launch:** Deploy chatbot to notf.vercel.app

---

## Support

**Questions or issues?**

- Check Vercel deployment logs: [notf-cms Vercel Dashboard](https://vercel.com/dashboard)
- Check Supabase logs: [Supabase Dashboard](https://supabase.com/dashboard/project/abblyaukkoxmgzwretvm)
- Review API code: `/api/submit-complaint.js`
- Review database schema: `/database/add-multi-city-support.sql`

---

**Deployment Date:** 2026-01-18
**Version:** Phase A - Backend API Preparation
**Status:** Ready for deployment
