import { Lightning, Utils } from '@lightningjs/sdk'

/* COMPONENTS */
import Card, { DEFAULT_CARD_HEIGHT, DEFAULT_CARD_WIDTH } from './Card'
import Area from './Area'
import Result from './Text/Result'
import Winner from './Text/Winner'
import { STAGES } from '../core/Game'

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
        DeckArea: {
          type: Area,
          x: this.width / 4 * 3.50,
          y: this.height * 0.15,
          spacingBetweenCard: -(DEFAULT_CARD_WIDTH-4),
          hasBackground: false,
          rotation: -45
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
        },
        WinnerResult: {
          type: Winner,
          x: this.width / 2 - 10 / 2,
          y: this.height * 0.45,
          mountX: 0.5
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

    this.tag('Board.DeckArea.Area').add(window.Game.Deck.cardList.slice(0, 50).map(card => ({type: Card, color: card.color, number: card.number, isMask: true})))
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

    eventBus.on(EVENTS.newStage, (newStage) => {
      switch(newStage) {
        case STAGES.bankDraw:
          window.Game.Bank.stage = window.Game.stage

          this._renderCard('BankArea', window.Game.Bank.cardList[1])
          this.tag('Board.BankResult').patch({
            text: {
              text : window.Game.Bank.whatsMyHandValue(window.Game.stage) + ''
            }
          })

          window.Game.Bank.autoDraw(window.Game.Deck, window.Game.stage)

          window.Game.nextStage()
          break

        case STAGES.findWinner:
          this._renderWinner(window.Game.whosTheWinner())
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

  _renderWinner(winner) {
    let tmpWinner = 'Nobody'

    switch(winner) {
      case window.Game.Player:
        tmpWinner = 'Player'
        break;
      case window.Game.Bank:
        tmpWinner = 'Bank'
        break;
      case null:
        tmpWinner = 'Egalité'
        break;
    }

    this.tag('Board.WinnerResult').patch({
      text: {
        text: tmpWinner
      }
    })
  }
}

export default Board
