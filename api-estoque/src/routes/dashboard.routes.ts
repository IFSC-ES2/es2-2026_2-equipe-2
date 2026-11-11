import { Router } from "express";
import { DashboardController } from "../controllers/index";

const router = Router();
const controller = new DashboardController();

router.get("/", (req, res) => controller.getResumo(req, res));

export default router;