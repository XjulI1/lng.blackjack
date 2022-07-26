import { Lightning, Utils } from '@lightningjs/sdk'

/* COMPONENTS */
import Card, { DEFAULT_CARD_HEIGHT } from './Card'
import Area from './Area'
import Result from './Text/Result'

/* HELPERS */
import { totalWidth, totalHeight } from '../helpers/sizes'
import eventBus, { EVENTS } from '../helpers/eventBus'

const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 643

class Board extends Lightning.Component {
  static _template() {
    return {
      Board: {
        src: Utils.asset("images/plateau.png"),
        mountX: (1-(totalWidth/this.width))/2,
        mountY: (1-(totalHeight/this.height))/2,
        w: this.width,
        h: this.height,
        PlayerArea: {
          type: Area,
          x: this.width / 2,
          y: this.height * 0.65
        },
        BankArea: {
          type: Area,
          x: this.width / 2,
          y: this.height * 0.15
        },
        PlayerResult: {
          type: Result,
          x: this.width / 2 - 25 / 2,
          y: this.height * 0.65 + (DEFAULT_CARD_HEIGHT - 45)
        },
        BankResult: {
          type: Result,
          x: this.width / 2 - 25 / 2,
          y: this.height * 0.15 - (DEFAULT_CARD_HEIGHT - 15),
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
    this._initEvents()
  }

  _initEvents() {
    eventBus.on(EVENTS.addACard, ({Player, Card}) => {
      switch(Player) {
        case window.Game.Player:
          this.tag('Board.PlayerResult').patch({
            text: {
              text : window.Game.Player.whatsMyHandValue() + ''
            }
          })
          window.Game.Player.cardList.includes(Card) && this._renderCard('PlayerArea', Card)
          break;
        case window.Game.Bank:
          this.tag('Board.BankResult').patch({
            text: {
              text : window.Game.Bank.whatsMyHandValue(window.Game.stage) + ''
            }
          })
          window.Game.Bank.cardList.includes(Card) && this._renderCard('BankArea', Card)
          break;
      }
    })
  }

  _renderCard(tag, card) {
    this.tag('Board.' + tag + '.Area').add({
      type: Card,
      color: card.color,
      number: card.number
    })
  }
}

export default Board
