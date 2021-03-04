import {
    Video
} from "../models/video.js"
import {
    Playlist
} from "../models/playlist.js"
import {
    URLS as queryURLS
} from "../utils/queries.js"
import {
    getVideoCard2
} from "../components/videoCard.js"

import {getHistory, addHistory,removeHistory} from "../local.js"

const URL = queryURLS.searchVideo;
const PLURL = queryURLS.searchPlaylist;

const historyBtn = document.querySelector(".history")
const clear = document.querySelector(".clear");
const dropdown = document.querySelector(".drop-wrapper");

const undraw = document.querySelector('.undraw');
const container = document.querySelector('.results')

const searchForm = document.querySelector(".search-form");
const queryInput = document.querySelector(".search-input");
const outPutDiv = document.querySelector(".out-put-div");
const searchBtn = document.querySelector(".search-icon");
var radios = document.querySelectorAll('.cat-check');

const loader = `<div class="spinner-container wrapper">
<div class="spinner-border" style="width: 7rem; height: 7rem;" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>  `;

let videos =[];
searchForm.addEventListener('submit', getSearchResult);
searchBtn.addEventListener('click', getSearchResult);
clear.addEventListener('click',clearHistory)

loadHistory();

function loadHistory(){    
    dropdown.innerHTML = "";
    let history = getHistory();    
    for(let h of history){
        dropdown.innerHTML = `<a class="dropdown-item" href="#">${h}</a>` + dropdown.innerHTML;
    }    
}

function clearHistory(){
    removeHistory();
    loadHistory();
}

function getSearchResult(e) {
    e.preventDefault();

    container.style.display = "block";
    let query = queryInput.value;
    if (query === "") {
        queryInput.style.border = "2px solid red";
        return
    }
    
    addHistory(query)
    loadHistory();
    undraw.innerHTML = loader;
    
    queryInput.style.border = "";
    let searchType = getRadioValue();
    if (searchType == "option1") {
        getPlaylistFromApi(query);
    } else {
        getVideosFromApi(query);
    }
}

async function getPlaylistFromApi(query) {
    let queryUrl = PLURL + query ;    
    try {
        let result = await fetch(queryUrl);
        result = await result.json();   
        videos = result.items;
    } catch (error) {
        console.log("couldn't load data")        
    }    
    undraw.innerHTML = "";
    outPutDiv.innerHTML = ""
    
    videos.forEach((video, index) => {
        let videoId = video.id.playlistId;
        // console.log(videoId);
        let title = video.snippet.title;
        let description = video.snippet.description;

        let defaultThumbnail = video.snippet.thumbnails.medium.url;
        let channelTitle = video.snippet.channelTitle;
        description = (description.length > 35) ? `${description.slice(0, 35)}...` : description
        let currentPlaylist = new Playlist(videoId, title, description, defaultThumbnail, channelTitle);
        let videoCard = getVideoCard2(defaultThumbnail, title, description, videoId, index);
        outPutDiv.innerHTML += videoCard;
    })

    const playBtns = document.querySelectorAll("img");
    // console.log(playBtns);
    playBtns.forEach(playBtn => {
        playBtn.addEventListener('click', gotoplayListVideoPlayer);
    })

}

async function getVideosFromApi(query) {
    let queryUrl = URL + query;
    let result = [];
    try {
        result = await fetch(queryUrl);
        result = await result.json();   
        videos = result.items;
    } catch (error) {
        console.log("couldn't load data")        
    }   
    undraw.innerHTML = "";
    outPutDiv.innerHTML = "";

    videos = result.items;
    // console.log(videos);
    videos.forEach((video, index) => {
        let videoId = video.id.videoId;
        let title = video.snippet.title;
        let description = video.snippet.description;
        let defaultThumbnail = video.snippet.thumbnails.medium.url;
        let channelTitle = video.snippet.channelTitle;

        description = (description.length > 35) ? `${description.slice(0, 35)}...` : description
        let currentVideo = new Video(videoId, title, description, defaultThumbnail, channelTitle);
        let videoCard = getVideoCard2(defaultThumbnail, title, description, videoId, index)
        outPutDiv.innerHTML += videoCard;
    })

    const playBtns = document.querySelectorAll("img");
    console.log(playBtns);
    playBtns.forEach(playBtn => {
        playBtn.addEventListener('click', playVideo);
    })
}


function playVideo(e) {
    console.log('cliked');
    let index = e.target.classList[0];
    let videoObj = videos[index];
    let videoId = videoObj.id.videoId;
    let snippet = videoObj.snippet;
    let title = snippet.title;
    let channelTitle = snippet.channelTitle;
    window.location.href = `./videoPlayer.html?videoId=${videoId}&title=${title}&channel=${channelTitle}`;
}

function gotoplayListVideoPlayer(e) {
    if (e.target.classList.contains('watch-vid')) {

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