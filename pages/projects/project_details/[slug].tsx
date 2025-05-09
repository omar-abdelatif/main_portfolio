import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout';
import ProjectNotFound from '@/pages/not-found';
import { fetchSimilarProjects } from '@/utils/api';
import { Project } from '@/components/types/project';
import Breadcrumb from '@/components/project_details/BreadCrumb';
import SimilarProjects from '@/components/project_details/SimilarProjects';
import ClientTestimonial from '@/components/project_details/ClientTestimonial';
import ProjectGallery from '@/components/project_details/ProjectGallery';

export default function ProjectDetails() {
    const router = useRouter();
    const { slug } = router.query;

    const [projectData, setProjectData] = useState<Project | null>(null);
    const [similarProjects, setSimilarProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        const fetchData = async () => {
            try {
                const res = await fetch(`/api/project_details/${slug}`);
                if (!res.ok) throw new Error('Project not found');
                const data = await res.json();
                setProjectData(data);

                if (data.subcategory) {
                    const similarRes = fetchSimilarProjects(data.subcategory, data.slug);
                    const similarData = await similarRes;
                    setSimilarProjects(similarData);
                }
            } catch {
                setProjectData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);
    const url = router.asPath;
    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (!projectData) return <ProjectNotFound />;
    const galleryImages = projectData.galleries.map((item) => item.image);
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
                <section className="project-details pt-10 pb-5 w-full">
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
                                <div className="flex flex-wrap justify-center sm:justify-start md:justify-start lg:justify-start gap-2 mb-6">
                                    {parsedTags.map((tag: string, index: number) => (
                                        <span key={index} className="px-3 py-1 bg-[#976714] text-white rounded-full text-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-4 justify-center sm:justify-start md:justify-start lg:justify-start align-center">
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
                {projectData.galleries && (<ProjectGallery projectName={projectData.name} images={galleryImages} />)}
                {projectData.testmonials && (<ClientTestimonial name={projectData.testmonials.name} position={projectData.testmonials.position} image={projectData.testmonials.image ?? "https://randomuser.me/api/portraits/men/32.jpg"} quote={projectData.testmonials.content} />)}
                <SimilarProjects projects={similarProjects} subcategory={projectData.subcategory} />
            </Layout>
        </>
    )
}