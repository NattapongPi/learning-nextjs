export interface Todo {
  id: string;
  todo: string;
  isDone: boolean;
  createdAt: string;
}

export type TodoResponse = Todo[];
export type TodoFormData = Omit<Todo, "id" | "createdAt">;
