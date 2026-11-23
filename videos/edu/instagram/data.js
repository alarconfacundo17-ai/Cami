// "3 errores de tu Instagram que espantan clientes"
window.DATA = {
  brand: 'NEGOCIOS + IA',
  scenes: [
    { type:'hook', from:0, range:[0, idx('clientes.')], green:['espantan','clientes.'], icon:'instagram', iconAt:T('instagram'), strikeAt:T('espantan'), iconTop:900 },
    { type:'item', from:T('uno'), title:'Una bio que no dice nada', titleAt:T('biografía'),
      card:{ label:'TU BIOGRAFÍA', at:T('biografía'), items:[
        { mark:'bad', text:'✨ Bienvenidos!! ✨', at:T('dice'), strikeAt:T('entiende') },
        { mark:'ok', text:'Barbería en Palermo', at:T('dónde') },
        { mark:'ok', text:'Cortes desde $12.000', at:T('segundos') },
        { mark:'ok', text:'Turnos en el link ↓', at:T('van') } ] } },
    { type:'item', from:T('dos'), title:'"Te mando privado"', titleAt:T('contestar'),
      card:{ kind:'chat', label:'COMENTARIOS', at:T('contestar'), items:[
        { who:'in', text:'¿Precio? 🙏', at:T('contestar')+0.3 },
        { who:'out', text:'Te mando privado 😉', at:T('mando') },
        { who:'note', text:'NUNCA VOLVIÓ A ESCRIBIR', at:T('nunca') } ] } },
    { type:'item', from:T('tres',3), title:'Sin link para comprar', titleAt:T('link'), icon:'link', iconAt:T('link'),
      card:{ label:'LO QUE TIENE QUE HACER', at:T('comprar'), items:[
        { tag:'1', text:'Mandarte un mensaje', at:T('turno') },
        { tag:'2', text:'Esperar tu respuesta', at:T('cada') },
        { tag:'3', text:'Preguntar el precio', at:T('paso') },
        { mark:'bad', text:'Se cansó y se fue', at:T('cliente') } ] } },
    { type:'cta', from:T('comentá'), at:T('comentá'), keyword:'PERFIL', sub:'y te digo cómo arreglar el tuyo', subAt:T('digo') }
  ]
};
