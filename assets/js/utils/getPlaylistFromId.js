import {
    API_KEYS
} from "./apiKeys"

import {
    URLS
} from "./apiKeys"

let playlistQuery = URLS.playlistQuery;

export async function getPlayList(playListId) {
    console.log("called")
    try {
        let queryUrl = playlistQuery + playListId;
        let result = await fetch(queryUrl);
        videos = await result.json();
        videos = videos.items;
        console.log(videos);
        return videos;
    } catch {
        return [];
    }
}