const { chromium, devices } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const iPhone = devices['iPhone 13'];
  const context = await browser.newContext({
    ...iPhone,
    hasTouch: true,
  });
  const page = await context.newPage();

  page.on('console', msg => console.log('Console:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('Page error:', err.message));

  console.log('Navigating to HVAC page...');
  await page.goto('https://designgroove.io/hvac-system', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // Check if script is in the page
  const scriptExists = await page.evaluate(() => {
    const scripts = document.querySelectorAll('script');
    for (const s of scripts) {
      if (s.textContent && s.textContent.includes('data-video-id')) {
        return true;
      }
    }
    return false;
  });
  console.log('Video click script in page:', scriptExists);

  // Find the button
  const button = await page.$('button[data-video-id]');
  if (!button) {
    console.log('ERROR: Button not found!');
    await browser.close();
    return;
  }

  console.log('Button found, using tap() for touch...');

  // Use tap instead of click for mobile
  await button.tap();

  await page.waitForTimeout(3000);

  // Check for iframe
  const iframe = await page.$('iframe[src*="mediadelivery"]');
  if (iframe) {
    console.log('SUCCESS: iframe appeared!');
  } else {
    console.log('FAIL: iframe did not appear');

    // Check what the button's parent contains now
    const parentHTML = await page.evaluate(() => {
      const btn = document.querySelector('button[data-video-id]');
      if (btn) {
        return btn.parentElement ? btn.parentElement.innerHTML.substring(0, 200) : 'no parent';
      }
      return 'button not found';
    });
    console.log('Parent HTML:', parentHTML);
  }

  await page.screenshot({ path: 'after-tap.png' });
  await browser.close();
})();
