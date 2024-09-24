import express, { Request, Response } from "express";
import { TaskService } from "./taskService";

const app = express();
const port = 3000;
const taskService = new TaskService();

app.use(express.json());

app.post("/tasks", (req: Request, res: Response) => {
  const { title, description, deadline } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const task = taskService.addTask(
      title,
      description,
      deadline ? new Date(deadline) : undefined
    );
    res.status(201).json(task);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/tasks", (req: Request, res: Response) => {
  const tasks = taskService.getTasks();
  res.json(tasks);
});

app.get("/tasks/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const task = taskService.getTasks().find((task) => task.id === parseInt(id));
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

app.put("/tasks/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed, description, deadline } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const task = taskService.updateTask(
      parseInt(id),
      title,
      completed,
      description,
      deadline ? new Date(deadline) : undefined
    );
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/tasks/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const success = taskService.deleteTask(parseInt(id));
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

export { app };
