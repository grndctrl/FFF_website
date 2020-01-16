import { CoreModule, CoreScrollScene, CoreEventListener } from '../core'
import anime from 'animejs'

class AnimOpenSesame extends CoreModule {
  init(options) {
    let target = options.target ? options.target : '.anim-open-sesame'
    let elements = document.querySelectorAll(target)
    let gate = document.querySelector('.sesame-gate')

    let events = []

    if (gate) {
      events.push(new CoreEventListener('open-sesame',this.unlock.bind(gate)))
    }

    elements.forEach(element => {
      let event = new CoreEventListener('open-sesame',this.animate.bind(element))
      
      events.push(event)
    })

    super.events = events
    
    return super.init()
  }

  animate() {
    let target = this

    target.style.display = 'block'
    anime({
      targets: target,
      opacity: [0, 1],
    })
  }

  unlock() {
    this.classList.remove('locked')
  }

  destroy() {
    return super.destroy()
  }
}

export const animOpenSesame = new AnimOpenSesame()
