import type { Article, Category } from "@prisma/client";


export type NewsArticle = Article & {
  category?: Category | null;
};


export interface HomepageData {

  hero: NewsArticle | null;

  breaking: NewsArticle[];

  editorsPick: NewsArticle[];

  topStories: NewsArticle[];

  national: NewsArticle[];

  defence: NewsArticle[];

  economy: NewsArticle[];

  technology: NewsArticle[];

  opinion: NewsArticle[];

  latest: NewsArticle[];

  mostRead: NewsArticle[];

  trending: NewsArticle[];

}