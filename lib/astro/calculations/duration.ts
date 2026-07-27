export interface DurationResult {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  formatted: string;
}


function pad(value: number): string {
  return value.toString().padStart(2, "0");
}


export function calculateDuration(
  start: Date,
  end: Date
): DurationResult {

  const startTime = start.getTime();

  const endTime = end.getTime();


  if (
    Number.isNaN(startTime) ||
    Number.isNaN(endTime)
  ) {
    throw new Error(
      "Invalid date provided for duration calculation."
    );
  }


  const milliseconds =
    endTime - startTime;


  if (milliseconds < 0) {
    throw new Error(
      "End date must be after start date."
    );
  }


  const totalSeconds =
    Math.floor(milliseconds / 1000);


  const totalMinutes =
    Math.floor(totalSeconds / 60);


  const totalHours =
    totalMinutes / 60;


  const hours =
    Math.floor(totalSeconds / 3600);


  const minutes =
    Math.floor(
      (totalSeconds % 3600) / 60
    );


  const seconds =
    totalSeconds % 60;


  return {

    milliseconds,

    seconds: totalSeconds,

    minutes: totalMinutes,

    hours: totalHours,

    formatted:
      `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,

  };
}