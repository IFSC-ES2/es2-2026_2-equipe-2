import { ValidationError } from "../errors/index";
import { DashboardResumo } from "../models/index";
import { DashboardRepository } from "../repositories/Dashboard.repository";
import logger from "../config/logger";

const PERIODOS_PERMITIDOS = [30, 90, 365];
const PERIODO_PADRAO = 30;
const LIMITE_LISTAS = 5;

export class DashboardService {
  private repository: DashboardRepository;

  constructor(repository?: DashboardRepository) {
    this.repository = repository ?? new DashboardRepository();
  }

  public async getResumo(
    periodo?: number | string | null,
  ): Promise<DashboardResumo> {
    try {
      const dias =
        periodo === undefined || periodo === null
          ? PERIODO_PADRAO
          : Number(periodo);

      logger.info(`[Dashboard.service] getResumo - period of ${dias} days`);

      if (!PERIODOS_PERMITIDOS.includes(dias)) {
        throw new ValidationError(
          `O período deve ser um destes valores (em dias): ${PERIODOS_PERMITIDOS.join(", ")}`,
        );
      }

      const [
        vendas,
        produtosMaisVendidos,
        categoriaMaisVendida,
        produtosEstoqueBaixo,
        maioresEstoques,
        totalProdutos,
      ] = await Promise.all([
        this.repository.getResumoVendas(dias),
        this.repository.getProdutosMaisVendidos(dias, LIMITE_LISTAS),
        this.repository.getCategoriaMaisVendida(dias),
        this.repository.getProdutosEstoqueBaixo(),
        this.repository.getMaioresEstoques(LIMITE_LISTAS),
        this.repository.getTotalProdutos(),
      ]);

      logger.info("[Dashboard.service] getResumo - summary built");

      return {
        periodo: dias,
        vendas,
        produtos_mais_vendidos: produtosMaisVendidos,
        categoria_mais_vendida: categoriaMaisVendida,
        estoque: {
          total_produtos: totalProdutos,
          produtos_estoque_baixo: produtosEstoqueBaixo,
          maiores_estoques: maioresEstoques,
        },
      };
    } catch (error) {
      logger.error(
        "[Dashboard.service] getResumo - error building summary",
        error,
      );
      throw error;
    }
  }
}
