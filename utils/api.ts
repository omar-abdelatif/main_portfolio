// const API_URL = process.env.API_BASE_URL;
// const API_KEY = process.env.API_KEY;
import { Project } from '@/components/types/project';
import type { NextApiRequest, NextApiResponse } from 'next';

// export async function fetchFromAPI(endpoint: string) {
//     try {
//         const url = `${API_URL}/${endpoint}`;
//         const response = await fetch(url, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${process.env.API_KEY}`,
//                 'X-API-Key': process.env.API_KEY || ''
//             },
//             next: { revalidate: 3600 }
//         });
//         if (!response.ok) {
//             console.warn(`API response not ok: ${response.status}`);
//             return [];
//         }
//         const data = await response.json();
//         return data || [];
//     } catch (error) {
//         console.error('Error fetching from API:', error);
//         return [];
//     }
// }
export default async function handler(req: NextApiRequest, res: NextApiResponse, endpoint: string) {
    try {
        const response = await fetch(`${process.env.API_BASE_URL}/ ${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.API_KEY}`,
                'X-API-Key': process.env.API_KEY || ''
            }
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export async function fetchProjects(): Promise<Project[]> {
    try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        if (Array.isArray(data)) {
            return data;
        }
        return [];
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}
// export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
//     try {
//         return await fetchFromAPI(`projects/project_details/${slug}`) as Project;
//     } catch (error) {
//         console.error('Error fetching project by slug:', error);
//         return null;
//     }
// }
// export async function fetchSimilarProjects(subcategory: string, currentSlug: string): Promise<Project[]> {
//     try {
//         const allProjects = await fetchProjects();
//         return allProjects.filter(project =>
//             project.subcategory.toLowerCase() === subcategory.toLowerCase() &&
//             project.slug !== currentSlug
//         ).slice(0, 6);
//     } catch (error) {
//         console.error('Error fetching similar projects:', error);
//         return [];
//     }
// }
// export async function fetchPricing() {
//     const pricingData = await fetchFromAPI('pricing/plans');
//     if (Array.isArray(pricingData)) {
//         return pricingData;
//     }
//     if (pricingData && Array.isArray(pricingData.data)) {
//         return pricingData.data;
//     }
//     return [];
// }
// export async function fetchAbout() {
//     const aboutData = await fetchFromAPI('about');
//     if (Array.isArray(aboutData)) {
//         return aboutData;
//     }
//     if (aboutData && Array.isArray(aboutData.data)) {
//         return aboutData.data;
//     }
//     return [];
// }
// export async function fetchSkills() {
//     const skillsData = await fetchFromAPI('skills');
//     if (Array.isArray(skillsData)) {
//         return skillsData;
//     }
//     if (skillsData && Array.isArray(skillsData.data)) {
//         return skillsData.data;
//     }
//     return [];
// }
// export async function fetchSocialLinks() {
//     const socialData = await fetchFromAPI('social/links');
//     if (Array.isArray(socialData)) {
//         return socialData;
//     }
//     if (socialData && Array.isArray(socialData.data)) {
//         return socialData.data;
//     }
//     return [];
// }