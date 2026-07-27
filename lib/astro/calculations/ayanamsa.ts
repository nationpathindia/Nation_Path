/**
 * Lahiri (Chitrapaksha) Ayanamsa
 *
 * Returns the Lahiri ayanamsa in decimal degrees.
 *
 * Reference epoch:
 * J2000.0
 *
 * Accuracy:
 * Suitable for Panchang, Muhurat, Horoscope,
 * and general Vedic astrology applications.
 */

const J2000 = Date.UTC(2000, 0, 1, 12, 0, 0);

const DAYS_PER_CENTURY = 36525;

const BASE_AYANAMSA = 23.8530555556;

/**
 * Mean annual precession (arcseconds/year)
 */
const PRECESSION_RATE = 50.290966;

/**
 * Convert arcseconds to degrees.
 */
function arcSecondsToDegrees(value: number): number {
  return value / 3600;
}

/**
 * Julian centuries since J2000.
 */
export function getJulianCenturies(date: Date): number {
  const days = (date.getTime() - J2000) / 86400000;
  return days / DAYS_PER_CENTURY;
}

/**
 * Decimal years since J2000.
 */
export function getYearsSinceJ2000(date: Date): number {
  return getJulianCenturies(date) * 100;
}

/**
 * Lahiri (Chitrapaksha) Ayanamsa
 *
 * Returns decimal degrees.
 */
export function getLahiriAyanamsa(date: Date): number {
  const years = getYearsSinceJ2000(date);

  return (
    BASE_AYANAMSA +
    arcSecondsToDegrees(PRECESSION_RATE * years)
  );
}