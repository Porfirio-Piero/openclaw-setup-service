# Database Persistence Test Documentation

## Overview

This directory contains automated tests to verify that form data persists after page refresh.

**Critical Test**: The main test verifies that when a user submits a form with the text "norm is always right", the data survives a page refresh, confirming database persistence is working.

## Test Files

| File | Description |
|------|-------------|
| `e2e/persistence.spec.ts` | Playwright E2E test with browser automation |
| `e2e/persistence-api.spec.ts` | API-level persistence test |
| `test-persistence.js` | Standalone Node.js test script |
| `playwright.config.ts` | Playwright configuration |

## Running the Tests

### Prerequisites

1. Install dependencies:
   ```bash
   npm install
   npm install --save-dev @playwright/test
   npx playwright install chromium
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

### Run Test Options

**Option 1: Run Standalone Node Script**
```bash
npm run test:persistence
```

**Option 2: Run Playwright E2E Tests**
```bash
# Run all E2E tests
npm run test

# Run with UI mode
npm run test:ui

# Run specific test
npx playwright test persistence.spec.ts
```

**Option 3: Run via npx**
```bash
npx playwright test --project=chromium
```

## Test Coverage

### What Gets Tested

1. **Form Submission**: 
   - Navigate to public waitlist page (`/w/[slug]`)
   - Fill email field
   - Fill name field with "norm is always right"
   - Submit form

2. **Persistence Verification**:
   - Verify success message appears
   - Record signup count
   - Refresh page
   - Verify signup count persists (same after refresh)

3. **API Verification**:
   - POST to `/api/waitlists/[id]/signups`
   - Verify 201 Created response
   - Verify duplicate returns 409 Conflict (proves data exists)

## Test Results

The test will output one of the following:

### ✅ PASS
```
✅ TEST PASSED: Database persistence is WORKING
   - Form submission successful
   - Data persisted to blob storage
   - Entry "norm is always right" stored correctly
   - Data survives page refresh
```

### ❌ FAIL
```
❌ TEST FAILED
   Error: [description of what went wrong]
```

## Architecture

```
┌─────────────────┐     POST /api/waitlists/[id]/signups     ┌──────────────┐
│   Browser Form  │ ────────────────────────────────────────▶ │  Next.js API │
└─────────────────┘                                           └──────┬───────┘
                                                                     │
                                                                     ▼
                                                            ┌──────────────┐
                                                            │  Blob Store  │
                                                            │ (Vercel Blob)│
                                                            └──────────────┘
                                                                     │
                                                                     │ GET
                                                                     ▼
┌─────────────────┐     GET /w/[slug]        ┌──────────────┐    ┌──────────────┐
│   Public Page   │ ◀──────────────────────── │   Waitlist   │◀───│    Data      │
│   (After Refresh)│                           │    Service   │    └──────────────┘
└─────────────────┘                           └──────────────┘
```

## Troubleshooting

### "Server not available"
- Make sure `npm run dev` is running
- Check that port 3000 is available

### "No waitlist found"
- Tests require at least one waitlist to exist
- Create a waitlist manually via the UI first

### "Duplicate check failed"
- This might mean persistence is working but different test data was used
- Check the blob storage directly at your Vercel Blob dashboard

## Environment Variables

Create `.env.local` for test configuration:

```
BASE_URL=http://localhost:3000
BLOB_BASE_URL=your_blob_url_here
```

## CI/CD Integration

For automated testing in CI:

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test
```

## Success Criteria

✅ **Database Persistence is WORKING if:**
- Form submits successfully
- Success message appears
- Signup count increases
- After page refresh, signup count remains the same
- Duplicate submission returns 409 conflict

❌ **Database Persistence is BROKEN if:**
- Form submits but data disappears after refresh
- Signup count resets to previous value after refresh
- Duplicate submission succeeds (data not stored)
- API returns 500 errors
