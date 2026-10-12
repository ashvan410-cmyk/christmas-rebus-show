import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { root,hashes,fingerprint } from './release-files.mjs';
const release=process.argv[2];
if(!release||!/^[a-zA-Z0-9._-]+$/.test(release))throw Error('Provide a unique release name.');
const files=await hashes();
await writeFile(resolve(root,'release-manifest.json'),JSON.stringify({release,sourceFingerprint:fingerprint(files),files},null,2)+'\n');
console.log('Created release manifest:',release,Object.keys(files).length,'source files');
