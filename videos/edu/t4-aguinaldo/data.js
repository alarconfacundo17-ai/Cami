// "El aguinaldo se cobra hasta el 18 de diciembre" — promo para esa semana. Tanda 4.
window.SCENE = ({ w, big, layer, bgAt, stamp, captions, anim, eo, nego, head, tag, ask, row, G, GD, BONE, INK, CORAL }) => {
  window.DURATION = w(44) + 1.6;
  bgAt([[0, INK], [w(13) - 0.05, BONE], [w(24) - 0.05, INK], [w(34) - 0.05, BONE], [w(41) - 0.05, INK]]);
  const cal = (n, col) => `<div style="width:300px; border-radius:28px; overflow:hidden; background:#fff; box-shadow:0 20px 40px rgba(0,0,0,.3); text-align:center"><div style="background:${col}; color:#fff; font-family:JetBrains Mono,monospace; font-weight:700; font-size:34px; letter-spacing:4px; padding:14px">DICIEMBRE</div><div style="font-weight:900; font-size:170px; color:${INK}; line-height:1.15">${n}</div></div>`;

  const A = layer(0, w(13) - 0.05);
  head(A, `Aguinaldo:<br><span style="color:${G}">hasta el 18</span>`, 220, -1, 130);
  big(A, cal(18, CORAL), 'left:140px; top:640px', -1, false);
  nego(A, 'senala', 520, 650, 640, -1);

  const B = layer(w(13) - 0.05, w(24) - 0.05);
  head(B, `Esa semana la gente<br>${tag('tiene plata', GD, '#fff')}`, 300, w(13), 96, INK);
  const bill = big(B, `<div class="bills" style="font-size:150px; text-align:center">💸</div>`, 'left:0; width:1080px; top:680px', w(18));
  anim.push(t => { bill.firstChild.textContent = '💸'.repeat(Math.round(1 + 3 * eo(t, w(18), 1))); });
  stamp(B, 'Busca en qué gastarla', CORAL, 170, 950, -5, 54, w(21));

  const C = layer(w(24) - 0.05, w(34) - 0.05);
  head(C, 'Prepara:', 300, w(24), 100);
  row(C, '🏷️', 'Promo del 15 al 20/12', 500, w(26), INK);
  row(C, '📣', 'Y avísala antes', 700, w(32), INK, G);

  const D = layer(w(34) - 0.05, w(41) - 0.05);
  head(D, `Si esperas al 18…<br><span style="color:${CORAL}">ya es tarde</span>`, 330, w(34), 110, INK);
  nego(D, 'sorpresa', 330, 780, 560, w(38));

  const E = layer(w(41) - 0.05, 999);
  ask(E, '¿Qué vas a ofrecer?', ['A · Descuento', 'B · Pack o combo'], w(41));

  captions(['aguinaldo', 'dieciocho', 'plata', 'gastarla', 'promo', 'avísala', 'tarde', 'ofrecer']);
};
