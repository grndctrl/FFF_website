import { CoreModule, CoreEventListener } from '../core'
import Swiper from 'swiper/js/swiper.min.js'

class Slider extends CoreModule {
  init() {
    this.sliders = document.querySelectorAll('.slider')
    this.swipers = []
    this.windowWidth = window.innerWidth

    this.sliders.forEach((slider) => {
      let swiper

      if (slider.classList.contains('full')) {
        swiper = new Swiper(slider, { 
          slidesPerView: 'auto',
          loop: false,
          centeredSlides: true,
          spaceBetween: 12,
          breakpoints: {
            768: {
              spaceBetween: 44
            },
          },
          navigation: {
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev',
          },
        })
      } else {
        swiper = new Swiper(slider, { 
          slidesPerView: 1,
          loop: true,
          centeredSlides: true,
          spaceBetween: 12,
          breakpoints: {
            768: {
              spaceBetween: 44
            },
          },
          navigation: {
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev',
          },
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
