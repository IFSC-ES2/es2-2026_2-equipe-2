import { ValidationError, EntityNotFound } from "../errors/index";
import {
  Pedido,
  PedidoCreate,
  PedidoUpdate,
  PedidoComRelacionamentos,
  ItemPedidoCreate,
} from "../models/index";
import { PedidoRepository } from "../repositories/Pedido.repository";
import { ClienteRepository } from "../repositories/Cliente.repository";
import { ProdutoRepository } from "../repositories/Produto.repository";
import logger from "../config/logger";
import validateId from "../utils/validateId";

const ENTITY_NAME = "pedido";
const DESCONTO_MAXIMO = 0.15;

export class PedidoService {
  private repository: PedidoRepository;
  private clienteRepository: ClienteRepository;
  private produtoRepository: ProdutoRepository;

  constructor(
    repository?: PedidoRepository,
    clienteRepository?: ClienteRepository,
    produtoRepository?: ProdutoRepository,
  ) {
    this.repository = repository ?? new PedidoRepository();
    this.clienteRepository = clienteRepository ?? new ClienteRepository();
    this.produtoRepository = produtoRepository ?? new ProdutoRepository();
  }

  public async findAll(): Promise<PedidoComRelacionamentos[] | null> {
    try {
      logger.info("[Pedido.service] findAll - fetching all orders");
      const pedidos = await this.repository.findAllComRelacionamentos();
      logger.info(
        `[Pedido.service] findAll - ${pedidos?.length || "0"} orders retrieved`,
      );
      return pedidos;
    } catch (error) {
      logger.error("[Pedido.service] findAll - error fetching orders", error);
      throw error;
    }
  }

  public async findById(
    id: number | string,
  ): Promise<PedidoComRelacionamentos | null> {
    try {
      const parsedId = Number(id);
      logger.info(`[Pedido.service] findById - fetching order ${parsedId}`);

      if (!validateId(parsedId)) {
        throw ValidationError.invalidId(ENTITY_NAME);
      }

      const pedido = await this.repository.findByIdComRelacionamentos(parsedId);
      if (!pedido) throw new EntityNotFound(ENTITY_NAME);

      logger.info(`[Pedido.service] findById - order ${parsedId} retrieved`);
      return pedido;
    } catch (error) {
      logger.error(
        `[Pedido.service] findById - error fetching order ${id}`,
        error,
      );
      throw error;
    }
  }

  public async create(data: PedidoCreate): Promise<Pedido> {
    try {
      logger.info(
        `[Pedido.service] create - creating order for client ${data?.cliente_id}`,
      );

      if (!data.cliente_id) {
        throw ValidationError.requiredField("cliente_id", ENTITY_NAME);
      }

      const cliente = await this.clienteRepository.findById(data.cliente_id);
      if (!cliente) {
        throw new ValidationError("Cliente informado não existe");
      }

      const itensValidados = await this.validarItens(data.itens);

      const created = await this.repository.createComItens({
        cliente_id: data.cliente_id,
        data_pedido: data.data_pedido ?? new Date(),
        itens: itensValidados,
      });

      logger.info(
        `[Pedido.service] create - order created with id ${created.id}`,
      );

      return created;
    } catch (error) {
      logger.error("[Pedido.service] create - error creating order", error);
      throw error;
    }
  }

  private async validarItens(
    itens: ItemPedidoCreate[] | undefined,
  ): Promise<ItemPedidoCreate[]> {
    if (!itens || itens.length === 0) {
      throw new ValidationError("O pedido deve conter ao menos um item");
    }

    const produtosVistos = new Set<number>();
    const itensValidados: ItemPedidoCreate[] = [];

    for (const item of itens) {
      if (!item.produto_id || !item.quantidade || item.quantidade <= 0) {
        throw new ValidationError(
          "Cada item deve ter um produto e uma quantidade maior que zero",
        );
      }

      if (produtosVistos.has(item.produto_id)) {
        throw new ValidationError(
          "O mesmo produto não pode aparecer duas vezes no pedido",
        );
      }
      produtosVistos.add(item.produto_id);

      const produto = await this.produtoRepository.findById(item.produto_id);
      if (!produto) {
        throw new ValidationError(`Produto id ${item.produto_id} não existe`);
      }

      const precoMinimo = produto.preco * (1 - DESCONTO_MAXIMO);

      if (item.preco_unitario > produto.preco) {
        throw new ValidationError(
          "O valor do item não pode ser maior que o preço registrado do produto",
        );
      }

      if (item.preco_unitario < precoMinimo) {
        throw new ValidationError("O desconto passou da margem máxima de 15%!");
      }

      itensValidados.push({
        produto_id: item.produto_id,
        quantidade: item.quantidade,
        preco_unitario: item.preco_unitario,
      });
    }

    return itensValidados;
  }

  public async update(
    id: number | string,
    data: PedidoUpdate,
  ): Promise<Pedido | null> {
    try {
      const parsedId = Number(id);
      logger.info(`[Pedido.service] update - updating order ${parsedId}`);

      if (!validateId(parsedId)) {
        throw ValidationError.invalidId(ENTITY_NAME);
      }

      const pedido = await this.repository.findById(parsedId);
      if (!pedido) throw new EntityNotFound(ENTITY_NAME);

      if (data.cliente_id !== undefined) {
        const cliente = await this.clienteRepository.findById(data.cliente_id);
        if (!cliente) {
          throw new ValidationError("Cliente informado não existe");
        }
      }

      const itensValidados =
        data.itens !== undefined
          ? await this.validarItens(data.itens)
          : undefined;

      const updateData: PedidoUpdate = { ...data };
      if (itensValidados !== undefined) {
        updateData.itens = itensValidados;
      }

      const updated = await this.repository.updateComItens(
        parsedId,
        updateData,
      );

      logger.info(`[Pedido.service] update - order ${parsedId} updated`);

      return updated;
    } catch (error) {
      logger.error(
        `[Pedido.service] update - error updating order ${id}`,
        error,
      );
      throw error;
    }
  }

  public async delete(id: number | string): Promise<boolean> {
    try {
      const parsedId = Number(id);
      logger.info(`[Pedido.service] delete - deleting order ${parsedId}`);

      if (!validateId(parsedId)) {
        throw ValidationError.invalidId(ENTITY_NAME);
      }

      const pedido = await this.repository.findById(parsedId);
      if (!pedido) throw new EntityNotFound(ENTITY_NAME);

      await this.repository.delete(parsedId);

      logger.info(`[Pedido.service] delete - order ${parsedId} deleted`);

      return true;
    } catch (error) {
      logger.error(
        `[Pedido.service] delete - error deleting order ${id}`,
        error,
      );
      throw error;
    }
  }
}
