import { TaskService } from "../taskService";

describe("TaskService Unit Tests", () => {
  let taskService: TaskService;

  beforeEach(() => {
    taskService = new TaskService();
  });

  test("should add a new task", () => {
    const task = taskService.addTask("New Task");
    expect(task).toBeDefined();
    expect(task.id).toBe(1);
    expect(task.title).toBe("New Task");
    expect(task.completed).toBe(false);
  });

  test("should update an existing task", () => {
    const task = taskService.addTask("New Task");
    const updatedTask = taskService.updateTask(task.id, "Updated Task", true);
    expect(updatedTask).toBeDefined();
    expect(updatedTask!.title).toBe("Updated Task");
    expect(updatedTask!.completed).toBe(true);
  });

  test("should delete an existing task", () => {
    const task = taskService.addTask("New Task");
    const result = taskService.deleteTask(task.id);
    expect(result).toBe(true);
    const tasks = taskService.getTasks();
    expect(tasks).toHaveLength(0);
  });
});
