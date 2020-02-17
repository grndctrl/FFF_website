import { CoreModule, CoreScrollScene, CoreEventListener, eventBus } from '../core'

class VideoPlayer extends CoreModule {
  init() {
    const scenes = []
    const events = []

    events.push(
      new CoreEventListener(
        'barba-before-enter',
        (event) => {

          // console.log("anim-complete for:", event.target)
          let videos = document.querySelectorAll('video')

          videos.forEach(video => {

            if (video) {
              video.play()
            }
          })
        }
      )
    )
    super.eventListeners = events
    events.push(
      new CoreEventListener(
        'core-initialized',
        (event) => {

          // console.log("anim-complete for:", event.target)
          let videos = document.querySelectorAll('video')

          videos.forEach(video => {

            if (video) {
              video.play()
            }
          })
        }
      )
    )
    super.eventListeners = events

    return super.init()
  }

  destroy() {
    return super.destroy()
  }
}

export const videoPlayer = new VideoPlayer()
