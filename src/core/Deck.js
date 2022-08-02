/* CORE */
import Pack from './Pack'

/* UTILS */
import { shuffleArray } from '../utils/array'

class Deck {
  constructor(numberOfPack = 5) {
    this.cardList = this._buildCardList(numberOfPack)
    this.dropList = []
  }

  _buildCardList(numberOfPack) {
    let tmpList = []

    for (let i = 0; i < numberOfPack; i++) {
      tmpList = tmpList.concat((new Pack()).cardList)
    }

    return shuffleArray(tmpList);
  }

  addToDropList(card) {
    if (Array.isArray(card)) {
      card.map(c => this.dropList.push(c))
    } else {
      this.dropList.push(card)
    }
  }

  drawCard() {
    return this.cardList.shift()
  }
}

export default Deck
