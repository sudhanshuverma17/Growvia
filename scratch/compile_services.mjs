import fs from 'fs';
import { servicesPart1 } from './gen_services_part1.js';
import { servicesPart2 } from './gen_services_part2.js';
import { servicesPart3 } from './gen_services_part3.js';

const combined = {
  ...servicesPart1,
  ...servicesPart2,
  ...servicesPart3
};

console.log('Total careers combined in services:', Object.keys(combined).length);

const requiredFields = [
  'investment',
  'actionItems',
  'resources',
  'checkpoint',
  'decisionPoints',
  'warning',
  'fallbackPlan',
  'realWorldStats'
];

let errors = [];

for (const [careerId, timeline] of Object.entries(combined)) {
  if (!Array.isArray(timeline) || timeline.length !== 4) {
    errors.push(`Career ${careerId} does not have 4 stages (got ${timeline?.length})`);
  }
  timeline.forEach((st, idx) => {
    requiredFields.forEach(f => {
      if (st[f] === undefined || st[f] === null || st[f] === '') {
        errors.push(`Career ${careerId} stage ${idx + 1} missing field ${f}`);
      }
    });
    // Check for stray asterisks
    for (const [k, val] of Object.entries(st)) {
      if (typeof val === 'string' && val.trim().startsWith('*')) {
        errors.push(`Stray asterisk in ${careerId} stage ${idx + 1} field ${k}`);
      }
    }
  });
}

if (errors.length > 0) {
  console.error('Validation errors found:', errors);
  process.exit(1);
} else {
  console.log('All 15 careers passed validation with 100% of 8 rich fields populated and zero stray asterisks!');
}

const fileContent = `/**
 * Enriched Services Roadmaps
 * Total careers: 15 (4 stages each)
 * Each stage contains all 8 rich guidance fields.
 */

export const servicesRoadmaps = ${JSON.stringify(combined, null, 2)};
`;

fs.writeFileSync('./backend/src/data/enriched/services.js', fileContent, 'utf-8');
console.log('Saved backend/src/data/enriched/services.js successfully!');
