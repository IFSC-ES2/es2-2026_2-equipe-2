import React, { useEffect, useState } from 'react';
import BaseLayout from '../../components/templates/BaseLayout';
import SalesSection from '../../components/organisms/Dashboard/SalesSection';
import WarehouseSection from '../../components/organisms/Dashboard/WarehouseSection';
import {
  buscarDadosDashboard,
  type DadosDashboard,
} from '../../services/dashboard.service';
import './index.css';

const Dashboard: React.FC = () => {
  const [dados, setDados] = useState<DadosDashboard | null>(null);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let montado = true;

    buscarDadosDashboard()
      .then((dadosResposta) => {
        if (montado) {
          if (!dadosResposta) {
            setErro('Nenhum dado encontrado para exibição no dashboard.');
          } else {
            setDados(dadosResposta);
          }
        }
      })
      .catch((err: unknown) => {
        if (montado) {
          setErro(
            err instanceof Error
              ? err.message
              : 'Erro ao carregar dados do dashboard.',
          );
        }
      })
      .finally(() => {
        if (montado) {
          setCarregando(false);
        }
      });

    return () => {
      montado = false;
    };
  }, []);

  return (
    <BaseLayout title="Dashboard">
      <div className="dashboard-page-container">
        {carregando && (
          <div className="dashboard-loading text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando dados...</span>
            </div>
            <p className="mt-2 text-muted small">
              Carregando painel de controle...
            </p>
          </div>
        )}

        {!carregando && (erro || !dados) && (
          <div className="alert alert-danger shadow-sm mb-4" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2" />
            {erro ?? 'Nenhum dado encontrado para exibição no dashboard.'}
          </div>
        )}

        {!carregando && !erro && dados && (
          <>
            <SalesSection
              kpi={dados.kpi}
              vendasRecentes={dados.vendasRecentes}
              graficoVendas={dados.graficoVendas}
            />

            <WarehouseSection
              produtos={dados.produtosEstoque}
              distribuicaoCategorias={dados.distribuicaoCategorias}
            />
          </>
        )}
      </div>
    </BaseLayout>
  );
};

export default Dashboard;
