/**
 * @swagger
 * components:
 *   schemas:
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         status:
 *           type: integer
 *           example: 200
 *         title:
 *           type: string
 *           example: "Product retrieved"
 *         data:
 *           type: object
 *           description: Dados retornados pela operação
 *       required:
 *         - success
 *         - status
 *         - title
 *         - data
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         status:
 *           type: integer
 *           example: 404
 *         title:
 *           type: string
 *           example: "Produto não encontrado"
 *         data:
 *           type: object
 *           description: Objeto de erro original (nome, mensagem e, em dev, stack)
 *           properties:
 *             name:
 *               type: string
 *               example: "AppError"
 *             message:
 *               type: string
 *               example: "Produto não encontrado"
 *       required:
 *         - success
 *         - status
 *         - title
 *         - data
 *
 *     BadRequestError:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorResponse'
 *       example:
 *         success: false
 *         status: 400
 *         title: "ID inválido"
 *         data:
 *           name: "AppError"
 *           message: "ID inválido"
 *
 *     NotFoundError:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorResponse'
 *       example:
 *         success: false
 *         status: 404
 *         title: "Produto não encontrado"
 *         data:
 *           name: "AppError"
 *           message: "Produto não encontrado"
 *
 *     InternalServerError:
 *       allOf:
 *         - $ref: '#/components/schemas/ErrorResponse'
 *       example:
 *         success: false
 *         status: 500
 *         title: "Internal error"
 *         data:
 *           name: "Error"
 *           message: "Erro interno no servidor"
 */
