import { Metadata } from "next";
import "@/styles/globals.css";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";

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
        <Provider>
          <Nav />
          {children}
        </Provider>
      </body>
    </html>
  );
}
