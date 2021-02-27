export function getPlaylistSwiperCard(playlist) {
    return ` <div class="swiper-slide ${playlist.playlistID}" style="background-image:url(${playlist.thumbnail})">
    <img src="${playlist.thumbnail}" class="entity-img" />
    <div class="content">
        <p class="title" data-swiper-parallax="-30%" data-swiper-parallax-scale=".7">${playlist.channelTitle}</p>
        <span class="caption" data-swiper-parallax="-20%">${playlist.description}</span>
    </div>
</div>`
}