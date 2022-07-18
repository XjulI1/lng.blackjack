import Pack from './Pack'

/* UTILS */
import { shuffleArray } from '../utils/array'

class Deck {
  constructor(numberOfPack = 5) {
    this.cardList = this._buildCardList(numberOfPack)
  }

  _buildCardList(numberOfPack) {
    let tmpList = []

    for (let i = 0; i < numberOfPack; i++) {
      tmpList = tmpList.concat((new Pack()).cardList)
    }

    return shuffleArray(tmpList);
  }

  drawCard() {
    return this.cardList.shift()
  }
}

export default Deck
