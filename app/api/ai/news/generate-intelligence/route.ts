import { NextRequest, NextResponse } from 'next/server';
import { generateNewsIntelligence } from '@/lib/nationpath-ai/news-engine/generator';

export async function POST(req: NextRequest) {
  try {
    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    // Yeh ab server par chalega, jahan .env variables available hain!
    const result = await generateNewsIntelligence(title, content);

    return NextResponse.json({ success: true, data: result });

  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: error.message || 'AI Generation failed' }, { status: 500 });
  }
}