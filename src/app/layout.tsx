import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";

const myFont = localFont({ src: "../font/localfont.otf" });

export const metadata: Metadata = {
	title: "Embriefy",
	description: "CollectCustomerStories Effortlessly",
	openGraph: {
		title: "Embriefy",
		description: "Build Testimonial Pages in minutes",
		images: [
			{
				url: `${process.env.NEXT_PUBLIC_NEXT_URL}og-image.png`,
				width: 1200,
				height: 630,
				alt: "Embriefy Banner",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Embriefy",
		description: "Build Testimonial Pages in minutes",
		images: [`${process.env.NEXT_PUBLIC_NEXT_URL}og-image.png`],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${myFont.className} antialiased`}>
				{children}
				<Toaster position="bottom-right" richColors />
			</body>
		</html>
	);
}
