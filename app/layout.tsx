import { Metadata } from "next";
import "@/styles/globals.css";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import StoreProvider from "./StoreProvider";

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
        <StoreProvider>
          <Provider>
            <main>
              <Nav />
              {children}
            </main>
          </Provider>
        </StoreProvider>
      </body>
    </html>
  );
}
