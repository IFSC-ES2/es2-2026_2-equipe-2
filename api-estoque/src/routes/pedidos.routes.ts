import { Router } from "express";
import { PedidoController } from "../controllers/index";

const router = Router();
const controller = new PedidoController();

router.get("/", (req, res) => controller.findAll(req, res));
router.get("/:id", (req, res) => controller.findById(req, res));
router.post("/", (req, res) => controller.create(req, res));

export default router;
