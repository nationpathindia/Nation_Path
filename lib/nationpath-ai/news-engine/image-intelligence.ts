// lib/nationpath-ai/news-intelligence/image-intelligence.ts

export interface ImageResult {
  url: string;
  alt: string;
  source: 'rss' | 'unsplash' | 'pexels' | 'pixabay' | 'fallback';
  license: string;
  credit: string;
  width?: number;
  height?: number;
  photographer?: string;
}

export async function fetchMultipleImages(
  title: string,
  keywords: string[],
  rssImageUrl?: string | null
): Promise<ImageResult[]> {
  
  const allImages: ImageResult[] = [];
  
  // 1. Priority: RSS Feed se image (agar valid hai)
  if (rssImageUrl && isValidUrl(rssImageUrl)) {
    allImages.push({
      url: rssImageUrl,
      alt: title,
      source: 'rss',
      license: 'editorial',
      credit: 'Source RSS Feed'
    });
  }

  // 2. Smart Keyword Generation
  const searchKeywords = generateSmartKeywords(title, keywords);
  
  // 3. Fetch from Multiple Sources (Parallel)
  const [unsplashImages, pexelsImages, pixabayImages] = await Promise.all([
    fetchFromUnsplash(searchKeywords),
    fetchFromPexels(searchKeywords),
    fetchFromPixabay(searchKeywords)
  ]);
  
  allImages.push(...unsplashImages);
  allImages.push(...pexelsImages);
  allImages.push(...pixabayImages);
  
  // 4. Remove duplicates (by URL)
  const uniqueImages = allImages.filter((img, index, self) =>
    index === self.findIndex((t) => t.url === img.url)
  );
  
  // 5. Return top 8 most relevant images
  return uniqueImages.slice(0, 8);
}

// Smart keyword generation for better image matching
function generateSmartKeywords(title: string, keywords: string[]): string[] {
  // Extract main words from title
  const titleWords = title
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 4 && !['about', 'with', 'from', 'have', 'this', 'that'].includes(word));
  
  // Combine with provided keywords
  const allKeywords = [...new Set([...keywords, ...titleWords])];
  
  // Return top 5 most relevant
  return allKeywords.slice(0, 5);
}

// Unsplash API
async function fetchFromUnsplash(keywords: string[]): Promise<ImageResult[]> {
  const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!unsplashKey || keywords.length === 0) return [];
  
  try {
    const query = encodeURIComponent(keywords.slice(0, 3).join(','));
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=5&orientation=landscape&client_id=${unsplashKey}`
    );
    const data = await res.json();
    
    if (data.results) {
      return data.results.map((img: any) => ({
        url: img.urls.regular,
        alt: img.alt_description || img.description || 'News image',
        source: 'unsplash',
        license: 'Unsplash License (Free to use)',
        credit: `Photo by ${img.user.name} on Unsplash`,
        width: img.width,
        height: img.height,
        photographer: img.user.name
      }));
    }
  } catch (error) {
    console.warn('Unsplash fetch failed:', error);
  }
  return [];
}

// Pexels API
async function fetchFromPexels(keywords: string[]): Promise<ImageResult[]> {
  const pexelsKey = process.env.PEXELS_API_KEY;
  if (!pexelsKey || keywords.length === 0) return [];
  
  try {
    const query = encodeURIComponent(keywords.slice(0, 3).join(' '));
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${query}&per_page=5&orientation=landscape`,
      {
        headers: {
          'Authorization': pexelsKey
        }
      }
    );
    const data = await res.json();
    
    if (data.photos) {
      return data.photos.map((img: any) => ({
        url: img.src.large,
        alt: img.alt || 'News image',
        source: 'pexels',
        license: 'Pexels License (Free to use)',
        credit: `Photo by ${img.photographer} from Pexels`,
        width: img.width,
        height: img.height,
        photographer: img.photographer
      }));
    }
  } catch (error) {
    console.warn('Pexels fetch failed:', error);
  }
  return [];
}

// Pixabay API
async function fetchFromPixabay(keywords: string[]): Promise<ImageResult[]> {
  const pixabayKey = process.env.PIXABAY_API_KEY;
  if (!pixabayKey || keywords.length === 0) return [];
  
  try {
    const query = encodeURIComponent(keywords.slice(0, 3).join(' '));
    const res = await fetch(
      `https://pixabay.com/api/?key=${pixabayKey}&q=${query}&image_type=photo&orientation=horizontal&per_page=5`
    );
    const data = await res.json();
    
    if (data.hits) {
      return data.hits.map((img: any) => ({
        url: img.largeImageURL,
        alt: img.tags || 'News image',
        source: 'pixabay',
        license: 'Pixabay License (Free to use)',
        credit: `Image by ${img.user} from Pixabay`,
        width: img.imageWidth,
        height: img.imageHeight,
        photographer: img.user
      }));
    }
  } catch (error) {
    console.warn('Pixabay fetch failed:', error);
  }
  return [];
}

// Helper function to check if URL is valid
function isValidUrl(string: string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Export legacy function for backward compatibility
export async function processArticleImage(
  title: string,
  keywords: string[],
  rssImageUrl?: string | null
): Promise<ImageResult> {
  const images = await fetchMultipleImages(title, keywords, rssImageUrl);
  return images[0] || {
    url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop',
    alt: title,
    source: 'fallback',
    license: 'royalty-free',
    credit: 'Fallback Image'
  };
}