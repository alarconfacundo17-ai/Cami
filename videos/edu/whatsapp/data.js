// "Tu WhatsApp puede atender clientes mientras duermes"
window.DATA = {
  brand: 'NEGOCIOS + IA',
  scenes: [
    { type:'hook', from:0, range:[0, idx('gratis.')], green:['duermes.','gratis.'], icon:'chat', iconAt:T('whatsapp'), iconTop:1000 },
    { type:'big', from:T('activa'), num:'3', numAt:T('activa'), range:[idx('activa'), idx('business.')], green:['whatsapp','business.'] },
    { type:'item', from:T('uno'), title:'Mensaje de bienvenida', titleAt:T('mensaje'),
      card:{ kind:'chat', label:'CLIENTE NUEVO', at:T('mensaje'), items:[
        { who:'in', text:'Hola, ¿están abiertos?', at:T('saluda') },
        { who:'out', text:'¡Hola! 👋 Gracias por escribir. Te respondemos en minutos.', at:T('nuevo.') } ] } },
    { type:'item', from:T('dos'), title:'Mensaje de ausencia', titleAt:T('mensaje',2),
      card:{ kind:'chat', label:'23:40', at:T('mensaje',2), items:[
        { who:'in', text:'¿Tienen turno mañana?', at:T('responde') },
        { who:'out', text:'Ahora estamos cerrados 🌙 Mañana a las 9 te respondemos.', at:T('avisa') } ] } },
    { type:'item', from:T('tres',2), title:'Respuestas rápidas', titleAt:T('respuestas'),
      card:{ label:'ESCRIBES "/" Y APARECE', at:T('barra'), items:[
        { tag:'/precio', text:'Corte $12.000', at:T('precio') },
        { tag:'/dónde', text:'Av. Siempre Viva 742', at:T('dirección') },
        { tag:'/horario', text:'Mar a Sáb, 10 a 20', at:T('horario',2) } ] } },
    { type:'cta', from:T('comenta'), at:T('comenta'), keyword:'TEXTOS', sub:'y te paso los mensajes listos', subAt:T('paso') }
  ]
};
