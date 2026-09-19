import fs from 'fs';
import { seedCareers } from '../backend/src/data/seedData.js';

const mockContent = fs.readFileSync('./frontend/src/lib/mock-data.js', 'utf8');
const regex = /id:\s*["']([^"']+)["']/g;
let match;
const mockIds = [];
while ((match = regex.exec(mockContent)) !== null) {
  mockIds.push(match[1]);
}
console.log('Mock IDs count:', mockIds.length);
console.log('Seed IDs count:', seedCareers.length);
let mismatch = 0;
for (let i = 0; i < seedCareers.length; i++) {
  if (seedCareers[i].id !== mockIds[i]) {
    console.log('Mismatch at', i, seedCareers[i].id, 'vs', mockIds[i]);
    mismatch++;
  }
}
if (mismatch === 0) console.log('Exact 1:1 ID and order match between seedData and mock-data!');
