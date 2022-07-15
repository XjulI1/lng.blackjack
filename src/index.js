import { Launch } from '@lightningjs/sdk'
import App from './App.js'
import sizes from './helpers/sizes.js'

export default function() {
  const options = arguments

  options[0].stage.w = sizes.totalWidth
  options[0].stage.h = sizes.totalHeight

  return Launch(App, ...options)
}
