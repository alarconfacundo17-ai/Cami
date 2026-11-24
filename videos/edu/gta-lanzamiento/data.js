// "¿Cómo hizo GTA VI para vender 3.790 millones en un día?" — la espera como estrategia. Final en bucle.
window.SCENE = ({ w, el, pop, fadeIn, layer, bgAt, stamp, sales, captions, anim, eo, counter, card, big, salesLabel, fmtMoney }) => {
  const DARK = '#0E1A15', LIGHT = '#F2F0E9';
  window.DURATION = w(73) + 0.8;
  bgAt([[0, DARK], [w(16) - 0.05, LIGHT], [w(31) - 0.05, DARK], [w(55) - 0.05, LIGHT], [w(63) - 0.05, DARK]]);

  const moneyScene = (L, t0, t1) => {
    big(L, '<div style="font-size:200px; text-align:center">🎮</div>', 'left:0; width:1080px; top:300px', -1, false);
    counter(L, 'left:0; width:1080px; top:640px; text-align:center; font-weight:900; font-size:104px; letter-spacing:-3px; color:#3DDC84', t0, t1, 0, 3790000000, fmtMoney);
  };
  const A = layer(0, w(16) - 0.05);
  moneyScene(A, w(5), w(11) + 0.4);
  big(A, '<div style="font-family:JetBrains Mono,monospace; font-weight:700; font-size:40px; letter-spacing:4px; color:#F2F0E9; text-align:center">EN UN SOLO DÍA</div>', 'left:0; width:1080px; top:800px', w(13));
  big(A, '<div style="font-family:JetBrains Mono,monospace; font-size:24px; color:#8aa597; text-align:center">Fuente: Rockstar / Take-Two, 19/11/2026</div>', 'left:0; width:1080px; top:880px', w(14), false);

  // la espera: años de adelantos y una fecha
  const B = layer(w(16) - 0.05, w(31) - 0.05);
  stamp(B, 'No fue solo el juego', '#FF5A3C', 170, 300, -4, 60, w(16));
  const line = el('<div class="abs" style="left:110px; top:760px; width:860px; height:10px; background:#0E1A15; border-radius:5px"></div>', B);
  fadeIn(line, w(23), 0.3);
  [['2023', 110], ['2024', 380], ['2025', 650]].forEach(([y, x], i) => {
    const m = el(`<div class="abs" style="left:${x}px; top:640px; width:220px; text-align:center"><div style="background:#fff; border-radius:14px; padding:10px 0; font-family:JetBrains Mono,monospace; font-weight:700; font-size:26px; letter-spacing:2px; color:#1E7B55; box-shadow:0 8px 18px rgba(14,26,21,.12)">ADELANTO</div><div style="width:26px; height:26px; border-radius:50%; background:#3DDC84; border:6px solid #0E1A15; margin:22px auto 0"></div><div style="font-weight:800; font-size:38px; margin-top:14px">${y}</div></div>`, B);
    pop(m, w(24) + i * 0.35);
  });
  big(B, '<div style="width:300px; background:#fff; border-radius:24px; overflow:hidden; box-shadow:0 20px 40px rgba(14,26,21,.18); text-align:center; outline:10px solid #3DDC84"><div style="background:#0E1A15; color:#3DDC84; font-family:JetBrains Mono,monospace; font-weight:700; font-size:32px; padding:12px 0; letter-spacing:4px">NOV 2026</div><div style="font-weight:900; font-size:150px; line-height:1.1; color:#0E1A15">19</div></div>', 'left:390px; top:960px', w(29));

  // la receta para tu negocio
  const C = layer(w(31) - 0.05, w(55) - 0.05);
  card(C, 90, 420, 'PASO 01', '📅', 'Avisa la fecha', w(43), w(54));
  card(C, 700, 420, 'PASO 02', '👀', 'Muestra un adelanto', w(46), w(54) + 0.15);
  card(C, 395, 900, 'PASO 03', '📝', 'Abre una lista de espera', w(50), w(54) + 0.3);

  // el día del lanzamiento: gente esperando
  const D = layer(w(55) - 0.05, w(63) - 0.05);
  const list = el('<div class="abs" style="left:190px; top:300px; width:700px; background:#fff; border-radius:26px; padding:28px 36px; box-shadow:0 20px 40px rgba(14,26,21,.15)"><div style="font-family:JetBrains Mono,monospace; font-weight:700; font-size:30px; letter-spacing:3px; color:#1E7B55; margin-bottom:12px">LISTA DE ESPERA</div></div>', D);
  pop(list, w(55));
  ['Ana', 'Juan', 'Sofía', 'Martín', 'Lucía'].forEach((n, i) => { const r = el(`<div style="font-size:44px; font-weight:700; padding:10px 0; border-bottom:2px solid #eee">✓ ${n}</div>`, list); fadeIn(r, w(56) + i * 0.3, 0.15); });
  const more = el('<div style="font-size:44px; font-weight:900; color:#1E7B55; padding-top:12px">+ 43 más</div>', list); fadeIn(more, w(61), 0.2);
  salesLabel('COMPRADORES ESPERANDO');
  sales([[0, null], [w(55), 5], [w(62) + 0.3, 100], [w(63) - 0.05, null]]);

  // bucle: vuelve el contador
  const E = layer(w(63) - 0.05, 999);
  moneyScene(E, w(67), w(73) + 0.8);

  captions(['gta', 'vi', 'millones', 'día?', 'espera', 'adelantos', 'fecha', 'lista', 'compradores']);
};
