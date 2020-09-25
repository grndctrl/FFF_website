import { CoreModule, CoreScrollScene, CoreEventListener, eventBus } from '../core'

class Cursor extends CoreModule {
  init() {
    const events = []
    const replacements = document.querySelectorAll('.cursor-replacement')
    const cursor = document.querySelector('.js-cursor')

    replacements.forEach(element => {
      element.addEventListener('mouseenter', this.onMouseEnter.bind({ cursor: cursor, replacement: element }))
      element.addEventListener('mouseleave', this.onMouseLeave.bind({ cursor: cursor, replacement: element }))
      element.addEventListener('mousemove', this.onMouseMove.bind({ cursor: cursor, replacement: element }))
    })

    events.push(
      new CoreEventListener(
        'dummy-trigger',
        (event) => {
          console.log("DummyModule -> init -> event", event)
        }
      )
    )
    super.eventListeners = events

    return super.init()
  }

  onMouseEnter() {
    this.cursor.classList.add('js-active')
    this.cursor.innerHTML = this.replacement.innerHTML
  }

  onMouseLeave() {
    this.cursor.classList.remove('js-active')
  }

  onMouseMove(event) {
    this.cursor.style.left = event.clientX + 'px'
    this.cursor.style.top = event.clientY + 'px'
  }

  destroy() {
    const replacements = document.querySelectorAll('.cursor-replacement')
    replacements.forEach(element => {
      element.removeEventListener('mouseenter', this.onMouseEnter)
      element.removeEventListener('mouseleave', this.onMouseLeave)
      element.removeEventListener('mousemove', this.onMouseMove)
    })

    return super.destroy()
  }
}

export const cursor = new Cursor()
