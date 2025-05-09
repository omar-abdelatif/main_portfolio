import { Project } from '@/components/types/project';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await fetch(`${process.env.API_URL}`, {
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
        if (Array.isArray(data)) {
            return data;
        }
        return [];
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}
export async function fetchSimilarProjects(subcategory: string, currentSlug: string): Promise<Project[]> {
    try {
        const allProjects = await fetchProjects();
        return allProjects.filter(project =>
            project.subcategory.toLowerCase() === subcategory.toLowerCase() &&
            project.slug !== currentSlug
        ).slice(0, 6);
    } catch (error) {
        console.error('Error fetching similar projects:', error);
        return [];
    }
}
export async function fetchPricing() {
    try {
        const response = await fetch('/api/pricing');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error fetching pricing:', error);
        return [];
    }
}
export async function fetchAbout() {
    try {
        const response = await fetch('/api/about');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error fetching about:', error);
        return [];
    }
}
export async function fetchSkills() {
    try {
        const response = await fetch('/api/skills');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
            return data;
        }
        return [];
    } catch (error) {
        console.error('Error fetching skills:', error);
        return [];
    }
}
export async function fetchSocialLinks() {
    try {
        const response = await fetch('/api/social_links');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
            return data;
        }
        return [];
    } catch (error) {
        console.error('Error fetching skills:', error);
        return [];
    }
}