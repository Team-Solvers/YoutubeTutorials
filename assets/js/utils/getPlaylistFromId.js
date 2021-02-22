import {
    URLS
} from "./queries.js"

let playlistQuery = URLS.playlistQuery;
let playlistWidthIDQuery = URLS.playlistWidthIDQuery;

export async function getPlayListInfo(playListId) {
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

export async function getPlayListInfoWithID(playListId) {
    try{
        let queryUrl = playlistWidthIDQuery + playListId;
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
