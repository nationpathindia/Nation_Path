//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO REPORT REGISTRY
//////////////////////////////////////////////////////////////

export type AstroReportType =
  | "career"
  | "marriage"
  | "finance"
  | "health"
  | "kundali"
  | "panchang";



export interface AstroReportConfig {

  slug: string;

  title: string;

  type: AstroReportType;

}



export const astroReportRegistry: AstroReportConfig[] = [

  {
    slug: "career-report",
    title: "Career Report",
    type: "career",
  },


  {
    slug: "marriage-report",
    title: "Marriage Report",
    type: "marriage",
  },


  {
    slug: "finance-report",
    title: "Finance Report",
    type: "finance",
  },


  {
    slug: "health-report",
    title: "Health Report",
    type: "health",
  },


  {
    slug: "detailed-kundali-analysis",
    title: "Detailed Kundali Analysis",
    type: "kundali",
  },


  {
    slug: "daily-panchang",
    title: "Daily Panchang",
    type: "panchang",
  },


  {
    slug: "birth-chart",
    title: "Birth Chart",
    type: "kundali",
  },

];



export function getAstroReport(
  slug: string
) {

  return astroReportRegistry.find(
    (report) =>
      report.slug === slug
  );

}