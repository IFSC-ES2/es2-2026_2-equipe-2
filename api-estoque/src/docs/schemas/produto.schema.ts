/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
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
 *         descricao:
 *           type: string
 *           nullable: true
 *           example: "Notebook 15 polegadas, 16GB RAM, 512GB SSD"
 *         categoria_id:
 *           type: integer
 *           nullable: true
 *           example: 1
 *         fornecedor_id:
 *           type: integer
 *           nullable: true
 *           example: 1
 *         preco:
 *           type: number
 *           format: float
 *           example: 3499.90
 *         quantidade:
 *           type: integer
 *           example: 25
 *         estoque_minimo:
 *           type: integer
 *           example: 5
 *         criado_em:
 *           type: string
 *           format: date-time
 *           example: "2026-01-15T10:30:00Z"
 *         atualizado_em:
 *           type: string
 *           format: date-time
 *           example: "2026-02-01T14:20:00Z"
 *       required:
 *         - id
 *         - sku
 *         - nome
 *         - preco
 *         - quantidade
 *         - estoque_minimo
 *         - criado_em
 *         - atualizado_em
 *
 *     ProdutoComRelacionamentos:
 *       allOf:
 *         - $ref: '#/components/schemas/Produto'
 *         - type: object
 *           properties:
 *             categoria:
 *               allOf:
 *                 - $ref: '#/components/schemas/Categoria'
 *               nullable: true
 *             fornecedor:
 *               allOf:
 *                 - $ref: '#/components/schemas/Fornecedor'
 *               nullable: true
 *
 *     ProdutoCreate:
 *       type: object
 *       properties:
 *         sku:
 *           type: string
 *           example: "PROD-0001"
 *         nome:
 *           type: string
 *           example: "Notebook Dell Inspiron"
 *         descricao:
 *           type: string
 *           nullable: true
 *           example: "Notebook 15 polegadas, 16GB RAM, 512GB SSD"
 *         categoria_id:
 *           type: integer
 *           nullable: true
 *           example: 1
 *         fornecedor_id:
 *           type: integer
 *           nullable: true
 *           example: 1
 *         preco:
 *           type: number
 *           format: float
 *           example: 3499.90
 *         quantidade:
 *           type: integer
 *           example: 25
 *         estoque_minimo:
 *           type: integer
 *           example: 5
 *       required:
 *         - sku
 *         - nome
 *         - preco
 *
 *     ProdutoUpdate:
 *       type: object
 *       properties:
 *         sku:
 *           type: string
 *           example: "PROD-0001"
 *         nome:
 *           type: string
 *           example: "Notebook Dell Inspiron"
 *         descricao:
 *           type: string
 *           nullable: true
 *           example: "Notebook 15 polegadas, 16GB RAM, 512GB SSD"
 *         categoria_id:
 *           type: integer
 *           nullable: true
 *           example: 1
 *         fornecedor_id:
 *           type: integer
 *           nullable: true
 *           example: 1
 *         preco:
 *           type: number
 *           format: float
 *           example: 3499.90
 *         quantidade:
 *           type: integer
 *           example: 25
 *         estoque_minimo:
 *           type: integer
 *           example: 5
 */
