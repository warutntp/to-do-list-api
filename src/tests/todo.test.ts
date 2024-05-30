import request from "supertest";
import app from "../app";

describe("Todo API", () => {
  let todoId: number;

  it("should create a new todo", async () => {
    const res = await request(app).post("/api/todos").send({
      title: "Test Todo",
      description: "This is a test todo",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    todoId = res.body.id;
  });

  it("should get all todos", async () => {
    const res = await request(app).get("/api/todos");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("should filter todos by completed status", async () => {
    await request(app).post("/api/todos").send({
      title: "Completed Todo",
      description: "This todo is completed",
      completed: true,
    });

    await request(app).post("/api/todos").send({
      title: "Incomplete Todo",
      description: "This todo is not completed",
      completed: false,
    });

    const resCompleted = await request(app).get("/api/todos?completed=true");
    expect(resCompleted.statusCode).toEqual(200);
    expect(Array.isArray(resCompleted.body)).toBeTruthy();
    expect(resCompleted.body.every((todo: any) => todo.completed)).toBeTruthy();

    const resIncomplete = await request(app).get("/api/todos?completed=false");
    expect(resIncomplete.statusCode).toEqual(200);
    expect(Array.isArray(resIncomplete.body)).toBeTruthy();
    expect(
      resIncomplete.body.every((todo: any) => !todo.completed)
    ).toBeTruthy();
  });

  it("should get a todo by ID", async () => {
    const res = await request(app).get(`/api/todos/${todoId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", todoId);
  });

  it("should return 404 for non-existent todo", async () => {
    const res = await request(app).get("/api/todos/999");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "Resource not found");
  });

  it("should update an existing todo", async () => {
    const res = await request(app).put(`/api/todos/${todoId}`).send({
      title: "Updated Test Todo",
      description: "This is an updated test todo",
      completed: true,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("title", "Updated Test Todo");
    expect(res.body).toHaveProperty("completed", true);
  });

  it("should delete a todo", async () => {
    const res = await request(app).delete(`/api/todos/${todoId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", todoId);
  });

  it("should return 400 for creating a todo without title", async () => {
    const res = await request(app).post("/api/todos").send({
      description: "This todo has no title",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("errors");
  });

  it("should return 400 for updating a todo with no data", async () => {
    const res = await request(app).put(`/api/todos/${todoId}`).send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "No data provided for update");
  });

  it("should return 404 after deleting a todo", async () => {
    const res = await request(app).get(`/api/todos/${todoId}`);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "Resource not found");
  });

  it("should return 404 for updating a non-existent todo", async () => {
    const res = await request(app).put("/api/todos/999").send({
      title: "Non-existent Todo",
      description: "This todo does not exist",
      completed: false,
    });
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message", "Resource not found");
  });

  it("should handle 405 method not allowed", async () => {
    const res = await request(app).patch("/api/todos");
    expect(res.statusCode).toEqual(405);
    expect(res.body).toHaveProperty("message", "Method not allowed");
  });
});
