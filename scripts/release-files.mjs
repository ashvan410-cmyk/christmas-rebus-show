import { readdir, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
export const root = resolve(new URL('..', import.meta.url).pathname);
const folders = ['app','build','components','hooks','lib','scripts','cloudflare'];
const excluded = new Set(['build/deployment-info.json']);
export async function sourceFiles(){
 const result=[];
 async function walk(path){for(const entry of await readdir(resolve(root,path),{withFileTypes:true})){
  const file=path+'/'+entry.name;
  if(entry.isDirectory())await walk(file);else if(!excluded.has(file))result.push(file);
 }}
 for(const folder of folders){try{await walk(folder)}catch(e){if(e.code!=='ENOENT')throw e}}
 for(const file of ['package.json','package-lock.json','vite.config.ts','next.config.ts','tsconfig.json','postcss.config.mjs','.openai/hosting.json']){
  try{await readFile(resolve(root,file));result.push(file)}catch(e){if(e.code!=='ENOENT')throw e}
 }
 return result.sort();
}
export async function hashes(){const result={};for(const file of await sourceFiles())result[file]=createHash('sha256').update(await readFile(resolve(root,file))).digest('hex');return result;}
export function fingerprint(files){return createHash('sha256').update(JSON.stringify(files)).digest('hex');}
