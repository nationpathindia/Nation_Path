//////////////////////////////////////////////////////////////
//
// NATIONPATH AI AUTOMATION
//
// ASTRO HOROSCOPE SCHEDULER
//
// LOCKED PRODUCTION VERSION
//
// Responsibility:
//
// Cron / Background Trigger
//          ↓
// Scheduler
//          ↓
// Orchestrator
//
// Scheduler does NOT:
//
// - Access MongoDB
// - Load Zodiac Master
// - Generate content
// - Call generator
// - Call mapper
// - Call publisher
// - Calculate astrology
// - Modify predictions
// - Generate AI
//
// The orchestrator owns the complete automation pipeline.
//
//////////////////////////////////////////////////////////////

import {
  runHoroscopeAutomation,
} from "./orchestrator";

//////////////////////////////////////////////////////////////
// DAILY HOROSCOPE
//////////////////////////////////////////////////////////////

export async function runDailyHoroscopeAutomation(

  date: Date = new Date()

) {

  return runHoroscopeAutomation({

    period:
      "daily",

    language:
      "english",

    startDate:
      date,

    endDate:
      date,

  });

}

//////////////////////////////////////////////////////////////
// WEEKLY HOROSCOPE
//////////////////////////////////////////////////////////////

export async function runWeeklyHoroscopeAutomation(

  date: Date = new Date()

) {

  return runHoroscopeAutomation({

    period:
      "weekly",

    language:
      "english",

    startDate:
      date,

    endDate:
      date,

  });

}

//////////////////////////////////////////////////////////////
// MONTHLY HOROSCOPE
//////////////////////////////////////////////////////////////

export async function runMonthlyHoroscopeAutomation(

  date: Date = new Date()

) {

  return runHoroscopeAutomation({

    period:
      "monthly",

    language:
      "english",

    startDate:
      date,

    endDate:
      date,

  });

}

//////////////////////////////////////////////////////////////
// DEFAULT EXPORT
//////////////////////////////////////////////////////////////

export default {

  runDailyHoroscopeAutomation,

  runWeeklyHoroscopeAutomation,

  runMonthlyHoroscopeAutomation,

};

