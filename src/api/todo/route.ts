import { Router } from "express";
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./controller";
import { handleError } from "../../utils/handleError";
import {
  validGetTodos,
  validateCreateTodo,
  validateEditTodo,
} from "../../middleware/validators";

const router = Router();

router.get("/", validGetTodos, getTodos);
router.get("/:id", getTodoById);
router.post("/", validateCreateTodo, createTodo);
router.put("/:id", validateEditTodo, updateTodo);
router.delete("/:id", deleteTodo);

router.all("*", (req, res) => {
  handleError(res, 405);
});

export default router;
