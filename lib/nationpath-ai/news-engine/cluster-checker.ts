export interface ClusterResult {
  status: 'NEW_STORY' | 'UPDATE' | 'DUPLICATE';
  matchedArticleId?: string;
  similarityScore: number;
}

/**
 * Checks if the new article is a duplicate, an update, or a new story.
 * @param newTitle The title of the incoming article.
 * @param newEntities Combined entities (people + places + orgs) of the new article.
 * @param existingRecentArticles List of recently published articles from DB.
 */
export function checkForDuplicates(
  newTitle: string,
  newEntities: string[],
  existingRecentArticles: Array<{ id: string; title: string; entities: string[] }>
): ClusterResult {
  
  const newTitleLower = newTitle.toLowerCase();
  const newEntitySet = new Set(newEntities.map(e => e.toLowerCase()));

  for (const existing of existingRecentArticles) {
    const existingTitleLower = existing.title.toLowerCase();
    const existingEntitySet = new Set(existing.entities.map(e => e.toLowerCase()));

    // 1. Exact Title Match (100% Duplicate)
    if (newTitleLower === existingTitleLower) {
      return { status: 'DUPLICATE', matchedArticleId: existing.id, similarityScore: 1.0 };
    }

    // 2. Entity Overlap Score (How many same people/places are mentioned?)
    const intersection = new Set([...newEntitySet].filter(x => existingEntitySet.has(x)));
    const entityOverlap = intersection.size / Math.max(newEntitySet.size, 1);

    // 3. Simple Title Word Overlap
    const newWords = new Set(newTitleLower.split(/\W+/));
    const existingWords = new Set(existingTitleLower.split(/\W+/));
    const wordIntersection = new Set([...newWords].filter(x => existingWords.has(x)));
    const wordOverlap = wordIntersection.size / Math.max(newWords.size, 1);

    // Combined Score
    const totalScore = (entityOverlap * 0.7) + (wordOverlap * 0.3);

    if (totalScore > 0.85) {
      return { status: 'DUPLICATE', matchedArticleId: existing.id, similarityScore: totalScore };
    }
    
    if (totalScore > 0.50) {
      // High overlap but not exact. It's an update to an existing story.
      return { status: 'UPDATE', matchedArticleId: existing.id, similarityScore: totalScore };
    }
  }

  return { status: 'NEW_STORY', similarityScore: 0 };
}