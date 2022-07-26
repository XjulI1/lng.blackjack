import { AS } from "./Card"

/* HELPERS */
import eventBus, { EVENTS } from '../helpers/eventBus'

class Player {
  constructor() {
    this._cardList = []
  }

  get cardList() {
    return this._cardList
  }

  addACard(card) {
    this._cardList.push(card)

    eventBus.emit(EVENTS.addACard, { Player: this, Card: card })
  }

  whatsMyHandValue() {
    if (this.isBlackJack()) return 21

    return this.cardList.reduce((acc, card) => {
      return acc += card.whatsMyValue()
    }, 0)
  }

  isBlackJack() {
    return this.cardList.length === 2 && this._hasAS() && this.cardList.find((card) => card.whatsMyValue() === 10)
  }

  _hasAS() {
    return this.cardList.find((card) => card.number === AS)
  }

  autoDraw() {
    throw new Error('Player can not make autoDraw')
  }
}

export default Player;
