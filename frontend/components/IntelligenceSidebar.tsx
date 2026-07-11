'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Lightbulb, Users, Building2, TrendingUp } from 'lucide-react';

interface IntelligenceSidebarProps {
  summary: any;
  specialties: any[];
}

export function IntelligenceSidebar({ summary, specialties }: IntelligenceSidebarProps) {
  // Generate sample data for download
  const downloadSampleData = () => {
    // Create sample data
    const sampleData = [
      ['Patient ID', 'Origin', 'Destination', 'Specialty', 'Procedure', 'Cost (USD)', 'Length of Stay', 'Satisfaction'],
      ['MT-0001', 'UK', 'Dubai', 'Orthopedics', 'Hip Replacement', '15200', '5', '4.8'],
      ['MT-0002', 'Russia', 'Abu Dhabi', 'Cosmetic Surgery', 'Rhinoplasty', '8900', '3', '4.5'],
      ['MT-0003', 'Germany', 'Riyadh', 'Cardiology', 'CABG', '28500', '7', '4.2'],
      ['MT-0004', 'China', 'Dubai', 'Oncology', 'Cancer Therapy', '32000', '14', '4.6'],
      ['MT-0005', 'Kuwait', 'Doha', 'Dermatology', 'Skin Treatment', '4500', '2', '4.9'],
      ['MT-0006', 'Oman', 'Muscat', 'Ophthalmology', 'LASIK', '3200', '1', '4.7'],
      ['MT-0007', 'Egypt', 'Dubai', 'Dental', 'Dental Implants', '5800', '2', '4.3'],
      ['MT-0008', 'India', 'Abu Dhabi', 'Bariatric', 'Gastric Bypass', '12500', '4', '4.4'],
      ['MT-0009', 'USA', 'Riyadh', 'Orthopedics', 'Knee Replacement', '16800', '5', '4.1'],
      ['MT-0010', 'France', 'Dubai', 'Cosmetic Surgery', 'Facelift', '10500', '3', '4.7']
    ];

    // Convert to CSV
    const csvContent = sampleData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'medical_tourism_sample_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Top insights
  const insights = [
    { icon: TrendingUp, label: 'Top Origin', value: summary?.top_origin || 'UK' },
    { icon: TrendingUp, label: 'Top Destination', value: summary?.top_destination || 'Dubai' },
    { icon: TrendingUp, label: 'Top Specialty', value: summary?.top_specialty || 'Orthopedics' },
    { icon: Users, label: 'Avg Satisfaction', value: `${summary?.avg_satisfaction || 4.5} / 5.0` },
  ];

  return (
    <div className="space-y-4">
      {/* Why This Matters */}
      <Card className="bg-[#1E293B] border-cyan-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-cyan-400 flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Why This Matters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-xs leading-relaxed">
            Medical tourism in the GCC is projected to grow <span className="text-cyan-400 font-semibold">15% annually</span>, 
            contributing over <span className="text-cyan-400 font-semibold">$5B</span> to regional economies. 
            This platform gives health authorities, investment boards, and hospital executives 
            a single pane of glass over patient flows, cost competitiveness, and specialty demand.
          </p>
          <div className="mt-3 flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded text-[10px]">$5B+ Market</span>
            <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-[10px]">15% YoY Growth</span>
            <span className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded text-[10px]">40+ Countries</span>
          </div>
        </CardContent>
      </Card>

      {/* Who Controls the Rail */}
      <Card className="bg-[#1E293B] border-cyan-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-cyan-400 flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Who Controls the Rail
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-[10px]">DHA (Dubai)</span>
            <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-[10px]">MOH (UAE)</span>
            <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-[10px]">MOH (Saudi)</span>
            <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-[10px]">Investment Boards</span>
            <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-[10px]">JCI</span>
            <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-[10px]">Hospital Executives</span>
            <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-[10px]">Medical Tourism Agencies</span>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="bg-[#1E293B] border-cyan-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-cyan-400 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Key Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {insights.map((insight, i) => (
              <div key={i} className="flex justify-between items-center border-b border-gray-800/50 pb-2 last:border-0 last:pb-0">
                <span className="text-gray-400 text-xs">{insight.label}</span>
                <span className="text-white text-sm font-semibold">{insight.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-800/50">
            <div className="text-gray-400 text-[10px]">Total Patients Tracked</div>
            <div className="text-white text-lg font-bold">{summary?.total_patients?.toLocaleString() || 'N/A'}</div>
          </div>
        </CardContent>
      </Card>

      {/* Download Button */}
      <Card className="bg-[#1E293B] border-cyan-500/20">
        <CardContent className="pt-4">
          <Button 
            onClick={downloadSampleData}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Sample Data (CSV)
          </Button>
          <p className="text-gray-500 text-[10px] text-center mt-2">
            10 sample records • Synthetic patient data
          </p>
        </CardContent>
      </Card>

      {/* What You Can Do */}
      <Card className="bg-[#1E293B] border-cyan-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-cyan-400 flex items-center gap-2">
            🎯 What You Can Do Here
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-gray-400 text-[11px] space-y-1.5 list-disc list-inside">
            <li>Track <span className="text-white">patient volumes</span> by origin and destination</li>
            <li>Compare <span className="text-white">treatment costs</span> vs competitor markets</li>
            <li>Identify <span className="text-white">top specialties</span> driving medical tourism</li>
            <li>Monitor <span className="text-white">revenue trends</span> over time</li>
            <li>Export <span className="text-white">sample data</span> for offline analysis</li>
            <li>Make <span className="text-white">data-driven decisions</span> on investment and marketing</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}