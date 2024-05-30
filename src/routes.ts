import { Router } from "express";
import todoRoutes from "./api/todo/route";

const router = Router();

router.use("/todos", todoRoutes);

export default router;
