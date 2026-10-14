let context;
export function unlockShowAudio(){
 try{context??=new (globalThis.AudioContext||globalThis.webkitAudioContext)();context.resume().catch(()=>{});}catch{}
 // Safari must receive play directly inside the button's click, before a render/effect.
 globalThis.document?.querySelectorAll('[data-show-audio]').forEach(media=>{media.muted=false;media.play().catch(()=>{});});
}
export function playShowSound(kind,volume=.4){
 if(!context||context.state!=='running')return false;
 const now=context.currentTime,level=Math.max(0,Math.min(1,volume));
 const bell=kind==='wild';
 for(const [frequency,weight] of (bell?[[659,1],[1318,.5],[1845,.25],[2670,.12]]:[[kind==='strike'?150:660,1]])){
  for(let hit=0;hit<(bell?3:1);hit++){const start=now+hit*.4,osc=context.createOscillator(),gain=context.createGain();osc.type='sine';osc.frequency.value=frequency;gain.gain.setValueAtTime(.001,start);gain.gain.exponentialRampToValueAtTime(Math.max(.001,level*(bell?.22:.1)*weight),start+.008);gain.gain.exponentialRampToValueAtTime(.001,start+(bell?1.5:.5));osc.connect(gain);gain.connect(context.destination);osc.start(start);osc.stop(start+(bell?1.6:.55));}
 }
 return true;
}
