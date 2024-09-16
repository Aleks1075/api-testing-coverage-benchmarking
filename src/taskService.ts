import { Task } from "./task";

export class TaskService {
  private tasks: Task[] = [];
  private currentId: number = 1;

  addTask(title: string, deadline?: Date): Task {
    const task = new Task(this.currentId++, title, false, deadline);
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
    deadline?: Date
  ): Task | undefined {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.title = title;
      task.completed = completed;
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
