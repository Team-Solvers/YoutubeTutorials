export function getNextCard(title,creator){
    let card = `<div class="next-card ">                    
                    <i class="play-button fas fa-play-circle"></i>
                    <div class="next-video-description px-3">
                        <div class="next-video-title">
                            ${title}
                        </div>
                        <div class="next-video-creator">
                            ${creator}
                        </div>
                    </div>                    
                </div>`
}