import { TaskService } from "../taskService";

describe("TaskService Unit Tests", () => {
  let taskService: TaskService;

  beforeEach(() => {
    taskService = new TaskService();
  });

  // Step 1 & 2
  test("should add a new task with valid title and description", () => {
    const task = taskService.addTask("New Task", "This is a valid description");
    expect(task).toBeDefined();
    expect(task.id).toBe(1);
    expect(task.title).toBe("New Task");
    expect(task.description).toBe("This is a valid description");
    expect(task.completed).toBe(false);
  });

  test("should throw error when adding task with empty title", () => {
    expect(() => taskService.addTask("", "Valid description")).toThrow(
      "Task title must not be empty."
    );
  });

  test("should throw error when adding task with short description", () => {
    expect(() => taskService.addTask("Task Title", "abc")).toThrow(
      "Task description must be at least 5 characters long."
    );
  });

  test("should update an existing task with valid data", () => {
    const task = taskService.addTask("New Task", "Valid description");
    const updatedTask = taskService.updateTask(
      task.id,
      "Updated Task",
      true,
      "Updated description"
    );
    expect(updatedTask).toBeDefined();
    expect(updatedTask!.title).toBe("Updated Task");
    expect(updatedTask!.description).toBe("Updated description");
    expect(updatedTask!.completed).toBe(true);
  });

  test("should delete an existing task", () => {
    const task = taskService.addTask("New Task", "Valid description");
    const result = taskService.deleteTask(task.id);
    expect(result).toBe(true);
    const tasks = taskService.getTasks();
    expect(tasks).toHaveLength(0);
  });

  // Step 3 (Boundary Value Analysis and Equivalence Partitioning)

  // Boundary Value Analysis
  test("should add a task with the minimum valid title length", () => {
    const task = taskService.addTask("T", "This is a valid description");
    expect(task).toBeDefined();
    expect(task.title).toBe("T");
  });

  test("should add a task with the maximum valid title length", () => {
    const longTitle = "T".repeat(255); // Assuming 255 is the max valid length
    const task = taskService.addTask(longTitle, "This is a valid description");
    expect(task).toBeDefined();
    expect(task.title).toBe(longTitle);
  });

  test("should throw error when adding a task with a title longer than 255 characters", () => {
    const longTitle = "T".repeat(256); // Exceeding max length
    expect(() => taskService.addTask(longTitle, "Valid description")).toThrow(
      "Task title must not exceed 255 characters."
    );
  });

  // Equivalence Partitioning
  test("should handle valid task states (active, completed)", () => {
    const task = taskService.addTask(
      "Valid Task",
      "This is a valid description"
    );
    expect(task.completed).toBe(false); // Initially active
    const updatedTask = taskService.updateTask(
      task.id,
      "Updated Task",
      true,
      "Updated description"
    );
    expect(updatedTask!.completed).toBe(true); // Task is now completed
  });

  test("should throw error when updating task with invalid state", () => {
    const task = taskService.addTask(
      "Valid Task",
      "This is a valid description"
    );
    // Trying to update with invalid completed state (null or undefined)
    expect(() =>
      taskService.updateTask(
        task.id,
        "Updated Task",
        null as any,
        "Updated description"
      )
    ).toThrow("Invalid task state.");
  });
});
