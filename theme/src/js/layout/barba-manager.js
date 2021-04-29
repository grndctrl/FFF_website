import { eventBus } from '../core'
import barba from '@barba/core'
import barbaCss from '@barba/css'
import axios from 'axios'
import { CoreModule } from '../core/core-module'

class BarbaManager extends CoreModule {
  init() {
    barba.use(barbaCss)
    try {
      barba.init({
        transitions: [
          {
            name: 'barba-fade',

            beforeLeave() {
              document.body.classList.remove('barba-enter')
              document.body.classList.add('barba-leave')
              window.prevScrollY = window.currScrollY
              window.currScrollY = window.scrollY
            },

            beforeEnter(data) {
              document.body.classList.add('barba-enter')
              document.body.classList.remove('barba-leave')

              let main = document.querySelector('.main')
              let scripts = Array.from(main.querySelectorAll('script'))

              scripts.forEach((script) => {
                axios
                  .get(script.getAttribute('src'))
                  .then(function (response) {
                    eval(response.data)
                  })
                  .catch(function (error) {
                    console.log(error)
                  })
              })

              if (data.trigger == 'back' || data.trigger == 'popstate') {
                console.log('tick', data.trigger)
                console.log(window.prevScrollY)
                console.log(window.currScrollY)
                window.scrollTo(0, window.prevScrollY)
              } else {

                window.scrollTo(0, 0)
              }

              eventBus.$emit('barba-before-enter')
            },

            afterEnter(data) {
              document.body.classList.remove('barba-enter')
              document.body.classList.remove('barba-leave')
            }
          }
        ],
        prevent: ({ href }) => href.charAt(0) === '#'
      })
      console.log('barba init')
    } catch (error) {
      console.log('barba error', error)
      return { id: this.id, status: false, message: error }
    }

    return super.init()
  }
}

export const barbaManager = new BarbaManager()
