const WebSocket = require('ws');
const fs = require('fs');

const PAGE_WS = 'ws://127.0.0.1:18800/devtools/page/B74CD70449FF1EA01B5C5F2299640F20';
const DELIVERABLE = 'C:\\\\Users\\\\devpi\\\\.openclaw\\\\workspace\\\\openclaw-gumroad-landing\\\\openclaw-setup-buyer-pack.zip';

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

  const doc = await cdpCall(ws, 'DOM.getDocument', { depth: 0 });
  const input = await cdpCall(ws, 'DOM.querySelector', { nodeId: doc.root.nodeId, selector: 'input[type=file].sr-only' });
  console.log('file input nodeId', input.nodeId);
  if (input.nodeId) {
    await cdpCall(ws, 'DOM.setFileInputFiles', { nodeId: input.nodeId, files: [DELIVERABLE] });
    console.log('File set');
    await cdpCall(ws, 'Runtime.evaluate', {
      expression: `(()=>{const i=document.querySelector('input[type=file].sr-only'); i?.dispatchEvent(new Event('change',{bubbles:true})); i?.dispatchEvent(new Event('input',{bubbles:true})); return 'dispatched'})()`,
      returnByValue: true
    });
    await wait(5000);
  }

  // Click Save changes
  await cdpCall(ws, 'Runtime.evaluate', {
    expression: `(()=>{const b=Array.from(document.querySelectorAll('button')).find(x=>/Save changes/i.test(x.innerText)); b?.click(); return b?'clicked':'not found'})()`,
    returnByValue: true
  });
  console.log('Save clicked');
  await wait(5000);

  const screenshot = await cdpCall(ws, 'Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
  fs.writeFileSync('C:\\\\Users\\\\devpi\\\\AppData\\\\Local\\\\Temp\\\\openclaw\\\\uploads\\\\gumroad-deliverable.png', Buffer.from(screenshot.data, 'base64'));
  console.log('Screenshot saved');
  ws.close();
}

run().catch(e => { console.error(e); process.exit(1); });
