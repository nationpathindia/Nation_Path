import cron from 'node-cron';
import { fetchAndIngestRSS } from '@/lib/ingestion/rss-service';

console.log('🕒 Initializing NationPath RSS Cron Jobs (IST Timezone)...');

// ✅ RUN IMMEDIATELY ON STARTUP (Taaki hum abhi test kar sakein)
console.log('⚡ Running initial fetch immediately...');
fetchAndIngestRSS().then(() => {
  console.log('✅ Initial fetch complete. Starting schedule...');
});

// 1. DAYTIME CRON: Every 30 minutes from 6:00 AM to 10:30 PM IST
cron.schedule('*/30 6-22 * * *', async () => {
  console.log(`\n🌞 [Daytime Cron] Triggered at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);
  await fetchAndIngestRSS();
}, {
  timezone: 'Asia/Kolkata',
});

// 2. NIGHTTIME CRON: Every 2 hours from 11:00 PM to 5:00 AM IST
cron.schedule('0 23,1,3,5 * * *', async () => {
  console.log(`\n🌙 [Nighttime Cron] Triggered at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);
  await fetchAndIngestRSS();
}, {
  timezone: 'Asia/Kolkata',
});

console.log('✅ Cron jobs are now running in the background.');
console.log('Press Ctrl+C to stop.');