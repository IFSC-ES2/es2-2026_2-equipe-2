import { Cliente } from "./Cliente";
import { Produto } from "./Produto";

export type StatusPedido = "PENDENTE" | "CONCLUIDO" | "CANCELADO";

export interface Pedido {
  id: number;
  cliente_id: number;
  status: StatusPedido;
  data_pedido: Date;
  valor_total: number;
}

export interface ItemPedido {
  id: number;
  pedido_id: number;
  produto_id: number;
  quantidade: number;
  preco_unitario: number;
}

export interface ItemPedidoComProduto extends ItemPedido {
  produto: Produto | null;
}

export interface PedidoComRelacionamentos extends Pedido {
  cliente: Cliente | null;
  itens: ItemPedidoComProduto[];
}

export interface ItemPedidoCreate {
  produto_id: number;
  quantidade: number;
  preco_unitario: number;
}

export interface PedidoCreate {
  cliente_id: number;
  data_pedido?: Date;
  itens: ItemPedidoCreate[];
}