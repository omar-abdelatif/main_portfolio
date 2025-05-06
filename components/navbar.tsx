import Link from "next/link";
export default function Navbar() {
    return (
        <nav className="flex flex-col items-center lg:flex lg:flex-row lg:justify-between md:flex md:flex-col md:items-center sm:flex sm:flex-col sm:items-center sm:mb-0 md:mb-0 lg:mb-0 pt-15">
            <Link href="/" className="block">
                <h1 className="text-6xl font-bold nav-brand mb-4 lg:ml-25 md:ml-0 sm:ml-0 md:mb-4 sm:mb-4">&lt;/OA&gt;</h1>
            </Link>
            <div className="dev-name flex flex-col lg:mr-30">
                <h1 className="text-4xl font-bold text-center lg:text-5xl md:text-5xl sm:text-4xl">Omar Abdelatif Hassan</h1>
                <span className="text-center lg:text-xl md:text-xl sm:text-lg text-md font-bold">Full Stack Laravel & Next.js Developer</span>
            </div>
        </nav>
    );
}