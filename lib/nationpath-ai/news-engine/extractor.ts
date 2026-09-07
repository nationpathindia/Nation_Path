import nlp from 'compromise';

export interface ExtractedData {
  people: string[];
  places: string[];
  organizations: string[];
  dates: string[];
  money: string[];
  keyNumbers: string[];
}

export function extractDeepData(text: string): ExtractedData {
  const doc = nlp(text);

  // Extracting core entities
  const people = doc.people().out('array') as string[];
  const places = doc.places().out('array') as string[];
  const organizations = doc.organizations().out('array') as string[];

  // Extracting hard facts (Numbers, Dates, Money)
  // Type cast to 'any' to bypass strict NLP library type errors
  const dates = (doc as any).dates()?.out('array') as string[] || [];
  const money = (doc as any).money()?.out('array') as string[] || [];
  
  // Agar niche aur kahin doc.numbers() ya doc.people() use ho raha hai, 
  // toh unko bhi (doc as any) kar dena
  
  // Extracting standalone important numbers (e.g., "32,000 kg")
  const keyNumbers = (text.match(/\b\d{1,3}(?:,\d{3})*(?:\.\d+)?\b/g) || []).slice(0, 5);

  // Remove duplicates and clean up
  return {
    people: [...new Set(people)],
    places: [...new Set(places)],
    organizations: [...new Set(organizations)],
    dates: [...new Set(dates)],
    money: [...new Set(money)],
    keyNumbers: [...new Set(keyNumbers)]
  };
}