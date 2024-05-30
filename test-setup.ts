// // test-setup.ts
// import "reflect-metadata";
// import { Container } from "typedi";
// import { TodoService } from "./src/api/todo/service";

// const mockTodoService = {
//   findTodos: jest.fn().mockReturnValue([]),
//   findTodoById: jest.fn().mockReturnValue(undefined),
//   addTodo: jest.fn().mockReturnValue({}),
//   editTodo: jest.fn().mockReturnValue(null),
//   removeTodo: jest.fn().mockReturnValue(null),
// };

// Container.set(TodoService, mockTodoService);
