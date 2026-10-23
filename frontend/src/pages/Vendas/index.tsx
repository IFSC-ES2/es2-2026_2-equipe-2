import React, { useEffect, useState, useMemo } from 'react';
import BaseLayout from '../../components/templates/BaseLayout';
import Table, {
  type Column,
  type TableDataRow,
} from '../../components/organisms/Table';
import OrderCreateModal from '../../components/organisms/Modals/OrderCreateModal';
import GraficoVendas, { type PeriodoTipo } from './GraficoVendas';
import FiltroVendas, { type FiltrosVendaValores } from './FiltroVendas';
import { getPedidos, deletePedido } from '../../services/pedido.service';
import type { PedidoComRelacionamentos } from '../../interfaces/pedido.interface';

const colunasVendas: Column[] = [
  { key: 'data', label: 'Data' },
  { key: 'pedido_codigo', label: 'Pedido' },
  { key: 'produto', label: 'Produto' },
  { key: 'quantidade', label: 'Qtd.' },
  { key: 'total', label: 'Total' },
  { key: 'cliente', label: 'Cliente' },
];

const filtrosIniciais: FiltrosVendaValores = {
  busca: '',
  dataDe: '',
  dataAte: '',
  valorMin: '',
  valorMax: '',
};

const Vendas: React.FC = () => {
  const [pedidos, setPedidos] = useState<PedidoComRelacionamentos[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [periodo, setPeriodo] = useState<PeriodoTipo>('semana');
  const [filtros, setFiltros] = useState<FiltrosVendaValores>(filtrosIniciais);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<
    PedidoComRelacionamentos | undefined
  >(undefined);

  const carregarDados = async () => {
    try {
      setLoading(true);
      setError(null);
      const resPedidos = await getPedidos();
      setPedidos(Array.isArray(resPedidos) ? resPedidos : []);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Erro ao carregar dados de vendas.',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    getPedidos()
      .then((resPedidos) => {
        if (isMounted) {
          setPedidos(Array.isArray(resPedidos) ? resPedidos : []);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : 'Erro ao carregar dados de vendas.',
          );
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenCriarModal = () => {
    setSelectedOrder(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (row: TableDataRow) => {
    const rawOrder = (
      row as unknown as { raw_pedido?: PedidoComRelacionamentos }
    ).raw_pedido;
    if (rawOrder) {
      setSelectedOrder(rawOrder);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (row: TableDataRow) => {
    const rawOrder = (
      row as unknown as { raw_pedido?: PedidoComRelacionamentos }
    ).raw_pedido;
    const pedidoId =
      rawOrder?.id ?? (row as unknown as { pedido_id?: number }).pedido_id;

    if (!pedidoId) return;

    try {
      setError(null);
      await deletePedido(pedidoId);
      await carregarDados();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Erro ao excluir o pedido.',
      );
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedOrder(undefined);
  };

  const handleSuccess = () => {
    carregarDados();
    handleModalClose();
  };

  const handleFiltroChange = (novosFiltros: Partial<FiltrosVendaValores>) => {
    setFiltros((prev) => ({ ...prev, ...novosFiltros }));
  };

  const handleLimparFiltros = () => {
    setFiltros(filtrosIniciais);
  };

  // Transforma pedidos com múltiplos itens em linhas tabulares (produtos vendidos)
  const linhasTabela: TableDataRow[] = useMemo(() => {
    const linhas: TableDataRow[] = [];

    for (const ped of pedidos) {
      const dataFormatada = ped.data_pedido
        ? new Date(ped.data_pedido).toLocaleDateString('pt-BR')
        : '-';
      const clienteNome = ped.cliente?.nome ?? `Cliente #${ped.cliente_id}`;

      if (!ped.itens || ped.itens.length === 0) {
        linhas.push({
          id: `pedido-${ped.id}`,
          pedido_id: ped.id,
          pedido_codigo: `#${ped.id}`,
          data: dataFormatada,
          produto: 'Sem itens',
          quantidade: 0,
          total: Number(ped.valor_total || 0).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
          totalRaw: Number(ped.valor_total || 0),
          cliente: clienteNome,
          raw_pedido: ped,
        } as unknown as TableDataRow);
      } else {
        ped.itens.forEach((it, idx) => {
          const subtotalItem =
            Number(it.quantidade || 0) * Number(it.preco_unitario || 0);

          linhas.push({
            id: `pedido-${ped.id}-item-${it.id ?? idx}`,
            pedido_id: ped.id,
            pedido_codigo: `#${ped.id}`,
            data: dataFormatada,
            dataRaw: ped.data_pedido,
            produto: it.produto?.nome ?? `Produto #${it.produto_id}`,
            quantidade: it.quantidade,
            total: subtotalItem.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }),
            totalRaw: subtotalItem,
            cliente: clienteNome,
            raw_pedido: ped,
          } as unknown as TableDataRow);
        });
      }
    }

    // Aplicação dos Filtros
    return linhas.filter((item) => {
      const itemTyped = item as unknown as {
        produto: string;
        cliente: string;
        dataRaw?: string | Date;
        totalRaw: number;
      };

      // Filtro de busca (produto ou cliente)
      if (filtros.busca.trim()) {
        const query = filtros.busca.toLowerCase();
        const matchProd = itemTyped.produto.toLowerCase().includes(query);
        const matchCli = itemTyped.cliente.toLowerCase().includes(query);
        if (!matchProd && !matchCli) return false;
      }

      // Filtro de data De
      if (filtros.dataDe && itemTyped.dataRaw) {
        const dataItem = new Date(itemTyped.dataRaw).getTime();
        const dataMin = new Date(filtros.dataDe).getTime();
        if (dataItem < dataMin) return false;
      }

      // Filtro de data Até
      if (filtros.dataAte && itemTyped.dataRaw) {
        const dataItem = new Date(itemTyped.dataRaw).getTime();
        const dataMax = new Date(`${filtros.dataAte}T23:59:59`).getTime();
        if (dataItem > dataMax) return false;
      }

      // Filtro de valor mínimo
      if (filtros.valorMin && itemTyped.totalRaw < Number(filtros.valorMin)) {
        return false;
      }

      // Filtro de valor máximo
      if (filtros.valorMax && itemTyped.totalRaw > Number(filtros.valorMax)) {
        return false;
      }

      return true;
    });
  }, [pedidos, filtros]);

  return (
    <BaseLayout title="Vendas">
      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show mb-4"
          role="alert"
        >
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError(null)}
            aria-label="Fechar"
          />
        </div>
      )}

      {/* Componente Superior: Gráfico de Vendas e Top Produtos */}
      <GraficoVendas
        pedidos={pedidos}
        periodoSelecionado={periodo}
        onPeriodoChange={setPeriodo}
        onCriarPedido={handleOpenCriarModal}
      />

      {/* Componente de Filtros */}
      <FiltroVendas
        filtros={filtros}
        onFiltroChange={handleFiltroChange}
        onLimparFiltros={handleLimparFiltros}
      />

      {/* Tabela de Produtos Vendidos */}
      <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mt-3">
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando vendas...</span>
            </div>
          </div>
        ) : (
          <Table
            columns={colunasVendas}
            data={linhasTabela}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Modal de Criação e Edição de Pedido */}
      {isModalOpen && (
        <OrderCreateModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSuccess={handleSuccess}
          order={selectedOrder}
        />
      )}
    </BaseLayout>
  );
};

export default Vendas;
