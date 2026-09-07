import { processIngestion } from '@/lib/nationpath-ai/news-engine';
import { generateNewsIntelligence } from '@/lib/nationpath-ai/news-engine/generator';

async function testAI() {
  console.log('🧪 Testing Module 1: Ingestion Engine...');
  
  const testTitle = "FSSAI takes action against CG Foods in Ajmer";
  const testContent = "The Food Safety and Standards Authority of India has directed CG Foods India Pvt Ltd to stop production...";
  
  try {
    const result = await processIngestion(testTitle, testContent, []);
    console.log('✅ Module 1 Result:', result);
  } catch (error) {
    console.error(' Module 1 Error:', error);
  }
  
  console.log('\n🧪 Testing Module 2: Generation Engine...');
  
  try {
    const intelligence = await generateNewsIntelligence(testTitle, testContent);
    console.log('✅ Module 2 Result:', intelligence);
  } catch (error) {
    console.error('❌ Module 2 Error:', error);
  }
}

testAI();