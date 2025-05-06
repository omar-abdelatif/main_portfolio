import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

interface BreadcrumbProps {
    currentTitle?: string;
}

export default function Breadcrumb({ currentTitle }: BreadcrumbProps) {
    const pathname = usePathname();
    const breadcrumbs = useMemo(() => {
        const segments = pathname.split('/').filter(segment => segment !== '');
        const items = [
            { label: 'HomePage', href: '/' },
        ];
        if (segments.length > 0) {
            let path = '';
            segments.forEach((segment, index) => {
                path += `/${segment}`;
                if (segment === 'project_details') return;
                if (index === segments.length - 1 && segment !== 'projects' && currentTitle) {
                    items.push({ label: currentTitle, href: path });
                } else {
                    const label = segment === 'projects' ? 'All Projects' :
                        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/_/g, ' ');
                    items.push({ label, href: path });
                }
            });
        }
        return items;
    }, [pathname, currentTitle]);

    return (
        <nav className="breadcrumb-container mb-8">
            <div className="rounded-full bg-[#E5A137] border-[2px] border-black px-4 py-2 inline-flex items-center">
                {breadcrumbs.map((breadcrumb, index) => (
                    <div key={breadcrumb.href} className="flex items-center">
                        {index > 0 && <span className="mx-2 text-black font-bold">/</span>}
                        <Link href={breadcrumb.href} className="text-black font-bold hover:text-[#5C3B10] transition-colors">{breadcrumb.label}</Link>
                    </div>
                ))}
            </div>
        </nav>
    );
}
