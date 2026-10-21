/**
 * @swagger
 * components:
 *   schemas:
 *     StatusPedido:
 *       type: string
 *       enum: [PENDENTE, CONCLUIDO, CANCELADO]
 *       example: "PENDENTE"
 *
 *     ItemPedido:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         pedido_id:
 *           type: integer
 *           example: 1
 *         produto_id:
 *           type: integer
 *           example: 2
 *         quantidade:
 *           type: integer
 *           example: 3
 *         preco_unitario:
 *           type: number
 *           format: float
 *           example: 150.00
 *       required:
 *         - id
 *         - pedido_id
 *         - produto_id
 *         - quantidade
 *         - preco_unitario
 *
 *     ItemPedidoComProduto:
 *       allOf:
 *         - $ref: '#/components/schemas/ItemPedido'
 *         - type: object
 *           properties:
 *             produto:
 *               allOf:
 *                 - $ref: '#/components/schemas/Produto'
 *               nullable: true
 *
 *     Pedido:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         cliente_id:
 *           type: integer
 *           example: 1
 *         status:
 *           $ref: '#/components/schemas/StatusPedido'
 *         data_pedido:
 *           type: string
 *           format: date-time
 *           example: "2026-10-19T14:30:00Z"
 *         valor_total:
 *           type: number
 *           format: float
 *           example: 450.00
 *       required:
 *         - id
 *         - cliente_id
 *         - status
 *         - data_pedido
 *         - valor_total
 *
 *     PedidoComRelacionamentos:
 *       allOf:
 *         - $ref: '#/components/schemas/Pedido'
 *         - type: object
 *           properties:
 *             cliente:
 *               allOf:
 *                 - $ref: '#/components/schemas/Cliente'
 *               nullable: true
 *             itens:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ItemPedidoComProduto'
 *
 *     ItemPedidoCreate:
 *       type: object
 *       properties:
 *         produto_id:
 *           type: integer
 *           example: 2
 *         quantidade:
 *           type: integer
 *           example: 3
 *         preco_unitario:
 *           type: number
 *           format: float
 *           example: 150.00
 *       required:
 *         - produto_id
 *         - quantidade
 *         - preco_unitario
 *
 *     PedidoCreate:
 *       type: object
 *       properties:
 *         cliente_id:
 *           type: integer
 *           example: 1
 *         data_pedido:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2026-10-19T14:30:00Z"
 *         itens:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ItemPedidoCreate'
 *       required:
 *         - cliente_id
 *         - itens
 *
 *     PedidoUpdate:
 *       type: object
 *       properties:
 *         cliente_id:
 *           type: integer
 *           example: 1
 *         data_pedido:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2026-10-19T14:30:00Z"
 *         itens:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ItemPedidoCreate'
 */
