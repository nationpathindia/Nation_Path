import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { title, imageAlt } = await req.json();
    
    // Temporary mock caption (Baad mein isme Cloudflare AI laga denge)
    const mockCaption = `A high-quality visual representation of: ${title}. ${imageAlt ? imageAlt : 'This image captures the essence of the story, providing readers with immediate context.'} (Source: NationPath Intelligence Bureau)`;
    
    return NextResponse.json({ caption: mockCaption });
  } catch (error) {
    return NextResponse.json({ caption: "Failed to generate caption." }, { status: 500 });
  }
}