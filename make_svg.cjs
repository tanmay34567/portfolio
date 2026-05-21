const fs = require('fs');
const imgPath = 'public/img.png';
if (fs.existsSync(imgPath)) {
  const imgData = fs.readFileSync(imgPath);
  const base64 = imgData.toString('base64');
  const svg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="circleView">
      <circle cx="50" cy="50" r="50" />
    </clipPath>
  </defs>
  <image width="100" height="100" href="data:image/png;base64,${base64}" clip-path="url(#circleView)" preserveAspectRatio="xMidYMid slice" />
</svg>`;
  fs.writeFileSync('public/favicon.svg', svg);
  console.log('favicon.svg created successfully');
} else {
  console.log('img.png not found');
}
