import { Request, Response } from "express";
import { Todo } from "../models/todoModel";
import { handleError } from "../utils/handleError";

let todos: Todo[] = [];

export const getTodos = (req: Request, res: Response) => {
  try {
    const { completed } = req.query;

    let filteredTodos = todos;

    if (completed !== undefined) {
      const isCompleted = completed === "true";
      filteredTodos = todos.filter((todo) => todo.completed === isCompleted);
    }

    res.json(filteredTodos);
  } catch (error) {
    console.error(error);
    handleError(res, 500);
  }
};

export const getTodoById = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = todos.find((t) => t.id == Number(id));
    if (todo) {
      res.json(todo);
    } else {
      handleError(res, 404);
    }
  } catch (error) {
    console.error(error);
    handleError(res, 500);
  }
};

export const createTodo = (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return handleError(res, 400);
    }
    const newTodo: Todo = {
      id: todos.length + 1,
      title,
      description,
      completed: false,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    handleError(res, 500);
  }
};

export const updateTodo = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const todo = todos.find((t) => t.id == Number(id));
    if (todo) {
      todo.title = title !== undefined ? title : todo.title;
      todo.description =
        description !== undefined ? description : todo.description;
      todo.completed = completed !== undefined ? completed : todo.completed;
      res.json(todo);
    } else {
      handleError(res, 404);
    }
  } catch (error) {
    console.error(error);
    handleError(res, 500);
  }
};

export const deleteTodo = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const index = todos.findIndex((t) => t.id == Number(id));
    if (index !== -1) {
      const deletedTodo = todos.splice(index, 1);
      res.json(deletedTodo);
    } else {
      handleError(res, 404);
    }
  } catch (error) {
    console.error(error);
    handleError(res, 500);
  }
};
