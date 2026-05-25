const fs = require('fs');
const imgPath = 'public/img.jpg';
if (fs.existsSync(imgPath)) {
  const imgData = fs.readFileSync(imgPath);
  const base64 = imgData.toString('base64');
  const svg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="circleView">
      <circle cx="50" cy="50" r="44" />
    </clipPath>
    <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  <g clip-path="url(#circleView)">
    <image x="-15" y="-1" width="130" height="145" href="data:image/jpeg;base64,${base64}" />
  </g>
  <circle cx="50" cy="50" r="44" fill="none" stroke="#D6FF4D" stroke-width="2.5" filter="url(#neonGlow)" />
</svg>`;
  fs.writeFileSync('public/favicon.svg', svg);
  console.log('favicon.svg created successfully');
} else {
  console.log('img.jpg not found');
}

