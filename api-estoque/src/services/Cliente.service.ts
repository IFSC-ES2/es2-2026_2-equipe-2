import { ValidationError, EntityNotFound } from "../errors/index";
import { Cliente, ClienteCreate, ClienteUpdate } from "../models/index";
import { ClienteRepository } from "../repositories/Cliente.repository";
import logger from "../config/logger";
import validateId from "../utils/validateId";

const ENTITY_NAME = "cliente";

export class ClienteService {
  private repository: ClienteRepository;

  constructor(repository?: ClienteRepository) {
    this.repository = repository ?? new ClienteRepository();
  }

  public async findAll(): Promise<Cliente[] | null> {
    try {
      logger.info("[Cliente.service] findAll - fetching all clients");

      const clientes = await this.repository.findAll();

      logger.info(
        `[Cliente.service] findAll - ${clientes?.length || "0"} clients retrieved`,
      );

      return clientes;
    } catch (error) {
      logger.error("[Cliente.service] findAll - error fetching clients", error);
      throw error;
    }
  }

  public async findById(id: number | string): Promise<Cliente | null> {
    try {
      const parsedId = Number(id);
      logger.info(`[Cliente.service] findById - fetching client ${parsedId}`);

      if (!validateId(parsedId)) {
        throw ValidationError.invalidId(ENTITY_NAME);
      }

      const cliente = await this.repository.findById(parsedId);

      if (!cliente) throw new EntityNotFound(ENTITY_NAME);

      logger.info(`[Cliente.service] findById - client ${parsedId} retrieved`);

      return cliente;
    } catch (error) {
      logger.error(
        `[Cliente.service] findById - error fetching client ${id}`,
        error,
      );
      throw error;
    }
  }

  public async create(data: ClienteCreate): Promise<Cliente> {
    try {
      const nome = data?.nome?.trim();
      const email = data?.email?.trim();

      logger.info(`[Cliente.service] create - creating client "${nome}"`);

      if (!nome) throw ValidationError.requiredField("nome", ENTITY_NAME);
      if (!email) throw ValidationError.requiredField("email", ENTITY_NAME);

      const created = await this.repository.create({
        ...data,
        nome,
        email,
        telefone:
          typeof data.telefone === "string"
            ? data.telefone.trim()
            : data.telefone,
        documento:
          typeof data.documento === "string"
            ? data.documento.trim()
            : data.documento,
        endereco:
          typeof data.endereco === "string"
            ? data.endereco.trim()
            : data.endereco,
      });

      logger.info(
        `[Cliente.service] create - client created with id ${created.id}`,
      );

      return created;
    } catch (error) {
      logger.error("[Cliente.service] create - error creating client", error);
      throw error;
    }
  }

  public async update(
    id: number | string,
    data: ClienteUpdate,
  ): Promise<Cliente | null> {
    try {
      const parsedId = Number(id);
      logger.info(`[Cliente.service] update - updating client ${parsedId}`);

      if (!validateId(parsedId)) {
        throw ValidationError.invalidId(ENTITY_NAME);
      }

      const cliente = await this.repository.findById(parsedId);
      if (!cliente) throw new EntityNotFound(ENTITY_NAME);

      const updateData: ClienteUpdate = { ...data };
      if (data.nome !== undefined) updateData.nome = data.nome.trim();
      if (data.email !== undefined) updateData.email = data.email.trim();
      if (typeof data.telefone === "string") {
        updateData.telefone = data.telefone.trim();
      }
      if (typeof data.documento === "string") {
        updateData.documento = data.documento.trim();
      }
      if (typeof data.endereco === "string") {
        updateData.endereco = data.endereco.trim();
      }

      const updated = await this.repository.update(parsedId, updateData);

      logger.info(`[Cliente.service] update - client ${parsedId} updated`);

      return updated;
    } catch (error) {
      logger.error(
        `[Cliente.service] update - error updating client ${id}`,
        error,
      );
      throw error;
    }
  }

  public async delete(id: number | string): Promise<boolean> {
    try {
      const parsedId = Number(id);
      logger.info(`[Cliente.service] delete - deleting client ${parsedId}`);

      if (!validateId(parsedId)) {
        throw ValidationError.invalidId(ENTITY_NAME);
      }

      const cliente = await this.repository.findById(parsedId);
      if (!cliente) throw new EntityNotFound(ENTITY_NAME);

      await this.repository.delete(parsedId);

      logger.info(`[Cliente.service] delete - client ${parsedId} deleted`);

      return true;
    } catch (error) {
      logger.error(
        `[Cliente.service] delete - error deleting client ${id}`,
        error,
      );
      throw error;
    }
  }
}
