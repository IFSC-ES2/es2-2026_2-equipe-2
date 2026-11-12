/**
 * @swagger
 * components:
 *   schemas:
 *     ResumoVendas:
 *       type: object
 *       properties:
 *         ganhos_totais:
 *           type: number
 *           format: float
 *           example: 45250.75
 *           description: Soma total do valor dos pedidos com status CONCLUIDO no período
 *         total_vendas:
 *           type: integer
 *           example: 32
 *           description: Quantidade total de pedidos concluídos no período
 *         total_produtos_vendidos:
 *           type: integer
 *           example: 145
 *           description: Quantidade total de unidades vendidas nos pedidos concluídos do período
 *       required:
 *         - ganhos_totais
 *         - total_vendas
 *         - total_produtos_vendidos
 *
 *     ProdutoMaisVendido:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         sku:
 *           type: string
 *           example: "PROD-0001"
 *         nome:
 *           type: string
 *           example: "Notebook Dell Inspiron"
 *         unidades_vendidas:
 *           type: integer
 *           example: 45
 *         receita:
 *           type: number
 *           format: float
 *           example: 157495.50
 *       required:
 *         - id
 *         - sku
 *         - nome
 *         - unidades_vendidas
 *         - receita
 *
 *     CategoriaMaisVendida:
 *       type: object
 *       nullable: true
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: "Informática"
 *         unidades_vendidas:
 *           type: integer
 *           example: 80
 *         receita:
 *           type: number
 *           format: float
 *           example: 215320.00
 *       required:
 *         - id
 *         - nome
 *         - unidades_vendidas
 *         - receita
 *
 *     ProdutoEstoque:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 2
 *         sku:
 *           type: string
 *           example: "PROD-0002"
 *         nome:
 *           type: string
 *           example: "Mouse Sem Fio Logitech"
 *         quantidade:
 *           type: integer
 *           example: 120
 *         estoque_minimo:
 *           type: integer
 *           example: 15
 *       required:
 *         - id
 *         - sku
 *         - nome
 *         - quantidade
 *         - estoque_minimo
 *
 *     ProdutoEstoqueBaixo:
 *       allOf:
 *         - $ref: '#/components/schemas/ProdutoEstoque'
 *         - type: object
 *           properties:
 *             faltam_para_o_minimo:
 *               type: integer
 *               example: 6
 *               description: Unidades faltantes para atingir o estoque mínimo
 *           required:
 *             - faltam_para_o_minimo
 *
 *     EstoqueResumo:
 *       type: object
 *       properties:
 *         total_produtos:
 *           type: integer
 *           example: 54
 *           description: Quantidade total de produtos cadastrados
 *         produtos_estoque_baixo:
 *           type: array
 *           description: Lista de produtos com quantidade menor ou igual ao estoque mínimo
 *           items:
 *             $ref: '#/components/schemas/ProdutoEstoqueBaixo'
 *         maiores_estoques:
 *           type: array
 *           description: Lista dos produtos com maior quantidade em estoque
 *           items:
 *             $ref: '#/components/schemas/ProdutoEstoque'
 *       required:
 *         - total_produtos
 *         - produtos_estoque_baixo
 *         - maiores_estoques
 *
 *     DashboardResumo:
 *       type: object
 *       properties:
 *         periodo:
 *           type: integer
 *           example: 30
 *           description: Período considerado em dias (30, 90 ou 365)
 *         vendas:
 *           $ref: '#/components/schemas/ResumoVendas'
 *         produtos_mais_vendidos:
 *           type: array
 *           description: Ranking dos produtos mais vendidos no período
 *           items:
 *             $ref: '#/components/schemas/ProdutoMaisVendido'
 *         categoria_mais_vendida:
 *           allOf:
 *             - $ref: '#/components/schemas/CategoriaMaisVendida'
 *           nullable: true
 *           description: Categoria mais vendida no período ou null caso não haja vendas
 *         estoque:
 *           $ref: '#/components/schemas/EstoqueResumo'
 *       required:
 *         - periodo
 *         - vendas
 *         - produtos_mais_vendidos
 *         - categoria_mais_vendida
 *         - estoque
 */
