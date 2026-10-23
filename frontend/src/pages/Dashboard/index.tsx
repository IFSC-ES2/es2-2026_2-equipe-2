import React from 'react';
import BaseLayout from '../../components/templates/BaseLayout';

const Dashboard: React.FC = () => {
  return (
    <BaseLayout title="Dashboard">
      <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
        <h3 className="h5 fw-bold text-secondary mb-2">Visão Geral</h3>
        <p className="text-muted mb-0">
          Módulo de Dashboard em desenvolvimento.
        </p>
      </div>
    </BaseLayout>
  );
};

export default Dashboard;
