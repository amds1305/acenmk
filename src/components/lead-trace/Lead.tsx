
import React from 'react';
import LeadTraceManager from './LeadTraceManager';

const Lead = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="bg-gray-50 dark:bg-gray-800 py-10 px-6 rounded-lg">
        <h1 className="text-3xl font-bold tracking-tight">LeadTrace - Gestion des leads</h1>
        <p className="text-muted-foreground mt-2">
          Gérez vos contacts et transformez-les en opportunités commerciales.
        </p>
      </div>
      <LeadTraceManager />
    </div>
  );
};

export default Lead;
