// "¿Vas a bajar todos tus precios este Black Friday? Error." — pack + regalo + 48 h. Final en bucle.
window.SCENE = ({ w, el, pop, fadeIn, layer, bgAt, stamp, sales, captions, anim, eo, clamp, counter, card, big, salesLabel, fmtTimer }) => {
  const DARK = '#0E1A15', LIGHT = '#F2F0E9';
  window.DURATION = w(74) + 0.8;
  bgAt([[0, DARK], [w(10) - 0.05, LIGHT], [w(27) - 0.05, DARK], [w(50) - 0.05, LIGHT], [w(65) - 0.05, DARK]]);

  // etiquetas de descuento que llueven
  const tags = (L, t0, step) => {
    const list = [['-50%', 120, 300, -12], ['-40%', 600, 380, 9], ['-30%', 260, 760, 6], ['-60%', 640, 860, -8], ['-70%', 180, 1120, -4]];
    list.forEach(([txt, x, y, r], i) => {
      const e = el(`<div class="abs" style="left:${x}px; top:${y}px; rotate:${r}deg"><svg viewBox="0 0 330 170" width="330" height="170"><path d="M20 15 H240 L315 85 L240 155 H20 Z" fill="#FF5A3C" stroke="#0E1A15" stroke-width="10" stroke-linejoin="round"/><text x="135" y="112" text-anchor="middle" font-family="Inter" font-weight="900" font-size="78" fill="#fff">${txt}</text></svg></div>`, L);
      pop(e, t0 + i * step);
    });
  };
  const A = layer(0, w(10) - 0.05);
  tags(A, 0.05, 0.3);
  stamp(A, 'Error', '#3DDC84', 300, 560, -6, 120, w(9));

  // todos hacen descuento → tu ganancia se achica
  const B = layer(w(10) - 0.05, w(27) - 0.05);
  big(B, '<div style="width:300px; background:#fff; border-radius:24px; overflow:hidden; box-shadow:0 20px 40px rgba(14,26,21,.18); text-align:center"><div style="background:#FF5A3C; color:#fff; font-family:JetBrains Mono,monospace; font-weight:700; font-size:34px; padding:12px 0; letter-spacing:4px">VIERNES</div><div style="font-weight:900; font-size:150px; line-height:1.1; color:#0E1A15">27</div></div>', 'left:390px; top:300px', w(11));
  const shops = el('<div class="abs" style="left:90px; top:720px; width:900px; display:grid; grid-template-columns:repeat(3,1fr); gap:22px"></div>', B);
  for (let i = 0; i < 6; i++) { const s = el(`<div style="background:#fff; border-radius:18px; padding:18px 0; text-align:center; font-weight:900; font-size:52px; color:#FF5A3C; box-shadow:0 8px 20px rgba(14,26,21,.12)">-50%</div>`, shops); pop(s, w(13) + i * 0.12, i === 0); }
  const gl = el('<div class="abs" style="left:110px; top:1050px; width:860px"><div style="display:flex; justify-content:space-between; font-family:JetBrains Mono,monospace; font-weight:700; font-size:30px; letter-spacing:2px; color:#0E1A15"><span>TU GANANCIA</span><b id="gp">100%</b></div><div style="height:34px; background:#dcd8cc; border-radius:17px; margin-top:12px; overflow:hidden"><div id="gf" style="height:100%; width:100%; background:#FF5A3C; border-radius:17px"></div></div></div>', B);
  fadeIn(gl, w(18), 0.3);
  anim.push(t => { const v = 100 - 92 * eo(t, w(19), w(26) - w(19)); gl.querySelector('#gf').style.width = v + '%'; gl.querySelector('#gp').textContent = Math.round(v) + '%'; });

  // la fórmula
  const C = layer(w(27) - 0.05, w(50) - 0.05);
  card(C, 90, 420, 'PASO 01', '📦', 'Un pack con lo que más vendes', w(33), w(49));
  card(C, 700, 420, 'PASO 02', '🎁', 'Con un regalo', w(41), w(49) + 0.15);
  card(C, 395, 900, 'PASO 03', '⏱️', 'Solo 48 horas', w(46), w(49) + 0.3);

  // escasez: temporizador y pocas unidades
  const D = layer(w(50) - 0.05, w(65) - 0.05);
  big(D, '<div style="font-family:JetBrains Mono,monospace; font-weight:700; font-size:34px; letter-spacing:4px; color:#1E7B55; text-align:center">TERMINA EN</div>', 'left:0; width:1080px; top:330px', w(50), false);
  counter(D, 'left:0; width:1080px; top:390px; text-align:center; font-family:JetBrains Mono,monospace; font-weight:700; font-size:150px; color:#0E1A15', w(50), w(64), 48 * 3600 - 1, 3 * 3600 + 12 * 60 + 9, fmtTimer);
  const u = el('<div class="abs" style="left:240px; top:700px; width:600px; background:#fff; border-radius:24px; padding:26px; text-align:center; box-shadow:0 20px 40px rgba(14,26,21,.15)"><div style="font-family:JetBrains Mono,monospace; font-weight:700; font-size:30px; letter-spacing:3px; color:#555">QUEDAN</div><div id="uq" style="font-weight:900; font-size:140px; line-height:1.1; color:#FF5A3C">10</div><div style="font-weight:800; font-size:40px">unidades</div></div>', D);
  pop(u, w(51));
  anim.push(t => { u.querySelector('#uq').textContent = Math.max(2, Math.round(10 - 8 * eo(t, w(51), w(64) - w(51)))); });
  stamp(D, 'Compran ya', '#1E7B55', 300, 1150, -5, 80, w(63));
  salesLabel('VENTAS DEL PACK');
  sales([[0, null], [w(50), 6], [w(64), 100], [w(65) - 0.05, null]]);

  // vuelta al principio (bucle)
  const E = layer(w(65) - 0.05, 999);
  tags(E, w(66), 0.32);

  captions(['precios', 'error', 'descuentos', 'ganancia', 'pack', 'regalo', 'horas', 'limitado', 'ya']);
};
