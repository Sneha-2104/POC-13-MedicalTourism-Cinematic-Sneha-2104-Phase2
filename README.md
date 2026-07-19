# medical-tourism-intelligence-platform

PoC 13 — Medical Tourism Intelligence Platform for Real Rails Batch 5



\# 🏥 Medical Tourism Intelligence Platform



\*\*PoC 13 — Real Rails Batch 5\*\*



A production-grade intelligence dashboard for tracking medical tourism flows, cost competitiveness, and specialty demand across the GCC region.



\---



\## 📊 Overview



This platform provides real-time insights for health authorities, investment boards, and hospital executives to make data-driven decisions about medical tourism.



\### Key Features



\- \*\*KPI Dashboard\*\* — Total patients, average cost, satisfaction score, top origins, top specialties

\- \*\*Revenue Trends\*\* — Track revenue and patient volume over time

\- \*\*Top Specialties\*\* — Identify which procedures are driving medical tourism

\- \*\*Cost Benchmarks\*\* — Compare GCC costs vs India, Thailand, Turkey, and Singapore

\- \*\*Patient Explorer\*\* — Search, filter, and export patient records

\- \*\*Intelligence Sidebar\*\* — Context on why this matters and who controls the rail



\---



\## 🛠️ Tech Stack



| Layer | Technology |

|-------|------------|

| Frontend | Next.js 14, TypeScript, Tailwind CSS, shadcn/ui |

| Charts | Recharts, D3.js |

| Backend | FastAPI, Python, Pandas |

| Styling | Dark cinematic theme with cyan accents |

| Deployment | Ready for Azure Container Apps (Phase 2) |



\---



\## 🚀 Getting Started



\### Prerequisites



\- Node.js (v18+)

\- Python (v3.9+)

\- Git



\### Installation



1\. \*\*Clone the repository:\*\*

&#x20;  ```bash

&#x20;  git clone https://github.com/Sneha-2104/medical-tourism-intelligence-platform.git

&#x20;  cd medical-tourism-intelligence-platform


---

## Docker Setup (Phase 2)

This application is fully containerized for consistent, reproducible deployment.

### Prerequisites
- Docker Desktop installed and running
- At least 10GB free disk space

### Running with Docker

1. Clone this repository
2. From the project root, run:
docker-compose up --build
3. Wait for both containers to build and start (first build takes a few minutes; subsequent builds are faster due to caching)
4. Access the application:
   - Frontend: http://localhost:3000
   - Backend health check: http://localhost:8000/health

### Restarting

To stop the containers:
docker-compose down

To start them again without rebuilding:
docker-compose up

### Environment Variables

The frontend needs `NEXT_PUBLIC_API_BASE_URL` set at **build time** (not runtime) since Next.js bakes `NEXT_PUBLIC_*` variables into the client bundle. This is configured via the `args` section in `docker-compose.yml`, pointing to `http://localhost:8000/api` so the browser can reach the backend directly.

### Troubleshooting

- **"Failed to fetch" on frontend**: Usually means the API URL wasn't baked in correctly at build time. Rebuild with `docker-compose up --build`.
- **Backend build fails on numpy/pandas/scipy**: These packages need pre-built wheels. Use `python:3.11-slim` as the base image rather than newer Python versions that may lack pre-compiled binaries.
- **Docker engine errors (500 Internal Server Error)**: Run `wsl --shutdown`, wait 15-20 seconds, then restart Docker Desktop.
- **Disk space / export errors during build**: Ensure at least 10GB free disk space; Docker needs room to write image layers.
