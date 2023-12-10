import { Metadata } from "next";
import "@/styles/globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Code Chronicle",
  description: "A blog about code and stuff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
