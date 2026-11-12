import { getPedidos } from './pedido.service';
import { getProdutos } from './produto.service';
import type { PedidoComRelacionamentos } from '../interfaces/pedido.interface';
import type {
  DadosDashboard,
  DashboardResumo,
  MetricasKpi,
  ItemVendaRecente,
  PontoDadosGrafico,
  ItemProdutoEstoque,
  ItemDistribuicaoCategoria,
} from '../interfaces/dashboard.interface';

export * from '../interfaces/dashboard.interface';

export const DASHBOARD_API_URL = 'http://localhost:8080/api/dashboard';

const CORES_PALETA = [
  '#f97316',
  '#2f9bd6',
  '#f87171',
  '#10b981',
  '#a855f7',
  '#eab308',
  '#06b6d4',
  '#6366f1',
];

export function formatarData(dataEntrada: string | Date | undefined): string {
  if (!dataEntrada) return '-';
  const d = new Date(dataEntrada);
  if (isNaN(d.getTime())) return '-';
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const ano = d.getFullYear();
  return `${dia}.${mes}.${ano}`;
}

export function calcularGraficoVendas(
  pedidos: PedidoComRelacionamentos[],
): Record<string, PontoDadosGrafico[]> {
  const pedidosValidos = pedidos.filter((p) => p.status !== 'CANCELADO');

  const diasSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  const mapaSemana: Record<string, number> = {};
  diasSemana.forEach((d) => {
    mapaSemana[d] = 0;
  });

  pedidosValidos.forEach((p) => {
    const d = new Date(p.data_pedido);
    if (!isNaN(d.getTime())) {
      const indice = (d.getDay() + 6) % 7;
      mapaSemana[diasSemana[indice]] += Number(p.valor_total || 0);
    }
  });

  // 1M (1 Mês): Intervalo de dias do mês
  const rotulosMes = ['18', '20', '22', '24', '26', '28', '30'];
  const mapaMes: Record<string, number> = {};
  rotulosMes.forEach((rotulo) => {
    mapaMes[rotulo] = 0;
  });

  pedidosValidos.forEach((p) => {
    const d = new Date(p.data_pedido);
    if (!isNaN(d.getTime())) {
      const dia = d.getDate();
      const alvo = rotulosMes.reduce((anterior, atual) =>
        Math.abs(Number(atual) - dia) < Math.abs(Number(anterior) - dia)
          ? atual
          : anterior,
      );
      mapaMes[alvo] += Number(p.valor_total || 0);
    }
  });

  const nomesMeses = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];
  const agora = new Date();
  const mesAtual = agora.getMonth();
  const ultimos3Meses = [
    (mesAtual + 10) % 12,
    (mesAtual + 11) % 12,
    mesAtual,
  ].map((indice) => nomesMeses[indice]);

  const mapa3Meses: Record<string, number> = {};
  ultimos3Meses.forEach((m) => {
    mapa3Meses[m] = 0;
  });

  pedidosValidos.forEach((p) => {
    const d = new Date(p.data_pedido);
    if (!isNaN(d.getTime())) {
      const nomeMes = nomesMeses[d.getMonth()];
      if (nomeMes in mapa3Meses) {
        mapa3Meses[nomeMes] += Number(p.valor_total || 0);
      }
    }
  });

  // 1A (1 Ano): Todos os 12 meses
  const mapaAno: Record<string, number> = {};
  nomesMeses.forEach((m) => {
    mapaAno[m] = 0;
  });

  pedidosValidos.forEach((p) => {
    const d = new Date(p.data_pedido);
    if (!isNaN(d.getTime())) {
      const nomeMes = nomesMeses[d.getMonth()];
      mapaAno[nomeMes] += Number(p.valor_total || 0);
    }
  });

  const pontosSemana = diasSemana.map((rotulo) => ({
    rotulo,
    valor: mapaSemana[rotulo],
  }));

  const pontosMes = rotulosMes.map((rotulo) => ({
    rotulo,
    valor: mapaMes[rotulo],
  }));

  const pontos3Meses = ultimos3Meses.map((rotulo) => ({
    rotulo,
    valor: mapa3Meses[rotulo],
  }));

  const pontosAno = nomesMeses.map((rotulo) => ({
    rotulo,
    valor: mapaAno[rotulo],
  }));

  return {
    '1S': pontosSemana,
    '1M': pontosMes,
    '3M': pontos3Meses,
    '1A': pontosAno,
    // Retrocompatibilidade
    '1W': pontosSemana,
    '1Y': pontosAno,
  };
}

export function calcularDadosDashboard(
  pedidos: PedidoComRelacionamentos[],
  dadosProdutos: Record<string, unknown>[],
): DadosDashboard {
  const pedidosValidos = pedidos.filter((p) => p.status !== 'CANCELADO');

  // KPI: Faturamento Total
  const faturamentoTotal = pedidosValidos.reduce(
    (acumulador, p) => acumulador + Number(p.valor_total || 0),
    0,
  );

  // Vendas recentes e agregação de produtos/categorias
  let totalProdutosVendidos = 0;
  const mapaVendasProdutos = new Map<
    string,
    { quantidade: number; receita: number }
  >();
  const mapaVendasCategorias = new Map<
    string,
    { quantidade: number; receita: number }
  >();
  const vendasRecentes: ItemVendaRecente[] = [];

  for (const pedido of pedidosValidos) {
    if (pedido.itens && Array.isArray(pedido.itens)) {
      for (const item of pedido.itens) {
        const nomeProduto =
          item.produto?.nome ?? `Produto #${item.produto_id || item.id}`;
        const quantidade = Number(item.quantidade || 0);
        const precoUnitario = Number(item.preco_unitario || 0);
        const precoTotal = precoUnitario * quantidade;

        totalProdutosVendidos += quantidade;

        vendasRecentes.push({
          id: `${pedido.id}-${item.id || item.produto_id}-${vendasRecentes.length}`,
          nomeProduto,
          quantidade,
          preco: precoTotal,
          data: formatarData(pedido.data_pedido),
        });

        // Agregação de produtos
        const atualProduto = mapaVendasProdutos.get(nomeProduto) || {
          quantidade: 0,
          receita: 0,
        };
        mapaVendasProdutos.set(nomeProduto, {
          quantidade: atualProduto.quantidade + quantidade,
          receita: atualProduto.receita + precoTotal,
        });

        // Agregação de categorias
        const nomeCategoria =
          item.produto?.categoria?.nome ??
          (typeof item.produto?.categoria_id === 'string'
            ? item.produto.categoria_id
            : 'Geral');

        const atualCategoria = mapaVendasCategorias.get(nomeCategoria) || {
          quantidade: 0,
          receita: 0,
        };
        mapaVendasCategorias.set(nomeCategoria, {
          quantidade: atualCategoria.quantidade + quantidade,
          receita: atualCategoria.receita + precoTotal,
        });
      }
    }
  }

  // Produto mais vendido
  let produtoMaisVendido = '-';
  let maiorReceitaProduto = -1;
  for (const [nome, estatistica] of mapaVendasProdutos.entries()) {
    if (estatistica.receita > maiorReceitaProduto) {
      maiorReceitaProduto = estatistica.receita;
      produtoMaisVendido = nome;
    }
  }

  // Categoria mais vendida
  let categoriaMaisVendida = '-';
  let maiorReceitaCategoria = -1;
  for (const [nome, estatistica] of mapaVendasCategorias.entries()) {
    if (estatistica.receita > maiorReceitaCategoria) {
      maiorReceitaCategoria = estatistica.receita;
      categoriaMaisVendida = nome;
    }
  }

  // Produtos no armazém / estoque
  const produtosEstoque: ItemProdutoEstoque[] = dadosProdutos.map(
    (item, indice) => {
      const nomeProduto = String(
        item.nome || item.name || `Produto #${item.id || indice}`,
      );
      const codigoProduto = String(item.sku || `SKU-${item.id || indice}`);
      const quantidade = Number(item.quantidade ?? item.quantity ?? 0);
      const dataEntrada = formatarData(
        (item.criado_em as string | Date) || (item.created_at as string | Date),
      );
      const nomeCategoria = String(
        item.categoria_id || item.categoria || 'Geral',
      );

      return {
        id: (item.id as string | number) || indice,
        nomeProduto,
        codigoProduto,
        quantidade,
        historicoEntrada: dataEntrada,
        nomeCategoria,
      };
    },
  );

  // Distribuição de categorias no estoque
  const mapaContagemCategorias = new Map<string, number>();
  for (const item of produtosEstoque) {
    const categoria = item.nomeCategoria || 'Outros';
    mapaContagemCategorias.set(
      categoria,
      (mapaContagemCategorias.get(categoria) || 0) + 1,
    );
  }

  const totalItensEstoque = produtosEstoque.length || 1;
  const distribuicaoCategorias: ItemDistribuicaoCategoria[] = Array.from(
    mapaContagemCategorias.entries(),
  ).map(([nomeCategoria, contagem], indice) => ({
    rotulo: nomeCategoria,
    quantidade: contagem,
    porcentagem: Math.round((contagem / totalItensEstoque) * 100),
    cor: CORES_PALETA[indice % CORES_PALETA.length],
  }));

  const metricasKpi: MetricasKpi = {
    faturamentoTotal,
    totalProdutosVendidos,
    categoriaMaisVendida,
    produtoMaisVendido,
  };

  const graficoVendas = calcularGraficoVendas(pedidos);

  return {
    kpi: metricasKpi,
    vendasRecentes,
    graficoVendas,
    produtosEstoque,
    distribuicaoCategorias,
  };
}

export async function buscarResumoDashboard(
  periodo?: number | string,
): Promise<DashboardResumo> {
  const queryParam = periodo ? `?periodo=${periodo}` : '';
  const response = await fetch(`${DASHBOARD_API_URL}${queryParam}`);

  if (!response.ok) {
    const erroBody = await response.json().catch(() => null);
    throw new Error(
      erroBody?.message ??
        `Falha ao buscar resumo do dashboard (status ${response.status}).`,
    );
  }

  const resultado = await response.json();
  const dados = (resultado.data ?? resultado) as DashboardResumo;

  if (!dados) {
    throw new Error('Nenhum dado retornado para o dashboard.');
  }

  return dados;
}

export async function buscarDadosDashboard(
  periodo?: number | string,
): Promise<DadosDashboard> {
  const [resumoApi, pedidos, resultadoProdutos] = await Promise.all([
    buscarResumoDashboard(periodo),
    getPedidos(),
    getProdutos(),
  ]);

  if (!resumoApi) {
    throw new Error('Nenhum dado retornado para o dashboard.');
  }

  const pedidosLista = Array.isArray(pedidos) ? pedidos : [];
  const produtosLista = Array.isArray(resultadoProdutos?.data)
    ? (resultadoProdutos.data as Record<string, unknown>[])
    : [];

  const dadosCalculados = calcularDadosDashboard(pedidosLista, produtosLista);

  const faturamentoApi = Number(resumoApi.vendas?.ganhos_totais ?? 0);
  const produtosVendidosApi = Number(
    resumoApi.vendas?.total_produtos_vendidos ?? 0,
  );
  const categoriaApi =
    resumoApi.categoria_mais_vendida?.nome ??
    dadosCalculados.kpi.categoriaMaisVendida;
  const produtoApi =
    resumoApi.produtos_mais_vendidos?.[0]?.nome ??
    dadosCalculados.kpi.produtoMaisVendido;

  return {
    ...dadosCalculados,
    kpi: {
      faturamentoTotal: faturamentoApi || dadosCalculados.kpi.faturamentoTotal,
      totalProdutosVendidos:
        produtosVendidosApi || dadosCalculados.kpi.totalProdutosVendidos,
      categoriaMaisVendida: categoriaApi,
      produtoMaisVendido: produtoApi,
    },
    resumo: resumoApi,
  };
}
