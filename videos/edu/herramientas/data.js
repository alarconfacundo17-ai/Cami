// "5 herramientas gratis que todo negocio debería usar"
window.DATA = {
  brand: 'NEGOCIOS + IA',
  scenes: [
    { type:'hook', from:0, range:[0, idx('usar.')], green:['gratis'], icon:'store', iconAt:T('negocio'), iconTop:1000 },
    { type:'item', from:T('uno'), title:'Perfil de Empresa de Google', titleAt:T('perfil'), icon:'store', iconAt:T('google'),
      card:{ label:'PARA QUÉ SIRVE', at:T('aparecer'), items:[
        { mark:'ok', text:'Apareces en Google Maps', at:T('aparecer') },
        { mark:'ok', text:'Reseñas, fotos y horarios', at:T('mapa') } ] } },
    { type:'item', from:T('dos'), title:'WhatsApp Business', titleAt:T('whatsapp'), icon:'chat', iconAt:T('whatsapp'),
      card:{ label:'PARA QUÉ SIRVE', at:T('responder'), items:[
        { mark:'ok', text:'Respuestas automáticas', at:T('responder') },
        { mark:'ok', text:'Catálogo de productos', at:T('automático') } ] } },
    { type:'item', from:T('tres'), title:'Canva', titleAt:T('canva'), icon:'phone', iconAt:T('canva'),
      card:{ label:'PARA QUÉ SIRVE', at:T('publicaciones'), items:[
        { mark:'ok', text:'Plantillas para Instagram', at:T('publicaciones') },
        { mark:'ok', text:'Listo en minutos', at:T('minutos') } ] } },
    { type:'item', from:T('cuatro'), title:'Google Calendar', titleAt:T('calendar'), icon:'calendar', iconAt:T('calendar'),
      card:{ label:'PARA QUÉ SIRVE', at:T('turnos'), items:[
        { mark:'ok', text:'Página para reservar turnos', at:T('turnos') },
        { mark:'ok', text:'Lo compartes con un link', at:T('link') } ] } },
    { type:'item', from:T('cinco',2), title:'Una IA', titleAt:T('inteligencia'), icon:'comment', iconAt:T('inteligencia'),
      card:{ label:'PARA QUÉ SIRVE', at:T('escribir'), items:[
        { mark:'ok', text:'Escribe tus publicaciones', at:T('escribir') },
        { mark:'ok', text:'Responde dudas de clientes', at:T('dudas') } ] } },
    { type:'cta', from:T('guarda'), at:T('comenta'), keyword:'CINCO', sub:'y te ayudo a configurarlas', subAt:T('ayude') }
  ]
};
