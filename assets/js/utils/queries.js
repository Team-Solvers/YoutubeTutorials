import {API_KEYS} from "./apiKeys.js"

export const URLS = {
    playlistQuery : `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${API_KEYS.UTUBEKEY}&maxResults=40&playlistId=`,
    playlistWidthIDQuery : `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&key=${API_KEYS.UTUBEKEY}&maxResults=40&playlistId=`,
}