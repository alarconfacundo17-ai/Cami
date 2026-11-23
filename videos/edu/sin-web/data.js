// "Si tu negocio no tiene web, estás perdiendo clientes"
window.DATA = {
  brand: 'NEGOCIOS + IA',
  scenes: [
    { type:'hook', from:0, range:[0, idx('días')], green:['perdiendo','clientes'], icon:'store', iconAt:T('negocio'), strikeAt:T('perdiendo'), iconTop:1060 },
    { type:'big', from:T('te'), num:'3', numAt:T('explico'), range:[idx('te'), idx('qué')], green:['por','qué.'] },
    { type:'item', from:T('uno'), title:'Te buscan en Google', titleAt:T('busca'), icon:'google', iconAt:T('google'),
      card:{ label:'RESULTADOS', at:T('tienen'), items:[
        { mark:'ok', text:'Barbería El Filo · web', at:T('generan') },
        { mark:'ok', text:'Estilo Norte · web', at:T('confianza') },
        { mark:'bad', text:'Tu negocio · sin web', at:T('click') } ] } },
    { type:'item', from:T('dos'), title:'Instagram no alcanza', titleAt:T('instagram'), icon:'instagram', iconAt:T('instagram'),
      card:{ kind:'chat', label:'MENSAJES', at:T('encuentra'), items:[
        { who:'in', text:'¿Cuánto sale?', at:T('precios') },
        { who:'in', text:'¿Abren el sábado?', at:T('horarios') },
        { who:'note', text:'SE FUE A OTRO NEGOCIO', at:T('va') } ] } },
    { type:'item', from:T('tres'), title:'Vende mientras duermes', titleAt:T('web',3), icon:'clock', iconAt:T('pedidos'),
      card:{ label:'ESTA NOCHE', at:T('veinticuatro'), items:[
        { mark:'ok', tag:'02:14', text:'Pedido nuevo', at:T('horas') },
        { mark:'ok', tag:'03:40', text:'Consulta recibida', at:T('aunque') },
        { tag:'😴', text:'Tú: durmiendo', at:T('durmiendo') } ] } },
    { type:'cta', from:T('si',2), at:T('comenta'), keyword:'WEB', sub:'y te cuento cómo tener la tuya', subAt:T('cuento') }
  ]
};
