import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
export default function Hero() {
    return (
        <motion.section initial={{ y: -500 }} animate={{ y: 0 }} transition={{ duration: 0.7 }} className="hero-section lg:mb-26 md:mb-7 sm:mb-5 lg:mt-25 md:mt-10 sm:mt-5 mt-5 transition-all duration-100 ease-out flex justify-center">
            <div className="container mx-20 sm:mx-0 md:mx-0 lg:mx-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link href="/about" className="block">
                        <div className="bg-[#E5A137] hover:bg-[#BE7316] shadow-lg rounded-2xl p-6 hover:shadow-xl transition border-[3px] border-black hover:scale-105 cursor-pointer">
                            <div className="flex justify-center mb-4">
                                <Image src="/assets/images/about.png" alt="about image" width={100} height={100} />
                            </div>
                            <h1 className="text-4xl text-center text-[#E5A137] mb-2 card-title">About</h1>
                        </div>
                    </Link>
                    <Link href="/projects" className="block">
                        <div className="bg-[#E5A137] hover:bg-[#BE7316] shadow-lg rounded-2xl p-6 hover:shadow-xl transition border-[3px] border-black hover:scale-105 cursor-pointer">
                            <div className="flex justify-center mb-4">
                                <Image src="/assets/images/clipboard.png" alt="projects image" width={100} height={100} />
                            </div>
                            <h1 className="text-4xl text-center text-[#E5A137] mb-2 card-title">Projects</h1>
                        </div>
                    </Link>
                    <Link href="/contact" className="block">
                        <div className="bg-[#E5A137] hover:bg-[#BE7316] shadow-lg rounded-2xl p-6 hover:shadow-xl transition border-[3px] border-black hover:scale-105 cursor-pointer">
                            <div className="flex justify-center mb-4">
                                <Image src="/assets/images/contact-us.png" alt="contact us image" width={100} height={100} />
                            </div>
                            <h1 className="text-4xl text-center text-[#E5A137] mb-2 card-title">Contact</h1>
                        </div>
                    </Link>
                    <Link href="/pricing" className="block">
                        <div className="bg-[#E5A137] hover:bg-[#BE7316] shadow-lg rounded-2xl p-6 hover:shadow-xl transition border-[3px] border-black hover:scale-105 cursor-pointer">
                            <div className="flex justify-center mb-4">
                                <Image src="/assets/images/icon-market-specific-pricing.png" alt="pricing image" width={100} height={100} />
                            </div>
                            <h1 className="text-4xl text-center text-[#E5A137] mb-2 card-title">Pricing</h1>
                        </div>
                    </Link>
                </div>
            </div>
        </motion.section>
    );
}