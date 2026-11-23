// "Dejá de contestar 50 mensajes por día" (turnos online)
window.DATA = {
  brand: 'NEGOCIOS + IA',
  scenes: [
    { type:'hook', from:0, range:[0, idx('día.')], green:['contestar','50','mensajes'], icon:'chat', iconAt:T('negocio'), strikeAt:T('mensajes'), iconTop:1000 },
    { type:'big', from:T('así'), num:'3', numAt:T('así'), range:[idx('así'), idx('online.')], green:['online.'] },
    { type:'item', from:T('1'), title:'Entra a un link', titleAt:T('tu'), icon:'phone', iconAt:T('link'),
      card:{ kind:'slots', label:'SÁBADO · HORARIOS', at:T('link'), items:[
        { state:'free', text:'10:00', at:T('link')+0.2 }, { state:'busy', text:'10:30', at:T('link')+0.35 }, { state:'free', text:'11:00', at:T('ve') },
        { state:'busy', text:'11:30', at:T('libres')-0.1 }, { state:'free', text:'12:00', at:T('libres') }, { state:'free', text:'12:30', at:T('libres')+0.12 } ] } },
    { type:'item', from:T('2'), title:'Elige y listo', titleAt:T('elige'),
      card:{ label:'TU TURNO', at:T('elige'), items:[
        { tag:'DÍA', text:'Sábado 23', at:T('día',2) },
        { tag:'HORA', text:'11:00 · Corte', at:T('hora') },
        { mark:'ok', text:'Turno confirmado', at:T('agendado') } ] } },
    { type:'item', from:T('3'), title:'Vos solo mirás', titleAt:T('vos'), icon:'calendar', iconAt:T('calendario'),
      card:{ label:'TU SÁBADO', at:T('todo'), items:[
        { mark:'ok', tag:'10:00', text:'Juan · Corte', at:T('todo')+0.2 },
        { mark:'ok', tag:'11:00', text:'Martín · Barba', at:T('celular') },
        { mark:'ok', tag:'12:00', text:'Lucas · Corte', at:T('sin') },
        { tag:'💬', text:'0 mensajes respondidos', at:T('mensaje.') } ] } },
    { type:'big', from:T('sirve'), num:'✓', numAt:T('sirve'), range:[idx('sirve'), idx('más.')], green:['peluquerías,','consultorios,','gimnasios'] },
    { type:'cta', from:T('comentá'), at:T('comentá'), keyword:'TURNOS', sub:'y te muestro uno funcionando', subAt:T('muestro') }
  ]
};
