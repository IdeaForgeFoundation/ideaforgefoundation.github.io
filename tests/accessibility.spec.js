const { test, expect } = require('@playwright/test');
const { AxeBuilder } = require('@axe-core/playwright');
const http = require('http');
const path = require('path');
const fs = require('fs');

const pages = [
  'index.html',
  'membership.html',
  'initiatives.html',
  'oil.html',
  'campaign.html',
  'board.html',
  'bylaws.html',
  'policies.html',
  'user-groups.html',
  'workshops.html',
  'accelerators.html',
  'incubators.html',
  'pay-it-forward.html',
  'maker-passport-template.html'
];

let server;
const PORT = 8085;

test.beforeAll(async () => {
  server = http.createServer((req, res) => {
    let reqUrl = req.url.split('?')[0];
    if (reqUrl === '/') reqUrl = '/index.html';
    const filePath = path.join(__dirname, '..', reqUrl);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      let contentType = 'text/html';
      if (filePath.endsWith('.css')) contentType = 'text/css';
      else if (filePath.endsWith('.js')) contentType = 'application/javascript';
      else if (filePath.endsWith('.json')) contentType = 'application/json';
      else if (filePath.endsWith('.png')) contentType = 'image/png';
      else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) contentType = 'image/jpeg';
      else if (filePath.endsWith('.svg')) contentType = 'image/svg+xml';
      else if (filePath.endsWith('.md')) contentType = 'text/markdown';

      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  });

  await new Promise((resolve) => server.listen(PORT, resolve));
});

test.afterAll(async () => {
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
});

for (const pageName of pages) {
  test(`Accessibility audit for ${pageName}`, async ({ page }) => {
    await page.goto(`http://localhost:${PORT}/${pageName}`);
    // Wait for marked / dynamic rendering if needed
    await page.waitForTimeout(500);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .exclude('iframe')
      .analyze();

    if (accessibilityScanResults.violations.length > 0) {
      console.log(`\n--- Accessibility Violations for ${pageName} ---`);
      for (const v of accessibilityScanResults.violations) {
        console.log(`[${v.id}] (${v.impact}) - ${v.help}`);
        console.log(`Help URL: ${v.helpUrl}`);
        for (const node of v.nodes) {
          console.log(`  Target: ${node.target.join(', ')}`);
          console.log(`  HTML: ${node.html}`);
          console.log(`  Summary: ${node.failureSummary}\n`);
        }
      }
    }

    expect(accessibilityScanResults.violations).toEqual([]);
  });
}
