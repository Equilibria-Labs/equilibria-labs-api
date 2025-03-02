#!/usr/bin/env node

/**
 * Script to export Swagger API documentation for AI context
 *
 * This script generates a JSON file containing the complete API specification
 * which can be provided to AI systems to understand how to use your API.
 *
 * Usage:
 *   npx ts-node src/scripts/exportApiDocsForAI.ts [output-path]
 *
 * Example:
 *   npx ts-node src/scripts/exportApiDocsForAI.ts ./docs/api-for-ai.json
 */

import { exportSwaggerSpecForAI } from '../utils/exportSwaggerForAI';

// Get output path from command line arguments or use default
const outputPath = process.argv[2] || './docs/api-for-ai.json';

// Export the Swagger specification
exportSwaggerSpecForAI(outputPath);

console.log('\nNext steps:');
console.log('1. Provide this JSON file to AI systems');
console.log('2. The AI can use this file to understand your API structure');
console.log(
  '3. For better results, ensure all your API routes have proper Swagger JSDoc annotations'
);
