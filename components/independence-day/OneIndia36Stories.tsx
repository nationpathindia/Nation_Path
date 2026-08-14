"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Flag,
  Map,
  MapPin,
  Sparkles,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type Region = "State" | "Union Territory";

type IndiaRegion = {
  name: string;
  shortName: string;
  region: Region;

  identity: string;
  story: string;
  people: string;
  landscape: string;
  character: string;
  image: string;

  capital: string;
  languages: string;
  area: string;

  leadershipLabel:
    | "Chief Minister"
    | "Lieutenant Governor"
    | "Administrator";

  leadershipName: string;
};

const regions: IndiaRegion[] = [
  {
    name: "Andhra Pradesh",
    shortName: "AP",
    region: "State",
    identity: "Coastlines · faith · movement",
    story:
      "A long eastern coastline, ancient pilgrimage centres and growing cities shape a state where tradition and development continue to move together.",
    people: "Coastal communities · farmers · entrepreneurs",
    landscape: "Eastern coast · rivers · hills",
    character: "Open to the sea, rooted in tradition.",
    image:
      "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1600&q=80",
    capital: "Amaravati",
    languages: "Telugu · Urdu · English",
    area: "162,968 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "N. Chandrababu Naidu",
  },

  {
    name: "Arunachal Pradesh",
    shortName: "AR",
    region: "State",
    identity: "Mountains · rivers · frontiers",
    story:
      "India's eastern frontier rises through mountains, forests and river valleys, carrying extraordinary cultural diversity across a vast landscape.",
    people: "Tribal communities · mountain communities",
    landscape: "Eastern Himalayas · forests · valleys",
    character: "Remote, resilient and deeply connected to nature.",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=80",
    capital: "Itanagar",
    languages: "English · Hindi · Nyishi and other tribal languages",
    area: "83,743 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "Pema Khandu",
  },

  {
    name: "Assam",
    shortName: "AS",
    region: "State",
    identity: "Rivers · tea · biodiversity",
    story:
      "The Brahmaputra gives Assam a powerful geographic identity, while tea gardens, forests and living traditions give it a distinctive cultural rhythm.",
    people: "Tea communities · farmers · diverse ethnic groups",
    landscape: "Brahmaputra valley · tea country · forests",
    character: "A meeting point of river, culture and wilderness.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    capital: "Dispur",
    languages: "Assamese · Bodo · Bengali · English",
    area: "78,438 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "Himanta Biswa Sarma",
  },

  {
    name: "Bihar",
    shortName: "BR",
    region: "State",
    identity: "Civilisations · learning · resilience",
    story:
      "From ancient centres of learning to the fertile plains of the Ganga, Bihar carries layers of India's intellectual, spiritual and political history.",
    people: "Farmers · students · workers · entrepreneurs",
    landscape: "Ganga plains · fertile farmland",
    character: "Ancient in memory, ambitious in motion.",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80",
    capital: "Patna",
    languages: "Hindi · Urdu · Maithili · Bhojpuri · Magahi",
    area: "94,163 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "Samrat Choudhary",
  },

  {
    name: "Chhattisgarh",
    shortName: "CG",
    region: "State",
    identity: "Forests · minerals · tribal heritage",
    story:
      "Dense forests, mineral wealth and vibrant tribal traditions define a state balancing industrial development with deep ecological and cultural roots.",
    people: "Tribal communities · farmers · workers",
    landscape: "Forests · plateaus · rivers",
    character: "Resource-rich and culturally grounded.",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80",
    capital: "Raipur",
    languages: "Hindi · Chhattisgarhi · Gondi",
    area: "135,192 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "Vishnu Deo Sai",
  },

  {
    name: "Goa",
    shortName: "GA",
    region: "State",
    identity: "Coast · culture · openness",
    story:
      "Small in size but expansive in character, Goa brings together coastal life, layered history, music, food and a globally recognised tourism culture.",
    people: "Coastal communities · artists · hospitality workers",
    landscape: "Arabian Sea · beaches · green interiors",
    character: "Easy-going, outward-looking and culturally layered.",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=80",
    capital: "Panaji",
    languages: "Konkani · Marathi · Hindi · English",
    area: "3,702 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "Pramod Sawant",
  },

  {
    name: "Gujarat",
    shortName: "GJ",
    region: "State",
    identity: "Enterprise · coastlines · movement",
    story:
      "A long trading tradition, industrial centres, ports and entrepreneurial communities have made movement and enterprise central to Gujarat's story.",
    people: "Entrepreneurs · artisans · farmers · traders",
    landscape: "Arabian coast · salt plains · drylands",
    character: "Restless, enterprising and connected.",
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1600&q=80",
    capital: "Gandhinagar",
    languages: "Gujarati · Hindi · English",
    area: "196,024 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "Bhupendra Patel",
  },

  {
    name: "Haryana",
    shortName: "HR",
    region: "State",
    identity: "Agriculture · sport · ambition",
    story:
      "The fertile plains around Delhi have evolved from an agricultural heartland into a major centre of industry, sport and modern enterprise.",
    people: "Farmers · athletes · entrepreneurs",
    landscape: "Plains · agricultural belts · expanding cities",
    character: "Competitive, confident and forward-moving.",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1600&q=80",
    capital: "Chandigarh",
    languages: "Hindi · Haryanvi · Punjabi · English",
    area: "44,212 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "Nayab Singh Saini",
  },

  {
    name: "Himachal Pradesh",
    shortName: "HP",
    region: "State",
    identity: "Mountains · rivers · resilience",
    story:
      "Himalayan valleys, forests and mountain communities create a state where life is shaped by altitude, seasons and a close relationship with the landscape.",
    people: "Mountain communities · farmers · service workers",
    landscape: "Himalayas · valleys · forests",
    character: "Quiet strength shaped by the mountains.",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80",
    capital: "Shimla",
    languages: "Hindi · Pahari languages · English",
    area: "55,673 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "Sukhvinder Singh Sukhu",
  },

  {
    name: "Jharkhand",
    shortName: "JH",
    region: "State",
    identity: "Forests · minerals · indigenous cultures",
    story:
      "Jharkhand's identity is deeply connected to forests, mineral resources and the many indigenous communities whose traditions remain central to its character.",
    people: "Adivasi communities · miners · farmers",
    landscape: "Plateaus · forests · waterfalls",
    character: "Grounded, resourceful and fiercely rooted.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
    capital: "Ranchi",
    languages: "Hindi · Santali · Mundari · Ho · Nagpuri",
    area: "79,716 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "Hemant Soren",
  },

  {
    name: "Karnataka",
    shortName: "KA",
    region: "State",
    identity: "Technology · heritage · innovation",
    story:
      "Historic kingdoms, coffee hills, coastal cultures and Bengaluru's technology economy make Karnataka one of India's most varied modern stories.",
    people: "Technologists · farmers · artists · entrepreneurs",
    landscape: "Western Ghats · plateau · coast",
    character: "Where heritage meets invention.",
    image:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1600&q=80",
    capital: "Bengaluru",
    languages: "Kannada · Tulu · Konkani · Urdu · English",
    area: "191,791 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "D. K. Shivakumar",
  },

  {
    name: "Kerala",
    shortName: "KL",
    region: "State",
    identity: "Water · knowledge · migration",
    story:
      "Backwaters, high literacy, strong public institutions and a long history of migration give Kerala a story shaped by people, knowledge and the world beyond its shores.",
    people: "Educators · healthcare workers · migrants · farmers",
    landscape: "Backwaters · coast · Western Ghats",
    character: "Connected, literate and globally minded.",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80",
    capital: "Thiruvananthapuram",
    languages: "Malayalam · English · Tamil",
    area: "38,863 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "V. D. Satheesan",
  },

  {
    name: "Madhya Pradesh",
    shortName: "MP",
    region: "State",
    identity: "Heartland · forests · heritage",
    story:
      "At the geographic heart of India, Madhya Pradesh brings together forests, rivers, ancient architecture and some of the country's richest wildlife landscapes.",
    people: "Farmers · forest communities · artisans",
    landscape: "Plateaus · forests · rivers",
    character: "A quiet centre holding many Indias together.",
    image:
      "https://images.unsplash.com/photo-1532664189809-02133fee698d?auto=format&fit=crop&w=1600&q=80",
    capital: "Bhopal",
    languages: "Hindi · Bundeli · Malvi · Nimadi",
    area: "308,252 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "Mohan Yadav",
  },

  {
    name: "Maharashtra",
    shortName: "MH",
    region: "State",
    identity: "Cities · cinema · enterprise",
    story:
      "Mumbai's global energy, Pune's knowledge economy, powerful industrial centres and deep cultural traditions give Maharashtra enormous economic and cultural influence.",
    people: "Workers · entrepreneurs · artists · farmers",
    landscape: "Western Ghats · Deccan plateau · coast",
    character: "Ambitious, diverse and relentlessly active.",
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1600&q=80",
    capital: "Mumbai",
    languages: "Marathi · Hindi · English",
    area: "307,713 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "Devendra Fadnavis",
  },

  {
    name: "Manipur",
    shortName: "MN",
    region: "State",
    identity: "Sport · arts · resilience",
    story:
      "The valley and surrounding hills carry distinctive traditions in dance, sport, craft and community life, shaped by a strong sense of cultural identity.",
    people: "Athletes · artists · farmers · communities",
    landscape: "Valleys · hills · lakes",
    character: "Resilient, expressive and proud of its traditions.",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=80",
    capital: "Imphal",
    languages: "Meitei (Manipuri) · English · tribal languages",
    area: "22,327 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "Yumnam Khemchand Singh",
  },

  {
    name: "Meghalaya",
    shortName: "ML",
    region: "State",
    identity: "Clouds · forests · living traditions",
    story:
      "Rain-soaked hills, living root bridges and distinctive indigenous cultures make Meghalaya one of India's most striking landscapes.",
    people: "Khasi · Jaintia · Garo communities",
    landscape: "Cloud-covered hills · waterfalls · forests",
    character: "Green, communal and deeply ecological.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
    capital: "Shillong",
    languages: "English · Khasi · Garo",
    area: "22,429 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "Conrad K. Sangma",
  },

  {
    name: "Mizoram",
    shortName: "MZ",
    region: "State",
    identity: "Hills · community · music",
    story:
      "A mountainous state with strong community traditions, Mizoram's identity is shaped by close-knit social life, music and an intimate relationship with its hills.",
    people: "Mizo communities · farmers · musicians",
    landscape: "Hills · forests · valleys",
    character: "Community-first, musical and resilient.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    capital: "Aizawl",
    languages: "Mizo · English · Hindi",
    area: "21,081 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "Lalduhoma",
  },

  {
    name: "Nagaland",
    shortName: "NL",
    region: "State",
    identity: "Tribes · music · identity",
    story:
      "Nagaland's many communities carry distinct languages, traditions, crafts and festivals, creating a cultural landscape unlike any other part of India.",
    people: "Naga communities · farmers · artists",
    landscape: "Hills · forests · villages",
    character: "Distinctive, proud and culturally vibrant.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
    capital: "Kohima",
    languages: "English · Nagamese · Naga languages",
    area: "16,579 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "Neiphiu Rio",
  },

  {
    name: "Odisha",
    shortName: "OD",
    region: "State",
    identity: "Temples · coast · craftsmanship",
    story:
      "Ancient temples, classical dance, maritime traditions and a powerful craft culture connect Odisha's past with its evolving present.",
    people: "Artisans · farmers · fisher communities",
    landscape: "Eastern coast · plains · forests",
    character: "A civilisation expressed through craft and devotion.",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80",
    capital: "Bhubaneswar",
    languages: "Odia · Hindi · English",
    area: "155,707 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "Mohan Charan Majhi",
  },

  {
    name: "Punjab",
    shortName: "PB",
    region: "State",
    identity: "Agriculture · service · spirit",
    story:
      "The fertile plains of Punjab have shaped India's agricultural story, while its traditions of service, music and community continue to travel far beyond its borders.",
    people: "Farmers · soldiers · entrepreneurs · artists",
    landscape: "Fertile plains · rivers · farmland",
    character: "Generous, energetic and community-minded.",
    image:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1600&q=80",
    capital: "Chandigarh",
    languages: "Punjabi · Hindi · English",
    area: "50,362 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "Bhagwant Mann",
  },

  {
    name: "Rajasthan",
    shortName: "RJ",
    region: "State",
    identity: "Heritage · desert · resilience",
    story:
      "Fortified cities, desert landscapes, crafts and centuries of trading culture give Rajasthan one of India's most recognisable identities.",
    people: "Artisans · farmers · traders · performers",
    landscape: "Thar Desert · Aravallis · historic cities",
    character: "Grand in memory, resilient in spirit.",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=80",
    capital: "Jaipur",
    languages: "Hindi · Rajasthani dialects · English",
    area: "342,239 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "Bhajan Lal Sharma",
  },

  {
    name: "Sikkim",
    shortName: "SK",
    region: "State",
    identity: "Mountains · ecology · harmony",
    story:
      "A small Himalayan state with extraordinary biodiversity, Sikkim has built a distinctive identity around mountain culture and ecological awareness.",
    people: "Mountain communities · farmers · hospitality workers",
    landscape: "Himalayas · valleys · forests",
    character: "Small in scale, immense in landscape.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
    capital: "Gangtok",
    languages: "Nepali · Sikkimese (Bhutia) · Lepcha · English",
    area: "7,096 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "Prem Singh Tamang",
  },

  {
    name: "Tamil Nadu",
    shortName: "TN",
    region: "State",
    identity: "Language · industry · civilisation",
    story:
      "Ancient Tamil culture, monumental temples, literature and a powerful industrial economy make Tamil Nadu a bridge between deep history and modern production.",
    people: "Engineers · workers · farmers · artists",
    landscape: "Coast · plains · hills",
    character: "Ancient in language, modern in ambition.",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80",
    capital: "Chennai",
    languages: "Tamil · English · Telugu",
    area: "130,058 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "C. Joseph Vijay",
  },

  {
    name: "Telangana",
    shortName: "TG",
    region: "State",
    identity: "Heritage · technology · transformation",
    story:
      "Hyderabad's history and technology economy sit alongside Deccan traditions, crafts and rural communities in a state shaped by rapid transformation.",
    people: "Technologists · farmers · artisans · entrepreneurs",
    landscape: "Deccan plateau · lakes · cities",
    character: "Tradition with a distinctly modern pulse.",
    image:
      "https://images.unsplash.com/photo-1565018054866-968e30b0a4b6?auto=format&fit=crop&w=1600&q=80",
    capital: "Hyderabad",
    languages: "Telugu · Urdu · Hindi · English",
    area: "112,077 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "A. Revanth Reddy",
  },

  {
    name: "Tripura",
    shortName: "TR",
    region: "State",
    identity: "Forests · culture · borderlands",
    story:
      "Tripura's forests, indigenous traditions and Bengali cultural influences create a distinctive northeastern identity shaped by geography and movement.",
    people: "Indigenous communities · farmers · artisans",
    landscape: "Hills · forests · plains",
    character: "Layered, green and quietly resilient.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
    capital: "Agartala",
    languages: "Bengali · Kokborok · English",
    area: "10,486 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "Manik Saha",
  },

  {
    name: "Uttar Pradesh",
    shortName: "UP",
    region: "State",
    identity: "Civilisation · faith · scale",
    story:
      "From the Ganga plains and ancient cities to modern industrial corridors, Uttar Pradesh contains extraordinary layers of India's history, faith and everyday life.",
    people: "Farmers · artisans · workers · students",
    landscape: "Ganga-Yamuna plains · rivers · cities",
    character: "Vast, complex and central to India's story.",
    image:
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1600&q=80",
    capital: "Lucknow",
    languages: "Hindi · Urdu · Awadhi · Braj",
    area: "240,928 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "Yogi Adityanath",
  },

  {
    name: "Uttarakhand",
    shortName: "UK",
    region: "State",
    identity: "Himalayas · rivers · pilgrimage",
    story:
      "Sacred rivers, Himalayan peaks, forests and mountain communities make Uttarakhand a landscape where ecology, spirituality and everyday life meet.",
    people: "Mountain communities · farmers · pilgrims · service workers",
    landscape: "Himalayas · valleys · forests",
    character: "Sacred, mountainous and ecologically vital.",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=80",
    capital: "Dehradun",
    languages: "Hindi · Garhwali · Kumaoni · English",
    area: "53,483 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "Pushkar Singh Dhami",
  },

  {
    name: "West Bengal",
    shortName: "WB",
    region: "State",
    identity: "Literature · culture · delta",
    story:
      "Kolkata's intellectual traditions, the Ganga-Brahmaputra delta, literature, cinema and art give West Bengal a powerful cultural presence.",
    people: "Artists · writers · workers · farmers",
    landscape: "Ganga delta · Sundarbans · hills",
    character: "Intellectual, artistic and deeply expressive.",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80",
    capital: "Kolkata",
    languages: "Bengali · Hindi · Nepali · English",
    area: "88,752 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "Suvendu Adhikari",
  },

  /* ---------------------------------------------------------------------- */
  /* UNION TERRITORIES                                                       */
  /* ---------------------------------------------------------------------- */

  {
    name: "Andaman and Nicobar Islands",
    shortName: "AN",
    region: "Union Territory",
    identity: "Islands · ocean · biodiversity",
    story:
      "An extraordinary island chain where tropical forests, coral seas and complex histories meet India's strategic relationship with the Indian Ocean.",
    people: "Island communities · fishers · service workers",
    landscape: "Islands · forests · coral seas",
    character: "Remote, oceanic and ecologically precious.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    capital: "Port Blair",
    languages: "Hindi · Bengali · Tamil · Telugu · Nicobarese",
    area: "8,249 km²",
    leadershipLabel: "Lieutenant Governor",
    leadershipName: "Admiral D. K. Joshi",
  },

  {
    name: "Chandigarh",
    shortName: "CH",
    region: "Union Territory",
    identity: "Design · planning · modern India",
    story:
      "Created as an expression of a new India, Chandigarh remains one of the country's most distinctive experiments in modern urban planning and design.",
    people: "Professionals · students · public servants",
    landscape: "Planned city · gardens · foothills",
    character: "Designed, ordered and forward-looking.",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1600&q=80",
    capital: "Chandigarh",
    languages: "Punjabi · Hindi · English",
    area: "114 km²",
    leadershipLabel: "Administrator",
    leadershipName: "Gulab Chand Kataria",
  },

  {
    name: "Dadra and Nagar Haveli and Daman and Diu",
    shortName: "DH",
    region: "Union Territory",
    identity: "Coast · forests · layered history",
    story:
      "A geographically varied union territory combining coastal towns, forested interiors and layers of indigenous, regional and colonial history.",
    people: "Tribal communities · workers · fisher communities",
    landscape: "Coast · forests · river valleys",
    character: "Small, varied and historically layered.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    capital: "Daman",
    languages: "Gujarati · Hindi · Marathi · English",
    area: "603 km²",
    leadershipLabel: "Administrator",
    leadershipName: "Praful K. Patel",
  },

  {
    name: "Delhi",
    shortName: "DL",
    region: "Union Territory",
    identity: "Power · migration · memory",
    story:
      "India's capital is a city where empires, democracy, migration, institutions and millions of everyday lives intersect.",
    people: "Migrants · professionals · workers · students",
    landscape: "Urban metropolis · Yamuna plain",
    character: "Restless, political and endlessly reinventing itself.",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1600&q=80",
    capital: "New Delhi",
    languages: "Hindi · Punjabi · Urdu · English",
    area: "1,483 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "Rekha Gupta",
  },

  {
    name: "Jammu and Kashmir",
    shortName: "JK",
    region: "Union Territory",
    identity: "Mountains · craft · resilience",
    story:
      "Mountain valleys, rich craft traditions and layered cultural histories make Jammu and Kashmir one of India's most visually and culturally distinctive regions.",
    people: "Artisans · farmers · traders · mountain communities",
    landscape: "Himalayan valleys · lakes · mountains",
    character: "Beautiful, complex and resilient.",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=80",
    capital: "Srinagar (summer) · Jammu (winter)",
    languages: "Kashmiri · Dogri · Urdu · Hindi · English",
    area: "42,241 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "Omar Abdullah",
  },

  {
    name: "Ladakh",
    shortName: "LA",
    region: "Union Territory",
    identity: "High mountains · monasteries · endurance",
    story:
      "High-altitude deserts, monasteries and resilient communities create a landscape where geography demands adaptation and preserves a remarkable cultural identity.",
    people: "Mountain communities · farmers · tourism workers",
    landscape: "High-altitude desert · Himalayas · valleys",
    character: "Sparse, spectacular and enduring.",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=80",
    capital: "Leh",
    languages: "Ladakhi · Balti · Hindi · English",
    area: "59,146 km²",
    leadershipLabel: "Lieutenant Governor",
    leadershipName: "Vinai Kumar Saxena",
  },

  {
    name: "Lakshadweep",
    shortName: "LD",
    region: "Union Territory",
    identity: "Coral islands · ocean · community",
    story:
      "A chain of coral islands in the Arabian Sea where island life, marine ecosystems and close-knit communities shape a world far removed from India's mainland rhythms.",
    people: "Island communities · fishers · hospitality workers",
    landscape: "Coral atolls · lagoons · Arabian Sea",
    character: "Ocean-bound, intimate and fragile.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    capital: "Kavaratti",
    languages: "Malayalam · Mahl · English",
    area: "32.69 km²",
    leadershipLabel: "Administrator",
    leadershipName: "Praful K. Patel",
  },

  {
    name: "Puducherry",
    shortName: "PY",
    region: "Union Territory",
    identity: "Coast · culture · confluence",
    story:
      "Puducherry carries a distinctive blend of Tamil culture, coastal life and French colonial influence, creating one of India's most recognisable urban identities.",
    people: "Residents · artisans · hospitality workers · artists",
    landscape: "Coast · heritage streets · villages",
    character: "A cultural confluence by the sea.",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80",
    capital: "Puducherry",
    languages: "Tamil · Telugu · Malayalam · French · English",
    area: "479 km²",
    leadershipLabel: "Chief Minister",
    leadershipName: "N. Rangaswamy",
  },
];

const PAGE_SIZE = 6;

const INDIA_OVERVIEW = {
  image:
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1800&q=85",
  title: "About India",
  subtitle: "One civilisation. Many journeys.",
  story:
    "India is not one single story. It is a living mosaic of languages, landscapes, faiths, food, festivals, ideas and communities — connected by a shared national journey.",
  detail:
    "From the Himalayas to the Indian Ocean, from the deserts of the west to the rainforests of the northeast, every region adds another layer to the idea of India.",
};

export default function OneIndia36Stories() {
  const [page, setPage] = useState(0);
  const [selectedRegion, setSelectedRegion] =
    useState<IndiaRegion | null>(null);

  const totalPages = Math.ceil(regions.length / PAGE_SIZE);

  const visibleRegions = useMemo(
    () =>
      regions.slice(
        page * PAGE_SIZE,
        page * PAGE_SIZE + PAGE_SIZE
      ),
    [page]
  );

  const startNumber = page * PAGE_SIZE + 1;

  const endNumber = Math.min(
    (page + 1) * PAGE_SIZE,
    regions.length
  );

  const selectRegion = (region: IndiaRegion) => {
    setSelectedRegion(region);
  };

  const changePage = (nextPage: number) => {
    setPage(nextPage);
    setSelectedRegion(null);
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF7F1] py-20 text-[#101827] sm:py-24">
      {/* BACKGROUND ATMOSPHERE */}

      <div className="pointer-events-none absolute -left-48 top-32 h-[420px] w-[420px] rounded-full bg-[#138808]/[0.045] blur-3xl" />

      <div className="pointer-events-none absolute -right-48 bottom-32 h-[420px] w-[420px] rounded-full bg-[#FF9933]/[0.055] blur-3xl" />

      <div className="pointer-events-none absolute left-1/2 top-[42%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#163C80]/[0.018] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* HEADER */}

        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-[#FF9933]" />

              <span className="text-[9px] font-black tracking-[0.28em] text-[#138808]">
                ONE NATION
              </span>

              <span className="h-1 w-1 rounded-full bg-[#163C80]/20" />

              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#101827]/30">
                India @ 80
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55 }}
              className="mt-4 whitespace-nowrap text-4xl font-black leading-none tracking-[-0.065em] text-[#163C80] sm:text-5xl md:text-6xl lg:text-[5.8rem]"
            >
              One India.
              <span className="text-[#D96F0A]">
                {" "}36 Stories.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mt-5 max-w-2xl text-sm leading-6 text-[#101827]/55 sm:text-base sm:leading-7"
            >
              One country. Thirty-six different identities.
              Explore the people, landscapes, cultures and
              character that make India feel like India.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-5 border-l border-[#101827]/10 pl-5 sm:pl-6"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-5xl font-black leading-none tracking-[-0.06em] text-[#163C80] sm:text-6xl">
                  36
                </span>

                <Map size={19} className="text-[#138808]" />
              </div>

              <p className="mt-2 text-[8px] font-black uppercase tracking-[0.2em] text-[#101827]/35">
                Regional stories
              </p>
            </div>

            <div className="h-10 w-px bg-[#101827]/10" />

            <div className="space-y-1 text-xs font-bold text-[#101827]/45">
              <p>
                <span className="text-[#163C80]">28</span>{" "}
                States
              </p>

              <p>
                <span className="text-[#138808]">08</span>{" "}
                Union Territories
              </p>
            </div>
          </motion.div>
        </div>

        {/* EXPLORER */}

        <div className="mt-14">
          <div className="flex items-end justify-between border-b border-[#101827]/10 pb-3">
            <div>
              <p className="text-[9px] font-black tracking-[0.25em] text-[#163C80]">
                01 / INDIA INDEX
              </p>

              <h3 className="mt-1.5 text-xl font-black tracking-[-0.03em] sm:text-2xl">
                Explore the stories
              </h3>
            </div>

            <div className="text-right">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#101827]/30">
                Showing
              </p>

              <p className="mt-1 text-xs font-black text-[#163C80]">
                {String(startNumber).padStart(2, "0")}–
                {String(endNumber).padStart(2, "0")} /{" "}
                {regions.length}
              </p>
            </div>
          </div>

          {/* TWO COLUMN AREA */}

          <div className="mt-5 grid gap-5 lg:grid-cols-[0.85fr_1.5fr]">
            {/* LEFT LIST */}

            <div className="overflow-hidden border border-[#101827]/10 bg-white/50 shadow-[0_16px_50px_rgba(16,24,39,0.035)]">
              <div className="grid grid-cols-1">
                {visibleRegions.map((item, index) => {
                  const absoluteIndex =
                    page * PAGE_SIZE + index;

                  const isSelected =
                    selectedRegion?.name === item.name;

                  return (
                    <motion.button
                      key={item.name}
                      type="button"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.035,
                      }}
                      whileHover={{
                        paddingLeft: 20,
                      }}
                      onClick={() => selectRegion(item)}
                      className={`group relative flex min-h-[74px] w-full items-center gap-3 border-b border-[#101827]/[0.08] px-4 text-left transition-all last:border-b-0 ${
                        isSelected
                          ? "bg-[#163C80]/[0.045]"
                          : "hover:bg-white"
                      }`}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="activeRegion"
                          className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#FF9933] via-white to-[#138808]"
                        />
                      )}

                      <span
                        className={`w-7 shrink-0 text-[9px] font-black tabular-nums ${
                          isSelected
                            ? "text-[#D96F0A]"
                            : "text-[#101827]/25"
                        }`}
                      >
                        {String(absoluteIndex + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <div className="min-w-0 flex-1">
                        <p
                          className={`truncate text-sm font-black tracking-[-0.02em] ${
                            isSelected
                              ? "text-[#163C80]"
                              : "text-[#101827]/75 group-hover:text-[#163C80]"
                          }`}
                        >
                          {item.name}
                        </p>

                        <p
                          className={`mt-1 truncate text-[9px] font-semibold ${
                            isSelected
                              ? "text-[#D96F0A]"
                              : "text-[#101827]/35"
                          }`}
                        >
                          {item.identity}
                        </p>
                      </div>

                      <span
                        className={`text-[8px] font-black tracking-[0.12em] ${
                          isSelected
                            ? "text-[#138808]"
                            : "text-[#101827]/20"
                        }`}
                      >
                        {item.shortName}
                      </span>

                      <ChevronRight
                        size={14}
                        className={`shrink-0 transition-transform ${
                          isSelected
                            ? "translate-x-0.5 text-[#163C80]"
                            : "text-[#101827]/20 group-hover:translate-x-0.5 group-hover:text-[#163C80]"
                        }`}
                      />
                    </motion.button>
                  );
                })}
              </div>

              {/* PAGINATION */}

              <div className="flex items-center justify-between border-t border-[#101827]/10 bg-[#FAF7F1] px-4 py-3">
                <button
                  type="button"
                  disabled={page === 0}
                  onClick={() => changePage(page - 1)}
                  className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.15em] text-[#163C80] transition-opacity disabled:pointer-events-none disabled:opacity-20"
                >
                  <ArrowLeft size={13} />
                  Previous
                </button>

                <div className="flex items-center gap-1.5">
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index
                  ).map((index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => changePage(index)}
                      className={`h-7 min-w-7 px-2 text-[9px] font-black transition-all ${
                        page === index
                          ? "bg-[#163C80] text-white shadow-sm"
                          : "text-[#101827]/35 hover:bg-[#163C80]/5 hover:text-[#163C80]"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  disabled={page === totalPages - 1}
                  onClick={() => changePage(page + 1)}
                  className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.15em] text-[#163C80] transition-opacity disabled:pointer-events-none disabled:opacity-20"
                >
                  Next
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* RIGHT DETAIL PANEL */}

            <div className="relative min-h-[470px]">
              <AnimatePresence mode="wait">
                {selectedRegion ? (
                  <motion.article
                    key={`region-${selectedRegion.name}`}
                    initial={{
                      opacity: 0,
                      x: 30,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -20,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    className="group relative h-full min-h-[470px] overflow-hidden border border-[#163C80]/10 bg-[#FAF7F1] shadow-[0_24px_70px_rgba(16,24,39,0.08)]"
                  >
                    {/* BACKGROUND IMAGE */}

                    <motion.img
                      key={`image-${selectedRegion.name}`}
                      src={selectedRegion.image}
                      alt=""
                      aria-hidden="true"
                      initial={{
                        scale: 1.08,
                        opacity: 0,
                      }}
                      animate={{
                        scale: 1,
                        opacity: 0.34,
                      }}
                      transition={{
                        duration: 0.85,
                        ease: "easeOut",
                      }}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] group-hover:scale-[1.025]"
                    />

                    {/* IMAGE DEPTH */}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F1]/95 via-[#FAF7F1]/35 to-transparent" />

                    {/* TIRANGA IMAGE TONE */}

                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,153,51,0.40) 0%, rgba(255,255,255,0.52) 44%, rgba(255,255,255,0.42) 58%, rgba(19,136,8,0.34) 100%)",
                      }}
                    />

                    {/* SOFT PAPER VEIL */}

                    <div className="absolute inset-0 bg-[#FAF7F1]/25" />

                    {/* TRICOLOUR LIGHT */}

                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.08,
                      }}
                      className="absolute left-0 right-0 top-0 h-1 origin-left bg-gradient-to-r from-[#FF9933] via-white to-[#138808]"
                    />

                    {/* PREMIUM CORNER MARK */}

                    <div className="absolute right-0 top-0 h-24 w-24 overflow-hidden">
                      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full border border-white/40 bg-white/20 backdrop-blur-sm" />
                    </div>

                    {/* CONTENT */}

                    <div className="relative z-10 flex h-full min-h-[470px] flex-col p-6 sm:p-8 lg:p-10">
                      {/* TOP META */}

                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#138808]">
                            {selectedRegion.region}
                          </p>

                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="text-[9px] font-black tracking-[0.18em] text-[#D96F0A]">
                              {selectedRegion.shortName}
                            </span>

                            <span className="h-px w-6 bg-[#163C80]/15" />

                            <span className="text-[9px] font-black tracking-[0.18em] text-[#163C80]/35">
                              INDIA @ 80
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedRegion(null)
                          }
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#163C80]/10 bg-white/65 text-[#163C80]/55 shadow-sm backdrop-blur-md transition hover:bg-white hover:text-[#163C80]"
                          aria-label="Back to About India"
                        >
                          <X size={15} />
                        </button>
                      </div>

                      {/* TITLE */}

                      <div className="mt-7">
                        <div className="flex items-start gap-4">
                          <motion.div
                            initial={{
                              scale: 0.85,
                              opacity: 0,
                            }}
                            animate={{
                              scale: 1,
                              opacity: 1,
                            }}
                            transition={{
                              duration: 0.45,
                            }}
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#FF9933]/20 bg-white/65 text-[#D96F0A] shadow-sm backdrop-blur-md"
                          >
                            <Sparkles size={19} />
                          </motion.div>

                          <div className="min-w-0">
                            <h3 className="text-3xl font-black leading-[0.95] tracking-[-0.05em] text-[#163C80] sm:text-4xl lg:text-5xl">
                              {selectedRegion.name}
                            </h3>

                            <p className="mt-2 text-xs font-black tracking-wide text-[#D96F0A]">
                              {selectedRegion.identity}
                            </p>

                            {/* PREMIUM QUICK META */}

                            <div className="mt-3 flex flex-wrap items-center gap-2">
                              <span className="rounded-full border border-[#163C80]/10 bg-white/55 px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-[#163C80]/55 backdrop-blur-sm">
                                {selectedRegion.region}
                              </span>

                              <span className="rounded-full border border-[#138808]/10 bg-white/55 px-2.5 py-1 text-[8px] font-black tracking-[0.08em] text-[#138808]/70 backdrop-blur-sm">
                                Capital · {selectedRegion.capital}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* STORY */}

                      <div className="mt-6 max-w-2xl">
                        <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#163C80]/40">
                          The Story
                        </p>

                        <p className="mt-2 text-sm font-semibold leading-6 text-[#101827]/75 sm:text-base sm:leading-7">
                          {selectedRegion.story}
                        </p>
                      </div>

                      {/* PREMIUM FACT GRID */}

                      <div className="mt-6 border-t border-[#163C80]/10 pt-5">
                        <div className="grid gap-x-5 gap-y-5 sm:grid-cols-3">
                          {/* CAPITAL */}

                          <div>
                            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#163C80]/40">
                              Capital
                            </p>

                            <p className="mt-1.5 text-[11px] font-black leading-5 text-[#163C80]">
                              {selectedRegion.capital}
                            </p>
                          </div>

                          {/* LANGUAGES */}

                          <div>
                            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#D96F0A]">
                              Languages
                            </p>

                            <p className="mt-1.5 text-[10px] font-semibold leading-5 text-[#101827]/65">
                              {selectedRegion.languages}
                            </p>
                          </div>

                          {/* AREA */}

                          <div>
                            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#138808]">
                              Area
                            </p>

                            <p className="mt-1.5 text-[11px] font-black leading-5 text-[#101827]/70">
                              {selectedRegion.area}
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 grid gap-x-5 gap-y-5 border-t border-[#163C80]/[0.07] pt-5 sm:grid-cols-3">
                          {/* LEADERSHIP */}

                          <div>
                            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#D96F0A]">
                              {selectedRegion.leadershipLabel}
                            </p>

                            <p className="mt-1.5 text-[10px] font-black leading-5 text-[#163C80]">
                              {selectedRegion.leadershipName}
                            </p>
                          </div>

                          {/* PEOPLE */}

                          <div>
                            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#138808]">
                              People
                            </p>

                            <p className="mt-1.5 text-[10px] font-semibold leading-5 text-[#101827]/60">
                              {selectedRegion.people}
                            </p>
                          </div>

                          {/* LANDSCAPE */}

                          <div>
                            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#163C80]">
                              Landscape
                            </p>

                            <p className="mt-1.5 text-[10px] font-semibold leading-5 text-[#101827]/60">
                              {selectedRegion.landscape}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* CHARACTER */}

                      <div className="mt-5 rounded-xl border border-[#163C80]/[0.07] bg-white/35 px-4 py-3 backdrop-blur-sm">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 h-5 w-1 rounded-full bg-gradient-to-b from-[#FF9933] via-white to-[#138808]" />

                          <div>
                            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#163C80]/40">
                              Character
                            </p>

                            <p className="mt-1 text-[11px] font-bold leading-5 text-[#101827]/65">
                              {selectedRegion.character}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* FOOTER */}

                      <div className="mt-auto pt-5 flex items-center justify-between">
                        <span className="text-[8px] font-black uppercase tracking-[0.18em] text-[#163C80]/30">
                          One India · Many identities
                        </span>

                        <motion.div
                          animate={{
                            x: [0, 4, 0],
                            y: [0, -2, 0],
                          }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <ArrowUpRight
                            size={17}
                            className="text-[#D96F0A]"
                          />
                        </motion.div>
                      </div>
                    </div>
                  </motion.article>
                ) : (
                  /* ABOUT INDIA DEFAULT PANEL */

                  <motion.article
                    key="about-india"
                    initial={{
                      opacity: 0,
                      x: 20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -20,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: "easeOut",
                    }}
                    className="relative h-full min-h-[470px] overflow-hidden border border-[#163C80]/10 bg-[#FAF7F1] shadow-[0_24px_70px_rgba(16,24,39,0.08)]"
                  >
                    {/* INDIA IMAGE */}

                    <motion.img
                      src={INDIA_OVERVIEW.image}
                      alt=""
                      aria-hidden="true"
                      initial={{
                        scale: 1.06,
                        opacity: 0,
                      }}
                      animate={{
                        scale: 1,
                        opacity: 0.32,
                      }}
                      transition={{
                        duration: 1,
                        ease: "easeOut",
                      }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />

                    {/* IMAGE DEPTH */}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F1]/95 via-transparent to-[#FAF7F1]/20" />

                    {/* TIRANGA ATMOSPHERE */}

                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,153,51,0.40) 0%, rgba(255,255,255,0.54) 43%, rgba(255,255,255,0.42) 58%, rgba(19,136,8,0.34) 100%)",
                      }}
                    />

                    {/* SOFT LIGHT */}

                    <div className="absolute inset-0 bg-[#FAF7F1]/24" />

                    {/* DECORATIVE GLOW */}

                    <motion.div
                      animate={{
                        scale: [1, 1.06, 1],
                        opacity: [0.22, 0.32, 0.22],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#FF9933]/20 blur-3xl"
                    />

                    <motion.div
                      animate={{
                        scale: [1, 1.08, 1],
                        opacity: [0.18, 0.28, 0.18],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                      className="absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-[#138808]/20 blur-3xl"
                    />

                    {/* TRICOLOUR TOP */}

                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: 0.7,
                      }}
                      className="absolute left-0 right-0 top-0 h-1 origin-left bg-gradient-to-r from-[#FF9933] via-white to-[#138808]"
                    />

                    {/* CONTENT */}

                    <div className="relative z-10 flex h-full min-h-[470px] flex-col p-6 sm:p-8 lg:p-10">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#138808]">
                            INDIA @ 80
                          </p>

                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-[9px] font-black tracking-[0.18em] text-[#D96F0A]">
                              1947 → 2026
                            </span>

                            <span className="h-px w-6 bg-[#163C80]/15" />

                            <span className="text-[9px] font-black tracking-[0.18em] text-[#163C80]/35">
                              ONE NATION
                            </span>
                          </div>
                        </div>

                        <motion.div
                          whileHover={{
                            rotate: 8,
                            scale: 1.04,
                          }}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#163C80]/10 bg-white/60 text-[#163C80] shadow-sm backdrop-blur-md"
                        >
                          <Flag size={16} />
                        </motion.div>
                      </div>

                      <div className="mt-7">
                        <div className="flex items-start gap-4">
                          <motion.div
                            initial={{
                              scale: 0.85,
                              opacity: 0,
                            }}
                            animate={{
                              scale: 1,
                              opacity: 1,
                            }}
                            transition={{
                              duration: 0.5,
                              delay: 0.15,
                            }}
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#FF9933]/20 bg-white/65 text-[#D96F0A] shadow-sm backdrop-blur-md"
                          >
                            <MapPin size={19} />
                          </motion.div>

                          <div>
                            <h3 className="text-4xl font-black leading-[0.9] tracking-[-0.055em] text-[#163C80] sm:text-5xl">
                              {INDIA_OVERVIEW.title}
                            </h3>

                            <p className="mt-2 text-xs font-black tracking-wide text-[#D96F0A]">
                              {INDIA_OVERVIEW.subtitle}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-7 max-w-2xl">
                        <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#163C80]/40">
                          The Big Picture
                        </p>

                        <p className="mt-2 text-sm font-semibold leading-6 text-[#101827]/75 sm:text-base sm:leading-7">
                          {INDIA_OVERVIEW.story}
                        </p>

                        <p className="mt-3 text-[11px] font-medium leading-5 text-[#101827]/50">
                          {INDIA_OVERVIEW.detail}
                        </p>
                      </div>

                      {/* INDIA QUICK FACTS */}

                      <div className="mt-auto grid grid-cols-3 gap-4 border-t border-[#163C80]/10 pt-6">
                        <div>
                          <p className="text-2xl font-black tracking-[-0.05em] text-[#163C80]">
                            28
                          </p>

                          <p className="mt-1 text-[8px] font-black uppercase tracking-[0.18em] text-[#101827]/35">
                            States
                          </p>
                        </div>

                        <div>
                          <p className="text-2xl font-black tracking-[-0.05em] text-[#D96F0A]">
                            08
                          </p>

                          <p className="mt-1 text-[8px] font-black uppercase tracking-[0.18em] text-[#101827]/35">
                            Union Territories
                          </p>
                        </div>

                        <div>
                          <p className="text-2xl font-black tracking-[-0.05em] text-[#138808]">
                            36
                          </p>

                          <p className="mt-1 text-[8px] font-black uppercase tracking-[0.18em] text-[#101827]/35">
                            Regional stories
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex items-center justify-between">
                        <span className="text-[8px] font-black uppercase tracking-[0.18em] text-[#163C80]/30">
                          Select a region to begin the journey
                        </span>

                        <motion.div
                          animate={{
                            x: [0, 4, 0],
                          }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <ArrowUpRight
                            size={17}
                            className="text-[#D96F0A]"
                          />
                        </motion.div>
                      </div>
                    </div>
                  </motion.article>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* CLOSING */}

        <motion.div
          initial={{
            opacity: 0,
            y: 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.5,
          }}
          className="mt-12 border-t border-[#101827]/10 pt-8 text-center"
        >
          <p className="text-xl font-black tracking-[-0.03em] text-[#163C80] sm:text-2xl">
            Different journeys.
            <span className="text-[#D96F0A]">
              {" "}One India.
            </span>
          </p>

          <p className="mt-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#101827]/25">
            28 States · 8 Union Territories · One continuing
            story
          </p>
        </motion.div>
      </div>
    </section>
  );
}