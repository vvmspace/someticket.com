import { chromium } from 'playwright';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const repo = '/Users/vvm/someticket.com';
const baseFile = '/tmp/muma-yerevan-base.jpg';
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
        radial-gradient(circle at 15% 20%, rgba(244, 63, 94, 0.32), transparent 36%),
        radial-gradient(circle at 85% 22%, rgba(217, 119, 6, 0.28), transparent 44%),
        linear-gradient(135deg, #0f172a 0%, #1e293b 48%, #0b1020 100%);
      color: #f8fafc;
    }
    .eyebrow { position: absolute; top: 92px; left: 120px; font-size: 24px; letter-spacing: 2px; text-transform: uppercase; color: #fda4af; font-weight: 700; }
    h1 { position: absolute; top: 130px; left: 120px; margin: 0; font-size: 114px; line-height: 1; width: 1000px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; }
    .subtitle { position: absolute; top: 280px; left: 120px; width: 980px; font-size: 38px; line-height: 1.3; color: #e2e8f0; font-weight: 600; }
    .meta { position: absolute; left: 120px; bottom: 150px; font-size: 34px; font-weight: 700; color: #f8fafc; }
    .chip { position: absolute; right: 120px; top: 110px; border: 1px solid rgba(255, 255, 255, 0.32); border-radius: 999px; padding: 14px 24px; font-size: 24px; color: #f8fafc; background: rgba(15, 23, 42, 0.45); backdrop-filter: blur(3px); }
    .ring { position: absolute; right: -120px; bottom: -180px; width: 680px; height: 680px; border-radius: 50%; border: 2px solid rgba(251, 113, 133, 0.25); box-shadow: inset 0 0 120px rgba(251, 113, 133, 0.2); }
  </style>
</head>
<body>
  <div class="canvas">
    <div class="eyebrow">Yerevan Live Show</div>
    <h1>Muma</h1>
    <div class="subtitle">Karen Demirchyan Sports and Concerts Complex</div>
    <div class="meta">May 16, 2026 • 7:00 PM</div>
    <div class="chip">Tickets from $118.78</div>
    <div class="ring"></div>
  </div>
</body>
</html>`;

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
await page.setContent(html, { waitUntil: 'load' });
await page.screenshot({ path: baseFile, type: 'jpeg', quality: 92 });
await browser.close();
console.log(baseFile);
