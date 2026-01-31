export interface Blog {
  id: string;
  title: string;
  description: string;
  author: string;
}

export type BlogResponse = Blog[];
export type BlogFormData = Omit<Blog, "id">;

// Todo types
export interface Todo {
  id: string;
  todo: string;
  isDone: boolean;
  createdAt: string;
}

export type TodoResponse = Todo[];
export type TodoFormData = Omit<Todo, "id" | "createdAt">;
