const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Maker Passport Imposition Layouts', () => {
  let filePath;

  test.beforeAll(() => {
    filePath = path.resolve(__dirname, '../maker-passport-template.html');
  });

  test('2-Up Saddle Stitch Logbook Page Visual Validation', async ({ page }) => {
    await page.goto(`file://${filePath}`);
    await page.locator('#layout-mode').selectOption('saddle-stitch-2up');
    await page.waitForTimeout(500);

    const logbookPage = page.locator('.page-half').filter({ hasText: 'THIS LOGBOOK BELONGS TO:' }).first();
    await expect(logbookPage).toBeVisible();
    await expect(logbookPage).toHaveScreenshot('logbook-page-saddle-stitch-2up.png', {
      maxDiffPixelRatio: 0.1
    });
  });

  test('2-Up Saddle Stitch Imposition Mathematical Validation', async ({ page }) => {
    await page.goto(`file://${filePath}`);

    const originalPageCount = await page.evaluate(() => {
      return document.getElementById('pages-container').children.length;
    });

    let n = originalPageCount;
    while (n % 4 !== 0) n++;

    await page.locator('#layout-mode').selectOption('saddle-stitch-2up');
    await page.waitForTimeout(500);

    const sheets = await page.locator('.sheet-2up').all();
    expect(sheets.length).toBe(n / 2);

    const spreads = await page.locator('.spread-2up').all();
    expect(spreads.length).toBe(n);

    for (let i = 0; i < spreads.length; i++) {
        const spread = spreads[i];
        const pageHalves = spread.locator('.page-half');
        await expect(pageHalves).toHaveCount(2);

        const k = Math.floor(i / 4);
        let expectedLeft, expectedRight;

        if (i % 4 === 0 || i % 4 === 1) {
            // Front side of sheet k (top and bottom identical)
            expectedLeft = n - 1 - 2*k;
            expectedRight = 0 + 2*k;
        } else {
            // Back side of sheet k (top and bottom identical)
            expectedLeft = 1 + 2*k;
            expectedRight = n - 2 - 2*k;
        }

        const leftIndexStr = await pageHalves.nth(0).locator('[data-page-index]').getAttribute('data-page-index');
        const rightIndexStr = await pageHalves.nth(1).locator('[data-page-index]').getAttribute('data-page-index');

        if (expectedLeft < originalPageCount) {
            expect(leftIndexStr).toBe(expectedLeft.toString());
        } else {
            expect(leftIndexStr).toBeNull();
        }

        if (expectedRight < originalPageCount) {
            expect(rightIndexStr).toBe(expectedRight.toString());
        } else {
            expect(rightIndexStr).toBeNull();
        }
    }
  });

  test('Saddle Stitch Logbook Page Visual Validation', async ({ page }) => {
    await page.goto(`file://${filePath}`);
    await page.locator('#layout-mode').selectOption('saddle-stitch');
    await page.waitForTimeout(500);

    const logbookPage = page.locator('.page-half').filter({ hasText: 'THIS LOGBOOK BELONGS TO:' }).first();
    await expect(logbookPage).toBeVisible();
    await expect(logbookPage).toHaveScreenshot('logbook-page-saddle-stitch.png', {
      maxDiffPixelRatio: 0.1
    });
  });

  test('Saddle Stitch Imposition Mathematical Validation', async ({ page }) => {
    await page.goto(`file://${filePath}`);

    // Evaluate original page length inside the browser DOM before rendering
    const originalPageCount = await page.evaluate(() => {
      return document.getElementById('pages-container').children.length;
    });

    // Add blanks conceptually:
    let n = originalPageCount;
    while (n % 4 !== 0) n++;

    await page.locator('#layout-mode').selectOption('saddle-stitch');
    await page.waitForTimeout(500);

    const spreads = await page.locator('.spread').all();
    expect(spreads.length).toBe(n / 2); // 2 pages per spread

    // Retrieve the indices mathematically from the rendered DOM spreads to ensure algorithm
    // Each page in the DOM might have identifiable text, but the template clones them.
    for (let i = 0; i < spreads.length; i++) {
        const spread = spreads[i];
        const pageHalves = spread.locator('.page-half');
        await expect(pageHalves).toHaveCount(2);

        // Verify topological sequence
        // Expected for saddle stitch:
        // Left page: n - 1 - 2*i
        // Right page: 0 + 2*i
        // Or for reverse side of sheet (every odd spread):
        // Left page: 1 + 2*(i-1)
        // Right page: n - 2 - 2*(i-1)
        // Because spreads are pushed in pairs: [N-1-2k, 0+2k] then [1+2k, N-2-2k]

        const k = Math.floor(i / 2);

        let expectedLeft, expectedRight;
        if (i % 2 === 0) {
            expectedLeft = n - 1 - 2*k;
            expectedRight = 0 + 2*k;
        } else {
            expectedLeft = 1 + 2*k;
            expectedRight = n - 2 - 2*k;
        }

        const leftIndexStr = await pageHalves.nth(0).locator('[data-page-index]').getAttribute('data-page-index');
        const rightIndexStr = await pageHalves.nth(1).locator('[data-page-index]').getAttribute('data-page-index');

        // Check left page index if it's not a blank page
        if (expectedLeft < originalPageCount) {
            expect(leftIndexStr).toBe(expectedLeft.toString());
        } else {
            expect(leftIndexStr).toBeNull();
        }

        // Check right page index if it's not a blank page
        if (expectedRight < originalPageCount) {
            expect(rightIndexStr).toBe(expectedRight.toString());
        } else {
            expect(rightIndexStr).toBeNull();
        }
    }
  });

  test('Cut and Stack Imposition Mathematical Validation', async ({ page }) => {
    await page.goto(`file://${filePath}`);

    const originalPageCount = await page.evaluate(() => {
      return document.getElementById('pages-container').children.length;
    });

    let n = originalPageCount;
    while (n % 4 !== 0) n++;

    await page.locator('#layout-mode').selectOption('cut-stack');
    await page.waitForTimeout(500);

    const spreads = await page.locator('.spread').all();
    expect(spreads.length).toBe(n / 2);

    for (let i = 0; i < spreads.length; i++) {
        const spread = spreads[i];
        const pageHalves = spread.locator('.page-half');
        await expect(pageHalves).toHaveCount(2);

        // Expected for cut and stack:
        // Spreads pushed in pairs: [2k, half+2k] then [half+2k+1, 2k+1]
        const half = n / 2;
        const k = Math.floor(i / 2);

        let expectedLeft, expectedRight;
        if (i % 2 === 0) {
            expectedLeft = 2*k;
            expectedRight = half + 2*k;
        } else {
            expectedLeft = half + 2*k + 1;
            expectedRight = 2*k + 1;
        }

        const leftIndexStr = await pageHalves.nth(0).locator('[data-page-index]').getAttribute('data-page-index');
        const rightIndexStr = await pageHalves.nth(1).locator('[data-page-index]').getAttribute('data-page-index');

        if (expectedLeft < originalPageCount) {
            expect(leftIndexStr).toBe(expectedLeft.toString());
        } else {
            expect(leftIndexStr).toBeNull();
        }

        if (expectedRight < originalPageCount) {
            expect(rightIndexStr).toBe(expectedRight.toString());
        } else {
            expect(rightIndexStr).toBeNull();
        }
    }
  });
});
