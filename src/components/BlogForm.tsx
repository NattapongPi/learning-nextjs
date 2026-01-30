"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import createBlog from "app/blogs/actions";
import { useRouter } from "next/navigation";

export default function BlogForm() {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const initState = {
    success: false,
    message: "",
    timestamp: 0,
  };
  const [state, formAction, isPendingCreate] = useActionState(
    createBlog,
    initState
  );
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  useEffect(() => {
    if (state.success) {
      startTransition(() => {
        alert(state.message);
        setTitle("");
        setDescription("");
        setAuthor("");

        // to force load new blogs
        router.refresh();
      });
    }
  }, [state, router]);

  return (
    <>
      <div className="flex flex-col gap-2 w-1/2 mx-auto">
        <form action={formAction}>
          <div>Title</div>
          <input
            type="text"
            name="title"
            className="w-full border border-gray-200 p-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div>Description</div>
          <textarea
            name="description"
            id="description"
            className="w-full border border-gray-200 p-2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div>Author</div>
          <input
            type="text"
            name="author"
            className="w-full border border-gray-200 p-2"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
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
      </div>
    </>
  );
}
