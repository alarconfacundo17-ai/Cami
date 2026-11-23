// "Si tienes un local y no hiciste esto en Google, no existes"
window.DATA = { brand:'NEGOCIOS + IA', scenes:[
  { type:'hook', from:0, range:[0, idx('existes.')], green:['existes.'], icon:'store', iconAt:T('local'), strikeAt:T('existes.'), iconTop:1000 },
  { type:'big', from:T('se'), num:'✓', numAt:T('se'), range:[idx('se'), idx('gratis.')], green:['gratis.'] },
  { type:'item', from:T('uno'), title:'Apareces en Maps', titleAt:T('aparecer'), icon:'google', iconAt:T('maps'),
    card:{ label:'CERCA DE TI', at:T('buscan'), items:[
      { mark:'ok', text:'Tu negocio · 4,8 ★', at:T('cerca.') } ] } },
  { type:'item', from:T('dos'), title:'Tu info a la vista', titleAt:T('muestra'),
    card:{ label:'TU PERFIL', at:T('muestra'), items:[
      { tag:'HORA', text:'Mar a Sáb, 10 a 20', at:T('horario,') },
      { tag:'FOTOS', text:'24 fotos del local', at:T('fotos') },
      { tag:'TEL', text:'Llamar con un toque', at:T('teléfono.') } ] } },
  { type:'item', from:T('tres'), title:'Reseñas que venden', titleAt:T('reseñas'),
    card:{ label:'RESEÑAS', at:T('reseñas'), items:[
      { mark:'ok', text:'★★★★★ "Excelente atención"', at:T('clientes',2) },
      { mark:'ok', text:'★★★★★ "Vuelvo seguro"', at:T('venden') } ] } },
  { type:'item', from:T('error')-0.35, title:'El error más común', titleAt:T('error'),
    card:{ kind:'chat', label:'RESEÑA DE 1 ★', at:T('responder'), items:[
      { who:'in', text:'★☆☆☆☆ "Me atendieron mal"', at:T('responder') },
      { who:'out', text:'Gracias por avisarnos. Ya lo solucionamos 🙏', at:T('respóndelas') },
      { who:'note', text:'RESPONDE TODAS', at:T('malas.') } ] } },
  { type:'cta', from:T('comenta'), at:T('comenta'), keyword:'MAPA', sub:'y te ayudo a crearlo en 10 minutos', subAt:T('ayudo') } ] };
