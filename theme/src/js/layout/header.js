import { CoreModule, CoreEventListener, CoreScrollScene, eventBus } from '../core'

class Header extends CoreModule {
  init(options) {
    this.element = options.element

    if (this.element) {
      let events = []
      events.push(
        new CoreEventListener('pin-header', () => {
          this.pin()
        })
      )

      events.push(
        new CoreEventListener('unpin-header', () => {
          this.unpin()
        })
      )

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

      let scenes = []
      scenes.push(
        new CoreScrollScene({
          offset: () => {
            return 20
          },
          enter: (event) => {
            eventBus.$emit('pin-header')
          },
          leave: (event) => {
            eventBus.$emit('unpin-header')
          }}
        )
      )
      super.scrollScenes = scenes
    } else {
      return { id: this.id, status: false, message: 'no .header-main element' }
    }

    return super.init()
  }

  pin() {
    this.element.classList.add('pinned')
  }

  unpin() {
    this.element.classList.remove('pinned')
  }

  closeMenu() {
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
      this.element.classList.remove('active')
      this.element.classList.add('animating')
      setTimeout(() => {
        this.element.classList.remove('animating')
      }, 400)
    } else {
      this.element.classList.add('active')
      this.element.classList.add('animating')
      setTimeout(() => {
        this.element.classList.remove('animating')
      }, 400)
    }
  }
}

export const header = new Header()
