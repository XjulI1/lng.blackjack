import { Lightning, Utils } from '@lightningjs/sdk'

/* COMPONENTS */
import Card, { DEFAULT_CARD_HEIGHT, DEFAULT_CARD_WIDTH } from './Card'
import Area from './Area'
import Text from './Text'
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
        DropArea: {
          type: Area,
          x: this.width / 4 * 0.70,
          y: this.height * 0.325,
          spacingBetweenCard: -(DEFAULT_CARD_WIDTH-4),
          hasBackground: false,
          rotation: 45
        },
        PlayerResult: {
          type: Text,
          x: this.width / 2 - 25 / 2,
          y: this.height * 0.65 + (DEFAULT_CARD_HEIGHT - 45)
        },
        BankResult: {
          type: Text,
          x: this.width / 2 - 25 / 2,
          y: this.height * 0.15 - (DEFAULT_CARD_HEIGHT - 15),
        },
        WinnerResult: {
          type: Text,
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
    this._renderDeck()
  }

  _initEvents() {
    eventBus.on(EVENTS.addACard, ({Player, Card}) => {
      this._renderDeck()

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
        case STAGES.newTurn:
          this.tag('Board.PlayerArea.Area').clear()
          this.tag('Board.BankArea.Area').clear()
          this._renderDrop()
          break

        case STAGES.bankDraw:
          window.Game.Bank.stage = window.Game.stage

          this._renderCard('BankArea', window.Game.Bank.cardList[1])
          this.tag('Board.BankResult').patch({
            text: {
              text : window.Game.Bank.whatsMyHandValue(window.Game.stage) + ''
            }
          })
          break

        case STAGES.findWinner:
          this._renderWinner(window.Game.whosTheWinner())
          break;
      }
    })
  }

  _renderCard(tag, card) {
    this.tag(`Board.${tag}.Area`).add({
      type: Card,
      color: card.color,
      number: card.number
    })
  }

  _renderDeck() {
    this._renderDeckOrDropArea('DeckArea', window.Game.Deck.cardList)
  }

  _renderDrop() {
    if (window.Game.Deck.dropList.length > 0 ) {
      this._renderDeckOrDropArea('DropArea', window.Game.Deck.dropList)
    }
  }

  _renderDeckOrDropArea(tag, list) {
    this.tag(`Board.${tag}.Area`).clear()
    this.tag(`Board.${tag}.Area`).add(list.slice(0, 50).map(card => ({type: Card, color: card.color, number: card.number, isMask: true})))
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
