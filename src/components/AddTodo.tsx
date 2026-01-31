"use client";
import { createTodoActions } from "@/app/todos/actions";
import { useRouter } from "next/navigation";
export default function AddTodo() {
  const router = useRouter();
  const onSubmitTodo = async (formData: FormData) => {
    const result = await createTodoActions({ message: "" }, formData);
    if (result?.success) {
      router.refresh();
    }
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
          <button className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition-colors cursor-pointer ml-4">
            Add Todo
          </button>
        </form>
      </div>
    </>
  );
}
