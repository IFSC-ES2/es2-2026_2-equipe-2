import { ValidationError, EntityNotFound } from "../errors/index";
import {
  Pedido,
  PedidoCreate,
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

      if (!data.itens || data.itens.length === 0) {
        throw new ValidationError("O pedido deve conter ao menos um item");
      }

      const cliente = await this.clienteRepository.findById(data.cliente_id);
      if (!cliente) {
        throw new ValidationError("Cliente informado não existe");
      }

      const itensValidados: ItemPedidoCreate[] = [];

      for (const item of data.itens) {
        if (!item.produto_id || !item.quantidade || item.quantidade <= 0) {
          throw new ValidationError(
            "Cada item deve ter um produto e uma quantidade maior que zero",
          );
        }

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
          throw new ValidationError(
            "O desconto passou da margem máxima de 15%!",
          );
        }

        itensValidados.push({
          produto_id: item.produto_id,
          quantidade: item.quantidade,
          preco_unitario: item.preco_unitario,
        });
      }

      const created = await this.repository.createComItens({
        cliente_id: data.cliente_id,
        data_pedido: data.data_pedido ? new Date(data.data_pedido) : new Date(),
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
}
