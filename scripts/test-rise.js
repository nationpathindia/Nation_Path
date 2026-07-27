const {
  calculateRiseTransitSet,
  julianDay,
  julianDayToDate,
  Planet,
  RiseTransitFlag,
} = require("@swisseph/node");

try {
  const jd = julianDay(2026, 7, 1);

  const result = calculateRiseTransitSet(
    jd,
    Planet.Sun,
    RiseTransitFlag.Rise,
    78.4867, // Longitude
    17.385,  // Latitude
    0        // Altitude
  );

  console.log("===== Rise Result =====");
  console.log(result);

  console.log("\n===== Converted Date =====");
  const dt = julianDayToDate(result.time);
  console.log(dt);

} catch (err) {
  console.error(err);
}