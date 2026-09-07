import { z } from 'zod';

const IntelligenceSchema = z.object({
  mainStory: z.string(),
  seoTitle: z.string(),
  metaDescription: z.string(),
  metaKeywords: z.string(),
  urlSlug: z.string(),
  brief: z.string(),
  keyTakeaways: z.array(z.string()),
  
  timeline: z.array(z.object({
    year: z.coerce.string(),
    title: z.string(),
    description: z.string(),
    status: z.string()
  })),
  
  factChecks: z.array(z.object({
    claim: z.string(),
    verdict: z.enum(['VERIFIED', 'MISLEADING', 'FALSE', 'UNCONFIRMED']),
    explanation: z.string(),
    source: z.string()
  })),
  
  keyHighlights: z.object({
    issue: z.string(),
    location: z.string(),
    authority: z.string(),
    actionTaken: z.string(),
    impact: z.string()
  }),
  
  whyItMatters: z.object({
    broaderImpact: z.string(),
    objectiveAnalysis: z.string()
  }),
  
  whatsNext: z.string(),
  
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string()
  }))
});

export type GeneratedIntelligence = z.infer<typeof IntelligenceSchema>;

export async function generateNewsIntelligence(
  title: string,
  rawNotesOrContent: string
): Promise<GeneratedIntelligence> {
  
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !apiToken) {
    throw new Error("Cloudflare credentials missing in .env");
  }

  // ULTIMATE NATIONPATH PROMPT - STRICT JSON FORMATTING
  const prompt = `You are the Chief Editor at NationPath India, a premium investigative news platform. Your writing style is authoritative, data-driven, and analytical—similar to Economic Times, Mint, and Bloomberg Quint.

YOUR TASK: Transform the raw notes into a comprehensive, research-enhanced news article with original context and analysis.

CRITICAL JSON FORMATTING RULES (MUST FOLLOW):
1. Output ONLY valid JSON. No markdown, no text before or after.
2. EVERY string value MUST be wrapped in DOUBLE QUOTES (").
3. If a string contains HTML tags like <p>, you MUST wrap the entire string in quotes: "mainStory": "<p>First paragraph</p><p>Second paragraph</p>"
4. If a string contains internal double quotes, escape them with backslash: "He said \\"hello\\""
5. Do NOT use single quotes for JSON strings. Only double quotes.
6. All keys must be in double quotes.
7. No trailing commas after the last item in arrays or objects.

NATIONPATH SIGNATURE REQUIREMENTS:

1. **MAIN STORY (400-500 words)**:
   - DO NOT just rephrase. ADD SIGNIFICANT VALUE through:
     * Historical context: "This is the Xth time in Y years..."
     * Comparative analysis: "Compared to last year/previous instance..."
     * Expert perspectives: "Economists/analysts say..." (generic expert view)
     * Data points: Statistics, percentages, trends
     * Economic/social implications: "This will impact..."
     * Background context: Why this matters now
   - Use professional journalistic language
   - Write in third person, objective tone
   - Use <p> tags for paragraphs (MUST be inside quotes)
   - Structure: Lead paragraph (5Ws) → Background → Current development → Expert view → Implications → Future outlook

2. **FAQs (5 SPECIFIC, PRACTICAL questions)**:
   - Ask questions that readers ACTUALLY care about:
     ✓ "How will this affect my loans/EMI/taxes?"
     ✓ "What should I do differently now?"
     ✓ "Is my money/data/job safe?"
     ✓ "When will I see the impact?"
     ✓ "Who is eligible/affected?"
   - DO NOT ask generic definitional questions like "What is X?"
   - Provide detailed, actionable answers (2-3 sentences each)

3. **TIMELINE**:
   - Extract EVERY year/date mentioned
   - Add historical context events even if not explicitly mentioned (e.g., "2016: UPI launched" for UPI news)
   - Format years as strings: "2016", "2024", "August 2024"
   - NEVER leave year empty

4. **FACT CHECKS**:
   - Identify EVERY false claim/misconception
   - Verdict MUST be: 
     * "FALSE" - if claim is completely wrong
     * "MISLEADING" - if partially true but misleading
     * "VERIFIED" - if claim is accurate
   - Provide specific official source: "RBI Official Statement", "Government Press Release", "NPCI Data"
   - Explanation should clarify with facts

5. **LANGUAGE STYLE**:
   - Authoritative, professional, data-driven
   - Use phrases like: "According to...", "Data shows...", "Experts note...", "The move comes amid...", "This represents a X% change..."
   - Avoid casual language
   - Be precise with numbers and dates

REQUIRED JSON STRUCTURE (Fill this exactly):
{
  "mainStory": "<p>Lead paragraph with 5Ws.</p><p>Background and context.</p><p>Current development with data.</p><p>Expert perspectives.</p><p>Implications and future outlook.</p>",
  "seoTitle": "Catchy, professional headline under 60 chars",
  "metaDescription": "Compelling summary under 160 chars with key data point",
  "metaKeywords": "primary, secondary, tertiary keywords",
  "urlSlug": "professional-url-slug",
  "brief": "Sharp 30-second summary (Max 80 words) with key data",
  "keyTakeaways": ["Specific takeaway with number/data", "Another specific point", "Third key point"],
  "timeline": [
    { "year": "2016", "title": "Event name", "description": "What happened and why it matters", "status": "Completed" }
  ],
  "factChecks": [
    { "claim": "The false claim text", "verdict": "FALSE", "explanation": "The factual correction with context", "source": "Official authority name" }
  ],
  "keyHighlights": {
    "issue": "Core issue with data/context",
    "location": "Geographic scope",
    "authority": "Regulatory/governing body",
    "actionTaken": "Specific action with details",
    "impact": "Quantified or specific impact"
  },
  "whyItMatters": {
    "broaderImpact": "Wider economic/social/industry implications",
    "objectiveAnalysis": "Balanced professional analysis with context"
  },
  "whatsNext": "Specific upcoming developments, timelines, what to watch for",
  "faqs": [
    { "question": "How will this affect common users?", "answer": "Detailed, practical answer with actionable info" },
    { "question": "What should I do about this?", "answer": "Specific guidance and steps" },
    { "question": "Is this safe/secure?", "answer": "Factual answer with context" },
    { "question": "When will the impact be visible?", "answer": "Timeline and details" },
    { "question": "Who is eligible/affected?", "answer": "Clear explanation of scope" }
  ]
}

Article Title: ${title}
Raw Notes: ${rawNotesOrContent}

REMEMBER: You are writing for NationPath India. Add RESEARCH, CONTEXT, and ANALYSIS beyond the raw input. Be authoritative, data-driven, and professional. Output ONLY valid JSON with proper quoting.`;

  // Retry logic for JSON parsing
  let attempts = 0;
  const maxAttempts = 2;
  let lastError: Error | null = null;

  while (attempts < maxAttempts) {
    attempts++;
    
    try {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3.1-8b-instruct`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [
              { 
                role: 'system', 
                content: 'You are Chief Editor at NationPath India. Output ONLY valid JSON with proper double quotes around all strings. No markdown, no text outside JSON.' 
              },
              { role: 'user', content: prompt }
            ],
            max_tokens: 4096, 
            temperature: 0.3,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        console.error("Cloudflare API Error:", result);
        throw new Error(`Cloudflare AI Error: ${result.errors?.[0]?.message || 'Unknown error'}`);
      }

      const rawResponse = result.result?.response || result.result || result.response;
      let rawText = typeof rawResponse === 'string' ? rawResponse : JSON.stringify(rawResponse);

      // Advanced JSON extraction
      // 1. Remove markdown code blocks
      rawText = rawText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
      
      // 2. Find first { and last }
      const firstBracket = rawText.indexOf('{');
      const lastBracket = rawText.lastIndexOf('}');
      
      if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
        rawText = rawText.substring(firstBracket, lastBracket + 1);
      }

      // 3. Try to parse
      const parsedData = IntelligenceSchema.parse(JSON.parse(rawText));
      
      // 4. Post-processing with fallbacks
      return {
        ...parsedData,
        factChecks: parsedData.factChecks.map(fc => ({ 
          ...fc, 
          verdict: fc.verdict || 'UNCONFIRMED',
          source: fc.source?.trim() || 'Official government records',
          explanation: fc.explanation || 'This claim lacks official verification'
        })),
        timeline: parsedData.timeline.map(tl => ({ 
          ...tl, 
          year: String(tl.year).trim() || 'Date not specified',
          status: tl.status || 'Completed'
        })),
        faqs: parsedData.faqs.slice(0, 5)
      };

    } catch (error: any) {
      lastError = error;
      console.error(`❌ AI Generation Attempt ${attempts} Failed:`, error.message);
      
      // If it's a JSON parse error, retry with stricter instructions
      if (error.message.includes('malformed JSON') || error.message.includes('JSON Parse Failed')) {
        if (attempts < maxAttempts) {
          console.log(' Retrying with stricter JSON instructions...');
          continue;
        }
      }
      
      // For other errors, throw immediately
      throw new Error(error.message || 'Failed to generate news intelligence.');
    }
  }

  // If all attempts failed
  throw lastError || new Error('Failed to generate news intelligence after multiple attempts.');
}