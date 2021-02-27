export function getCarousel(pageType){
    return `<div id="MySlide" class="carousel carousel  slide w-80 mx-auto mt-4 container-fluid" data-ride="carousel">
    <ol class="carousel-indicators carousel-indicators-${pageType}">
        <li data-target="#MySlide" data-slide-to="0" class="active" style="width: 70px; height: 7px;"></li>            
    </ol>
    <div class="carousel-inner carousel-inner-${pageType}">                                         
    </div>

    <a class="carousel-control-prev" href="#MySlide" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true" style="width: 50px; height: 50px;"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#MySlide" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true" style="width: 50px; height: 50px;"></span>
        <span class="sr-only">Next</span>
    </a>
    </div>`
}