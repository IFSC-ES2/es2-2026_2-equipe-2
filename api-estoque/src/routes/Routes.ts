import { Router } from "express";
import EstoqueListController from "../controllers/EstoqueListController";
import { HttpStatus } from "../config/status";

class Routes {
  static define(router: Router): Router {
    router.get("/ping", (_req, res) => {
      res.status(200).json({ pong: true });
    });

    router.get("/api/estoque", EstoqueListController.getList);

    router.use((_req, res) => {
      res.status(HttpStatus.NOT_FOUND).send("<h1>Route not found<h1>");
    });

    return router;
  }
}

export default Routes.define(Router());
