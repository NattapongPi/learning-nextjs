import BlogsList from "@/components/BlogsList";
import BlogForm from "@/components/BlogForm";
import { BlogResponse } from "@/types/blog";

const url = process.env.NEXT_PUBLIC_API_URL;

async function fetchData(url: string): Promise<BlogResponse | undefined> {
  if (!url) return;
  const response = await fetch(url, {
    next: {
      tags: ["blogs"],
    },
  });
  const data = await response.json();
  return data;
}

export default async function BlogsPage() {
  const blogs = (await fetchData(`${url}/blogs`)) || [];

  return (
    <>
      <div className="w-1/2 mx-auto">
        {/* create blog */}
        <BlogForm />
        {/* blogs */}
        <BlogsList blogs={blogs} />
      </div>
    </>
  );
}
