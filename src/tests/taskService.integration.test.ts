import request from "supertest";
import { app } from "../index";

describe("Task Manager API Integration Tests", () => {
  let server: any;

  beforeAll((done) => {
    server = app.listen(3000, () => done());
  });

  afterAll((done) => {
    server.close(() => done());
  });

  test("should create a new task via POST /tasks", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({ title: "New Task" });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe("New Task");
  });

  test("should retrieve all tasks via GET /tasks", async () => {
    const response = await request(app).get("/tasks");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test("should update a task via PUT /tasks/:id", async () => {
    const response = await request(app)
      .put("/tasks/1")
      .send({ title: "Updated Task", completed: true });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated Task");
    expect(response.body.completed).toBe(true);
  });

  test("should delete a task via DELETE /tasks/:id", async () => {
    const response = await request(app).delete("/tasks/1");
    expect(response.status).toBe(204);
  });
});

jest.setTimeout(30000);
