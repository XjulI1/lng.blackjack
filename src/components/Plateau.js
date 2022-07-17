import { Lightning, Utils } from '@lightningjs/sdk'
import { List } from '@lightningjs/ui'

/* HELPERS */
import { totalWidth, totalHeight } from '../helpers/sizes'

/* CORE */
import Game from '../core/Game'

/* COMPONENTS */
import Card, { DEFAULT_CARD_HEIGHT, DEFAULT_CARD_WIDTH } from './Card'

const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 643

class Plateau extends Lightning.Component {
  static _template() {
    return {
      Plateau: {
        src: Utils.asset("images/plateau.png"),
        mountX: (1-(totalWidth/this.width))/2,
        mountY: (1-(totalHeight/this.height))/2,
        w: this.width,
        h: this.height,
        PlayerArea: {
          type: List,
          rect: true,
          color: 0xaa666666,
          x: this.width / 2,
          y: this.height * 0.65,
          mountX: 0.5,
          mountY: 0.5,
          w: DEFAULT_CARD_WIDTH * 6,
          h: DEFAULT_CARD_HEIGHT,
          spacing: 10
        },
        BankArea: {
          type: List,
          rect: true,
          color: 0xaa666666,
          x: this.width / 2,
          y: this.height * 0.15,
          mountX: 0.5,
          mountY: 0.5,
          w: DEFAULT_CARD_WIDTH * 6,
          h: DEFAULT_CARD_HEIGHT,
        }
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

    this._renderAllCards()

    window.Game.nextStage()
  }

  _renderAllCards() {
    this._renderPlayerCards()
    this._renderBankCards()
  }

  _renderPlayerCards() {
    window.Game.Player.cardList.forEach((card) => {
      this.tag('Plateau.PlayerArea').add({
        type: Card,
        color: card.color,
        number: card.number
      })
    })
  }

  _renderBankCards() {
    window.Game.Bank.cardList.forEach((card) => {
      this.tag('Plateau.BankArea').add({
        type: Card,
        color: card.color,
        number: card.number
      })
    })
  }
}

export default Plateau
