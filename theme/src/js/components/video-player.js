import { CoreModule, CoreScrollScene, CoreEventListener, eventBus } from '../core'

class VideoPlayer extends CoreModule {
  init() {
    const scenes = []
    const events = []
    this.videos = []

    this.videos = document.querySelectorAll('video')

    this.videos.forEach(video => {
      console.log(video)
      scenes.push(
        new CoreScrollScene({
          offset: () => {
            return 1
          },
          triggerElement: video,
          triggerHook: 0.5,
          enter: (event) => {
            console.log('video enter')
            video.play()
          },
          leave: (event) => {
            console.log('video leave')
            video.pause()
          }
        })
      )
    })
    super.scrollScenes = scenes

    // events.push(
    //   new CoreEventListener(
    //     'barba-before-enter',
    //     (event) => {

    //       // console.log("anim-complete for:", event.target)
    //       let videos = document.querySelectorAll('video')

    //       videos.forEach(video => {

    //         if (video) {
    //           video.play()
    //         }
    //       })
    //     }
    //   )
    // )

    // events.push(
    //   new CoreEventListener(
    //     'core-initialized',
    //     (event) => {

    //       // console.log("anim-complete for:", event.target)
    //       let videos = document.querySelectorAll('video')

    //       videos.forEach(video => {

    //         if (video) {
    //           video.play()
    //         }
    //       })
    //     }
    //   )
    // )
    // super.eventListeners = events

    return super.init()
  }

  destroy() {
    this.videos.forEach(video => {
      video.pause()
    })
    return super.destroy()
  }
}

export const videoPlayer = new VideoPlayer()
