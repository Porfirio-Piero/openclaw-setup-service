const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const HERO = 'C:\\Users\\devpi\\AppData\\Local\\Temp\\openclaw\\uploads\\hero.png';
const CONTENT = 'C:\\Users\\devpi\\AppData\\Local\\Temp\\openclaw\\uploads\\openclaw-setup-deliverable.txt';

async function run() {
  // create a simple deliverable file
  fs.writeFileSync(CONTENT, 'Thanks for purchasing the OpenClaw Setup Service!\n\nReply to your Gumroad receipt email with your preferred contact method and we will schedule your 15-minute setup session.\n\nWhat we configure:\n- OpenClaw agent fleet (BotFather, Dapper Dan, Breaking Ben, Chief of Staff, Codex Developer)\n- Personality files, skills registry, and memory system\n- Security monitoring and camera automation\n- Your custom automations and briefings\n\n- BotFather Family\n');

  const browser = await puppeteer.connect({ browserWSEndpoint: 'ws://127.0.0.1:18800/devtools/browser', defaultViewport: null });
  const pages = await browser.pages();
  let page = pages.find(p => p.url().includes('/products/iliiw/edit'));
  if (!page) {
    page = await browser.newPage();
    await page.goto('https://gumroad.com/products/iliiw/edit', { waitUntil: 'networkidle2' });
  }

  // helper for waiting
  const wait = (ms) => new Promise(r => setTimeout(r, ms));

  // Upload cover image via hidden file input near Cover heading
  const coverInputs = await page.$x("//h2[contains(.,'Cover')]/following::input[@type='file'][1]");
  if (coverInputs.length) {
    await coverInputs[0].uploadFile(HERO);
    console.log('Cover upload started');
    await wait(5000);
  } else {
    console.log('Cover input not found');
  }

  // Click Content tab
  const contentTab = await page.$x("//*[@role='tab' and contains(.,'Content')]");
  if (contentTab.length) {
    await contentTab[0].click();
    await wait(2000);
  }

  // Upload deliverable file
  const fileInputs = await page.$x("//input[@type='file']");
  if (fileInputs.length) {
    await fileInputs[fileInputs.length - 1].uploadFile(CONTENT);
    console.log('Content upload started');
    await wait(5000);
  }

  // Look for Publish button
  const publishBtn = await page.$x("//*[self::button or self::a][contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'publish')]");
  console.log('publish candidates', publishBtn.length);
  if (publishBtn.length) {
    await publishBtn[0].click();
    console.log('Clicked publish');
    await wait(5000);
  }

  // Save screenshot
  await page.screenshot({ path: 'C:\\Users\\devpi\\AppData\\Local\\Temp\\openclaw\\uploads\\gumroad-final.png', fullPage: true });
  console.log('Done. URL:', page.url());
  await browser.disconnect();
}

run().catch(e => { console.error(e); process.exit(1); });
