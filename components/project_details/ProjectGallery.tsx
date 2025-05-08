import { useState } from 'react';
import Image from 'next/image';

interface ProjectGalleryProps {
    images: string[];
    projectName: string;
}

export default function ProjectGallery({ images, projectName }: ProjectGalleryProps) {
    const [activeImage, setActiveImage] = useState(0);

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <section className="project-gallery mt-12 pt-8 border-t-2 border-[#715a34]">
            <div className="container mx-auto px-4">
                <h2 className="text-5xl font-bold text-center mb-8">Project Gallery</h2>

                {/* Main Image Display */}
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border-[3px] border-black mb-4 max-w-4xl mx-auto">
                    <Image src={images[activeImage]} alt={`${projectName} gallery image ${activeImage + 1}`} fill className="object-cover" priority />
                </div>

                {/* Thumbnails */}
                <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
                    {images.map((image, index) => (
                        <div key={index} className={`relative w-20 h-20 cursor-pointer rounded-md overflow-hidden ${index === activeImage ? 'border-[3px] border-[#E5A137]' : 'border border-gray-300'}`} onClick={() => setActiveImage(index)} >
                            <Image src={image} alt={`${projectName} thumbnail ${index + 1}`} fill className="object-cover" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}