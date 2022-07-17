import { Lightning, Utils } from '@lightningjs/sdk'

/* HELPERS */
import { totalWidth, totalHeight } from '../helpers/sizes'

/* CORE */
import Game from '../core/Game'

/* COMPONENTS */
import Card from './Card'
import { COLORS, NUMBERS } from '../core/Card'

const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 643

class Plateau extends Lightning.Component {
  static _template() {
    return {
        src: Utils.asset("images/plateau.png"),
        mountX: (1-(totalWidth/this.width))/2,
        mountY: (1-(totalHeight/this.height))/2,
        w: this.width,
        h: this.height,
        Card: {
          type: Card,
          color: COLORS[0],
          number: NUMBERS[10]
        }
      }
  }

  static get width() {
    return totalWidth > DEFAULT_WIDTH ? DEFAULT_WIDTH : totalWidth * 0.95
  }

  static get height() {
    return this.width === DEFAULT_WIDTH ? DEFAULT_HEIGHT : (DEFAULT_HEIGHT * this.width) / DEFAULT_WIDTH
  }

  _init() {
    window.Game = new Game()

    window.Game.firstDraw()
    window.Game.nextStage()
  }
}

export default Plateau
