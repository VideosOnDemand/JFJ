
// //  Code snippet to extract playlist titles + links
// 
// console.log(JSON.stringify([ ... document.querySelectorAll('.ytd-playlist-video-renderer > h3')]
// .map((object) => {
// 
//   const link = object.querySelector('a');
//   return {
//     text : object.innerText ,
//     path : (new URL(link.href)).searchParams.get('v')
//   }
// })))


import { join , fromFileUrl , dirname } from 'https://deno.land/std@0.159.0/path/mod.ts';
import { parse } from "https://deno.land/std@0.159.0/encoding/yaml.ts";

const root = join(dirname(fromFileUrl(import.meta.url)),'..');

const path = (filename) =>
    join(root,'Videos',`${ filename }.yml`);

for(let n = 2000;n <= 2100;n += 100){

    const name = path(n);

    const edited = path(`${ n }-edited`);

    const { clear , log } = console;
    const { readTextFile , writeTextFile } = Deno;



    clear();

    log(root,name)

    const data = parse(await readTextFile(name));


    log(data);

    const string = data.map((entry) => {
        
        let stream = null;
        
        entry.text = entry.text.replace(/- (\d+)β? -/,(_,a) => {
            stream = a;
            return '-';
        });
        
        entry.text = entry.text.replace(/ *- *(\d+)β? *$/,(_,a) => {
            stream = a;
            return '';
        });
        
        
        if(stream)
            stream = parseInt(stream) + 2000;
        
        return {
            stream : stream ?? 'null' ,
            title : entry.text ,
            video : entry.video ?? entry.path
        }
    }).map(({ stream , title , video }) => {
        return '\n' +
            `-   stream : ${ stream }` + '\n' +
            `    title  : ${ title }` + '\n' +
            `    video  : ${ video }` 
    }).join('\n');

    await writeTextFile(edited,string);
}
