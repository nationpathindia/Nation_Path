// lib/ingestion/rss-service.ts

import { prisma } from '@/lib/prisma';

// =====================================================
// SAFE STUB FOR BUILD
// Isme koi seeding logic nahi hai, sirf ek safe return value hai.
// =====================================================
export async function fetchAndIngestRSS() {
  console.log("RSS Ingestion triggered (Stub - Build Safe)");
  
  // Yahan koi database call ya loop nahi hona chahiye build ke time par
  return { 
    success: true, 
    added: 0, 
    message: "Ingestion service is running (Stub)" 
  };
}