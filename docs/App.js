
import loadPage from 'Loaded'
import Fuse from 'Fuse'

const { parse } = JSON;
const { log } = console;

const response = await fetch('Streams.json');

const streams = await response.json();


const searchOptions = {
    minMatchCharLength : 2 ,
    isCaseSentitive : false ,
    findAllMatches : true ,
    includeScore : true ,
    shouldSort : true ,
    threshold : 0.3 ,
    keys : [ 'title' ]
}


const fuse = new Fuse(streams,searchOptions);


await loadPage();


const preview = document.querySelector('#streams');

for(const stream of streams)
    addPreview(stream);


const input = document.querySelector('#search > input');

input.addEventListener('input',() => {
    
    const results = fuse.search(input.value);
    
    for(const element of preview.children)
        element.remove();
        
    for(const result of results)
        addPreview(result.item);
})


function addPreview ( stream ){
    
    const element = document.createElement('div');
    
    element.className = `
        box-content rounded-md h-64 w-40 bg-red-50
        hover:cursor-pointer hover:bg-red-100
        ease-in-out duration-100
    `;
    
    preview.appendChild(element);
}
