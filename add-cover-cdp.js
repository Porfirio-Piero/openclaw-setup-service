const WebSocket = require('ws');
const fs = require('fs');

const PAGE_WS = 'ws://127.0.0.1:18800/devtools/page/CE11922E327F54A7257912FC0C76C7C8';
const HERO = 'C:\\\\Users\\\\devpi\\\\AppData\\\\Local\\\\Temp\\\\openclaw\\\\uploads\\\\hero.png';

function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

async function cdpCall(ws, method, params = {}) {
  const id = Math.floor(Math.random() * 1e9);
  return new Promise((resolve, reject) => {
    const handler = (raw) => {
      const msg = JSON.parse(raw);
      if (msg.id === id) {
        ws.off('message', handler);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
    ws.on('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function run() {
  const ws = new WebSocket(PAGE_WS);
  await new Promise((resolve, reject) => { ws.on('open', resolve); ws.on('error', reject); });
  console.log('CDP connected');

  await cdpCall(ws, 'Runtime.enable');
  await cdpCall(ws, 'DOM.enable');
  await cdpCall(ws, 'Page.enable');

  // Query the cover section file input using CSS
  const doc = await cdpCall(ws, 'DOM.getDocument', { depth: 0 });
  const coverInputNode = await cdpCall(ws, 'DOM.querySelector', {
    nodeId: doc.root.nodeId,
    selector: 'section:has(h2) input[type=file][accept*=".png"]'
  });
  console.log('cover input nodeId', coverInputNode.nodeId);

  if (coverInputNode.nodeId) {
    await cdpCall(ws, 'DOM.setFileInputFiles', { nodeId: coverInputNode.nodeId, files: [HERO] });
    console.log('Set cover file');
    // dispatch change/input events
    await cdpCall(ws, 'Runtime.evaluate', {
      expression: `(() => {
        const section = document.querySelector('section:has(h2)');
        const input = section.querySelector('input[type=file][accept*=".png"]');
        input.dispatchEvent(new Event('input', {bubbles:true}));
        input.dispatchEvent(new Event('change', {bubbles:true}));
        return 'dispatched';
      })()`,
      returnByValue: true
    });
    await wait(5000);
  }

  // Click Save changes
  await cdpCall(ws, 'Runtime.evaluate', {
    expression: `(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => /Save changes/i.test(b.innerText));
      if (btn) { btn.click(); return 'clicked'; }
      return 'not found';
    })()`,
    returnByValue: true
  });
  console.log('clicked Save changes');
  await wait(5000);

  const screenshot = await cdpCall(ws, 'Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
  fs.writeFileSync('C:\\\\Users\\\\devpi\\\\AppData\\\\Local\\\\Temp\\\\openclaw\\\\uploads\\\\gumroad-cover.png', Buffer.from(screenshot.data, 'base64'));
  console.log('Screenshot saved');
  ws.close();
}

run().catch(e => { console.error(e); process.exit(1); });
