export function getVideoCard2(thumbNail,title,description,videoId,index){
    return `<div class="col-1"></div>
    <div class="${index} col-md-3 my-2 watch-vid">
    <div class="wrapper-card">
      <img class= "${index} watch-vid"
        src="${thumbNail}"
        alt="">
      <h4 class="ml-2 mt-2">${title}</h4>
      <div class=" bg-">
        <p class="ml-3 mb-5 d-inline-block">${description}</p>
      </div>
    </div>
  </div>`
}