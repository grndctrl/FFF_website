import { CoreModule, CoreScrollScene, CoreEventListener } from '../core'
import anime from 'animejs'
import { scrollController, ScrollMagic } from '../core/scroll-controller'

class TextSlider extends CoreModule {
  init() {
    this.sliders = document.querySelectorAll('.text-slider')
    this.windowWidth = window.innerWidth

    const scenes = []

    this.sliders.forEach((slider) => {
      const slides = slider.querySelectorAll('.text-slider-slide')
      const container = slider.querySelector('.text-slider-container')
      const indicator = slider.querySelector('.text-slider-indicator')

      // const svg = indicator.querySelector('svg .circle-stroke')
      // anime({
      //   targets: svg,
      //   strokeDashoffset: anime.setDashoffset,
      //   easing: 'easeInOutSine',
      //   duration: 400
      // })

      const current = indicator.querySelector('.progress .current')
      const total = indicator.querySelector('.progress .total')
      current.innerText = 1
      total.innerText = slides.length

      const start = document.createElement('div')
      start.classList.add('text-slider-start')
      slider.appendChild(start)

      scenes.push(
        new CoreScrollScene({
          triggerElement: start,
          triggerHook: 0,
          enter: (event) => {
            console.log('start enter')
            this.pinContainer(container)
          },
          leave: (event) => {
            console.log('leave')
            this.unpinContainer(container)
          }
        })
      )

      const placeholder = document.createElement('div')
      placeholder.classList.add('text-slider-placeholder')
      slides.forEach((slide, index) => {
        const slidePlaceHolder = placeholder.cloneNode()
        slider.appendChild(slidePlaceHolder)

        scenes.push(
          new CoreScrollScene({
            triggerElement: slidePlaceHolder,
            triggerHook: 0.5,
            enter: (event) => {
              this.activateSlide(index, slides, indicator)
              console.log('scroll slider enter', index)
              container.classList.remove('before-enter')
            },
            leave: (event) => {
              if (index > 0) {
                this.activateSlide(index - 1, slides, indicator)
              } else {
                // const svg = indicator.querySelector('svg .circle-stroke')

                // anime({
                //   targets: svg,
                //   strokeDashoffset: anime.setDashoffset,
                //   easing: 'easeInOutSine',
                //   duration: 400
                // })

                container.classList.add('before-enter')
              }
              console.log('scroll slider leave', index)
            }
          })
        )
      })

      const slidePlaceHolder = placeholder.cloneNode()
      slidePlaceHolder.classList.add('last')
      slider.appendChild(slidePlaceHolder)

      const end = document.createElement('div')
      end.classList.add('text-slider-end')
      slider.appendChild(end)

      scenes.push(
        new CoreScrollScene({
          triggerElement: end,
          triggerHook: 1,
          enter: (event) => {
            console.log('end enter')
            this.unpinContainer(container, true)

            const circle = indicator.querySelector('svg .circle-end')

            circle.classList.add('js-active')
          },
          leave: (event) => {
            console.log('end leave')
            this.pinContainer(container)

            const circle = indicator.querySelector('svg .circle-end')

            circle.classList.remove('js-active')
          }
        })
      )

      window.addEventListener('scroll', this.onScroll.bind({ element: slider }))
    })

    super.scrollScenes = scenes

    return super.init()
  }

  onScroll() {
    let slider = this.element
    let sliderHeight = slider.getBoundingClientRect().height
    let sliderOffset = slider.getBoundingClientRect().top + document.documentElement.scrollTop
    let position = Math.floor(window.scrollY - sliderOffset)
    let progress = Math.max(Math.min((position / (sliderHeight - window.innerHeight)), 1), 0)

    const indicator = slider.querySelector('.text-slider-indicator')
    const svg = indicator.querySelector('svg .circle-stroke')

    const strokeProgress = anime.setDashoffset(svg) * (1 - progress)
    anime.set(svg, { strokeDashoffset: strokeProgress })
    // anime({
    //   targets: svg,
    //   strokeDashoffset: strokeProgress,
    //   easing: 'easeInOutSine',
    //   duration: 400
    // })
  }

  pinContainer(element) {
    element.classList.remove('js-bottom')
    element.classList.add('js-sticky')
  }

  unpinContainer(element, isBottom = false) {
    if (isBottom) {
      element.classList.add('js-bottom')
    }
    element.classList.remove('js-sticky')
  }

  activateSlide(index, slides, indicator) {
    const current = indicator.querySelector('.progress .current')
    current.innerText = index + 1

    // const svg = indicator.querySelector('svg .circle-stroke')
    // const circle = indicator.querySelector('svg .circle-end')

    slides.forEach(element => {
      element.classList.remove('js-active')
    })

    if (index >= 0 && index < slides.length) {
      setTimeout(() => {
        slides.forEach(element => {
          element.classList.remove('js-active')
        })
        slides[index].classList.add('js-active')
      }, 300)

      // let offset = anime.setDashoffset(svg)
      // console.log('offset', offset)

      // // let partial = offset - (offset / slides.length * (index + 1))
      // // anime({
      // //   targets: svg,
      // //   strokeDashoffset: partial,
      // //   easing: 'easeInOutSine',
      // //   duration: 400
      // // })

      // if (index === slides.length - 1) {
      //   circle.classList.add('js-active')
      // } else {
      //   circle.classList.remove('js-active')
      // }
    }
  }

  destroy() {
    this.sliders.forEach(slider => {
      window.removeEventListener('scroll', this.onScroll.bind(slider))
    })
    return super.destroy()
  }
}

export const textSlider = new TextSlider()
