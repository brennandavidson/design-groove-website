const { chromium, devices } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const iPhone = devices['iPhone 13'];
  const context = await browser.newContext({
    ...iPhone,
  });
  const page = await context.newPage();

  // Listen for console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('Console error:', msg.text());
    }
  });

  page.on('pageerror', err => {
    console.log('Page error:', err.message);
  });

  console.log('Navigating to HVAC page...');
  await page.goto('https://designgroove.io/hvac-system', { waitUntil: 'networkidle' });

  // Wait for page to settle
  await page.waitForTimeout(2000);

  // Take screenshot before click
  await page.screenshot({ path: 'before-click.png' });
  console.log('Screenshot saved: before-click.png');

  // Check if button exists
  const button = await page.$('button[data-video-id]');
  if (button) {
    console.log('Button found with data-video-id');
    const videoId = await button.getAttribute('data-video-id');
    console.log('Video ID:', videoId);
  } else {
    console.log('ERROR: Button with data-video-id NOT FOUND');

    // Check what elements exist
    const buttons = await page.$$('button');
    console.log('Total buttons on page:', buttons.length);

    const iframes = await page.$$('iframe');
    console.log('Total iframes on page:', iframes.length);
  }

  // Try to find the video thumbnail area
  const thumbnail = await page.$('img[src*="hvac-vsl-thumbnail"]');
  if (thumbnail) {
    console.log('Thumbnail image found');

    // Get parent button
    const parent = await thumbnail.evaluateHandle(el => el.parentElement);
    const tagName = await parent.evaluate(el => el.tagName);
    console.log('Parent element tag:', tagName);

    // Click the parent
    console.log('Clicking thumbnail parent...');
    await parent.click();

    await page.waitForTimeout(2000);

    // Check if iframe appeared
    const iframe = await page.$('iframe[src*="mediadelivery"]');
    if (iframe) {
      console.log('SUCCESS: iframe appeared after click!');
    } else {
      console.log('FAIL: iframe did NOT appear after click');
    }
  } else {
    console.log('ERROR: Thumbnail image NOT FOUND');
  }

  // Take screenshot after click
  await page.screenshot({ path: 'after-click.png' });
  console.log('Screenshot saved: after-click.png');

  // Get page HTML for debugging
  const html = await page.content();
  require('fs').writeFileSync('page-source.html', html);
  console.log('Page source saved: page-source.html');

  await browser.close();
})();
