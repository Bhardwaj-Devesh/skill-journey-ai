'use client';

import React, { useState } from 'react';
import ChatbotPhaseProgress from '@/components/ChatbotPhaseProgress';
import LiveIkigaiChart from '@/components/LiveIkigaiChart';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

interface IkigaiData {
  whatILove: string[];
  whatImGoodAt: string[];
  whatTheWorldNeeds: string[];
  whatICanBePaidFor: string[];
  summary?: string;
}

export default function IkigaiPage() {
  const [activeSection, setActiveSection] = useState<keyof IkigaiData | null>(null);
  const { user } = useAuth();
  const email = user?.email;

  const handleUpdateIkigai = (category: keyof IkigaiData, items: string[]) => {
    console.log('Updated category:', category, 'with items:', items);
    setActiveSection(category);
  };

  const handleSectionComplete = (section: keyof IkigaiData) => {
    console.log('Completed section:', section);
  };

  if (!email) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Please log in to access your Ikigai profile</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">Discover Your Ikigai</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <ChatbotPhaseProgress
            email={email}
            onUpdateIkigai={handleUpdateIkigai}
          />
        </Card>

        <Card className="p-6">
          <LiveIkigaiChart
            email={email}
            activeSection={activeSection}
            onSectionComplete={handleSectionComplete}
          />
        </Card>
      </div>
    </div>
  );
} 