import { CoreModule, CoreEventListener } from '../core'
import Swiper from 'swiper/js/swiper.min.js'

class Slider extends CoreModule {
  init() {
    this.sliders = document.querySelectorAll('.slider')
    this.swipers = []
    this.windowWidth = window.innerWidth

    this.sliders.forEach((slider) => {
      let swiper
      const cursorNext = slider.querySelector('.slider-cursor-next')
      const cursorPrev = slider.querySelector('.slider-cursor-prev')

      if (slider.classList.contains('full')) {
        swiper = new Swiper(slider, {
          threshold: 20,
          slidesPerView: 'auto',
          loop: false,
          centeredSlides: true,
          spaceBetween: 12,
          breakpoints: {
            768: {
              spaceBetween: 44
            },
            1600: {
              spaceBetween: 64
            },
          },
          navigation: {
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev',
          },
        })
      } else if (slider.classList.contains('fluid')) {
        swiper = new Swiper(slider, {
          threshold: 20,
          slidesPerView: 1.75,
          loop: false,
          centeredSlides: false,
          freeMode: true,
          freeModeMomentum: true,
          freeModeMomentumRatio: 0.65,
          freeModeMomentumVelocityRatio: 0.85,
          grabCursor: true,
          spaceBetween: 12,
          slidesOffsetBefore: 12,
          slidesOffsetAfter: 12,
          breakpoints: {
            768: {
              slidesPerView: 3.5,
              spaceBetween: 21,
              slidesOffsetBefore: 30,
              slidesOffsetAfter: 30,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 44,
              slidesOffsetBefore: 30,
              slidesOffsetAfter: 30,
            },
            2000: {
              slidesOffsetBefore: 96,
              slidesOffsetAfter: 96,
              spaceBetween: 64
            },
          },
          navigation: {
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev',
          },
        })
      } else {
        swiper = new Swiper(slider, {
          threshold: 20,
          slidesPerView: 1,
          loop: true,
          centeredSlides: true,
          spaceBetween: 12,
          breakpoints: {
            768: {
              spaceBetween: 44
            },
            1600: {
              spaceBetween: 64
            },
          },
          navigation: {
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev',
          },
        })
      }

      if (cursorNext && cursorPrev) {
        cursorPrev.addEventListener('click', () => {
          swiper.slidePrev()
        })
        cursorNext.addEventListener('click', () => {
          swiper.slideNext()
        })
      }

      this.swipers.push(swiper)
    })

    return super.init()
  }

  destroy() {
    return super.destroy()
  }
}

export const slider = new Slider()
