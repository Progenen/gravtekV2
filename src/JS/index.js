import {Swiper} from "swiper";
import {Autoplay, Navigation, Pagination, Thumbs} from "swiper/modules";

function updateCardSliders () { 
    document.querySelectorAll(".slider-notloaded").forEach(slider => {
        const swiperSlider = new Swiper(slider, {
            autoplay: {
                delay: 1500,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".product-card__pagination",
            },
            loop: true,
            modules: [Autoplay, Pagination],
            effect: "fade",
            on: {
                init() {
                    this.autoplay.stop();

                    this.el.parentElement.addEventListener("mouseenter", () => {
                        console.log("ok");
                        this.autoplay.start();
                    });
                    
                    this.el.parentElement.addEventListener("mouseleave", () => {
                        console.log("ok2");
                        this.autoplay.stop();
                    })
                }
            }
        });
    })
}

document.addEventListener('DOMContentLoaded', function () {
    if (window.innerWidth <= 876) {
        const burger = document.querySelector(".header__burger");
        const menu = document.querySelector(".header__mobmenu");

        burger.addEventListener("click", () => {
            burger.classList.toggle("active");
            menu.classList.toggle("active");
        })
    }

    if (document.querySelector(".product-card")) {
        const productCardsSlider = document.querySelectorAll(".product-card__slider"); 

        updateCardSliders();
    }

    if (document.querySelector(".single__slider")) {

        const singleNavSlider = new Swiper(".single__slider-nav", {
            direction: "vertical",
            slidesPerView: 3,
            spaceBetween: 20,
            modules: [Navigation],
            navigation: {
                nextEl: ".single__slider-nav-arrow--next",
                prevEl: ".single__slider-nav-arrow--prev",
            }

        });
        
        const singleMainSlider = new Swiper(".single__slider-main", {
            slidesPerView: 1,
            modules: [Thumbs],
            thumbs: {
                el: singleNavSlider
            }
        });
    }
});