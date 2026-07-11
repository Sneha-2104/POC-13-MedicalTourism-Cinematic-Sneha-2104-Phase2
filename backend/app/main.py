from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Medical Tourism Intelligence API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Medical Tourism Intelligence API is RUNNING!"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

# Import and include routes - FIXED
from app.routes import analytics, patients

app.include_router(analytics.router)
app.include_router(patients.router)

# Print all registered routes for debugging
print("\n✅ REGISTERED ROUTES:")
for route in app.routes:
    print(f"   {route.methods} {route.path}")
print()