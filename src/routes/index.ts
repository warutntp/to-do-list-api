import { Router } from "express";
import todoRoutes from "./todoRoutes";

const router = Router();

router.use("/todos", todoRoutes);

export default router;
