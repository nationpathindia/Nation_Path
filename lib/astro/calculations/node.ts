import {
  CalculationFlag,
  LunarPoint,
} from "@swisseph/node";

import { getPlanetPosition } from "./astronomy";
import {
  getRashiIndex,
  getRashiName,
} from "./rashi";

export interface LunarNodePosition {
  longitude: number;
  rashi: {
    index: number;
    name: string;
  };
}

export interface LunarNodes {
  rahu: LunarNodePosition;
  ketu: LunarNodePosition;
}

function normalize(value: number) {
  return ((value % 360) + 360) % 360;
}

export function getLunarNodes(
  date: Date
): LunarNodes {

  const rahu =
    getPlanetPosition(
      date,
      LunarPoint.TrueNode
    );

  const rahuLongitude =
    normalize(
      rahu.siderealLongitude
    );

  const ketuLongitude =
    normalize(
      rahuLongitude + 180
    );

  return {

    rahu: {

      longitude: rahuLongitude,

      rashi: {

        index:
          getRashiIndex(
            rahuLongitude
          ),

        name:
          getRashiName(
            getRashiIndex(
              rahuLongitude
            )
          ),

      },

    },

    ketu: {

      longitude:
        ketuLongitude,

      rashi: {

        index:
          getRashiIndex(
            ketuLongitude
          ),

        name:
          getRashiName(
            getRashiIndex(
              ketuLongitude
            )
          ),

      },

    },

  };

}