//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO
//
// KUNDLI INTELLIGENCE EXPERIENCE
//
// LIFE BLUEPRINT DATA
//
// Future:
// API powered chapters
// Premium report mapping
//////////////////////////////////////////////////////////////

export const LIFE_CHAPTERS = [

  {
    id:"foundation",

    chapter:"01",

    title:"Foundation",

    subtitle:
      "The Beginning Chapter",

    theme:[
      "Identity",
      "Roots",
      "Values",
    ],

    planets:[
      "Sun",
      "Moon",
    ],

    houses:[
      "1st House",
      "4th House",
    ],

    description:
      "The foundation chapter reveals your inner identity, emotional roots and the patterns that shape your early journey.",

    insight:
      "Understanding where you come from helps reveal where you are going.",

  },


  {
    id:"growth",

    chapter:"02",

    title:"Growth",

    subtitle:
      "The Evolution Chapter",

    theme:[
      "Learning",
      "Skills",
      "Transformation",
    ],

    planets:[
      "Mercury",
      "Mars",
    ],

    houses:[
      "3rd House",
      "6th House",
    ],

    description:
      "This chapter explores abilities, challenges and the personal evolution created through experience.",

    insight:
      "Every challenge becomes a chapter of growth.",

  },


  {
    id:"purpose",

    chapter:"03",

    title:"Purpose",

    subtitle:
      "The Destiny Chapter",

    theme:[
      "Career",
      "Achievement",
      "Contribution",
    ],

    planets:[
      "Sun",
      "Saturn",
    ],

    houses:[
      "9th House",
      "10th House",
    ],

    description:
      "Your purpose chapter reveals ambition, responsibility and the path where your abilities create impact.",

    insight:
      "Your actions become the signature of your destiny.",

  },


  {
    id:"relationships",

    chapter:"04",

    title:"Relationships",

    subtitle:
      "The Connection Chapter",

    theme:[
      "Love",
      "Partnership",
      "Harmony",
    ],

    planets:[
      "Venus",
      "Moon",
    ],

    houses:[
      "5th House",
      "7th House",
    ],

    description:
      "This chapter explores emotional bonds, partnerships and the connections that influence your journey.",

    insight:
      "Relationships mirror the lessons written within.",

  },


  {
    id:"wisdom",

    chapter:"05",

    title:"Higher Wisdom",

    subtitle:
      "The Enlightenment Chapter",

    theme:[
      "Awareness",
      "Spirituality",
      "Inner Growth",
    ],

    planets:[
      "Jupiter",
      "Ketu",
    ],

    houses:[
      "9th House",
      "12th House",
    ],

    description:
      "The wisdom chapter explores deeper understanding, beliefs and the search for higher meaning.",

    insight:
      "The final chapter is not an ending, but a deeper beginning.",

  },

];



export type LifeChapter =
  typeof LIFE_CHAPTERS[number];