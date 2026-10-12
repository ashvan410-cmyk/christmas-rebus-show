import { readFile,writeFile,readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { root,hashes,fingerprint } from './release-files.mjs';
const duplicates=(await readdir(root)).filter(name=>/^app(?:[ _-]+\d+|[ _-]+copy|[ _-]+\(\d+\))$/i.test(name));
if(duplicates.length)throw Error('Wrong upload folder name: '+duplicates.join(', ')+'. Application updates belong in app/, not numbered copies.');
const manifest=JSON.parse(await readFile(resolve(root,'release-manifest.json'),'utf8'));
const actual=await hashes();
const mismatches=Object.keys({...actual,...manifest.files}).filter(file=>actual[file]!==manifest.files[file]);
if(mismatches.length)throw Error('Incomplete or outdated source upload. Replace the entire release package, including release-manifest.json. Mismatched files: '+mismatches.join(', '));
if(process.env.WORKERS_CI_BRANCH&&process.env.WORKERS_CI_BRANCH!=='main')throw Error('Production release must build from main.');
let commit=process.env.WORKERS_CI_COMMIT_SHA||null;
if(!commit){try{commit=execFileSync('git',['rev-parse','HEAD'],{cwd:root,stdio:['ignore','pipe','ignore']}).toString().trim()}catch{}}
const info={release:manifest.release,sourceFingerprint:fingerprint(actual),commit,branch:process.env.WORKERS_CI_BRANCH||'local',builtAt:new Date().toISOString()};
await writeFile(resolve(root,'build/deployment-info.json'),JSON.stringify(info,null,2)+'\n');
console.log('Verified complete release:',info.release,'source:',info.sourceFingerprint,'commit:',commit);
