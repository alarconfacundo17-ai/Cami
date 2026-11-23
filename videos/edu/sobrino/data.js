// "Tu sobrino te hizo la web gratis... y te está costando clientes"
window.DATA = { brand:'NEGOCIOS + IA', scenes:[
  { type:'hook', from:0, range:[0, idx('clientes.')], green:['costando','clientes.'], icon:'store', iconAt:T('web'), strikeAt:T('costando'), iconTop:1000 },
  { type:'big', from:T('mira'), num:'3', numAt:T('mira'), range:[idx('mira'), idx('señales.')], green:['señales.'] },
  { type:'item', from:T('uno'), title:'Tarda en abrir', titleAt:T('tarda'), icon:'phone', iconAt:T('celular'),
    card:{ label:'DESDE EL CELULAR', at:T('tarda'), items:[
      { tag:'1 s', text:'Cargando…', at:T('más') },
      { tag:'3 s', text:'Sigue cargando…', at:T('segundos') },
      { mark:'bad', text:'Se fue a otra web', at:T('gente') } ] } },
  { type:'item', from:T('dos'), title:'Sin botón de WhatsApp', titleAt:T('botón'),
    card:{ label:'TU WEB', at:T('botón'), items:[
      { mark:'bad', text:'Teléfono escondido abajo', at:T('vista.') },
      { mark:'bad', text:'Nadie lo busca', at:T('nadie') },
      { mark:'ok', text:'Botón verde siempre a la vista', at:T('número.') } ] } },
  { type:'item', from:T('tres',3), title:'Invisible en Google', titleAt:T('aparece'), icon:'google', iconAt:T('google'),
    card:{ label:'RESULTADOS', at:T('buscan'), items:[
      { mark:'ok', text:'Tu competencia', at:T('rubro') },
      { mark:'ok', text:'Otra competencia', at:T('barrio.') },
      { mark:'bad', text:'Tu negocio: no aparece', at:T('perder.') } ] } },
  { type:'cta', from:T('si'), at:T('comenta'), keyword:'WEB', sub:'y te digo cómo arreglarla', subAt:T('digo') } ] };
