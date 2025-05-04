'use client';
import Layout from '@/components/layout';
import { fetchSocialLinks } from '@/utils/api';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface SocialLink {
    url: string,
    platform_icon: string,
    status: string,
}

export default function Contact() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const [socialData, setSocialData] = useState<SocialLink[]>([]);
    useEffect(() => {
        const getSocialData = async () => {
            try {
                const data = await fetchSocialLinks();
                setSocialData(data);
            } catch (error) {
                console.error('Error fetching social data:', error);
            }
        };
        getSocialData();
    }, []);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Sending...');
        setIsSubmitted(true);
        try {
            const response = await fetch('https://portfolio.adendan.com/api/v1/send/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
                    'X-API-Key': process.env.NEXT_PUBLIC_API_KEY || ''
                },
                body: JSON.stringify(form)
            });
            const data = await response.json();
            if (response.ok) {
                setStatus('Message sent successfully!');
            } else {
                setStatus(`Failed: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus('Error sending message');
        }
    };
    return (
        <Layout>
            <section className="contact-wrapper">
                {isSubmitted && (
                    <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                        Thank you for your message! I&apos;ll get back to you soon.
                    </div>
                )}
                <div className="container-full px-10">
                    <div className="card bg-[#E5A137] border-3 border-black rounded-3xl">
                        <div className="card grid grid-cols-1 md:grid-cols-12 gap-4">
                            <div className="col-span-12 md:col-span-6 lg:col-span-6">
                                <div className="social-items flex flex-col justify-center h-full">
                                    <div className="social-title pb-10 sm:pt-10 md:pt-10 lg:pt-0">
                                        <h1 className="text-center text-white text-4xl underline font-bold">Feel Free To Contact Me</h1>
                                    </div>
                                    <div className="social-icons text-center">
                                        {socialData.filter(social => social.status === 'active').map((social, i) => (
                                            <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="inline-block mx-2">
                                                <Image src={social.platform_icon} alt={social.url} width={100} height={100} className="w-15 h-15" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6">
                                <div className="form-data w-full px-4 sm:px-6 md:px-8">
                                    <div className="form-inputs py-6 sm:py-8 md:py-10">
                                        <form onSubmit={handleSubmit} method="post" className="w-full max-w-lg mx-auto">
                                            <div className="mb-3 sm:mb-4">
                                                <input type="text" name="name" placeholder="Enter Your Name" value={form.name} onChange={handleChange} className="w-full py-4 sm:py-2 bg-[#F7D990] border-2 border-black rounded-lg text-center font-medium placeholder-black focus:outline-none focus:ring-2 focus:ring-[#BE7316]" required />
                                            </div>
                                            <div className="mb-3 sm:mb-4">
                                                <input type="number" name="phone" placeholder="Enter Your Phone Number" value={form.phone} onChange={handleChange} className="w-full py-4 sm:py-2 bg-[#F7D990] border-2 border-black rounded-lg text-center font-medium placeholder-black focus:outline-none focus:ring-2 focus:ring-[#BE7316]" required />
                                            </div>
                                            <div className="mb-3 sm:mb-4">
                                                <input type="email" name="email" placeholder="Enter Your Email" value={form.email} onChange={handleChange} className="w-full py-4 sm:py-2 bg-[#F7D990] border-2 border-black rounded-lg text-center font-medium placeholder-black focus:outline-none focus:ring-2 focus:ring-[#BE7316]" required />
                                            </div>
                                            <div className="mb-3 sm:mb-4">
                                                <input type="text" name="subject" placeholder="Enter Subject Title" value={form.subject} onChange={handleChange} className="w-full py-4 sm:py-2 bg-[#F7D990] border-2 border-black rounded-lg text-center font-medium placeholder-black focus:outline-none focus:ring-2 focus:ring-[#BE7316]" required />
                                            </div>
                                            <div className="mb-4 sm:mb-5 md:mb-6">
                                                <textarea name="message" rows={4} value={form.message} onChange={handleChange} className="w-full py-4 sm:py-2 bg-[#F7D990] border-2 border-black rounded-lg text-center font-medium placeholder-black focus:outline-none focus:ring-2 focus:ring-[#BE7316] resize-none" placeholder="Enter Your Message" required ></textarea>
                                            </div>
                                            <button type="submit" className="w-full py-3 sm:py-2 bg-[#5C3B10] hover:bg-[#7B4F15] text-white font-bold rounded-full border-2 border-black transition-colors duration-300" > Submit </button>
                                            <p>{status}</p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export async function getServerSideProps() {
    try {
        const socialLinks = await fetchSocialLinks();
        return {
            props: {
                socialLinks,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                socialLinks: [],
            },
        };
    }
}