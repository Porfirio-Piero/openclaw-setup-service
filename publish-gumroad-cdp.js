const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const PAGE_WS = 'ws://127.0.0.1:18800/devtools/page/BC67C63CD4114C2E2C72E2A111B9BB2B';
const HERO = 'C:\\\\Users\\\\devpi\\\\AppData\\\\Local\\\\Temp\\\\openclaw\\\\uploads\\\\hero.png';
const CONTENT = 'C:\\\\Users\\\\devpi\\\\AppData\\\\Local\\\\Temp\\\\openclaw\\\\uploads\\\\openclaw-setup-deliverable.txt';

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
  // deliverable file
  fs.writeFileSync(CONTENT, 'Thanks for purchasing the OpenClaw Setup Service!\\n\\nReply to your Gumroad receipt email with your preferred contact method and we will schedule your 15-minute setup session.\\n\\nWhat we configure:\\n- OpenClaw agent fleet (BotFather, Dapper Dan, Breaking Ben, Chief of Staff, Codex Developer)\\n- Personality files, skills registry, and memory system\\n- Security monitoring and camera automation\\n- Your custom automations and briefings\\n\\n— BotFather Family\\n');

  const ws = new WebSocket(PAGE_WS);
  await new Promise((resolve, reject) => { ws.on('open', resolve); ws.on('error', reject); });
  console.log('CDP connected');

  await cdpCall(ws, 'Runtime.enable');
  await cdpCall(ws, 'DOM.enable');
  await cdpCall(ws, 'Page.enable');

  const doc = await cdpCall(ws, 'DOM.getDocument', { depth: 0 });
  const rootId = doc.root.nodeId;

  // find cover input: input[type=file] inside Cover section (last or 3rd)
  const fileInputs = await cdpCall(ws, 'DOM.querySelectorAll', { nodeId: rootId, selector: 'input[type=file]' });
  console.log('file input nodeIds', fileInputs.nodeIds);
  // choose the one that is inside Cover area by checking text near it
  let coverInputId = null;
  for (const nodeId of fileInputs.nodeIds) {
    try {
      // check ancestor containing 'Cover' heading
      const ancestors = await cdpCall(ws, 'Runtime.evaluate', {
        expression: `(function(nodeId){ const el = document.querySelectorAll('input[type=file]')[${fileInputs.nodeIds.indexOf(nodeId)}]; let p=el; while(p){ if(p.tagName==='H2' || (p.innerText && p.innerText.includes('Cover'))){ return true; } p=p.parentElement; } return false; })()`,
        returnByValue: true
      });
      console.log('candidate', nodeId, 'result', ancestors.result?.value);
      if (ancestors.result?.value) coverInputId = nodeId;
    } catch(e) { console.log('err', e.message); }
  }
  if (!coverInputId && fileInputs.nodeIds.length) coverInputId = fileInputs.nodeIds[fileInputs.nodeIds.length - 1];
  console.log('coverInputId', coverInputId);

  if (coverInputId) {
    await cdpCall(ws, 'DOM.setFileInputFiles', { nodeId: coverInputId, files: [HERO] });
    console.log('Set cover files');
    await wait(5000);
  }

  // click Content tab
  await cdpCall(ws, 'Runtime.evaluate', { expression: `(() => { const tab = Array.from(document.querySelectorAll('[role=tab]')).find(t => t.innerText?.trim() === 'Content'); if (tab) { tab.dispatchEvent(new PointerEvent('pointerdown', {bubbles:true})); tab.dispatchEvent(new MouseEvent('mousedown', {bubbles:true})); tab.dispatchEvent(new MouseEvent('click', {bubbles:true})); tab.dispatchEvent(new MouseEvent('mouseup', {bubbles:true})); return 'clicked'; } return 'not found'; })()`, returnByValue: true });
  console.log('clicked Content tab');
  await wait(3000);

  // find a file input in Content section
  const doc2 = await cdpCall(ws, 'DOM.getDocument', { depth: 0 });
  const fileInputs2 = await cdpCall(ws, 'DOM.querySelectorAll', { nodeId: doc2.root.nodeId, selector: 'input[type=file]' });
  console.log('content file inputs', fileInputs2.nodeIds);
  let contentInputId = fileInputs2.nodeIds[fileInputs2.nodeIds.length - 1];
  if (contentInputId) {
    await cdpCall(ws, 'DOM.setFileInputFiles', { nodeId: contentInputId, files: [CONTENT] });
    console.log('Set content files');
    await wait(5000);
  }

  // find and click Publish
  const publishCheck = await cdpCall(ws, 'Runtime.evaluate', {
    expression: `(() => { const el = Array.from(document.querySelectorAll('button, a')).find(b => /publish/i.test(b.innerText)); return el ? {tag:el.tagName, text:el.innerText.trim()} : null; })()`,
    returnByValue: true
  });
  console.log('publish check', publishCheck.result?.value);
  if (publishCheck.result?.value) {
    await cdpCall(ws, 'Runtime.evaluate', {
      expression: `(() => { const el = Array.from(document.querySelectorAll('button, a')).find(b => /publish/i.test(b.innerText)); if (el) { el.click(); return 'clicked publish'; } return 'not found'; })()`,
      returnByValue: true
    });
    await wait(5000);
  }

  // screenshot
  const screenshot = await cdpCall(ws, 'Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
  fs.writeFileSync('C:\\\\Users\\\\devpi\\\\AppData\\\\Local\\\\Temp\\\\openclaw\\\\uploads\\\\gumroad-final.png', Buffer.from(screenshot.data, 'base64'));
  console.log('Saved screenshot');

  ws.close();
}

run().catch(e => { console.error(e); process.exit(1); });
