import { useEffect, useState } from 'react';
import Layout from '@/components/layout';
import ProjectCard from '@/components/project-card';
import ProjectFilter from '@/components/ProjectFilter';
import { fetchProjects } from '@/utils/api';
import { Project } from '@/components/types/project';

interface ProjectsPageProps {
    projectsData: Project[];
}

export default function Projects({ projectsData }: ProjectsPageProps) {
    const [activeFilter, setActiveFilter] = useState('All');
    const [projects, setProjects] = useState<Project[]>(projectsData);
    const [visibleProjects, setVisibleProjects] = useState(6);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const loadProjects = async () => {
            try {
                setIsLoading(true);
                const data = await fetchProjects();
                setProjects(data);
                setError(null);
            } catch (err) {
                console.error('Error loading projects:', err);
                setError('Failed to load projects');
                setProjects([]);
            } finally {
                setIsLoading(false);
            }
        };
        loadProjects();
    }, []);
    useEffect(() => {
        setVisibleProjects(6);
    }, [activeFilter]);
    const filteredProjects = projects.filter(project => {
        if (activeFilter === 'All') return true;
        return project.subcategory.toLowerCase() === activeFilter.toLowerCase();
    });
    const displayedProjects = filteredProjects.slice(0, visibleProjects);
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#E5A137]"></div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }
    return (
        <Layout>
            <section className="projects-wrapper py-12">
                <div className="container-full px-5">
                    <h1 className="text-5xl font-bold mb-10 text-center">My Projects</h1>
                    <ProjectFilter onFilterChange={setActiveFilter} activeFilter={activeFilter} />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {displayedProjects.length > 0 ? (
                            displayedProjects.map((project) => (
                                <ProjectCard key={project.slug} name={project.name} image={project.image} tags={project.tags} slug={project.slug} subcategory={project.subcategory} />
                            ))
                        ) : (
                            <div className="col-span-full text-center text-black">
                                <span className="font-bold text-black text-5xl">No Projects Found</span>
                            </div>
                        )}
                    </div>
                    {visibleProjects < filteredProjects.length && (
                        <div className="flex justify-center mt-8">
                            <button onClick={() => setVisibleProjects((prev) => prev + 6)} className="px-15 font-bold py-3 bg-[#976714] text-white rounded-full hover:text-black hover:bg-[#F7D990] transition-all">Load More</button>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    )
}

export async function getServerSideProps() {
    try {
        const projectsData = await fetchProjects();
        return {
            props: {
                projectsData,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                projectsData: [],
            },
        };
    }
}