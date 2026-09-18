import { Router } from "express";
import EstoqueListController from "../controllers/EstoqueListController";
import routerCategoria from "./categorias.routes";
import routerProduto from "./produtos.routes";
import { HttpStatus } from "../config/status";
import { serve, setup } from "../docs/swagger";

class Routes {
  static define(router: Router): Router {
    router.get("/ping", (_req, res) => {
      res.status(200).json({ pong: true });
    });

    router.get("/api/estoque", EstoqueListController.getList);

    router.use("/categorias", routerCategoria);
    router.use("/produtos", routerProduto);

    router.use("/docs", serve, setup);

    router.use((_req, res) => {
      res.status(HttpStatus.NOT_FOUND).send("<h1>Route not found<h1>");
    });

    return router;
  }
}

export default Routes.define(Router());
