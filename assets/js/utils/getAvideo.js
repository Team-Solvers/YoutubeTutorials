import {
    URLS
} from "./queries.js"

let videoquery = URLS.crashCourseVideoSearchQuery;
let videoIdquery = URLS.crashCourseVideoIdQuery;
let videoContentquery = URLS.crashCourseVideoIdContentQuery;

export async function getVideoFromId(videoId) {
    try{
        let queryUrl = videoIdquery + videoId;
        let result = await fetch(queryUrl);
        let video = await result.json();        
        return video; 
    }
    catch{
        console.log("couldn't load videos");
        return [];
    }       
}

export async function getVideoInfoWithID(videoId) {
    try{
        let queryUrl = videoContentquery + videoId;
        let result = await fetch(queryUrl,{
            mode: 'no-cors'
        });
        let video = await result.json();        
        return video; 
    }
    catch(e){
        console.log(e);
        return [];
    }   
}
