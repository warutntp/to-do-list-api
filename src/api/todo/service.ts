import { TodoModel, TodoCreateBody, TodoUpdateBody } from "./type";

let todos: TodoModel[] = [];

export const todoService = {
  async findTodos(completed?: string): Promise<TodoModel[]> {
    let filteredTodos = todos;
    if (completed !== undefined) {
      const isCompleted = completed === "true";
      filteredTodos = todos.filter((todo) => todo.completed === isCompleted);
    }
    return filteredTodos;
  },
  async findTodoById(id: string): Promise<TodoModel | undefined> {
    const todo = todos.find((t) => t.id === Number(id));
    return todo;
  },
  async addTodo(payload: TodoCreateBody): Promise<TodoModel> {
    const { title, description } = payload;
    const newTodo: TodoModel = {
      id: todos.length + 1,
      title,
      description,
      completed: false,
    };
    todos.push(newTodo);
    return newTodo;
  },
  async editTodo(
    id: string,
    payload: TodoUpdateBody
  ): Promise<TodoModel | null> {
    const todo = todos.find((t) => t.id === Number(id));
    if (todo) {
      Object.assign(todo, payload);
      return todo;
    }
    return null;
  },
  async removeTodo(id: string): Promise<TodoModel | null> {
    const index = todos.findIndex((t) => t.id === Number(id));
    if (index !== -1) {
      const deletedTodo = todos.splice(index, 1)[0];
      return deletedTodo;
    }
    return null;
  },
};
