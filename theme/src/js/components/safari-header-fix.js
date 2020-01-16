import { CoreModule, CoreEventListener } from "../core"

class SafariHeaderFix extends CoreModule {
  init() {
    this.isSafari = false
    let ua = navigator.userAgent.toLowerCase()
    if (ua.indexOf("safari") != -1) {
      if (ua.indexOf("chrome") <= -1) {
        this.isSafari = true
      }
    }

    const events = []

    events.push(new CoreEventListener("window-resized", this.fixBlendMode.bind(this)))
    events.push(new CoreEventListener("barba-before-enter", this.fixBlendMode.bind(this)))
    super.eventListeners = events

    return super.init()
  }

  destroy() {
    return super.destroy()
  }

  fixBlendMode() {
    if (this.isSafari) {
      document.querySelector(".header-main").style.mixBlendMode = "unset"
      setTimeout(() => {
        document.querySelector(".header-main").style.mixBlendMode = "difference"
      }, 5)
    }
  }
}

export const safariHeaderFix = new SafariHeaderFix()
