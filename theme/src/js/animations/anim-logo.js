import { CoreModule, CoreScrollScene, eventBus } from '../core'
import anime from 'animejs'

class AnimLogo extends CoreModule {
  init(options) {
    const target = options.target || '.anim-logo'
    const elements = document.querySelectorAll(target)
    const items = document.querySelectorAll('.anim-logo-item')
    const calculators = document.querySelectorAll('.anim-logo-calc-item')

    elements.forEach((element) => {
      element.addEventListener('mouseenter', this.onMouseEnter.bind({elements: [items,calculators], parent: element}))
      element.addEventListener('mouseleave', this.onMouseLeave.bind({elements: [items,calculators], parent: element}))
    })

    return super.init()
  }

  onMouseEnter() {
    this.parent.classList.add('animating')
    
    this.elements[0].forEach((item, index) => {
      let w  = this.elements[1][index].clientWidth
      
      anime({
        targets: item,
        width: [0, w],
        easing: 'easeInSine',
        duration: 200,
        complete: () => {
          this.parent.classList.remove('animating')
        }
      })
    })
  }
  
  onMouseLeave() {
    if (this.parent.classList.contains('animating')) {
      setTimeout(() => {

        this.elements[0].forEach((item, index) => {
          let w  = this.elements[1][index].clientWidth
    
          anime({
            targets: item,
            width: [w, 0],
            easing: 'easeInSine',
            duration: 200
          })
        })

      }, 200)
    } else {
      this.elements[0].forEach((item, index) => {
        let w  = this.elements[1][index].clientWidth
  
        anime({
          targets: item,
          width: [w, 0],
          easing: 'easeInSine',
          duration: 200
        })
      })
    }
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

export const animLogo = new AnimLogo()
