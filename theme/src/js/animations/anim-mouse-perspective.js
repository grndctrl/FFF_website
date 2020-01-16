import { CoreModule } from '../core/core-module'

class AnimMousePerspective extends CoreModule {
  init(options) {
    let wrapper = options.target ? options.target : '.anim-perspective-wrapper'
    let target = options.target ? options.target : '.anim-perspective-card'
    this.wrappers = document.querySelectorAll(wrapper)

    this.wrappers.forEach((wrapper) => {
      // let element = wrapper.querySelector(target)
      wrapper.element = wrapper.querySelector(target)
      wrapper.addEventListener('mousemove', this.onMouseMove)
    })

    return super.init()
  }

  onMouseMove(event) {
    let w = window.innerWidth
    let h = window.innerHeight

    let offsetX = 0.5 - event.pageX / w, //cursor position X
      offsetY = 0.5 - event.pageY / h, //cursor position Y
      dy = event.pageY - h / 2, //@h/2 = center of poster
      dx = event.pageX - w / 2, //@w/2 = center of poster
      theta = Math.atan2(dy, dx), //angle between cursor and center of poster in RAD
      angle = theta * 180 / Math.PI - 90, //convert rad in degrees
      offsetCard = 16,
      transformCard =
        'rotateY(' +
        -offsetX * offsetCard +
        'deg)' +
        'rotateX(' +
        offsetY * offsetCard +
        'deg)' +
        'translateZ(200px)' //poster transform

    //get angle between 0-360
    if (angle < 0) {
      angle = angle + 360
    }
    //poster transform
    this.element.style.transform = transformCard
  }

  destroy() {
    this.wrappers.forEach((wrapper) => {
      wrapper.removeEventListener('mousemove', this.onMouseMove)
    })

    return super.destroy()
  }
}

export const animMousePerspective = new AnimMousePerspective()
