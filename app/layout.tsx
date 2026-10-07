import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { ThemeProvider } from "@/lib/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Phung",
  description: "Software Engineer based in Austin, TX",
  openGraph: {
    title: "My Phung",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className={fontVariables} suppressHydrationWarning>
      <body className="antialiased relative">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
