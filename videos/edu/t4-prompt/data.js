// "Copiá este mensaje y pegalo en ChatGPT" — prompt para respuestas de WhatsApp. Tanda 4.
window.SCENE = ({ w, el, big, layer, bgAt, stamp, captions, anim, eo, nego, head, tag, ask, row, phone, bubble, G, GD, BONE, INK, CORAL }) => {
  window.DURATION = w(34) + 1.6;
  bgAt([[0, INK], [w(7) - 0.05, BONE], [w(20) - 0.05, INK], [w(28) - 0.05, BONE], [w(33) - 0.05, INK]]);

  const A = layer(0, w(7) - 0.05);
  head(A, `Copia este<br><span style="color:${G}">mensaje</span> 👇`, 250, -1, 140);
  big(A, `<div style="font-family:JetBrains Mono,monospace; font-weight:700; font-size:38px; letter-spacing:3px; color:${INK}; background:${G}; padding:14px 26px; border-radius:12px">PÉGALO EN CHATGPT</div>`, 'left:290px; top:620px', -1, false);
  nego(A, 'senala', 300, 780, 580, -1);

  // B: el prompt se escribe solo
  const B = layer(w(7) - 0.05, w(20) - 0.05);
  const txt = '"Tengo una peluquería. Escríbeme 5 respuestas para WhatsApp cuando me preguntan el precio."';
  const box = big(B, `<div style="background:#fff; border-radius:30px; padding:40px; box-shadow:0 20px 40px rgba(14,26,21,.18)"><div style="font-family:JetBrains Mono,monospace; font-weight:700; font-size:28px; letter-spacing:3px; color:${GD}; margin-bottom:20px">PROMPT · COPIA Y PEGA</div><div class="ty" style="font-weight:700; font-size:54px; line-height:1.25; color:${INK}; min-height:340px"></div></div>`, 'left:90px; width:900px; top:360px', w(7));
  const ty = box.querySelector('.ty');
  anim.push(t => { const n = Math.round(txt.length * Math.min(1, Math.max(0, (t - w(7)) / (w(19) - w(7))))); ty.textContent = txt.slice(0, n) + (n < txt.length ? '▍' : ''); });

  // C: en 10 segundos, respuestas listas
  const C = layer(w(20) - 0.05, w(28) - 0.05);
  head(C, `En <span style="color:${G}">10 segundos</span>`, 230, w(20), 100);
  const p = phone(C, 'ChatGPT'); p.root.style.top = '420px'; p.root.style.transform = 'scale(.82)';
  ['1. ¡Hola! Te paso el precio y todo lo que incluye 👇', '2. Hoy me quedan 2 turnos, ¿te reservo uno?', '3. ¿Prefieres efectivo o transferencia?'].forEach((m, i) => bubble(p, 'in', m, w(21) + i * 0.6));

  const D = layer(w(28) - 0.05, w(33) - 0.05);
  head(D, `Cambia <s style="color:${CORAL}">peluquería</s><br>por ${tag('tu negocio', GD, '#fff')}`, 420, w(28), 104, INK);
  nego(D, 'pulgar', 330, 820, 520, w(30));

  const E = layer(w(33) - 0.05, 999);
  ask(E, '¿Lo pruebas?', ['A · Ya lo copié', 'B · Lo guardo'], w(33));

  captions(['copia', 'chatgpt', 'peluquería', 'respuestas', 'precio', 'diez', 'segundos', 'vender', 'negocio']);
};
