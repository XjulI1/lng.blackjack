import { Lightning, Utils } from '@lightningjs/sdk'
import { List } from '@lightningjs/ui'

/* COMPONENTS */
import Card, { DEFAULT_CARD_HEIGHT, DEFAULT_CARD_WIDTH } from './Card'

/* HELPERS */
import { totalWidth, totalHeight } from '../helpers/sizes'
import eventBus from '../helpers/eventBus'

const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 643
const SPACING_BETWEEN_CARD = 10

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
          type: List,
          rect: true,
          color: 0xaa666666,
          x: this.width / 2,
          y: this.height * 0.65,
          mountX: 0.5,
          mountY: 0.5,
          w: DEFAULT_CARD_WIDTH * 5 + SPACING_BETWEEN_CARD * 4,
          h: DEFAULT_CARD_HEIGHT,
          spacing: SPACING_BETWEEN_CARD
        },
        BankArea: {
          type: List,
          rect: true,
          color: 0xaa666666,
          x: this.width / 2,
          y: this.height * 0.15,
          mountX: 0.5,
          mountY: 0.5,
          w: DEFAULT_CARD_WIDTH * 5 + SPACING_BETWEEN_CARD * 4,
          h: DEFAULT_CARD_HEIGHT,
          spacing: SPACING_BETWEEN_CARD
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
    eventBus.on('addACard', ({Player, Card}) => {
      switch(Player) {
        case window.Game.Player:
          window.Game.Player.cardList.includes(Card) && this._renderCard('PlayerArea', Card)
          break;
        case window.Game.Bank:
          window.Game.Bank.cardList.includes(Card) && this._renderCard('BankArea', Card)
          break;
      }
    })
  }

  _renderPlayerCards() {
    window.Game.Player.cardList?.forEach((card) => {
      this._renderCard('PlayerArea', card)
    })
  }

  _renderBankCards() {
    window.Game.Bank.cardList?.forEach((card) => {
      this._renderCard('BankArea', card)
    })
  }

  _renderCard(tag, card) {
    this.tag('Board.' + tag).add({
      type: Card,
      color: card.color,
      number: card.number
    })
  }
}

export default Board
