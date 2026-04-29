import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

// Create dist directory if it doesn't exist
try {
  mkdirSync('dist', { recursive: true });
} catch (e) {
  // Directory already exists
}

// Read the Speed Insights library
const speedInsightsPath = join('node_modules', '@vercel', 'speed-insights', 'dist', 'index.mjs');
const speedInsightsCode = readFileSync(speedInsightsPath, 'utf-8');

// Create a bundled script that injects Speed Insights
const bundledScript = `// Speed Insights for Vercel
(function() {
${speedInsightsCode}

// Initialize Speed Insights
if (typeof window !== 'undefined') {
  injectSpeedInsights({
    framework: 'vanilla-js'
  });
}
})();
`;

// Write the bundled script
writeFileSync('dist/speed-insights.js', bundledScript);

console.log('✓ Speed Insights built successfully to dist/speed-insights.js');
