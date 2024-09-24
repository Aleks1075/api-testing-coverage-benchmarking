import request from "supertest";
import { app } from "../index";

describe("Task Manager API Integration Tests", () => {
  let server: any;
  let taskId: number;

  beforeAll((done) => {
    server = app.listen(3000, () => done());
  });

  afterAll((done) => {
    server.close(() => done());
  });

  test("should create a new task via POST /tasks", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({ title: "New Task", description: "Task Description" }); // Ensure both title and description
    expect(response.status).toBe(201);
    expect(response.body.title).toBe("New Task");

    taskId = response.body.id; // Store the taskId
  });

  test("should retrieve all tasks via GET /tasks", async () => {
    const response = await request(app).get("/tasks");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1); // Ensure there is 1 task created earlier
  });

  test("should update a task via PUT /tasks/:id", async () => {
    const response = await request(app)
      .put(`/tasks/${taskId}`) // Use stored taskId
      .send({
        title: "Updated Task",
        completed: true,
        description: "Updated description",
      });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated Task");
    expect(response.body.completed).toBe(true);
  });

  test("should delete a task via DELETE /tasks/:id", async () => {
    const response = await request(app).delete(`/tasks/${taskId}`); // Use stored taskId
    expect(response.status).toBe(204);
  });
});

jest.setTimeout(30000);
