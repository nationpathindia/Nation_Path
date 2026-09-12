import { z } from 'zod';

// ✅ FINAL LOCKED SCHEMA
const IntelligenceSchema = z.object({
  mainStory: z.string().optional(),
  brief: z.string().optional(),
  keyTakeaways: z.array(z.string()).optional(),
  keyHighlights: z.object({
    issue: z.string().optional(),
    location: z.string().optional(),
    authority: z.string().optional(),
    actionTaken: z.string().optional(),
    impact: z.string().optional()
  }).optional(),
  whyItMatters: z.object({
    broaderImpact: z.string().optional(),
    objectiveAnalysis: z.string().optional()
  }).optional(),
  whatsNext: z.string().optional(),
  background: z.string().optional(),
  expertOpinion: z.array(z.object({
    expert: z.string().optional(),
    designation: z.string().optional(),
    quote: z.string(),
    perspective: z.string().optional()
  })).optional(),
  suggestedCategory: z.string().optional(),
  suggestedSubCategory: z.string().optional(),
  timeline: z.array(z.object({
    year: z.string(),
    title: z.string(),
    description: z.string(),
    status: z.string()
  })).optional(),
  factChecks: z.array(z.object({
    claim: z.string(),
    verdict: z.enum(['VERIFIED', 'MISLEADING', 'FALSE', 'UNCONFIRMED']),
    explanation: z.string(),
    source: z.string()
  })).optional(),
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string()
  })).optional(),
  seoTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  urlSlug: z.string().optional()
});

export type GeneratedIntelligence = z.infer<typeof IntelligenceSchema>;

// ✅ ULTRA BULLETPROOF JSON REPAIR
function repairJson(rawText: string): string {
  let text = typeof rawText === 'string' ? rawText : JSON.stringify(rawText);
  text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  const first = text.indexOf('{');
  const last = text.lastIndexOf('}');
  if (first !== -1 && last !== -1 && last > first) {
    text = text.substring(first, last + 1);
  }
  text = text.replace(/"([^"\\]*(\\.[^"\\]*)*)"/g, function(match) {
    return match.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t');
  });
  text = text.replace(/"\s*\n\s*"/g, '",\n"');
  text = text.replace(/}\s*\n\s*{/g, '},\n{');
  text = text.replace(/]\s*\n\s*\[/g, '],\n[');
  text = text.replace(/]\s*\n\s*{/g, '],\n{');
  text = text.replace(/}\s*\n\s*\[/g, '},\n[');
  text = text.replace(/(true|false|null|\d|")\s*\n\s*"/g, '$1,\n"');
  text = text.replace(/(true|false|null|\d|")\s*\n\s*{/g, '$1,\n{');
  text = text.replace(/(true|false|null|\d|")\s*\n\s*\[/g, '$1,\n[');
  text = text.replace(/,\s*([}\]])/g, '$1');
  text = text.replace(/'([^']+?)'\s*:/g, '"$1":');
  return text;
}

// ✅ CATEGORY-SPECIFIC EXPERT RULES (The Game Changer)
const CATEGORY_RULES: Record<string, string> = {
  'Sports': '🚨 SPORTS REPORTING RULE: You are a Senior Sports Editor. You MUST include: Toss details, key batting/bowling performances (with stats), match turning points, and the exact schedule/venue of the next match. Write with energetic, stat-heavy precision.',
  'Politics': '🚨 POLITICAL REPORTING RULE: You are a Senior Political Correspondent. You MUST include: Exact party names, direct leader quotes, policy/voting details, opposition reactions, and constitutional/legal context. Maintain strict neutrality.',
  'Business': '🚨 BUSINESS REPORTING RULE: You are a Chief Financial Analyst. You MUST include: Stock prices/percentage changes, market cap, quarterly financial figures (revenue/profit), analyst ratings, and broader market reaction.',
  'Crime': '🚨 CRIME & LAW REPORTING RULE: You are a Legal Affairs Reporter. You MUST include: FIR number (if available), police station name, relevant IPC/BNS sections, details of accused/victim, court name, and investigation status.',
  'Defense': '🚨 DEFENSE REPORTING RULE: You are a Defense & Security Correspondent. You MUST include: Specific military branch, operation/equipment name, official statements (MoD/Army), strategic impact, and historical context.',
  'International': '🚨 INTERNATIONAL AFFAIRS RULE: You are a Geopolitical Analyst. You MUST include: Exact geographic location, diplomatic implications, key stakeholders (countries/organizations), timeline of events, and expert analysis.',
  'Technology': '🚨 TECH REPORTING RULE: You are a Senior Tech Journalist. You MUST include: Key product specifications, pricing, launch date, expert review highlights (pros/cons), and competitor comparison.',
  'Health': '🚨 HEALTH REPORTING RULE: You are a Medical Correspondent. You MUST include: Research institution/hospital name, study methodology/sample size, expert medical opinions, and practical implications for public health.',
  'Science': '🚨 SCIENCE REPORTING RULE: You are a Science Correspondent. You MUST include: Research institution/university name, key scientific data/findings, expert quotes, and significance of the discovery.',
  'Entertainment': '🚨 ENTERTAINMENT REPORTING RULE: You are an Entertainment Critic. You MUST include: Box office numbers, key cast/crew, budget vs collection, critical reception, and audience reaction.',
  'Environment': '🚨 ENVIRONMENT REPORTING RULE: You are an Environment Correspondent. You MUST include: Specific location/ecosystem, scientific data (e.g., pollution levels), expert quotes, and long-term ecological impact.',
  'Education': '🚨 EDUCATION REPORTING RULE: You are an Education Correspondent. You MUST include: Specific institution/board name, exam/policy details, impact on students/teachers, and official notification references.',
  'Automobile': '🚨 AUTO REPORTING RULE: You are an Auto Journalist. You MUST include: Vehicle specifications, ex-showroom price, launch date, mileage/range, and key competitor comparisons.',
  'National': '🚨 NATIONAL REPORTING RULE: You are a Chief National Editor. Focus on the 5Ws, authoritative statements from Indian authorities, and the impact on the Indian public.',
  'World': '🚨 WORLD NEWS RULE: You are a Global Affairs Editor. Focus on international context, diplomatic statements, and global impact.',
  'General': '🚨 GENERAL REPORTING RULE: You are a Chief Editor. Focus on the 5Ws, authoritative statements, and clear, objective narrative.'
};

// ✅ PHD-GRADE PROMPTS: DYNAMIC BASED ON EDITORIAL, CATEGORY & REPORT
const getModulePrompts = (isEditorial: boolean, category: string = 'General') => {
  const catRule = CATEGORY_RULES[category] || CATEGORY_RULES['General'];
  
  return {
    mainStory: `1. MAIN STORY (400-600 words): 
    ${isEditorial 
      ? 'Craft a deeply analytical, persuasive editorial. Explore socio-economic or systemic themes with literary elegance, sophisticated vocabulary, and a commanding narrative voice.' 
      : 'Write a cohesive, compelling news narrative in EXACTLY 4 flowing paragraphs.\n  - Para 1 (Lead): A gripping, data-anchored lead (5Ws) with literary flair.\n  - Para 2 (Details): Rigorous detailing of facts, statistics, and authoritative statements.\n  - Para 3 (Context): Scholarly historical or systemic background.\n  - Para 4 (Impact): Profound analysis of future implications.'}
    
    ${catRule}
    🚨 CHIEF EDITOR RULE: You are not a summarizer. Extract core verified facts, but REWRITE the narrative with lexical precision, varied sentence structures, and an authoritative cadence. 
    🚨 STRICT NO-REPETITION: Each paragraph MUST introduce new information. Never pad with repetitive loops.
    🚨 ABSOLUTE BAN ON HEDGE WORDS: NEVER use "according to reports", "allegedly", "sources say", or "unverified". Rewrite all such phrases into direct, confirmed, authoritative statements. Use HTML <p> tags.`,

    brief: `2. BRIEF: Distill the core essence with crystalline precision (40-60 words). Capture ONLY the absolute essentials: WHO, WHAT, WHERE, and the definitive OUTCOME, using high-impact, authoritative vocabulary.`,

    keyTakeaways: `3. KEY TAKEAWAYS: Provide EXACTLY 5 profound, empirical insights derived STRICTLY from the text. Highlight specific numbers, dates, names, or systemic impacts. No superficial points.`,

    keyHighlights: `4. KEY HIGHLIGHTS: Extract critical structured data with absolute fidelity:
    - Issue: The core event/decision/problem
    - Location: Precise geographic scope
    - Authority: Key organization/government body/figures mentioned (NEVER output "Unknown" if context provides a clue, use "Unspecified Authority" only if absolutely absent)
    - Action Taken: Specific measure or development
    - Impact: Quantifiable scale, scope, or consequence`,

    whyItMatters: `5. WHY IT MATTERS: 
    - Broader Impact (2 sentences): Explain wider systemic, economic, or societal implications based strictly on empirical evidence in the text.
    - Objective Analysis (2 sentences): Provide a balanced, scholarly assessment of why this is significant RIGHT NOW, without inventing facts.`,

    whatsNext: `6. WHAT HAPPENS NEXT: Outline concrete, specific upcoming developments mentioned in the text. If none are explicitly stated, state "Specific next steps are currently unspecified by authorities."`,

    background: `7. BACKGROUND: Provide 3-4 sentences of well-established, undisputed historical context relevant to the topic. STRICT RULE: ONLY use facts explicitly stated in the provided text. DO NOT add external common knowledge or generic filler.`,

    expertOpinion: `8. EXPERT OPINIONS: Synthesize 1-2 highly credible, generic expert perspectives that logically extrapolate from the text's themes. 
    - STRICT RULE: Use generic, authoritative titles (e.g., "Constitutional Scholar", "Senior Economic Analyst", "Geopolitical Strategist", "Senior Sports Analyst"). NEVER use placeholders like "(Role/Organization)". NEVER invent real names.
    - Format: { "expert": "Title", "designation": "Specific Generic Role", "quote": "Scholarly insight based strictly on text", "perspective": "Why this matters" }`,

    suggestedCategory: `9. AUTO-CATEGORY: Suggest primary category (Politics, Sports, National, International, Business, Technology, Entertainment, Astrology, Health, Education, Crime, Defense, Environment, Automobile, Editorial) and specific sub-category based on the text.`,

    timeline: `10. TIMELINE: Create a chronological sequence of events/dates mentioned in the text. 
    - CRITICAL RULE: If a specific date or year is NOT explicitly mentioned in the Raw Notes, you MUST output EXACTLY "Date TBA". DO NOT add extra fluff like "by authorities" or "unspecified". Just write "Date TBA". DO NOT guess, assume, or hallucinate years.
    - Format: { "year": "Date TBA" or "YYYY", "title": "Event Name", "description": "What happened", "status": "Completed/Ongoing/Upcoming" }`,

    factChecks: `11. FACT CHECKS & ENTITY VERIFICATION: Conduct forensic verification of claims in the text.
    - CRITICAL PRIORITY RULE: If the "VERIFIED WEB CONTEXT" provides the actual authority, date, or source, you MUST cite it directly. 
    - CRITICAL ENTITY RULE: If the text mentions a well-known public figure or organization with an obviously incorrect current affiliation, you MUST flag this in the explanation.
    - Verdict: 'VERIFIED', 'MISLEADING' (e.g., wrong party affiliation), 'FALSE', or 'UNCONFIRMED'.
    - Explanation: Briefly state the correction based on established real-world facts.
    - Source: Cite the exact authority from the verified context. NEVER output "Unspecified reports" if the verified context has the actual source.`,

    faqs: `12. FAQs: Formulate 5-7 highly relevant, insightful questions that a well-informed reader would ask SPECIFICALLY about this text. 
    - Answers must be comprehensive (2-3 sentences) and strictly derived from the provided context. 
    - AVOID generic, definitional questions. Focus on actionable, text-specific, data-backed information.`,

    seo: `13. SEO METADATA (Google Indexing Optimized):
    - seoTitle: Generate a highly unique, evocative, and literary yet punchy headline. STRICT RULE: Avoid generic, cliché news phrases (e.g., 'Shocks the Nation', 'Big Update'). Craft a title that is intellectually engaging, fact-focused, and optimized for SEO (<60 chars).
    - metaDescription: Compelling summary with primary + secondary keywords (<160 chars).
    - metaKeywords: 6-8 comma-separated keywords.
    - urlSlug: Lowercase, hyphenated, includes primary keyword.`
  };
};

export async function generateNewsIntelligence(
  title: string,
  rawNotesOrContent: string,
  modulesToGenerate: string[] = ['mainStory', 'brief', 'keyTakeaways', 'keyHighlights', 'whyItMatters', 'whatsNext', 'background', 'expertOpinion', 'suggestedCategory', 'timeline', 'factChecks', 'faqs', 'seo'],
  isEditorial: boolean = false,
  category: string = 'General' // ✅ NEW: Category parameter for dynamic prompting
) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !apiToken) {
    throw new Error("Cloudflare credentials missing in .env");
  }

  const MODULE_PROMPTS = getModulePrompts(isEditorial, category);

  const activePrompts = modulesToGenerate
    .filter(mod => MODULE_PROMPTS[mod as keyof typeof MODULE_PROMPTS])
    .map(mod => MODULE_PROMPTS[mod as keyof typeof MODULE_PROMPTS])
    .join('\n\n');

  const dynamicJsonStructure = modulesToGenerate.reduce((acc, mod) => {
    if (mod === 'mainStory') acc.mainStory = isEditorial ? "<p>Deep analytical editorial opening...</p><p>Thematic exploration...</p><p>Persuasive argument...</p><p>Strong concluding thought...</p>" : "<p>Lead paragraph with 5Ws...</p><p>Key details and quotes...</p><p>Background and context...</p><p>Analysis and implications...</p>";
    if (mod === 'brief') acc.brief = "Ultra-concise 40-60 word summary.";
    if (mod === 'keyTakeaways') acc.keyTakeaways = ["Specific takeaway 1 with data", "Takeaway 2", "Takeaway 3", "Takeaway 4", "Takeaway 5"];
    if (mod === 'keyHighlights') acc.keyHighlights = { issue: "...", location: "...", authority: "...", actionTaken: "...", impact: "..." };
    if (mod === 'whyItMatters') acc.whyItMatters = { broaderImpact: "...", objectiveAnalysis: "..." };
    if (mod === 'whatsNext') acc.whatsNext = "Specific upcoming developments with timelines...";
    if (mod === 'background') acc.background = "Historical context and previous related events...";
    if (mod === 'expertOpinion') acc.expertOpinion = [{ expert: "Domain Expert", designation: "Specific Generic Role (e.g., Senior Legal Analyst)", quote: "Professional insight", perspective: "Why it matters" }];
    if (mod === 'suggestedCategory') { acc.suggestedCategory = isEditorial ? "Editorial" : category; acc.suggestedSubCategory = "Sub-category"; }
    if (mod === 'timeline') acc.timeline = [{ year: "Date TBA or YYYY", title: "Event", description: "Context", status: "Completed" }];
    if (mod === 'factChecks') acc.factChecks = [{ claim: "Specific claim", verdict: "VERIFIED", explanation: "Context", source: "Official source or 'Real-world public record'" }];
    if (mod === 'faqs') acc.faqs = [{ question: "Practical question?", answer: "Detailed 2-3 sentence answer" }];
    if (mod === 'seo') { acc.seoTitle = "SEO Title"; acc.metaDescription = "Meta desc"; acc.metaKeywords = "kw1, kw2, kw3"; acc.urlSlug = "seo-url-slug"; }
    return acc;
  }, {} as any);

  const catRule = CATEGORY_RULES[category] || CATEGORY_RULES['General'];
  const articleType = isEditorial ? 'EDITORIAL / OP-ED (Requires deep analytical depth, persuasive narrative, and strong thematic exploration)' : 'STANDARD NEWS REPORT (Requires strict objectivity, inverted pyramid, factual brevity, and literary elegance)';

  const prompt = `You are a Distinguished Professor of Mass Communication and English Literature, serving as the Chief Editor at NationPath India. Your writing masterfully blends empirical, data-driven journalism with literary elegance, lexical precision, and narrative sophistication.

ARTICLE TYPE: ${articleType}
TARGET CATEGORY: ${category}

${catRule}

CRITICAL GROUNDING RULES (ZERO TOLERANCE FOR VIOLATION):
1. STRICT FACTUAL GROUNDING: Base your ENTIRE output ONLY on the provided "Raw Notes/Content". 
2. ZERO HALLUCINATION: DO NOT use internal training data to fill in gaps about dates, years, political alignments, ruling parties, recent events, or statistics. If the text says "dates are unspecified", you MUST write "Date TBA". Never guess.
3. DIRECT AUTHORITATIVE TONE: NEVER use "according to reports", "allegedly", "sources say", or "unverified". Rewrite all such phrases from the input text into direct, confirmed statements. If a source is explicitly named in the text, use that exact name. Never invent fake news outlet names.
4. NO INVENTED QUOTES: Do not make up quotes or attribute them to real specific individuals. Use generic, authoritative titles.
5. OUTPUT ONLY VALID JSON: No markdown, no text before/after. ALL keys and string values MUST use DOUBLE QUOTES (""). Use SINGLE QUOTES (') for internal quotes.

YOUR TASK: Generate comprehensive, high-quality, deeply analytical content for the requested modules based strictly on the Title and Raw Notes provided. Elevate the language to reflect scholarly depth and journalistic integrity.

REQUESTED MODULES TO GENERATE:
${activePrompts}

REQUIRED JSON STRUCTURE:
${JSON.stringify(dynamicJsonStructure, null, 2)}

Article Title: ${title}
Raw Notes/Content: ${rawNotesOrContent}

REMEMBER: Output ONLY valid JSON. Prioritize strict factual accuracy and scholarly depth based on the provided text over creative fabrication.`;

  let attempts = 0;
  const maxAttempts = 3;
  let lastError: Error | null = null;
  let rawText = "";

  while (attempts < maxAttempts) {
    attempts++;
    try {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3.1-8b-instruct`,
        {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${apiToken}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: `You are a Distinguished Professor of Mass Communication and English Literature. Output ONLY valid JSON. STRICTLY base facts on provided text. ZERO TOLERANCE for hallucinating dates, names, sources, or political contexts. Target Category: ${category}.` },
              { role: 'user', content: prompt }
            ],
            max_tokens: 4096, 
            temperature: 0.25, 
          }),
        }
      );

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(`Cloudflare AI Error: ${result.errors?.[0]?.message || 'Unknown error'}`);
      }

      if (typeof result === 'string') {
        rawText = result;
      } else if (typeof result.result === 'string') {
        rawText = result.result;
      } else if (typeof result.result?.response === 'string') {
        rawText = result.result.response;
      } else if (typeof result.result?.choices?.[0]?.message?.content === 'string') {
        rawText = result.result.choices[0].message.content;
      } else if (typeof result.response === 'string') {
        rawText = result.response;
      } else {
        rawText = JSON.stringify(result);
      }

      rawText = repairJson(rawText);
      
      let parsedData;
      try {
        parsedData = IntelligenceSchema.partial().parse(JSON.parse(rawText));
      } catch (parseError: any) {
        console.error("❌ JSON Parse Failed even after repair. Raw text snippet:", rawText.substring(0, 600));
        throw new Error(`Failed to parse AI response as JSON: ${parseError.message}`);
      }
      
      return {
        ...parsedData,
        factChecks: parsedData.factChecks?.map(fc => ({ ...fc, verdict: fc.verdict || 'UNCONFIRMED', source: fc.source?.trim() || 'Unspecified reports' })) || [],
        timeline: parsedData.timeline?.map(tl => ({ ...tl, year: String(tl.year).trim() || 'Date TBA', status: tl.status || 'Completed' })) || [],
        faqs: parsedData.faqs?.slice(0, 7) || [],
        expertOpinion: parsedData.expertOpinion || [],
        keyTakeaways: parsedData.keyTakeaways?.slice(0, 5) || []
      };

    } catch (error: any) {
      lastError = error;
      console.error(`❌ AI Generation Attempt ${attempts} Failed:`, error.message);
      if (attempts === maxAttempts) {
        console.error("🔴 FINAL FAILED RAW OUTPUT:", typeof rawText === 'string' ? rawText.substring(0, 600) : rawText);
      }
      if (error.message.includes('JSON') && attempts < maxAttempts) {
        console.log('🔄 Retrying...');
        continue;
      }
      throw new Error(error.message || 'Failed to generate news intelligence.');
    }
  }
  throw lastError || new Error('Failed after 3 attempts');
}