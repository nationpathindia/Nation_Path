import { TOTAL_NAKSHATRAS } from "./constants";
import { getNakshatraTiming } from "./nakshatraTiming";

export interface NakshatraTransition {
  index: number;
  name: string;

  start: Date;
  end: Date;
}

export interface NakshatraSequence {
  date: Date;

  current: NakshatraTransition;

  previous: NakshatraTransition;

  next: NakshatraTransition;
}

export function getNakshatraSequence(
  date: Date
): NakshatraSequence {
  const current =
    getNakshatraTiming(date);

  const previous =
    getNakshatraTiming(
      new Date(
        current.start.getTime() - 1000
      )
    );

  const next =
    getNakshatraTiming(
      new Date(
        current.end.getTime() + 1000
      )
    );

  return {
    date,

    current: {
      index: current.index,
      name: current.name,
      start: current.start,
      end: current.end,
    },

    previous: {
      index: previous.index,
      name: previous.name,
      start: previous.start,
      end: previous.end,
    },

    next: {
      index: next.index,
      name: next.name,
      start: next.start,
      end: next.end,
    },
  };
}

export function getNakshatraSequenceForDay(
  date: Date
): NakshatraTransition[] {
  const result: NakshatraTransition[] = [];

  let current =
    getNakshatraTiming(date);

  result.push({
    index: current.index,
    name: current.name,
    start: current.start,
    end: current.end,
  });

  while (
    result.length < TOTAL_NAKSHATRAS
  ) {
    const next =
      getNakshatraTiming(
        new Date(
          current.end.getTime() + 1000
        )
      );

    if (
      next.index === current.index
    ) {
      break;
    }

    result.push({
      index: next.index,
      name: next.name,
      start: next.start,
      end: next.end,
    });

    current = next;
  }

  return result;
}