/////////////////////////////////////////////////////////////
// NATIONPATH ASTRO HOROSCOPE ENGINE
//
// Prediction Prioritization Intelligence Layer
// Production Ranking Engine v9
//
// Responsibility:
//
// Calculated Astro Snapshot
//        ↓
// Prediction Intelligence
//        ↓
// Confidence
//        ↓
// Influence
//        ↓
// Life Area Importance
//        ↓
// FINAL PRIORITY RANKING
//
// NO calculations.
// NO ephemeris.
// NO planetary mathematics.
// NO zodiac scoring.
// NO randomization.
//////////////////////////////////////////////////////////////

import type {
PredictionRanking,
PredictionCategory,
PredictionInsight,
} from "./types";

import type {
PredictionContext,
} from "./context";

//////////////////////////////////////////////////////////////
// SAFE HELPERS
//////////////////////////////////////////////////////////////

function safeArray<T>(
value: T[] | undefined | null
): T[] {

return Array.isArray(value)
? value
: [];

}

function clamp(
value: number
): number {

if (!Number.isFinite(value)) {
return 0;
}

return Math.max(
0,
Math.min(
100,
Math.round(value)
)
);

}

function normalizeText(
value: string | undefined | null
): string {

return (value ?? "")
.toLowerCase()
.replace(/[^a-z0-9]/g, "");

}

function cleanName(
value: string | undefined | null
): string {

return (
value ?? "Influence"
)
.replace(/\s+influence$/i, "")
.trim();

}

//////////////////////////////////////////////////////////////
// CATEGORY IMPORTANCE
//////////////////////////////////////////////////////////////
//
// Importance affects ranking only.
// It does NOT change the underlying astro prediction.
//
// This allows the same calculated prediction to be
// presented differently depending on life-area relevance.
//////////////////////////////////////////////////////////////

function getCategoryImportance(
category: PredictionCategory
): number {

const weights:
Partial<Record<PredictionCategory, number>>
= {


career: 1.30,
finance: 1.25,
relationship: 1.20,
health: 1.20,
education: 1.15,
communication: 1.10,
spirituality: 1.10,
ambition: 1.10,
personality: 1.05,
mind: 1.05,

family: 1.00,
travel: 1.00,
energy: 1.00,
responsibility: 1.00,
comfort: 1.00,
research: 1.05,

overall: 0.95,


};

return weights[category] ?? 1;

}

//////////////////////////////////////////////////////////////
// CONFIDENCE
//////////////////////////////////////////////////////////////

function resolveConfidence(
value: number | undefined
): number {

return clamp(
value ?? 70
);

}

//////////////////////////////////////////////////////////////
// INFLUENCE
//////////////////////////////////////////////////////////////

function resolveInfluence(
influence: number | undefined,
fallback: number
): number {

return clamp(
influence ?? fallback
);

}

//////////////////////////////////////////////////////////////
// STABILITY
//////////////////////////////////////////////////////////////
//
// Stability is a presentation/ranking factor.
// It does not modify astrology.
//////////////////////////////////////////////////////////////

function calculateStability(
score: number
): number {

if (score >= 80) {
return 100;
}

if (score >= 60) {
return 80;
}

if (score >= 40) {
return 60;
}

return 40;

}

//////////////////////////////////////////////////////////////
// RANKING SCORE
//////////////////////////////////////////////////////////////
//
// Components:
//
// Base influence      45%
// Confidence          20%
// Calculated impact   15%
// Category relevance 15%
// Stability            5%
//////////////////////////////////////////////////////////////

function calculateRankingScore(
base: number,
confidence: number,
influence: number,
importance: number,
stability: number
): number {

const score =


(base * 0.45)

+

(confidence * 0.20)

+

(influence * 0.15)

+

((importance * 100) * 0.15)

+

(stability * 0.05);


return clamp(score);

}

//////////////////////////////////////////////////////////////
// REASON GENERATORS
//////////////////////////////////////////////////////////////

function generatePlanetReason(
planet: string,
score: number
): string {

const name =
cleanName(planet);

if (score >= 80) {


return (
  `${name} shows a dominant planetary influence with strong predictive impact and high priority in the current analysis.`
);


}

if (score >= 60) {


return (
  `${name} shows a meaningful influence with moderate predictive strength and relevance in the current analysis.`
);


}

return (
`${name} shows a developing influence where awareness, consistency and balanced decisions remain important.`
);

}

function generateLifeReason(
area: string,
score: number
): string {

const name =
cleanName(area);

if (score >= 80) {


return (
  `${name} emerges as a highly active life area supported by strong predictive influence and relevant confidence indicators.`
);


}

if (score >= 60) {


return (
  `${name} shows meaningful development through planetary influence, confidence and practical relevance.`
);


}

return (
`${name} shows gradual development through consistent effort, awareness and practical improvement.`
);

}

function generateInsightReason(
title: string
): string {

return (
`${title} is prioritized through predictive relevance, influence strength and confidence.`
);

}

//////////////////////////////////////////////////////////////
// DUPLICATE IDENTITY
//////////////////////////////////////////////////////////////

function createIdentity(
item: PredictionRanking
): string {

return normalizeText(
`${item.category}-${item.title}`
);

}

function removeDuplicateRankings(
rankings: PredictionRanking[]
): PredictionRanking[] {

const map =
new Map<string, PredictionRanking>();

for (const item of rankings) {


const key =
  createIdentity(item);

const existing =
  map.get(key);

if (
  !existing ||
  item.score > existing.score
) {

  map.set(
    key,
    item
  );

}


}

return Array.from(
map.values()
);

}

//////////////////////////////////////////////////////////////
// PLANET RANKING
//////////////////////////////////////////////////////////////

function rankPlanetPredictions(
context: PredictionContext
): PredictionRanking[] {

return safeArray(
context?.planetaryPredictions
)
.map(
prediction => {


    const base =
      clamp(
        prediction.strengthScore
      );

    const confidence =
      resolveConfidence(
        prediction.confidence
      );

    const influence =
      resolveInfluence(
        prediction.influenceScore,
        base
      );

    const stability =
      calculateStability(
        base
      );

    const score =
      calculateRankingScore(
        base,
        confidence,
        influence,
        1,
        stability
      );

    return {

      title:
        `${prediction.planet} influence`,

      category:
        "overall",

      score,

      confidence,

      reason:
        generatePlanetReason(
          prediction.planet,
          score
        ),

    };

  }
);


}

//////////////////////////////////////////////////////////////
// LIFE AREA RANKING
//////////////////////////////////////////////////////////////

function rankLifePredictions(
context: PredictionContext
): PredictionRanking[] {

return safeArray(
context?.lifePredictions
)
.map(
prediction => {


    const base =
      clamp(
        prediction.score
      );

    const confidence =
      resolveConfidence(
        prediction.confidence
      );

    const influence =
      resolveInfluence(
        prediction.score,
        base
      );

    const importance =
      getCategoryImportance(
        prediction.area
      );

    const stability =
      calculateStability(
        base
      );

    const score =
      calculateRankingScore(
        base,
        confidence,
        influence,
        importance,
        stability
      );

    return {

      title:
        `${prediction.area} influence`,

      category:
        prediction.area,

      score,

      confidence,

      reason:
        generateLifeReason(
          prediction.area,
          score
        ),

    };

  }
);


}

//////////////////////////////////////////////////////////////
// INSIGHT RANKING
//////////////////////////////////////////////////////////////

function rankInsights(
insights:
PredictionInsight[] | undefined | null
): PredictionRanking[] {

return safeArray(
insights
)
.map(
insight => {


    const base =
      clamp(
        insight.priority
      );

    const confidence =
      resolveConfidence(
        insight.confidence
      );

    const influence =
      resolveInfluence(
        insight.priority,
        base
      );

    const stability =
      calculateStability(
        base
      );

    const score =
      calculateRankingScore(
        base,
        confidence,
        influence,
        1,
        stability
      );

    return {

      title:
        insight.title,

      category:
        "overall",

      score,

      confidence,

      reason:
        generateInsightReason(
          insight.title
        ),

    };

  }
);


}

//////////////////////////////////////////////////////////////
// CATEGORY BALANCE
//////////////////////////////////////////////////////////////
//
// Prevents one life area from dominating the entire
// premium ranking output.
//
// Maximum:
//
// overall    → 3
// other area → 1
//////////////////////////////////////////////////////////////

function balanceCategories(
rankings: PredictionRanking[]
): PredictionRanking[] {

const counter:
Record<string, number>
= {};

return rankings.filter(
item => {


  const category =
    item.category;

  counter[category] =
    (counter[category] ?? 0) + 1;

  if (
    category === "overall" &&
    counter[category] > 3
  ) {

    return false;

  }

  if (
    category !== "overall" &&
    counter[category] > 1
  ) {

    return false;

  }

  return true;

}


);

}

//////////////////////////////////////////////////////////////
// RANKING SPREAD
//////////////////////////////////////////////////////////////
//
// Prevents artificial clustering at the top.
//
// This is presentation normalization only.
// It never changes source prediction data.
//////////////////////////////////////////////////////////////

function normalizeRankingSpread(
rankings: PredictionRanking[]
): PredictionRanking[] {

if (
rankings.length === 0
) {


return [];


}

const maxScore =
rankings[0].score;

return rankings.map(
(item, index) => {


  let score =
    item.score;

  if (index === 0) {

    score =
      Math.min(
        95,
        maxScore
      );

  }

  else if (index === 1) {

    score =
      Math.min(
        90,
        maxScore - 3
      );

  }

  else if (index === 2) {

    score =
      Math.min(
        86,
        maxScore - 7
      );

  }

  else {

    score =
      Math.min(
        score,
        82 - (index * 2)
      );

  }

  return {

    ...item,

    score:
      clamp(score),

  };

}


);

}

//////////////////////////////////////////////////////////////
// FINAL PREDICTION RANKING ENGINE
//////////////////////////////////////////////////////////////

export function buildPredictionRanking(
context: PredictionContext
): PredictionRanking[] {

if (
!context ||
!Array.isArray(
context.planetaryPredictions
)
) {


return [];


}

////////////////////////////////////////////////////////////
// PLANETARY INTELLIGENCE
////////////////////////////////////////////////////////////

const planetaryRankings =
rankPlanetPredictions(
context
);

////////////////////////////////////////////////////////////
// LIFE AREA INTELLIGENCE
////////////////////////////////////////////////////////////

const lifeRankings =
rankLifePredictions(
context
);

////////////////////////////////////////////////////////////
// OPPORTUNITIES
////////////////////////////////////////////////////////////

const opportunityRankings =
rankInsights(
context.opportunities
);

////////////////////////////////////////////////////////////
// CAUTIONS
////////////////////////////////////////////////////////////

const cautionRankings =
rankInsights(
context.cautions
);

////////////////////////////////////////////////////////////
// COMBINE
////////////////////////////////////////////////////////////

const combined = [


...planetaryRankings,

...lifeRankings,

...opportunityRankings,

...cautionRankings,


];

////////////////////////////////////////////////////////////
// DEDUPLICATION
////////////////////////////////////////////////////////////

const unique =
removeDuplicateRankings(
combined
);

////////////////////////////////////////////////////////////
// SCORE FILTER
////////////////////////////////////////////////////////////

const eligible =
unique.filter(
item =>
item.score >= 45
);

////////////////////////////////////////////////////////////
// SORT
////////////////////////////////////////////////////////////

const sorted =
eligible.sort(
(a, b) => {


    if (
      b.score !== a.score
    ) {

      return (
        b.score -
        a.score
      );

    }

    if (
      (b.confidence ?? 0)
      !==
      (a.confidence ?? 0)
    ) {

      return (
        (b.confidence ?? 0)
        -
        (a.confidence ?? 0)
      );

    }

    return (
      a.title.localeCompare(
        b.title
      )
    );

  }
);


////////////////////////////////////////////////////////////
// CATEGORY BALANCE
////////////////////////////////////////////////////////////

const balanced =
balanceCategories(
sorted
);

////////////////////////////////////////////////////////////
// FINAL NORMALIZATION
////////////////////////////////////////////////////////////

const finalRanking =
normalizeRankingSpread(
balanced
)
.slice(
0,
10
);

////////////////////////////////////////////////////////////
// DEBUG
////////////////////////////////////////////////////////////

if (
process.env.NODE_ENV !==
"production"
) {


console.log(
  "NATIONPATH PREDICTION RANKING",
  {
    zodiac:
      context.zodiacSign,

    phase:
      context.phase,

    planets:
      context.planetaryPredictions.length,

    lifeAreas:
      context.lifePredictions.length,

    opportunities:
      safeArray(
        context.opportunities
      ).length,

    cautions:
      safeArray(
        context.cautions
      ).length,

    combined:
      combined.length,

    eligible:
      eligible.length,

    final:
      finalRanking.length,

    rankings:
      finalRanking.map(
        item => ({
          title:
            item.title,

          category:
            item.category,

          score:
            item.score,

          confidence:
            item.confidence,
        })
      ),

  }
);


}

return finalRanking;

}
