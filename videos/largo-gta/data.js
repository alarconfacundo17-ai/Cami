// Video largo: "Cómo GTA VI vendió 3.790 millones en un día — 7 lecciones para tu negocio".
// Cada escena empieza en una palabra: at:[sección, palabra, ocurrencia].
const usd = v => 'US$ ' + Math.round(v).toLocaleString('es-AR');
window.KEYS = ['récord','estrategia','lección','espera','tráiler','fecha','preventa','seña','premium','reseña','LANZAR','ultimate','cinco'];
window.BEATS = [
  // 0 · Gancho
  { at:0, type:'counter', from:0, to:3790000000, fmt:usd, dur:3.2, size:130, label:'en un solo día', src:'FUENTE: ROCKSTAR / TAKE-TWO', nego:'sorpresa' },
  { at:[1,'según'], type:'big', html:'El lanzamiento más grande<br>del <span style="color:#3DDC84">entretenimiento</span>', size:96, top:300, more:[['🎬 Más que cualquier película', [1,'película'], 560, 56]], nego:'senala' },
  { at:[1,'pero'], type:'big', bg:'light', html:'¿Fue solo por el <s style="text-decoration-color:#FF5A3C">juego</s>?', size:110, top:260, more:[['<span style="background:#1E7B55; color:#fff; padding:6px 30px; border-radius:16px; font-size:120px; font-weight:900">ESTRATEGIA</span>', [1,'estrategia'], 500, 60]], nego:'sorpresa' },
  { at:[1,'siete'], type:'cards', head:'7 lecciones para tu negocio', ic:60, ts:40, h:200, top:340, w:150, items:[['1','',''],['2','',''],['3','',''],['4','',''],['5','','',[1,'cinco'],true],['6','',''],['7','','']], nego:'pulgar' },
  // 1 · La espera vende
  { at:[2,'gta'], type:'title', label:'LECCIÓN 1', title:'La espera vende', sub:'13 años esperando GTA VI', nego:'saluda' },
  { at:[2,'pasaron'], type:'timeline', items:[['2013','GTA V',[2,'pasaron']],['2023','Anuncio',[2,'trece']],['2026','GTA VI',[2,'millones']]] , nego:'sorpresa' },
  { at:[2,'la'], type:'big', html:'Cuando la gente <span style="color:#3DDC84">espera</span> algo,<br>lo compra con más ganas', size:92, top:300, nego:'senala' },
  { at:[2,'una'], type:'vs', bg:'light', left:{label:'LO PONE SIN AVISAR', icon:'🥐', text:'La torta aparece en la vidriera'}, right:{label:'AVISA ANTES', icon:'📣', text:'"El viernes sale la torta nueva"', a:[2,'vende']}, nego:'senala' },
  { at:[2,'cómo'], type:'check', bg:'light', items:[['Elige lo próximo que vas a lanzar',[2,'elige']],['Hoy: una historia con una pista',[2,'publica']],['Mañana: otra pista',[2,'mañana']],['El día del lanzamiento: lo muestras completo',[2,'lanzamiento']]], nego:'pulgar' },
  // 2 · Pocos adelantos
  { at:[3,'en'], type:'title', label:'LECCIÓN 2', title:'Pocos adelantos,<br>pero muy buenos', sub:'Solo 2 tráileres en dos años y medio', subTop:600, nego:'saluda' },
  { at:[3,'el'], type:'cards', items:[['🎬','Tráiler 1','90 millones de vistas en 24 h · récord Guinness'],['🎬','Tráiler 2','Más de 465 millones en 24 h (según Rockstar)',[3,'segundo']]], w:520, nego:'sorpresa' },
  { at:[3,'la'], type:'vs', bg:'light', left:{label:'TODOS LOS DÍAS, CUALQUIER COSA', icon:'📷📷📷', text:'20 fotos apuradas'}, right:{label:'POCO, PERO MUY BUENO', icon:'✨', text:'1 foto bien hecha de tu producto estrella', a:[3,'una']}, nego:'senala' },
  { at:[3,'cómo'], type:'check', bg:'light', items:[['Elige lo que más vendes',[3,'elige']],['Una sola foto o video muy bien hecho',[3,'hazle']],['Buena luz, fondo limpio, de cerca',[3,'buena']],['Fíjalo arriba de todo en tu perfil',[3,'fíjalo']]], nego:'pulgar' },
  // 3 · Una fecha marcada
  { at:[4,'gta'], type:'title', label:'LECCIÓN 3', title:'Una fecha marcada', sub:'19 de noviembre: millones se organizaron para ese día', nego:'saluda' },
  { at:[4,'en'], type:'vs', bg:'light', left:{label:'SIN FECHA', icon:'😴', text:'"Lo dejo para después"… y se olvida'}, right:{label:'CON FECHA', icon:'⏰', text:'"Solo hasta el domingo"', a:[4,'ponle']}, nego:'senala' },
  { at:[4,'una',3], type:'big', html:'Una fecha convierte<br>el <s style="text-decoration-color:#FF5A3C">"después"</s> en <span style="color:#3DDC84">"ahora"</span>', size:100, top:290, nego:'pulgar' },
  { at:[4,'cómo'], type:'check', bg:'light', items:[['Revisa tus promociones publicadas',[4,'revisa']],['Si no tiene fecha de fin, agrégasela',[4,'si',2]],['Prueba: 2º producto a mitad de precio, hasta el domingo 20 h',[4,'esta',2]]], size:38, nego:'pulgar' },
  // 4 · Cobra antes
  { at:[5,'en'], type:'title', label:'LECCIÓN 4', title:'Cobra antes de lanzar', sub:'Preventa abierta 5 meses antes, sin mostrar nada nuevo', nego:'sorpresa' },
  { at:[5,'por'], type:'cards', head:'Cobrar antes te da:', items:[['💵','Plata para producir',''],['✅','La prueba de que lo quieren','',[5,'confirmación']]], w:520, top:300, nego:'senala' },
  { at:[5,'si'], type:'chat', name:'Tu negocio', lines:[['out','Abrimos turnos de diciembre 📅',[5,'si']],['out','Se reserva con seña 🔒',[5,'abre']],['in','¡Quiero uno! 🙌',[5,'funciona']]], nego:'pulgar', x:300 },
  { at:[5,'cómo'], type:'check', bg:'light', items:[['Piensa qué podrías vender por adelantado',[5,'piensa']],['Turnos de fiestas, pedidos de fin de año',[5,'turnos',2]],['"Abrimos reservas. Con seña. Hay lugar para 20"',[5,'publica']],['Si se llena: plata y demanda asegurada',[5,'si',3]]], nego:'pulgar' },
  // 5 · Opción cara
  { at:[6,'esta'], type:'title', label:'LECCIÓN 5', title:'Ofrece siempre<br>una opción cara', sub:'La que más plata le hizo ganar a Rockstar', subTop:600, nego:'senala' },
  { at:[6,'gta'], type:'cards', items:[['🎮','Estándar','US$ 79,99'],['🎮','Ultimate','US$ 99,99',[6,'ultimate'],true]], w:520, nego:'sorpresa' },
  { at:[6,'según'], type:'counter', from:0, to:9, fmt:v=>Math.round(v)+' de cada 10', dur:1.6, size:170, label:'eligieron la versión cara', src:'ESTIMACIÓN DE SENSOR TOWER (NO OFICIAL)', nego:'sorpresa' },
  { at:[6,'en'], type:'cards', bg:'light', head:'En tu negocio: 3 opciones', items:[['✂️','Básica','Corte $12.000',[6,'básica',2]],['✂️🧔','Completa','Corte + barba $18.000',[6,'completa',2],true],['👑','Premium','Todo + lavado $25.000',[6,'premium']]], nego:'senala' },
  { at:[6,'haz'], type:'big', html:'Más opciones =<br><span style="color:#3DDC84">ticket más alto</span>', size:120, top:290, nego:'pulgar' },
  { at:[6,'cómo'], type:'check', bg:'light', items:[['Toma tu servicio principal',[6,'toma']],['Agrégale algo: extra, envío rápido, garantía',[6,'un',3]],['Ponle un precio más alto',[6,'ponle']],['Ofrécelas juntas: solo da la opción',[6,'no',3]]], nego:'pulgar' },
  // 6 · Clientes hablan
  { at:[7,'desde'], type:'title', label:'LECCIÓN 6', title:'Que tus clientes<br>hablen por ti', sub:'Clips, streams y videos: casi todo lo hicieron los jugadores', subTop:600, nego:'saluda' },
  { at:[7,'tu'], type:'cards', bg:'light', items:[['⭐','Pide una reseña','a cada cliente contento',[7,'pídele']],['📲','Comparte','las historias donde te etiquetan',[7,'comparte']],['🎁','Descuento','al que suba una foto',[7,'ofrece']]], nego:'senala' },
  { at:[7,'cómo'], type:'chat', name:'Cliente', lines:[['out','¡Gracias por venir! 🙌',[7,'gracias']],['out','Si te gustó, ¿nos dejarías una reseña? Te dejo el link ⭐',[7,'si']],['in','¡Obvio! ⭐⭐⭐⭐⭐',[7,'con']]], nego:'pulgar', x:300 },
  // 7 · Mejor tarde que mal
  { at:[8,'gta'], type:'title', label:'LECCIÓN 7', title:'Mejor tarde que mal', nego:'sorpresa' },
  { at:[8,'y'], type:'timeline', items:[['2025','Primera fecha',[8,'y'],true],['Mayo 2026','Segunda fecha',[8,'porque'],true],['19 nov 2026','Salió bien',[8,'salió',2]]], nego:'senala' },
  { at:[8,'si'], type:'vs', bg:'light', left:{label:'APURADO', icon:'😬', text:'"Perdón, estamos acomodando" · ⭐⭐'}, right:{label:'UNA SEMANA DESPUÉS, BIEN HECHO', icon:'🤩', text:'Todo listo · ⭐⭐⭐⭐⭐', a:[8,'elige']}, nego:'senala' },
  { at:[8,'cómo'], type:'check', bg:'light', items:[['Antes de lanzar, haz una prueba chica',[8,'antes']],['Pruébalo con 3 clientes de confianza',[8,'prueba']],['Pregúntales qué mejorarían',[8,'pregúntales']],['Recién después, lánzalo a todos',[8,'recién']]], nego:'pulgar' },
  // 8 · Resumen
  { at:[9,'repasemos'], type:'check', head:'LAS 7 LECCIONES', step:86, size:36, items:[['1 · Haz esperar',[9,'uno']],['2 · Pocos adelantos, pero buenos',[9,'dos']],['3 · Ponle fecha a todo',[9,'tres']],['4 · Cobra antes con una preventa',[9,'cuatro']],['5 · Ofrece una opción más cara',[9,'cinco']],['6 · Que tus clientes hablen por ti',[9,'seis']],['7 · Mejor tarde que mal',[9,'siete']]], nego:'pulgar' },
  { at:[9,'no'], type:'big', html:'¿Cuál vas a aplicar <span style="color:#3DDC84">primero</span>?', size:110, top:300, nego:'senala' },
  { at:[9,'si'], type:'big', bg:'light', html:'Comenta <span style="background:#1E7B55; color:#fff; padding:0 30px; border-radius:18px">LANZAR</span>', size:140, top:250, more:[['y te ayudo a armar tu lanzamiento', [9,'lanzar'], 470, 56],['🔔 Suscríbete: una idea por semana', [9,'suscríbete'], 600, 56]], nego:'pulgar' },
];
