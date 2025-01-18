const productContainer = document.querySelector('.products');
const productsItens = document.querySelectorAll('.product');

let currentIndex = 0;
const itemWidth = 300;
const itemCount = productsItens.length;

function moveCarousel(){
    document.querySelector('.prev-btn').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        updateCarousel();      
    });
    document.querySelector('.next-btn').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % itemCount;
        updateCarousel();
        
    });
}

function updateCarousel(){

    const offset = -currentIndex * itemWidth;
    productContainer.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
}

moveCarousel();
