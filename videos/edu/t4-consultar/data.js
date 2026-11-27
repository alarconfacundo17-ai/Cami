// "Dejá de poner 'consultar precio'" — Tanda 4.
window.SCENE = ({ w, big, layer, bgAt, stamp, captions, anim, eo, nego, head, tag, ask, row, G, GD, BONE, INK, CORAL }) => {
  window.DURATION = w(41) + 1.6;
  bgAt([[0, INK], [w(5) - 0.05, BONE], [w(18) - 0.05, INK], [w(28) - 0.05, BONE], [w(36) - 0.05, INK]]);

  const A = layer(0, w(5) - 0.05);
  head(A, `Deja de poner`, 230, -1, 110);
  const tg = big(A, `<div style="background:#fff; border-radius:24px; padding:26px 40px; font-weight:900; font-size:76px; color:${INK}; box-shadow:0 20px 40px rgba(0,0,0,.3)">💬 Consultar precio</div>`, 'left:170px; top:420px', -1, false);
  big(A, `<div style="width:780px; height:22px; background:${CORAL}; border-radius:11px; rotate:-6deg"></div>`, 'left:150px; top:500px', -1, false);
  nego(A, 'sorpresa', 300, 760, 600, -1);

  const B = layer(w(5) - 0.05, w(18) - 0.05);
  head(B, 'Lo que piensa el cliente:', 260, w(5), 84, INK);
  big(B, `<div style="background:#fff; border-radius:30px 30px 30px 6px; padding:30px 40px; font-weight:800; font-size:64px; color:${INK}; box-shadow:0 14px 30px rgba(14,26,21,.16)">💭 "Es caro…"</div>`, 'left:110px; top:500px', w(9));
  big(B, `<div style="background:#fff; border-radius:30px 30px 6px 30px; padding:30px 40px; font-weight:800; font-size:64px; color:${INK}; box-shadow:0 14px 30px rgba(14,26,21,.16)">💭 "Me van a vender algo"</div>`, 'left:150px; top:720px', w(13));

  const C = layer(w(18) - 0.05, w(28) - 0.05);
  head(C, `La mayoría <span style="color:${CORAL}">no pregunta</span>`, 300, w(19), 100);
  big(C, `<div style="font-size:160px; text-align:center">🚶‍♂️➡️🏪</div>`, 'left:0; width:1080px; top:620px', w(23));
  stamp(C, 'Se va a otro negocio', CORAL, 170, 920, -5, 56, w(26));

  const D = layer(w(28) - 0.05, w(36) - 0.05);
  head(D, 'Pon el precio', 260, w(28), 110, INK);
  big(D, `<div style="background:#fff; border-radius:24px; padding:26px 40px; font-weight:900; font-size:76px; color:${INK}; border:8px solid ${G}">✂️ Corte · $12.000</div>`, 'left:190px; top:470px', w(29));
  head(D, `o por lo menos ${tag('"desde"', GD, '#fff')}`, 720, w(34), 80, INK);
  nego(D, 'pulgar', 340, 860, 500, w(35));

  const E = layer(w(36) - 0.05, 999);
  ask(E, '¿Tú pones el precio?', ['A · Siempre', 'B · Nunca'], w(36));

  captions(['consultar', 'caro', 'vender', 'mayoría', 'pregunta', 'otro', 'precio', 'desde']);
};
