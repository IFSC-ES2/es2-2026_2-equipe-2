import { Router } from "express";
import { FornecedorController } from "../controllers/FornecedorController";

const router = Router();
const controller = new FornecedorController();

router.get("/", (req, res) => controller.findAll(req, res));

export default router;
