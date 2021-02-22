import {
    getPlayListInfo
} from "../utils/getPlaylistFromId.js"

import {
    getPlayListInfoWithID
} from "../utils/getPlaylistFromId.js"

import {
    getNextCard
} from "../components/playlistNextCard.js"

const root = document.documentElement;
const playListSideBar = document.querySelector(".side-bar-list");
const videoFrame = document.querySelector(".video-iframe");
const nextCards = document.querySelector(".next-card");

const playListURL = 'PL4cUxeGkcC9jLYyp2Aoh6hcWuxFDX6PBJ';
let thumbnail;
let playListVideos = getVideos(playListURL);
let videosInfo;
let videosID;

async function getVideos() {
    videosInfo = await getPlayListInfo(playListURL);
    videosID = await getPlayListInfoWithID(playListURL);
    if (videosInfo.length > 0) {
        addVideosToCards(videosInfo,videosID);
        addStartingVideo(videosInfo,videosID,0,false);
        addEventLisnetToNextCards();
    }        
    return videosInfo;
}

function addVideosToCards(videos,videosID) {
    for(let i = 0;i < videos.length; i++){
        let videoId = videosID[i].contentDetails.videoId;

        //add a constructor for this;
        let video = videos[i];               
        let snippetObj = video.snippet;
        let title = snippetObj.title;
        let channelTitle = snippetObj.channelTitle;
        let videoDescription = snippetObj.videoDescription;
        thumbnail = snippetObj.thumbnails.default;
        let nextCard = getNextCard(title,channelTitle,videoId,i);            
        playListSideBar.innerHTML += nextCard;
    }
    
    let url = thumbnail.url;
    let styleProperty = `url(${url})`;
    root.style.setProperty("--slide-1",styleProperty);
    root.style.setProperty("--opacity-1",0.2);
}

function addStartingVideo(videosInfo,videosID,index,shoulStart) {  
    let videoId = videosID[index].contentDetails.videoId;
    let video = videosInfo[index];  
    let snippetObj = video.snippet;
    let channelTitle = snippetObj.channelTitle;
    let videoDescription = snippetObj.videoDescription;   
    videoFrame.src = `https://www.youtube.com/embed/${videoId}`;

    if(shoulStart){
        videoFrame.click();
    }
}

function addEventLisnetToNextCards(){
    let nextCards = document.querySelectorAll(".next-card ");
    nextCards.forEach(nextCard => {
        nextCard.addEventListener('click',changeMainFrame);
    })
}

function changeMainFrame(e){
    let classes = e.target.classList;
    if(classes.contains('next-card')){
        addStartingVideo(videosInfo,videosID,classes[0],true);
    }
}