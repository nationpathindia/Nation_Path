//////////////////////////////////////////////////////////////
//
// NATIONPATH ASTRO HOROSCOPE
//
// REMEDY INTELLIGENCE ENGINE
//
// Production / Future-Proof Version
//
// Responsibility:
//
// Already-known Astro Influence
//        ↓
// Remedy Context
//        ↓
// Existing Remedy Resolver
//        ↓
// Resolved Remedy
//
// IMPORTANT:
//
// - No astronomy
// - No planetary calculation
// - No prediction generation
// - No mantra generation
// - No AI generation
// - No CMS/database access
// - No hardcoded remedy knowledge
//
// Remedy knowledge must be supplied by the
// service / integration / automation layer.
//
//////////////////////////////////////////////////////////////

import type {
HoroscopeResult,
HoroscopePlanetId,
} from "../types";

import type {
RemedyCategory,
RemedyContext,
RemedyIntelligenceResult,
RemedyKnowledge,
} from "./types";

import {
createRemedyContext,
resolvePrimaryCmsRemedy,
resolveCmsRemedies,
} from "./resolver";

import {
normalizeRemedyPlanet,
} from "./rules";

//////////////////////////////////////////////////////////////
// ENGINE OPTIONS
//////////////////////////////////////////////////////////////

export interface RemedyEngineOptions {

/**

* Remedy knowledge supplied by the
* service / integration layer.
*
* The engine does NOT access MongoDB or CMS.
  */
  remedies?: RemedyKnowledge[];

/**

* Optional category requested by caller.
  */
  category?: RemedyCategory;

/**

* Optional maximum number of remedies.
*
* Default = 1.
  */
  limit?: number;

}

//////////////////////////////////////////////////////////////
// PLANETARY INFLUENCE INPUT
//////////////////////////////////////////////////////////////

export interface RemedyPlanetInput {

planet: string;

strengthScore?: number;

dignity?: string;

zodiacSign?: string;

category?: RemedyCategory;

}

//////////////////////////////////////////////////////////////
// NORMALIZE PLANET INPUT
//////////////////////////////////////////////////////////////

function normalizePlanetInput(
input: RemedyPlanetInput
): RemedyPlanetInput | null {

const planet =
normalizeRemedyPlanet(
input.planet
);

if (!planet) {
return null;
}

return {
...input,
planet,
};

}

//////////////////////////////////////////////////////////////
// BUILD REMEDY CONTEXT
//////////////////////////////////////////////////////////////

function buildContext(
input: RemedyPlanetInput
): RemedyContext {

return createRemedyContext(
input.planet,
input.category,
input.zodiacSign,
input.strengthScore,
input.dignity
);

}

//////////////////////////////////////////////////////////////
// RESOLVE ONE PLANET
//////////////////////////////////////////////////////////////

export async function resolvePlanetRemedy(
input: RemedyPlanetInput,
options: RemedyEngineOptions = {}
): Promise<RemedyIntelligenceResult> {

const normalized =
normalizePlanetInput(
input
);

if (!normalized) {


return {
  available: false,
};


}

const category =
normalized.category ??
options.category;

const context =
buildContext({
...normalized,
category,
});

const remedies =
options.remedies;

if (
!Array.isArray(remedies) ||
!remedies.length
) {


return {
  available: false,
  context,
};


}

const remedy =
resolvePrimaryCmsRemedy({


  remedies,

  planet:
    normalized.planet,

  category,

  zodiacSign:
    normalized.zodiacSign,

  strengthScore:
    normalized.strengthScore,

  dignity:
    normalized.dignity,

  limit: 1,

});


if (!remedy) {


return {
  available: false,
  context,
};


}

return {


available: true,

remedy,

context,


};

}

//////////////////////////////////////////////////////////////
// RESOLVE MULTIPLE PLANETARY REMEDIES
//////////////////////////////////////////////////////////////

export async function resolveRemediesForPlanets(
inputs: RemedyPlanetInput[],
options: RemedyEngineOptions = {}
): Promise<RemedyIntelligenceResult[]> {

const remedies =
options.remedies;

if (
!Array.isArray(remedies) ||
!remedies.length
) {


return [];


}

const results:
RemedyIntelligenceResult[] = [];

const seen =
new Set<string>();

const limit =
Number.isFinite(
options.limit
)
? Math.max(
1,
Math.floor(
options.limit as number
)
)
: 1;

for (
const input of inputs
) {


const normalized =
  normalizePlanetInput(
    input
  );

if (!normalized) {
  continue;
}


const planet =
  normalized.planet;

if (
  seen.has(planet)
) {
  continue;
}

seen.add(planet);


const category =
  normalized.category ??
  options.category;


const context =
  buildContext({
    ...normalized,
    category,
  });


const resolvedRemedies =
  resolveCmsRemedies({

    remedies,

    planet,

    category,

    zodiacSign:
      normalized.zodiacSign,

    strengthScore:
      normalized.strengthScore,

    dignity:
      normalized.dignity,

    limit,

  });


if (
  !resolvedRemedies.length
) {
  continue;
}


for (
  const remedy of resolvedRemedies
) {

  results.push({

    available: true,

    remedy,

    context,

  });

}


}

return results;

}

//////////////////////////////////////////////////////////////
// EXTRACT PLANETARY INPUT FROM HOROSCOPE RESULT
//
// SOURCE:
//
// HoroscopeResult.planets
//
// IMPORTANT:
//
// This function does NOT calculate anything.
//
// It only reads already-calculated
// planetary intelligence.
//
//////////////////////////////////////////////////////////////

export function extractRemedyPlanetInputs(
horoscope: HoroscopeResult
): RemedyPlanetInput[] {

const planets =
horoscope.planets;

if (!planets) {
return [];
}

const keys:
Array<keyof typeof planets> = [


  "sun",
  "moon",
  "mars",
  "mercury",
  "jupiter",
  "venus",
  "saturn",
  "rahu",
  "ketu",

];


const inputs:
RemedyPlanetInput[] = [];

for (
const key of keys
) {


const planet =
  planets[key];

if (!planet) {
  continue;
}


//////////////////////////////////////////////////////////
// IMPORTANT TYPE ADAPTER
//
// Astro planet can be:
//
// string | Swiss Ephemeris Planet
//
// Remedy layer expects:
//
// string
//
// We do NOT modify the Astro Engine.
//////////////////////////////////////////////////////////

const planetName =
  String(
    planet.planet
  );


inputs.push({

  planet:
    planetName,

  strengthScore:
    planet.strength?.score,

  dignity:
    getPlanetDignity(
      planet
    ),

  zodiacSign:
    planet.rashi?.name,

});


}

return inputs;

}

//////////////////////////////////////////////////////////////
// DIGNITY EXTRACTION
//
// Defensive adapter only.
//
// Actual dignity calculation belongs to the
// planetary intelligence / strength layer.
//
//////////////////////////////////////////////////////////////

function getPlanetDignity(
planet: {
strength?: unknown;
intelligence?: unknown;
}
): string | undefined {

////////////////////////////////////////////////////////////
// STRENGTH
////////////////////////////////////////////////////////////

const strength =
planet.strength as
| Record<string, unknown>
| undefined;

if (
typeof strength?.dignity ===
"string"
) {


return strength.dignity;


}

////////////////////////////////////////////////////////////
// INTELLIGENCE
////////////////////////////////////////////////////////////

const intelligence =
planet.intelligence as
| Record<string, unknown>
| undefined;

if (
typeof intelligence?.dignity ===
"string"
) {


return intelligence.dignity;


}

return undefined;

}

//////////////////////////////////////////////////////////////
// HOROSCOPE REMEDY ENGINE
//
// Main integration entry point.
//
// Horoscope Engine
//        ↓
// Existing Planetary Result
//        ↓
// Existing Prediction Intelligence
//        ↓
// Remedy Engine
//        ↓
// Resolver
//        ↓
// Remedy Intelligence Result
//
//////////////////////////////////////////////////////////////

export async function generateRemedyIntelligence(
horoscope: HoroscopeResult,
options: RemedyEngineOptions = {}
): Promise<RemedyIntelligenceResult> {

const inputs =
extractRemedyPlanetInputs(
horoscope
);

if (!inputs.length) {


return {
  available: false,
};


}

const primaryInput =
inputs[0];

if (!primaryInput) {


return {
  available: false,
};


}

return resolvePlanetRemedy(


{
  ...primaryInput,

  category:
    primaryInput.category ??
    options.category,

},

options


);

}

//////////////////////////////////////////////////////////////
// GENERATE ALL REMEDY INTELLIGENCE
//
// Future-proof entry point.
//
// Returns remedies for every planetary context
// for which matching published knowledge exists.
//
//////////////////////////////////////////////////////////////

export async function generateAllRemedyIntelligence(
horoscope: HoroscopeResult,
options: RemedyEngineOptions = {}
): Promise<RemedyIntelligenceResult[]> {

const inputs =
extractRemedyPlanetInputs(
horoscope
);

if (!inputs.length) {
return [];
}

return resolveRemediesForPlanets(
inputs,
options
);

}

//////////////////////////////////////////////////////////////
// CONVENIENCE: PLANET DIRECT
//////////////////////////////////////////////////////////////

export async function generatePlanetRemedy(
planet: HoroscopePlanetId | string,

context?: {


zodiacSign?: string;

strengthScore?: number;

dignity?: string;

category?: RemedyCategory;


},

options: RemedyEngineOptions = {}

): Promise<RemedyIntelligenceResult> {

return resolvePlanetRemedy(


{

  planet:
    String(planet),

  zodiacSign:
    context?.zodiacSign,

  strengthScore:
    context?.strengthScore,

  dignity:
    context?.dignity,

  category:
    context?.category,

},

options


);

}

//////////////////////////////////////////////////////////////
// DEFAULT EXPORT
//////////////////////////////////////////////////////////////

export default {

resolvePlanetRemedy,

resolveRemediesForPlanets,

extractRemedyPlanetInputs,

generateRemedyIntelligence,

generateAllRemedyIntelligence,

generatePlanetRemedy,

};
