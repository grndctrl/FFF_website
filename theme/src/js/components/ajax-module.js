import { CoreModule, CoreScrollScene, CoreEventListener, eventBus } from '../core'

class AjaxModule extends CoreModule {
  init() {
    this.triggerElement = document.querySelector('.load-articles')

    if (this.triggerElement) {

      const scenes = []
      
      scenes.push(
        new CoreScrollScene({
          offset: () => {
            return 1
          },
          triggerElement: this.triggerElement,
          triggerHook: 0,
          enter: (event) => {
            console.log('loading next articles...')
            let url = this.triggerElement.getAttribute('data-next-url')

            fetch(url).then(response => {
              return response.text()
            }).then(data => {
              let html = document.createElement('html')
              html.innerHTML = data

              let next = html.querySelector('.load-articles')

              if (next) {
                this.triggerElement.setAttribute('data-next-url', next.getAttribute('data-next-url'))
              } else {
                this.destroy()
                this.triggerElement.remove()
              }

              let articles = html.querySelectorAll('.article')

                articles.forEach(article => {
                  article.classList.remove('anim-complete')
                  document.querySelector('.ajax-content').appendChild(article)
                })

                eventBus.$emit('anim-reinit')
              

              console.log(articles)
            })

          }
        })
        )
        super.scrollScenes = scenes
      }

    return super.init()
  }

  destroy() {
    return super.destroy()
  }
}

export const ajaxModule = new AjaxModule()
