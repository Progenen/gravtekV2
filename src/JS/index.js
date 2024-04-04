import {Swiper} from "swiper";
import {Autoplay, EffectFade, Navigation, Pagination, Thumbs} from "swiper/modules";

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
        const sliderNavSlides = document.querySelectorAll(".single__slider-nav-slide");
        const sliderMainSlider = document.querySelectorAll(".single__slider-main-slide");
        const sliderMainVideo = document.querySelector(".single__slider-main-slide video");
        const sliderNavPrev = document.querySelector(".single__slider-nav-arrow--prev");
        const sliderNavNext = document.querySelector(".single__slider-nav-arrow--next");
        const sliderNavWrapper = document.querySelector(".single__slider-nav .swiper-wrapper");
        const sliderMainNext = document.querySelector(".single__slider-main-arrow--next");
        const sliderMainPrev = document.querySelector(".single__slider-main-arrow--prev");
        let sliderNavOffset = 0;
        
        const singleNavSlider = new Swiper(".single__slider-nav", {
            direction: "vertical",
            slidesPerView: "auto",
            allowSlideNext: false,
            allowSlidePrev: false, 
            spaceBetween: 20,
        });
        
        const singleMainSlider = new Swiper(".single__slider-main", {
            slidesPerView: 1,
            modules: [Thumbs, Pagination, EffectFade, Navigation],
            effect: 'fade',
            thumbs: {
                swiper: singleNavSlider
            },
            navigation: {
                nextEl: ".single__slider-main-arrow--next",
                prevEl: ".single__slider-main-arrow--prev",

            },
            pagination: {
                el: ".single__slider-main-pag"
            },
            breakpoints: {
                1220: {
                    pagination: false
                }
            },
            on: {
                slideChange: () => {
                    const index = singleMainSlider.realIndex;
                    if (sliderNavSlides[index].classList.contains("single__slider-nav-slide--video")) {
                        sliderMainVideo.play();
                    } else {
                        sliderMainVideo.pause();
                    }

                },
            }
        });

        sliderMainNext.addEventListener("click", () => {
            sliderNavPrev.classList.remove("swiper-button-disabled");
            if (sliderNavOffset <= ((sliderNavWrapper.scrollHeight - (sliderNavSlides[0].clientHeight + 20) * 2) * -1)) {
                sliderNavNext.classList.add("swiper-button-disabled");
            } else {
                sliderNavOffset -= sliderNavSlides[0].clientHeight + 20;
                sliderNavNext.classList.remove("swiper-button-disabled");
            }
            sliderNavWrapper.style.transform = `translateY(${sliderNavOffset}px)`;

            console.log(sliderNavOffset);
        })
        
        sliderMainPrev.addEventListener("click", () => {

            sliderNavNext.classList.remove("swiper-button-disabled");
            if (sliderNavOffset >= -2) {
                sliderNavOffset = 0;
                sliderNavPrev.classList.add("swiper-button-disabled");
            } else {
                sliderNavOffset += sliderNavSlides[0].clientHeight + 20;
                sliderNavPrev.classList.remove("swiper-button-disabled");
            }
            sliderNavWrapper.style.transform = `translateY(${sliderNavOffset}px)`;
            console.log(sliderNavSlides[0].clientHeight);

        })

        sliderNavNext.addEventListener("click", () => {
            sliderNavPrev.classList.remove("swiper-button-disabled");
            if (sliderNavOffset <= ((sliderNavWrapper.scrollHeight - (sliderNavSlides[0].clientHeight + 20) * 2) * -1)) {
                sliderNavNext.classList.add("swiper-button-disabled");
            } else {
                sliderNavOffset -= sliderNavSlides[0].clientHeight + 20;
                sliderNavNext.classList.remove("swiper-button-disabled");
            }
            sliderNavWrapper.style.transform = `translateY(${sliderNavOffset}px)`;

        })
        
        sliderNavPrev.addEventListener("click", () => {
            sliderNavNext.classList.remove("swiper-button-disabled");
            if (sliderNavOffset === 0) {
                sliderNavOffset = 0;
                sliderNavPrev.classList.add("swiper-button-disabled");
            } else {
                sliderNavOffset += sliderNavSlides[0].clientHeight + 20;
                sliderNavPrev.classList.remove("swiper-button-disabled");
            }
            sliderNavWrapper.style.transform = `translateY(${sliderNavOffset}px)`;

        })
        
        sliderMainVideo.play();
    
        sliderNavSlides.forEach((slide, i) => {
            slide.addEventListener("mouseover", (e) => {
                singleNavSlider.slideTo(i);
                singleMainSlider.slideTo(i);
            })
        });

        if (window.innerWidth <= 1220) {
            singleNavSlider.destroy();
        }

        const reviewsBtn = document.querySelector(".reviews__btn");
        const reviewsForm = document.querySelector(".reviews__form");

        reviewsBtn.addEventListener("click", () => {
            reviewsForm.classList.toggle("active");
        })
    }
});