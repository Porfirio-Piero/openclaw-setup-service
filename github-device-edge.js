const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.connect({
    browserWSEndpoint: 'ws://127.0.0.1:9222/devtools/browser',
    defaultViewport: null
  });
  const pages = await browser.pages();
  const page = pages.find(p => p.url().includes('github.com')) || await browser.newPage();
  await page.goto('https://github.com/login/device');
  console.log('Navigated to device page');
  await new Promise(r => setTimeout(r, 3000));
  // snapshot
  const html = await page.evaluate(() => document.body.innerText.slice(0, 500));
  console.log('BODY:', html);
  // if we see Continue with Google, click it
  const googleBtn = await page.$('button:has-text("Continue with Google")');
  if (googleBtn) {
    console.log('Clicking Continue with Google');
    await googleBtn.click();
  } else {
    console.log('No Google button');
  }
  // wait for user to authorize or redirect
  await new Promise(r => setTimeout(r, 10000));
  const finalUrl = page.url();
  console.log('URL after wait:', finalUrl);
  await browser.disconnect();
})();
