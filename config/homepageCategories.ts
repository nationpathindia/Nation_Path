export interface HomepageCategory {
  title: string;
  slug: string;
  priority: number;
  enabled: boolean;
  layout: "featured" | "standard";
  description?: string;
}


export const homepageCategories: HomepageCategory[] = [

  {
    title: "Politics",
    slug: "politics",
    priority: 1,
    enabled: true,
    layout: "featured",
    description:
      "Latest political developments, government decisions and national updates."
  },


  {
    title: "Economy",
    slug: "economy",
    priority: 2,
    enabled: true,
    layout: "featured",
    description:
      "Markets, finance, policies and India's economic growth stories."
  },


  {
    title: "Business",
    slug: "business",
    priority: 3,
    enabled: true,
    layout: "standard",
    description:
      "Corporate news, startups, entrepreneurship and business insights."
  },


  {
    title: "Defence",
    slug: "defence",
    priority: 4,
    enabled: true,
    layout: "standard",
    description:
      "Defence technology, armed forces and strategic affairs."
  },


  {
    title: "International",
    slug: "international",
    priority: 5,
    enabled: true,
    layout: "standard",
    description:
      "Global affairs, world politics and international developments."
  },


  {
    title: "Technology",
    slug: "technology",
    priority: 6,
    enabled: true,
    layout: "standard",
    description:
      "Technology, AI, gadgets, innovation and digital transformation."
  },


  {
    title: "Science",
    slug: "science",
    priority: 7,
    enabled: true,
    layout: "standard",
    description:
      "Scientific discoveries, space research and innovation."
  },


  {
    title: "Health",
    slug: "health",
    priority: 8,
    enabled: true,
    layout: "standard",
    description:
      "Health updates, medical research and wellness information."
  },


  {
    title: "Education",
    slug: "education",
    priority: 9,
    enabled: true,
    layout: "standard",
    description:
      "Education policies, exams, learning and career updates."
  },


  {
    title: "Environment",
    slug: "environment",
    priority: 10,
    enabled: true,
    layout: "standard",
    description:
      "Climate change, sustainability and environmental stories."
  },


  {
    title: "Sports",
    slug: "sports",
    priority: 11,
    enabled: true,
    layout: "featured",
    description:
      "Sports news, tournaments, athletes and major events."
  },


  {
    title: "Culture",
    slug: "culture",
    priority: 12,
    enabled: true,
    layout: "standard",
    description:
      "Indian culture, heritage, traditions and lifestyle."
  },


  {
    title: "Lifestyle",
    slug: "lifestyle",
    priority: 13,
    enabled: true,
    layout: "standard",
    description:
      "Lifestyle trends, food, travel and modern living."
  },


  {
    title: "Travel",
    slug: "travel",
    priority: 14,
    enabled: true,
    layout: "standard",
    description:
      "Travel destinations, tourism and exploration stories."
  },


];


export function getActiveHomepageCategories() {

  return homepageCategories
    .filter(
      (category) => category.enabled
    )
    .sort(
      (a, b) => a.priority - b.priority
    );

}