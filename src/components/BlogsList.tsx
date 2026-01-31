"use client";

import Link from "next/link";
import { Blog } from "@/types/blog";

export default function BlogsList({ blogs }: { blogs: Blog[] }) {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 mt-8">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blogs/${blog.id}`}
            className="p-4 border border-gray-200 hover:bg-sky-50 flex flex-col justify-between"
          >
            <div>
              <div className="text-xl font-bold">{blog.title}</div>
              <div className="text-lg">{blog.description}</div>
            </div>
            <div className="text-sm text-end">{blog.author}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
