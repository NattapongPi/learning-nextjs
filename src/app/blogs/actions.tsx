"use server";
import { revalidatePath } from "next/cache";
const url = process.env.API_URL;
export async function createBlog(
  _prevState: { message: string },
  formData: FormData
) {
  const title = formData.get("title");
  const description = formData.get("description");
  const author = formData.get("author");
  if (!title || !description || !author)
    return {
      message: "Please fill all the fields",
    };
  try {
    const response = await fetch(`${url}/blogs`, {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        author,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    if (response.ok) {
      revalidatePath("/blogs");
      return {
        success: true,
        message: "Blog created successfully",
      };
    }
    return {
      success: false,
      message: `Blog created failed: ${response.statusText}`,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: `Blog created failed: ${error}`,
    };
  }
}

export const deleteBlog = async (
  _prevState: { success: boolean; message: string },
  formData: FormData
) => {
  const id = formData.get("id");
  if (!id) {
    return {
      success: false,
      message: "Blog ID is required",
    };
  }
  await fetch(`${url}/blogs/${id}`, { method: "DELETE" });
  revalidatePath("/blogs");
  revalidatePath(`/blogs/${id}`);
  return {
    success: true,
    message: "Blog deleted successfully",
  };
};
