import {Video} from "../models/video.js"
import {Playlist} from "../models/playlist.js"
import {URLS as queryURLS} from "../utils/queries.js"

const URL = queryURLS.searchVideo;
const PLURL = queryURLS.searchPlaylist;

const searchForm = document.querySelector(".search-form");
const queryInput = document.querySelector(".search-input");
const outPutDiv = document.querySelector(".out-put-div");
const searchBtn = document.querySelector(".search-form");
var radios = document.querySelectorAll('.cat-check');

let videos;

searchBtn.addEventListener('submit', getSearchResult);

function getSearchResult(e){
    e.preventDefault();

    outPutDiv.innerHTML = "";
    let query = queryInput.value;
    if (query === "") {
        queryInput.style.border = "2px solid red";
        return
    }

    queryInput.style.border = "";
    
    let searchType = getRadioValue();    
    if(searchType == "option2"){
        //get videos
    }
    else {//if(searchType == "option1"){
        getPlaylistFromApi(query);
    }    
}

async function getPlaylistFromApi(query){    
        
    let queryUrl = PLURL + query;
    let result = await fetch(queryUrl);
    result = await result.json();    

    videos = result.items;     
    videos.forEach((video, index) => {        
        let videoId = video.id.playlistId;        
        console.log(videoId);   
        let title = video.snippet.title;
        let description = video.snippet.description;
        let defaultThumbnail = video.snippet.thumbnails.medium.url;
        let channelTitle = video.snippet.channelTitle;
        
        let currentPlaylist = new Playlist(videoId,title,description,defaultThumbnail,channelTitle);                
        let videoCard = getVideoCard2(defaultThumbnail, title, description, videoId, index);
        outPutDiv.innerHTML += videoCard;
    })

    const playBtns = document.querySelectorAll(".watch-vid");
    playBtns.forEach(playBtn => {
        playBtn.addEventListener('click', gotoplayListVideoPlayer);
    })

}

async function getVideosFromApi(e) {
    e.preventDefault();
    let videoType = getRadioValue();        
    console.log(radios);

    outPutDiv.innerHTML = "";
    let query = queryInput.value;
    if (query === "") {
        queryInput.style.border = "2px solid red";
        return
    }
    queryInput.style.border = "";
    let queryUrl = URL + query;
    let result = await fetch(queryUrl);
    result = await result.json();

    videos = result.items;
    // console.log(videos);
    videos.forEach((video, index) => {
        let videoId = video.id.videoId;        
        let title = video.snippet.title;
        let description = video.snippet.description;
        let defaultThumbnail = video.snippet.thumbnails.medium.url;
        let channelTitle = video.snippet.channelTitle;

        let currentVideo = new Video(videoId,title,description,defaultThumbnail,channelTitle);                
        let videoCard = getVideoCard(defaultThumbnail, title, description, videoId, index)
        outPutDiv.innerHTML += videoCard;
    })

    const playBtns = document.querySelectorAll(".watch-vid");
    playBtns.forEach(playBtn => {
        playBtn.addEventListener('click', playVideo);
    })
}

function getVideoCard(thumbNail, title, description, videoId, index) {
    return `<div class="card-contain col-md-6 col-sm-6"><div class="card" style="width: 30rem;">
    <img class="card-img-top" src="${thumbNail}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">${description}</p>
      <a href="#" class="${index} btn btn-primary watch-vid">Watch</a>
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
      <h2 class="ml-2 mt-2" >${title}</h2>
      <div class=" bg-">
        <a href="#" class="ml-3 mb-5 d-inline-block">${description}</a>
      </div>
    </div>
  </div>`
}

function playVideo(e) {
    let index = e.target.classList[0];
    let videoObj = videos[index];
    let videoId = videoObj.id.videoId;
    let snippet = videoObj.snippet;
    let title = snippet.title;
    let channelTitle = snippet.channelTitle;
    window.location.href = `./videoPlayer.html?videoId=${videoId}&title=${title}&channel=${channelTitle}`;
}

function gotoplayListVideoPlayer(e){
    let index = e.target.classList[0];
    let videoObj = videos[index];
    let videoId = videoObj.id.playlistId;
    let snippet = videoObj.snippet;
    let title = snippet.title;
    let channelTitle = snippet.channelTitle;
    window.location.href = `./playlist.html?playlistId=${videoId}&title=${title}&channel=${channelTitle}`;
}   

function getRadioValue() {
    for (var i = 0, length = radios.length; i < length; i++) {        
        if (radios[i].checked) {                                  
            return radios[i].value;            
        }
    }
}