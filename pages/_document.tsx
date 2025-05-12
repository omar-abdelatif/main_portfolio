import { Html, Head, Main, NextScript } from "next/document";

import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
	return {
		metadataBase: new URL("https://omarabdelatif.vercel.app"),
		title: "Omar Abdelatif",
		description: "Egyptian Full Stack Developer With laravel and Next.js",
		authors: [{ name: "Omar Abdelaltif", url: "https://omarabdelatif.vercel.app" }],
		keywords: ["laravel", "next", "webapp", "systems", "coding", "ai", "websites"],
		openGraph: {
			title: "Omar Abdelatif",
			description: "Egyptian Full Stack Developer With laravel and Next.js",
			url: "https://omarabdelatif.vercel.app",
			images: [
				{
					url: "/assets/images/logo.png",
					width: 800,
					height: 600,
					alt: "Omar Abdelaltif",
				},
			],
		},
		icons: {
			icon: '/assets/images/logo.ico',
		},
	};
};

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body className="antialiased">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
