const { webkit, devices } = require('playwright');

(async () => {
  const browser = await webkit.launch({ headless: false });
  const iPhone = devices['iPhone 13'];
  const context = await browser.newContext({
    ...iPhone,
  });
  const page = await context.newPage();

  page.on('console', msg => console.log('Console:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('Page error:', err.message));

  console.log('Navigating to HVAC page with WebKit (Safari)...');
  await page.goto('https://designgroove.io/hvac-system', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // Check if script exists
  const scriptCheck = await page.evaluate(() => {
    const scripts = Array.from(document.querySelectorAll('script'));
    return scripts.some(s => s.textContent && s.textContent.includes('data-video-id'));
  });
  console.log('Video script in page:', scriptCheck);

  // Find button
  const button = await page.$('button[data-video-id]');
  if (!button) {
    console.log('ERROR: No button found');

    // Debug - what's in the page?
    const html = await page.content();
    console.log('Page has data-video-id:', html.includes('data-video-id'));
    console.log('Page has button:', html.includes('<button'));

    await browser.close();
    return;
  }

  console.log('Button found, tapping...');

  // Get button position
  const box = await button.boundingBox();
  console.log('Button position:', box);

  // Tap
  await button.tap();
  console.log('Tapped, waiting...');

  await page.waitForTimeout(3000);

  // Check for iframe
  const iframe = await page.$('iframe');
  if (iframe) {
    const src = await iframe.getAttribute('src');
    console.log('SUCCESS: iframe found with src:', src?.substring(0, 50));
  } else {
    console.log('FAIL: No iframe found');

    // Check if button still exists
    const btnStill = await page.$('button[data-video-id]');
    if (btnStill) {
      const clicked = await btnStill.getAttribute('data-clicked');
      console.log('Button data-clicked attr:', clicked);
    }
  }

  await page.screenshot({ path: 'safari-test.png' });
  console.log('Screenshot saved: safari-test.png');

  await browser.close();
})();
