import React, { useState, useEffect, useId } from 'react';
import Button from '../../../atoms/Button';
import FormSelect from '../../../atoms/Inputs/FormSelect';
import FormInput from '../../../atoms/Inputs/FormInput';
import { getClientes } from '../../../../services/cliente.service';
import { getProdutos } from '../../../../services/produto.service';
import {
  createPedido,
  updatePedido,
} from '../../../../services/pedido.service';
import type { Cliente } from '../../../../interfaces/cliente.interface';
import type { Produto } from '../../../../interfaces/produto.interface';
import type {
  PedidoComRelacionamentos,
  ItemPedidoCreate,
} from '../../../../interfaces/pedido.interface';
import './index.css';

interface FormCreateOrderProps {
  onSuccess: () => void;
  onCancel: () => void;
  order?: PedidoComRelacionamentos;
}

interface ItemFormState extends ItemPedidoCreate {
  tempId: string;
  produtoNome?: string;
  precoMaximo?: number;
}

const FormCreateOrder: React.FC<FormCreateOrderProps> = ({
  onSuccess,
  onCancel,
  order,
}) => {
  const isEditing = Boolean(order);
  const clienteSelectId = useId();

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  const [clienteId, setClienteId] = useState<number | string>(
    order?.cliente_id ?? '',
  );
  const [dataPedido, setDataPedido] = useState<string>(() => {
    if (order?.data_pedido) {
      const d = new Date(order.data_pedido);
      return d.toISOString().split('T')[0];
    }
    return new Date().toISOString().split('T')[0];
  });

  const [itens, setItens] = useState<ItemFormState[]>(() => {
    if (order?.itens && order.itens.length > 0) {
      return order.itens.map((it) => ({
        tempId: String(it.id ?? Math.random()),
        produto_id: it.produto_id,
        quantidade: it.quantidade,
        preco_unitario: Number(it.preco_unitario),
        produtoNome: it.produto?.nome,
        precoMaximo: it.produto ? Number(it.produto.preco) : undefined,
      }));
    }
    return [];
  });

  const [novoProdutoId, setNovoProdutoId] = useState<string>('');
  const [novaQuantidade, setNovaQuantidade] = useState<number>(1);
  const [novoPreco, setNovoPreco] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function carregarDados() {
      try {
        const [resClientes, resProdutos] = await Promise.all([
          getClientes(),
          getProdutos(),
        ]);
        if (isMounted) {
          setClientes(resClientes.data as unknown as Cliente[]);
          setProdutos(resProdutos.data as unknown as Produto[]);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : 'Erro ao carregar clientes e produtos.',
          );
        }
      } finally {
        if (isMounted) setLoadingInitial(false);
      }
    }

    carregarDados();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectNovoProduto = (prodIdStr: string) => {
    setNovoProdutoId(prodIdStr);
    setError(null);
    const prod = produtos.find((p) => String(p.id) === prodIdStr);
    if (prod) {
      setNovoPreco(String(prod.preco));
    } else {
      setNovoPreco('');
    }
  };

  const handlePrecoChange = (valor: string) => {
    setNovoPreco(valor);
    setError(null);

    const precoNum = Number(valor);
    const prod = produtos.find((p) => String(p.id) === novoProdutoId);

    if (prod && !isNaN(precoNum) && valor.trim() !== '') {
      const precoMax = Number(prod.preco);
      const precoMin = precoMax * 0.85;

      if (precoNum > precoMax) {
        setError(
          `Preço não pode ser maior que o valor cadastrado (R$ ${precoMax.toFixed(2)}).`,
        );
      } else if (precoNum < precoMin) {
        setError(
          `O desconto ultrapassou o limite permitido de 15% (mínimo R$ ${precoMin.toFixed(2)}).`,
        );
      }
    }
  };

  const handleAdicionarItem = () => {
    setError(null);
    if (!novoProdutoId) {
      setError('Selecione um produto para adicionar.');
      return;
    }

    const prodIdNum = Number(novoProdutoId);
    if (itens.some((i) => i.produto_id === prodIdNum)) {
      setError('Este produto já foi adicionado ao pedido.');
      return;
    }

    const prod = produtos.find((p) => p.id === prodIdNum);
    const precoNum = Number(novoPreco);

    if (isNaN(precoNum) || precoNum <= 0) {
      setError('Informe um preço unitário válido.');
      return;
    }

    if (prod) {
      const precoMax = Number(prod.preco);
      const precoMin = precoMax * 0.85;
      if (precoNum > precoMax) {
        setError(
          `Preço não pode ser maior que o valor cadastrado (R$ ${precoMax.toFixed(2)}).`,
        );
        return;
      }
      if (precoNum < precoMin) {
        setError(
          `Desconto acima do limite permitido de 15% (mínimo R$ ${precoMin.toFixed(2)}).`,
        );
        return;
      }
    }

    if (novaQuantidade < 1) {
      setError('A quantidade deve ser de no mínimo 1 unidade.');
      return;
    }

    setItens((prev) => [
      ...prev,
      {
        tempId: String(Date.now() + Math.random()),
        produto_id: prodIdNum,
        quantidade: novaQuantidade,
        preco_unitario: precoNum,
        produtoNome: prod?.nome ?? `Produto #${prodIdNum}`,
        precoMaximo: prod ? Number(prod.preco) : undefined,
      },
    ]);

    setNovoProdutoId('');
    setNovaQuantidade(1);
    setNovoPreco('');
  };

  const handleRemoverItem = (tempId: string) => {
    setItens((prev) => prev.filter((i) => i.tempId !== tempId));
  };

  const totalGeral = itens.reduce(
    (acc, curr) => acc + curr.quantidade * curr.preco_unitario,
    0,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!clienteId) {
      setError('Por favor, selecione um cliente.');
      return;
    }

    if (itens.length === 0) {
      setError('O pedido deve conter ao menos um produto.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        cliente_id: Number(clienteId),
        data_pedido: dataPedido
          ? new Date(dataPedido).toISOString()
          : undefined,
        itens: itens.map((it) => ({
          produto_id: it.produto_id,
          quantidade: Number(it.quantidade),
          preco_unitario: Number(it.preco_unitario),
        })),
      };

      if (isEditing && order) {
        await updatePedido(order.id, payload);
      } else {
        await createPedido(payload);
      }

      onSuccess();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Erro ao processar o pedido. Verifique os dados.',
      );
    } finally {
      setLoading(false);
    }
  };

  if (loadingInitial) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando formulário...</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="form-create-order">
      {error && (
        <div className="alert alert-danger py-2 mb-2" role="alert">
          {error}
        </div>
      )}

      <div className="row g-3">
        <div className="col-md-7">
          <FormSelect
            label="Cliente"
            name={clienteSelectId}
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            options={[
              { label: 'Selecione um cliente...', value: '' },
              ...clientes.map((c) => ({
                label: `${c.nome} (${c.documento || c.email || 'Sem documento'})`,
                value: String(c.id),
              })),
            ]}
            required
          />
        </div>
        <div className="col-md-5">
          <FormInput
            label="Data da Venda"
            name="data_pedido"
            type="date"
            value={dataPedido}
            onChange={(e) => setDataPedido(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="card p-3 bg-light border-0 rounded-3 mt-2">
        <h6 className="fw-bold mb-3 text-secondary">
          Adicionar Itens ao Pedido
        </h6>
        <div className="row g-2 align-items-end">
          <div className="col-md-5">
            <label
              htmlFor="adicionar-produto-select"
              className="form-label small fw-semibold"
            >
              Produto
            </label>
            <select
              id="adicionar-produto-select"
              className="form-select form-select-sm"
              value={novoProdutoId}
              onChange={(e) => handleSelectNovoProduto(e.target.value)}
            >
              <option value="">Selecione um produto...</option>
              {produtos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome} - R$ {Number(p.preco).toFixed(2)} (Estoque:{' '}
                  {p.quantidade})
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <label
              htmlFor="adicionar-produto-qtd"
              className="form-label small fw-semibold"
            >
              Qtd.
            </label>
            <input
              id="adicionar-produto-qtd"
              type="number"
              min="1"
              className="form-control form-control-sm"
              value={novaQuantidade}
              onChange={(e) =>
                setNovaQuantidade(Math.max(1, parseInt(e.target.value) || 1))
              }
            />
          </div>
          <div className="col-md-3">
            <label
              htmlFor="adicionar-produto-preco"
              className="form-label small fw-semibold"
            >
              Preço Unit. (R$)
            </label>
            <input
              id="adicionar-produto-preco"
              type="number"
              step="0.01"
              min="0.01"
              className="form-control form-control-sm"
              value={novoPreco}
              onChange={(e) => handlePrecoChange(e.target.value)}
              placeholder="0,00"
            />
          </div>
          <div className="col-md-2 d-grid">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleAdicionarItem}
            >
              + Adicionar
            </Button>
          </div>
        </div>
      </div>

      <div>
        <h6 className="fw-bold mb-2">Itens Selecionados ({itens.length})</h6>
        {itens.length === 0 ? (
          <p className="text-muted small fst-italic">
            Nenhum produto adicionado ao pedido ainda.
          </p>
        ) : (
          <div className="table-responsive border rounded-3 mb-3">
            <table className="order-items-table">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th style={{ width: '90px' }} className="text-center">
                    Qtd.
                  </th>
                  <th style={{ width: '130px' }} className="text-end">
                    Unitário
                  </th>
                  <th style={{ width: '130px' }} className="text-end">
                    Subtotal
                  </th>
                  <th style={{ width: '60px' }} className="text-center">
                    Ação
                  </th>
                </tr>
              </thead>
              <tbody>
                {itens.map((item) => (
                  <tr key={item.tempId}>
                    <td>
                      <span className="fw-medium">
                        {item.produtoNome ??
                          produtos.find((p) => p.id === item.produto_id)
                            ?.nome ??
                          `Produto #${item.produto_id}`}
                      </span>
                    </td>
                    <td className="text-center">{item.quantidade}</td>
                    <td className="text-end">
                      R$ {item.preco_unitario.toFixed(2)}
                    </td>
                    <td className="text-end fw-semibold">
                      R$ {(item.quantidade * item.preco_unitario).toFixed(2)}
                    </td>
                    <td className="text-center">
                      <button
                        type="button"
                        className="btn btn-sm btn-link text-danger p-0"
                        title="Remover produto"
                        onClick={() => handleRemoverItem(item.tempId)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="order-total-card">
        <span className="total-label">Valor Total do Pedido:</span>
        <span className="total-value">
          {totalGeral.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>
      </div>

      <div className="d-flex justify-content-end gap-2 mt-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={loading || itens.length === 0}
        >
          {loading
            ? 'Salvando...'
            : isEditing
              ? 'Atualizar Pedido'
              : 'Criar Pedido'}
        </Button>
      </div>
    </form>
  );
};

export default FormCreateOrder;
