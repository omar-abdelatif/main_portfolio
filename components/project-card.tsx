import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
    name: string;
    image: string;
    tags: string | { value: string }[] | string[];
    slug: string;
    subcategory: string;
}

interface TagType {
    value: string;
}

export default function ProjectCard({ name, image, tags, slug, subcategory }: ProjectCardProps) {
    const parsedTags = typeof tags === 'string' ? (tags.startsWith('[') ? JSON.parse(tags) : tags.split(',').map((tag): TagType => ({ value: tag.trim() }))) : (Array.isArray(tags) ? tags.map((tag): TagType => typeof tag === 'string' ? { value: tag } : tag as TagType) : []);

    return (
        <div className="bg-[#F7D990] card overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-5">
            <div className="card-body">
                <div className="relative w-full aspect-[4/3]">
                    <div className="card-image">
                        <Image src={image} alt={name} fill className="w-full" />
                    </div>
                    <div className="absolute top-0 left-0 w-full text-center bg-yellow-100 px-3 py-1 rotate-[-45deg] translate-x-[-38%] translate-y-[100%]">
                        <span className="text-yellow-800 font-bold text-lg">
                            {subcategory}
                        </span>
                    </div>
                </div>
                <div className="card-content flex flex-col justify-center items-center p-6 gap-4 flex-1">
                    <h2 className="text-2xl font-bold text-center">{name}</h2>
                    <div className="flex justify-center items-center flex-wrap font-bold gap-3">
                        {parsedTags.map((tech: TagType, index:number) => (
                            <span key={index} className="px-3 py-1 bg-[#976714] text-white rounded-full text-sm">
                                {typeof tech === 'string' ? tech : tech.value}
                            </span>
                        ))}
                    </div>
                    <Link href={`/projects/project_details/${slug}`}>
                        <div className="text-center">
                            <span className="text-white rounded-full px-10 py-2 bg-[#7E6E23] font-bold inline-flex items-center">
                                View Details
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}