import { Lightning, Utils } from '@lightningjs/sdk'
import { COLORS, NUMBERS } from '../core/Card'

export const DEFAULT_CARD_WIDTH = 72
export const DEFAULT_CARD_HEIGHT = 92

const SPRITE_WIDTH = 1110
const SPRITE_HEIGHT = 392

class Card extends Lightning.Component {
  static _template() {
    return {
      Card: {
        rect: true,
        w: this.width,
        h: this.height,
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: 3
        },
        Image: {
          texture: {
            type: Lightning.textures.ImageTexture,
            src: Utils.asset("images/52cards.jpg")
          }
        }
      }
    }
  }

  static get width() {
    return DEFAULT_CARD_WIDTH
  }

  static get height() {
    return DEFAULT_CARD_HEIGHT
  }

  set color(value) {
    this._color = value
  }

  set number(value) {
    this._number = value
  }

  get _xClipping() {
    return SPRITE_WIDTH / NUMBERS.length * NUMBERS.findIndex((element) => element === this._number)
  }

  get _yClipping() {
    switch(this._color) {
      case COLORS[0]:
        return 0
      case COLORS[1]:
        return SPRITE_HEIGHT / 4
      case COLORS[2]:
        return SPRITE_HEIGHT / 4 * 2
      case COLORS[3]:
        return SPRITE_HEIGHT / 4 * 3
      default:
        return 0
    }
  }

  _init() {
    this.tag('Card.Image').__texture.enableClipping(this._xClipping, this._yClipping, DEFAULT_CARD_WIDTH - 3, DEFAULT_CARD_HEIGHT - 3)
  }

}

export default Card
