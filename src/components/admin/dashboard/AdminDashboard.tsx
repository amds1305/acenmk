
import React from 'react';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { DashboardHeader } from './DashboardHeader';
import { StatCards } from './StatCards';
import { AnalyticsSection } from './AnalyticsSection';
import { ActivitySection } from './ActivitySection';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <StatCards />
      <div id="analytics" className="pt-6">
        <AnalyticsSection />
      </div>
      <ActivitySection />
    </div>
  );
};

export default AdminDashboard;
