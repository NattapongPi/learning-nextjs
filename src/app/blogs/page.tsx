import BlogsList from "@/components/BlogsList";
import BlogForm from "@/components/BlogForm";

const url = process.env.NEXT_PUBLIC_API_URL;

async function fetchData(url: string) {
  if (!url) return;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export default async function BlogsPage() {
  const blogs = await fetchData(`${url}/blogs`);

  return (
    <>
      {/* create blog */}
      <BlogForm />
      {/* blogs */}
      <BlogsList blogs={blogs} />
    </>
  );
}
