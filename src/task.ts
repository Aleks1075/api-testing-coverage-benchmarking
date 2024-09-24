export class Task {
  constructor(
    public id: number,
    public title: string,
    public completed: boolean = false,
    public description: string = "",
    public deadline?: Date
  ) {}
}
