import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });

import { seedCareers } from '../backend/src/data/seedData.js';
import { sampleCharteredAccountant, sampleCivilServices, sampleDoctor } from '../backend/src/data/sampleEnrichedRoadmaps.js';
import { technologyRoadmaps } from '../backend/src/data/enriched/technology.js';
import { businessRoadmaps } from '../backend/src/data/enriched/business.js';
import { healthcareRoadmaps } from '../backend/src/data/enriched/healthcare.js';
import { creativeRoadmaps } from '../backend/src/data/enriched/creative.js';
import { servicesRoadmaps } from '../backend/src/data/enriched/services.js';

async function syncAll() {
  console.log('--- Step 1: Assembling Master Enriched Timelines ---');
  const masterRoadmaps = new Map();

  const engineerCareer = seedCareers.find(c => c.id === 'engineer');
  masterRoadmaps.set('engineer', engineerCareer.timeline);
  masterRoadmaps.set('chartered-accountant', sampleCharteredAccountant.timeline);
  masterRoadmaps.set('civil-services', sampleCivilServices.timeline);
  masterRoadmaps.set('doctor', sampleDoctor.timeline);

  for (const [k, v] of Object.entries(technologyRoadmaps)) masterRoadmaps.set(k, v);
  for (const [k, v] of Object.entries(businessRoadmaps)) masterRoadmaps.set(k, v);
  for (const [k, v] of Object.entries(healthcareRoadmaps)) masterRoadmaps.set(k, v);
  for (const [k, v] of Object.entries(creativeRoadmaps)) masterRoadmaps.set(k, v);
  for (const [k, v] of Object.entries(servicesRoadmaps)) masterRoadmaps.set(k, v);

  console.log(`Loaded ${masterRoadmaps.size} enriched roadmaps in master dictionary.`);
  if (masterRoadmaps.size !== 48) {
    throw new Error(`Expected 48 roadmaps, but got ${masterRoadmaps.size}`);
  }

  // Pre-check all 48 have all 8 rich fields
  const richFields = ['investment', 'actionItems', 'resources', 'checkpoint', 'decisionPoints', 'warning', 'fallbackPlan', 'realWorldStats'];
  masterRoadmaps.forEach((timeline, id) => {
    timeline.forEach((st, idx) => {
      richFields.forEach(f => {
        if (!st[f]) throw new Error(`Career ${id} stage ${idx + 1} missing field ${f}`);
      });
      for (const [k, val] of Object.entries(st)) {
        if (typeof val === 'string' && val.trim().startsWith('*')) {
          throw new Error(`Stray asterisk in ${id} stage ${idx + 1} field ${k}`);
        }
      }
    });
  });
  console.log('All 48 roadmaps verified: 100% of 8 rich fields present, 0 stray asterisks.');

  console.log('\n--- Step 2: Updating MongoDB Atlas ---');
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not set in backend/.env');
  }
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB Atlas.');

  const Course = mongoose.models.Course || mongoose.model('Course', new mongoose.Schema({
    id: String,
    title: String,
    timeline: Array
  }, { collection: 'courses', strict: false }));

  let dbUpdatedCount = 0;
  for (const [id, timeline] of masterRoadmaps.entries()) {
    const updated = await Course.findOneAndUpdate(
      { id },
      { $set: { timeline } },
      { new: true }
    );
    if (!updated) {
      console.warn(`WARNING: Course with id '${id}' not found in MongoDB!`);
    } else {
      dbUpdatedCount++;
    }
  }
  console.log(`MongoDB Atlas updated successfully: ${dbUpdatedCount} / ${masterRoadmaps.size} courses updated.`);
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB Atlas.');

  console.log('\n--- Step 3: Updating backend/src/data/seedData.js ---');
  const updatedSeedCareers = seedCareers.map(career => {
    const enrichedTimeline = masterRoadmaps.get(career.id);
    if (!enrichedTimeline) {
      throw new Error(`Missing enriched timeline for seedCareer: ${career.id}`);
    }
    return {
      ...career,
      timeline: enrichedTimeline
    };
  });

  const seedDataContent = `export const seedCareers = ${JSON.stringify(updatedSeedCareers, null, 2)};\n\nexport default seedCareers;\n`;
  fs.writeFileSync('./backend/src/data/seedData.js', seedDataContent, 'utf-8');
  console.log('backend/src/data/seedData.js updated successfully!');

  console.log('\n--- Step 4: Updating frontend/src/lib/mock-data.js ---');
  const mockContent = fs.readFileSync('./frontend/src/lib/mock-data.js', 'utf8');
  const header = mockContent.slice(0, mockContent.indexOf('export const careers = ['));
  const tail = mockContent.slice(mockContent.indexOf('export const quizQuestions = ['));

  // Format careers with icon component identifiers unquoted
  let formattedCareers = JSON.stringify(updatedSeedCareers, null, 2);
  // Replace "icon": "ComponentName" with icon: ComponentName
  formattedCareers = formattedCareers.replace(/"icon":\s*"([A-Za-z0-9_]+)"/g, 'icon: $1');

  const newMockDataContent = `${header}export const careers = ${formattedCareers};\n\n${tail}`;
  fs.writeFileSync('./frontend/src/lib/mock-data.js', newMockDataContent, 'utf-8');
  console.log('frontend/src/lib/mock-data.js updated successfully!');

  console.log('\n--- MASTER SYNC COMPLETE ---');
}

syncAll().catch(err => {
  console.error('Master sync failed:', err);
  process.exit(1);
});
