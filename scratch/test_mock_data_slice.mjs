import fs from 'fs';

// Check where each career begins and ends in mock-data.js
const content = fs.readFileSync('./frontend/src/lib/mock-data.js', 'utf8');

// The careers array starts at `export const careers = [` and ends before `export const quizQuestions = [`
const careersStart = content.indexOf('export const careers = [');
const quizStart = content.indexOf('export const quizQuestions = [');

console.log('careersStart:', careersStart, 'quizStart:', quizStart);

const careersPart = content.slice(careersStart, quizStart);
console.log('careersPart length:', careersPart.length);
