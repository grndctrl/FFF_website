import './css/style.css'

import 'zenscroll'

import { core } from './js/core'
import { header, nav, barbaManager } from './js/layout'
import { slider, images, safariHeaderFix } from './js/components'
import { animMoveIn, animFadeIn, animOpenSesame, animLogo, animHero, animMousePerspective, animUnderlineIn } from './js/animations'

;(function() {
  core.attach(header, { element: document.querySelector('.header-main') })
  core.attach(nav, { element: document.querySelector('.nav-overlay') })
  core.attach(barbaManager)

  core.attach(images, {}, true)
  core.attach(slider, {}, true)
  core.attach(safariHeaderFix, {})

  core.attach(animMoveIn, { target: '.anim-move-in' }, true)
  core.attach(animFadeIn, {}, true)
  core.attach(animOpenSesame, { target: '.anim-open-sesame' }, true)
  core.attach(animLogo, { target: '.anim-logo' }, true)
  core.attach(animHero, { target: '.anim-hero' }, true)
  core.attach(animUnderlineIn, {}, true)
  core.attach(animMousePerspective, {}, true)

  core.init()
})()
