// "GTA VI hizo esperar 13 años. Tu negocio, 10 días" — lanzar con pistas. Tanda 4.
window.SCENE = ({ w, big, layer, bgAt, stamp, captions, anim, eo, counter, nego, head, tag, ask, row, G, GD, BONE, INK, CORAL }) => {
  window.DURATION = w(42) + 1.6;
  bgAt([[0, INK], [w(6) - 0.05, BONE], [w(20) - 0.05, INK], [w(38) - 0.05, INK]]);

  const A = layer(0, w(6) - 0.05);
  head(A, `<span style="font-size:280px; letter-spacing:-10px; color:${G}">13</span>`, 200, -1);
  head(A, 'años esperando<br>GTA VI', 540, -1, 100);
  nego(A, 'sorpresa', 300, 820, 560, -1);

  const B = layer(w(6) - 0.05, w(20) - 0.05);
  head(B, `Tu negocio:<br><span style="font-size:240px; color:${GD}; letter-spacing:-8px">10 días</span>`, 260, w(6), 100, INK);
  // gente que hace fila
  const fila = big(B, `<div class="fila" style="font-size:96px; letter-spacing:6px; white-space:nowrap"></div>`, 'left:110px; width:860px; top:800px; text-align:center', w(12), false);
  anim.push(t => { const n = Math.round(1 + 7 * eo(t, w(13), 1.6)); fila.firstChild.textContent = '🧍'.repeat(n); });
  stamp(B, 'Más ganas de comprar', CORAL, 160, 1010, -5, 54, w(17));

  const C = layer(w(20) - 0.05, w(38) - 0.05);
  head(C, 'Antes de lanzar:', 290, w(20), 92);
  row(C, '👀', 'Hoy: una pista', 480, w(25), INK);
  row(C, '🔍', 'Mañana: otra pista', 660, w(28), INK);
  row(C, '🚀', 'El día: lo muestras', 840, w(32), INK, G);
  nego(C, 'senala', 680, 1000, 380, w(34));

  const D = layer(w(38) - 0.05, 999);
  ask(D, '¿Qué vas a lanzar?', ['A · Un producto', 'B · Un servicio', 'C · Un local'], w(38));

  captions(['trece', 'diez', 'espera', 'ganas', 'pista', 'otra', 'lanzamiento', 'completo']);
};
