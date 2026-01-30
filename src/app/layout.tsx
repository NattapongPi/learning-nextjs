import "./globals.css";
import Link from "next/link";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav>
          <div className="flex justify-center gap-2">
            <Link href="/">
              <div className="text-2xl font-bold hover:underline hover:text-sky-500 cursor-pointer">
                Home
              </div>
            </Link>
            <Link href="/blogs">
              <div className="text-2xl font-bold hover:underline hover:text-sky-500 cursor-pointer">
                Blogs
              </div>
            </Link>
            <Link href="/todos">
              <div className="text-2xl font-bold hover:underline hover:text-sky-500 cursor-pointer">
                Todos
              </div>
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
