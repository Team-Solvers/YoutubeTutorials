import {API_KEYS} from "./apiKeys.js"

export const URLS = {
    playlistQuery : `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${API_KEYS.UTUBEKEY}&maxResults=40&playlistId=`,
    playlistWidthIDQuery : `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&key=${API_KEYS.UTUBEKEY}&maxResults=40&playlistId=`,
    crashCourseVideoSearchQuery : `https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEYS.UTUBEKEY}&type=video&q=`,
    crashCourseVideoIdQuery : `https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEYS.UTUBEKEY}&type=video&videoid=`,
    crashCourseVideoIdContentQuery : `https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEYS.UTUBEKEY}&id=`,
    searchVideo : `https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEYS.UTUBEKEY}&type=video&q=`,
    searchPlaylist :  `https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEYS.UTUBEKEY}&type=playlist&q=`,
    singlePlayListInfo  : `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&key=AIzaSyAo7zx4s_hb_GHQ3U5mHfNenl1qMIR45X8&id=`
}