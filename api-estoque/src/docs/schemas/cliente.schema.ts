/**
 * @swagger
 * components:
 *   schemas:
 *     Cliente:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: "João da Silva"
 *         email:
 *           type: string
 *           example: "joao.silva@email.com"
 *         telefone:
 *           type: string
 *           nullable: true
 *           example: "(48) 99999-9999"
 *         documento:
 *           type: string
 *           nullable: true
 *           example: "123.456.789-00"
 *         endereco:
 *           type: string
 *           nullable: true
 *           example: "Rua das Flores, 123, Florianópolis - SC"
 *         criado_em:
 *           type: string
 *           format: date-time
 *           example: "2026-01-15T10:30:00Z"
 *       required:
 *         - id
 *         - nome
 *         - email
 *         - criado_em
 *
 *     ClienteCreate:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: "João da Silva"
 *         email:
 *           type: string
 *           example: "joao.silva@email.com"
 *         telefone:
 *           type: string
 *           nullable: true
 *           example: "(48) 99999-9999"
 *         documento:
 *           type: string
 *           nullable: true
 *           example: "123.456.789-00"
 *         endereco:
 *           type: string
 *           nullable: true
 *           example: "Rua das Flores, 123, Florianópolis - SC"
 *       required:
 *         - nome
 *         - email
 *
 *     ClienteUpdate:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: "João da Silva"
 *         email:
 *           type: string
 *           example: "joao.silva@email.com"
 *         telefone:
 *           type: string
 *           nullable: true
 *           example: "(48) 99999-9999"
 *         documento:
 *           type: string
 *           nullable: true
 *           example: "123.456.789-00"
 *         endereco:
 *           type: string
 *           nullable: true
 *           example: "Rua das Flores, 123, Florianópolis - SC"
 */
