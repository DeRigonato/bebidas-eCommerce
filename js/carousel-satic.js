class Carousel {
    constructor(container, products, prevBtn, nextBtn, itemWidth = 300){
        this.container = document.querySelector(container);
        this.products = document.querySelectorAll(products);
        this.prevBtn = document.querySelector(prevBtn);
        this.nextBtn = document.querySelector(nextBtn);
        this.itemWidth = itemWidth;
        this.currentIndex = 0;
        this.itemCount = this.products.length;

        this.init();
    }

    init(){
        this.prevBtn.addEventListener('click', () => this.movePrev());
        this.nextBtn.addEventListener('click', () => this.moveNext());
        this.updateCarousel();
    }

    movePrev(){
        this.currentIndex = (this.currentIndex - 1 + this.itemCount) % this.itemCount;
        this.updateCarousel();
    }

    moveNext(){
        this.currentIndex = (this.currentIndex + 1) % this.itemCount;
        this.updateCarousel();
    }

    updateCarousel(){
        const offset = -this.currentIndex * this.itemWidth;
        this.container.style.transform = `translateX(${offset}px)`;
    }
}

const promotionsCarousel = new Carousel(
    '.promotions-container .products',
    '.promotions-container .product',
    '.promotions-container .prev-btn',
    '.promotions-container .next-btn'
)
const productsCarousel = new Carousel(
    '.products-container .products',
    '.products-container .product',
    '.products-container .prev-btn',
    '.products-container .next-btn'
)