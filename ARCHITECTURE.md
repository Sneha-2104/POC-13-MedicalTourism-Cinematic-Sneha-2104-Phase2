\# 🏗️ Architecture — Medical Tourism Intelligence Platform



\*\*PoC 13 | Real Rails Batch 5\*\*



\---



\## 📐 System Overview

┌─────────────────────────────────────────────────────────────────────┐

│ USER BROWSER │

└─────────────────────────────────────────────────────────────────────┘

│

▼

┌─────────────────────────────────────────────────────────────────────┐

│ FRONTEND (Next.js 14) │

│ ┌─────────────────────────────────────────────────────────────┐ │

│ │ Dashboard Layout (70/30 Split) │ │

│ │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │ │

│ │ │ KPI Cards │ │ Sankey Flow │ │ Benchmark │ │ │

│ │ └─────────────┘ └─────────────┘ └─────────────┘ │ │

│ │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │ │

│ │ │ Revenue │ │ Top │ │ Patient │ │ │

│ │ │ Trend │ │ Specialties │ │ Explorer │ │ │

│ │ └─────────────┘ └─────────────┘ └─────────────┘ │ │

│ │ ┌──────────────────────────────────────────────────┐ │ │

│ │ │ "Why This Matters" + "Who Controls the Rail" │ │ │

│ │ └──────────────────────────────────────────────────┘ │ │

│ └─────────────────────────────────────────────────────────────┘ │

│ │

│ Components: │

│ - Recharts (line, donut, bar) │

│ - shadcn/ui (cards, buttons, tabs, tables) │

│ - Custom: IntelligenceSidebar, PatientExplorer │

└─────────────────────────────────────────────────────────────────────┘

│

▼

┌─────────────────────────────────────────────────────────────────────┐

│ BACKEND (FastAPI) │

│ ┌─────────────────────────────────────────────────────────────┐ │

│ │ API Endpoints: │ │

│ │ GET /api/patients/ → Search/filter patients │ │

│ │ GET /api/analytics/summary → KPI metrics │ │

│ │ GET /api/analytics/trends → Revenue over time │ │

│ │ GET /api/analytics/specialties → Top specialties │ │

│ │ GET /api/analytics/benchmarks → Competitor comparison │ │

│ │ GET /api/analytics/map → Geographic distribution │ │

│ └─────────────────────────────────────────────────────────────┘ │

│ │

│ Services: │

│ - Mock Data Generator (500 patient records) │

│ - Analytics Engine (Aggregations, filtering) │

│ - CORS enabled for frontend connection │

└─────────────────────────────────────────────────────────────────────┘

│

▼

┌─────────────────────────────────────────────────────────────────────┐

│ DATA LAYER │

│ ┌─────────────────────────────────────────────────────────────┐ │

│ │ Mock Data (In-memory) │ │

│ │ ├── 500 patient records with origin, destination, etc. │ │

│ │ └── Generated on startup by generate\_mock\_data() │ │

│ └─────────────────────────────────────────────────────────────┘ │

└─────────────────────────────────────────────────────────────────────┘

\---



\## 🛠️ Tech Stack



| Layer | Technology | Purpose |

|-------|------------|---------|

| \*\*Frontend\*\* | Next.js 14 | React framework with App Router |

| \*\*Styling\*\* | Tailwind CSS + shadcn/ui | Utility-first CSS with pre-built components |

| \*\*Charts\*\* | Recharts | Data visualization library |

| \*\*Backend\*\* | FastAPI | Python API framework |

| \*\*Data Processing\*\* | Pandas | Data manipulation and aggregation |

| \*\*Language\*\* | TypeScript (frontend) + Python (backend) | Type safety and productivity |



\---



\## 📊 Data Flow



1\. \*\*User Interaction\*\* → Frontend makes API call

2\. \*\*API Request\*\* → FastAPI endpoint receives request

3\. \*\*Data Processing\*\* → Pandas filters/aggregates mock data

4\. \*\*Response\*\* → JSON data returned to frontend

5\. \*\*Rendering\*\* → Recharts displays charts, tables show data



\---



\## 🔄 Key Data Models



\### Patient Record

```python

{

&#x20;   'patient\_id': 'MT-0001',

&#x20;   'origin\_country': 'UK',

&#x20;   'destination\_city': 'Dubai',

&#x20;   'specialty': 'Orthopedics',

&#x20;   'procedure': 'Hip Replacement',

&#x20;   'treatment\_cost\_usd': 15200,

&#x20;   'length\_of\_stay\_days': 5,

&#x20;   'visit\_date': '2026-01-15',

&#x20;   'satisfaction\_score': 4.8,

&#x20;   'referral\_channel': 'Medical Tourism Agency',

&#x20;   'accommodation\_tier': 'Premium'

}

