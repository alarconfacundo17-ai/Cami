// "Dejá de pagar por esto: 5 apps gratis" — lista con logos de texto. Tanda 4.
window.SCENE = ({ w, big, layer, bgAt, stamp, captions, anim, eo, nego, head, tag, ask, row, G, GD, BONE, INK, CORAL }) => {
  window.DURATION = w(38) + 1.6;
  bgAt([[0, INK], [w(12) - 0.05, BONE], [w(36) - 0.05, INK]]);

  const A = layer(0, w(12) - 0.05);
  head(A, `<span style="color:${CORAL}">Deja de pagar</span><br>por esto`, 230, -1, 130);
  head(A, `<span style="font-size:260px; letter-spacing:-10px; color:${G}">5</span><br>apps gratis`, 530, -1, 90);
  nego(A, 'senala', 330, 980, 420, -1);

  const B = layer(w(12) - 0.05, w(36) - 0.05);
  head(B, `5 apps ${tag('gratis', GD, '#fff')}`, 210, w(12), 92, INK);
  [['🎨', 'Canva · diseños', w(12)], ['🎬', 'CapCut · videos', w(16)], ['💬', 'WhatsApp Business · respuestas', w(20)], ['📅', 'Google Calendar · turnos', w(25)], ['🤖', 'ChatGPT · publicaciones', w(31)]]
    .forEach(([ic, tx, a], i) => row(B, ic, tx, 390 + i * 190, a + (i === 0 ? 0.4 : 0), INK));
  stamp(B, 'US$ 0', CORAL, 700, 1272, -8, 60, w(35));

  const C = layer(w(36) - 0.05, 999);
  ask(C, '¿Cuántas usas?', ['A · 0 a 2', 'B · 3 a 5'], w(36));

  captions(['pagar', 'cinco', 'gratis', 'canva', 'capcut', 'whatsapp', 'google', 'chatgpt', 'guárdalo']);
};
