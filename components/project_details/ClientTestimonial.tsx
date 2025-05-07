import Image from 'next/image';

interface TestimonialProps {
    name: string;
    position: string;
    image: string;
    quote: string;
}

export default function ClientTestimonial({ name, position, image, quote }: TestimonialProps) {
    return (
        <section className="client-testimonial mt-12 pt-8 border-t-2 border-[#715a34]">
            <div className="container mx-auto px-4">
                <h2 className="text-5xl font-bold text-center mb-8 underline">Client Opinion</h2>
                <div className="bg-[#F7D990] rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
                    <div className="flex flex-col items-center" dir='rtl'>
                        <div className="mb-4 md:mb-0 flex justify-center">
                            <div className="relative w-26 h-26 rounded-full overflow-hidden border-4 border-[#976714]">
                                <Image src={image} alt={name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover"/>
                            </div>
                        </div>
                        <div className="lg:pl-0 md:pl-6 sm:pl-0 w-3/4 mx-auto">
                            <div className="text-lg mb-4">
                                <p className="font-bold text-3xl">&#34;</p>
                                <span className='my-5'>{quote}</span>
                                <p className="font-bold text-left text-3xl">&#34;</p>
                            </div>
                            <div className="font-bold lg:mr-0 md:mr-0 sm:mr-0 mr-0 text-center">
                                <p className="text-xl">{name}</p>
                                <p className="text-sm text-gray-700">{position}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
