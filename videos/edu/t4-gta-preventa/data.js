// "Rockstar cobró GTA VI 5 meses antes de que saliera" — preventa con seña. Tanda 4.
window.SCENE = ({ w, big, layer, bgAt, stamp, captions, anim, eo, counter, nego, head, tag, ask, row, G, GD, BONE, INK, CORAL }) => {
  window.DURATION = w(49) + 1.6;
  bgAt([[0, INK], [w(10) - 0.05, BONE], [w(23) - 0.05, INK], [w(38) - 0.05, BONE], [w(45) - 0.05, INK]]);

  const A = layer(0, w(10) - 0.05);
  head(A, `Cobró <span style="color:${G}">5 meses</span><br>antes de salir`, 250, -1, 120);
  big(A, `<div style="font-family:JetBrains Mono,monospace; font-weight:700; font-size:40px; letter-spacing:4px; color:${INK}; background:${G}; padding:14px 26px; border-radius:12px">PREVENTA ABIERTA · GTA VI</div>`, 'left:200px; top:600px', -1, false);
  nego(A, 'sorpresa', 300, 760, 600, -1);

  const B = layer(w(10) - 0.05, w(23) - 0.05);
  big(B, `<div style="width:520px; height:700px; border-radius:30px; background:${INK}; border:8px solid ${G}; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:30px; color:${BONE}"><div style="font-size:200px">🎮</div><div style="font-weight:900; font-size:70px">US$ 79,99</div><div style="background:${G}; color:${INK}; font-weight:900; font-size:46px; padding:12px 30px; border-radius:16px">RESERVAR</div></div>`, 'left:280px; top:330px', w(12));
  stamp(B, 'Nada nuevo', CORAL, 150, 1120, -6, 58, w(16));
  stamp(B, 'Solo portada y precio', GD, 260, 1250, 4, 46, w(19));

  const C = layer(w(23) - 0.05, w(38) - 0.05);
  head(C, 'Cobrar antes te da:', 300, w(23), 90);
  row(C, '💵', 'Plata para producir', 520, w(27), INK);
  row(C, '✅', 'La prueba de que lo quieren', 720, w(32), INK);
  nego(C, 'senala', 640, 930, 440, w(33));

  const D = layer(w(38) - 0.05, w(45) - 0.05);
  head(D, `Turnos de diciembre:<br>${tag('reserva con seña', GD, '#fff')}`, 300, w(38), 92, INK);
  big(D, `<div style="background:#fff; border-radius:30px; padding:34px 40px; box-shadow:0 20px 40px rgba(14,26,21,.18); font-weight:700; font-size:46px; line-height:1.35; color:${INK}">📅 Abrimos la agenda de diciembre<br>🔒 Se confirma con seña<br>⏳ Quedan <b class="q">20</b> lugares</div>`, 'left:110px; width:860px; top:650px', w(41));
  // los lugares bajan
  anim.push(t => { const q = document.querySelector('.q'); if (q) q.textContent = Math.max(3, Math.round(20 - 17 * eo(t, w(42), 1.4))); });

  const E = layer(w(45) - 0.05, 999);
  ask(E, '¿Lo harías en tu negocio?', ['A · Sí', 'B · No'], w(45));

  captions(['cinco', 'meses', 'preventa', 'portada', 'precio', 'plata', 'confirma', 'seña', 'diciembre']);
};
