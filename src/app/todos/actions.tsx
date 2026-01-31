"use server";

import { Todo } from "@/types/todo";
import { revalidateTag, updateTag } from "next/cache";

const url = process.env.API_URL;
export async function createTodoActions(
  prevState: { message: string },
  formData: FormData
) {
  const todo = formData.get("todo");
  if (!todo) {
    return {
      success: false,
      message: "Todo is required",
    };
  }
  const response = await fetch(`${url}/todos`, {
    method: "POST",
    body: JSON.stringify({
      todo,
      isDone: false,
      createdAt: new Date().toISOString(),
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  if (response.ok) {
    await revalidateTag("todos", "max");
    updateTag("todos");
    return {
      success: true,
      message: "Todo added successfully",
    };
  }
  return {
    success: false,
    message: "Todo added failed",
  };
}

export async function toggleTodo(prevState: { message: string }, todo: Todo) {
  const response = await fetch(`${url}/todos/${todo.id}`, {
    method: "PUT",
    body: JSON.stringify({
      isDone: !todo.isDone,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });

  if (response.ok) {
    await revalidateTag("todos", "max");
    updateTag("todos");
    return {
      success: true,
      message: "Todo toggled successfully",
    };
  }
  return {
    success: false,
    message: "Todo toggled failed",
  };
}

export async function deleteTodo(prevState: { message: string }, id: string) {
  const response = await fetch(`${url}/todos/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    await revalidateTag("todos", "max");
    updateTag("todos");
    return {
      success: true,
      message: "Todo deleted successfully",
    };
  }
  return {
    success: false,
    message: "Todo deleted failed",
  };
}
