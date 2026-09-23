import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Estoque",
      version: "0.1.0",
      description: "API para gerenciar estoque",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./src/docs/**/*.ts"],
};

const specs = swaggerJsDoc(options);

export const serve = swaggerUi.serve;
export const setup = swaggerUi.setup(specs);
