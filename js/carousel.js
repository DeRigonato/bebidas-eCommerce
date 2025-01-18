const carousel = document.querySelector('.carousel');
const itens = document.querySelectorAll('.carousel-item');

let currentIndex = 0;
const itemCount = itens.length;
const interval = 5000;

function moveCarousel(){
    currentIndex++;
    if(currentIndex === itemCount){
        currentIndex = 0;
    }

    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

setInterval(moveCarousel, interval);
