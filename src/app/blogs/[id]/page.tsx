"use server";
import DeleteBlog from "@/components/DeleteBlog";
import { redirect } from "next/navigation";
async function fetchData(url: string) {
  if (!url) return;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const url = process.env.API_URL;

export default async function BlogIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const currentParams = await params;
  const blog = await fetchData(`${url}/blogs/${currentParams.id}`);
  if (!blog || !blog.id) {
    redirect("/blogs");
  }

  return (
    <>
      <div className="w-1/2 mx-auto">
        <div className="text-xl font-bold">{blog.title}</div>
        <div className="text-lg">{blog.description}</div>
        <div className="text-sm">{blog.author}</div>
        {blog?.id ? (
          <div className="flex justify-end">
            <DeleteBlog id={blog.id} />
          </div>
        ) : null}
      </div>
    </>
  );
}
