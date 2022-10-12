

import { join , fromFileUrl , dirname } 
from 'https://deno.land/std@0.159.0/path/mod.ts'

import { parse } 
from 'https://deno.land/std@0.159.0/encoding/yaml.ts'


const { readTextFile , writeTextFile } = Deno;
const { clear , log } = console;


const root = join(dirname(fromFileUrl(import.meta.url)),'..');

const combined = 
    join('Videos','Combined.json');

const path = (filename) =>
    join(root,'Videos',`${ filename }.yml`);
    

let data = [];

for(let n = 0;n <= 1100;n += 100){

    const name = path(`${ n }`.padStart(3,'0'));

    data = data.concat(parse(await readTextFile(name)));
}

await writeTextFile(combined,JSON.stringify(data));
