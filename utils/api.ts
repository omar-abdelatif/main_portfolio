const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
import { Project } from '@/components/types/project';

export async function fetchFromAPI(endpoint: string) {
    try {
        const url = `${API_BASE_URL}/${endpoint}`;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
                'X-API-Key': API_KEY || ''
            },
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            console.warn(`API response not ok: ${response.status}`);
            return [];
        }

        const data = await response.json();
        return data || [];

    } catch (error) {
        console.error('Error fetching from API:', error);
        return [];
    }
}
export async function fetchProjects(): Promise<Project[]> {
    const response = await fetchFromAPI('projects');
    if (Array.isArray(response)) {
        return response;
    }
    if (response && Array.isArray(response.data)) {
        return response.data;
    }
    return [];
}
export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
    try {
        return await fetchFromAPI(`projects/project_details/${slug}`) as Project;
    } catch (error) {
        console.error('Error fetching project by slug:', error);
        return null;
    }
}
export async function fetchPricing() {
    const pricingData = await fetchFromAPI('pricing/plans');
    if (Array.isArray(pricingData)) {
        return pricingData;
    }
    if (pricingData && Array.isArray(pricingData.data)) {
        return pricingData.data;
    }
    return [];
}
export async function fetchAbout() {
    const aboutData = await fetchFromAPI('about');
    if (Array.isArray(aboutData)) {
        return aboutData;
    }
    if (aboutData && Array.isArray(aboutData.data)) {
        return aboutData.data;
    }
    return [];
}
export async function fetchSkills() {
    const skillsData = await fetchFromAPI('skills');
    if (Array.isArray(skillsData)) {
        return skillsData;
    }
    if (skillsData && Array.isArray(skillsData.data)) {
        return skillsData.data;
    }
    return [];
}
export async function fetchSocialLinks() {
    const socialData = await fetchFromAPI('social/links');
    if (Array.isArray(socialData)) {
        return socialData;
    }
    if (socialData && Array.isArray(socialData.data)) {
        return socialData.data;
    }
    return [];
}