# GBA Admin Dashboard - Setup Guide

## Overview

This is the administrative dashboard for the Greater Bengaluru Authority Complaint Management System. It provides corporation-based admin access for managing civic complaints.

## Features

- **Dashboard**: Real-time stats, charts, and recent complaints
- **Complaint Management**: View, filter, search, and assign complaints
- **ML-Powered Assignment**: Auto-suggest department based on complaint content
- **Officer Performance**: Track individual officer metrics and workload
- **SLA Tracking**: Monitor deadlines, at-risk complaints, and breaches
- **Analytics**: Comprehensive reports and trend analysis
- **Notifications**: Automated email/SMS alerts for status changes

## Setup Instructions

### Step 1: Run Database Schema

1. Go to your Supabase SQL Editor:
   https://supabase.com/dashboard/project/abblyaukkoxmgzwretvm/sql

2. Run the main schema first:
   - Open `database/schema.sql`
   - Copy entire contents
   - Paste in SQL Editor
   - Click **Run**

3. Run the notifications schema:
   - Open `database/notifications-schema.sql`
   - Copy entire contents
   - Paste in SQL Editor
   - Click **Run**

### Step 2: Create Your First Admin User

1. Go to Supabase Authentication > Users
2. Click "Add user" > "Create new user"
3. Enter email and password
4. Note the user's UUID from the list

5. Run this SQL to create the admin record:

```sql
-- Replace 'YOUR-USER-UUID' with the actual UUID from auth.users
-- Choose your corporation: north, south, east, west, central

INSERT INTO admin_users (
    user_id,
    corporation_id,
    role,
    name,
    email,
    is_active
)
SELECT
    'YOUR-USER-UUID'::uuid,
    (SELECT id FROM corporations WHERE code = 'north'),
    'commissioner',
    'Your Name',
    'your-email@example.com',
    true;
```

### Step 3: Test the System

1. Start local server:
   ```bash
   python3 -m http.server 8000
   ```

2. Open admin login:
   http://localhost:8000/admin/login.html

3. Login with your credentials

### Step 4: Configure Email Notifications (Optional)

For actual email delivery, you'll need to:

1. Set up Supabase Edge Functions
2. Configure an email provider (e.g., Resend, SendGrid)
3. Create a function to process `pending_notifications` view

Example Edge Function structure:
```typescript
// supabase/functions/send-notifications/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  // Get pending notifications
  const { data: notifications } = await supabase
    .from('pending_notifications')
    .select('*')
    .limit(10)

  // Process and send each notification
  // ... implementation depends on your email/SMS provider

  return new Response(JSON.stringify({ processed: notifications?.length }))
})
```

## File Structure

```
admin/
├── login.html          # Admin login page
├── dashboard.html      # Main dashboard
├── complaints.html     # Complaints list & management
├── analytics.html      # Analytics & reports
├── officers.html       # Officer performance
├── sla-tracking.html   # SLA monitoring
└── README.md           # This file

js/
├── supabase-config.js  # Supabase client config
├── complaint-form.js   # Citizen complaint form
└── admin/
    ├── dashboard.js    # Dashboard logic
    ├── complaints.js   # Complaints management
    └── analytics.js    # Analytics logic

database/
├── schema.sql              # Main database schema
└── notifications-schema.sql # Notification tables

css/
└── admin.css           # Admin dashboard styles
```

## User Roles

| Role | Access Level |
|------|-------------|
| `super_admin` | Full access to all corporations |
| `commissioner` | Full access to their corporation |
| `zone_officer` | Access to their zone within corporation |
| `department_head` | Access to their department's complaints |
| `field_officer` | View assigned complaints only |

## API Credentials

```
SUPABASE_URL=https://abblyaukkoxmgzwretvm.supabase.co
SUPABASE_ANON_KEY=sb_publishable_I1nVJvhGbNwAgSiypEq1gg_KkMaKtar
```

## Public Pages

- **Track Complaint**: `/track.html?id=COMPLAINT-NUMBER`
- Allows citizens to check status without logging in

## Support

For issues, create a GitHub issue or contact the development team.
