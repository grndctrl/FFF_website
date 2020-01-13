import './css/style.css'

import 'zenscroll'

import { core } from './js/core'
import { header, nav, barbaManager } from './js/layout'
import { slider, images } from './js/components'
import { animMoveIn, animFadeIn } from './js/animations'

;(function() {
  core.attach(header, { element: document.querySelector('.header-main') })
  core.attach(nav, { element: document.querySelector('.nav-main') })
  core.attach(barbaManager)

  core.attach(images, {}, true)
  core.attach(slider, {}, true)

  core.attach(animMoveIn, { target: '.anim-move-in' }, true)
  core.attach(animFadeIn, {}, true)

  core.init()
})()
