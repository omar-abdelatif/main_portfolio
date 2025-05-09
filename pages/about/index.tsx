import Layout from '@/components/layout';
import { useEffect, useState } from 'react';
import { fetchAbout, fetchSkills } from '@/utils/api';
import Image from 'next/image';
import Link from 'next/link';
import type { About } from '@/components/types/about';
import { Skill } from '@/components/types/Skill';

export default function AboutPage() {
    const [aboutData, setAboutData] = useState<About[]>([]);
    const [skillsData, setSkillsData] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadData = async () => {
            try {
                const [about, skills] = await Promise.all([fetchAbout(), fetchSkills()]);
                setAboutData(about);
                setSkillsData(skills);
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const about = aboutData[0] || {};
    console.log(about);
    if (loading) return <div className="text-center p-10 text-white">Loading...</div>;
    return (
        <Layout>
            <section className="about-wrapper mt-8 mb-5">
                <div className="container-full px-10">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="bg-[#BE7316] col-span-12 md:col-span-12 lg:col-span-4 rounded-xl p-6 shadow-lg border-2 border-black">
                            <div className="flex flex-col items-center mb-3">
                                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-black">
                                    <Image src={about.about_img} alt={about.name + ' Image'} width={128} height={128} className="rounded-full w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="text-white">
                                <p className="text-lg font-bold">Name: {about.name}</p>
                                <p className="text-lg font-bold">Email: {about.email}</p>
                                <p className="text-lg font-bold">Mobile: +20{about.phone}</p>
                                <p className="text-lg font-bold">Position: {about.position}</p>
                                <p className="text-lg font-bold">Nationality: {about.nationality}</p>
                                <div className="text-center mt-6">
                                    <Link href="/contact" className="bg-[#E5A137] hover:bg-[#F7D990] text-black font-bold py-2 px-6 rounded-full border-2 border-black">Hire Now</Link>
                                </div>
                            </div>
                        </div>
                        <div className="about-data col-span-12 md:col-span-12 lg:col-span-8">
                            <div className="bg-[#BE7316] rounded-xl mb-5 p-6 shadow-lg border-2 border-black text-white">
                                <h2 className="text-lg font-bold border-b border-black pb-2 mb-4">About Me:</h2>
                                <p className="text-md">{about.description}</p>
                            </div>
                            <div className="bg-[#BE7316] rounded-xl p-6 shadow-lg border-2 border-black text-white">
                                <div className="mb-4">
                                    <p className="font-bold mb-2">Skills:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {skillsData.map((skill, i) => (
                                            <span key={i} className="bg-[#E5A137] text-black px-3 py-1 rounded-full font-semibold text-sm border border-black">{skill.name}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-center mt-6">
                                    <h3 className="text-4xl font-bold underline">For More Information</h3>
                                    <p className="mt-2 font-bold">You can Download My CV From Here:</p>
                                    <a href={about.about_cv} download className="inline-block mt-2 bg-[#E5A137] hover:bg-[#F7D990] text-black font-bold py-1 px-4 rounded border border-black">Download</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}