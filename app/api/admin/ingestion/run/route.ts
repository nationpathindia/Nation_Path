import { NextResponse } from 'next/server';
import { fetchAndIngestRSS } from '@/lib/ingestion/rss-service'; 

export async function POST() {
  try {
    console.log('🔄 Manual ingestion triggered by admin...');
    const result = await fetchAndIngestRSS();
    
    return NextResponse.json({
      success: true,
      message: `Ingestion completed successfully! Added ${result.added} new items.`,
      added: result.added
    });
  } catch (error: any) {
    console.error('❌ Manual ingestion failed:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to run ingestion'
    }, { status: 500 });
  }
}