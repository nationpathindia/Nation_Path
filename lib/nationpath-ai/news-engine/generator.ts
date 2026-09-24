import { GoogleGenAI } from '@google/genai';
import { z } from 'zod';

/**
 * NationPath AI News Generator
 *
 * Pipeline:
 * RSS / Ingestion
 *      ↓
 * Cloudflare AI source extraction
 *      ↓
 * Gemini Senior Editorial + Data Intelligence
 *      ↓
 * Structured NationPath Intelligence
 *
 * Enhancement Pipeline:
 * Existing Draft
 *      ↓
 * Gemini Editorial Enhancement
 *      ↓
 * Before / After
 *      ↓
 * What Changed
 *      ↓
 * Human Apply
 *
 * IMPORTANT:
 * - No Google Search grounding.
 * - No external web research by Gemini.
 * - Only supplied source material is allowed.
 * - No fabricated facts, quotes, experts, statistics or sources.
 * - Human editorial review remains mandatory.
 */

// ============================================================
// QUALITY SCHEMA
// ============================================================

const QualityBreakdownSchema = z.object({
  sourceEvidence: z.number().min(0).max(100),
  factualCompleteness: z.number().min(0).max(100),
  clarity: z.number().min(0).max(100),
  structure: z.number().min(0).max(100),
  context: z.number().min(0).max(100),
  seo: z.number().min(0).max(100),
  readerValue: z.number().min(0).max(100),
  riskLevel: z.number().min(0).max(100),
});

const QualityAssessmentSchema = z.object({
  score: z.number().min(0).max(100),
  breakdown: QualityBreakdownSchema,
  flags: z.array(z.string()).max(20),
  missingInformation: z.array(z.string()).max(20),
  reasoning: z.string().optional(),
});

export type QualityAssessment = z.infer<
  typeof QualityAssessmentSchema
>;

// ============================================================
// MAIN INTELLIGENCE SCHEMA
// ============================================================

const IntelligenceSchema = z.object({
  mainStory: z.string().optional(),
  brief: z.string().optional(),

  keyTakeaways: z.array(z.string()).optional(),

  keyHighlights: z
    .object({
      issue: z.string().optional(),
      location: z.string().optional(),
      authority: z.string().optional(),
      actionTaken: z.string().optional(),
      impact: z.string().optional(),
    })
    .optional(),

  whyItMatters: z
    .object({
      broaderImpact: z.string().optional(),
      objectiveAnalysis: z.string().optional(),
    })
    .optional(),

  whatsNext: z.string().optional(),

  background: z.string().optional(),

  expertOpinion: z
    .array(
      z.object({
        expert: z.string().optional(),
        designation: z.string().optional(),
        quote: z.string(),
        perspective: z.string().optional(),
      })
    )
    .optional(),

  suggestedCategory: z.string().optional(),
  suggestedSubCategory: z.string().optional(),

  timeline: z
    .array(
      z.object({
        year: z.string(),
        title: z.string(),
        description: z.string(),
        status: z.string(),
      })
    )
    .optional(),

  factChecks: z
    .array(
      z.object({
        claim: z.string(),
        verdict: z.enum([
          'VERIFIED',
          'MISLEADING',
          'FALSE',
          'UNCONFIRMED',
        ]),
        explanation: z.string(),
        source: z.string(),
      })
    )
    .optional(),

  faqs: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    )
    .optional(),

  seoTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  urlSlug: z.string().optional(),

  facts: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        context: z.string().optional(),
      })
    )
    .optional(),

  keyNumbers: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
        context: z.string().optional(),
      })
    )
    .optional(),

  people: z
    .array(
      z.object({
        name: z.string(),
        role: z.string().optional(),
        relevance: z.string().optional(),
      })
    )
    .optional(),

  organizations: z
    .array(
      z.object({
        name: z.string(),
        type: z.string().optional(),
        relevance: z.string().optional(),
      })
    )
    .optional(),

  locations: z
    .array(
      z.object({
        name: z.string(),
        type: z.string().optional(),
        relevance: z.string().optional(),
      })
    )
    .optional(),

  dates: z
    .array(
      z.object({
        date: z.string(),
        event: z.string(),
      })
    )
    .optional(),

  monetaryValues: z
    .array(
      z.object({
        value: z.string(),
        currency: z.string().optional(),
        context: z.string().optional(),
      })
    )
    .optional(),

  percentages: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
        context: z.string().optional(),
      })
    )
    .optional(),

  statistics: z
    .array(
      z.object({
        value: z.string(),
        metric: z.string(),
        context: z.string().optional(),
      })
    )
    .optional(),

  claims: z
    .array(
      z.object({
        claim: z.string(),
        evidence: z.string().optional(),
        confidence: z.enum([
          'HIGH',
          'MEDIUM',
          'LOW',
          'UNCONFIRMED',
        ]),
      })
    )
    .optional(),

  sourcesMentioned: z
    .array(
      z.object({
        name: z.string(),
        type: z.string().optional(),
        context: z.string().optional(),
      })
    )
    .optional(),

  qualityAssessment: QualityAssessmentSchema.optional(),
});

export type GeneratedIntelligence = z.infer<
  typeof IntelligenceSchema
>;

// ============================================================
// ENHANCEMENT SCHEMAS
// ============================================================

const EnhancementChangeSchema = z.object({
  module: z.string(),
  changed: z.boolean(),
  summary: z.string(),
  reason: z.string().optional(),
});

const EnhancementResultSchema = z.object({
  enhancedContent: z.record(z.string(), z.unknown()),
  changes: z.array(EnhancementChangeSchema).max(30),
  qualityAssessment: QualityAssessmentSchema,
});

export type EnhancementResult = z.infer<
  typeof EnhancementResultSchema
>;

// ============================================================
// CONFIG
// ============================================================

const DEFAULT_MODULES = [
  'mainStory',
  'brief',
  'keyTakeaways',
  'keyHighlights',
  'whyItMatters',
  'whatsNext',
  'background',
  'expertOpinion',
  'suggestedCategory',
  'timeline',
  'factChecks',
  'faqs',
  'seo',
  'data',
];

const ENHANCEABLE_MODULES = new Set([
  'mainStory',
  'brief',
  'keyTakeaways',
  'keyHighlights',
  'whyItMatters',
  'whatsNext',
  'background',
  'expertOpinion',
  'suggestedCategory',
  'timeline',
  'factChecks',
  'faqs',
  'seo',
  'data',
]);

const GEMINI_MODEL =
  process.env.GEMINI_MODEL || 'gemini-3.6-flash';

const MAX_ATTEMPTS = 2;

// ============================================================
// CATEGORY RULES
// ============================================================

const CATEGORY_RULES: Record<string, string> = {
  Sports: `
You are editing a sports report.
Prioritize match/event statistics, participants, results, venue,
dates, records and measurable performance ONLY when supplied.
Do not invent scores, toss details, schedules or player statistics.
`,

  Politics: `
You are editing a political report.
Prioritize parties, leaders, institutions, policy decisions,
official statements, votes and constitutional context ONLY when supplied.
Do not infer political affiliations or fabricate quotations.
`,

  Business: `
You are editing a business/economy report.
Prioritize revenue, profit, prices, percentages, investments,
market movements, employment figures and other measurable data ONLY
when supplied.
Never invent financial figures or analyst opinions.
`,

  Crime: `
You are editing a crime and law report.
Prioritize incident facts, investigation status, authorities,
locations, legal provisions and court information ONLY when supplied.
Do not invent FIR numbers, legal sections, accused details or court dates.
Use careful factual language around allegations.
`,

  Defense: `
You are editing a defense and security report.
Prioritize military organizations, equipment, operations,
official statements, locations, dates and measurable developments
ONLY when supplied.
Do not invent classified or operational information.
`,

  International: `
You are editing an international affairs report.
Prioritize countries, organizations, diplomatic statements,
locations, dates and concrete developments ONLY when supplied.
Do not invent diplomatic positions.
`,

  Technology: `
You are editing a technology report.
Prioritize product specifications, pricing, release information,
companies, technical capabilities and measurable data ONLY when supplied.
Do not invent specifications or reviews.
`,

  Health: `
You are editing a health report.
Prioritize study details, institutions, sample sizes, findings,
dates and health implications ONLY when supplied.
Do not invent medical advice, studies or expert quotations.
`,

  Science: `
You are editing a science report.
Prioritize research institutions, methodology, findings,
measurements, dates and scientific significance ONLY when supplied.
Do not invent researchers or scientific results.
`,

  Entertainment: `
You are editing an entertainment report.
Prioritize cast, crew, release information, collections,
ratings or reception ONLY when supplied.
Do not invent box-office figures or critic reactions.
`,

  Environment: `
You are editing an environment report.
Prioritize locations, ecological measurements, scientific findings,
dates and environmental consequences ONLY when supplied.
Do not invent pollution statistics or expert quotations.
`,

  Education: `
You are editing an education report.
Prioritize institutions, boards, examinations, policy changes,
dates and measurable student impact ONLY when supplied.
Do not invent notification details.
`,

  Automobile: `
You are editing an automobile report.
Prioritize specifications, price, range, mileage, launch information
and comparisons ONLY when supplied.
Do not invent vehicle specifications.
`,

  National: `
You are editing a national news report.
Prioritize the 5Ws, official institutions, measurable facts,
locations, dates and public impact ONLY when supplied.
`,

  World: `
You are editing a world news report.
Prioritize countries, organizations, diplomatic developments,
locations, dates and measurable consequences ONLY when supplied.
`,

  General: `
You are editing a general news report.
Prioritize the 5Ws, authoritative information, measurable facts,
dates, entities and clear consequences.
`,
};

// ============================================================
// JSON REPAIR
// ============================================================

function repairJson(rawText: string): string {
  let text =
    typeof rawText === 'string'
      ? rawText
      : JSON.stringify(rawText);

  text = text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  const first = text.indexOf('{');
  const last = text.lastIndexOf('}');

  if (
    first !== -1 &&
    last !== -1 &&
    last > first
  ) {
    text = text.substring(first, last + 1);
  }

  return text;
}

// ============================================================
// SAFE HELPERS
// ============================================================

function cleanString(value: unknown): string {
  return typeof value === 'string'
    ? value.trim()
    : '';
}

function cleanArray<T>(
  value: T[] | undefined,
  max: number
): T[] {
  return Array.isArray(value)
    ? value.slice(0, max)
    : [];
}

function sanitizeModules(
  modules: string[],
  fallback = DEFAULT_MODULES
): string[] {
  const valid = Array.from(
    new Set(
      (Array.isArray(modules)
        ? modules
        : []
      ).filter(
        (module) =>
          typeof module === 'string' &&
          ENHANCEABLE_MODULES.has(module)
      )
    )
  );

  return valid.length > 0
    ? valid
    : fallback;
}

// ============================================================
// MODULE PROMPTS
// ============================================================

function getModulePrompts(
  modules: string[],
  isEditorial: boolean,
  category: string
): string {
  const categoryRule =
    CATEGORY_RULES[category] ||
    CATEGORY_RULES.General;

  const requested = new Set(modules);

  const sections: string[] = [
    categoryRule,
    `
ARTICLE MODE:
${
  isEditorial
    ? `
EDITORIAL MODE:
Write analytical editorial content.
Clearly distinguish analysis, interpretation and factual reporting.
Do not invent evidence.
Do not use unsupported persuasive claims.
`
    : `
NEWS MODE:
Use an objective newsroom style.
Lead with the most important verified information.
Use an inverted-pyramid structure.
`
}
`,
  ];

  if (requested.has('mainStory')) {
    sections.push(`
MAIN STORY:
Write a polished NationPath article.
Use 4-6 well-structured paragraphs.
Lead with the strongest supplied fact.
Do not add facts absent from the supplied material.
`);
  }

  if (requested.has('brief')) {
    sections.push(`
BRIEF:
Write a concise 40-60 word factual summary.
`);
  }

  if (requested.has('keyTakeaways')) {
    sections.push(`
KEY TAKEAWAYS:
Provide up to 5 high-value factual takeaways.
Prefer numbers, dates, names and concrete developments when supplied.
`);
  }

  if (requested.has('keyHighlights')) {
    sections.push(`
KEY HIGHLIGHTS:
Extract:
- issue
- location
- authority
- actionTaken
- impact

Only populate fields supported by the source.
`);
  }

  if (requested.has('whyItMatters')) {
    sections.push(`
WHY IT MATTERS:
Explain broader significance using only information reasonably
supported by the supplied material.
Clearly separate interpretation from factual claims.
`);
  }

  if (requested.has('whatsNext')) {
    sections.push(`
WHAT'S NEXT:
Identify explicitly stated upcoming developments.
If none are available, return:
"Specific next steps are currently unspecified."
`);
  }

  if (requested.has('background')) {
    sections.push(`
BACKGROUND:
Use only background/context explicitly present in supplied material.
Never inject unrelated general knowledge.
`);
  }

  if (requested.has('expertOpinion')) {
    sections.push(`
EXPERT OPINION:
DO NOT INVENT EXPERTS.
DO NOT INVENT QUOTES.

If the source contains an actual named expert and quotation,
preserve it accurately.

Otherwise return [].
`);
  }

  if (requested.has('suggestedCategory')) {
    sections.push(`
CATEGORY:
Suggest the most appropriate category and subcategory
based only on supplied material.
`);
  }

  if (requested.has('timeline')) {
    sections.push(`
TIMELINE:
Extract only dates explicitly present in the material.
Never guess dates or years.
`);
  }

  if (requested.has('factChecks')) {
    sections.push(`
FACT CHECKS:
Assess claims only against evidence contained in the supplied
material or clearly identified source information.

Insufficient evidence = UNCONFIRMED.

Never claim external verification.
`);
  }

  if (requested.has('faqs')) {
    sections.push(`
FAQ:
Create 3-7 useful article-specific questions.
Answers must be based only on supplied material.
`);
  }

  if (requested.has('seo')) {
    sections.push(`
SEO:
Create:
- SEO title under approximately 60 characters
- meta description under approximately 160 characters
- 6-8 relevant keywords
- clean lowercase URL slug
`);
  }

  if (requested.has('data')) {
    sections.push(`
DATA INTELLIGENCE:

Extract only supplied:
- facts
- key numbers
- people
- organizations
- locations
- dates
- monetary values
- percentages
- statistics
- claims
- sources mentioned

If absent, return an empty array.

Never manufacture data.
`);
  }

  sections.push(`
GLOBAL DATA SAFETY:
Never manufacture:
- statistics
- prices
- percentages
- dates
- quotes
- expert opinions
- source names
- government statements
- legal sections
- sports scores
- financial figures
`);

  return sections.join('\n');
}

// ============================================================
// DYNAMIC JSON STRUCTURE
// ============================================================

function buildJsonStructure(
  modules: string[],
  isEditorial: boolean,
  category: string
): Record<string, unknown> {
  const structure: Record<string, unknown> = {};

  if (modules.includes('mainStory')) {
    structure.mainStory =
      '<p>NationPath article...</p>';
  }

  if (modules.includes('brief')) {
    structure.brief =
      '40-60 word factual summary';
  }

  if (modules.includes('keyTakeaways')) {
    structure.keyTakeaways = [
      'Verified factual takeaway',
    ];
  }

  if (modules.includes('keyHighlights')) {
    structure.keyHighlights = {
      issue: '',
      location: '',
      authority: '',
      actionTaken: '',
      impact: '',
    };
  }

  if (modules.includes('whyItMatters')) {
    structure.whyItMatters = {
      broaderImpact: '',
      objectiveAnalysis: '',
    };
  }

  if (modules.includes('whatsNext')) {
    structure.whatsNext = '';
  }

  if (modules.includes('background')) {
    structure.background = '';
  }

  if (modules.includes('expertOpinion')) {
    structure.expertOpinion = [];
  }

  if (modules.includes('suggestedCategory')) {
    structure.suggestedCategory =
      isEditorial
        ? 'Editorial'
        : category;

    structure.suggestedSubCategory = '';
  }

  if (modules.includes('timeline')) {
    structure.timeline = [];
  }

  if (modules.includes('factChecks')) {
    structure.factChecks = [];
  }

  if (modules.includes('faqs')) {
    structure.faqs = [];
  }

  if (modules.includes('seo')) {
    structure.seoTitle = '';
    structure.metaDescription = '';
    structure.metaKeywords = '';
    structure.urlSlug = '';
  }

  if (modules.includes('data')) {
    structure.facts = [];
    structure.keyNumbers = [];
    structure.people = [];
    structure.organizations = [];
    structure.locations = [];
    structure.dates = [];
    structure.monetaryValues = [];
    structure.percentages = [];
    structure.statistics = [];
    structure.claims = [];
    structure.sourcesMentioned = [];
  }

  structure.qualityAssessment = {
    score: 0,
    breakdown: {
      sourceEvidence: 0,
      factualCompleteness: 0,
      clarity: 0,
      structure: 0,
      context: 0,
      seo: 0,
      readerValue: 0,
      riskLevel: 0,
    },
    flags: [],
    missingInformation: [],
    reasoning: '',
  };

  return structure;
}

// ============================================================
// ENHANCEMENT JSON STRUCTURE
// ============================================================

function buildEnhancementStructure(
  modules: string[]
): Record<string, unknown> {
  const structure: Record<string, unknown> = {};

  structure.enhancedContent = {};

  for (const module of modules) {
    structure.enhancedContent[module] = null;
  }

  structure.changes = [
    {
      module: modules[0] || 'mainStory',
      changed: true,
      summary:
        'Describe the concrete improvement made.',
      reason:
        'Explain why the change improves the article.',
    },
  ];

  structure.qualityAssessment = {
    score: 0,
    breakdown: {
      sourceEvidence: 0,
      factualCompleteness: 0,
      clarity: 0,
      structure: 0,
      context: 0,
      seo: 0,
      readerValue: 0,
      riskLevel: 0,
    },
    flags: [],
    missingInformation: [],
    reasoning: '',
  };

  return structure;
}

// ============================================================
// GEMINI CLIENT
// ============================================================

function getGeminiClient(): GoogleGenAI {
  const apiKey =
    process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      'GEMINI_API_KEY missing in .env'
    );
  }

  return new GoogleGenAI({
    apiKey,
  });
}

// ============================================================
// CLOUDFLARE CONTEXT
// ============================================================

async function generateCloudflareContext(
  title: string,
  rawNotesOrContent: string,
  category: string
): Promise<string> {
  const accountId =
    process.env.CLOUDFLARE_ACCOUNT_ID;

  const apiToken =
    process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !apiToken) {
    console.warn(
      '⚠️ Cloudflare credentials missing. Gemini will use original RSS content.'
    );

    return rawNotesOrContent;
  }

  const cloudflarePrompt = `
You are the first-stage news processing engine for NationPath India.

Your job is NOT to write the final article.

Extract and organize only information explicitly contained
in the supplied RSS material.

Return a concise structured research brief containing:

- core event
- who
- what
- when
- where
- why
- measurable data
- named people
- organizations
- locations
- dates
- monetary values
- percentages
- claims
- source names
- important context

DO NOT:
- invent information
- add outside knowledge
- create quotes
- create experts
- guess dates
- guess statistics
- perform web research

CATEGORY:
${category}

TITLE:
${title}

RSS CONTENT:
${rawNotesOrContent}
`;

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3.1-8b-instruct`,
      {
        method: 'POST',
        headers: {
          Authorization:
            `Bearer ${apiToken}`,
          'Content-Type':
            'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content:
                'You are a factual news extraction engine. Never invent information.',
            },
            {
              role: 'user',
              content:
                cloudflarePrompt,
            },
          ],
          max_tokens: 3000,
          temperature: 0.1,
        }),
      }
    );

    const result =
      await response.json();

    if (
      !response.ok ||
      !result.success
    ) {
      throw new Error(
        result.errors?.[0]?.message ||
          'Cloudflare processing failed'
      );
    }

    let output = '';

    if (
      typeof result.result === 'string'
    ) {
      output = result.result;
    } else if (
      typeof result.result?.response ===
      'string'
    ) {
      output =
        result.result.response;
    } else if (
      typeof result.result?.choices?.[0]
        ?.message?.content === 'string'
    ) {
      output =
        result.result.choices[0]
          .message.content;
    }

    if (!output.trim()) {
      throw new Error(
        'Cloudflare returned empty output'
      );
    }

    return output.trim();
  } catch (error) {
    console.error(
      '⚠️ Cloudflare first-stage processing failed:',
      error
    );

    return rawNotesOrContent;
  }
}

// ============================================================
// GEMINI GENERATION
// ============================================================

async function generateWithGemini(
  title: string,
  sourceContext: string,
  originalContent: string,
  modules: string[],
  isEditorial: boolean,
  category: string
): Promise<GeneratedIntelligence> {
  const ai =
    getGeminiClient();

  const moduleInstructions =
    getModulePrompts(
      modules,
      isEditorial,
      category
    );

  const jsonStructure =
    buildJsonStructure(
      modules,
      isEditorial,
      category
    );

  const prompt = `
You are the Senior Editor and Data Intelligence Editor
at NationPath India.

Your responsibility is to transform supplied source material
into publication-ready journalism and structured editorial data.

IMPORTANT:
The source material may contain incomplete information.

Prefer:
accuracy > completeness
truth > creativity
specific evidence > generic filler

============================================================
ABSOLUTE FACTUAL RULES
============================================================

1. Use ONLY information contained in:
   A. Original RSS Content
   B. Cloudflare Processing Context

2. DO NOT use internal world knowledge to fill missing facts.

3. DO NOT browse the web.

4. DO NOT use Google Search.

5. DO NOT invent:
   - names
   - dates
   - numbers
   - statistics
   - prices
   - percentages
   - quotes
   - experts
   - government statements
   - legal sections
   - sports scores
   - financial figures
   - source names

6. If information is missing:
   use an empty string or empty array.

7. NEVER create fake expert quotations.

8. If no real expert quotation exists:
   expertOpinion MUST be [].

9. Preserve allegations as allegations.

10. Do not turn uncertain information into certainty.

============================================================
EDITORIAL STANDARD
============================================================

The final writing should feel like serious professional
Indian digital newsroom journalism.

Style:
- precise
- intelligent
- readable
- data-oriented
- authoritative
- concise
- natural

Avoid:
- AI filler
- exaggerated adjectives
- repetitive conclusions
- clickbait
- fake certainty
- generic statements
- unnecessary moralizing
- invented context

============================================================
REQUESTED MODULES
============================================================

Only generate the modules explicitly listed below.

REQUESTED:
${modules.join(', ')}

Do NOT generate omitted content modules.

============================================================
MODULE RULES
============================================================

${moduleInstructions}

============================================================
AI QUALITY ASSESSMENT
============================================================

Also assess the generated result.

Score from 0 to 100.

Evaluate:

1. sourceEvidence
How strongly the output is supported by supplied evidence.

2. factualCompleteness
How completely the available supplied facts are represented.

3. clarity
How clear and readable the generated content is.

4. structure
How logically the content is organized.

5. context
How useful the supported context and explanation are.

6. seo
Quality of supplied SEO fields, if SEO was requested.

7. readerValue
How useful the output is to a reader based on available evidence.

8. riskLevel
Higher number means higher editorial risk.

Flag:
- unsupported claims
- missing source evidence
- ambiguous facts
- allegations
- missing dates
- missing attribution
- incomplete context
- uncertain numbers

IMPORTANT:
riskLevel is NOT a quality score.
It represents editorial risk.

The overall score should reflect the actual quality
of the supplied evidence and generated material.

Do NOT award points merely because a date, location,
authority or other field exists.

If evidence is weak, the score must reflect that.

============================================================
OUTPUT FORMAT
============================================================

Return ONLY valid JSON.

No markdown.
No code fences.
No explanation outside JSON.

The JSON must follow this structure:

${JSON.stringify(
  jsonStructure,
  null,
  2
)}

============================================================
ARTICLE INFORMATION
============================================================

TITLE:
${title}

============================================================
ORIGINAL RSS CONTENT
============================================================

${originalContent}

============================================================
CLOUDFARE PROCESSING CONTEXT
============================================================

${sourceContext}

============================================================
FINAL INSTRUCTION
============================================================

Produce publication-ready NationPath intelligence
only for the requested modules.

Strengthen the material through:

- better structure
- clearer hierarchy
- stronger lead
- precise language
- useful supported context
- meaningful takeaways
- structured entities
- SEO optimization

But NEVER improve the story by inventing facts.

Human editorial review remains mandatory.
`;

  const response =
    await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        temperature: 0.25,
        responseMimeType:
          'application/json',
      },
    });

  const rawText =
    typeof response.text === 'string'
      ? response.text
      : '';

  if (!rawText.trim()) {
    throw new Error(
      'Gemini returned an empty response.'
    );
  }

  const repaired =
    repairJson(rawText);

  let parsed: unknown;

  try {
    parsed =
      JSON.parse(repaired);
  } catch (error) {
    console.error(
      '❌ Gemini JSON parse failed:',
      repaired.substring(0, 1000)
    );

    throw new Error(
      `Gemini returned invalid JSON: ${
        error instanceof Error
          ? error.message
          : 'Unknown JSON error'
      }`
    );
  }

  return IntelligenceSchema
    .partial()
    .parse(parsed);
}

// ============================================================
// GEMINI ENHANCEMENT
// ============================================================

async function enhanceWithGemini(
  title: string,
  category: string,
  originalSource: string,
  currentArticle: Record<string, unknown>,
  modules: string[],
  isEditorial: boolean
): Promise<EnhancementResult> {
  const ai =
    getGeminiClient();

  const categoryRule =
    CATEGORY_RULES[category] ||
    CATEGORY_RULES.General;

  const enhancementStructure =
    buildEnhancementStructure(
      modules
    );

  const prompt = `
You are the Senior Editorial Enhancement Editor
at NationPath India.

You are improving an EXISTING draft.

This is an enhancement task, NOT a new reporting task.

============================================================
ABSOLUTE SOURCE RULE
============================================================

You may use ONLY:

1. ORIGINAL SOURCE MATERIAL
2. CURRENT ARTICLE DRAFT

Do NOT use:
- web search
- Google Search
- outside knowledge
- external research
- assumed facts
- invented context

============================================================
ENHANCEMENT OBJECTIVE
============================================================

Improve the selected article modules for:

- factual clarity
- sentence quality
- structure
- readability
- newsroom tone
- hierarchy
- precision
- supported context
- reader value
- SEO quality where selected

DO NOT change factual meaning.

DO NOT introduce new facts.

DO NOT create facts simply to make the article stronger.

If the current draft contains unsupported information,
do not reinforce it as fact.

Where necessary, make uncertainty explicit.

============================================================
CATEGORY
============================================================

${category}

${categoryRule}

============================================================
ARTICLE MODE
============================================================

${
  isEditorial
    ? `
EDITORIAL:
Maintain analytical/editorial distinction.
Do not turn interpretation into factual reporting.
Do not introduce unsupported persuasive claims.
`
    : `
NEWS:
Maintain objective newsroom language.
Do not introduce opinion into factual reporting.
`
}

============================================================
SELECTED MODULES
============================================================

${modules.join(', ')}

Enhance ONLY these modules.

Do not modify or return unrelated content modules.

============================================================
MODULE-SPECIFIC RULES
============================================================

MAIN STORY:
Improve lead, structure, transitions and clarity.
Do not add facts.

BRIEF:
Make the summary concise and factually precise.

KEY TAKEAWAYS:
Remove repetition and prioritize the strongest supplied facts.

KEY HIGHLIGHTS:
Improve precision of issue, location, authority, action and impact.
Use empty values where evidence is unavailable.

WHY IT MATTERS:
Improve supported explanation.
Clearly distinguish analysis from fact.

WHAT'S NEXT:
Only retain explicitly supported future developments.

BACKGROUND:
Improve context already present in the supplied material.
Do not add outside history.

EXPERT OPINION:
Never create experts.
Never create quotations.
Never convert ordinary statements into expert quotations.

CATEGORY:
Improve categorization only when supported by the material.

TIMELINE:
Use only supplied dates and events.
Never guess dates.

FACT CHECK:
Never claim external verification.
Insufficient evidence must remain UNCONFIRMED.

FAQ:
Improve useful article-specific questions and answers.
Answers must remain source-supported.

SEO:
Improve title, description, keywords and slug
without changing factual meaning.

DATA:
Improve extraction and organization of supplied facts only.
Never manufacture numbers or entities.

============================================================
WHAT CHANGED
============================================================

For every selected module:

- return changed=true only when a meaningful improvement was made
- return changed=false when no safe improvement is necessary
- provide a concise summary
- explain the editorial reason

Do NOT claim a change that was not made.

============================================================
QUALITY ASSESSMENT
============================================================

Recalculate quality after enhancement.

Evaluate:

sourceEvidence
factualCompleteness
clarity
structure
context
seo
readerValue
riskLevel

RiskLevel:
- higher = greater editorial risk
- lower = lower editorial risk

Do not inflate the score merely because wording improved.

============================================================
OUTPUT
============================================================

Return ONLY valid JSON.

No markdown.
No code fences.
No explanation outside JSON.

Use exactly this structure:

${JSON.stringify(
  enhancementStructure,
  null,
  2
)}

============================================================
TITLE
============================================================

${title}

============================================================
ORIGINAL SOURCE MATERIAL
============================================================

${originalSource}

============================================================
CURRENT ARTICLE DRAFT
============================================================

${JSON.stringify(
  currentArticle,
  null,
  2
)}

============================================================
FINAL RULE
============================================================

Make the smallest safe editorial improvements that materially
improve the selected modules.

Preserve all supported facts.

Never invent information.

Human editorial review remains mandatory.
`;

  const response =
    await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        temperature: 0.2,
        responseMimeType:
          'application/json',
      },
    });

  const rawText =
    typeof response.text === 'string'
      ? response.text
      : '';

  if (!rawText.trim()) {
    throw new Error(
      'Gemini enhancement returned an empty response.'
    );
  }

  const repaired =
    repairJson(rawText);

  let parsed: unknown;

  try {
    parsed =
      JSON.parse(repaired);
  } catch (error) {
    console.error(
      '❌ Gemini enhancement JSON parse failed:',
      repaired.substring(0, 1500)
    );

    throw new Error(
      `Gemini enhancement returned invalid JSON: ${
        error instanceof Error
          ? error.message
          : 'Unknown JSON error'
      }`
    );
  }

  const validated =
    EnhancementResultSchema.parse(
      parsed
    );

  return validated;
}

// ============================================================
// NORMALIZATION
// ============================================================

function normalizeIntelligence(
  data: GeneratedIntelligence
): GeneratedIntelligence {
  const normalizedQuality =
    data.qualityAssessment
      ? QualityAssessmentSchema.parse(
          data.qualityAssessment
        )
      : undefined;

  return {
    ...data,

    mainStory:
      cleanString(
        data.mainStory
      ) || undefined,

    brief:
      cleanString(
        data.brief
      ) || undefined,

    keyTakeaways:
      cleanArray(
        data.keyTakeaways,
        5
      ),

    expertOpinion:
      cleanArray(
        data.expertOpinion,
        3
      )
        .filter(
          (item) =>
            cleanString(
              item.quote
            )
        )
        .map((item) => ({
          expert:
            cleanString(
              item.expert
            ) || undefined,

          designation:
            cleanString(
              item.designation
            ) || undefined,

          quote:
            cleanString(
              item.quote
            ),

          perspective:
            cleanString(
              item.perspective
            ) || undefined,
        })),

    timeline:
      cleanArray(
        data.timeline,
        20
      ).map((item) => ({
        year:
          cleanString(
            item.year
          ) || 'Date TBA',

        title:
          cleanString(
            item.title
          ),

        description:
          cleanString(
            item.description
          ),

        status:
          cleanString(
            item.status
          ) || 'Unspecified',
      })),

    factChecks:
      cleanArray(
        data.factChecks,
        20
      ).map((item) => ({
        claim:
          cleanString(
            item.claim
          ),

        verdict:
          item.verdict ||
          'UNCONFIRMED',

        explanation:
          cleanString(
            item.explanation
          ),

        source:
          cleanString(
            item.source
          ) ||
          'Source not specified in supplied material',
      })),

    faqs:
      cleanArray(
        data.faqs,
        7
      ).map((faq) => ({
        question:
          cleanString(
            faq.question
          ),

        answer:
          cleanString(
            faq.answer
          ),
      })),

    facts:
      cleanArray(
        data.facts,
        30
      ),

    keyNumbers:
      cleanArray(
        data.keyNumbers,
        30
      ),

    people:
      cleanArray(
        data.people,
        30
      ),

    organizations:
      cleanArray(
        data.organizations,
        30
      ),

    locations:
      cleanArray(
        data.locations,
        30
      ),

    dates:
      cleanArray(
        data.dates,
        30
      ),

    monetaryValues:
      cleanArray(
        data.monetaryValues,
        30
      ),

    percentages:
      cleanArray(
        data.percentages,
        30
      ),

    statistics:
      cleanArray(
        data.statistics,
        30
      ),

    claims:
      cleanArray(
        data.claims,
        30
      ),

    sourcesMentioned:
      cleanArray(
        data.sourcesMentioned,
        30
      ),

    seoTitle:
      cleanString(
        data.seoTitle
      ) || undefined,

    metaDescription:
      cleanString(
        data.metaDescription
      ) || undefined,

    metaKeywords:
      cleanString(
        data.metaKeywords
      ) || undefined,

    urlSlug:
      cleanString(
        data.urlSlug
      ) || undefined,

    qualityAssessment:
      normalizedQuality,
  };
}

// ============================================================
// PUBLIC API — GENERATION
// ============================================================

export async function generateNewsIntelligence(
  title: string,
  rawNotesOrContent: string,
  modulesToGenerate: string[] =
    DEFAULT_MODULES,
  isEditorial: boolean = false,
  category: string = 'General'
): Promise<GeneratedIntelligence> {
  if (!title?.trim()) {
    throw new Error(
      'Article title is required.'
    );
  }

  if (!rawNotesOrContent?.trim()) {
    throw new Error(
      'Raw article content is required.'
    );
  }

  if (!process.env.GEMINI_API_KEY) {
    throw new Error(
      'GEMINI_API_KEY missing in .env'
    );
  }

  const finalModules =
    sanitizeModules(
      modulesToGenerate
    );

  const cloudflareContext =
    await generateCloudflareContext(
      title,
      rawNotesOrContent,
      category
    );

  let lastError:
    | Error
    | null = null;

  for (
    let attempt = 1;
    attempt <= MAX_ATTEMPTS;
    attempt++
  ) {
    try {
      console.log(
        `🤖 Gemini generation attempt ${attempt}/${MAX_ATTEMPTS}`
      );

      const generated =
        await generateWithGemini(
          title,
          cloudflareContext,
          rawNotesOrContent,
          finalModules,
          isEditorial,
          category
        );

      const normalized =
        normalizeIntelligence(
          generated
        );

      console.log(
        '✅ NationPath Gemini intelligence generated successfully.'
      );

      return normalized;
    } catch (error) {
      lastError =
        error instanceof Error
          ? error
          : new Error(
              'Unknown Gemini generation error'
            );

      console.error(
        `❌ Gemini attempt ${attempt} failed:`,
        lastError.message
      );

      if (
        attempt < MAX_ATTEMPTS &&
        lastError.message
          .toLowerCase()
          .includes('json')
      ) {
        console.log(
          '🔄 Retrying Gemini because JSON validation failed...'
        );

        continue;
      }

      break;
    }
  }

  throw (
    lastError ||
    new Error(
      'Failed to generate NationPath intelligence.'
    )
  );
}

// ============================================================
// PUBLIC API — ENHANCEMENT
// ============================================================

export async function enhanceNewsIntelligence(
  title: string,
  originalSource: string,
  currentArticle: Record<string, unknown>,
  modulesToEnhance: string[],
  isEditorial: boolean = false,
  category: string = 'General'
): Promise<EnhancementResult> {
  if (!title?.trim()) {
    throw new Error(
      'Article title is required for enhancement.'
    );
  }

  if (!originalSource?.trim()) {
    throw new Error(
      'Original source material is required for enhancement.'
    );
  }

  if (
    !currentArticle ||
    typeof currentArticle !== 'object'
  ) {
    throw new Error(
      'Current article content is required for enhancement.'
    );
  }

  if (!process.env.GEMINI_API_KEY) {
    throw new Error(
      'GEMINI_API_KEY missing in .env'
    );
  }

  const modules =
    sanitizeModules(
      modulesToEnhance,
      ['mainStory']
    );

  let lastError:
    | Error
    | null = null;

  for (
    let attempt = 1;
    attempt <= MAX_ATTEMPTS;
    attempt++
  ) {
    try {
      console.log(
        `✨ Gemini enhancement attempt ${attempt}/${MAX_ATTEMPTS}`
      );

      const result =
        await enhanceWithGemini(
          title,
          category,
          originalSource,
          currentArticle,
          modules,
          isEditorial
        );

      const quality =
        QualityAssessmentSchema.parse(
          result.qualityAssessment
        );

      const safeChanges =
        result.changes
          .slice(0, 30)
          .map((change) => ({
            module:
              cleanString(
                change.module
              ),

            changed:
              change.changed === true,

            summary:
              cleanString(
                change.summary
              ) ||
              'No change summary provided.',

            reason:
              cleanString(
                change.reason
              ) || undefined,
          }));

      const safeEnhancedContent =
        result.enhancedContent &&
        typeof result.enhancedContent ===
          'object'
          ? result.enhancedContent
          : {};

      console.log(
        `✅ NationPath AI enhancement generated successfully. ` +
          `Quality: ${quality.score}/100`
      );

      return {
        enhancedContent:
          safeEnhancedContent,

        changes:
          safeChanges,

        qualityAssessment:
          quality,
      };
    } catch (error) {
      lastError =
        error instanceof Error
          ? error
          : new Error(
              'Unknown Gemini enhancement error'
            );

      console.error(
        `❌ Gemini enhancement attempt ${attempt} failed:`,
        lastError.message
      );

      if (
        attempt < MAX_ATTEMPTS &&
        lastError.message
          .toLowerCase()
          .includes('json')
      ) {
        console.log(
          '🔄 Retrying Gemini enhancement because JSON validation failed...'
        );

        continue;
      }

      break;
    }
  }

  throw (
    lastError ||
    new Error(
      'Failed to enhance NationPath article.'
    )
  );
}