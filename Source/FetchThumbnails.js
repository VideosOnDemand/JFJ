
// import { decode } from 'https://deno.land/x/imagescript@1.2.9/mod.ts'

import { join , fromFileUrl , dirname } 
from 'https://deno.land/std@0.159.0/path/mod.ts'

import { parse } 
from 'https://deno.land/std@0.159.0/encoding/yaml.ts'


const root = join(dirname(fromFileUrl(import.meta.url)),'..');

const thumbnails = join(root,'Thumbnails');

const { readTextFile , writeFile } = Deno;
const { log } = console;



const path = (filename) =>
    join(root,'Videos',`${ filename }.yml`);
    

for(let n = 400;n <= 1100;n += 100){

    const name = path(`${ n }`.padStart(3,'0'));

    const streams = parse(await readTextFile(name));
    
    for(const { stream , video } of streams){
        
        const path = join(thumbnails,`${ stream }.jpg`);
        
        await fetchThumbnail(video,path);
    }
}



function fetchThumbnail ( videoId , path ){
    
    return new Promise(async (resolve) => {
        
        try {
            
            const url = `https://img.youtube.com/vi/${ videoId }/0.jpg`
            
            const response = await fetch(url);
            
            const blob = await response.blob();
            
            const buffer = await blob.arrayBuffer();
            
            const bytes = new Uint8Array(buffer);
                
            await writeFile(path,bytes);
            
            log(`${ videoId } => ${ path }`);
            
            setTimeout(resolve,600 + Math.random() * 300);
            
        } catch (error) {
            console.error(error);
            Deno.exit();
        }
        
    })
}
