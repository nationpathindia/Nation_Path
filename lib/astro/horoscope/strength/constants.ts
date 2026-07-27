import type { PlanetDignity } from "./types";

export const PLANET_STRENGTH_SCORES: Record<
  PlanetDignity,
  number
> = {
  exalted: 100,

  own: 85,

  friendly: 70,

  neutral: 50,

  enemy: 30,

  debilitated: 0,
};

export const MIN_PLANET_STRENGTH = 0;

export const MAX_PLANET_STRENGTH = 100;