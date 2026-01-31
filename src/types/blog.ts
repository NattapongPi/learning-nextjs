export interface Blog {
  id: string;
  title: string;
  description: string;
  author: string;
}

export type BlogResponse = Blog[];
export type BlogFormData = Omit<Blog, "id">;
