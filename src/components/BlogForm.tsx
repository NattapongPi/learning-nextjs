"use client";

import { useActionState, useEffect } from "react";
import { createBlog } from "@/app/blogs/actions";

export default function BlogForm() {
  const initState = {
    success: false,
    message: "",
    timestamp: 0,
  };
  const [state, formAction, isPendingCreate] = useActionState(
    createBlog,
    initState
  );

  useEffect(() => {
    if (state.success) {
      alert(state.message);
    }
  }, [state]);

  return (
    <>
      <form action={formAction}>
        <div>Title</div>
        <input
          type="text"
          name="title"
          className="w-full border border-gray-200 p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Title"
          disabled={isPendingCreate}
        />
        <div>Description</div>
        <textarea
          name="description"
          id="description"
          className="w-full border border-gray-200 p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Description"
          disabled={isPendingCreate}
        ></textarea>
        <div>Author</div>
        <input
          type="text"
          name="author"
          className="w-full border border-gray-200 p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Author"
          disabled={isPendingCreate}
        />
        <button
          className="bg-sky-500 text-white p-2 mt-4 rounded cursor-pointer hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isPendingCreate}
        >
          {isPendingCreate ? "Creating..." : "Create Blog"}
        </button>
        {state?.success ? null : (
          <p className="text-red-500">{state?.message}</p>
        )}
      </form>
    </>
  );
}
