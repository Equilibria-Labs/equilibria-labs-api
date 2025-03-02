# API Documentation for AI

This document explains how to export and use API documentation from your Equilibria Labs API to provide context to AI systems.

## Why Provide API Documentation to AI?

When working with AI systems like ChatGPT or Claude, providing them with structured information about your API helps them:

1. Understand the available endpoints
2. Know the required parameters and expected responses
3. Generate more accurate code examples
4. Provide better assistance with API-related questions

## Exporting API Documentation

### Option 1: Using the NPM Script

The simplest way to export API documentation is to use the provided npm script:

```bash
npm run export-api-docs
```

This will generate a file at `./docs/api-for-ai.json` containing your complete API specification.

You can also specify a custom output path:

```bash
npm run export-api-docs -- ./custom/path/api-docs.json
```

### Option 2: Using the API Endpoint

The API also exposes an endpoint that returns the Swagger specification in JSON format:

```
GET /api-docs.json
```

You can access this endpoint in your browser or via a tool like curl:

```bash
curl http://localhost:3001/api-docs.json > api-docs.json
```

## Using the API Documentation with AI

### Method 1: Upload the File

1. Export the API documentation using one of the methods above
2. Upload the generated JSON file to the AI system
3. Ask the AI to analyze the file and provide guidance based on it

### Method 2: Share the Endpoint URL

If your API is publicly accessible, you can simply share the URL to your API documentation:

```
https://your-api-domain.com/api-docs.json
```

Ask the AI to fetch and analyze the documentation from this URL.

## Improving Your API Documentation

For the best results, ensure all your API routes have proper Swagger JSDoc annotations. Here's an example:

```typescript
/**
 * @swagger
 * /api/resource:
 *   get:
 *     summary: Get a resource
 *     description: Retrieves a specific resource by ID
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the resource
 *     responses:
 *       200:
 *         description: Resource retrieved successfully
 *       404:
 *         description: Resource not found
 */
router.get('/resource', (req, res) => {
  // Implementation
});
```

## Troubleshooting

If the exported documentation is incomplete:

1. Check that all your route files are included in the `apis` array in `src/config/swagger.ts`
2. Ensure all routes have proper Swagger JSDoc annotations
3. Restart your server to ensure all routes are properly registered 