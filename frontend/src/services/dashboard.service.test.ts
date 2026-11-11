import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  buscarResumoDashboard,
  buscarDadosDashboard,
  calcularGraficoVendas,
  calcularDadosDashboard,
  formatarData,
  DASHBOARD_API_URL,
} from './dashboard.service';
import * as pedidoService from './pedido.service';
import * as produtoService from './produto.service';
import type { DashboardResumo } from '../interfaces/dashboard.interface';

const mockResumoBackend: DashboardResumo = {
  periodo: 30,
  vendas: {
    ganhos_totais: 25000,
    total_vendas: 10,
    total_produtos_vendidos: 40,
  },
  produtos_mais_vendidos: [
    {
      id: 1,
      sku: 'ELE-1001',
      nome: 'Smartphone Pro Max',
      unidades_vendidas: 15,
      receita: 18000,
    },
  ],
  categoria_mais_vendida: {
    id: 2,
    nome: 'Eletrônicos',
    unidades_vendidas: 20,
    receita: 22000,
  },
  estoque: {
    total_produtos: 50,
    produtos_estoque_baixo: [
      {
        id: 3,
        sku: 'INF-2001',
        nome: 'Mouse Sem Fio',
        quantidade: 1,
        estoque_minimo: 5,
        faltam_para_o_minimo: 4,
      },
    ],
    maiores_estoques: [
      {
        id: 4,
        sku: 'CAB-3001',
        nome: 'Cabo HDMI',
        quantidade: 80,
        estoque_minimo: 10,
      },
    ],
  },
};

describe('dashboard.service', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  describe('formatarData', () => {
    it('deve formatar data corretamente para dd.mm.aaaa', () => {
      const formatado = formatarData('2024-05-15T10:00:00Z');
      expect(formatado).toMatch(/15\.\d{2}\.2024/);
    });

    it('deve retornar hífen para datas indefinidas ou inválidas', () => {
      expect(formatarData(undefined)).toBe('-');
      expect(formatarData('data-invalida')).toBe('-');
    });
  });

  describe('buscarResumoDashboard', () => {
    it('deve buscar resumo chamando a URL correta e desempacotando data', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          status: 200,
          title: 'Dashboard summary retrieved',
          data: mockResumoBackend,
        }),
      } as unknown as Response);

      const resumo = await buscarResumoDashboard(30);

      expect(globalThis.fetch).toHaveBeenCalledWith(
        `${DASHBOARD_API_URL}?periodo=30`,
      );
      expect(resumo.periodo).toBe(30);
      expect(resumo.vendas.ganhos_totais).toBe(25000);
    });

    it('deve lançar erro quando a resposta HTTP não for ok', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ message: 'Erro interno no servidor' }),
      } as unknown as Response);

      await expect(buscarResumoDashboard()).rejects.toThrow(
        'Erro interno no servidor',
      );
    });
  });

  describe('buscarDadosDashboard (sem fallback)', () => {
    it('deve lançar erro diretamente se a API de resumo falhar, sem efetuar fallback', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ message: 'Falha no banco do dashboard' }),
      } as unknown as Response);

      vi.spyOn(pedidoService, 'getPedidos').mockResolvedValue([]);
      vi.spyOn(produtoService, 'getProdutos').mockResolvedValue({
        columns: [],
        data: [],
      });

      await expect(buscarDadosDashboard()).rejects.toThrow(
        'Falha no banco do dashboard',
      );
    });

    it('deve lançar erro se a busca de pedidos falhar', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ data: mockResumoBackend }),
      } as unknown as Response);

      vi.spyOn(pedidoService, 'getPedidos').mockRejectedValue(
        new Error('Falha na API de pedidos'),
      );
      vi.spyOn(produtoService, 'getProdutos').mockResolvedValue({
        columns: [],
        data: [],
      });

      await expect(buscarDadosDashboard()).rejects.toThrow(
        'Falha na API de pedidos',
      );
    });

    it('deve consolidar dados com sucesso quando todas as APIs responderem', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ data: mockResumoBackend }),
      } as unknown as Response);

      vi.spyOn(pedidoService, 'getPedidos').mockResolvedValue([]);
      vi.spyOn(produtoService, 'getProdutos').mockResolvedValue({
        columns: [],
        data: [],
      });

      const dados = await buscarDadosDashboard();
      expect(dados.kpi.faturamentoTotal).toBe(25000);
      expect(dados.kpi.totalProdutosVendidos).toBe(40);
      expect(dados.kpi.categoriaMaisVendida).toBe('Eletrônicos');
      expect(dados.kpi.produtoMaisVendido).toBe('Smartphone Pro Max');
    });
  });

  describe('calcularGraficoVendas', () => {
    it('deve gerar chaves 1S, 1M, 3M, 1A com pontos vazios caso não haja pedidos', () => {
      const resultado = calcularGraficoVendas([]);
      expect(resultado['1S'].length).toBe(7);
      expect(resultado['1M'].length).toBe(7);
      expect(resultado['3M'].length).toBe(3);
      expect(resultado['1A'].length).toBe(12);
    });
  });

  describe('calcularDadosDashboard', () => {
    it('deve calcular dados iniciais quando pedidos e produtos estiverem vazios', () => {
      const dados = calcularDadosDashboard([], []);
      expect(dados.kpi.faturamentoTotal).toBe(0);
      expect(dados.kpi.totalProdutosVendidos).toBe(0);
      expect(dados.kpi.produtoMaisVendido).toBe('-');
      expect(dados.kpi.categoriaMaisVendida).toBe('-');
    });
  });
});
