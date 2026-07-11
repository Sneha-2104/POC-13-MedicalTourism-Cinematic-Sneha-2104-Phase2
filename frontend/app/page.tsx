'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Header } from '@/components/Header';
import { SlideOverPanel } from '@/components/SlideOverPanel';
import { SearchBar } from '@/components/SearchBar';
import { SearchResultsDirect } from '@/components/SearchResultsDirect';

const API_BASE = 'http://localhost:8000/api';

export default function Home() {
  const [summary, setSummary] = useState<any>(null);
  const [trends, setTrends] = useState<any>(null);
  const [specialties, setSpecialties] = useState<any[]>([]);
  const [benchmarks, setBenchmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔍 Fetching data...');
        
        const [summaryRes, trendsRes, specialtiesRes, benchmarksRes] = await Promise.all([
          fetch(`${API_BASE}/analytics/summary`),
          fetch(`${API_BASE}/analytics/trends`),
          fetch(`${API_BASE}/analytics/specialties`),
          fetch(`${API_BASE}/analytics/benchmarks`),
        ]);

        const summaryData = await summaryRes.json();
        const trendsData = await trendsRes.json();
        const specialtiesData = await specialtiesRes.json();
        const benchmarksData = await benchmarksRes.json();

        console.log('✅ Data loaded!');
        setSummary(summaryData);
        setTrends(trendsData);
        setSpecialties(Array.isArray(specialtiesData) ? specialtiesData : []);
        setBenchmarks(Array.isArray(benchmarksData) ? benchmarksData : []);
        setLoading(false);
      } catch (err: any) {
        console.error('❌ Error:', err);
        setError(err.message || 'Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleItemClick = (item: any, type: string) => {
    setSelectedItem({ ...item, type });
    setPanelOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('🔍 Searching for:', query);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
        <div className="text-teal-400 text-xl">Loading Medical Tourism Intelligence...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1628] text-white p-6 relative">
      {/* Cinematic Header */}
      <Header />

      {/* Main Content - with top padding for header */}
      <div className="pt-16">
        {/* Header with Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-teal-400">
              🏥 Medical Tourism Intelligence
            </h1>
            <p className="text-gray-400 text-sm">
              Infocreon Internship • Real-time GCC medical tourism insights
            </p>
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* KPI Cards - Clickable */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          <Card 
            className="bg-[#14203A] border-teal-500/20 hover:border-teal-400 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-teal-500/10"
            onClick={() => handleItemClick({ label: 'Total Patients', value: summary?.total_patients }, 'kpi')}
          >
            <CardHeader className="pb-1">
              <CardTitle className="text-[10px] text-gray-400 uppercase tracking-wider">Total Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-white">{summary?.total_patients?.toLocaleString() || 0}</div>
              <div className="text-[10px] text-green-400">↑ {summary?.growth_pct || 0}% YoY</div>
            </CardContent>
          </Card>

          <Card 
            className="bg-[#14203A] border-teal-500/20 hover:border-teal-400 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-teal-500/10"
            onClick={() => handleItemClick({ label: 'Average Cost', value: summary?.avg_cost_usd }, 'kpi')}
          >
            <CardHeader className="pb-1">
              <CardTitle className="text-[10px] text-gray-400 uppercase tracking-wider">Avg Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-white">${summary?.avg_cost_usd?.toLocaleString() || 0}</div>
              <div className="text-[10px] text-gray-400">USD</div>
            </CardContent>
          </Card>

          <Card 
            className="bg-[#14203A] border-teal-500/20 hover:border-teal-400 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-teal-500/10"
            onClick={() => handleItemClick({ label: 'Satisfaction Score', value: summary?.avg_satisfaction }, 'kpi')}
          >
            <CardHeader className="pb-1">
              <CardTitle className="text-[10px] text-gray-400 uppercase tracking-wider">Satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-white">{summary?.avg_satisfaction || 0} ★</div>
              <div className="text-[10px] text-gray-400">out of 5.0</div>
            </CardContent>
          </Card>

          <Card 
            className="bg-[#14203A] border-teal-500/20 hover:border-teal-400 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-teal-500/10"
            onClick={() => handleItemClick({ label: 'Top Origin', value: summary?.top_origin }, 'kpi')}
          >
            <CardHeader className="pb-1">
              <CardTitle className="text-[10px] text-gray-400 uppercase tracking-wider">Top Origin</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-white">{summary?.top_origin || 'N/A'}</div>
              <div className="text-[10px] text-gray-400">Country</div>
            </CardContent>
          </Card>

          <Card 
            className="bg-[#14203A] border-teal-500/20 hover:border-teal-400 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-teal-500/10"
            onClick={() => handleItemClick({ label: 'Top Specialty', value: summary?.top_specialty }, 'kpi')}
          >
            <CardHeader className="pb-1">
              <CardTitle className="text-[10px] text-gray-400 uppercase tracking-wider">Top Specialty</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-white">{summary?.top_specialty || 'N/A'}</div>
              <div className="text-[10px] text-gray-400">Procedure</div>
            </CardContent>
          </Card>
        </div>

        {/* Search Results */}
        {searchQuery && searchQuery.length >= 2 && (
          <div className="mb-6">
            <SearchResultsDirect query={searchQuery} />
          </div>
        )}

        {/* Charts */}
        <Tabs defaultValue="trends" className="w-full">
          <TabsList className="bg-[#14203A] border border-teal-500/20">
            <TabsTrigger value="trends" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400 text-xs">
              Revenue Trends
            </TabsTrigger>
            <TabsTrigger value="specialties" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400 text-xs">
              Top Specialties
            </TabsTrigger>
            <TabsTrigger value="benchmarks" className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400 text-xs">
              Cost Benchmarks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="mt-4">
            <Card 
              className="bg-[#14203A] border-teal-500/20 cursor-pointer hover:border-teal-400 transition-all duration-300"
              onClick={() => handleItemClick({ label: 'Revenue Trends Chart', data: trends }, 'chart')}
            >
              <CardHeader>
                <CardTitle className="text-white text-sm">Revenue & Patient Volume Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart 
                    data={trends?.months?.map((month: string, i: number) => ({
                      month,
                      revenue: trends?.revenue?.[i] || 0,
                      patients: trends?.patients?.[i] || 0,
                    })) || []}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E2D4A" />
                    <XAxis dataKey="month" stroke="#94A3B8" fontSize={10} />
                    <YAxis yAxisId="left" stroke="#94A3B8" fontSize={10} />
                    <YAxis yAxisId="right" orientation="right" stroke="#94A3B8" fontSize={10} />
                    <Tooltip contentStyle={{ backgroundColor: '#0A1628', border: '1px solid #2DD4BF' }} />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#2DD4BF" name="Revenue ($)" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="patients" stroke="#F59E0B" name="Patients" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specialties" className="mt-4">
            <Card 
              className="bg-[#14203A] border-teal-500/20 cursor-pointer hover:border-teal-400 transition-all duration-300"
              onClick={() => handleItemClick({ label: 'Top Specialties Chart', data: specialties }, 'chart')}
            >
              <CardHeader>
                <CardTitle className="text-white text-sm">Top 10 Specialties by Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={specialties} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E2D4A" />
                    <XAxis type="number" stroke="#94A3B8" fontSize={10} />
                    <YAxis dataKey="specialty" type="category" stroke="#94A3B8" fontSize={10} width={100} />
                    <Tooltip contentStyle={{ backgroundColor: '#0A1628', border: '1px solid #2DD4BF' }} />
                    <Bar dataKey="patients" fill="#2DD4BF" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="benchmarks" className="mt-4">
            <Card 
              className="bg-[#14203A] border-teal-500/20 cursor-pointer hover:border-teal-400 transition-all duration-300"
              onClick={() => handleItemClick({ label: 'Cost Benchmarks Table', data: benchmarks }, 'table')}
            >
              <CardHeader>
                <CardTitle className="text-white text-sm">Cost Benchmarks vs Competitor Markets</CardTitle>
              </CardHeader>
              <CardContent>
                {benchmarks.length === 0 ? (
                  <div className="text-gray-400 text-center py-8 text-sm">No benchmark data available</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-2 text-gray-400">Specialty</th>
                          <th className="text-right py-2 text-gray-400">India</th>
                          <th className="text-right py-2 text-gray-400">Thailand</th>
                          <th className="text-right py-2 text-gray-400">Turkey</th>
                          <th className="text-right py-2 text-gray-400">Singapore</th>
                        </tr>
                      </thead>
                      <tbody>
                        {benchmarks.slice(0, 8).map((item: any, i: number) => (
                          <tr key={i} className="border-b border-gray-800">
                            <td className="py-2 text-white">{item.specialty}</td>
                            {['India', 'Thailand', 'Turkey', 'Singapore'].map((market) => {
                              const match = benchmarks.find((b: any) => b.specialty === item.specialty && b.market === market);
                              return (
                                <td key={market} className="text-right py-2 text-white">
                                  ${match?.cost_usd?.toLocaleString() || '-'}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Slide-Over Panel */}
      <SlideOverPanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        title={selectedItem?.label || 'Details'}
      >
        {selectedItem && (
          <div className="space-y-4">
            {/* Type Badge */}
            <div className="bg-[#0A1628] rounded-lg p-4 border border-teal-500/20">
              <p className="text-gray-400 text-xs uppercase tracking-wider">Type</p>
              <p className="text-white font-medium">{selectedItem.type}</p>
            </div>

            {/* Value */}
            <div className="bg-[#0A1628] rounded-lg p-4 border border-teal-500/20">
              <p className="text-gray-400 text-xs uppercase tracking-wider">Value</p>
              <p className="text-teal-400 text-xl font-bold">
                {typeof selectedItem.value === 'object' 
                  ? JSON.stringify(selectedItem.value).slice(0, 100) 
                  : selectedItem.value}
              </p>
            </div>

            {/* More Details based on type */}
            {selectedItem.type === 'kpi' && (
              <>
                <div className="bg-[#0A1628] rounded-lg p-4 border border-teal-500/20">
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Insight</p>
                  <p className="text-gray-300 text-sm">
                    {selectedItem.label === 'Total Patients' && `Total medical tourism patients tracked in the GCC region. This represents a ${summary?.growth_pct || 0}% growth year-over-year.`}
                    {selectedItem.label === 'Average Cost' && `Average treatment cost per procedure across all specialties in the GCC.`}
                    {selectedItem.label === 'Satisfaction Score' && `Average patient satisfaction rating based on post-treatment surveys.`}
                    {selectedItem.label === 'Top Origin' && `The most common country of origin for medical tourism patients. Currently ${summary?.top_origin || 'N/A'} leads.`}
                    {selectedItem.label === 'Top Specialty' && `The most popular medical procedure type. ${summary?.top_specialty || 'N/A'} is currently in highest demand.`}
                  </p>
                </div>
                <div className="bg-[#0A1628] rounded-lg p-4 border border-teal-500/20">
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Related Data</p>
                  <div className="text-gray-300 text-sm space-y-1">
                    <p>Total Patients: {summary?.total_patients || 0}</p>
                    <p>Average Cost: ${summary?.avg_cost_usd?.toLocaleString() || 0}</p>
                    <p>Satisfaction: {summary?.avg_satisfaction || 0} ★</p>
                  </div>
                </div>
              </>
            )}

            {selectedItem.type === 'chart' && (
              <div className="bg-[#0A1628] rounded-lg p-4 border border-teal-500/20">
                <p className="text-gray-400 text-xs uppercase tracking-wider">Chart Insight</p>
                <p className="text-gray-300 text-sm">
                  {selectedItem.label === 'Revenue Trends Chart' && 'Shows monthly revenue and patient volume trends. Use this to identify seasonal patterns and growth opportunities.'}
                  {selectedItem.label === 'Top Specialties Chart' && 'Shows the most popular medical procedures by patient volume. Use this to identify high-demand specialties.'}
                  {selectedItem.label === 'Cost Benchmarks Table' && 'Compares treatment costs across competitor markets. Use this to identify pricing advantages.'}
                </p>
              </div>
            )}
          </div>
        )}
      </SlideOverPanel>
    </div>
  );
}