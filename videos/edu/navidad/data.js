// "¿Por qué en diciembre algunos negocios venden mucho más?" — packs de regalo S/M/L. Final en bucle.
window.SCENE = ({ w, el, pop, fadeIn, layer, bgAt, stamp, sales, captions, anim, eo, counter, card, big, salesLabel }) => {
  const DARK = '#0E1A15', LIGHT = '#F2F0E9';
  window.DURATION = w(61) + 0.8;
  bgAt([[0, DARK], [w(11) - 0.05, LIGHT], [w(21) - 0.05, DARK], [w(41) - 0.05, LIGHT], [w(52) - 0.05, DARK]]);

  // dos negocios: uno vende poco, otro mucho
  const compare = (L, t0) => {
    [[150, 'Negocio A', 22, '#FF5A3C'], [600, 'Negocio B', 92, '#3DDC84']].forEach(([x, name, v, col], i) => {
      const box = el(`<div class="abs" style="left:${x}px; top:300px; width:330px; height:820px"><div style="position:absolute; bottom:90px; left:60px; width:210px; height:0; background:${col}; border-radius:20px 20px 0 0" class="bar"></div><div style="position:absolute; bottom:0; left:0; width:330px; text-align:center; font-weight:800; font-size:44px; color:#F2F0E9">${name}</div><div class="lab" style="position:absolute; left:0; width:330px; text-align:center; font-family:JetBrains Mono,monospace; font-weight:700; font-size:34px; color:${col}"></div></div>`, L);
      const bar = box.querySelector('.bar'), lab = box.querySelector('.lab');
      anim.push(t => { const h = 640 * (v / 100) * eo(t, t0 + i * 0.4, 1.1); bar.style.height = h + 'px'; lab.style.bottom = (110 + h) + 'px'; lab.textContent = h > 10 ? 'VENTAS' : ''; });
    });
    big(L, '<div style="font-size:120px; text-align:center">🎄</div>', 'left:0; width:1080px; top:150px', t0 < 0 ? -1 : t0, false);
  };
  const A = layer(0, w(11) - 0.05);
  compare(A, 0.2);

  // productos → regalos
  const B = layer(w(11) - 0.05, w(21) - 0.05);
  const items = ['🧴', '🕯️', '☕'];
  items.forEach((ic, i) => {
    const e = el(`<div class="abs" style="left:${140 + i * 290}px; top:560px; width:220px; height:220px; background:#fff; border-radius:30px; display:flex; align-items:center; justify-content:center; font-size:130px; box-shadow:0 16px 30px rgba(14,26,21,.14)">${ic}</div>`, B);
    pop(e, w(15) + i * 0.15, i === 0);
    anim.push(t => { e.textContent = t >= w(20) + i * 0.12 ? '🎁' : ic; e.style.outline = t >= w(20) + i * 0.12 ? '10px solid #3DDC84' : 'none'; });
  });
  stamp(B, 'No busca productos', '#FF5A3C', 210, 330, -4, 54, w(16));

  // tres packs con precio cerrado
  const C = layer(w(21) - 0.05, w(41) - 0.05);
  const packs = [[90, 'CHICO', '🎁', '$9.900', w(30)], [395, 'MEDIANO', '🎁🎁', '$19.900', w(32)], [700, 'GRANDE', '🎁🎁🎁', '$34.900', w(35)]];
  packs.forEach(([x, lb, ic, pr, a]) => {
    const c = el(`<div class="card3" style="left:${x}px; top:470px; height:420px"><div class="n">${lb}</div><div class="ic" style="font-size:80px">${ic}</div><div class="t" style="font-size:54px; color:#1E7B55">${pr}</div><div class="ok">✓</div></div>`, C);
    pop(c, a);
  });
  stamp(C, 'Ya envuelto', '#3DDC84', 320, 1010, -5, 74, w(40));

  // el cliente solo elige el tamaño
  const D = layer(w(41) - 0.05, w(52) - 0.05);
  packs.forEach(([x, lb, ic, pr], i) => {
    const c = el(`<div class="card3" style="left:${x}px; top:470px; height:420px"><div class="n">${lb}</div><div class="ic" style="font-size:80px">${ic}</div><div class="t" style="font-size:54px; color:#1E7B55">${pr}</div></div>`, D);
    c.style.opacity = 1;
    if (i === 1) anim.push(t => { const k = eo(t, w(49), 0.3); c.style.transform = `scale(${1 + 0.12 * k})`; c.style.boxShadow = k > 0 ? '0 0 0 12px #3DDC84, 0 24px 50px rgba(14,26,21,.22)' : ''; });
  });
  big(D, '<div style="font-size:130px; text-align:center">👆</div>', 'left:0; width:1080px; top:930px', w(49));
  salesLabel('VENTAS DE DICIEMBRE');
  sales([[0, null], [w(21), 8], [w(51), 100], [w(52) - 0.05, null]]);

  // bucle: vuelve la comparación
  const E = layer(w(52) - 0.05, 999);
  compare(E, w(53));

  captions(['diciembre', 'más', 'regalos', 'packs', 'precio', 'cerrado', 'envueltos', 'tamaño']);
};
