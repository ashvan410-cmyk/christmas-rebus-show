import {shuffle} from './party-games.mjs';
export const christmasCategories=['General Christmas','Christmas Songs','Christmas Carols','Christmas Movies'];
export function createRebusDeck(options,random,christmas){
 const category=options.rebusCategory==='christmas'?'christmas':'random';
 const count=[10,20,30].includes(Number(options.puzzleCount))?Number(options.puzzleCount):20;
 if(category==='random')return shuffle(random).slice(0,count).map(({batch,...p})=>({...p,title:'Rebus puzzle',theme:'Rebus'}));
 return christmasCategories.flatMap((theme,i)=>shuffle(christmas.filter(p=>p.theme===theme)).slice(0,Math.floor(count/4)+(i<count%4?1:0)));
}
