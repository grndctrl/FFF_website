import { CoreModule } from '../core'
import Swiper from 'swiper/js/swiper.min.js'

class Slider extends CoreModule {
  init() {
    this.sliders = document.querySelectorAll('.slider')
    this.swipers = []

    let gutter = 44
    if (window.innerWidth < 1024) {
      gutter = 12
    }

    this.sliders.forEach((slider) => {
      let swiper

      if (slider.classList.contains('full')) {
        swiper = new Swiper(slider, { 
          slidesPerView: 'auto',
          loop: false,
          centeredSlides: true,
          spaceBetween: gutter,
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
          spaceBetween: gutter,
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
