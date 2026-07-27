import type {
  PlanetNature,
  PlanetGender,
  PlanetElement,
  PlanetDirection,
} from "./types";

export const SUPPORTED_ASTRO_LANGUAGES = [
  "en",
  "hi",
  "ta",
  "te",
  "sa",
] as const;

export const PLANET_NATURES = [
  "benefic",
  "malefic",
  "neutral",
] as const satisfies readonly PlanetNature[];

export const PLANET_GENDERS = [
  "male",
  "female",
  "neutral",
] as const satisfies readonly PlanetGender[];

export const PLANET_ELEMENTS = [
  "fire",
  "earth",
  "air",
  "water",
  "ether",
] as const satisfies readonly PlanetElement[];

export const PLANET_DIRECTIONS = [
  "east",
  "west",
  "north",
  "south",
  "northEast",
  "northWest",
  "southEast",
  "southWest",
] as const satisfies readonly PlanetDirection[];

export const PLANET_COUNT = 9;

export const SUPPORTED_PLANETS = [
  "sun",
  "moon",
  "mars",
  "mercury",
  "jupiter",
  "venus",
  "saturn",
  "rahu",
  "ketu",
] as const;