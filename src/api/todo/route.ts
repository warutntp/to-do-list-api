import { Router } from "express";
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./controller";
import { handleError } from "../../utils/handleError";
import { validateTodo } from "../../middleware/validators";

const router = Router();

router.get("/", getTodos);
router.get("/:id", getTodoById);
router.post("/", validateTodo, createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

router.all("*", (req, res) => {
  handleError(res, 405);
});

export default router;
