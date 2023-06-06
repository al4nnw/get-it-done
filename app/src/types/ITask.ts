export default interface ITask {
  taskId?: string;
  taskName: string;
  completed: boolean;
  creationTime?: number;
}
