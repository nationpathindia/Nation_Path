import { calculateDuration } from "./duration";

import type { DurationResult } from "./duration";

export interface TimeDivision {
  index: number;

  start: Date;
  end: Date;

  duration: DurationResult;
}


export function divideTimeRange(
  start: Date,
  end: Date,
  parts: number
): TimeDivision[] {

  if (parts <= 0) {
    throw new Error(
      "Parts must be greater than zero."
    );
  }


  const startMs = start.getTime();
  const endMs = end.getTime();


  if (endMs <= startMs) {
    throw new Error(
      "End time must be after start time."
    );
  }


  const totalMilliseconds =
    endMs - startMs;


  const divisions: TimeDivision[] = [];


  for (let i = 0; i < parts; i++) {

    const partStartMs =
      Math.floor(
        startMs +
        (totalMilliseconds * i) / parts
      );


    const partEndMs =
      Math.floor(
        startMs +
        (totalMilliseconds * (i + 1)) / parts
      );


    const partStart =
      new Date(partStartMs);


    const partEnd =
      new Date(partEndMs);


    divisions.push({

      index: i + 1,

      start: partStart,

      end: partEnd,

      duration: calculateDuration(
        partStart,
        partEnd
      ),

    });
  }


  return divisions;
}