import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Cairo } from 'next/font/google';

const cairo = Cairo({
	subsets: ['arabic'],
	weight: ['400', '500', '600', '700'],
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div className={cairo.className}>
			<Component {...pageProps} />
		</div>
	);
}
