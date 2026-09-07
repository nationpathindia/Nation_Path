import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { title, keywords } = await req.json();
    const query = encodeURIComponent(keywords?.[0] || title?.split(' ')[0] || "news");
    
    const images = [];

    // 1. Try Unsplash
    const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;
    if (unsplashKey) {
      const res = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=3&orientation=landscape&client_id=${unsplashKey}`);
      const data = await res.json();
      if (data.results) {
        images.push(...data.results.map((img: any) => ({
          url: img.urls.regular,
          alt: img.alt_description || title,
          caption: img.description || title,
          isPrimary: false,
          source: "unsplash",
          license: "Unsplash License",
          credit: `Photo by ${img.user.name} on Unsplash`
        })));
      }
    }

    // 2. Try Pexels
    const pexelsKey = process.env.PEXELS_API_KEY;
    if (pexelsKey && images.length < 6) {
      const res = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=3&orientation=landscape`, {
        headers: { Authorization: pexelsKey }
      });
      const data = await res.json();
      if (data.photos) {
        images.push(...data.photos.map((img: any) => ({
          url: img.src.large,
          alt: img.alt || title,
          caption: img.alt || title,
          isPrimary: false,
          source: "pexels",
          license: "Pexels License",
          credit: `Photo by ${img.photographer} from Pexels`
        })));
      }
    }

    return NextResponse.json({ images: images.slice(0, 6) }); 
  } catch (error) {
    console.error("Fetch images error:", error);
    return NextResponse.json({ images: [] });
  }
}