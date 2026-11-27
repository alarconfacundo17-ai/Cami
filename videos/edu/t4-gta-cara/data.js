// "9 de cada 10 eligieron la versión cara de GTA VI" — 3 opciones de precio. Tanda 4, con Nego.
window.SCENE = ({ w, el, big, pop, layer, bgAt, stamp, sales, captions, anim, eo, nego, head, tag, ask, card, G, GD, BONE, INK, CORAL }) => {
  window.DURATION = w(49) + 1.6;
  bgAt([[0, INK], [w(11) - 0.05, BONE], [w(23) - 0.05, INK], [w(37) - 0.05, BONE], [w(47) - 0.05, INK]]);

  // A (cuadro 0 = portada): 9/10 enorme + Nego señalando
  const A = layer(0, w(11) - 0.05);
  head(A, `<span style="font-size:300px; letter-spacing:-12px; color:${G}">9/10</span>`, 230, -1);
  head(A, 'eligieron la versión <span style="color:#FF5A3C">cara</span>', 600, -1, 96);
  nego(A, 'senala', 300, 820, 560, -1);

  // B: dos cajas de precio, la Ultimate gana 9 de 10
  const B = layer(w(11) - 0.05, w(23) - 0.05);
  [[110, 'ESTÁNDAR', 'US$ 79,99', w(14), 10], [570, 'ULTIMATE', 'US$ 99,99', w(19), 90]].forEach(([x, n, p, a, v], i) => {
    const c = big(B, `<div style="width:400px; height:560px; border-radius:30px; background:${i ? INK : '#fff'}; color:${i ? BONE : INK}; border:8px solid ${i ? G : '#D9D5C8'}; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:26px; box-shadow:0 24px 50px rgba(14,26,21,.2)"><div style="font-family:JetBrains Mono,monospace; font-weight:700; font-size:34px; letter-spacing:4px; color:${i ? G : GD}">${n}</div><div style="font-size:120px">🎮</div><div style="font-weight:900; font-size:62px">${p}</div><div class="pc" style="font-family:JetBrains Mono,monospace; font-weight:700; font-size:44px; color:${i ? G : '#8a978f'}">0%</div></div>`, `left:${x}px; top:400px`, a);
    const pc = c.querySelector('.pc'); anim.push(t => { pc.textContent = Math.round(v * eo(t, w(21), 0.8)) + '% eligió'; });
  });
  stamp(B, '9 de cada 10', CORAL, 560, 1030, -6, 60, w(21) + 0.4);

  // C: ¿por qué? nadie quiere la básica
  const C = layer(w(23) - 0.05, w(37) - 0.05);
  head(C, '¿Por qué?', 300, w(23), 130);
  head(C, `Si hay una opción ${tag('más completa')},<br>casi nadie quiere la básica.`, 560, w(29), 76);
  nego(C, 'sorpresa', 330, 880, 480, w(32));

  // D: tus 3 opciones (ejemplo barbería)
  const D = layer(w(37) - 0.05, w(47) - 0.05);
  [[70, 'BÁSICA', '✂️', 'Corte<br>$12.000', w(43)], [395, 'COMPLETA', '✂️🧔', 'Corte + barba<br>$18.000', w(44)], [720, 'PREMIUM', '👑', 'Todo + lavado<br>$25.000', w(46)]].forEach(([x, n, ic, t, a], i) => {
    const c = card(D, x, 520, n, ic, `<span style="font-size:34px">${t}</span>`, a);
    if (i === 1) { anim.push(t => { const k = eo(t, w(46) + 0.3, 0.3); c.style.boxShadow = k > 0 ? `0 0 0 ${12 * k}px ${G}, 0 24px 50px rgba(14,26,21,.22)` : ''; }); stamp(D, 'Más elegido', CORAL, 380, 960, -5, 46, w(46) + 0.3); }
  });
  head(D, 'Ofrece 3 opciones', 270, w(40), 92, INK);

  // E: pregunta para comentar
  const E = layer(w(47) - 0.05, 999);
  ask(E, '¿Tú cuál elegirías?', ['A · Estándar', 'B · Ultimate'], w(47));

  captions(['nueve', 'diez', 'cara', 'ultimate', 'básica', 'tres', 'premium', 'completa']);
};
