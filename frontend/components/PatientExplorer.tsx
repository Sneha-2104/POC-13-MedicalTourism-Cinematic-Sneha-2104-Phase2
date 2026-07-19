'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, Filter, X } from 'lucide-react';

const API_BASE = 'http://localhost:8000/api';

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

export function PatientExplorer() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [originFilter, setOriginFilter] = useState('all');
  const [destinationFilter, setDestinationFilter] = useState('all');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [origins, setOrigins] = useState<string[]>([]);
  const [destinations, setDestinations] = useState<string[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);

  // Fetch filter options
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await fetch(`${API_BASE}/analytics/summary`);
        // We'll get options from the data
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };
    fetchOptions();
  }, []);

  // Fetch patients with filters
  const fetchPatients = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('limit', String(limit));
      params.append('offset', String(offset));
      if (searchTerm) params.append('search', searchTerm);
      if (originFilter !== 'all') params.append('origin', originFilter);
      if (destinationFilter !== 'all') params.append('destination', destinationFilter);
      if (specialtyFilter !== 'all') params.append('specialty', specialtyFilter);

      const res = await fetch(`${API_BASE}/patients/?${params.toString()}`);
      const data = await res.json();
      setPatients(data.records || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load filter options from backend
  const loadFilterOptions = async () => {
    try {
      // Get unique values from summary or a dedicated endpoint
      const res = await fetch(`${API_BASE}/analytics/summary`);
      const data = await res.json();
      
      // For now, use hardcoded options from mock data
      const originList = ['UK', 'Russia', 'Germany', 'China', 'Kuwait', 'Oman', 'Egypt', 'India', 'USA', 'France', 'Australia', 'South Africa'];
      const destList = ['Dubai', 'Abu Dhabi', 'Riyadh', 'Doha', 'Muscat'];
      const specList = ['Orthopedics', 'Cosmetic Surgery', 'Cardiology', 'Oncology', 'Dermatology', 'Ophthalmology', 'Dental', 'Bariatric'];
      
      setOrigins(originList);
      setDestinations(destList);
      setSpecialties(specList);
    } catch (error) {
      console.error('Error loading filter options:', error);
    }
  };

  useEffect(() => {
    loadFilterOptions();
    fetchPatients();
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [searchTerm, originFilter, destinationFilter, specialtyFilter, offset, limit]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPatients();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setOriginFilter('all');
    setDestinationFilter('all');
    setSpecialtyFilter('all');
    setOffset(0);
  };

  const exportData = () => {
    // Create CSV from current patients
    if (patients.length === 0) return;
    
    const headers = ['Patient ID', 'Origin', 'Destination', 'Specialty', 'Procedure', 'Cost (USD)', 'Stay (Days)', 'Satisfaction'];
    const rows = patients.map(p => [
      p.patient_id,
      p.origin_country,
      p.destination_city,
      p.specialty,
      p.procedure,
      p.treatment_cost_usd,
      p.length_of_stay_days,
      p.satisfaction_score
    ]);
    
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patients_export_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <Card className="bg-[#1E293B] border-cyan-500/20">
        <CardContent className="pt-4">
          <form onSubmit={handleSearch} className="space-y-3">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search by Patient ID, Origin, or Specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-[#0A1628] border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white">
                Search
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="border-gray-700 text-gray-400 hover:text-white"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-gray-800">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Origin Country</label>
                  <Select value={originFilter} onValueChange={(value) => setOriginFilter(value ?? "")}>
                    <SelectTrigger className="bg-[#0A1628] border-gray-700 text-white">
                      <SelectValue placeholder="All Origins" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1E293B] border-gray-700">
                      <SelectItem value="all">All Origins</SelectItem>
                      {origins.map((origin) => (
                        <SelectItem key={origin} value={origin}>{origin}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs text-gray-400 block mb-1">Destination</label>
                  <Select value={destinationFilter} onValueChange={(value) => setDestinationFilter(value ?? "")}>
                    <SelectTrigger className="bg-[#0A1628] border-gray-700 text-white">
                      <SelectValue placeholder="All Destinations" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1E293B] border-gray-700">
                      <SelectItem value="all">All Destinations</SelectItem>
                      {destinations.map((dest) => (
                        <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs text-gray-400 block mb-1">Specialty</label>
                  <Select value={specialtyFilter} onValueChange={(value) => setSpecialtyFilter(value ?? "")}>
                    <SelectTrigger className="bg-[#0A1628] border-gray-700 text-white">
                      <SelectValue placeholder="All Specialties" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1E293B] border-gray-700">
                      <SelectItem value="all">All Specialties</SelectItem>
                      {specialties.map((spec) => (
                        <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {(searchTerm || originFilter !== 'all' || destinationFilter !== 'all' || specialtyFilter !== 'all') && (
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-gray-400">
                  Found {total} patient{total !== 1 ? 's' : ''}
                </span>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-gray-400 hover:text-white text-xs"
                >
                  <X className="h-3 w-3 mr-1" /> Clear Filters
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Patient Table */}
      <Card className="bg-[#1E293B] border-cyan-500/20">
        <CardHeader className="flex flex-row justify-between items-center pb-2">
          <CardTitle className="text-white text-sm">Patient Records</CardTitle>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={exportData}
              className="border-gray-700 text-gray-400 hover:text-white text-xs"
              disabled={patients.length === 0}
            >
              <Download className="h-3 w-3 mr-1" /> Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center text-gray-400 py-8 text-sm">Loading patients...</div>
          ) : patients.length === 0 ? (
            <div className="text-center text-gray-400 py-8 text-sm">No patients found matching your filters</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2 text-gray-400">ID</th>
                    <th className="text-left py-2 text-gray-400">Origin</th>
                    <th className="text-left py-2 text-gray-400">Destination</th>
                    <th className="text-left py-2 text-gray-400">Specialty</th>
                    <th className="text-left py-2 text-gray-400">Procedure</th>
                    <th className="text-right py-2 text-gray-400">Cost</th>
                    <th className="text-right py-2 text-gray-400">Stay</th>
                    <th className="text-right py-2 text-gray-400">Satisfaction</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient, i) => (
                    <tr key={i} className="border-b border-gray-800 hover:bg-cyan-500/5">
                      <td className="py-2 text-cyan-400">{patient.patient_id}</td>
                      <td className="py-2 text-white">{patient.origin_country}</td>
                      <td className="py-2 text-white">{patient.destination_city}</td>
                      <td className="py-2 text-white">{patient.specialty}</td>
                      <td className="py-2 text-gray-300">{patient.procedure}</td>
                      <td className="py-2 text-right text-white">${patient.treatment_cost_usd?.toLocaleString()}</td>
                      <td className="py-2 text-right text-white">{patient.length_of_stay_days}d</td>
                      <td className="py-2 text-right text-yellow-400">{patient.satisfaction_score}★</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}