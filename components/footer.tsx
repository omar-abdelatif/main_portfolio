export default function Footer() {
    return (
        <footer className="py-4 w-full">
            <div className="container mx-auto px-4 lg:flex lg:flex-row lg:justify-between md:flex md:flex-row md:justify-between sm:flex sm:flex-col sm:items-center">
                <p className="font-bold text-center lg:text-left md:text-left sm:mb-2 lg:mb-0 md:mb-0">© {new Date().getFullYear()} Omar Abdelatif. All rights reserved.</p>
                <p className="font-bold text-center lg:text-right md:text-right">
                    Designed and Developed by
                    <a href="https://wa.me/+201062760141" target="_blank" rel="noopener noreferrer" className="text-[#fff] pl-1">
                        Omar Abdelatif
                    </a>
                </p>
            </div>
        </footer>
    );
}