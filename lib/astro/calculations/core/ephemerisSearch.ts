  export interface SearchOptions {
    start: Date;
    end: Date;

    toleranceMs?: number;

    evaluator: (date: Date) => number;

    condition: (
      previous: number,
      current: number
    ) => boolean;
  }

  export interface SearchResult {
    date: Date;
    value: number;
  }

  const DEFAULT_TOLERANCE = 1000;

  /**
   * Generic Binary Search Engine
   *
   * Reusable for:
   * - Nakshatra
   * - Tithi
   * - Yoga
   * - Karana
   * - Planet Transit
   * - Sign Change
   * * - Retrograde Events
   */
  export function binarySearchEvent(
    options: SearchOptions
  ): SearchResult {
    const tolerance =
      options.toleranceMs ??
      DEFAULT_TOLERANCE;

    let low = options.start.getTime();
    let high = options.end.getTime();

    let lowValue = options.evaluator(
      new Date(low)
    );

    while (
      high - low >
      tolerance
    ) {
      const mid =
        Math.floor((low + high) / 2);

      const midValue =
        options.evaluator(
          new Date(mid)
        );

      if (
        options.condition(
          lowValue,
          midValue
        )
      ) {
        high = mid;
      } else {
        low = mid;
        lowValue = midValue;
      }
    }

    const date = new Date(
      Math.floor((low + high) / 2)
    );

    return {
      date,
      value: options.evaluator(date),
    };
  }