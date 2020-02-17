import { eventBus } from '../core'
import { CoreModule } from '../core/core-module'
import { CoreEventListener } from '../core/core-event'

class Nav extends CoreModule {
  init(options) {
    this.element = options.element
    this.addEventListeners()

    this.toggles = document.querySelectorAll('.toggle-menu')
    this.toggles.forEach((toggle) => {
      toggle.element = this.element
      toggle.addEventListener('click', this.onToggle)
    })

    this.closers = Array.from(document.querySelectorAll('.nav-menu-item'))
    this.closers.push(document.querySelector('.close-menu'))

    this.closers.forEach((closer) => {
      closer.element = this.element
      closer.addEventListener('click', this.onClose)
    })

    return super.init()
  }

  destroy() {
    super.destroy()

    this.toggles.forEach((toggle) => {
      toggle.removeEventListener('click', this.onToggle)
    })

    this.closers.forEach((closer) => {
      closer.removeEventListener('click', this.onClose)
    })
  }

  onToggle(event) {
    if (this.element.classList.contains('animating')) {
      return
    }
    
    eventBus.$emit('toggle-menu', event)
  }

  onClose(event) {
    if (this.element.classList.contains('animating')) {
      return
    }

    eventBus.$emit('close-menu', event)
  }

  addEventListeners() {
    let events = []
    
    events.push(
      new CoreEventListener('toggle-menu', () => {
        this.toggleMenu()
      })
    )

    
    events.push(
      new CoreEventListener('close-menu', () => {
        this.closeMenu()
      })
    )
    
    events.push(
      new CoreEventListener('window-resized', () => {
        if (window.innerWidth >= 1024) {
          this.closeMenu()
        }
      })
    )

    super.events = events
  }

  closeMenu() {
    document.body.classList.remove('unscrollable')

    if (this.element.classList.contains('active')) {
      this.element.classList.remove('active')
      this.element.classList.add('animating')
      setTimeout(() => {
        this.element.classList.remove('animating')
      }, 400)
    }
  }

  toggleMenu() {
    if (this.element.classList.contains('active')) {
      document.body.classList.remove('unscrollable')

      this.element.classList.remove('active')
      this.element.classList.add('animating')
      setTimeout(() => {
        this.element.classList.remove('animating')
      }, 400)
    } else {
      document.body.classList.add('unscrollable')

      this.element.classList.add('active')
      this.element.classList.add('animating')
      setTimeout(() => {
        this.element.classList.remove('animating')
      }, 400)
    }
  }
}

export const nav = new Nav()
