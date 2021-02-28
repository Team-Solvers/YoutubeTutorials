import {
    getPlayListInfo
} from "../utils/getPlaylistFromId.js"

import {
    getPlayListInfoWithID
} from "../utils/getPlaylistFromId.js"

import {
    getSinglePlaylistInfo
} from "../utils/getPlaylistFromId.js"

import {Playlist} from "../models/playlist.js"
import {getPlaylistSwiperCard} from "../components/swiperCard.js"
import {getCarousel} from "../components/carousel.js"

const swiper = document.querySelector(".swiper-container");
let body = document.querySelector('.container');


const urlParams = new URLSearchParams(window.location.search);
let pageType = urlParams.get('t'); 
let playlistsGlobal = [];
console.log(pageType);     

let videoLists = {
    "web" : ['PL4cUxeGkcC9gQcYgjhBoeQH7wiAyZNrYa',"PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3","UC80PWRj_ZU8Zu0HSMNVwKWw"],
    "mobile" : ['PL4cUxeGkcC9jLYyp2Aoh6hcWuxFDX6PBJ',"PL4cUxeGkcC9ixPU-QkScoRBVxtPPzVjrQ","PLQkwcJG4YTCTq1raTb5iMuxnEB06J1VHX"],
    "graphics" : [],
    "introduction" : [],
    "blender" : []
}



// updateCards("mobile")
updateCards(pageType)

async function updateCards(pageType){
    let startCarousel = getCarousel(pageType);
    let playlists = videoLists[pageType];    
    let results = [];    

    for(let index = 0; index < playlists.length; index++){               
        let playlistId = playlists[index];
        let result = await getSinglePlaylistInfo(playlistId);         
        results.push(result);
    }

    body.innerHTML = startCarousel;    
    let slider = document.querySelector(`.carousel-inner`);
    let indicators = document.querySelector(`.carousel-indicators`);

    if(results.length == 0){
        return
    }
    for(let index = 0; index < results.length; index++){                
        let result = results[index];        
        let playlistId = playlists[index];
        let active = index == 0 ? "active" : "not-active";          
        if(result.items.length < 1){
            continue;
        }
        let playlistObject = result.items[0].snippet;     
        console.log(playlistObject);
        
        let playlist = new Playlist(playlistId,playlistObject.localized.title,playlistObject.localized.description,playlistObject.thumbnails.high.url,playlistObject.channelTitle);
        playlistsGlobal.push(playlist);
        let newCard = sliderImage(playlist.title,playlist.channelTitle ,playlist.thumbnail,active,index);        
        slider.innerHTML += newCard;
        indicators.innerHTML += `<li data-target="#MySlide" data-slide-to="${index}" class="" style="width: 70px; height: 7px;"></li>`;                
    }

    let buttons = document.querySelectorAll(".playlist-btns");
    buttons.forEach((button) => {
        button.addEventListener('click',goToPlaylistPage);
    })
}

function sliderImage(title,channelTitle, url,active,index) {
    let newCard = ` <div class="carousel-item ${active}">
                        <img src=${url}
                            class="d-block w-100" alt="">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>${title}</h5>
                            <h2>${channelTitle}</h2>
                            <button type="button" class="${index} playlist-btns px-5 py-3 m-3 btn btn-dark">CheckItOut</button>
                        </div>
                    </div> `
    return newCard;
}

function goToPlaylistPage(e){
    let cls = e.target.classList; 
    let ind = cls[0];
    let playlist = playlistsGlobal[ind];
    window.location.href = `./playlist.html?playlistId=${playlist.playlistID}&title=${playlist.title}&channel=${playlist.channelTitle}`;

}
