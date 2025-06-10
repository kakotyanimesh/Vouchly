import type { Metadata } from "next";
import localFont from "next/font/local"
import "./globals.css";
// import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const myFont = localFont({src : "../font/localfont.otf"})

// const inter = Inter({
//   variable: "--font-Inter",
//   subsets: ["latin"],
// });



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
        <Toaster position="bottom-left" richColors  />
      </body>
    </html>
  );
}
