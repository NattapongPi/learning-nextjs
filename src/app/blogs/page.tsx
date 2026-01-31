import BlogsList from "@/components/BlogsList";
import BlogForm from "@/components/BlogForm";
import { BlogResponse } from "@/types/blog";

export default async function BlogsPage() {
  const response = await fetch(`${process.env.API_URL}/blogs`, {
    next: { tags: ["blogs"] },
  });
  const blogs: BlogResponse = await response.json();
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
