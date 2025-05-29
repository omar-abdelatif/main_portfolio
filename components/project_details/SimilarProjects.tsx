import { Project } from '@/components/types/project';
import ProjectCard from '@/components/project-card';

interface SimilarProjectsProps {
    projects: Project[];
    subcategory: string;
}

export default function SimilarProjects({ projects, subcategory }: SimilarProjectsProps) {
    if (!projects || projects.length === 0) {
        return null;
    }

    return (
        <section className="similar-projects mt-12 text-center w-full pt-8 border-t-2 border-[#715a34] px-5">
            <div className="container-full">
                <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-center underline sm:mb-6 md:mb-8 lg:mb-10">Similar {subcategory.charAt(0).toUpperCase() + subcategory.slice(1).toLowerCase()} Projects</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-7 sm:mt-10">
                    {projects.map((project) => (
                        <ProjectCard key={project.slug} name={project.name} image={project.image} tags={project.tags} slug={project.slug} subcategory={project.subcategory} official={project.officiality_status} />
                    ))}
                </div>
            </div>
        </section>
    );
}