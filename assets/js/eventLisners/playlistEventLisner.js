import {
    getPlayList
} from "../utils/getPlaylistFromId.js"
import {
    getNextCard
} from "../components/playlistNextCard.js"

const playListSideBar = document.querySelector(".side-bar-list");

const playListURL = 'PL4cUxeGkcC9jLYyp2Aoh6hcWuxFDX6PBJ';
let thumbnail;
let playListVideos = getVideos(playListURL);

async function getVideos() {
    let videos = await getPlayList(playListURL);
    if (videos.length > 0) {
        addVideosToCards(videos);
        addStartingVideo(videos[0])
    }    
    return videos;
}

function addVideosToCards(videos) {
    videos.forEach(video => {
        let videoId = video.id;        
        let snippetObj = video.snippet;
        let title = snippetObj.title;
        let channelTitle = snippetObj.channelTitle;
        let videoDescription = snippetObj.videoDescription;
        thumbnail = snippetObj.thumbnails.default;
        let nextCard = getNextCard(title,channelTitle)
        playListSideBar.innerHTML += nextCard;
    })
}

function addStartingVideo(video) {
    let videoId = video.id;
    let snippetObj = video.snippet;
    let channelTitle = snippetObj.channelTitle;
    let videoDescription = snippetObj.videoDescription;    
}