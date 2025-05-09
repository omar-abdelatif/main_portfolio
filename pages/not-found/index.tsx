import Link from 'next/link';
import Head from 'next/head';
import Layout from '@/components/layout';

export default function ProjectNotFound() {
    return (
        <>
            <Head>
                <title>Not Found</title>
                <link rel="icon" href="/assets/images/logo.ico" />
            </Head>
            <Layout>
                <div className="min-h-screen flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <p className="mb-6">Sorry, the project you&apos;re looking for doesn&apos;t exist.</p>
                    <Link href="/projects" className="bg-[#E5A137] hover:bg-[#BE7316] text-white font-bold py-2 px-4 rounded">
                        Back to Projects
                    </Link>
                </div>
            </Layout>
        </>
    );
}
