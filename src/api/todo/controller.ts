import { Request, Response } from "express";
import { handleError } from "../../utils/handleError";
import { todoService } from "./service";
import { TodoCreateBody, TodoUpdateBody } from "./type";
import { asyncHandler } from "../../middleware/asyncHandler";

export const getTodos = asyncHandler(async (req: Request, res: Response) => {
  const { completed } = req.query as { completed: string };
  const todos = await todoService.findTodos(completed);
  res.json(todos);
});

export const getTodoById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const todo = await todoService.findTodoById(id);
  if (todo) {
    res.json(todo);
  } else {
    handleError(res, 404);
  }
});

export const createTodo = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body as TodoCreateBody;
  const newTodo = await todoService.addTodo(payload);
  res.status(201).json(newTodo);
});

export const updateTodo = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body as TodoUpdateBody;
  if (Object.keys(payload).length === 0) {
    return handleError(res, 400, "No data provided for update");
  }
  const updatedTodo = await todoService.editTodo(id, payload);
  if (updatedTodo) {
    res.json(updatedTodo);
  } else {
    handleError(res, 404);
  }
});
export const deleteTodo = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedTodo = await todoService.removeTodo(id);
  if (deletedTodo) {
    res.json(deletedTodo);
  } else {
    handleError(res, 404);
  }
});
