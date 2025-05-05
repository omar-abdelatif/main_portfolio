import Layout from '@/components/layout';
import Hero from '@/components/hero';
import Head from 'next/head';


export default function Home() {
    return (
        <>
            <Head>
                <meta property="og:url" content='https://omarabdelatif.vercel.app/' />
                <meta property="og:image" content='/assets/images/logo.png' />
                <meta property="og:title" content='Omar Abdelatif' />
                <meta property="og:description" content='Egyptian Full Stack Developer With laravel and Next.js' />
                <meta name="twitter:title" content="Omar Abdelatif" />
                <meta name="twitter:description" content="Egyptian Full Stack Developer With laravel and Next.js" />
                <meta name="twitter:image" content="/assets/images/logo.png" />
            </Head>
            <Layout>
                <Hero />
            </Layout>
        </>
    );
}
