"use client";
import { createTodoActions } from "@/app/todos/actions";
import { useTransition } from "react";
export default function AddTodo() {
  const [isPending, startTransition] = useTransition();
  const onSubmitTodo = async (formData: FormData): Promise<void> => {
    startTransition(async () => {
      await createTodoActions({ message: "" }, formData);
    });
  };
  return (
    <>
      <div className="flex justify-center gap-4">
        <form action={onSubmitTodo}>
          <input
            type="text"
            name="todo"
            className="border border-gray-300 rounded px-4 py-2"
          />
          <button
            className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition-colors cursor-pointer ml-4 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isPending}
          >
            {isPending ? "Adding..." : "Add Todo"}
          </button>
        </form>
      </div>
    </>
  );
}
