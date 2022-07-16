import { AS } from "./Card"

class Player {
  constructor() {
    this.cardList = []
  }

  addACard(card) {
    this.cardList.push(card)
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
}

export default Player;
