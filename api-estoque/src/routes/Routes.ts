import { Router } from "express";
import EstoqueListController from "../controllers/EstoqueListController";
import EstoqueCadastroController from "../controllers/EstoqueCadastroController";

class Routes {
  static define(router: Router): Router {
    router.use("/ping", (_req, res) => {
      res.status(200).json({ pong: true });
    });

    router.get("/api/estoque", EstoqueListController.getList);
    router.get("/api/estoque/cadastro", EstoqueCadastroController.getForm);
    router.post("/api/estoque/cadastro", EstoqueCadastroController.create);
    router.get("/api/estoque/:id/edicao", EstoqueCadastroController.getEditForm);
    router.put("/api/estoque/:id", EstoqueCadastroController.update);

    return router;
  }
}

export default Routes.define(Router());