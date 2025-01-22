#!/bin/bash

# To get a JWT token:
# 1. Sign in to your app in the browser
# 2. Open DevTools -> Application -> Local Storage
# 3. Find the Supabase auth token
# 4. Copy the access_token value

# Configuration
API_URL="http://localhost:3001"
# TODO: Replace with your JWT token from Supabase
TOKEN="your-jwt-token-here"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "Testing API endpoints..."

# Test onboarding creation
echo -e "\n${GREEN}Creating new onboarding entry...${NC}"
CREATE_RESPONSE=$(curl -s -X POST "$API_URL/api/onboarding" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "responses": {
      "personalInfo": {
        "age": "25-34",
        "occupation": "Developer"
      }
    },
    "status": "in_progress",
    "onboarding_type": "initial",
    "last_step": "personalInfo"
  }')
echo $CREATE_RESPONSE

# Extract ID from creation response for update test
ONBOARDING_ID=$(echo $CREATE_RESPONSE | jq -r '.id')

# Test getting all onboarding entries
echo -e "\n${GREEN}Getting all onboarding entries...${NC}"
curl -s "$API_URL/api/onboarding" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

# Test getting latest onboarding
echo -e "\n${GREEN}Getting latest onboarding...${NC}"
curl -s "$API_URL/api/onboarding/latest" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

# Test updating onboarding
echo -e "\n${GREEN}Updating onboarding entry...${NC}"
curl -s -X PUT "$API_URL/api/onboarding/$ONBOARDING_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "responses": {
      "personalInfo": {
        "age": "25-34",
        "occupation": "Developer"
      },
      "preferences": {
        "workStyle": "remote"
      }
    },
    "status": "completed",
    "last_step": "preferences"
  }' | jq '.' 