import { NextRequest, NextResponse } from 'next/server';
import { generateNewsIntelligence } from '@/lib/nationpath-ai/news-engine/generator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // ✅ NEW: isEditorial aur category ko bhi extract karein
    const { title, content, modulesToGenerate, isEditorial, category } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    // Agar frontend ne modules nahi bheje, toh generator apna default (sab kuch) use karega
    const modules = Array.isArray(modulesToGenerate) && modulesToGenerate.length > 0 
      ? modulesToGenerate 
      : undefined;

    // ✅ Safe Defaults: Agar frontend se category nahi aayi, toh 'General' use karo
    const editorialMode = isEditorial === true;
    const targetCategory = typeof category === 'string' && category.trim() !== '' ? category : 'General';

    console.log(`🚀 Generating intelligence for: "${title.substring(0, 50)}..."`);
    console.log(`   - Target Category: ${targetCategory}`);
    console.log(`   - Editorial Mode: ${editorialMode ? 'YES' : 'NO'}`);
    console.log(`   - Modules:`, modules || 'ALL (Default)');

    // ✅ Pass all 5 parameters to the enhanced generator
    const result = await generateNewsIntelligence(
      title, 
      content, 
      modules, 
      editorialMode, 
      targetCategory
    );

    return NextResponse.json({ 
      success: true, 
      data: result,
      message: 'Intelligence generated successfully with category-specific rules' 
    });

  } catch (error: any) {
    console.error("❌ API Route Error:", error);
    return NextResponse.json({ 
      error: error.message || 'AI Generation failed' 
    }, { status: 500 });
  }
}