// "¿Se puede ganar plata con GTA VI sin jugarlo bien?" — editar clips para streamers. Final en bucle.
window.SCENE = ({ w, el, pop, fadeIn, layer, bgAt, stamp, sales, captions, anim, eo, clamp, counter, card, big, salesLabel, fmtTimer }) => {
  const DARK = '#0E1A15', LIGHT = '#F2F0E9';
  window.DURATION = w(60) + 0.8;
  bgAt([[0, DARK], [w(28) - 0.05, LIGHT], [w(44) - 0.05, DARK], [w(55) - 0.05, DARK]]);

  const stream = (L, t0) => {
    const s = el(`<div class="abs" style="left:90px; top:330px; width:900px; height:506px; border-radius:26px; overflow:hidden; background:linear-gradient(135deg,#1d3b2f,#0b1410); border:6px solid #3DDC84">
      <div style="position:absolute; left:24px; top:22px; background:#FF5A3C; color:#fff; font-weight:900; font-size:30px; padding:6px 16px; border-radius:10px">● EN VIVO</div>
      <div class="tm" style="position:absolute; right:24px; top:22px; font-family:JetBrains Mono,monospace; font-weight:700; font-size:34px; color:#fff">06:42:10</div>
      <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-size:200px">🎮</div>
      <div style="position:absolute; left:24px; bottom:20px; font-family:JetBrains Mono,monospace; font-size:28px; color:#cfe">👁 12.408 mirando</div></div>`, L);
    pop(s, t0, t0 > 0);
    const tm = s.querySelector('.tm'); anim.push(t => { tm.textContent = fmtTimer(6 * 3600 + 42 * 60 + 10 + Math.max(0, t) * 37); });
    return s;
  };
  const A = layer(0, w(28) - 0.05);
  stream(A, -1);
  stamp(A, 'Sí', '#3DDC84', 420, 900, -6, 140, w(10));
  // línea de tiempo con los mejores momentos
  const tl = el('<div class="abs" style="left:90px; top:1150px; width:900px; height:40px; background:#24392f; border-radius:20px"></div>', A);
  fadeIn(tl, w(19), 0.3);
  [[120, 90], [430, 70], [700, 110]].forEach(([x, wd], i) => { const h = el(`<div class="abs" style="left:${x}px; top:0; width:${wd}px; height:40px; background:#3DDC84; border-radius:20px; box-shadow:0 0 30px #3DDC84"></div>`, tl); fadeIn(h, w(24) + i * 0.3, 0.2); });
  big(A, '<div style="font-family:JetBrains Mono,monospace; font-weight:700; font-size:30px; letter-spacing:3px; color:#3DDC84; text-align:center">MEJORES MOMENTOS</div>', 'left:0; width:1080px; top:1220px', w(26));

  // los clips cortados y cómo cobrar
  const C = layer(w(28) - 0.05, w(44) - 0.05);
  [[130, 'CLIP 1', w(31)], [420, 'CLIP 2', w(32)], [710, 'CLIP 3', w(33)]].forEach(([x, lb, a]) => {
    const c = el(`<div class="abs" style="left:${x}px; top:300px; width:240px; height:426px; border-radius:22px; background:#0E1A15; border:6px solid #3DDC84; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; color:#fff"><div style="font-size:90px">✂️</div><div style="font-family:JetBrains Mono,monospace; font-weight:700; font-size:30px; letter-spacing:2px">${lb}</div><div style="font-size:24px; opacity:.7">0:30 · TikTok</div></div>`, C);
    pop(c, a);
  });
  big(C, '<div style="display:flex; gap:26px; justify-content:center"><div style="background:#fff; border-radius:20px; padding:22px 34px; font-weight:900; font-size:48px; box-shadow:0 12px 26px rgba(14,26,21,.15)">💵 Por clip</div></div>', 'left:0; width:1080px; top:820px', w(39));
  big(C, '<div style="display:flex; justify-content:center"><div style="background:#1E7B55; color:#fff; border-radius:20px; padding:22px 34px; font-weight:900; font-size:48px">📅 o por mes</div></div>', 'left:0; width:1080px; top:980px', w(42));

  // con qué empezar
  const D = layer(w(44) - 0.05, w(55) - 0.05);
  card(D, 160, 480, 'NECESITAS', '📱', 'Tu celular', w(49));
  card(D, 630, 480, 'Y', '✂️', 'Una app de edición', w(52));
  salesLabel('TUS CLIENTES');
  sales([[0, null], [w(36), 5], [w(54), 100], [w(55) - 0.05, null]]);

  // bucle: vuelve el stream
  const E = layer(w(55) - 0.05, 999);
  stream(E, w(55));

  captions(['plata', 'gta', 'vi', 'streamers', 'horas', 'momentos', 'clips', 'clip', 'mes', 'celular', 'app']);
};
