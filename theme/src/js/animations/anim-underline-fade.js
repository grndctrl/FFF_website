import { CoreModule } from '../core/core-module';

class AnimUnderlineIn extends CoreModule {
  init(options) {
    let target = options.target ? options.target : '.anim-underline-in'
    this.elements = document.querySelectorAll(target)
    this.parents = document.querySelectorAll('.anim-underline-in-parent-trigger')
    this.triggers = document.querySelectorAll('.anim-underline-in-trigger')

    this.elements.forEach(element => {
      const duration =
        element.getAttribute('data-anim-duration') > 0
          ? element.getAttribute('data-anim-duration')
          : 300
      element.style.animationDuration = duration + 'ms'
      element.addEventListener('mouseenter', this.onMouseEnter)
      element.addEventListener('mouseleave', this.onMouseLeave)
      element.element = element
    })

    this.parents.forEach(element => {
      element.addEventListener('mouseenter', this.onMouseEnter)
      element.addEventListener('mouseleave', this.onMouseLeave)
      element.element = element
    })

    this.triggers.forEach(element => {
      element.addEventListener('mouseenter', this.onMouseEnterTrigger)
      element.addEventListener('mouseleave', this.onMouseLeaveTrigger)
      element.element = element
    })

    return super.init()
  }

  onMouseEnter() {
    this.element.classList.add('triggered')
    this.element.classList.add('active')

    if (this.element.classList.contains('calc-this')) {
      let w = this.element.clientWidth
      let h = this.element.clientHeight
      console.log(w, h)
    }

  }
  onMouseLeave() {
    this.element.classList.remove('active')
  }

  onMouseEnterTrigger() {
    let targets = this.element.parentElement.querySelectorAll('.anim-underline-in-target')

    targets.forEach(target => {
      target.classList.add('triggered')
      target.classList.add('active')
    })
  }

  onMouseLeaveTrigger() {
    let targets = this.element.parentElement.querySelectorAll('.anim-underline-in-target')

    targets.forEach(target => {
      target.classList.remove('active')
    })
  }
}

export const animUnderlineIn = new AnimUnderlineIn()