import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Cairo } from "next/font/google";

const cairo = Cairo({
	subsets: ["latin"],
	variable: "--font-cairo",
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div className={`${cairo.variable}`}>
			<Component {...pageProps} />
		</div>
	);
}
