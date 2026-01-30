"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

async function fetchData(url: string) {
  if (!url) return;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const url = process.env.NEXT_PUBLIC_API_URL;

export default function BlogIdPage() {
  const router = useRouter();
  const { id } = useParams();
  const [blog, setBlog] = useState<{
    id: string;
    title: string;
    description: string;
    author: string;
  }>({ id: "", title: "", description: "", author: "" });
  async function deleteBlog(id: string) {
    if (!id) return;
    await fetch(`${url}/blogs/${id}`, { method: "DELETE" });
    alert("Blog deleted successfully");
    router.push("/blogs");
  }

  useEffect(() => {
    fetchData(`${url}/blogs/${id}`).then((data) => {
      if (typeof data === "string") return router.push("/blogs");
      setBlog(data);
    });
  }, [id, router]);

  return (
    <>
      <div className="w-1/2 mx-auto">
        <div className="text-xl font-bold">{blog.title}</div>
        <div className="text-lg">{blog.description}</div>
        <div className="text-sm">{blog.author}</div>
        {blog?.id ? (
          <div className="flex justify-end">
            <button
              className="bg-red-500 text-white p-2 hover:bg-red-600 mt-4 rounded"
              onClick={() => deleteBlog(blog.id)}
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}
