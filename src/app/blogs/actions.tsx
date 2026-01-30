"use server";
const url = process.env.API_URL;
export default async function createBlog(
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
      return {
        success: true,
        message: "Blog created successfully",
        timestamp: Date.now(),
      };
    }
    return {
      success: false,
      message: `Blog created failed: ${response.statusText}`,
      timestamp: Date.now(),
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: `Blog created failed: ${error}`,
      timestamp: Date.now(),
    };
  }
}
