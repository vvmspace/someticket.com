import { chromium } from 'playwright';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const repo = '/Users/vvm/someticket.com';
const outFile = path.join(repo, 'static/images/armenia-vs-portugal-republican-stadium-yerevan-september-06-2026.jpg');
const watermark = pathToFileURL(path.join(repo, 'watermark.png')).href;

const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { margin: 0; font-family: "Arial", sans-serif; }
    .canvas {
      width: 1600px;
      height: 900px;
      position: relative;
      overflow: hidden;
      background:
        radial-gradient(circle at 15% 20%, rgba(220, 30, 30, 0.28), transparent 35%),
        radial-gradient(circle at 75% 25%, rgba(15, 70, 180, 0.32), transparent 45%),
        linear-gradient(135deg, #0d1b2a 0%, #102a43 48%, #1f3c88 100%);
      color: #f8fafc;
    }
    .flag-left, .flag-right {
      position: absolute;
      width: 300px;
      height: 190px;
      top: 72px;
      border-radius: 14px;
      box-shadow: 0 10px 35px rgba(0, 0, 0, 0.35);
      border: 1px solid rgba(255,255,255,0.24);
    }
    .flag-left { left: 190px; background: linear-gradient(#d52b1e 33.3%, #0039a6 33.3% 66.6%, #f2a800 66.6%); }
    .flag-right { right: 190px; background: linear-gradient(#006600 50%, #ff0000 50%); }
    .vs {
      position: absolute;
      top: 122px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 58px;
      font-weight: 800;
      letter-spacing: 4px;
    }
    .eyebrow {
      position: absolute;
      top: 330px;
      left: 120px;
      font-size: 24px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #cbd5e1;
    }
    h1 {
      position: absolute;
      top: 365px;
      left: 120px;
      margin: 0;
      font-size: 78px;
      line-height: 1.05;
      width: 1360px;
      font-weight: 800;
      text-transform: uppercase;
    }
    .meta {
      position: absolute;
      left: 120px;
      bottom: 130px;
      font-size: 34px;
      font-weight: 600;
      letter-spacing: 0.4px;
      color: #e2e8f0;
    }
    .wm {
      position: absolute;
      right: 40px;
      bottom: 30px;
      width: 170px;
      opacity: 0.9;
      filter: drop-shadow(0 3px 8px rgba(0,0,0,0.4));
    }
  </style>
</head>
<body>
  <div class="canvas">
    <div class="flag-left"></div>
    <div class="flag-right"></div>
    <div class="vs">VS</div>
    <div class="eyebrow">FIFA World Cup Qualifier</div>
    <h1>Armenia vs Portugal</h1>
    <div class="meta">Republican Stadium, Yerevan • September 6, 2026</div>
    <img class="wm" src="${watermark}" alt="brand mark" />
  </div>
</body>
</html>`;

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
await page.setContent(html, { waitUntil: 'load' });
await page.screenshot({ path: outFile, type: 'jpeg', quality: 90 });
await browser.close();
console.log(outFile);
