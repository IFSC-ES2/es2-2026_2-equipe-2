import React from 'react';
import BaseLayout from '../../components/templates/BaseLayout';

const Vendas: React.FC = () => {
  return (
    <BaseLayout title="Vendas">
      <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
        <h3 className="h5 fw-bold text-secondary mb-2">Vendas Realizadas</h3>
        <p className="text-muted mb-0">Módulo de Vendas em desenvolvimento.</p>
      </div>
    </BaseLayout>
  );
};

export default Vendas;
