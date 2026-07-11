'use client';

import { useEffect, useState } from 'react';

interface Patient {
  patient_id: string;
  origin_country: string;
  destination_city: string;
  specialty: string;
  procedure: string;
  treatment_cost_usd: number;
  length_of_stay_days: number;
  satisfaction_score: number;
}

interface SearchResultsDirectProps {
  query: string;
}

const API_BASE = 'http://localhost:8000/api';

export function SearchResultsDirect({ query }: SearchResultsDirectProps) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query || query.length < 2) {
      setPatients([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${API_BASE}/patients/?search=${encodeURIComponent(query)}&limit=20`;
        console.log('🔍 Fetching:', url);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('📊 Results:', data);
        setPatients(data.records || []);
      } catch (err: any) {
        console.error('❌ Search error:', err);
        setError(err.message || 'Failed to fetch results');
        setPatients([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce: wait 500ms after user stops typing
    const timer = setTimeout(fetchResults, 500);
    return () => clearTimeout(timer);
  }, [query]);

  if (loading) {
    return (
      <div className="bg-[#14203A] rounded-lg p-4 border border-teal-500/20">
        <div className="text-center py-4">
          <div className="text-teal-400 text-sm">Searching...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#14203A] rounded-lg p-4 border border-red-500/20">
        <div className="text-center py-4">
          <div className="text-red-400 text-sm">Error: {error}</div>
          <div className="text-gray-500 text-xs mt-1">Make sure backend is running on port 8000</div>
        </div>
      </div>
    );
  }

  if (patients.length === 0) {
    return (
      <div className="bg-[#14203A] rounded-lg p-4 border border-teal-500/20">
        <div className="text-center py-4">
          <div className="text-gray-400 text-sm">No patients found for "<span className="text-teal-400">{query}</span>"</div>
          <div className="text-gray-500 text-xs mt-1">Try searching by country (UK, USA), city (Dubai), or specialty (Cardiology)</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#14203A] rounded-lg p-4 border border-teal-500/20">
      <div className="space-y-3">
        <p className="text-gray-400 text-xs">
          Found <span className="text-teal-400 font-medium">{patients.length}</span> patients for "<span className="text-teal-400">{query}</span>"
        </p>
        <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
          {patients.map((patient, index) => (
            <div 
              key={index} 
              className="bg-[#0A1628] rounded-lg p-3 border border-teal-500/10 hover:border-teal-500/30 transition-all"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-teal-400 font-mono text-xs">{patient.patient_id}</span>
                    <span className="text-gray-600 text-xs">•</span>
                    <span className="text-white text-sm font-medium">{patient.specialty}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs">
                    <span className="text-gray-400">📍 {patient.origin_country}</span>
                    <span className="text-gray-600">→</span>
                    <span className="text-gray-400">{patient.destination_city}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-400">{patient.procedure}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">${patient.treatment_cost_usd?.toLocaleString()}</div>
                  <div className="text-yellow-400 text-xs">{patient.satisfaction_score} ★</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}