import {getVideoFromId} from "../utils/getAvideo.js"
import {getVideoInfoWithID} from "../utils/getAvideo.js"


const root = document.documentElement;
const videoFrame = document.querySelector(".video-iframe");
const channelTitle = document.querySelector(".pl-title");
const videoTitle = document.querySelector(".content-creator"); 

const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get('videoId');
const title = urlParams.get('title');
const channel = urlParams.get('channel');

getSpecificVideo(videoId);

async function getSpecificVideo(videoId){
    videoFrame.src = `https://www.youtube.com/embed/${videoId}`;    
    videoTitle.innerText = title;
    channelTitle.innerText = channel;
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

