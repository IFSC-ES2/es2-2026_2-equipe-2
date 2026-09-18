import { Router } from "express";
import { ProdutoController } from "../controllers/index";

const router = Router();
const controller = new ProdutoController();

router.get("/", (req, res) => controller.findAll(req, res));
router.get("/:id", (req, res) => controller.findById(req, res));
router.post("/", (req, res) => controller.create(req, res));
router.put("/:id", (req, res) => controller.update(req, res));
router.delete("/:id", (req, res) => controller.delete(req, res));

export default router;