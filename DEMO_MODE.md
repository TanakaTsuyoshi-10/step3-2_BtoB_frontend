# Demo Mode Configuration

## Current Status
- Demo mode is ENABLED
- All API calls return mock data
- Backend API connection disabled

## How to Enable Demo Mode
1. Comment out `NEXT_PUBLIC_API_BASE` in `.env.local`:
   ```
   # NEXT_PUBLIC_API_BASE=https://app-002-gen10-step3-2-py-oshima2.azurewebsites.net/api/v1
   ```

## How to Disable Demo Mode
1. Uncomment `NEXT_PUBLIC_API_BASE` in `.env.local`:
   ```
   NEXT_PUBLIC_API_BASE=https://app-002-gen10-step3-2-py-oshima2.azurewebsites.net/api/v1
   ```

## Demo Mode Features
- Login works with any email/password
- Returns demo user: `demo@example.com`
- All data endpoints return empty arrays or mock data
- No 503 errors from backend API