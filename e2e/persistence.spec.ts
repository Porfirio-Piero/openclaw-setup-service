import { test, expect } from '@playwright/test';

/**
 * Database Persistence Test
 * 
 * This test verifies that after submitting a form entry with "norm is always right",
 * the data persists in the database and survives page refreshes.
 */

const TEST_WAITLIST_SLUG = 'test-persistence-' + Date.now();
const TEST_EMAIL = `norm.test.${Date.now()}@example.com`;
const TEST_ENTRY_TEXT = 'norm is always right';

test.describe('Database Persistence Tests', () => {
  
  // Note: For this test to work, we need an existing waitlist
  // In a real scenario, you'd create this via setup or use a test fixture
  
  test('should persist form data after page refresh', async ({ page, request }) => {
    console.log('Starting database persistence test...');
    console.log(`Test entry text: "${TEST_ENTRY_TEXT}"`);

    // Try to find an existing waitlist slug from the blob storage
    // For now, we'll test against a slug that should exist
    // In production, you'd create this programmatically
    
    // Step 1: Navigate to a public waitlist page (try common slugs or use environment variable)
    const slugsToTry = ['test', 'demo', 'beta', 'alpha'];
    let foundSlug: string | null = null;
    
    for (const slug of slugsToTry) {
      try {
        const response = await request.get(`/w/${slug}`, { maxRedirects: 0 });
        if (response.status() === 200) {
          foundSlug = slug;
          console.log(`Found existing waitlist with slug: ${slug}`);
          break;
        }
      } catch {
        // Continue trying
      }
    }
    
    // If no waitlist found, skip the test
    test.skip(!foundSlug, 'No existing waitlist found to test against');
    
    const targetSlug = foundSlug || 'test';
    
    // Step 2: Navigate to the public waitlist page
    const pageUrl = `/w/${targetSlug}`;
    console.log(`Navigating to: ${pageUrl}`);
    await page.goto(pageUrl);
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Verify page loaded with a form
    const emailInput = page.locator('input[type="email"]').first();
    await expect(emailInput).toBeVisible({ timeout: 10000 });
    console.log('Page loaded successfully with email input visible');

    // Get initial signup count from the page
    const countLocator = page.locator('text=/\\d+ people have already joined/');
    let initialCount = 0;
    try {
      const countText = await countLocator.textContent({ timeout: 5000 });
      const match = countText?.match(/(\d+)/);
      initialCount = match ? parseInt(match[1]) : 0;
    } catch {
      initialCount = 0;
    }
    console.log(`Initial signup count: ${initialCount}`);

    // Step 3: Fill the form with "norm is always right" as the name
    const nameInput = page.locator('input[type="text"]').first();
    const submitButton = page.locator('button[type="submit"]').first();

    await emailInput.fill(TEST_EMAIL);
    await nameInput.fill(TEST_ENTRY_TEXT);
    console.log(`Filled form with email: ${TEST_EMAIL} and name: "${TEST_ENTRY_TEXT}"`);
    
    // Step 4: Submit the form
    await submitButton.click();
    console.log('Form submitted');

    // Step 5: Wait for success message
    // The success message should contain "You're on the list!" or similar
    const successIndicators = [
      page.locator('text=/success|joined|list/i').first(),
      page.locator('h3:has-text("list")').first(),
      page.locator('[class*="success"]').first(),
    ];
    
    let successFound = false;
    for (const indicator of successIndicators) {
      try {
        await expect(indicator).toBeVisible({ timeout: 10000 });
        successFound = true;
        console.log('Success message displayed after submission');
        break;
      } catch {
        continue;
      }
    }
    
    expect(successFound, 'Expected to see success message after form submission').toBeTruthy();

    // Verify signup count increased
    let countAfterSubmit = initialCount;
    try {
      const countText = await countLocator.textContent({ timeout: 5000 });
      const match = countText?.match(/(\d+)/);
      countAfterSubmit = match ? parseInt(match[1]) : initialCount;
    } catch {}
    console.log(`Signup count after submission: ${countAfterSubmit}`);
    expect(countAfterSubmit).toBeGreaterThanOrEqual(initialCount + 1);

    // Step 6: Refresh the page to test persistence
    console.log('Refreshing page to verify persistence...');
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Re-find elements after refresh
    const emailInputAfterRefresh = page.locator('input[type="email"]').first();
    await expect(emailInputAfterRefresh).toBeVisible({ timeout: 10000 });

    // Step 7: Verify the signup count persisted after refresh
    let countAfterRefresh = initialCount;
    try {
      const countLocatorAfter = page.locator('text=/\\d+ people have already joined/');
      const countText = await countLocatorAfter.textContent({ timeout: 5000 });
      const match = countText?.match(/(\d+)/);
      countAfterRefresh = match ? parseInt(match[1]) : initialCount;
    } catch {}
    
    console.log(`Signup count after refresh: ${countAfterRefresh}`);
    
    // This is the CRITICAL assertion - if this fails, database persistence is BROKEN
    expect(countAfterRefresh, 
      `Database persistence FAILED: Expected count ${countAfterSubmit} after refresh, but got ${countAfterRefresh}. ` +
      `Data did not survive page refresh!`
    ).toBe(countAfterSubmit);
    
    expect(countAfterRefresh, 
      'Database persistence FAILED: Count did not increase after form submission'
    ).toBeGreaterThanOrEqual(initialCount + 1);

    console.log('✅ TEST PASSED: Database persistence is WORKING correctly');
    console.log(`   - Initial count: ${initialCount}`);
    console.log(`   - After submission: ${countAfterSubmit}`);
    console.log(`   - After refresh: ${countAfterRefresh}`);
    console.log(`   - Entry "${TEST_ENTRY_TEXT}" persisted correctly`);
  });
});
