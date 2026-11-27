// "¿Tu web se ve barata? 3 señales" — Tanda 4.
window.SCENE = ({ w, big, layer, bgAt, stamp, captions, anim, eo, nego, head, tag, ask, row, G, GD, BONE, INK, CORAL }) => {
  window.DURATION = w(40) + 1.6;
  bgAt([[0, INK], [w(7) - 0.05, BONE], [w(37) - 0.05, INK]]);
  const site = (x, y, bad) => `<div style="width:420px; height:620px; border-radius:30px; background:#fff; border:8px solid ${bad ? CORAL : G}; overflow:hidden; box-shadow:0 20px 40px rgba(0,0,0,.3)"><div style="height:240px; background:${bad ? 'linear-gradient(#555,#222)' : 'linear-gradient(135deg,#1E7B55,#3DDC84)'}"></div><div style="padding:24px; display:flex; flex-direction:column; gap:16px"><div style="height:30px; width:80%; background:#ddd; border-radius:8px"></div><div style="height:22px; width:60%; background:#eee; border-radius:8px"></div>${bad ? '' : `<div style="margin-top:20px; background:#25D366; color:#fff; font-weight:900; font-size:34px; border-radius:16px; padding:16px; text-align:center">WhatsApp · $12.000</div>`}</div></div>`;

  const A = layer(0, w(7) - 0.05);
  head(A, `¿Tu web se ve<br><span style="color:${CORAL}">barata?</span>`, 200, -1, 140);
  big(A, site(0, 0, true), 'left:110px; top:620px', -1, false);
  big(A, site(0, 0, false), 'left:550px; top:620px', -1, false);
  head(A, `<span style="font-family:JetBrains Mono,monospace; font-size:44px; letter-spacing:4px; color:${G}">3 SEÑALES</span>`, 520, -1, 44);

  const B = layer(w(7) - 0.05, w(37) - 0.05);
  head(B, '3 señales', 220, w(7), 100, INK);
  row(B, '📷', '1 · Fotos oscuras o de internet', 420, w(8), INK);
  row(B, '💲', '2 · Sin precio ni WhatsApp', 620, w(15), INK);
  row(B, '📱', '3 · Se ve mal en el celular', 820, w(25), INK);
  stamp(B, 'Ahí te miran casi todos', CORAL, 130, 1010, -3, 42, w(32));
  nego(B, 'sorpresa', 760, 1100, 290, w(31));

  const C = layer(w(37) - 0.05, 999);
  ask(C, '¿Cuántas tiene la tuya?', ['A · Ninguna', 'B · 1 o más'], w(37));

  captions(['barata', 'tres', 'señales', 'fotos', 'internet', 'precio', 'whatsapp', 'celular', 'todos']);
};
