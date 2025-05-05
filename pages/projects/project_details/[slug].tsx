import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import ProjectNotFound from '@/pages/not-found';
import { fetchProjectBySlug } from '@/utils/api';
import { Project } from '@/components/types/project';
import Breadcrumb from '@/components/project_details/BreadCrumb';
import { GetServerSidePropsContext, GetServerSideProps } from 'next';

interface ProjectDetailsPageProps {
    projectData: Project | null;
}

export default function ProjectDetails({ projectData }: ProjectDetailsPageProps) {
    const router = useRouter();
    const url = router.asPath;
    console.log('https://omarabdelatif.vercel.app' + url);
    if (!projectData) return <ProjectNotFound />;
    const parsedTags = JSON.parse(projectData.tags).map((tag: { value: string }) => tag.value);
    return (
        <>
            <Head>
                <meta property="og:url" content={url} />
                <meta property="og:image" content={projectData.image} />
                <meta property="og:title" content={projectData.name} />
                <meta property="og:description" content={projectData.description} />
            </Head>
            <Layout>
                <section className="project-details py-10">
                    <div className="container px-4">
                        <Breadcrumb currentTitle={projectData.name} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="col-span-1 md:col-span-1">
                                <div className="relative w-full aspect-video rounded-lg overflow-hidden border-[3px] border-black">
                                    <Image src={projectData.image} alt={projectData.name} priority fill className="object-cover w-full" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                                </div>
                            </div>
                            <div className="col-span-1 md:col-span-1">
                                <h1 className="text-4xl font-bold mb-4">{projectData.name}</h1>
                                <p className="mb-6">{projectData.description}</p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {parsedTags.map((tag: string, index: number) => (
                                        <span key={index} className="px-3 py-1 bg-[#976714] text-white rounded-full text-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-4">
                                    {projectData.link && (
                                        <Link href={projectData.link} target="_blank" rel="noopener noreferrer" className="bg-[#E5A137] hover:bg-[#BE7316] text-white font-bold py-2 px-4 rounded-full border-2 border-black">Visit Project</Link>
                                    )}
                                    {projectData.github_url && (
                                        <Link href={projectData.github_url} target="_blank" rel="noopener noreferrer" className="bg-[#5C3B10] hover:bg-[#7B4F15] text-white font-bold py-2 px-4 rounded-full border-2 border-black">View Code</Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}

export const getServerSideProps: GetServerSideProps<ProjectDetailsPageProps> = async ( context: GetServerSidePropsContext ) => {
    const { slug } = context.params as { slug: string };
    try {
        const projectData = await fetchProjectBySlug(slug);
        return {
            props: {
                projectData,
            },
        };
    } catch (error) {
        console.error('Error fetching project data:', error);
        return {
            props: {
                projectData: null,
            },
        };
    }
};