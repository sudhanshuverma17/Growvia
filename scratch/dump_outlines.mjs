import { seedCareers } from '../backend/src/data/seedData.js';

const outlines = {};
seedCareers.forEach(c => {
  outlines[c.id] = {
    title: c.title,
    category: c.category,
    stages: c.timeline.map((s, i) => ({ index: i, year: s.year, title: s.title, desc: s.desc }))
  };
});

import fs from 'fs';
fs.writeFileSync('./scratch/roadmaps_meta.json', JSON.stringify(outlines, null, 2), 'utf8');
console.log('Saved ' + Object.keys(outlines).length + ' roadmaps metadata.');
