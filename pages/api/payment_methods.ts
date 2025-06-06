import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const endpoint = 'payment/methods';
    try {
        const response = await fetch(`${process.env.API_URL}/${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.API_KEY}`,
                'X-API-Key': process.env.API_KEY || ''
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch pricing plans');
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('API error (payment methods):', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}