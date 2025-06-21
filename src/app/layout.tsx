import type { Metadata } from "next";
import localFont from "next/font/local"
import "./globals.css";
import { Toaster } from "sonner";

const myFont = localFont({src : "../font/localfont.otf"})



export const metadata: Metadata = {
  title: "Testimonia",
  description: "CollectCustomerStories Effortlessly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${myFont.className} antialiased`}
      >

        {children}
        <Toaster position="bottom-right" richColors  />
      </body>
    </html>
  );
}
