"use client";
import { useTransition } from "react";
import { deleteBlog } from "@/app/blogs/actions";
import { useRouter } from "next/navigation";
export default function DeleteBlog({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const onSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await deleteBlog(
        { success: false, message: "" },
        formData
      );

      if (result?.success) {
        alert(result.message);
        router.push("/blogs");
      } else {
        alert(result?.message);
      }
    });
  };

  return (
    <>
      <form action={onSubmit}>
        <input type="hidden" name="id" value={id} />
        <button className="bg-red-500 text-white p-2 hover:bg-red-600 mt-4 rounded">
          {isPending ? "Deleting..." : "Delete"}
        </button>
      </form>
    </>
  );
}
