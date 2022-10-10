
//  Code snippet to extract playlist titles + links

console.log(JSON.stringify([ ... document.querySelectorAll('.ytd-playlist-video-renderer > h3')]
.map((object) => {

  const link = object.querySelector('a');
  return {
    text : object.innerText ,
    path : (new URL(link.href)).searchParams.get('v')
  }
})))
