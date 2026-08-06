import { analyzeNews } from "@/lib/nationpath-ai/news/analyzer";
import { generateHeadlines } from "@/lib/nationpath-ai/news/headline";
import { generateNewsArticleContent } from "@/lib/nationpath-ai/news/writer";
import { generateNewsIntelligence } from "@/lib/nationpath-ai/news/intelligence";
import { generateNewsSEO } from "@/lib/nationpath-ai/news/seo";
import { mapNewsToArticle } from "@/lib/nationpath-ai/news/mapper";


const rawNews = `
The Government of India announced a new national education reform policy
to improve digital learning infrastructure across schools. Prime Minister
Narendra Modi said the initiative will focus on technology, teacher training
and equal access to education. The Ministry of Education will implement
the programme in phases across different states.
`;


console.log("\n===== ANALYSIS =====");

const analysis =
analyzeNews({
rawNews,
});


console.dir(
analysis,
{
depth:null
}
);



console.log("\n===== HEADLINES =====");

const headlines =
generateHeadlines(
rawNews,
analysis
);

console.dir(
headlines,
{
depth:null
}
);



console.log("\n===== ARTICLE =====");

const article =
generateNewsArticleContent(
headlines.primary,
rawNews,
analysis
);

console.dir(
article,
{
depth:2
}
);



console.log("\n===== INTELLIGENCE =====");

const intelligence =
generateNewsIntelligence(
rawNews,
analysis
);

console.dir(
intelligence,
{
depth:null
}
);



console.log("\n===== SEO =====");

const seo =
generateNewsSEO(
headlines.primary,
article.content,
analysis
);

console.dir(
seo,
{
depth:null
}
);



console.log("\n===== FINAL CMS =====");


const finalArticle =
mapNewsToArticle(
{
headline:{
primary:headlines.primary,
slug:headlines.slug
},

article:{
content:article.content,
shortBrief:article.shortBrief,
background:article.background
},

intelligence,

seo

},
analysis
);


console.dir(
finalArticle,
{
depth:3
}
);