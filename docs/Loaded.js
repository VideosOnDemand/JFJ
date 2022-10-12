
export default async function loadPage (){
    await new Promise((resolve) => {
        
        const { readyState } = document;
        
        if([ 'complete' , 'loaded' ].includes(readyState)){
            resolve();
            return;
        }
        
        window.addEventListener('load',() => resolve);
    })
}
