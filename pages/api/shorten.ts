import { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';
import { saveUrlPair } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end(); // Method Not Allowed

    const { url }: { url?: string } = req.body;
    if (!url) return res.status(400).end(); // Bad Request

    const shortId = nanoid(7);
    await saveUrlPair(shortId, url);

    res.json({ shortId });
}
