import { readFile } from 'node:fs/promises';
const expected=JSON.parse(await readFile(new URL('../build/deployment-info.json',import.meta.url),'utf8'));
const base=process.env.CF_PUBLIC_URL||'https://christmas-tradition-games.steadytogether.workers.dev';
let last;
for(let attempt=0;attempt<12;attempt++){
 try{
  const response=await fetch(base+'/__deployment?verify='+Date.now(),{cache:'no-store',signal:AbortSignal.timeout(10000)});
  const actual=await response.json();
  if(!response.ok||actual.sourceFingerprint!==expected.sourceFingerprint||actual.commit!==expected.commit||actual.release!==expected.release)throw Error('Live release does not match this build: '+JSON.stringify(actual));
  if(!/no-store/.test(response.headers.get('cache-control')||''))throw Error('Diagnostic response lacks no-store.');
  const home=await fetch(base+'/?verify='+Date.now(),{cache:'no-store',signal:AbortSignal.timeout(10000)});
  if(!home.ok||home.headers.get('x-source-fingerprint')!==expected.sourceFingerprint||!/no-store/.test(home.headers.get('cache-control')||''))throw Error('Homepage is not served by the expected release or lacks cache policy.');
  console.log('LIVE VERIFIED:',actual.release,'commit:',actual.commit,'source:',actual.sourceFingerprint);process.exit(0);
 }catch(e){last=e.message;console.log('Verification attempt',attempt+1,last)}
 if(attempt<11)await new Promise(resolve=>setTimeout(resolve,5000));
}
throw Error('Deployment command completed, but live verification failed. '+last);
