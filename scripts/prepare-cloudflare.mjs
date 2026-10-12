import {readFile,writeFile} from 'node:fs/promises';
const config=JSON.parse(await readFile(new URL('../dist/server/wrangler.json',import.meta.url),'utf8'));
const databaseId=process.env.CF_D1_DATABASE_ID;
if(!databaseId||!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(databaseId))throw Error('Set CF_D1_DATABASE_ID to your Cloudflare D1 database UUID in the build settings.');
config.name=process.env.CF_WORKER_NAME||'christmas-rebus-show';
config.workers_dev=true;
config.d1_databases=[{binding:'DB',database_name:process.env.CF_D1_DATABASE_NAME||'christmas-rebus',database_id:databaseId,migrations_dir:'../../cloudflare/migrations'}];
await writeFile(new URL('../dist/server/wrangler.github.json',import.meta.url),JSON.stringify(config,null,2)+'\n');
console.log('Prepared public Cloudflare Worker configuration with the DB binding and room migration.');
