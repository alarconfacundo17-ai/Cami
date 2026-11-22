// Renderiza scene.html cuadro por cuadro y arma el video con la voz.
// Uso: node render.js <duracion_seg> <voz> <salida.mp4> "<tiempos de pops separados por coma>"
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');

(async () => {
  const [dur, voice, out, popsArg] = process.argv.slice(2);
  const FPS = 30, N = Math.round(parseFloat(dur) * FPS);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto('file://' + path.resolve(__dirname, 'scene.html'));
  await page.evaluate(() => document.fonts.ready);

  const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'medium', '_frames.mp4'], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = 0; i < N; i++) {
    await page.evaluate((t) => window.render(t), i / FPS);
    const buf = await page.screenshot({ type: 'jpeg', quality: 92 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await browser.close();

  // sonido: voz + "pops" suaves en cada aparición + whoosh en cambios de escena
  const pops = (popsArg || '').split(',').filter(Boolean).map(Number);
  const popExpr = pops.map(p => `0.35*sin(2*PI*(900-500*(t-${p}))*(t-${p}))*exp(-(t-${p})*30)*gt(t,${p})`).join('+') || '0';
  const mix = spawn('ffmpeg', ['-v', 'error', '-y', '-i', '_frames.mp4', '-i', voice,
    '-f', 'lavfi', '-i', `aevalsrc='${popExpr}':s=44100:d=${dur}`,
    '-filter_complex', `[1:a]aresample=44100,apad=whole_dur=${dur}[v];[2:a]volume=0.6[p];[v][p]amix=inputs=2:normalize=0,alimiter=limit=0.95[a]`,
    '-map', '0:v', '-map', '[a]', '-t', dur, '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out], { stdio: 'inherit' });
  await new Promise(r => mix.on('close', r));
  require('fs').unlinkSync('_frames.mp4');
  console.log('listo', out);
})();
