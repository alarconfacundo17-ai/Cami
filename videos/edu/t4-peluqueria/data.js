// "Así deja una peluquería de contestar turnos a mano" — antes/después con link de turnos. Tanda 4.
window.SCENE = ({ w, el, big, layer, bgAt, stamp, captions, anim, eo, nego, head, tag, ask, row, phone, bubble, G, GD, BONE, INK, CORAL }) => {
  window.DURATION = w(45) + 1.6;
  bgAt([[0, INK], [w(9) - 0.05, BONE], [w(20) - 0.05, INK], [w(34) - 0.05, BONE], [w(41) - 0.05, INK]]);

  const A = layer(0, w(9) - 0.05);
  head(A, `Chau a los turnos<br><span style="color:${G}">a mano</span> ✂️`, 230, -1, 120);
  const badge = big(A, `<div style="background:${CORAL}; color:#fff; font-weight:900; font-size:80px; border-radius:60px; padding:10px 40px">50 mensajes/día</div>`, 'left:200px; top:640px', -1, false);
  nego(A, 'saluda', 320, 830, 540, -1);

  const B = layer(w(9) - 0.05, w(20) - 0.05);
  big(B, `<div style="font-family:JetBrains Mono,monospace; font-weight:700; font-size:40px; letter-spacing:4px; color:${CORAL}">ANTES</div>`, 'left:110px; top:230px', w(9));
  const p = phone(B, 'Peluquería'); p.root.style.top = '300px';
  ['¿Tienes hora? 🙏', '¿Y mañana?', '¿Y a las cinco?', '¿Sigue el turno?', '¿Precio? 👀', 'Holaaa?'].forEach((m, i) => bubble(p, 'in', m, w(10) + i * 0.45, i < 3));
  anim.push(t => { p.stat.textContent = Math.round(3 + 47 * eo(t, w(10), 4)) + ' mensajes sin leer'; });

  const C = layer(w(20) - 0.05, w(34) - 0.05);
  big(C, `<div style="font-family:JetBrains Mono,monospace; font-weight:700; font-size:40px; letter-spacing:4px; color:${G}">AHORA</div>`, 'left:110px; top:230px', w(20));
  head(C, `Un ${tag('link')}`, 320, w(21), 120);
  row(C, '📅', 'El cliente elige día y hora', 560, w(24), INK);
  row(C, '🔔', 'Le llega el recordatorio', 760, w(31), INK, G);

  const D = layer(w(34) - 0.05, w(41) - 0.05);
  head(D, `<span style="color:${GD}">−</span> mensajes<br><span style="color:${GD}">−</span> gente que falta`, 330, w(34), 110, INK);
  nego(D, 'pulgar', 330, 800, 540, w(37));

  const E = layer(w(41) - 0.05, 999);
  ask(E, '¿Tú cómo das los turnos?', ['A · Por WhatsApp', 'B · Con un link'], w(41));

  captions(['peluquería', 'turnos', 'mano', 'cincuenta', 'link', 'elige', 'recordatorio', 'menos', 'falta']);
};
