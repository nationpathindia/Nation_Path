//////////////////////////////////////////////////////////////
// NATIONPATH ASTRO INTELLIGENCE ENGINE
// Planet Knowledge Database
//////////////////////////////////////////////////////////////

import type {
  PlanetMetadata,
  PlanetNature,
} from "./types";


//////////////////////////////////////////////////////////////
// PLANET DEFINITIONS
//////////////////////////////////////////////////////////////

export const PLANETS: PlanetMetadata[] = [

  {
    id: "Sun",

    name: {
      en: "Sun",
      hi: "सूर्य",
      ta: "சூரியன்",
      te: "సూర్యుడు",
      sa: "सूर्यः",
      ne: "सूर्य",
    },

    nature: "malefic",

    gender: "male",

    element: "fire",


    lordship: [
      "Simha",
    ],


    ownSigns: [
      "Simha",
    ],


    exaltation: "Mesha",

    debilitation: "Tula",

    mooltrikona: "Simha",


    friendlySigns: [

      "Mesha",
      "Karka",
      "Simha",
      "Vrischika",
      "Dhanu",
      "Meena",

    ],


    enemySigns: [

      "Vrishabha",
      "Makara",
      "Kumbha",

    ],


    neutralSigns: [

      "Mithuna",
      "Kanya",
      "Tula",

    ],


    color: "Deep Red",

    gemstone: "Ruby",

    metal: "Gold",

    day: "Sunday",

    direction: "east",


    bodyParts: [

      "Heart",
      "Head",
      "Bones",
      "Right Eye",

    ],


    karakatwa: [

      "Soul",
      "Father",
      "Authority",
      "Government",
      "Power",
      "Leadership",
      "Vitality",
      "Confidence",
      "Fame",

    ],


    keywords: [

      "authority",
      "leadership",
      "ego",
      "government",
      "father",
      "health",
      "success",
      "power",
      "confidence",

    ],


    description: {

      en:
        "The Sun represents soul, vitality, authority, confidence and leadership. It governs identity, honour and life force.",

      hi:
        "सूर्य आत्मा, ऊर्जा, नेतृत्व और अधिकार का प्रतिनिधित्व करता है।",

      ta:
        "சூரியன் ஆன்மா, அதிகாரம் மற்றும் தலைமைத்துவத்தை குறிக்கிறது.",

      te:
        "సూర్యుడు ఆత్మ, శక్తి, నాయకత్వం మరియు గౌరవాన్ని సూచిస్తాడు.",

      sa:
        "सूर्यः आत्मबलस्य, तेजसः, नेतृत्वस्य च कारकः।",

      ne:
        "सूर्य आत्मा, ऊर्जा, नेतृत्व र अधिकारको प्रतिनिधित्व गर्छ।",

    },

  },


  {
    id: "Moon",

    name: {

      en: "Moon",
      hi: "चन्द्र",
      ta: "சந்திரன்",
      te: "చంద్రుడు",
      sa: "चन्द्रः",
      ne: "चन्द्र",

    },

    nature: "benefic",

    gender: "female",

    element: "water",


    lordship: [

      "Karka",

    ],


    ownSigns: [

      "Karka",

    ],


    exaltation: "Vrishabha",

    debilitation: "Vrischika",

    mooltrikona: "Vrishabha",


    friendlySigns: [

      "Mesha",
      "Vrishabha",
      "Mithuna",
      "Karka",
      "Simha",
      "Kanya",
      "Dhanu",
      "Meena",

    ],


    enemySigns: [],


    neutralSigns: [

      "Tula",
      "Vrischika",
      "Makara",
      "Kumbha",

    ],


    color: "White",

    gemstone: "Pearl",

    metal: "Silver",

    day: "Monday",

    direction: "northWest",


    bodyParts: [

      "Mind",
      "Blood",
      "Chest",
      "Left Eye",
      "Lungs",

    ],


    karakatwa: [

      "Mind",
      "Mother",
      "Emotions",
      "Peace",
      "Water",
      "Travel",
      "Public",
      "Memory",
      "Compassion",

    ],


    keywords: [

      "mind",
      "emotion",
      "intuition",
      "peace",
      "memory",
      "imagination",
      "nurturing",

    ],


    description: {

      en:
        "The Moon governs mind, emotions, imagination and emotional stability.",

      hi:
        "चन्द्र मन, भावनाओं और मानसिक शांति का कारक है।",

      ta:
        "சந்திரன் மனம் மற்றும் உணர்வுகளை குறிக்கிறார்.",

      te:
        "చంద్రుడు మనస్సు మరియు భావోద్వేగాలకు కారకుడు.",

      sa:
        "चन्द्रः मनसः तथा भावनानां कारकः।",

      ne:
        "चन्द्र मन र भावनाको प्रतिनिधित्व गर्छ।",

    },

  },
    {
    id: "Mars",

    name: {

      en: "Mars",
      hi: "मंगल",
      ta: "செவ்வாய்",
      te: "కుజుడు",
      sa: "मङ्गलः",
      ne: "मंगल",

    },


    nature: "malefic",

    gender: "male",

    element: "fire",


    lordship: [

      "Mesha",
      "Vrischika",

    ],


    ownSigns: [

      "Mesha",
      "Vrischika",

    ],


    exaltation: "Makara",

    debilitation: "Karka",

    mooltrikona: "Mesha",


    friendlySigns: [

      "Mesha",
      "Karka",
      "Simha",
      "Vrischika",
      "Dhanu",
      "Meena",

    ],


    enemySigns: [

      "Mithuna",
      "Kanya",

    ],


    neutralSigns: [

      "Vrishabha",
      "Tula",
      "Makara",
      "Kumbha",

    ],


    color: "Red",

    gemstone: "Red Coral",

    metal: "Copper",

    day: "Tuesday",

    direction: "south",


    bodyParts: [

      "Blood",
      "Muscles",
      "Bone Marrow",
      "Head",
      "Face",

    ],


    karakatwa: [

      "Courage",
      "Strength",
      "Land",
      "Brothers",
      "Military",
      "Engineering",
      "Energy",
      "Competition",
      "Protection",

    ],


    keywords: [

      "courage",
      "energy",
      "warrior",
      "discipline",
      "strength",
      "action",
      "victory",

    ],


    description: {

      en:
        "Mars represents courage, strength, discipline, determination and action. It governs energy, competition and the ability to overcome obstacles.",

      hi:
        "मंगल साहस, शक्ति, पराक्रम और संघर्ष में विजय का कारक है।",

      ta:
        "செவ்வாய் தைரியம், வலிமை மற்றும் வெற்றியை குறிக்கிறது.",

      te:
        "కుజుడు ధైర్యం, శక్తి మరియు విజయానికి కారకుడు.",

      sa:
        "मङ्गलः पराक्रमस्य शक्तेः विजयस्य च कारकः।",

      ne:
        "मंगल साहस, शक्ति र विजयको प्रतिनिधित्व गर्छ।",

    },

  },


  {
    id: "Mercury",

    name: {

      en: "Mercury",
      hi: "बुध",
      ta: "புதன்",
      te: "బుధుడు",
      sa: "बुधः",
      ne: "बुध",

    },


    nature: "benefic",

    gender: "neutral",

    element: "earth",


    lordship: [

      "Mithuna",
      "Kanya",

    ],


    ownSigns: [

      "Mithuna",
      "Kanya",

    ],


    exaltation: "Kanya",

    debilitation: "Meena",

    mooltrikona: "Kanya",


    friendlySigns: [

      "Vrishabha",
      "Mithuna",
      "Simha",
      "Kanya",

    ],


    enemySigns: [

      "Karka",

    ],


    neutralSigns: [

      "Mesha",
      "Tula",
      "Vrischika",
      "Dhanu",
      "Makara",
      "Kumbha",
      "Meena",

    ],


    color: "Green",

    gemstone: "Emerald",

    metal: "Bronze",

    day: "Wednesday",

    direction: "north",


    bodyParts: [

      "Skin",
      "Nervous System",
      "Tongue",
      "Speech",
      "Hands",

    ],


    karakatwa: [

      "Intelligence",
      "Education",
      "Speech",
      "Business",
      "Commerce",
      "Writing",
      "Communication",
      "Mathematics",
      "Logic",

    ],


    keywords: [

      "intelligence",
      "communication",
      "education",
      "business",
      "logic",
      "analysis",

    ],


    description: {

      en:
        "Mercury governs intelligence, speech, communication, education, commerce and analytical ability.",

      hi:
        "बुध बुद्धि, शिक्षा, वाणी और व्यापार का कारक है।",

      ta:
        "புதன் அறிவு, கல்வி மற்றும் தொடர்பை குறிக்கிறார்.",

      te:
        "బుధుడు బుద్ధి, విద్య మరియు సంభాషణకు కారకుడు.",

      sa:
        "बुधः बुद्धेः वाण्याः शिक्षायाः च कारकः।",

      ne:
        "बुध बुद्धि, शिक्षा र सञ्चारको प्रतिनिधित्व गर्छ।",

    },

  },


  {
    id: "Jupiter",

    name: {

      en: "Jupiter",
      hi: "बृहस्पति",
      ta: "குரு",
      te: "గురు",
      sa: "बृहस्पतिः",
      ne: "बृहस्पति",

    },


    nature: "benefic",

    gender: "male",

    element: "ether",


    lordship: [

      "Dhanu",
      "Meena",

    ],


    ownSigns: [

      "Dhanu",
      "Meena",

    ],


    exaltation: "Karka",

    debilitation: "Makara",

    mooltrikona: "Dhanu",


    friendlySigns: [

      "Mesha",
      "Karka",
      "Simha",
      "Vrischika",
      "Dhanu",
      "Meena",

    ],


    enemySigns: [

      "Vrishabha",
      "Mithuna",
      "Kanya",
      "Tula",

    ],


    neutralSigns: [

      "Makara",
      "Kumbha",

    ],


    color: "Yellow",

    gemstone: "Yellow Sapphire",

    metal: "Gold",

    day: "Thursday",

    direction: "northEast",


    bodyParts: [

      "Liver",
      "Fat",
      "Thighs",
      "Wisdom Center",

    ],


    karakatwa: [

      "Wisdom",
      "Knowledge",
      "Teacher",
      "Children",
      "Wealth",
      "Prosperity",
      "Religion",
      "Spirituality",
      "Justice",

    ],


    keywords: [

      "wisdom",
      "knowledge",
      "teacher",
      "fortune",
      "wealth",
      "growth",

    ],


    description: {

      en:
        "Jupiter represents wisdom, knowledge, prosperity, spirituality and divine guidance.",

      hi:
        "बृहस्पति ज्ञान, धर्म, समृद्धि और सौभाग्य के कारक हैं।",

      ta:
        "குரு ஞானம், செல்வம் மற்றும் ஆன்மிகத்தை குறிக்கிறார்.",

      te:
        "గురు జ్ఞానం, సంపద మరియు ధర్మానికి కారకుడు.",

      sa:
        "बृहस्पतिः ज्ञानस्य धर्मस्य समृद्धेः च कारकः।",

      ne:
        "बृहस्पति ज्ञान, समृद्धि र धर्मको प्रतिनिधित्व गर्छ।",

    },

  },
    {
    id: "Venus",

    name: {

      en: "Venus",
      hi: "शुक्र",
      ta: "சுக்கிரன்",
      te: "శుక్రుడు",
      sa: "शुक्रः",
      ne: "शुक्र",

    },


    nature: "benefic",

    gender: "female",

    element: "water",


    lordship: [

      "Vrishabha",
      "Tula",

    ],


    ownSigns: [

      "Vrishabha",
      "Tula",

    ],


    exaltation: "Meena",

    debilitation: "Kanya",

    mooltrikona: "Tula",


    friendlySigns: [

      "Vrishabha",
      "Mithuna",
      "Kanya",
      "Tula",
      "Makara",
      "Kumbha",

    ],


    enemySigns: [

      "Karka",
      "Simha",

    ],


    neutralSigns: [

      "Mesha",
      "Vrischika",
      "Dhanu",
      "Meena",

    ],


    color: "White",

    gemstone: "Diamond",

    metal: "Silver",

    day: "Friday",

    direction: "southEast",


    bodyParts: [

      "Face",
      "Eyes",
      "Kidneys",
      "Reproductive System",
      "Skin",

    ],


    karakatwa: [

      "Love",
      "Marriage",
      "Relationships",
      "Luxury",
      "Beauty",
      "Arts",
      "Music",
      "Vehicles",
      "Comfort",

    ],


    keywords: [

      "love",
      "marriage",
      "beauty",
      "luxury",
      "romance",
      "arts",
      "wealth",
      "comfort",

    ],


    description: {

      en:
        "Venus governs love, relationships, marriage, beauty, arts, luxury and material comforts.",

      hi:
        "शुक्र प्रेम, विवाह, सौंदर्य, कला और भौतिक सुखों के कारक हैं।",

      ta:
        "சுக்கிரன் காதல், திருமணம், அழகு மற்றும் வசதிகளை குறிக்கிறார்.",

      te:
        "శుక్రుడు ప్రేమ, వివాహం, అందం మరియు సౌకర్యాలకు కారకుడు.",

      sa:
        "शुक्रः प्रेम्णः विवाहस्य सौन्दर्यस्य च कारकः।",

      ne:
        "शुक्र प्रेम, सम्बन्ध, सौन्दर्य र विलासिताको प्रतिनिधित्व गर्छ।",

    },

  },


  {
    id: "Saturn",

    name: {

      en: "Saturn",
      hi: "शनि",
      ta: "சனி",
      te: "శని",
      sa: "शनिः",
      ne: "शनि",

    },


    nature: "malefic",

    gender: "neutral",

    element: "air",


    lordship: [

      "Makara",
      "Kumbha",

    ],


    ownSigns: [

      "Makara",
      "Kumbha",

    ],


    exaltation: "Tula",

    debilitation: "Mesha",

    mooltrikona: "Kumbha",


    friendlySigns: [

      "Vrishabha",
      "Mithuna",
      "Kanya",
      "Tula",
      "Makara",
      "Kumbha",

    ],


    enemySigns: [

      "Karka",
      "Simha",

    ],


    neutralSigns: [

      "Mesha",
      "Vrischika",
      "Dhanu",
      "Meena",

    ],


    color: "Dark Blue",

    gemstone: "Blue Sapphire",

    metal: "Iron",

    day: "Saturday",

    direction: "west",


    bodyParts: [

      "Bones",
      "Teeth",
      "Legs",
      "Knees",
      "Nerves",

    ],


    karakatwa: [

      "Discipline",
      "Justice",
      "Hard Work",
      "Longevity",
      "Patience",
      "Service",
      "Karma",
      "Responsibility",
      "Endurance",

    ],


    keywords: [

      "karma",
      "discipline",
      "justice",
      "patience",
      "hard work",
      "responsibility",
      "maturity",

    ],


    description: {

      en:
        "Saturn represents karma, discipline, responsibility, justice, patience and long-term growth through effort.",

      hi:
        "शनि कर्म, अनुशासन, न्याय, धैर्य और जिम्मेदारी के कारक हैं।",

      ta:
        "சனி கர்மம், ஒழுக்கம், நீதி மற்றும் பொறுமையை குறிக்கிறார்.",

      te:
        "శని కర్మ, క్రమశిక్షణ, న్యాయం మరియు సహనానికి కారకుడు.",

      sa:
        "शनिः कर्मणः न्यायस्य धैर्यस्य च कारकः।",

      ne:
        "शनि कर्म, अनुशासन, धैर्य र न्यायको प्रतिनिधित्व गर्छ।",

    },

  },
    {
    id: "Rahu",

    name: {

      en: "Rahu",
      hi: "राहु",
      ta: "ராகு",
      te: "రాహు",
      sa: "राहुः",
      ne: "राहु",

    },


    nature: "malefic",

    gender: "neutral",

    element: "air",


    lordship: [],


    ownSigns: [],


    exaltation: "Vrishabha",

    debilitation: "Vrischika",

    mooltrikona: "Kumbha",


    friendlySigns: [

      "Vrishabha",
      "Mithuna",
      "Kanya",
      "Makara",
      "Kumbha",

    ],


    enemySigns: [

      "Karka",
      "Simha",

    ],


    neutralSigns: [

      "Mesha",
      "Tula",
      "Vrischika",
      "Dhanu",
      "Meena",

    ],


    color: "Smoky Blue",

    gemstone: "Hessonite",

    metal: "Lead",

    day: "Saturday",

    direction: "southWest",


    bodyParts: [

      "Respiratory System",
      "Skin",
      "Nervous System",

    ],


    karakatwa: [

      "Illusion",
      "Ambition",
      "Foreign Lands",
      "Technology",
      "Politics",
      "Mass Influence",
      "Innovation",
      "Unexpected Events",
      "Obsession",

    ],


    keywords: [

      "illusion",
      "ambition",
      "foreign",
      "technology",
      "innovation",
      "politics",
      "sudden change",
      "desire",

    ],


    description: {

      en:
        "Rahu represents ambition, illusion, foreign influence, technology, innovation and unexpected transformations.",

      hi:
        "राहु महत्वाकांक्षा, भ्रम, विदेश, तकनीक और अचानक परिवर्तन का कारक है।",

      ta:
        "ராகு ஆசை, மாயை, தொழில்நுட்பம் மற்றும் மாற்றங்களை குறிக்கிறது.",

      te:
        "రాహు ఆశయం, మాయ, సాంకేతికత మరియు మార్పులకు కారకుడు.",

      sa:
        "राहुः मायायाः अभिलाषायाः नूतनविज्ञानस्य च कारकः।",

      ne:
        "राहु महत्वाकांक्षा, प्रविधि, भ्रम र परिवर्तनको प्रतिनिधित्व गर्छ।",

    },

  },


  {
    id: "Ketu",

    name: {

      en: "Ketu",
      hi: "केतु",
      ta: "கேது",
      te: "కేతు",
      sa: "केतुः",
      ne: "केतु",

    },


    nature: "malefic",

    gender: "neutral",

    element: "fire",


    lordship: [],


    ownSigns: [],


    exaltation: "Vrischika",

    debilitation: "Vrishabha",

    mooltrikona: "Dhanu",


    friendlySigns: [

      "Mesha",
      "Karka",
      "Simha",
      "Vrischika",
      "Dhanu",
      "Meena",

    ],


    enemySigns: [

      "Vrishabha",
      "Mithuna",
      "Kanya",
      "Tula",

    ],


    neutralSigns: [

      "Makara",
      "Kumbha",

    ],


    color: "Smoke Grey",

    gemstone: "Cat's Eye",

    metal: "Mixed Metal",

    day: "Tuesday",

    direction: "northWest",


    bodyParts: [

      "Spine",
      "Feet",
      "Nervous System",

    ],


    karakatwa: [

      "Spirituality",
      "Liberation",
      "Detachment",
      "Intuition",
      "Past Life Karma",
      "Mysticism",
      "Research",
      "Occult",
      "Renunciation",

    ],


    keywords: [

      "moksha",
      "spirituality",
      "detachment",
      "intuition",
      "occult",
      "research",
      "karma",
      "liberation",

    ],


    description: {

      en:
        "Ketu represents spirituality, detachment, intuition, liberation, research and inner wisdom.",

      hi:
        "केतु आध्यात्मिकता, वैराग्य, अंतर्ज्ञान और मोक्ष का कारक है।",

      ta:
        "கேது ஆன்மிகம், பற்றின்மை மற்றும் விடுதலையை குறிக்கிறது.",

      te:
        "కేతు ఆధ్యాత్మికత, వైరాగ్యం మరియు మోక్షానికి కారకుడు.",

      sa:
        "केतुः मोक्षस्य वैराग्यस्य आध्यात्मिकज्ञानस्य च कारकः।",

      ne:
        "केतु आध्यात्मिकता, वैराग्य र अन्तर्ज्ञानको प्रतिनिधित्व गर्छ।",

    },

  },

];
//////////////////////////////////////////////////////////////
// PLANET METADATA ACCESS LAYER
//////////////////////////////////////////////////////////////


export function getPlanetMetadata(
  planetId: string
): PlanetMetadata {


  const planet =
    PLANETS.find(
      (item) =>
        item.id === planetId
    );


  if (!planet) {

    throw new Error(
      `Unknown planet metadata: ${planetId}`
    );

  }


  return planet;

}



//////////////////////////////////////////////////////////////
// GET ALL PLANET DATA
//////////////////////////////////////////////////////////////


export function getAllPlanetMetadata():

readonly PlanetMetadata[] {


  return PLANETS;

}



//////////////////////////////////////////////////////////////
// CHECK PLANET EXISTENCE
//////////////////////////////////////////////////////////////


export function hasPlanetMetadata(
  planetId: string
): boolean {


  return PLANETS.some(

    (item) =>
      item.id === planetId

  );


}



//////////////////////////////////////////////////////////////
// GET PLANET KEYWORDS
//////////////////////////////////////////////////////////////


export function getPlanetKeywords(
  planetId: string
): string[] {


  const planet =
    getPlanetMetadata(
      planetId
    );


  return planet.keywords;

}



//////////////////////////////////////////////////////////////
// GET PLANET NATURE
//////////////////////////////////////////////////////////////


export function getPlanetNature(
  planetId: string
): PlanetNature {


  const planet =
    getPlanetMetadata(
      planetId
    );


  return planet.nature;

}



//////////////////////////////////////////////////////////////
// GET PLANET DESCRIPTION
//////////////////////////////////////////////////////////////


export function getPlanetDescription(
  planetId: string,
  language:
    keyof PlanetMetadata["description"] = "en"
) {


  const planet =
    getPlanetMetadata(
      planetId
    );


  return (

    planet.description[language]

    ||

    planet.description.en

  );


}