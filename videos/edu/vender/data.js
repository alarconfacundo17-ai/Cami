// "Esta respuesta de WhatsApp te está haciendo perder ventas"
window.DATA = { brand:'NEGOCIOS + IA', scenes:[
  { type:'hook', from:0, range:[0, idx('ventas.')], green:['perder','ventas.'], icon:'chat', iconAt:T('whatsapp'), strikeAt:T('ventas.'), iconTop:1000 },
  { type:'example', from:T('hola,'), title:'Lo que hace casi todo el mundo',
    card:{ kind:'chat', label:'WHATSAPP', at:T('hola,'), items:[
      { who:'in', text:'Hola, ¿precio? 🙏', at:T('hola,')+0.2 },
      { who:'out', text:'$15.000', at:T('quince') },
      { who:'note', text:'EL CLIENTE DESAPARECE', at:T('desaparece.') } ] } },
  { type:'big', from:T('haz'), num:'3', numAt:T('haz'), range:[idx('haz'), idx('cambio.')], green:['cambio.'] },
  { type:'item', from:T('uno'), title:'Salúdalo por su nombre', titleAt:T('salúdalo'),
    card:{ kind:'chat', label:'MEJOR ASÍ', at:T('salúdalo'), items:[
      { who:'in', text:'Hola, ¿precio?', at:T('salúdalo')+0.2 },
      { who:'out', text:'¡Hola, Martín! 👋', at:T('nombre.') } ] } },
  { type:'item', from:T('dos'), title:'Precio + lo que incluye', titleAt:T('dale'),
    card:{ kind:'chat', label:'MEJOR ASÍ', at:T('dale'), items:[
      { who:'out', text:'$15.000: corte, lavado y perfilado de barba ✂️', at:T('incluye.') } ] } },
  { type:'item', from:T('tres'), title:'Cierra con una pregunta', titleAt:T('termina'),
    card:{ kind:'chat', label:'MEJOR ASÍ', at:T('pregunta:'), items:[
      { who:'out', text:'¿Te lo reservo para hoy o para mañana? 😉', at:T('reservo') },
      { who:'in', text:'¡Mañana a las 11!', at:T('mañana?')+0.4 } ] } },
  { type:'cta', from:T('esa'), at:T('comenta'), keyword:'VENDER', sub:'y te paso más respuestas así', subAt:T('paso') } ] };
