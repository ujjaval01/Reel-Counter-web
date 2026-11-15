import type { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';

export interface VercelRequest extends IncomingMessage {
  query: Record<string, string | string[]>;
  method?: string;
  headers: Record<string, string | undefined>;
}

export interface VercelResponse extends ServerResponse {
  status: (statusCode: number) => VercelResponse;
  json: (data: any) => void;
  setHeader: (name: string, value: string) => this;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Cache for 1 day, stale while revalidate for 7 days
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');

  try {
    const characters = Array.from({ length: 24 }, (_, i) => {
      const num = i + 1;
      const key = `ch_${num}`;
      return {
        key,
        name: `Character ${num}`,
        url: `https://reelcounter.vercel.app/avatars/${key}.png`,
        preview: `/avatars/${key}.png`,
      };
    });

    return res.status(200).json({
      version: 1,
      total: characters.length,
      characters,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err?.message || 'Failed to fetch avatars list',
      characters: [],
    });
  }
}
