
import loadPage from 'Loaded'
import Fuse from 'Fuse'

const { parse } = JSON;
const { open } = window;
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

addDefaults();




const input = document.querySelector('#search > input');

input.addEventListener('input',() => {
    
    const { value } = input;
    
    clearPreview();
    
    if(value.length < 1){
        addDefaults();
        return;
    }
    
    let results = fuse.search(value);

    log(results);
    
    for(const result of results)
        addPreview(result.item);
})


function addPreview ( stream ){
    
    const element = document.createElement('div');
    
    element.className = 'box-content rounded-md h-64 w-40 bg-red-50 hover:cursor-pointer hover:bg-red-100 ease-in-out duration-100 focus:outline-none outline-none p-2 relative flex items-center justify-center';
    
    
    const number = document.createElement('div');
    
    number.className = 'text-3xl font-bold box-border top-4 left-4 w-fit h-fit text-white inset-1 absolute pointer-events-none '
    number.innerText = stream.stream;
    
    element.appendChild(number);
    
    
    const title = document.createElement('div');
    
    title.className = 'text-xl font-medium w-fit h-fit text-[#583011] opacity-50 pointer-events-none text-center'
    title.innerText = stream.title;

    element.appendChild(title);
    
    
    preview.appendChild(element);
    
    
    element.addEventListener('click',() => 
        openYoutube(stream.video));
}

function addDefaults (){
    for(const stream of streams)
        addPreview(stream);
}

function clearPreview (){
    preview.innerHTML = '';
}

function openYoutube ( videoId ){
    open(`https://www.youtube.com/watch?v=${ videoId }`,'_blank');
}
