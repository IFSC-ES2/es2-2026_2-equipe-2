import { Router } from "express";
import EstoqueListController from "../controllers/EstoqueListController";

class Routes {
  static define(router: Router): Router {
    router.use("/ping", (_req, res) => {
      res.status(200).json({ pong: true });
    });

    router.get("/api/estoque-list", EstoqueListController.getList);

    return router;
  }
}

export default Routes.define(Router());
