// Renderiza un video educativo con template.html.
// Uso: node render.js <carpeta>   (la carpeta tiene voz.mp3, words.json y data.js)
// Arma words.js a partir de words.json, copia la plantilla, captura cuadro por cuadro y mezcla la voz con sonidos de "pop".
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');

(async () => {
  const dir = path.resolve(process.argv[2]);
  const words = JSON.parse(fs.readFileSync(path.join(dir, 'words.json'), 'utf8'));
  fs.writeFileSync(path.join(dir, 'words.js'), 'window.WORDS=' + JSON.stringify(words) + ';');
  fs.copyFileSync(path.join(__dirname, 'template.html'), path.join(dir, 'index.html'));

  const FPS = 30;
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('file://' + path.join(dir, 'index.html'));
  await page.evaluate(() => document.fonts.ready);
  if (errors.length) { console.error('Error en la página:', errors); process.exit(1); }
  const dur = await page.evaluate(() => window.DURATION);
  const pops = await page.evaluate(() => window.POPS);
  const N = Math.round(dur * FPS);

  const tmp = path.join(dir, '_frames.mp4');
  const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'medium', tmp], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = 0; i < N; i++) {
    await page.evaluate(t => window.render(t), i / FPS);
    const buf = await page.screenshot({ type: 'jpeg', quality: 92 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await browser.close();

  const uniq = [...new Set(pops.map(p => +p.toFixed(2)))];
  const popExpr = uniq.map(p => `0.3*sin(2*PI*(900-500*(t-${p}))*(t-${p}))*exp(-max(0,t-${p})*30)*gt(t,${p})`).join('+') || '0';
  const out = path.join(dir, path.basename(dir) + '.mp4');
  const mix = spawn('ffmpeg', ['-v', 'error', '-y', '-i', tmp, '-i', path.join(dir, 'voz.mp3'),
    '-f', 'lavfi', '-i', `aevalsrc='${popExpr}':s=44100:d=${dur}`,
    '-filter_complex', `[1:a]aresample=44100,apad=whole_dur=${dur}[v];[2:a]volume=0.6[p];[v][p]amix=inputs=2:normalize=0,alimiter=limit=0.95[a]`,
    '-map', '0:v', '-map', '[a]', '-t', String(dur), '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out], { stdio: 'inherit' });
  await new Promise(r => mix.on('close', r));
  fs.unlinkSync(tmp);
  console.log('listo', out, dur.toFixed(1) + 's');
})();
