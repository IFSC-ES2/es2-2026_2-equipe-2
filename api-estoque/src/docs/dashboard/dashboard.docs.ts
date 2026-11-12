/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Métricas e indicadores consolidados para o dashboard
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Retorna o resumo consolidado de métricas e indicadores do dashboard
 *     tags: [Dashboard]
 *     parameters:
 *       - in: query
 *         name: periodo
 *         required: false
 *         schema:
 *           type: integer
 *           enum: [30, 90, 365]
 *           default: 30
 *         description: Período em dias para cálculo das vendas (valores permitidos 30, 90 ou 365). Se omitido, utiliza 30 dias por padrão.
 *         example: 30
 *     responses:
 *       200:
 *         description: Resumo do dashboard retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     title:
 *                       example: "Dashboard summary retrieved"
 *                     data:
 *                       $ref: '#/components/schemas/DashboardResumo'
 *       400:
 *         description: Período inválido
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 success: false
 *                 status: 400
 *                 title: "O período deve ser um destes valores (em dias): 30, 90, 365"
 *                 data:
 *                   name: "ValidationError"
 *                   message: "O período deve ser um destes valores (em dias): 30, 90, 365"
 *       500:
 *         description: Erro interno ao gerar resumo do dashboard
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
