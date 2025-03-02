import fs from 'fs';
import path from 'path';
import { swaggerSpec } from '../config/swagger';

/**
 * Utility to export the Swagger specification to a file for AI context
 *
 * Usage:
 * - Import and call this function from your application
 * - Or run this file directly with Node.js
 *
 * @param outputPath Path where the Swagger JSON file should be saved
 */
export function exportSwaggerSpecForAI(
  outputPath: string = './api-docs-for-ai.json'
): void {
  try {
    // Ensure the output directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write the Swagger specification to a file
    fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2), 'utf8');

    console.log(`Swagger specification exported to ${outputPath}`);
    console.log('This file can be provided to AI for API context.');
  } catch (error) {
    console.error('Failed to export Swagger specification:', error);
  }
}

// Allow running this file directly
if (require.main === module) {
  const outputPath = process.argv[2] || './api-docs-for-ai.json';
  exportSwaggerSpecForAI(outputPath);
}
