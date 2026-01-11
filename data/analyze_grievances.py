#!/usr/bin/env python3
import pandas as pd
import json
from collections import Counter

# Load all CSV files
data_dir = '/Users/sathya/Documents/GitHub/notf-cms/data/bbmp-grievances/'
years = ['2020', '2021', '2022', '2023', '2024', '2025']

dfs = []
for year in years:
    filepath = f"{data_dir}{year}.csv"
    df = pd.read_csv(filepath)
    df['Year'] = year
    dfs.append(df)

all_data = pd.concat(dfs, ignore_index=True)

print("="*70)
print("BBMP GRIEVANCES DATA ANALYSIS (2020-2025)")
print("="*70)
print(f"\nTotal Grievances: {len(all_data):,}")
print(f"Unique Wards: {all_data['Ward Name'].nunique()}")
print(f"Date Range: 2020-2025")

#Ward to corporation mapping based on geographic knowledge
ward_corp_map = {
    'North': ['Yelahanka', 'Jakkur', 'Thanisandra', 'Vidyaranyapura', 'Hebbal', 'Amruth Nagar', 
              'Byatarayanapura', 'Kodigehalli', 'Jalahalli', 'Horamavu', 'Ramamurthy Nagar', 
              'Banaswadi', 'Dodda Bidarkallu', 'HBR', 'Someshwara', 'Kempegowda', 'Vignana'],
    
    'South': ['Banashankari', 'JP Nagar', 'Jayanagar', 'BTM', 'Bannerghatta', 'Uttarahalli', 
              'Gottigere', 'Begur', 'Hongasandra', 'Singasandra', 'Bilekahalli', 'Bommanahalli',
              'HSR Layout', 'Koramangala', 'Basavanapura', 'Vasanthapura', 'Kumaraswamy',
              'Padmanabhanagar', 'Giri Nagar', 'Katriguppe', 'Arekere', 'Hulimavu'],
    
    'East': ['Bellandur', 'Marathahalli', 'Hoodi', 'Varthur', 'Doddakannahalli', 'KR Puram',
             'Mahadevapura', 'Hagaduru', 'Devasandra', 'Dod Nekkundi', 'Kadubeesanahalli',
             'Panathur', 'Sadaramangala', 'Kundala Halli', 'Byra Shetty', 'Haridevpura',
             'Jogupalya', 'Halsur', 'Krishnarajapuram', 'Ramaswamy Palya', 'Tin Factory'],
    
    'West': ['Rajarajeshwari', 'Kengeri', 'Jnanabharathi', 'Ullalu', 'Hemmigepura',
             'Nagarabhavi', 'Herohalli', 'Peenya', 'Yeshwanthpur', 'Malleshwaram',
             'Rajaji Nagar', 'Basaveshwara Nagar', 'Mahalakshmi', 'Laggere', 'Kamakshipalya',
             'Subramanya Nagar', 'Nagapura', 'Radhakrishna', 'Agrahara Dasarahalli',
             'Prakash Nagar', 'Sunkadakatte', 'Jaraganahalli', 'Doddakalasandra'],
    
    'Central': ['Shivaji Nagar', 'Gandhinagar', 'Cottonpet', 'Benniganahalli', 'Shanthi Nagar',
                'Ulsoor', 'Chikpete', 'Sampangiram Nagar', 'Sarvag Nagar', 'Vijay Nagar',
                'Bharathi Nagar', 'Moodalapalya', 'Lingarajapuram', 'Bapuji Nagar',
                'Kempapura Agrahara', 'Garudchar Palya', 'Aramane Nagar', 'Nilasandra',
                'Chamrajpet', 'Azad Nagar', 'Rajmahal', 'Vidyapeetha', 'Sudham Nagar']
}

def map_ward_to_corp(ward_name):
    if pd.isna(ward_name):
        return 'Unknown'
    ward_str = str(ward_name)
    for corp, keywords in ward_corp_map.items():
        if any(kw.lower() in ward_str.lower() for kw in keywords):
            return corp
    return 'Unknown'

all_data['Corporation'] = all_data['Ward Name'].apply(map_ward_to_corp)

# Corporation-wise statistics
print("\n" + "="*70)
print("CORPORATION-WISE BREAKDOWN")
print("="*70)

corp_stats = {}
for corp in ['North', 'South', 'East', 'West', 'Central']:
    corp_data = all_data[all_data['Corporation'] == corp]
    total = len(corp_data)
    closed = (corp_data['Grievance Status'] == 'Closed').sum()
    resolution_rate = (closed / total * 100) if total > 0 else 0
    
    corp_stats[corp.lower()] = {
        'name': f'Bengaluru {corp} City Corporation',
        'totalIssues': total,
        'closedIssues': closed,
        'openIssues': total - closed,
        'resolutionRate': round(resolution_rate, 2),
        'color': {'North': '#23A2A5', 'South': '#0D7576', 'East': '#FBC831', 
                  'West': '#F7A782', 'Central': '#4f46e5'}[corp]
    }
    
    print(f"\n{corp.upper()}:")
    print(f"  Total Issues: {total:,}")
    print(f"  Closed: {closed:,}")
    print(f"  Open: {total - closed:,}")
    print(f"  Resolution Rate: {resolution_rate:.2f}%")

# Save corporation stats
output_file = '/Users/sathya/Documents/GitHub/notf-cms/data/corporation_stats.json'
with open(output_file, 'w') as f:
    json.dump(corp_stats, f, indent=2)
print(f"\n✅ Corporation stats saved to: {output_file}")

# Overall statistics
print("\n" + "="*70)
print("OVERALL STATISTICS")
print("="*70)

status_counts = all_data['Grievance Status'].value_counts()
total = len(all_data)
closed = status_counts.get('Closed', 0)

print(f"\nTotal Grievances: {total:,}")
print(f"Closed: {closed:,} ({closed/total*100:.2f}%)")
print(f"Overall Resolution Rate: {closed/total*100:.2f}%")

# Year-wise trends
print("\n" + "="*70)
print("YEAR-WISE TRENDS")
print("="*70)
yearly = all_data.groupby('Year').agg({
    'Complaint ID': 'count',
    'Grievance Status': lambda x: (x == 'Closed').sum()
}).rename(columns={'Complaint ID': 'Total', 'Grievance Status': 'Closed'})
yearly['Resolution Rate %'] = (yearly['Closed'] / yearly['Total'] * 100).round(2)
print(yearly)

# Top categories
print("\n" + "="*70)
print("TOP 10 GRIEVANCE CATEGORIES")
print("="*70)
top_cats = all_data['Category'].value_counts().head(10)
for i, (cat, count) in enumerate(top_cats.items(), 1):
    pct = (count / total * 100)
    print(f"{i:2d}. {cat:35s} {count:8,d} ({pct:5.2f}%)")

# Top sub-categories
print("\n" + "="*70)
print("TOP 15 SPECIFIC ISSUES")
print("="*70)
top_subcats = all_data['Sub Category'].value_counts().head(15)
for i, (subcat, count) in enumerate(top_subcats.items(), 1):
    pct = (count / total * 100)
    print(f"{i:2d}. {subcat:45s} {count:8,d} ({pct:5.2f}%)")

# Top wards
print("\n" + "="*70)
print("TOP 20 WARDS BY GRIEVANCE VOLUME")
print("="*70)
top_wards = all_data['Ward Name'].value_counts().head(20)
for i, (ward, count) in enumerate(top_wards.items(), 1):
    pct = (count / total * 100)
    corp = map_ward_to_corp(ward)
    print(f"{i:2d}. {ward:35s} {count:7,d} ({pct:5.2f}%) - {corp}")

print("\n" + "="*70)
print("ANALYSIS COMPLETE")
print("="*70)
