const API_KEY = 'AIzaSyAo7zx4s_hb_GHQ3U5mHfNenl1qMIR45X8';
const OAUTHKEY = '158696250283-eu6cv2dbs1lrovc0shi3dvsq6pigiifd.apps.googleusercontent.com';
const URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&type=playlist&q=`;

const searchForm = document.querySelector(".search-form");
const queryInput = document.querySelector(".search-input");
const outPutDiv = document.querySelector(".out-put-div");
const searchBtn = document.querySelector(".search-icon");

searchBtn.addEventListener('click',getVideosFromApi);


async function getVideosFromApi(e){  
    e.preventDefault();
    outPutDiv.innerHTML = "";  
    let query = queryInput.value;
    if(query === ""){
        queryInput.style.border = "2px solid red";
        return
    }
    queryInput.style.border = "";
    let queryUrl = URL + query;
    let result = await fetch(queryUrl);
    result = await result.json();
    
    let videos = result.items;
    
    videos.forEach(video => {        
        let videoId = video.id.videoId;
        // console.log(video);
        let title = video.snippet.title;
        let description = video.snippet.description;
        let defaultThumbnail = video.snippet.thumbnails.medium.url;
        let channelTitle = video.snippet.channelTitle;

        // console.group(defaultThumbnail);
        let videoCard = getVideoCard2(defaultThumbnail,title,description,videoId)
        outPutDiv.innerHTML += videoCard;
    })

    const playBtns = document.querySelectorAll(".watch-vid");
    playBtns.forEach(playBtn => {
        playBtn.addEventListener('click',playVideo);
    })
}

function getVideoCard(thumbNail,title,description,videoId){
    return `<div class="card-contain col-md-6 col-sm-6"><div class="card" style="width: 30rem;">
    <img class="card-img-top" src="${thumbNail}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">${description}</p>
      <a href="#" class="${videoId} btn btn-primary watch-vid">Watch</a>
    </div></div>
  </div>`
}

function getVideoCard2(thumbNail,title,description,videoId){
    return `<div class="col-1"></div>
    <div class="col-md-3 my-2">
    <div class="wrapper-card">
      <img
        src="${thumbNail}"
        alt="">
      <h2 class="ml-2 mt-2">${title}</h2>
      <div class=" bg-">
        <a href="#" class="ml-3 mb-5 d-inline-block">${description}</a>
      </div>
    </div>
  </div>`
}



function playVideo(e){
    console.log(e.target.classList)
}