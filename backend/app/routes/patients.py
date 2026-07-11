from fastapi import APIRouter, Query
from typing import Optional
from app.routes.analytics import df

router = APIRouter(prefix="/api/patients", tags=["patients"])

@router.get("/")
async def get_patients(
    limit: int = 100,
    offset: int = 0,
    origin: Optional[str] = None,
    destination: Optional[str] = None,
    specialty: Optional[str] = None,
    search: Optional[str] = None
):
    filtered = df.copy()
    
    if origin:
        filtered = filtered[filtered['origin_country'] == origin]
    if destination:
        filtered = filtered[filtered['destination_city'] == destination]
    if specialty:
        filtered = filtered[filtered['specialty'] == specialty]
    if search:
        filtered = filtered[
            filtered['patient_id'].str.contains(search, case=False) |
            filtered['origin_country'].str.contains(search, case=False) |
            filtered['specialty'].str.contains(search, case=False)
        ]
    
    total = len(filtered)
    records = filtered.iloc[offset:offset+limit].to_dict(orient='records')
    
    return {
        "total": total,
        "limit": limit,
        "offset": offset,
        "records": records
    }