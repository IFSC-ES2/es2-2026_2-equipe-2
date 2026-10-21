import type { Cliente } from './cliente.interface';
import type { Produto } from './produto.interface';

export type StatusPedido = 'PENDENTE' | 'CONCLUIDO' | 'CANCELADO';

export interface Pedido {
  id: number;
  cliente_id: number;
  status: StatusPedido;
  data_pedido: string | Date;
  valor_total: number;
}

export interface ItemPedido {
  id?: number;
  pedido_id?: number;
  produto_id: number;
  quantidade: number;
  preco_unitario: number;
}

export interface ItemPedidoComProduto extends ItemPedido {
  produto?: Produto | null;
}

export interface PedidoComRelacionamentos extends Pedido {
  cliente?: Cliente | null;
  itens: ItemPedidoComProduto[];
}

export interface ItemPedidoCreate {
  produto_id: number;
  quantidade: number;
  preco_unitario: number;
}

export interface PedidoCreate {
  cliente_id: number;
  data_pedido?: string | Date;
  itens: ItemPedidoCreate[];
}

export type PedidoUpdate = Partial<PedidoCreate>;

export interface PedidoItemRow {
  id: string | number;
  pedido_id: number;
  item_id?: number;
  data: string;
  produto: string;
  categoria: string;
  quantidade: number;
  total: number;
  cliente: string;
  status: StatusPedido;
  raw_pedido: PedidoComRelacionamentos;
}
