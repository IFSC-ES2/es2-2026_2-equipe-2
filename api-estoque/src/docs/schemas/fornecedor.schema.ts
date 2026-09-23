/**
 * @swagger
 * components:
 *   schemas:
 *     Fornecedor:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: "Fornecedor XYZ Ltda"
 *         cnpj:
 *           type: string
 *           nullable: true
 *           example: "12.345.678/0001-90"
 *         telefone:
 *           type: string
 *           nullable: true
 *           example: "(48) 99999-9999"
 *         email:
 *           type: string
 *           nullable: true
 *           example: "contato@fornecedorxyz.com"
 *       required:
 *         - id
 *         - nome
 *
 *     FornecedorCreate:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: "Fornecedor XYZ Ltda"
 *         cnpj:
 *           type: string
 *           nullable: true
 *           example: "12.345.678/0001-90"
 *         telefone:
 *           type: string
 *           nullable: true
 *           example: "(48) 99999-9999"
 *         email:
 *           type: string
 *           nullable: true
 *           example: "contato@fornecedorxyz.com"
 *       required:
 *         - nome
 *
 *     FornecedorUpdate:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: "Fornecedor XYZ Ltda"
 *         cnpj:
 *           type: string
 *           nullable: true
 *           example: "12.345.678/0001-90"
 *         telefone:
 *           type: string
 *           nullable: true
 *           example: "(48) 99999-9999"
 *         email:
 *           type: string
 *           nullable: true
 *           example: "contato@fornecedorxyz.com"
 */
