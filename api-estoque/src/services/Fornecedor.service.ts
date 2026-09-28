import { Fornecedor } from "../models";
import { FornecedorRepository } from "../repositories";

export class FornecedorService {
  private repository: FornecedorRepository;
  constructor(repository?: FornecedorRepository) {
    this.repository = repository ?? new FornecedorRepository();
  }
  public async findAll(): Promise<Fornecedor[] | null> {
    return this.repository.findAll();
  }
}
