import fs from 'fs';

const html = fs.readFileSync('src/App.tsx', 'utf-8');
// we just need to find the element that matches the 5th div
// this is hard without a full DOM. Let's just find the occurrences of "<button" inside the "showServiceActionModal".
