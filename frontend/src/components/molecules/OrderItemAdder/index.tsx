import React from 'react';
import FormSelect from '../../atoms/Inputs/FormSelect';
import FormInput from '../../atoms/Inputs/FormInput';
import Button from '../../atoms/Button';
import type { Produto } from '../../../interfaces/produto.interface';
import './index.css';

export interface OrderItemAdderProps {
  produtos: Produto[];
  selectedProdutoId: string;
  quantidade: number;
  preco: string;
  onProdutoChange: (produtoId: string) => void;
  onQuantidadeChange: (qtd: number) => void;
  onPrecoChange: (preco: string) => void;
  onAddItem: () => void;
}

const OrderItemAdder: React.FC<OrderItemAdderProps> = ({
  produtos,
  selectedProdutoId,
  quantidade,
  preco,
  onProdutoChange,
  onQuantidadeChange,
  onPrecoChange,
  onAddItem,
}) => {
  const produtoOptions = [
    { label: 'Selecione um produto...', value: '' },
    ...produtos.map((p) => ({
      label: `${p.nome} - R$ ${Number(p.preco).toFixed(2)} (Estoque: ${p.quantidade})`,
      value: String(p.id),
    })),
  ];

  return (
    <div className="order-item-adder">
      <h6 className="order-item-adder-title">Adicionar Itens ao Pedido</h6>
      <div className="row g-2 align-items-end">
        <div className="col-md-5">
          <FormSelect
            label="Produto"
            name="adicionar-produto-select"
            value={selectedProdutoId}
            onChange={(e) => onProdutoChange(e.target.value)}
            options={produtoOptions}
            className="form-select-sm"
          />
        </div>
        <div className="col-md-2">
          <FormInput
            label="Qtd."
            name="adicionar-produto-qtd"
            type="number"
            min={1}
            value={quantidade}
            onChange={(e) =>
              onQuantidadeChange(Math.max(1, parseInt(e.target.value) || 1))
            }
            className="form-control-sm"
          />
        </div>
        <div className="col-md-3">
          <FormInput
            label="Preço Unit. (R$)"
            name="adicionar-produto-preco"
            type="number"
            step="0.01"
            min={0.01}
            placeholder="0,00"
            value={preco}
            onChange={(e) => onPrecoChange(e.target.value)}
            className="form-control-sm"
          />
        </div>
        <div className="col-md-2 d-grid mb-3">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onAddItem}
          >
            + Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderItemAdder;
