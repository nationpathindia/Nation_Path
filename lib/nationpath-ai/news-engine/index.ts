import { analyzeQualityAndLanguage } from './analyzer';
import { extractDeepData } from './extractor';
import { checkForDuplicates } from './cluster-checker';

export interface IngestionResult {
  success: boolean;
  error?: string;
  data?: {
    language: string;
    wordCount: number;
    extractedData: any;
    clusterStatus: any;
  };
}

/**
 * MASTER FUNCTION: Call this when a new raw feed comes in.
 */
export async function processIngestion(
  title: string,
  rawContent: string,
  recentArticlesFromDB: Array<{ id: string; title: string; entities: string[] }>
): Promise<IngestionResult> {
  
  try {
    // Step 1: Quality Check
    const quality = analyzeQualityAndLanguage(rawContent, title);
    if (!quality.isQualityGood) {
      return { success: false, error: `Quality Gate Failed: ${quality.issues.join(', ')}` };
    }

    // Step 2: Deep Extraction
    const extractedData = extractDeepData(rawContent);
    const allEntities = [
      ...extractedData.people, 
      ...extractedData.places, 
      ...extractedData.organizations
    ];

    // Step 3: Cluster/Duplicate Check
    const clusterStatus = checkForDuplicates(title, allEntities, recentArticlesFromDB);
    
    if (clusterStatus.status === 'DUPLICATE') {
      return { success: false, error: `Duplicate detected. Matches article ID: ${clusterStatus.matchedArticleId}` };
    }

    // Step 4: Return Clean Data
    return {
      success: true,
      data: {
        language: quality.language,
        wordCount: quality.wordCount,
        extractedData,
        clusterStatus
      }
    };

  } catch (error: any) {
    return { success: false, error: error.message || 'Ingestion engine crashed.' };
  }
}