# Layout Changes & Data Source Setup

## Changes Deployed ✅

### 1. Rankings Moved Below Hero
**Before**: Rankings → Hero → Features
**After**: Hero → Rankings → Features

**Rationale**: Hero section introduces the platform, then rankings show performance

### 2. Floating Buttons Removed from Homepage
**Removed from index.html**:
- Complaint button
- WhatsApp button  
- Telegram button
- Complaint modal

**Still present on all corporation pages**:
- north.html
- south.html
- east.html
- west.html
- central.html

**Rationale**: Complaints should be corporation-specific, not general

---

## Data Attribution - BBMP Grievances Data

### Source
**OpenCity.in - BBMP Grievances Data**
https://data.opencity.in/dataset/bbmp-grievances-data

### Available Data
6 years of ward-level grievances data:
- 2020 (Feb 8 onwards)
- 2021
- 2022
- 2023
- 2024
- 2025 (until June 19, 2025)

### Data Download Required

Due to rate limiting, the CSV files need to be manually downloaded:

#### Download Links:
1. **2020**: https://data.opencity.in/dataset/54344a76-a37a-4d05-961c-df9bac5494ad/resource/58808356-4b0a-4b02-9d70-75993b4dcd1c/download/413fa9ec-8d06-4ecb-884e-1436c5a0f5dd.csv

2. **2021**: https://data.opencity.in/dataset/54344a76-a37a-4d05-961c-df9bac5494ad/resource/bada528d-f4f5-4ace-9dd1-8ac459fe350b/download/9e7e6892-06b6-4fdc-967a-e4787562f155.csv

3. **2022**: https://data.opencity.in/dataset/54344a76-a37a-4d05-961c-df9bac5494ad/resource/e44f1808-4923-4390-b62c-710d19ab876b/download/b4dd8dd1-1628-4f35-9247-ef5afaad214d.csv

4. **2023**: https://data.opencity.in/dataset/54344a76-a37a-4d05-961c-df9bac5494ad/resource/fae120ab-d95c-4281-aa86-5bf694712472/download/d4419a76-e2af-44b3-aa25-369c85126f0f.csv

5. **2024**: https://data.opencity.in/dataset/54344a76-a37a-4d05-961c-df9bac5494ad/resource/2a3f29ef-a7a1-4fc3-b125-cbcc958a89d1/download/82f88d50-71c5-4203-92ac-5ccb5cabc7a2.csv

6. **2025**: https://data.opencity.in/dataset/54344a76-a37a-4d05-961c-df9bac5494ad/resource/1342a93b-9a61-4766-9c34-c8357b7926c2/download/b0d6e9ff-5eef-48bf-ba86-985dbe8112d1.csv

#### Suggested Folder Structure:
```
/Users/sathya/Documents/GitHub/notf-cms/
  └── data/
      └── bbmp-grievances/
          ├── 2020.csv
          ├── 2021.csv
          ├── 2022.csv
          ├── 2023.csv
          ├── 2024.csv
          └── 2025.csv
```

---

## Next Steps After Data Download

Once CSV files are downloaded, I will:

### 1. Analyze the Data
- Load all 6 CSV files
- Understand data structure (columns, categories)
- Identify corporation/ward mappings
- Calculate aggregate statistics

### 2. Generate Real Statistics
Replace mock data with actual metrics:
- **Total Issues**: Sum across all years
- **Resolution Rate**: Calculate from status columns
- **Open Issues**: Count current open issues
- **Response Times**: Calculate from date columns
- **Corporation Breakdown**: Map wards to 5 corporations

### 3. Update Platform
- Replace data.js with real statistics
- Add data source attribution
- Create data update timestamp
- Generate corporation-specific stats

### 4. Add Attribution
Add footer/disclaimer:
```
Data Source: BBMP Grievances Data (2020-2025)
Provided by OpenCity.in
Last Updated: [Date]
```

---

## Expected Metrics from Data

### What We'll Calculate:
1. **Total Grievances Filed** (2020-2025)
2. **Grievances by Corporation** (based on ward mapping)
3. **Grievances by Category** (electrical, water, roads, etc.)
4. **Year-over-Year Trends**
5. **Average Resolution Time** (if status/dates available)
6. **Current Open vs Closed**
7. **Peak Filing Times/Seasons**
8. **Top Issue Categories per Corporation**

### What We'll Display:
- Homepage: Overall BBMP statistics
- Corporation Pages: Corporation-specific breakdowns
- Rankings: Based on actual resolution rates
- Data source attribution on all pages

---

## Current Status

✅ Rankings moved below hero
✅ Floating buttons removed from homepage
✅ Data source identified
⏳ Awaiting CSV file downloads
⏳ Data analysis pending
⏳ Statistics update pending
⏳ Attribution pending

---

## Live Site
**https://urbanmorph.github.io/notf-cms/**

Layout changes are deployed and live!
