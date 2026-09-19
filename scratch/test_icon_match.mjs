import fs from 'fs';
import { seedCareers } from '../backend/src/data/seedData.js';

const mockContent = fs.readFileSync('./frontend/src/lib/mock-data.js', 'utf8');
const header = mockContent.slice(0, mockContent.indexOf('export const careers = ['));
const tail = mockContent.slice(mockContent.indexOf('export const quizQuestions = ['));

console.log('Header length:', header.length);
console.log('Tail length:', tail.length);

// Verify icon names match between seedCareers and mock-data
const iconMatches = mockContent.slice(470, 167526).match(/icon:\s*([A-Za-z0-9_]+)/g).map(m => m.split(':')[1].trim());

let allMatch = true;
seedCareers.forEach((c, idx) => {
  if (c.icon !== iconMatches[idx]) {
    console.log('Icon mismatch at', idx, c.id, c.icon, 'vs', iconMatches[idx]);
    allMatch = false;
  }
});
console.log('All 48 icons match exactly between seedData and mock-data:', allMatch);
