'use client';

import { useState } from 'react';
import { Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-[#0A1628] to-transparent px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold text-white tracking-tight">
          <span className="text-teal-400">Infocreon Internship</span> - Medical Tourism Intelligence
        </h1>

        {/* Manual trigger button */}
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white hover:bg-teal-500/10 rounded-full h-9 w-9 p-0"
          onClick={() => setIsOpen(true)}
        >
          <Info className="h-5 w-5" />
        </Button>

        {/* Dialog controlled manually */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="bg-[#14203A] border-teal-500/30 text-white">
            <DialogHeader>
              <DialogTitle className="text-teal-400">Developer Signature</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">Architect</span>
                <span className="text-white font-medium">Sneha</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">Batch</span>
                <span className="text-white font-medium">Batch 5 Interns</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">PoC ID</span>
                <span className="text-white font-medium">13</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-400">GitHub</span>
                <span className="text-white font-medium">Sneha-2104</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Stack</span>
                <span className="text-white font-medium text-right">Next.js, FastAPI,<br />Tailwind CSS, Recharts</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}