import { Router } from "express";

class Routes {
  static define(router: Router): Router {
    router.use("/ping", (_req, res) => {
      res.status(200).json({ pong: true });
    });

    return router;
  }
}

export default Routes.define(Router());
