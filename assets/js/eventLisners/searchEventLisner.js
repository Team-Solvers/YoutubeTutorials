import {Video} from "../models/video.js"
import {Playlist} from "../models/playlist.js"
import {URLS as queryURLS} from "../utils/queries.js"
import {getVideoCard2} from "../components/videoCard.js"

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
    let query = queryInput.value;
    if (query === "") {
        queryInput.style.border = "2px solid red";
        return
    }

    queryInput.style.border = "";    
    let searchType = getRadioValue();        
    if(searchType == "option1"){
        getPlaylistFromApi(query);
    }
    else {
        getVideosFromApi(query);
    }    
}

async function getPlaylistFromApi(query){    
        
    outPutDiv.innerHTML = "";
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

    const playBtns = document.querySelectorAll("img");
    console.log(playBtns);
    playBtns.forEach(playBtn => {
        playBtn.addEventListener('click', gotoplayListVideoPlayer);
    })

}

async function getVideosFromApi(query) {
    outPutDiv.innerHTML = "";
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
        let videoCard = getVideoCard2(defaultThumbnail, title, description, videoId, index)
        outPutDiv.innerHTML += videoCard;
    })

    const playBtns = document.querySelectorAll(".img");    
    playBtns.forEach(playBtn => {
        playBtn.addEventListener('click', playVideo);
    })
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
    if(e.target.classList.contains('watch-vid')){

        let index = e.target.classList[0];
        let videoObj = videos[index];
        let videoId = videoObj.id.playlistId;
        let snippet = videoObj.snippet;
        let title = snippet.title;
        let channelTitle = snippet.channelTitle;
        window.location.href = `./playlist.html?playlistId=${videoId}&title=${title}&channel=${channelTitle}`;
    }
}   

function getRadioValue() {
    for (var i = 0, length = radios.length; i < length; i++) {        
        if (radios[i].checked) {                                  
            return radios[i].value;            
        }
    }
}