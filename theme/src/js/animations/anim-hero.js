import { CoreModule, CoreScrollScene, eventBus } from '../core'
import anime from 'animejs'

class AnimHero extends CoreModule {
  init(options) {
    const target = options.target || '.anim-hero'
    const elements = document.querySelectorAll(target)
    const scenes = []
    
    let shrinkers = []
    let logo = null
    let text = null

    elements.forEach((element) => {
      let sesameElements = document.querySelectorAll('.anim-open-sesame')
      sesameElements.forEach(element => {
        element.classList.add('locked')
      })

      this.shrinkers = element.querySelectorAll('.anim-hero-shrinker')
      this.logo = element.querySelector('.anim-hero-logo')
      this.text = element.querySelector('.anim-hero-text')

      this.animate()
    })

    return super.init()
  }

  animate() {
    this.shrinkers.forEach((shrinker) => {
      let delay = 0
      let duration = 400
      if (shrinker.classList.contains('right')) {
        delay = duration
      }
      let w = shrinker.clientWidth
      shrinker.style.width = w + 'px'

      anime({
        targets: shrinker,
        width: [w, 0],
        opacity: [1, 0],
        easing: 'easeInSine',
        duration: duration,
        delay: 1000 + delay
      })
    })

    setTimeout(() => {
      anime({
        targets: this.logo,
        opacity: [1, 0],
        translateY: [0, -40],
        easing: 'easeInSine',
        duration: 400,
        complete: () => {
          console.log('tick')
          this.logo.classList.add('hidden')
          this.text.classList.remove('hidden')
          anime({
            targets: this.text,
            opacity: [0, 1],
            translateY: [40, 0],
            easing: 'easeOutSine',
            duration: 600,
            complete: () => {
              eventBus.$emit('open-sesame')
            }
          })
        }
      })
    }, 2000)
  }

  destroy() {
    return super.destroy()
  }
}

export const animHero = new AnimHero()
