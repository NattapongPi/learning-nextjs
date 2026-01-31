"use client";
import { useActionState } from "react";
import { deleteBlog } from "@/app/blogs/actions";
export default function DeleteBlog({ id }: { id: string }) {
  const [, deleteAction, isDeleting] = useActionState(deleteBlog, {
    success: false,
    message: "",
  });

  return (
    <>
      <form action={deleteAction}>
        <input type="hidden" name="id" value={id} />
        <button className="bg-red-500 text-white p-2 hover:bg-red-600 mt-4 rounded">
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </form>
    </>
  );
}
