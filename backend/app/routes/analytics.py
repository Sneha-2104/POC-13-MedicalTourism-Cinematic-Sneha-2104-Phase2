from fastapi import APIRouter
import pandas as pd
import random
from datetime import datetime, timedelta

router = APIRouter(prefix="/api/analytics", tags=["analytics"])

# Generate mock data
def generate_mock_data(n=500):
    countries = ['UK', 'Russia', 'Germany', 'China', 'Kuwait', 'Oman', 'Egypt', 
                 'India', 'Nigeria', 'USA', 'France', 'Australia', 'South Africa']
    destinations = ['Dubai', 'Abu Dhabi', 'Riyadh', 'Doha', 'Muscat']
    specialties = ['Orthopedics', 'Cosmetic Surgery', 'Cardiology', 'Oncology', 
                   'Dermatology', 'Ophthalmology', 'Dental', 'Bariatric']
    procedures = ['Hip Replacement', 'Knee Replacement', 'Rhinoplasty', 'Facelift',
                  'Liposuction', 'Breast Augmentation', 'CABG', 'Angioplasty',
                  'Cancer Therapy', 'Dental Implants', 'LASIK', 'Gastric Bypass']
    channels = ['Medical Tourism Agency', 'Direct Referral', 'Online Platform', 
                'Insurance Network', 'Word of Mouth']
    tiers = ['Standard', 'Premium', 'Luxury']
    
    data = []
    for i in range(n):
        origin = random.choice(countries)
        dest = random.choice(destinations)
        specialty = random.choice(specialties)
        procedure = random.choice(procedures)
        cost = random.randint(5000, 35000)
        days = random.randint(1, 14)
        date = datetime.now() - timedelta(days=random.randint(0, 365))
        satisfaction = round(random.uniform(3.5, 5.0), 1)
        
        data.append({
            'patient_id': f'MT-{i+1:04d}',
            'origin_country': origin,
            'destination_city': dest,
            'specialty': specialty,
            'procedure': procedure,
            'treatment_cost_usd': cost,
            'length_of_stay_days': days,
            'visit_date': date.strftime('%Y-%m-%d'),
            'satisfaction_score': satisfaction,
            'referral_channel': random.choice(channels),
            'accommodation_tier': random.choice(tiers)
        })
    
    return pd.DataFrame(data)

# Global dataframe
df = generate_mock_data(500)

@router.get("/summary")
async def get_summary():
    return {
        "total_patients": len(df),
        "avg_cost_usd": round(df['treatment_cost_usd'].mean(), 2),
        "avg_satisfaction": round(df['satisfaction_score'].mean(), 1),
        "top_origin": df['origin_country'].mode()[0],
        "top_specialty": df['specialty'].mode()[0],
        "growth_pct": 12.4
    }

@router.get("/flows")
async def get_flows():
    origins = df['origin_country'].unique().tolist()
    destinations = df['destination_city'].unique().tolist()
    
    nodes = [{"name": o, "group": "origin"} for o in origins]
    nodes += [{"name": d, "group": "destination"} for d in destinations]
    
    flows = df.groupby(['origin_country', 'destination_city']).size().reset_index(name='value')
    
    links = []
    for _, row in flows.iterrows():
        origin_idx = origins.index(row['origin_country'])
        dest_idx = len(origins) + destinations.index(row['destination_city'])
        links.append({
            "source": origin_idx,
            "target": dest_idx,
            "value": int(row['value'])
        })
    
    return {"nodes": nodes, "links": links}

@router.get("/trends")
async def get_trends():
    df_copy = df.copy()
    df_copy['month'] = pd.to_datetime(df_copy['visit_date']).dt.strftime('%Y-%m')
    monthly = df_copy.groupby('month').agg({
        'treatment_cost_usd': 'sum',
        'patient_id': 'count'
    }).reset_index()
    monthly.columns = ['month', 'revenue', 'patients']
    
    return {
        "months": monthly['month'].tolist(),
        "revenue": monthly['revenue'].tolist(),
        "patients": monthly['patients'].tolist()
    }

@router.get("/specialties")
async def get_specialties():
    top = df.groupby('specialty').agg({
        'patient_id': 'count',
        'treatment_cost_usd': 'sum'
    }).reset_index()
    top.columns = ['specialty', 'patients', 'revenue']
    top = top.sort_values('patients', ascending=False).head(10)
    return top.to_dict(orient='records')

@router.get("/benchmarks")
async def get_benchmarks():
    specialties = df['specialty'].unique().tolist()
    markets = ['India', 'Thailand', 'Turkey', 'Singapore']
    multipliers = {'India': 0.4, 'Thailand': 0.55, 'Turkey': 0.65, 'Singapore': 1.15}
    
    benchmarks = []
    for specialty in specialties[:8]:
        avg_cost = df[df['specialty'] == specialty]['treatment_cost_usd'].mean()
        for market in markets:
            benchmarks.append({
                'specialty': specialty,
                'market': market,
                'cost_usd': round(avg_cost * multipliers[market] * random.uniform(0.9, 1.1), 2)
            })
    
    return benchmarks

@router.get("/map")
async def get_map_data():
    origin_counts = df['origin_country'].value_counts().reset_index()
    origin_counts.columns = ['country', 'patients']
    return origin_counts.to_dict(orient='records')