// "¿Por qué te preguntan el precio y después desaparecen?" — estilo colorido, una sola idea, final en bucle.
window.SCENE = ({ w, el, pop, fadeIn, layer, bgAt, phone, bubble, stamp, sales, captions, anim, eo, clamp }) => {
  const DARK = '#2A1C12', YEL = '#F6C945', CREAM = '#FFF4D6';
  const END = w(71) + 0.75;
  window.DURATION = END;
  bgAt([[0, DARK], [w(16) - 0.05, CREAM], [w(23) - 0.05, YEL], [w(35) - 0.05, DARK], [w(51) - 0.05, YEL], [w(63) - 0.05, DARK]]);

  // A: el cliente pregunta el precio, recibe solo un número y desaparece
  const A = layer(0, w(16) - 0.05);
  const p1 = phone(A, 'Martín');
  const q1 = bubble(p1, 'in', '¿Precio? 🙏', -1, false); q1.style.opacity = 1;
  const a1 = bubble(p1, 'out', '$15.000<span class="tick">✓✓ Visto</span>', w(5));
  anim.push(t => { const gone = t >= w(8); p1.stat.textContent = gone ? 'últ. vez hace 3 días' : 'en línea'; p1.ava.style.filter = gone ? 'grayscale(1)' : 'none'; });
  stamp(A, 'Desapareció', '#E5483B', 330, 820, -8, 64, w(8) + 0.1);
  // B: zoom al número solo
  anim.push(t => { const k = eo(t, w(9), 0.6); p1.root.style.transform = `translate(${-140 * k}px, ${260 * k}px) scale(${1 + 0.55 * k})`; });
  stamp(A, 'Solo un número', '#F6C945', 230, 1130, 4, 64, w(12));

  // C: un número solo parece caro
  const C = layer(w(16) - 0.05, w(23) - 0.05);
  const tag = el(`<div class="abs" style="left:240px; top:420px; width:600px; height:600px"><svg viewBox="0 0 600 600" width="600" height="600"><path d="M120 120 H420 L560 300 L420 480 H120 Z" fill="#F6C945" stroke="#1A120C" stroke-width="16" stroke-linejoin="round"/><text x="320" y="332" text-anchor="middle" font-family="Inter" font-weight="900" font-size="86" fill="#1A120C">$15.000</text></svg></div>`, C);
  pop(tag, w(16));
  anim.push(t => { tag.style.rotate = `${Math.sin((t - w(16)) * 3) * 6 * Math.exp(-(Math.max(0, t - w(16))) * 0.6)}deg`; });
  stamp(C, '¿Caro?', '#E5483B', 360, 980, -10, 96, w(22));

  // D: la fórmula: precio + lo que incluye + pregunta de cierre
  const D = layer(w(23) - 0.05, w(35) - 0.05);
  const cards = [['💲', 'El precio', w(26)], ['📦', 'Lo que incluye', w(29)], ['❓', 'Una pregunta para cerrar', w(32)]];
  const pos = [[90, 420], [700, 420], [395, 900]];
  cards.forEach(([ic, tx, a], i) => {
    const c = el(`<div class="card3" style="left:${pos[i][0]}px; top:${pos[i][1]}px"><div class="n">${i + 1}</div><div class="ic">${ic}</div><div class="t">${tx}</div><div class="ok">✓</div></div>`, D);
    pop(c, a); const ok = c.querySelector('.ok'); fadeIn(ok, w(34) + i * 0.15, 0.15);
  });

  // E: la respuesta que vende, y la barra de ventas que sube
  const E = layer(w(35) - 0.05, w(51) - 0.05);
  const p2 = phone(E, 'Martín');
  p2.root.style.top = '300px';
  const q2 = bubble(p2, 'in', '¿Precio? 🙏', w(35) - 0.05, false); q2.style.opacity = 1;
  bubble(p2, 'out', 'Son <b>$15.000</b>.', w(36));
  bubble(p2, 'out', 'Incluye corte, lavado y barba ✂️', w(38));
  bubble(p2, 'out', '¿Te lo reservo para <b>hoy</b> o para <b>mañana</b>? 😉', w(43));
  const ty = el('<div class="typing"><i></i><i></i><i></i></div>', p2.chat);
  anim.push(t => { ty.style.opacity = (t > w(50) - 0.3 && t < w(50) + 0.5) ? 1 : 0; ty.style.display = t < w(50) + 0.5 ? 'flex' : 'none'; });
  bubble(p2, 'in', '¡Mañana a las 11! 🙌', w(50) + 0.5);

  // F: ya no piensa SI comprar, piensa CUÁNDO
  const F = layer(w(51) - 0.05, w(63) - 0.05);
  const si = el(`<div class="abs" style="left:0; width:1080px; top:520px; text-align:center; font-weight:900; font-size:150px; color:#1A120C; letter-spacing:-4px">¿SI COMPRA?</div>`, F);
  pop(si, w(54));
  const line = el('<div class="abs" style="left:150px; top:610px; height:26px; width:0; background:#E5483B; border-radius:13px; rotate:-4deg"></div>', F);
  anim.push(t => { line.style.width = (780 * eo(t, w(60), 0.3)) + 'px'; anim; });
  const cu = el(`<div class="abs" style="left:0; width:1080px; top:820px; text-align:center; font-weight:900; font-size:210px; color:#1A120C; letter-spacing:-6px">¿CUÁNDO?</div>`, F);
  pop(cu, w(62) - 0.1);

  // Barra de ventas: aparece con la respuesta buena y crece hasta el final de la idea
  sales([[0, null], [w(35) + 0.2, 8], [w(50) + 0.6, 55], [w(51), 55], [w(62), 100], [w(63) - 0.05, null]]);

  // G: vuelve al inicio (bucle): el cliente pregunta el precio otra vez
  const G = layer(w(63) - 0.05, 999);
  const p3 = phone(G, 'Martín');
  bubble(p3, 'in', '¿Precio? 🙏', w(69));

  captions(['desaparecen', 'número', 'caro', 'precio', 'incluye', 'pregunta', 'cerrar', 'reservo', 'cuándo', 'comprar']);
};
