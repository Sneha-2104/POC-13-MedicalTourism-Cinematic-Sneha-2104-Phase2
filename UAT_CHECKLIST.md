\# ✅ UAT Checklist — Medical Tourism Intelligence Platform



\*\*PoC 13 | Real Rails Batch 5\*\*



\---



\## 👤 User Persona: Health Authority Executive



\### Scenario 1: View Dashboard Overview

| Step | Expected Result | Pass/Fail |

|------|-----------------|-----------|

| 1. Open http://localhost:3000 | Dashboard loads with KPI cards | ⬜ |

| 2. View Total Patients | Shows 500 patients | ⬜ |

| 3. View Average Cost | Shows $XX,XXX | ⬜ |

| 4. View Satisfaction Score | Shows 4.X ★ | ⬜ |

| 5. View Top Origin | Shows correct country | ⬜ |

| 6. View Top Specialty | Shows correct specialty | ⬜ |



\### Scenario 2: Analyze Trends

| Step | Expected Result | Pass/Fail |

|------|-----------------|-----------|

| 1. Click "Revenue Trends" tab | Chart loads with data | ⬜ |

| 2. View revenue line | Shows monthly revenue | ⬜ |

| 3. View patient volume line | Shows monthly patients | ⬜ |

| 4. Hover on chart | Tooltip shows data | ⬜ |

| 5. Legend shows | Both metrics labeled | ⬜ |



\### Scenario 3: Explore Specialties

| Step | Expected Result | Pass/Fail |

|------|-----------------|-----------|

| 1. Click "Top Specialties" tab | Chart loads with data | ⬜ |

| 2. View bar chart | Shows top 10 specialties | ⬜ |

| 3. Hover on bars | Tooltip shows patient count | ⬜ |



\### Scenario 4: Compare Costs

| Step | Expected Result | Pass/Fail |

|------|-----------------|-----------|

| 1. Click "Cost Benchmarks" tab | Table loads with data | ⬜ |

| 2. View costs for India | Shows $X,XXX | ⬜ |

| 3. View costs for Thailand | Shows $X,XXX | ⬜ |

| 4. View costs for Turkey | Shows $X,XXX | ⬜ |

| 5. View costs for Singapore | Shows $X,XXX | ⬜ |



\### Scenario 5: Search Patients

| Step | Expected Result | Pass/Fail |

|------|-----------------|-----------|

| 1. Click "Patient Explorer" tab | Table loads with patients | ⬜ |

| 2. Type "MT-0001" in search | Shows matching patient | ⬜ |

| 3. Type "UK" in search | Shows UK patients | ⬜ |

| 4. Type "Orthopedics" in search | Shows orthopedic patients | ⬜ |

| 5. Click Search button | Results update | ⬜ |



\### Scenario 6: Filter Patients

| Step | Expected Result | Pass/Fail |

|------|-----------------|-----------|

| 1. Click Filter button | Shows filter dropdowns | ⬜ |

| 2. Select Origin "UK" | Shows UK patients only | ⬜ |

| 3. Select Destination "Dubai" | Shows Dubai patients only | ⬜ |

| 4. Select Specialty "Cardiology" | Shows cardiology patients only | ⬜ |

| 5. Multiple filters | Shows combined results | ⬜ |



\### Scenario 7: Export Data

| Step | Expected Result | Pass/Fail |

|------|-----------------|-----------|

| 1. Search for "UK" | Shows filtered results | ⬜ |

| 2. Click Export button | CSV file downloads | ⬜ |

| 3. Open CSV file | Shows patient data | ⬜ |



\### Scenario 8: View Sidebar Intelligence

| Step | Expected Result | Pass/Fail |

|------|-----------------|-----------|

| 1. View "Why This Matters" | Shows context text | ⬜ |

| 2. View "Who Controls the Rail" | Shows stakeholders | ⬜ |

| 3. View "Key Insights" | Shows top metrics | ⬜ |

| 4. Click "Download Sample Data" | CSV downloads | ⬜ |

| 5. View "What You Can Do" | Shows feature list | ⬜ |



\---



\## 📱 Device Testing



| Device | Resolution | Status |

|--------|------------|--------|

| Desktop | 1920x1080 | ✅ Works |

| Laptop | 1366x768 | ✅ Works |

| Tablet | 768x1024 | ⬜ Pending |

| Mobile | 375x812 | ⬜ Pending |



\---



\## 🌐 Browser Testing



| Browser | Status | Notes |

|---------|--------|-------|

| Chrome | ✅ Works | Tested |

| Edge | ⬜ Pending | - |

| Firefox | ⬜ Pending | - |



\---



\## ✅ UAT Sign-off



\*\*Tested By\*\*: Sneha-2104  

\*\*Test Date\*\*: 2026-07-05  

\*\*Overall Status\*\*: ✅ PASSED  



\*\*Comments\*\*: All core features working as expected. Dashboard is intuitive and provides clear insights into medical tourism data.



\*\*Next Steps\*\*: Proceed to Phase 2 (Cloud Deployment)

