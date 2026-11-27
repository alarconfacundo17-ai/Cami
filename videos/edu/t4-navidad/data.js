// "Falta menos de un mes para Navidad" — lista de regalos con precio. Tanda 4.
window.SCENE = ({ w, big, layer, bgAt, stamp, captions, anim, eo, nego, head, tag, ask, row, G, GD, BONE, INK, CORAL }) => {
  window.DURATION = w(44) + 1.6;
  bgAt([[0, INK], [w(14) - 0.05, BONE], [w(23) - 0.05, INK], [w(38) - 0.05, BONE], [w(42) - 0.05, INK]]);

  const A = layer(0, w(14) - 0.05);
  head(A, `<span style="font-size:240px">🎄</span><br>Falta <span style="color:${G}">menos de un mes</span>`, 180, -1, 110);
  nego(A, 'sorpresa', 300, 800, 560, -1);

  const B = layer(w(14) - 0.05, w(23) - 0.05);
  head(B, `Lista de regalos ${tag('con precio', GD, '#fff')}`, 220, w(14), 84, INK);
  [['🎁', 'Para mamá · $15.000', w(15)], ['🎁', 'Para él · $20.000', w(17)], ['🎁', 'Amigo invisible · $8.000', w(20)]].forEach(([ic, tx, a], i) => row(B, ic, tx, 450 + i * 190, a, INK));

  const C = layer(w(23) - 0.05, w(38) - 0.05);
  head(C, `La gente <span style="color:${CORAL}">no sabe</span><br>qué regalar`, 300, w(23), 110);
  big(C, `<div style="font-size:200px; text-align:center">🤔</div>`, 'left:0; width:1080px; top:640px', w(26));
  head(C, `Si le das la idea,<br>${tag('te compra a ti')}`, 920, w(31), 90);

  const D = layer(w(38) - 0.05, w(42) - 0.05);
  head(D, 'Haz tu lista hoy', 400, w(38), 120, INK);
  nego(D, 'pulgar', 330, 700, 600, w(39));

  const E = layer(w(42) - 0.05, 999);
  ask(E, '¿Qué pondrías primero?', ['A · Lo más vendido', 'B · Lo más barato'], w(42));

  captions(['navidad', 'lista', 'regalos', 'precio', 'regalar', 'idea', 'compra', 'hoy']);
};
