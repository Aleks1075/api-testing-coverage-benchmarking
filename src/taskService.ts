import { Task } from "./task";

export class TaskService {
  private tasks: Task[] = [];
  private currentId: number = 1;
  private MAX_TITLE_LENGTH = 255;

  addTask(title: string, description: string, deadline?: Date): Task {
    if (title.trim() === "") {
      throw new Error("Task title must not be empty.");
    }

    if (title.length > this.MAX_TITLE_LENGTH) {
      throw new Error("Task title must not exceed 255 characters.");
    }

    if (description.length < 5) {
      throw new Error("Task description must be at least 5 characters long.");
    }

    const task = new Task(
      this.currentId++,
      title,
      false,
      description,
      deadline
    );
    this.tasks.push(task);
    return task;
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  updateTask(
    id: number,
    title: string,
    completed: boolean,
    description: string,
    deadline?: Date
  ): Task | undefined {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      if (title.trim() === "") {
        throw new Error("Task title must not be empty.");
      }

      if (title.length > this.MAX_TITLE_LENGTH) {
        throw new Error("Task title must not exceed 255 characters.");
      }

      if (description.length < 5) {
        throw new Error("Task description must be at least 5 characters long.");
      }

      if (typeof completed !== "boolean") {
        throw new Error("Invalid task state.");
      }

      task.title = title;
      task.completed = completed;
      task.description = description;
      if (deadline) task.deadline = deadline;
    }
    return task;
  }

  deleteTask(id: number): boolean {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex > -1) {
      this.tasks.splice(taskIndex, 1);
      return true;
    }
    return false;
  }
}
