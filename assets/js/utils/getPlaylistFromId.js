import {
    URLS
} from "./queries.js"

let playlistQuery = URLS.playlistQuery;

export async function getPlayList(playListId) {
    try{
        let queryUrl = playlistQuery + playListId;
        let result = await fetch(queryUrl);
        let videos = await result.json();
        videos = videos.items;        
        return videos; 
    }
    catch{
        console.log("couldn't load videos");
        return [];
    }       
}
